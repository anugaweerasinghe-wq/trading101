/**
 * Daily Trading Challenge — deterministic per UTC date.
 * 100% client-side, localStorage-persisted streak. Zero auth.
 *
 * Educational simulation only — not financial advice.
 */

export type ChallengeDecision = "long" | "short" | "hold";

export interface DailyChallenge {
  id: number;
  asset: string;       // e.g. "NVDA", "BTC"
  assetName: string;
  scenario: string;    // short headline
  context: string;     // 1-2 sentence setup
  options: { label: string; value: ChallengeDecision; rationale: string; correct: boolean }[];
  insight: string;     // educational takeaway shown after answer
  difficulty: "Beginner" | "Intermediate" | "Pro";
}

// Curated bank of 30+ challenges. Cycles deterministically by UTC date.
const CHALLENGES: DailyChallenge[] = [
  {
    id: 1, asset: "NVDA", assetName: "NVIDIA",
    scenario: "NVDA reports earnings tonight. Implied move is ±8%.",
    context: "Street expects $0.85 EPS on $36B revenue. Whisper number is $0.92. AI capex guidance from hyperscalers came in strong this week.",
    options: [
      { label: "Go long ahead of earnings", value: "long", rationale: "Bullish setup + strong whisper", correct: false },
      { label: "Wait — close existing positions and react after the print", value: "hold", rationale: "Avoid the gap risk; expected move pricing is rich", correct: true },
      { label: "Short into the print", value: "short", rationale: "Bet on a sell-the-news reaction", correct: false },
    ],
    insight: "Pros rarely hold full size into earnings — implied moves price in the expected volatility, so the asymmetric edge is post-print when uncertainty collapses.",
    difficulty: "Intermediate",
  },
  {
    id: 2, asset: "BTC", assetName: "Bitcoin",
    scenario: "BTC breaks $100K resistance on heavy volume.",
    context: "Funding rates are still neutral, open interest just hit ATH, and spot ETF inflows posted $1.2B yesterday.",
    options: [
      { label: "Buy the breakout", value: "long", rationale: "Confirmed breakout with spot-driven flow", correct: true },
      { label: "Short — too extended", value: "short", rationale: "Mean revert play", correct: false },
      { label: "Hold and wait for a retest", value: "hold", rationale: "Patience on confirmation", correct: false },
    ],
    insight: "Breakouts with spot-driven flow (not just leverage) historically have ~3x the follow-through of leverage-led breakouts. Funding neutrality is the tell.",
    difficulty: "Beginner",
  },
  {
    id: 3, asset: "TSLA", assetName: "Tesla",
    scenario: "Tesla drops 12% on a weak delivery number.",
    context: "Q3 deliveries missed by 4%. Stock gapped down at the open and is now consolidating at the day's low.",
    options: [
      { label: "Buy the dip immediately", value: "long", rationale: "Reflexive bounce expected", correct: false },
      { label: "Wait for a higher-low intraday before going long", value: "hold", rationale: "Let the seller exhaust", correct: true },
      { label: "Add to a short", value: "short", rationale: "Trend continuation", correct: false },
    ],
    insight: "Gap-down + consolidation at lows = sellers still in control. The 'falling knife' bounce works ~30% of the time; waiting for a higher low improves win rate to ~60%.",
    difficulty: "Intermediate",
  },
  {
    id: 4, asset: "ETH", assetName: "Ethereum",
    scenario: "ETH/BTC ratio breaks a 6-month downtrend.",
    context: "ETH has been underperforming BTC for half a year. Today the ratio crossed back above its 50-day MA.",
    options: [
      { label: "Rotate from BTC into ETH", value: "long", rationale: "Trend reversal in relative strength", correct: true },
      { label: "Stay in BTC", value: "hold", rationale: "Wait for more confirmation", correct: false },
      { label: "Short ETH/BTC", value: "short", rationale: "Fade the move", correct: false },
    ],
    insight: "Relative strength reversals on multi-month timeframes are powerful — capital flows take weeks to rotate. The 50-day cross is a classic high-timeframe inflection.",
    difficulty: "Pro",
  },
  {
    id: 5, asset: "AAPL", assetName: "Apple",
    scenario: "Apple announces a $90B buyback expansion.",
    context: "Stock is up 2% premarket. RSI on the daily is already 71. iPhone unit growth has been flat for 4 quarters.",
    options: [
      { label: "Buy — buybacks are bullish", value: "long", rationale: "Reduced float", correct: false },
      { label: "Hold — fundamentals haven't changed", value: "hold", rationale: "Buybacks ≠ growth", correct: true },
      { label: "Short into strength", value: "short", rationale: "Overbought + flat fundamentals", correct: false },
    ],
    insight: "Buybacks are an accounting tailwind, not a growth driver. When core revenue stalls, buyback-driven rallies typically retrace within a quarter.",
    difficulty: "Intermediate",
  },
  {
    id: 6, asset: "SPY", assetName: "S&P 500 ETF",
    scenario: "Fed pauses rate cuts. SPY drops 1.5% intraday.",
    context: "Powell signaled 'higher for longer.' VIX spiked to 22. Volume is 1.4x the 20-day average.",
    options: [
      { label: "Buy the dip — Fed always backs off", value: "long", rationale: "Mean reversion", correct: false },
      { label: "Wait — VIX hasn't peaked yet", value: "hold", rationale: "Let volatility cool", correct: true },
      { label: "Short — more downside coming", value: "short", rationale: "Trend follow", correct: false },
    ],
    insight: "VIX spikes typically take 2-5 sessions to fully exhaust. Buying the first red day captures ~20% of the eventual move; waiting for VIX to roll over captures the other 80%.",
    difficulty: "Beginner",
  },
  {
    id: 7, asset: "SOL", assetName: "Solana",
    scenario: "Solana network outage for 4 hours.",
    context: "Validator software bug. Price down 7%. Devs say a patch is rolling out within 24h.",
    options: [
      { label: "Buy — overreaction to a fixable bug", value: "long", rationale: "Short-term FUD", correct: true },
      { label: "Sell — outages are a structural issue", value: "short", rationale: "Bearish narrative", correct: false },
      { label: "Hold and wait", value: "hold", rationale: "Avoid the volatility", correct: false },
    ],
    insight: "Layer-1 outages historically retrace within 7 days if the fix is shipped fast. The opportunity is buying the fear, not selling it.",
    difficulty: "Intermediate",
  },
  {
    id: 8, asset: "GOLD", assetName: "Gold",
    scenario: "DXY dollar index breaks below a 2-year support.",
    context: "Real yields are falling. Central banks added a record amount of gold to reserves last quarter.",
    options: [
      { label: "Buy gold", value: "long", rationale: "Weak dollar = strong gold", correct: true },
      { label: "Short gold — too crowded", value: "short", rationale: "Contrarian", correct: false },
      { label: "Wait for a pullback", value: "hold", rationale: "Discipline", correct: false },
    ],
    insight: "Gold's strongest tailwind is falling real yields + dollar weakness. When both align with central-bank accumulation, multi-month uptrends typically follow.",
    difficulty: "Beginner",
  },
  {
    id: 9, asset: "META", assetName: "Meta Platforms",
    scenario: "Meta announces $50B+ AI capex for next year.",
    context: "Stock down 6% on the news. Wall Street worries about ROI. But internal metrics show Reels engagement up 40% YoY thanks to AI ranking.",
    options: [
      { label: "Buy — Street is short-sighted", value: "long", rationale: "Long-term ROI", correct: true },
      { label: "Wait for the bottom", value: "hold", rationale: "Catch a knife", correct: false },
      { label: "Short — capex worries are valid", value: "short", rationale: "Margin compression", correct: false },
    ],
    insight: "Meta has a history of capex 'shock' selloffs followed by 6-12 month rallies once the ROI becomes visible (Reality Labs 2022, AI 2024).",
    difficulty: "Pro",
  },
  {
    id: 10, asset: "EURUSD", assetName: "EUR/USD",
    scenario: "ECB hawkish surprise: Lagarde signals one more hike.",
    context: "EUR/USD spikes 80 pips in 5 minutes. Pre-news positioning was net short EUR.",
    options: [
      { label: "Buy EUR/USD — squeeze continues", value: "long", rationale: "Short squeeze", correct: true },
      { label: "Fade the spike", value: "short", rationale: "Mean reversion", correct: false },
      { label: "Wait", value: "hold", rationale: "Confirmation", correct: false },
    ],
    insight: "Hawkish central bank surprises on heavily short positioning create multi-day squeezes ~70% of the time. The first 24h is usually only half the move.",
    difficulty: "Pro",
  },
  {
    id: 11, asset: "MSFT", assetName: "Microsoft",
    scenario: "Microsoft adds OpenAI o4 to all Copilot tiers.",
    context: "Stock flat on the news. Enterprise Copilot adoption was already accelerating (40% QoQ).",
    options: [
      { label: "Buy — moat deepens", value: "long", rationale: "Locks in enterprise", correct: true },
      { label: "Hold — priced in", value: "hold", rationale: "No reaction = priced in", correct: false },
      { label: "Short", value: "short", rationale: "Sell strength", correct: false },
    ],
    insight: "Flat reactions to genuinely bullish news in mega-caps often mean accumulation. Watch for breakouts within 5 trading days.",
    difficulty: "Intermediate",
  },
  {
    id: 12, asset: "GOOGL", assetName: "Alphabet",
    scenario: "DOJ proposes forcing Google to sell Chrome.",
    context: "Stock down 5% premarket. Legal experts give it 30% odds of happening. Process would take 3+ years.",
    options: [
      { label: "Buy — fear overdone", value: "long", rationale: "Low odds + long timeline", correct: true },
      { label: "Sell — regulatory risk is real", value: "short", rationale: "Tail risk", correct: false },
      { label: "Hold", value: "hold", rationale: "Sit on hands", correct: false },
    ],
    insight: "Multi-year regulatory threats are notoriously bad short setups — the actual outcome is years away, but the fear creates immediate buying opportunities.",
    difficulty: "Pro",
  },
  {
    id: 13, asset: "QQQ", assetName: "Nasdaq 100 ETF",
    scenario: "QQQ goes 5 days straight up. RSI hits 78.",
    context: "AI-driven rally. No pullback in 2 weeks.",
    options: [
      { label: "Buy more — momentum", value: "long", rationale: "Trend follow", correct: false },
      { label: "Trim and wait for a pullback", value: "hold", rationale: "Risk management", correct: true },
      { label: "Short the overbought signal", value: "short", rationale: "Mean reversion", correct: false },
    ],
    insight: "RSI >75 on QQQ has historically resolved with a 3-5% pullback within 10 sessions ~80% of the time. Holding works; adding doesn't.",
    difficulty: "Beginner",
  },
  {
    id: 14, asset: "OIL", assetName: "Crude Oil",
    scenario: "OPEC+ surprise production cut of 1M bpd.",
    context: "Crude jumps 4% on the announcement. Inventories have been building for 6 weeks.",
    options: [
      { label: "Buy — supply shock", value: "long", rationale: "Lower supply", correct: false },
      { label: "Wait — demand is the issue", value: "hold", rationale: "Inventory builds = weak demand", correct: true },
      { label: "Short — fade OPEC", value: "short", rationale: "Fade jawboning", correct: false },
    ],
    insight: "Supply cuts can't fix demand problems. Six weeks of inventory builds signals weak end-demand — OPEC announcements often fade within 2 weeks under those conditions.",
    difficulty: "Pro",
  },
  {
    id: 15, asset: "BNB", assetName: "BNB",
    scenario: "Binance announces a major token burn.",
    context: "12% of supply removed. Volume already 3x average.",
    options: [
      { label: "Buy — supply reduction is bullish", value: "long", rationale: "Lower float", correct: true },
      { label: "Sell the news", value: "short", rationale: "Buy rumor sell news", correct: false },
      { label: "Hold", value: "hold", rationale: "Wait", correct: false },
    ],
    insight: "Genuine supply burns (not just emissions reductions) historically drive 30-60 day uptrends in exchange tokens when volume confirms.",
    difficulty: "Beginner",
  },
  {
    id: 16, asset: "NVDA", assetName: "NVIDIA",
    scenario: "China announces 200% tariff on US chips.",
    context: "NVDA -8% premarket. China is ~12% of NVDA revenue. Datacenter demand globally remains insatiable.",
    options: [
      { label: "Buy the dip — global demand offsets China", value: "long", rationale: "Demand overwhelms", correct: true },
      { label: "Hold and wait", value: "hold", rationale: "Sit out volatility", correct: false },
      { label: "Short — bigger drop coming", value: "short", rationale: "Geopolitical risk", correct: false },
    ],
    insight: "Geopolitical-driven selloffs in supply-constrained markets typically recover within 30 days as global demand fills the gap.",
    difficulty: "Intermediate",
  },
  {
    id: 17, asset: "BTC", assetName: "Bitcoin",
    scenario: "BTC funding rates spike to +0.15% (4-hour).",
    context: "Price flat. Open interest at record highs. Spot volume below average.",
    options: [
      { label: "Short — funding extreme", value: "short", rationale: "Contrarian on leverage", correct: true },
      { label: "Long — bulls are confident", value: "long", rationale: "Trend follow", correct: false },
      { label: "Hold", value: "hold", rationale: "Wait it out", correct: false },
    ],
    insight: "Sustained funding >+0.1% with flat price and low spot volume is a classic 'too many longs' setup. Liquidation cascades follow ~65% of the time within 72h.",
    difficulty: "Pro",
  },
  {
    id: 18, asset: "TSLA", assetName: "Tesla",
    scenario: "Tesla unveils a sub-$25K model.",
    context: "Stock spikes 9% on the news. Margins guidance unclear. Production starts in 18 months.",
    options: [
      { label: "Sell into the spike", value: "short", rationale: "Sell-the-news", correct: true },
      { label: "Buy — TAM expansion", value: "long", rationale: "New market", correct: false },
      { label: "Hold", value: "hold", rationale: "Patience", correct: false },
    ],
    insight: "18-month-out catalysts with unclear margins are perfect 'sell the news' setups — the bullish narrative gets fully priced in days; the actual financial impact is years away.",
    difficulty: "Intermediate",
  },
  {
    id: 19, asset: "SPY", assetName: "S&P 500 ETF",
    scenario: "SPY tests the 200-day MA after a 10% correction.",
    context: "VIX at 28 (elevated). Breadth: only 35% of stocks above their 50-day. Put/call ratio at 1.4.",
    options: [
      { label: "Buy — capitulation signs", value: "long", rationale: "Sentiment extremes", correct: true },
      { label: "Wait", value: "hold", rationale: "Patience", correct: false },
      { label: "Short — more downside", value: "short", rationale: "Trend follow", correct: false },
    ],
    insight: "200-day test + VIX >25 + put/call >1.3 has historically marked durable lows ~75% of the time. Confluence of fear matters more than any single signal.",
    difficulty: "Intermediate",
  },
  {
    id: 20, asset: "ETH", assetName: "Ethereum",
    scenario: "Ethereum staking yield drops below 2.5%.",
    context: "Validator queue is full. Restaking protocols (EigenLayer) absorbing capital. ETH spot ETF flows turned negative.",
    options: [
      { label: "Sell — yield no longer compelling", value: "short", rationale: "Rotation out", correct: true },
      { label: "Buy — restaking is bullish", value: "long", rationale: "New use case", correct: false },
      { label: "Hold", value: "hold", rationale: "Long-term", correct: false },
    ],
    insight: "Falling native yield + restaking siphoning capital + ETF outflows = institutional sellers. ETH has historically underperformed for 1-2 quarters from these setups.",
    difficulty: "Pro",
  },
  {
    id: 21, asset: "USDJPY", assetName: "USD/JPY",
    scenario: "BoJ intervenes verbally. USD/JPY at 158.",
    context: "Last actual intervention was at 152. MoF officials called move 'one-sided.' Carry trade flows still strong.",
    options: [
      { label: "Wait — verbal isn't actual", value: "hold", rationale: "Discipline", correct: true },
      { label: "Short JPY weakening continues", value: "long", rationale: "Trend follow", correct: false },
      { label: "Short USD/JPY now", value: "short", rationale: "Front-run intervention", correct: false },
    ],
    insight: "Verbal intervention before actual intervention rarely reverses trend by itself. The carry trade unwinds when policy actually shifts — not when officials complain.",
    difficulty: "Pro",
  },
  {
    id: 22, asset: "NVDA", assetName: "NVIDIA",
    scenario: "NVDA splits 10-for-1.",
    context: "Retail interest surges. Options activity hits records. Stock up 4% on the announcement.",
    options: [
      { label: "Buy — retail flows incoming", value: "long", rationale: "Liquidity event", correct: false },
      { label: "Hold — splits don't change value", value: "hold", rationale: "Cosmetic", correct: true },
      { label: "Short the hype", value: "short", rationale: "Sell hype", correct: false },
    ],
    insight: "Stock splits are cosmetic — market cap unchanged. Post-split rallies are entirely sentiment-driven and fade ~60% of the time within 30 days.",
    difficulty: "Beginner",
  },
  {
    id: 23, asset: "BTC", assetName: "Bitcoin",
    scenario: "BTC halving happens this week.",
    context: "Price already up 80% YTD. Last 3 halvings saw the major rally AFTER, not before.",
    options: [
      { label: "Hold through the event", value: "hold", rationale: "Avoid timing", correct: true },
      { label: "Buy more", value: "long", rationale: "Halving narrative", correct: false },
      { label: "Sell — buy the rumor", value: "short", rationale: "Sell event", correct: false },
    ],
    insight: "Halving is a known event — it's typically priced in well before. The real moves come 3-12 months later. Patience beats trying to time the actual date.",
    difficulty: "Beginner",
  },
  {
    id: 24, asset: "AAPL", assetName: "Apple",
    scenario: "Apple beats earnings but guides Q1 lower.",
    context: "Stock down 4% after-hours. Services revenue grew 18%. iPhone guidance cut on China softness.",
    options: [
      { label: "Buy — Services is the story", value: "long", rationale: "Quality narrative", correct: true },
      { label: "Sell — guidance is what matters", value: "short", rationale: "Forward looking", correct: false },
      { label: "Hold", value: "hold", rationale: "Wait it out", correct: false },
    ],
    insight: "Mix shift toward higher-margin Services is structurally bullish for AAPL multiples. Short-term guidance dips in this regime are buying opportunities.",
    difficulty: "Intermediate",
  },
  {
    id: 25, asset: "QQQ", assetName: "Nasdaq 100 ETF",
    scenario: "10-year yield crosses above 5%.",
    context: "QQQ down 2% intraday. Tech leadership weakening. Equal-weight QQQ outperforming.",
    options: [
      { label: "Rotate out of mega-cap into equal-weight", value: "hold", rationale: "Quality rotation", correct: true },
      { label: "Buy the dip in QQQ", value: "long", rationale: "Discount", correct: false },
      { label: "Short QQQ", value: "short", rationale: "Yield headwind", correct: false },
    ],
    insight: "When equal-weight outperforms cap-weighted, breadth is improving even as headline indices struggle. Rotating to quality breadth beats fighting the headline.",
    difficulty: "Pro",
  },
  {
    id: 26, asset: "TSLA", assetName: "Tesla",
    scenario: "Robotaxi event delivers underwhelming demo.",
    context: "Stock down 9% the next session. Demo lacked details on regulatory path. But FSD subscription revenue grew 60% QoQ in background.",
    options: [
      { label: "Wait for capitulation", value: "hold", rationale: "Let panic exhaust", correct: true },
      { label: "Buy the dip — FSD growth", value: "long", rationale: "Underlying business strong", correct: false },
      { label: "Short — Robotaxi was the catalyst", value: "short", rationale: "Trend follow", correct: false },
    ],
    insight: "Disappointment selloffs in stocks with strong underlying business need 2-3 days for emotional selling to exhaust. Buying day 1 catches the knife.",
    difficulty: "Intermediate",
  },
  {
    id: 27, asset: "GOLD", assetName: "Gold",
    scenario: "Gold breaks $2,800 to new all-time highs.",
    context: "Central bank buying + retail FOMO + miner shares lagging.",
    options: [
      { label: "Buy gold but avoid miners", value: "long", rationale: "Follow the metal", correct: true },
      { label: "Buy miners — they'll catch up", value: "long", rationale: "Reversion", correct: false },
      { label: "Short — too extended", value: "short", rationale: "Mean reversion", correct: false },
    ],
    insight: "When miners lag the metal at new highs, it signals institutional capital prefers physical exposure. The 'miners catch up' trade often fails for 6+ months.",
    difficulty: "Pro",
  },
  {
    id: 28, asset: "META", assetName: "Meta Platforms",
    scenario: "Meta reports record ad revenue. Stock unchanged.",
    context: "Beat top + bottom line by 8%. CEO commentary muted. Sector peers underperforming.",
    options: [
      { label: "Hold — no reaction means top", value: "hold", rationale: "Distribution signal", correct: true },
      { label: "Buy more — accumulation", value: "long", rationale: "Quiet strength", correct: false },
      { label: "Short — exhaustion", value: "short", rationale: "Top signal", correct: false },
    ],
    insight: "Strong beats with zero price reaction often signal late-cycle distribution. Watch the next 2-3 sessions: if it can't break to highs, lighten up.",
    difficulty: "Pro",
  },
  {
    id: 29, asset: "SOL", assetName: "Solana",
    scenario: "Solana memecoin volume crashes 70% in a week.",
    context: "Network revenue down 50%. Validators struggling. Real-app usage still growing.",
    options: [
      { label: "Sell — revenue collapse", value: "short", rationale: "Bearish", correct: false },
      { label: "Hold — real usage growing", value: "hold", rationale: "Long-term thesis", correct: true },
      { label: "Buy aggressively", value: "long", rationale: "Contrarian", correct: false },
    ],
    insight: "Memecoin cycles are noise — sustainable L1 value comes from real-app usage. Separating signal from noise is half of crypto edge.",
    difficulty: "Intermediate",
  },
  {
    id: 30, asset: "SPY", assetName: "S&P 500 ETF",
    scenario: "First red Monday after 8 green weeks.",
    context: "SPY -1.2%. Breadth -3:1 negative. No specific catalyst. Bond yields stable.",
    options: [
      { label: "Buy the dip — trend intact", value: "long", rationale: "Buy weakness in uptrend", correct: true },
      { label: "Sell — trend break starting", value: "short", rationale: "Distribution", correct: false },
      { label: "Hold", value: "hold", rationale: "Indecision", correct: false },
    ],
    insight: "Single red days after extended uptrends without a fundamental catalyst are typically healthy resets. Trend changes usually need a story — not just a date.",
    difficulty: "Beginner",
  },
];

