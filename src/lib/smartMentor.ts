/**
 * Smart Mentor — rule-based knowledge engine.
 *
 * Zero AI credits. Matches user input against a curated topic library
 * (trading concepts, risk, psychology, technicals, asset basics) and
 * returns expert-quality canned answers with educational disclaimers.
 *
 * Replaces the previous LLM-backed trading-mentor edge function.
 */

export interface MentorTopic {
  id: string;
  /** lowercase keywords that trigger this topic */
  keywords: string[];
  title: string;
  answer: string;
}

const DISCLAIMER = "\n\n_(Educational simulation only — not financial advice.)_";

export const MENTOR_TOPICS: MentorTopic[] = [
  {
    id: "stop-loss",
    keywords: ["stop loss", "stop-loss", "stoploss", "sl ", "protective stop"],
    title: "Stop-Loss Orders",
    answer:
      "A **stop-loss** is a pre-set exit order that closes your position once price hits a chosen level — capping the loss.\n\n" +
      "**How to set one:**\n" +
      "• Risk only 1–2% of your portfolio per trade.\n" +
      "• Place the stop below a structural level (recent swing low, moving average) — not at a round number where everyone else parks theirs.\n" +
      "• On $100K capital, that's $1K–$2K max risk per trade.\n\n" +
      "**Pro insight:** A stop-loss isn't a failure — it's the cost of being in the game. Traders who skip stops blow up eventually; the math is brutal (a 50% drawdown needs a 100% gain to recover).",
  },
  {
    id: "dca",
    keywords: ["dollar cost", "dca", "dollar-cost", "averaging"],
    title: "Dollar-Cost Averaging (DCA)",
    answer:
      "**DCA** = investing a fixed amount on a fixed schedule (e.g. $200 every Friday) regardless of price.\n\n" +
      "**Why it works:**\n" +
      "• Removes emotion — you buy mechanically.\n" +
      "• Averages your entry price across cycles.\n" +
      "• Beats most beginners who try to time the market.\n\n" +
      "**Trade-off:** In a strong uptrend, lump-sum investing usually beats DCA mathematically — but DCA wins on discipline and psychology, which is what kills most retail portfolios.",
  },
  {
    id: "risk-management",
    keywords: ["risk management", "manage risk", "position size", "position sizing", "how much should i risk"],
    title: "Risk Management Basics",
    answer:
      "Risk management is the **#1 differentiator** between traders who survive and traders who blow up.\n\n" +
      "**The 4 rules:**\n" +
      "1. **1-2% rule** — never risk more than 1–2% of total capital on one trade. On $100K, that's $1–2K max.\n" +
      "2. **Always use a stop-loss** — define your exit before you enter.\n" +
      "3. **Risk:reward ≥ 1:2** — only take trades where potential reward is at least 2× the risk.\n" +
      "4. **Diversify** — no single asset should be >20% of your portfolio.\n\n" +
      "Practice this in TradeHQ first. If you can't be disciplined with simulated $100K, you won't be disciplined with real $1K.",
  },
  {
    id: "bull-market",
    keywords: ["bull market", "bullish", "uptrend"],
    title: "Bull Markets",
    answer:
      "A **bull market** is a sustained period (typically months to years) where prices trend upward — usually defined as a 20%+ rise from recent lows.\n\n" +
      "**Characteristics:**\n" +
      "• Higher highs and higher lows on the chart.\n" +
      "• Strong economic data (GDP growth, low unemployment).\n" +
      "• Investor optimism and increasing volume.\n\n" +
      "**Trading approach:** 'Buy the dip' works in bull markets. Pullbacks to 20/50-day moving averages are typical entry zones. Stay long, trust the trend, don't try to short a bull.",
  },
  {
    id: "bear-market",
    keywords: ["bear market", "bearish", "downtrend", "crash"],
    title: "Bear Markets",
    answer:
      "A **bear market** = a 20%+ decline from recent highs, lasting weeks or months.\n\n" +
      "**What to do:**\n" +
      "• Reduce position sizes — volatility spikes.\n" +
      "• Cash is a position. Holding cash in a downtrend isn't 'missing out' — it's discipline.\n" +
      "• Look at defensive sectors (utilities, consumer staples) and gold.\n" +
      "• If you DCA, bear markets are where future returns are built — but only if you stay solvent.\n\n" +
      "**Most retail traders lose money in bears by averaging down on losers.** Don't.",
  },
  {
    id: "rsi",
    keywords: ["rsi", "relative strength", "overbought", "oversold"],
    title: "RSI (Relative Strength Index)",
    answer:
      "**RSI** is a momentum oscillator scaled 0–100 measuring speed and change of price moves.\n\n" +
      "• **>70** = overbought (potential pullback)\n" +
      "• **<30** = oversold (potential bounce)\n" +
      "• **50** = neutral / trend reset\n\n" +
      "**Reality check:** RSI alone is not a buy/sell signal. In strong trends, RSI can stay overbought (or oversold) for weeks. Use it with price action, volume, and support/resistance — not as a standalone trigger.",
  },
  {
    id: "moving-average",
    keywords: ["moving average", "ma ", "sma", "ema", "20 day", "50 day", "200 day"],
    title: "Moving Averages",
    answer:
      "A **moving average** smooths price into a single trend line.\n\n" +
      "**Key MAs:**\n" +
      "• **20-day** — short-term trend, scalp/swing entries.\n" +
      "• **50-day** — intermediate trend, key support in bull markets.\n" +
      "• **200-day** — long-term trend. Above = bull regime, below = bear regime.\n\n" +
      "**Golden cross** = 50-day crossing above 200-day → bullish. **Death cross** = 50 below 200 → bearish. They're lagging signals — confirmation, not prediction.",
  },
  {
    id: "candlestick",
    keywords: ["candlestick", "candle", "doji", "hammer", "engulfing"],
    title: "Candlestick Patterns",
    answer:
      "**Candlesticks** show open/high/low/close in one symbol — body = open-to-close, wicks = high/low.\n\n" +
      "**Must-know patterns:**\n" +
      "• **Doji** — open ≈ close. Indecision. Common at trend reversals.\n" +
      "• **Hammer** — small body, long lower wick. Bullish reversal at support.\n" +
      "• **Shooting star** — small body, long upper wick. Bearish reversal at resistance.\n" +
      "• **Bullish/Bearish engulfing** — one candle fully engulfs the prior. Strong reversal signal.\n\n" +
      "Patterns only work in context. A hammer at resistance ≠ a hammer at support.",
  },
  {
    id: "psychology",
    keywords: ["fomo", "fear", "greed", "psychology", "emotion", "discipline", "revenge"],
    title: "Trading Psychology",
    answer:
      "The market is a mirror for your emotions. **80% of trading success is psychology**, 20% is strategy.\n\n" +
      "**The 4 killers:**\n" +
      "• **FOMO** — chasing pumps. The trade is already over by the time you see it.\n" +
      "• **Revenge trading** — doubling down after a loss to 'win back'. This is how accounts die.\n" +
      "• **Anchoring** — refusing to sell because 'I'll wait until it gets back to my entry'.\n" +
      "• **Confirmation bias** — only reading news that supports your position.\n\n" +
      "**Cure:** Journal every trade. Set rules *before* you enter. TradeHQ's Ghost Journal and Revenge Blocker are built for this exact reason.",
  },
  {
    id: "diversification",
    keywords: ["diversif", "portfolio allocation", "asset allocation"],
    title: "Diversification",
    answer:
      "**Don't put all your eggs in one basket** — but don't put them in 50 baskets either.\n\n" +
      "**Practical allocation for $100K:**\n" +
      "• 60% large-cap stocks/ETFs (SPY, QQQ).\n" +
      "• 20% growth or thematic (tech, AI).\n" +
      "• 10% crypto/alternative (BTC, ETH).\n" +
      "• 10% cash / short-term bonds (dry powder).\n\n" +
      "True diversification means uncorrelated assets — owning 10 tech stocks isn't diversified, it's one bet 10 times.",
  },
  {
    id: "leverage",
    keywords: ["leverage", "margin", "10x", "100x", "liquidation"],
    title: "Leverage & Margin",
    answer:
      "**Leverage amplifies both gains AND losses.** 10x leverage means a 10% adverse move = -100% (liquidation).\n\n" +
      "**Reality:**\n" +
      "• ~80% of retail traders using high leverage blow their accounts within 12 months.\n" +
      "• Pros use leverage carefully — usually 2–3x, never 50x.\n" +
      "• In TradeHQ, practice cash-account discipline first. If you can't make money unlevered, leverage will only speed up the loss.\n\n" +
      "**Rule:** If you're new, stay unlevered for the first 100 trades.",
  },
  {
    id: "crypto-basics",
    keywords: ["bitcoin", "btc", "ethereum", "eth", "crypto", "altcoin", "defi"],
    title: "Crypto Basics",
    answer:
      "**Crypto is the most volatile mainstream asset class.** 10–20% daily moves are normal.\n\n" +
      "**Core tiers:**\n" +
      "• **BTC/ETH** — large-cap, behave like risk-on tech stocks. Lower-risk tier (still volatile).\n" +
      "• **Top-50 alts** (SOL, BNB, XRP) — higher beta, real projects.\n" +
      "• **Anything else** — speculative. Treat as 90%-loss-possible.\n\n" +
      "Cycles matter: crypto rotates capital ~every 4 years (BTC halving). Position sizing matters more than picking the winner.",
  },
  {
    id: "etfs",
    keywords: ["etf", "spy", "qqq", "index fund", "vti"],
    title: "ETFs & Index Funds",
    answer:
      "**ETFs** track baskets of assets — instant diversification, low fees.\n\n" +
      "**Beginner-friendly:**\n" +
      "• **SPY / VOO** — S&P 500. The default 'own America' bet.\n" +
      "• **QQQ** — Nasdaq-100. Tech-heavy.\n" +
      "• **VTI** — total US market.\n" +
      "• **VT** — total world market.\n\n" +
      "Warren Buffett's recommendation for 99% of investors: just DCA into a broad index ETF. It outperforms ~85% of active fund managers over 10+ years.",
  },
  {
    id: "tax",
    keywords: ["tax", "capital gains", "wash sale", "tax loss"],
    title: "Trading & Taxes",
    answer:
      "Taxes vary wildly by country — but the universals:\n\n" +
      "• **Short-term gains** (held <1 year) are usually taxed as regular income (higher rate).\n" +
      "• **Long-term gains** (>1 year) usually get preferential rates.\n" +
      "• **Tax-loss harvesting** — selling losers to offset winners is legal in most jurisdictions.\n" +
      "• **Wash sale rules** (US) — you can't claim a loss if you re-buy the same asset within 30 days.\n\n" +
      "**Speak to a local accountant** — this is not tax advice, just trading-101 framing.",
  },
  {
    id: "compounding",
    keywords: ["compound", "compounding", "interest"],
    title: "Compounding",
    answer:
      "Compounding is the **8th wonder of the world** (Einstein, allegedly).\n\n" +
      "**$100K at 10% annual return:**\n" +
      "• 10 years → $259K\n" +
      "• 20 years → $673K\n" +
      "• 30 years → $1.74M\n" +
      "• 40 years → $4.53M\n\n" +
      "**The lesson:** Time in market > timing the market. Use TradeHQ's Compound Calculator to model your own scenarios.",
  },
];

