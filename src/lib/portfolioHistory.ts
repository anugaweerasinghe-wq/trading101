import { PortfolioSnapshot, Portfolio } from './types';

// The legacy tradesandbox_history key is deliberately left untouched: older
// releases mixed generated backfill with actual observations without tags.
const HISTORY_KEY = 'tradehq_observed_history_v1';

function readStoredHistory(): PortfolioSnapshot[] | null {
  try {
    const stored = localStorage.getItem(HISTORY_KEY);
    if (!stored) return [];
    const history = JSON.parse(stored);
    return Array.isArray(history) ? history : null;
  } catch { return null; }
}

function validSnapshot(snapshot: PortfolioSnapshot): boolean {
  return !!snapshot && Number.isFinite(new Date(snapshot.timestamp).getTime()) &&
    [snapshot.totalValue, snapshot.cash, snapshot.positionsValue].every(value => Number.isFinite(value) && value >= 0);
}

/** Only observations recorded by this version; never infer legacy provenance. */
export function getPortfolioHistory(): PortfolioSnapshot[] {
  return (readStoredHistory() ?? []).filter(validSnapshot).map(snapshot => ({
    ...snapshot, timestamp: new Date(snapshot.timestamp),
  })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());
}

export function addPortfolioSnapshot(snapshot: PortfolioSnapshot): void {
  if (!validSnapshot(snapshot)) return;
  const history = readStoredHistory();
  // Preserve unreadable storage rather than overwriting it with an empty series.
  if (history === null) return;
  history.push(snapshot);
  // Retain the existing 500-observation rolling window for the new series only.
  try { localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-500))); }
  catch { /* Unavailable/full storage must not interrupt a virtual trade. */ }
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
