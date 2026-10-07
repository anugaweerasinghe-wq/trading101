export interface SnapshotVersion { cycle: string; count: number; updatedAt: string }
/** Trades increase monotonically within a cycle. A reset starts a newer cycle. */
export function snapshotIsStale(incoming: SnapshotVersion, previous: SnapshotVersion | null): boolean {
  if (!previous) return false;
  if (incoming.cycle === previous.cycle) return incoming.count < previous.count;
  return Date.parse(incoming.updatedAt) < Date.parse(previous.updatedAt);
}