const GREETING_RESPONSE =
  "Hey! I'm your Smart Mentor — a curated trading knowledge engine.\n\n" +
  "**Try asking me about:**\n" +
  "• Stop-losses, RSI, moving averages, candlesticks\n" +
  "• Bull/bear markets, leverage, position sizing\n" +
  "• Dollar-cost averaging, diversification, compounding\n" +
  "• Trading psychology, FOMO, revenge trading\n" +
  "• Crypto, ETFs, taxes\n\n" +
  "Type a topic or pick a suggestion below.";

const FALLBACK_RESPONSE =
  "I don't have a curated lesson for that exact phrase yet, but here's what I can help with:\n\n" +
  "**Strategy & risk:** stop-losses, position sizing, risk-reward, diversification.\n" +
  "**Technicals:** RSI, moving averages, candlestick patterns, support/resistance.\n" +
  "**Psychology:** FOMO, revenge trading, discipline.\n" +
  "**Markets:** bull/bear markets, leverage, crypto, ETFs.\n\n" +
  "Try rephrasing, or pick a topic chip below — I'll give you a deep, actionable answer.";

/**
 * Match an input string to the best-fit mentor topic.
 * Returns an expert canned answer + disclaimer, or a friendly fallback.
 */
export function getSmartMentorReply(input: string): string {
  const text = input.toLowerCase().trim();

  if (!text) return GREETING_RESPONSE + DISCLAIMER;

  // Greetings
  if (/^(hi|hey|hello|sup|yo|hola)\b/.test(text)) {
    return GREETING_RESPONSE + DISCLAIMER;
  }

  // Score topics by keyword overlap
  let best: { topic: MentorTopic; score: number } | null = null;
  for (const topic of MENTOR_TOPICS) {
    let score = 0;
    for (const kw of topic.keywords) {
      if (text.includes(kw)) score += kw.length; // longer matches win
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { topic, score };
    }
  }

  if (best) return best.topic.answer + DISCLAIMER;
  return FALLBACK_RESPONSE + DISCLAIMER;
}

