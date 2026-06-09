import { Portfolio, Trade, Position, Asset } from './types';
import { INITIAL_CASH, ASSETS } from './assets';
import { recordSnapshot, getPortfolioHistory } from './portfolioHistory';

const STORAGE_KEY = 'tradehq_portfolio';
const HISTORY_KEY = 'tradehq_history';
const BALANCE_MIGRATION_KEY = 'tradehq:balance-migration:v2';
const LEGACY_INITIAL_CASH = 10000;

export function getPortfolio(): Portfolio {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const portfolio = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    portfolio.trades = portfolio.trades.map((t: Trade) => ({
      ...t,
      timestamp: new Date(t.timestamp),
    }));
    // One-shot migration: bump existing users from $10K baseline to $100K
    // so they're not disadvantaged after the rebrand. Only runs once per browser.
    try {
      if (!localStorage.getItem(BALANCE_MIGRATION_KEY)) {
        const bump = INITIAL_CASH - LEGACY_INITIAL_CASH;
        if (bump > 0) {
          portfolio.cash = (portfolio.cash ?? 0) + bump;
          portfolio.totalValue = (portfolio.totalValue ?? 0) + bump;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
        }
        localStorage.setItem(BALANCE_MIGRATION_KEY, '1');
      }
    } catch { /* localStorage unavailable */ }
    return portfolio;
  }

  try { localStorage.setItem(BALANCE_MIGRATION_KEY, '1'); } catch {}
  return {
    cash: INITIAL_CASH,
    totalValue: INITIAL_CASH,
    positions: [],
    trades: [],
  };
}

export function savePortfolio(portfolio: Portfolio): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(portfolio));
}

export function executeTrade(
  portfolio: Portfolio,
  asset: Asset,
  type: 'buy' | 'sell',
  quantity: number
): { success: boolean; message: string; portfolio?: Portfolio } {
  const total = asset.price * quantity;
  const fee = total * 0.001; // 0.1% fee
  const totalWithFee = total + fee;

  if (type === 'buy') {
    if (portfolio.cash < totalWithFee) {
      return { success: false, message: 'Insufficient funds' };
    }

    const newPortfolio = { ...portfolio };
    newPortfolio.cash -= totalWithFee;

    // Update or create position
    const existingPosition = newPortfolio.positions.find(
      (p) => p.asset.id === asset.id
    );

    if (existingPosition) {
      const totalQuantity = existingPosition.quantity + quantity;
      const totalCost =
        existingPosition.avgPrice * existingPosition.quantity + total;
      existingPosition.quantity = totalQuantity;
      existingPosition.avgPrice = totalCost / totalQuantity;
      existingPosition.currentValue = asset.price * totalQuantity;
      existingPosition.profitLoss =
        existingPosition.currentValue - totalCost;
      existingPosition.profitLossPercent =
        (existingPosition.profitLoss / totalCost) * 100;
    } else {
      newPortfolio.positions.push({
        asset,
        quantity,
        avgPrice: asset.price,
        currentValue: total,
        profitLoss: 0,
        profitLossPercent: 0,
      });
    }

    // Add trade
    const trade: Trade = {
      id: Date.now().toString(),
      assetId: asset.id,
      symbol: asset.symbol,
      type,
      quantity,
      price: asset.price,
      total: totalWithFee,
      timestamp: new Date(),
    };
    newPortfolio.trades.unshift(trade);

    // Update total value
    const positionsValue = newPortfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);
    newPortfolio.totalValue = newPortfolio.cash + positionsValue;

    // Record snapshot for chart
    recordSnapshot(newPortfolio.cash, positionsValue);

    savePortfolio(newPortfolio);
    return {
      success: true,
      message: `Bought ${quantity} ${asset.symbol}`,
      portfolio: newPortfolio,
    };
  } else {
    // Sell
    const position = portfolio.positions.find((p) => p.asset.id === asset.id);
    if (!position || position.quantity < quantity) {
      return { success: false, message: 'Insufficient shares' };
    }

    const newPortfolio = { ...portfolio };
    newPortfolio.cash += total - fee;

    // Update position
    position.quantity -= quantity;
    if (position.quantity === 0) {
      newPortfolio.positions = newPortfolio.positions.filter(
        (p) => p.asset.id !== asset.id
      );
    } else {
      position.currentValue = asset.price * position.quantity;
      const totalCost = position.avgPrice * position.quantity;
      position.profitLoss = position.currentValue - totalCost;
      position.profitLossPercent = (position.profitLoss / totalCost) * 100;
    }

    // Add trade
    const trade: Trade = {
      id: Date.now().toString(),
      assetId: asset.id,
      symbol: asset.symbol,
      type,
      quantity,
      price: asset.price,
      total: total - fee,
      timestamp: new Date(),
    };
    newPortfolio.trades.unshift(trade);

    // Update total value
    const positionsValue = newPortfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);
    newPortfolio.totalValue = newPortfolio.cash + positionsValue;

    // Record snapshot for chart
    recordSnapshot(newPortfolio.cash, positionsValue);

    savePortfolio(newPortfolio);
    return {
      success: true,
      message: `Sold ${quantity} ${asset.symbol}`,
      portfolio: newPortfolio,
    };
  }
}

