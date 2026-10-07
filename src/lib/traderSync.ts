import { supabase } from "@/integrations/supabase/client";
import { getPortfolio, calculateRealizedPnL, calculateMaxDrawdown, calculateClosedTradeStats } from "@/lib/portfolio";
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

/** Minimum activity before a client-synced practice row is displayed. */
export const MIN_TRADES_TO_RANK = 5;

export function computeLocalStats(): LocalStats {
  const p = getPortfolio();
  const start = STARTING_BALANCE;
  const pnlPct = ((p.totalValue - start) / start) * 100;
  const closed = calculateClosedTradeStats(p);
  const progress = loadProgress();
  const badges = courseTracks.filter((t) => progress.tracks[t.slug]?.badgeEarnedAt).length;

  return {
    portfolio_value: Math.round(p.totalValue * 100) / 100,
    pnl_pct: Math.round(pnlPct * 100) / 100,
    trades: p.trades.length,
    win_rate: closed.winRate,
    max_drawdown: Math.round(calculateMaxDrawdown() * 100) / 100,
    badges,
  };
}

export function computeRealizedPnL(): number {
  return calculateRealizedPnL(getPortfolio());
}

/** Refresh the server portfolio and read its recorded simulation statistics. */
export async function syncStats(userId: string) {
  const { pushPortfolio } = await import("./cloudPortfolio");
  await pushPortfolio(userId);
  const { data, error } = await supabase.from("trader_stats").select("*").eq("user_id", userId).single();
  if (error) throw error;
  return data;
}
