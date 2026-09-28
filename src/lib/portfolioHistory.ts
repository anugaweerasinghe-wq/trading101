import { PortfolioSnapshot, Portfolio } from './types';

const HISTORY_KEY = 'tradesandbox_history';

export function getPortfolioHistory(): PortfolioSnapshot[] {
  const stored = localStorage.getItem(HISTORY_KEY);
  if (stored) {
    const history = JSON.parse(stored);
    return history.map((snapshot: PortfolioSnapshot) => ({
      ...snapshot,
      timestamp: new Date(snapshot.timestamp),
    }));
  }
  return [];
}

export function addPortfolioSnapshot(snapshot: PortfolioSnapshot): void {
  const history = getPortfolioHistory();
  history.push(snapshot);

  // Keep only the latest locally observed snapshots.
  if (history.length > 500) {
    history.shift();
  }

  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function recordSnapshot(cash: number, positionsValue: number): void {
  const totalValue = cash + positionsValue;
  addPortfolioSnapshot({
    timestamp: new Date(),
    totalValue,
    cash,
    positionsValue,
  });
}

/**
 * Legacy compatibility hook used by Portfolio.tsx on mount.
 *
 * Older versions fabricated one synthetic portfolio snapshot for every missed
 * hour and then fed that generated history into drawdown analytics. We no
 * longer backfill history or mutate positions here. Portfolio valuation is
 * refreshed separately from the prices actually available to the current UI.
 */
export async function updatePortfolioOverTime(portfolio: Portfolio): Promise<Portfolio> {
  return portfolio;
}