/**
 * Suggested starter questions for the mentor UI.
 */
export const MENTOR_SUGGESTIONS = [
  "What is a bull market?",
  "Explain stop-loss orders",
  "How do I manage risk?",
  "What is dollar-cost averaging?",
  "Explain RSI",
  "How does leverage work?",
];

/**
 * Async AI reply with multi-LLM backend (Gemini → Groq → Lovable Gemini)
 * and rule-based smart-mentor as a guaranteed last-resort fallback.
 */
import { supabase } from "@/integrations/supabase/client";

export async function getAIReply(
  input: string,
  opts: { system?: string; history?: { role: "user" | "assistant"; content: string }[] } = {},
): Promise<string> {
  try {
    const { data, error } = await supabase.functions.invoke("ai-chat", {
      body: { message: input, system: opts.system, history: opts.history },
    });
    if (error) throw error;
    const text = (data as { text?: string })?.text;
    if (text && text.trim()) return text.trim();
  } catch (e) {
    console.warn("AI chat failed, using rule-based fallback", e);
  }
  return getSmartMentorReply(input);
}

export async function getPortfolioAIReply(
  input: string,
  ctx: PortfolioContext,
  history?: { role: "user" | "assistant"; content: string }[],
): Promise<string> {
  const ctxLines = [
    `User portfolio: total $${ctx.totalValue.toFixed(0)}, cash $${ctx.cash.toFixed(0)}, ${ctx.positionsCount} positions, ${ctx.tradesCount} trades${ctx.winRate !== null ? `, win rate ${ctx.winRate.toFixed(0)}%` : ""}.`,
    ctx.topPosition ? `Top position: ${ctx.topPosition.symbol} at ${ctx.topPosition.weightPct.toFixed(0)}% weight, P&L ${ctx.topPosition.pnlPct >= 0 ? "+" : ""}${ctx.topPosition.pnlPct.toFixed(1)}%.` : "",
    ctx.selectedSymbol ? `Currently viewing ${ctx.selectedSymbol} (${(ctx.selectedChangePct ?? 0) >= 0 ? "+" : ""}${(ctx.selectedChangePct ?? 0).toFixed(2)}% today).` : "",
  ].filter(Boolean).join(" ");

  const system = `You are TradeHQ's AI Trading Mentor with FULL access to the user's live simulated portfolio.
${ctxLines}
Rules: be concise (under 120 words), conversational, no markdown headers. Reference their real numbers when relevant. Never give buy/sell signals. End every reply with: (Educational simulation only — not financial advice.)`;

  try {
    const { data, error } = await supabase.functions.invoke("ai-chat", {
      body: { message: input, system, history },
    });
    if (error) throw error;
    const text = (data as { text?: string })?.text;
    if (text && text.trim()) return text.trim();
  } catch (e) {
    console.warn("AI portfolio chat failed, using rule-based fallback", e);
  }
  return getPortfolioMentorReply(input, ctx);
}

