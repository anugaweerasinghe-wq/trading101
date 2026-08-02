import { supabase } from "@/integrations/supabase/client";
import { getPortfolio, calculateRealizedPnL, calculateMaxDrawdown } from "@/lib/portfolio";
import { STARTING_BALANCE } from "@/lib/constants";
import { loadProgress } from "@/lib/courseProgress";
import { courseTracks } from "@/lib/coursesData";

export interface LocalStats {
  portfolio_value: number;
  pnl_pct: number;
  trades: number;
  win_rate: number;
  max_drawdown: number;
  badges: number;
}

/** Minimum activity before a trader is listed publicly — keeps the board honest. */
export const MIN_TRADES_TO_RANK = 5;

export function computeLocalStats(): LocalStats {
  const p = getPortfolio();
  const start = STARTING_BALANCE;
  const pnlPct = ((p.totalValue - start) / start) * 100;
  const sells = p.trades.filter((t) => t.type === "sell");
  const wins = sells.filter((t) => t.total > 0).length;
  const progress = loadProgress();
  const badges = courseTracks.filter((t) => progress.tracks[t.slug]?.badgeEarnedAt).length;

  return {
    portfolio_value: Math.round(p.totalValue * 100) / 100,
    pnl_pct: Math.round(pnlPct * 100) / 100,
    trades: p.trades.length,
    win_rate: sells.length > 0 ? Math.round((wins / sells.length) * 100) : 0,
    max_drawdown: Math.round(calculateMaxDrawdown() * 100) / 100,
    badges,
  };
}

export function computeRealizedPnL(): number {
  return calculateRealizedPnL(getPortfolio());
}

/** Push the browser-held practice stats to the signed-in user's row. */
export async function syncStats(userId: string) {
  const stats = computeLocalStats();
  const { error } = await supabase
    .from("trader_stats")
    .upsert({ user_id: userId, ...stats }, { onConflict: "user_id" });
  if (error) throw error;
  return stats;
}