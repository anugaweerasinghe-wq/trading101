interface MemberActivity {
  trades: number;
  previousTrades: number;
  portfolioStatus: string;
  practiceRank: number | null;
  username: string;
  userId: string;
}

/** Server return ranks lead; activity breaks ties and orders unranked members. */
export function compareMemberRank(a: MemberActivity, b: MemberActivity): number {
  return (a.practiceRank ?? Infinity) - (b.practiceRank ?? Infinity)
    || b.trades - a.trades
    || b.previousTrades - a.previousTrades
    || Number(b.portfolioStatus === "imported") - Number(a.portfolioStatus === "imported")
    || a.username.localeCompare(b.username)
    || a.userId.localeCompare(b.userId);
}
