import { PortfolioSnapshot } from './types';

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
  
  // Keep only last 100 snapshots
  if (history.length > 100) {
    history.shift();
  }
  
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function recordSnapshot(cash: number, positionsValue: number): void {
  const totalValue = cash + positionsValue;
  const snapshot: PortfolioSnapshot = {
    timestamp: new Date(),
    totalValue,
    cash,
    positionsValue,
  };
  addPortfolioSnapshot(snapshot);
}
