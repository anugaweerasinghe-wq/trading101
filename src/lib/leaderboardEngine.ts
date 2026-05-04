import { ASSETS } from "./assets";

export interface LeaderboardTrader {
  rank: number;
  username: string;
  portfolioValue: number;
  gain: number;
  bestTrade: string;
  personality: "aggressive" | "balanced" | "steady" | "conservative";
}

interface LeaderboardState {
  traders: LeaderboardTrader[];
  lastUpdate: number; // ms epoch
  evolutionCount: number;
}

const STORAGE_KEY = "tradehq_leaderboard_v1";
const REFRESH_INTERVAL_MS = 3 * 24 * 60 * 60 * 1000; // 3 days
const BASELINE = 10000;
const MIN_VALUE = 6000;
const MAX_VALUE = 25000;

const SEED: LeaderboardTrader[] = [
  { rank: 1, username: "CryptoPhantom", portfolioValue: 14820, gain: 48.2, bestTrade: "BTC +12.4%", personality: "aggressive" },
  { rank: 2, username: "AlphaTrader99", portfolioValue: 13950, gain: 39.5, bestTrade: "NVDA +18.7%", personality: "aggressive" },
  { rank: 3, username: "SilentBull", portfolioValue: 13410, gain: 34.1, bestTrade: "SOL +22.1%", personality: "aggressive" },
  { rank: 4, username: "RiskManager_X", portfolioValue: 12780, gain: 27.8, bestTrade: "ETH +9.3%", personality: "balanced" },
  { rank: 5, username: "PipHunter", portfolioValue: 12340, gain: 23.4, bestTrade: "EUR/USD +5.1%", personality: "balanced" },
  { rank: 6, username: "IndexSurfer", portfolioValue: 11950, gain: 19.5, bestTrade: "SPY +7.8%", personality: "conservative" },
  { rank: 7, username: "NightOwlTrader", portfolioValue: 11620, gain: 16.2, bestTrade: "TSLA +14.5%", personality: "balanced" },
  { rank: 8, username: "GoldDigger2026", portfolioValue: 11280, gain: 12.8, bestTrade: "XAU +6.2%", personality: "conservative" },
  { rank: 9, username: "MomentumKing", portfolioValue: 10890, gain: 8.9, bestTrade: "AAPL +4.8%", personality: "balanced" },
  { rank: 10, username: "SteadyEddie", portfolioValue: 10540, gain: 5.4, bestTrade: "QQQ +3.9%", personality: "steady" },
];

const DAILY_SIGMA: Record<LeaderboardTrader["personality"], number> = {
  aggressive: 0.025,
  balanced: 0.014,
  steady: 0.007,
  conservative: 0.005,
};

const DAILY_DRIFT: Record<LeaderboardTrader["personality"], number> = {
  aggressive: 0.0015,
  balanced: 0.001,
  steady: 0.0008,
  conservative: 0.0005,
};

function randn(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function pickRandomBestTrade(): string {
  const pool = ASSETS.filter((a) => a.type === "stock" || a.type === "crypto" || a.type === "etf");
  const a = pool[Math.floor(Math.random() * pool.length)];
  const pct = (Math.random() * 22 + 3).toFixed(1); // 3.0–25.0
  const sign = Math.random() < 0.85 ? "+" : "-";
  return `${a.symbol} ${sign}${pct}%`;
}

function evolve(state: LeaderboardState, daysElapsed: number): LeaderboardState {
  const days = Math.max(1, Math.floor(daysElapsed));
  const updated = state.traders.map((t) => {
    let value = t.portfolioValue;
    const sigma = DAILY_SIGMA[t.personality];
    const drift = DAILY_DRIFT[t.personality];
    for (let d = 0; d < days; d++) {
      const z = randn();
      value = value * Math.exp(drift - 0.5 * sigma * sigma + sigma * z);
    }
    value = clamp(value, MIN_VALUE, MAX_VALUE);
    const gain = ((value - BASELINE) / BASELINE) * 100;
    return {
      ...t,
      portfolioValue: Math.round(value),
      gain: Number(gain.toFixed(1)),
    };
  });

  // Sort by gain desc, reassign ranks
  updated.sort((a, b) => b.gain - a.gain);
  updated.forEach((t, i) => (t.rank = i + 1));

  // Refresh ~half of best trades each evolution
  const newEvolutionCount = state.evolutionCount + 1;
  const refreshed = updated.map((t) => ({
    ...t,
    bestTrade: Math.random() < 0.5 ? pickRandomBestTrade() : t.bestTrade,
  }));

  return {
    traders: refreshed,
    lastUpdate: Date.now(),
    evolutionCount: newEvolutionCount,
  };
}

function readState(): LeaderboardState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LeaderboardState;
    if (!parsed?.traders?.length) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeState(s: LeaderboardState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

export function getLeaderboard(): {
  traders: LeaderboardTrader[];
  lastUpdate: number;
  nextUpdate: number;
} {
  let state = readState();
  if (!state) {
    state = { traders: SEED.map((t) => ({ ...t })), lastUpdate: Date.now(), evolutionCount: 0 };
    writeState(state);
  } else {
    const elapsedMs = Date.now() - state.lastUpdate;
    if (elapsedMs >= REFRESH_INTERVAL_MS) {
      const intervals = Math.floor(elapsedMs / REFRESH_INTERVAL_MS);
      // Evolve once per elapsed 3-day window (3 days of drift each)
      let s = state;
      for (let i = 0; i < intervals; i++) {
        s = evolve(s, 3);
      }
      state = s;
      writeState(state);
    }
  }
  return {
    traders: state.traders,
    lastUpdate: state.lastUpdate,
    nextUpdate: state.lastUpdate + REFRESH_INTERVAL_MS,
  };
}

export function formatTimeAgo(ms: number): string {
  const diff = Date.now() - ms;
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  if (days > 0) return `${days}d ${hours}h ago`;
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours}h ${minutes}m ago`;
  return `${minutes}m ago`;
}

export function formatTimeUntil(ms: number): string {
  const diff = ms - Date.now();
  if (diff <= 0) return "any moment";
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  if (days > 0) return `${days}d ${hours}h`;
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