/**
 * Portfolio-aware Smart Mentor reply.
 * Used by the in-trade sidebar — combines topic match with real portfolio stats.
 */
export interface PortfolioContext {
  cash: number;
  totalValue: number;
  positionsCount: number;
  tradesCount: number;
  winRate: number | null; // 0-100 or null if not enough sells
  topPosition?: { symbol: string; weightPct: number; pnlPct: number } | null;
  selectedSymbol?: string | null;
  selectedChangePct?: number | null;
}

function fmt(n: number): string {
  if (n >= 1000) return `$${(n / 1000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

export function getPortfolioMentorReply(input: string, ctx: PortfolioContext): string {
  const text = input.toLowerCase().trim();

  // Portfolio analysis
  if (/portfolio|positions?|my (cash|balance|holdings?)|analy[sz]e my/.test(text)) {
    const lines = [
      `**Your portfolio at a glance:**`,
      `• Total value: ${fmt(ctx.totalValue)}`,
      `• Cash: ${fmt(ctx.cash)} (${((ctx.cash / ctx.totalValue) * 100).toFixed(0)}% of book)`,
      `• Positions: ${ctx.positionsCount}`,
      `• Trades executed: ${ctx.tradesCount}`,
      ctx.winRate !== null ? `• Win rate: ${ctx.winRate.toFixed(0)}%` : `• Win rate: not enough closed trades yet`,
    ];
    if (ctx.topPosition) {
      lines.push(
        `\n**Top position:** ${ctx.topPosition.symbol} — ${ctx.topPosition.weightPct.toFixed(0)}% of book, P&L ${ctx.topPosition.pnlPct >= 0 ? "+" : ""}${ctx.topPosition.pnlPct.toFixed(2)}%`,
      );
    }
    const cashPct = (ctx.cash / ctx.totalValue) * 100;
    if (cashPct > 80) lines.push(`\n**Observation:** You're sitting on heavy cash (${cashPct.toFixed(0)}%) — consider DCAing into a few positions.`);
    else if (cashPct < 5) lines.push(`\n**Observation:** Almost fully invested. Keep some dry powder (5-15%) for opportunities.`);
    return lines.join("\n") + DISCLAIMER;
  }

  // Risk assessment
  if (/risk|overexposed|exposure|concentration/.test(text)) {
    const lines = ["**Risk assessment:**"];
    if (ctx.topPosition && ctx.topPosition.weightPct > 30) {
      lines.push(`⚠️ **Concentration risk** — ${ctx.topPosition.symbol} is ${ctx.topPosition.weightPct.toFixed(0)}% of your book. Rule of thumb: no single asset >20%.`);
    }
    if (ctx.positionsCount === 1) lines.push(`⚠️ Only one position — that's not a portfolio, it's a bet.`);
    if (ctx.positionsCount > 15) lines.push(`⚠️ ${ctx.positionsCount} positions — likely over-diversified. You can't track that many edges.`);
    if (lines.length === 1) lines.push(`✓ Allocation looks reasonable. Maintain 1-2% risk per trade and 5-15% cash reserve.`);
    return lines.join("\n") + DISCLAIMER;
  }

  // Trade history
  if (/trade history|recent trades|review my trades|patterns/.test(text)) {
    if (ctx.tradesCount === 0) return "You haven't placed any trades yet. Start with a small position on a familiar asset, journal your reasoning, and we'll review patterns once you have 10+ trades." + DISCLAIMER;
    if (ctx.tradesCount < 10) return `You have ${ctx.tradesCount} trades — too few for pattern analysis. Aim for 20-30 closed trades before drawing conclusions.${ctx.winRate !== null ? ` Current win rate: ${ctx.winRate.toFixed(0)}%.` : ""}` + DISCLAIMER;
    const wr = ctx.winRate ?? 0;
    const verdict = wr >= 55 ? "above average" : wr >= 45 ? "average" : "below average";
    return `**Trade history review** (${ctx.tradesCount} trades, ${wr.toFixed(0)}% win rate — ${verdict}):\n\n• Win rate alone is misleading without R-multiple. A 40% win rate with 3:1 winners beats 60% with 1:1.\n• Track avg-win / avg-loss in your journal.\n• Look for time-of-day or asset-class patterns.` + DISCLAIMER;
  }

  // What should I do
  if (/what should i (do|buy|sell|trade)|next move|next action/.test(text)) {
    return "I won't give you specific buy/sell calls — that's the line between mentor and signal-seller. What I will say:\n\n1. Define your edge in one sentence.\n2. Size positions so a stop-out costs ≤1-2% of book.\n3. Pre-write your exit (target + stop) before entry.\n4. Journal *why* — entries with no reason are gambling." + DISCLAIMER;
  }

  // Selected asset analysis
  if (ctx.selectedSymbol && /this asset|analyze.*asset|current asset|this coin|this stock/.test(text)) {
    const dir = (ctx.selectedChangePct ?? 0) >= 0 ? "up" : "down";
    return `**${ctx.selectedSymbol}** — ${dir} ${Math.abs(ctx.selectedChangePct ?? 0).toFixed(2)}% today.\n\nWithout giving a call, here's a framework:\n• Mark the higher-timeframe trend (daily, weekly).\n• Identify the nearest support and resistance.\n• Define risk:reward before entering — minimum 1:2.\n• If the chart confuses you, pass. Cash is a position.` + DISCLAIMER;
  }

  // Fall back to topic engine
  return getSmartMentorReply(input);
}