export function updatePositionPrices(portfolio: Portfolio): Portfolio {
  const newPortfolio = { ...portfolio };
  newPortfolio.positions = newPortfolio.positions.map((position) => {
    const currentAsset = ASSETS.find((a) => a.id === position.asset.id);
    if (currentAsset) {
      const currentValue = currentAsset.price * position.quantity;
      const totalCost = position.avgPrice * position.quantity;
      return {
        ...position,
        asset: currentAsset,
        currentValue,
        profitLoss: currentValue - totalCost,
        profitLossPercent: ((currentValue - totalCost) / totalCost) * 100,
      };
    }
    return position;
  });

  newPortfolio.totalValue =
    newPortfolio.cash +
    newPortfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);

  return newPortfolio;
}

const WEEKLY_BONUS_KEY = 'tradesandbox_last_bonus';
const WEEKLY_BONUS_AMOUNT = 100000;
const WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

export function canClaimWeeklyBonus(): boolean {
  const lastClaim = localStorage.getItem(WEEKLY_BONUS_KEY);
  if (!lastClaim) return true;
  
  const timeSinceLastClaim = Date.now() - parseInt(lastClaim);
  return timeSinceLastClaim >= WEEK_IN_MS;
}

export function getTimeUntilNextBonus(): string {
  const lastClaim = localStorage.getItem(WEEKLY_BONUS_KEY);
  if (!lastClaim) return 'Available now';
  
  const timeSinceLastClaim = Date.now() - parseInt(lastClaim);
  const timeRemaining = WEEK_IN_MS - timeSinceLastClaim;
  
  if (timeRemaining <= 0) return 'Available now';
  
  const days = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
  const hours = Math.floor((timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  
  if (days > 0) {
    return `${days}d ${hours}h remaining`;
  }
  return `${hours}h remaining`;
}

export function claimWeeklyBonus(portfolio: Portfolio): { success: boolean; message: string; portfolio?: Portfolio } {
  if (!canClaimWeeklyBonus()) {
    return {
      success: false,
      message: `Weekly bonus already claimed. Next bonus in ${getTimeUntilNextBonus()}`,
    };
  }

  const newPortfolio = { ...portfolio };
  newPortfolio.cash += WEEKLY_BONUS_AMOUNT;
  newPortfolio.totalValue += WEEKLY_BONUS_AMOUNT;

  localStorage.setItem(WEEKLY_BONUS_KEY, Date.now().toString());
  savePortfolio(newPortfolio);

  return {
    success: true,
    message: `Claimed $${WEEKLY_BONUS_AMOUNT.toLocaleString()} weekly bonus!`,
    portfolio: newPortfolio,
  };
}

/**
 * Lifetime realized P&L: for each SELL trade, value gained relative to
 * the average cost basis at the time. We approximate using current avgPrice
 * of remaining position when available, else the sell price itself (0 P&L).
 * To keep it simple and correct, we walk trades chronologically per asset.
 */
export function calculateRealizedPnL(portfolio: Portfolio): number {
  const byAsset = new Map<string, Trade[]>();
  // Sort ascending
  const trades = [...portfolio.trades].sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );
  for (const t of trades) {
    if (!byAsset.has(t.assetId)) byAsset.set(t.assetId, []);
    byAsset.get(t.assetId)!.push(t);
  }

  let realized = 0;
  for (const [, list] of byAsset) {
    let qty = 0;
    let avgCost = 0;
    for (const t of list) {
      if (t.type === 'buy') {
        const newQty = qty + t.quantity;
        avgCost = newQty > 0 ? (avgCost * qty + t.price * t.quantity) / newQty : 0;
        qty = newQty;
      } else {
        realized += (t.price - avgCost) * t.quantity;
        qty = Math.max(0, qty - t.quantity);
      }
    }
  }
  return realized;
}

/**
 * Max drawdown from local snapshot history (peak-to-trough %).
 */
export function calculateMaxDrawdown(): number {
  const history = getPortfolioHistory();
  if (history.length < 2) return 0;
  let peak = history[0].totalValue;
  let maxDd = 0;
  for (const snap of history) {
    if (snap.totalValue > peak) peak = snap.totalValue;
    if (peak > 0) {
      const dd = ((peak - snap.totalValue) / peak) * 100;
      if (dd > maxDd) maxDd = dd;
    }
  }
  return maxDd;
}

/**
 * Day change: total value now vs ~24h ago snapshot. Returns null if no snapshot ≥ 20h old.
 */
export function calculateDayChange(currentValue: number): { dollars: number; percent: number } | null {
  const history = getPortfolioHistory();
  if (history.length === 0) return null;
  const cutoff = Date.now() - 20 * 60 * 60 * 1000;
  // Find oldest snapshot newer than cutoff... actually we want the snapshot closest to 24h ago
  const dayAgoTarget = Date.now() - 24 * 60 * 60 * 1000;
  let candidate = history[0];
  for (const s of history) {
    const t = new Date(s.timestamp).getTime();
    if (t <= cutoff) candidate = s;
    else break;
  }
  const candTime = new Date(candidate.timestamp).getTime();
  if (candTime > cutoff) return null; // no 20h+ old snapshot yet
  const dollars = currentValue - candidate.totalValue;
  const percent = candidate.totalValue > 0 ? (dollars / candidate.totalValue) * 100 : 0;
  return { dollars, percent };
}
