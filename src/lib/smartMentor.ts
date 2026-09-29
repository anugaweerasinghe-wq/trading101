/**
 * Smart Mentor — rule-based knowledge engine.
 *
 * Local fallback knowledge engine. Matches user input against a static topic
 * library when the AI chat backend is unavailable and returns educational
 * explanations with clear simulator disclaimers.
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
      "A **stop-loss** is an instruction to exit a position when price reaches a chosen level. In real markets, gaps and slippage can cause execution away from that level.\n\n" +
      "**Simulation exercise:**\n" +
      "• Pick several hypothetical risk budgets instead of assuming one universal percentage.\n" +
      "• Compare fixed-percentage, chart-based and volatility-based exit rules.\n" +
      "• Record how each rule changes simulated drawdown, average loss and turnover.\n\n" +
      "A 50% loss requires a 100% gain on the remaining capital to recover, which is arithmetic rather than a recommendation for where any stop should be placed.",
  },
  {
    id: "dca",
    keywords: ["dollar cost", "dca", "dollar-cost", "averaging"],
    title: "Dollar-Cost Averaging (DCA)",
    answer:
      "**DCA** means contributing a fixed hypothetical amount on a fixed schedule regardless of price.\n\n" +
      "**What to compare in the simulator:**\n" +
      "• Recurring purchases change the timing of entries.\n" +
      "• The average purchase price depends on the path prices take.\n" +
      "• A recurring schedule can be compared with a lump-sum assumption using the same asset and time period.\n\n" +
      "Neither method is guaranteed to outperform; the result depends on market path, costs, taxes and the assumptions used.",
  },
  {
    id: "risk-management",
    keywords: ["risk management", "manage risk", "position size", "position sizing", "how much should i risk"],
    title: "Risk Management Basics",
    answer:
      "Risk management describes how position size, exits, concentration and losses affect a portfolio over time. There is no single percentage or reward-to-risk rule that is correct for everyone.\n\n" +
      "**Simulation ideas:**\n" +
      "1. Compare several virtual risk budgets per trade.\n" +
      "2. Compare predefined exits with no exit rule and record slippage assumptions separately.\n" +
      "3. Compare different reward-to-risk targets instead of assuming 1:2 is mandatory.\n" +
      "4. Compare concentrated and diversified portfolios using the same market path.\n\n" +
      "The purpose is to understand how assumptions change simulated drawdown and variability, not to prescribe a real-money allocation.",
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
      "**Study approach:** Compare how pullbacks, moving averages and trend continuation behaved across several historical-style examples. A bull-market label does not guarantee that a dip will recover or identify an entry point.",
  },
  {
    id: "bear-market",
    keywords: ["bear market", "bearish", "downtrend", "crash"],
    title: "Bear Markets",
    answer:
      "A **bear market** = a 20%+ decline from recent highs, lasting weeks or months.\n\n" +
      "**What to study:**\n" +
      "• Compare how volatility changed during different drawdowns.\n" +
      "• Test several virtual cash and position-size assumptions.\n" +
      "• Compare sectors and assets without assuming one will always be defensive.\n" +
      "• Record how recurring-purchase assumptions behaved through declines and recoveries.\n\n" +
      "A bear-market label describes a decline; it does not prescribe what someone should buy, sell or hold.",
  },
  {
    id: "rsi",
    keywords: ["rsi", "relative strength", "overbought", "oversold"],
    title: "RSI (Relative Strength Index)",
    answer:
      "**RSI** is a momentum oscillator scaled 0–100 measuring speed and change of price moves.\n\n" +
      "• **>70** is commonly labelled overbought.\n" +
      "• **<30** is commonly labelled oversold.\n" +
      "• **50** is the midpoint of the scale.\n\n" +
      "**Reality check:** RSI describes recent momentum; it does not establish that a pullback or bounce will occur. Compare outcomes across different assets, timeframes and regimes.",
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
      "• **Hammer** — small body with a long lower wick.\n" +
      "• **Shooting star** — small body with a long upper wick.\n" +
      "• **Engulfing pattern** — one candle body covers the prior candle body.\n\n" +
      "These are visual labels, not guaranteed reversal signals. Compare both successful and failed examples in context.",
  },
  {
    id: "psychology",
    keywords: ["fomo", "fear", "greed", "psychology", "emotion", "discipline", "revenge"],
    title: "Trading Psychology",
    answer:
      "Trading decisions can be affected by emotion, attention and cognitive bias. Psychology matters, but there is no credible universal percentage that separates psychology from strategy.\n\n" +
      "**The 4 killers:**\n" +
      "• **FOMO** — chasing pumps. The trade is already over by the time you see it.\n" +
      "• **Revenge trading** — doubling down after a loss to 'win back'. This is how accounts die.\n" +
      "• **Anchoring** — refusing to sell because 'I'll wait until it gets back to my entry'.\n" +
      "• **Confirmation bias** — only reading news that supports your position.\n\n" +
      "**Practice reflection:** Record the reasoning behind simulated decisions and compare it with a predefined process. A journal is a review tool, not a cure or a guarantee of better results.",
  },
  {
    id: "diversification",
    keywords: ["diversif", "portfolio allocation", "asset allocation"],
    title: "Diversification",
    answer:
      "**Diversification** spreads exposure across different holdings; counting holdings alone does not measure it.\n\n" +
      "**A simulation comparison:**\n" +
      "• There is no universal allocation that fits everyone.\n" +
      "• In TradeHQ, compare concentrated and diversified practice portfolios and observe how volatility and drawdown change.\n" +
      "• Treat any example allocation as a simulation scenario, not a recommendation for real money.\n\n" +
      "Diversification depends on overlapping exposures and correlations, which can change. Several technology stocks may share common risks even though they are different companies.",
  },
  {
    id: "leverage",
    keywords: ["leverage", "margin", "10x", "100x", "liquidation"],
    title: "Leverage & Margin",
    answer:
      "**Leverage amplifies gains and losses.** In a simplified constant-exposure example, 10x leverage and a 10% adverse move consume the starting equity before costs. Actual liquidation can occur earlier and depends on product and broker rules.\n\n" +
      "**Reality:**\n" +
      "• High leverage can make even small market moves produce very large gains or losses; loss rates vary widely by product, market and trader.\n" +
      "• The leverage a platform offers is not a recommendation. In simulation, compare how leverage changes drawdown and liquidation distance before using it as a learning tool.\n" +
      "• TradeHQ does not provide a futures-margin or liquidation engine. Leveraged examples are conceptual calculations, not executable contract simulations.\n\n" +
      "No fixed number of practice trades makes leverage suitable or safe.",
  },
  {
    id: "crypto-basics",
    keywords: ["bitcoin", "btc", "ethereum", "eth", "crypto", "altcoin", "defi"],
    title: "Crypto Basics",
    answer:
      "Crypto assets can be highly volatile, and the range of outcomes differs substantially across tokens and periods.\n\n" +
      "**Useful comparisons:**\n" +
      "• Market capitalization and liquidity.\n" +
      "• Network design and token issuance.\n" +
      "• Custody, venue and smart-contract risks.\n" +
      "• Historical drawdowns and correlation with other risk assets.\n\n" +
      "A market-cap ranking or halving cycle does not guarantee future returns or make one token a safer real-money choice.",
  },
  {
    id: "etfs",
    keywords: ["etf", "spy", "qqq", "index fund", "vti"],
    title: "ETFs & Index Funds",
    answer:
      "**ETFs** are exchange-traded funds. Holdings, concentration, strategy and fees vary by fund; the label alone does not establish diversification or low cost.\n\n" +
      "**Examples to compare in simulation:**\n" +
      "• **SPY / VOO** — S&P 500 exposure.\n" +
      "• **QQQ** — Nasdaq-100 exposure with heavier technology concentration.\n" +
      "• **VTI** — broad US equity-market exposure.\n" +
      "• **VT** — broad global equity-market exposure.\n\n" +
      "ETF diversification depends on the underlying holdings and overlap; this mentor does not recommend a specific fund or contribution schedule.",
  },
  {
    id: "tax",
    keywords: ["tax", "capital gains", "wash sale", "tax loss"],
    title: "Trading & Taxes",
    answer:
      "Tax treatment varies by country, instrument, account type and current law. Holding-period rules, loss offsets and anti-avoidance rules are not universal.\n\n" +
      "Use current official tax guidance for the relevant jurisdiction or ask a qualified local professional. TradeHQ does not calculate personal tax liability.",
  },
  {
    id: "compounding",
    keywords: ["compound", "compounding", "interest"],
    title: "Compounding",
    answer:
      "Compounding means later percentage changes apply to a balance that includes earlier gains or losses.\n\n" +
      "**Illustrative $100K scenario at an assumed constant 10% annual return:**\n" +
      "• 10 years → about $259K\n" +
      "• 20 years → about $673K\n" +
      "• 30 years → about $1.74M\n" +
      "• 40 years → about $4.53M\n\n" +
      "The 10% rate is an input, not a forecast. Use the compound calculator to compare several assumed rates and horizons.",
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
  "Try rephrasing, or pick a topic chip below for an educational explanation.";

/**
 * Match an input string to the best-fit mentor topic.
 * Returns a static educational answer plus disclaimer, or a topic prompt.
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
    if (cashPct > 80) lines.push(`\n**Observation:** Cash represents ${cashPct.toFixed(0)}% of this simulated portfolio. Compare how different hypothetical cash weights affect drawdown and participation.`);
    else if (cashPct < 5) lines.push(`\n**Observation:** Cash is below 5% of this simulated portfolio. That is a concentration observation, not a recommendation to change it.`);
    return lines.join("\n") + DISCLAIMER;
  }

  // Risk assessment
  if (/risk|overexposed|exposure|concentration/.test(text)) {
    const lines = ["**Risk assessment:**"];
    if (ctx.topPosition && ctx.topPosition.weightPct > 30) {
      lines.push(`**Concentration observation:** ${ctx.topPosition.symbol} is ${ctx.topPosition.weightPct.toFixed(0)}% of the simulated portfolio. Compare this with alternative hypothetical concentration limits rather than assuming one universal threshold.`);
    }
    if (ctx.positionsCount === 1) lines.push(`There is one open holding; the invested portion is concentrated in that holding. Cash may still represent part of the total portfolio.`);
    if (ctx.positionsCount > 15) lines.push(`${ctx.positionsCount} positions can reduce single-name concentration, but diversification depends on overlap and correlation rather than the count alone.`);
    if (lines.length === 1) lines.push(`No single concentration flag was triggered by these simple rules. This is descriptive, not a suitability assessment.`);
    return lines.join("\n") + DISCLAIMER;
  }

  // Trade history
  if (/trade history|recent trades|review my trades|patterns/.test(text)) {
    if (ctx.tradesCount === 0) return "No simulated trades are recorded in the supplied summary. A journal can document the assumptions and outcomes of a practice exercise; no fixed number of trades proves an edge." + DISCLAIMER;
    if (ctx.tradesCount < 10) return `The supplied summary contains ${ctx.tradesCount} trades. A small sample supports only limited observations; there is no universal minimum that makes a pattern reliable.${ctx.winRate !== null ? ` Current win rate: ${ctx.winRate.toFixed(0)}%.` : ""}` + DISCLAIMER;
    const wr = ctx.winRate ?? 0;
    return `**Trade history review** (${ctx.tradesCount} trades, ${wr.toFixed(0)}% win rate):\n\n• Win rate alone does not establish performance; average gains, average losses, costs and sample size also matter.\n• Track average win and average loss in the journal.\n• Look for patterns, but treat them as hypotheses to test rather than proof of an edge.` + DISCLAIMER;
  }

  // What should I do
  if (/what should i (do|buy|sell|trade)|next move|next action/.test(text)) {
    return "I won't give you a buy, sell, allocation or sizing instruction. For simulation, write down the assumptions you want to test, choose a virtual sizing rule, define how the scenario ends, and journal why you chose those parameters. Then compare the result with an alternative rule rather than treating one setup as correct." + DISCLAIMER;
  }

  // Selected asset analysis
  if (ctx.selectedSymbol && /this asset|analyze.*asset|current asset|this coin|this stock/.test(text)) {
    const dir = (ctx.selectedChangePct ?? 0) >= 0 ? "up" : "down";
    return `**${ctx.selectedSymbol}** — ${dir} ${Math.abs(ctx.selectedChangePct ?? 0).toFixed(2)}% in the current simulator reading.\n\nFor practice, describe the higher-timeframe trend, mark any support/resistance zones as subjective observations, and compare several hypothetical exit and reward-to-risk assumptions. No minimum ratio or buy/sell action is implied.` + DISCLAIMER;
  }

  // Fall back to topic engine
  return getSmartMentorReply(input);
}