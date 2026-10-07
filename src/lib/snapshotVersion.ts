export interface SnapshotVersion { cycle: string; count: number; updatedAt: string; pricedAt?: string | null }
/** Trades increase monotonically within a cycle. A reset starts a newer cycle. */
export function snapshotIsStale(incoming: SnapshotVersion, previous: SnapshotVersion | null): boolean {
  if (!previous) return false;
  if (incoming.cycle === previous.cycle) {
    if (incoming.count !== previous.count) return incoming.count < previous.count;
    return !!incoming.pricedAt && !!previous.pricedAt && Date.parse(incoming.pricedAt) < Date.parse(previous.pricedAt);
  }
  return Date.parse(incoming.updatedAt) < Date.parse(previous.updatedAt);
}
