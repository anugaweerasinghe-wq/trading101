import { Portfolio, Trade, Position, Asset } from './types';
import { INITIAL_CASH, ASSETS } from './assets';

const STORAGE_KEY = 'tradesandbox_portfolio';

export function getPortfolio(): Portfolio {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    const portfolio = JSON.parse(stored);
    // Convert timestamp strings back to Date objects
    portfolio.trades = portfolio.trades.map((t: Trade) => ({
      ...t,
      timestamp: new Date(t.timestamp),
    }));
    return portfolio;
  }

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
    newPortfolio.totalValue =
      newPortfolio.cash +
      newPortfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);

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
    newPortfolio.totalValue =
      newPortfolio.cash +
      newPortfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);

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