export function getTodayChallenge(now: Date = new Date()): DailyChallenge {
  // UTC day-of-year, deterministic across timezones
  const start = Date.UTC(now.getUTCFullYear(), 0, 0);
  const diff = now.getTime() - start;
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return CHALLENGES[dayOfYear % CHALLENGES.length];
}

export function getChallengeCount(): number {
  return CHALLENGES.length;
}

// ───────────────────────────────────────────
// STREAK ENGINE (localStorage)
// ───────────────────────────────────────────

const STORAGE_KEY = "tradehq:daily-streak";

export interface StreakState {
  current: number;
  longest: number;
  totalCompleted: number;
  lastCompletedDate: string | null; // ISO yyyy-mm-dd UTC
  history: { date: string; challengeId: number; decision: ChallengeDecision; correct: boolean }[];
}

const DEFAULT_STATE: StreakState = {
  current: 0,
  longest: 0,
  totalCompleted: 0,
  lastCompletedDate: null,
  history: [],
};

function utcDateKey(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10);
}

function isYesterday(prev: string, todayKey: string): boolean {
  const t = new Date(todayKey + "T00:00:00Z");
  const y = new Date(t.getTime() - 86_400_000);
  return y.toISOString().slice(0, 10) === prev;
}

export function getStreak(): StreakState {
  try {
    if (typeof window === "undefined") return DEFAULT_STATE;
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as StreakState;
    // If user missed yesterday, current streak resets when they next view
    const todayKey = utcDateKey();
    if (parsed.lastCompletedDate && parsed.lastCompletedDate !== todayKey && !isYesterday(parsed.lastCompletedDate, todayKey)) {
      return { ...parsed, current: 0 };
    }
    return parsed;
  } catch {
    return DEFAULT_STATE;
  }
}

