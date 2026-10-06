import type { Trade } from './types';

/** Fee-inclusive weighted-average accounting, one result per matched sell. */
export function getRealizedTradeResults(trades: Trade[]) {
  const holdings = new Map<string, { quantity: number; avgUnitCost: number }>();
  const results: Array<{ symbol: string; profit: number; profitPercent: number; buyPrice: number; sellPrice: number; quantity: number; timestamp: Date }> = [];
  const ordered = [...trades].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  for (const trade of ordered) {
    if (!Number.isFinite(trade.quantity) || trade.quantity <= 0 || !Number.isFinite(trade.total)) continue;
    const state = holdings.get(trade.assetId) ?? { quantity: 0, avgUnitCost: 0 };
    const unitTotal = trade.total / trade.quantity;
    if (trade.type === 'buy') {
      const quantity = state.quantity + trade.quantity;
      state.avgUnitCost = (state.avgUnitCost * state.quantity + trade.total) / quantity;
      state.quantity = quantity;
    } else if (state.quantity > 0) {
      const quantity = Math.min(state.quantity, trade.quantity);
      const cost = state.avgUnitCost * quantity;
      const profit = (unitTotal - state.avgUnitCost) * quantity;
      results.push({ symbol: trade.symbol, profit, profitPercent: cost > 0 ? profit / cost * 100 : 0, buyPrice: state.avgUnitCost, sellPrice: unitTotal, quantity, timestamp: new Date(trade.timestamp) });
      state.quantity -= quantity;
      if (state.quantity === 0) state.avgUnitCost = 0;
    }
    holdings.set(trade.assetId, state);
  }
  return results;
}
