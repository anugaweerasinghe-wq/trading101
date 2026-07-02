import { ASSETS } from "./assets";
import { getFavorites } from "./favorites";

const SNAPSHOT_KEY = "tradehq_watchlist_snapshot";

interface Snap {
  at: string;
  prices: Record<string, number>;
}

/** Persist current prices for the user's watchlist. Called on page unload / low frequency. */
export function snapshotWatchlist() {
  try {
    const favs = getFavorites();
    if (!favs.length) return;
    const prices: Record<string, number> = {};
    for (const id of favs) {
      const a = ASSETS.find((x) => x.id === id);
      if (a) prices[id] = a.price;
    }
    localStorage.setItem(
      SNAPSHOT_KEY,
      JSON.stringify({ at: new Date().toISOString(), prices } satisfies Snap),
    );
  } catch {}
}

export interface WatchlistMove {
  id: string;
  symbol: string;
  name: string;
  from: number;
  to: number;
  changePct: number;
}

/** Compare current prices to the last stored snapshot. Returns biggest movers. */
export function getWatchlistMoves(): { sinceHours: number; moves: WatchlistMove[] } | null {
  try {
    const raw = localStorage.getItem(SNAPSHOT_KEY);
    if (!raw) return null;
    const snap: Snap = JSON.parse(raw);
    const hours = Math.max(1, Math.round((Date.now() - new Date(snap.at).getTime()) / 36e5));
    const favs = getFavorites();
    const moves: WatchlistMove[] = [];
    for (const id of favs) {
      const a = ASSETS.find((x) => x.id === id);
      const prev = snap.prices[id];
      if (!a || !prev) continue;
      const changePct = ((a.price - prev) / prev) * 100;
      if (Math.abs(changePct) < 0.15) continue;
      moves.push({ id, symbol: a.symbol, name: a.name, from: prev, to: a.price, changePct });
    }
    moves.sort((x, y) => Math.abs(y.changePct) - Math.abs(x.changePct));
    return { sinceHours: hours, moves: moves.slice(0, 4) };
  } catch {
    return null;
  }
}