export function hasPlayedToday(): boolean {
  const s = getStreak();
  return s.lastCompletedDate === utcDateKey();
}

export function recordChallenge(challengeId: number, decision: ChallengeDecision, correct: boolean): StreakState {
  const todayKey = utcDateKey();
  const prev = getStreak();
  if (prev.lastCompletedDate === todayKey) return prev; // Already played today

  const continuingStreak = prev.lastCompletedDate && isYesterday(prev.lastCompletedDate, todayKey);
  const current = continuingStreak ? prev.current + 1 : 1;
  const longest = Math.max(prev.longest, current);

  const next: StreakState = {
    current,
    longest,
    totalCompleted: prev.totalCompleted + 1,
    lastCompletedDate: todayKey,
    history: [{ date: todayKey, challengeId, decision, correct }, ...prev.history].slice(0, 100),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {}
  return next;
}

export interface BadgeUnlock {
  threshold: number;
  label: string;
  emoji: string;
}

export const BADGES: BadgeUnlock[] = [
  { threshold: 3, label: "Spark", emoji: "✨" },
  { threshold: 7, label: "Iron Hand", emoji: "🛡️" },
  { threshold: 14, label: "Steel Mind", emoji: "⚔️" },
  { threshold: 30, label: "Diamond Hands", emoji: "💎" },
  { threshold: 100, label: "Legend", emoji: "👑" },
];

export function getUnlockedBadges(longest: number): BadgeUnlock[] {
  return BADGES.filter((b) => longest >= b.threshold);
}

export function getNextBadge(longest: number): BadgeUnlock | null {
  return BADGES.find((b) => longest < b.threshold) ?? null;
}