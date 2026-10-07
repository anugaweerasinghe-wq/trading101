interface MemberActivity {
  trades: number;
  previousTrades: number;
  portfolioStatus: string;
  practiceRank: number | null;
  username: string;
  userId: string;
}

/** Display order only. Historical activity never changes a server practice rank. */
export function compareMemberActivity(a: MemberActivity, b: MemberActivity): number {
  return b.trades - a.trades
    || b.previousTrades - a.previousTrades
    || Number(b.portfolioStatus === "imported") - Number(a.portfolioStatus === "imported")
    || (a.practiceRank ?? Infinity) - (b.practiceRank ?? Infinity)
    || a.username.localeCompare(b.username)
    || a.userId.localeCompare(b.userId);
}
