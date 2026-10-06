/**
 * Smart Mentor — rule-based knowledge engine.
 *
 * Zero AI credits. Matches user input against a curated topic library
 * (trading concepts, risk, psychology, technicals, asset basics) and
 * returns authored topic answers with educational disclaimers.
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
      "A stop order uses a trigger price; it does not cap the final loss or guarantee a fill. Gaps and liquidity can produce a worse execution. For a hypothetical $100,000 account, a chosen 1% or 2% loss assumption is $1,000 or $2,000, but those are arbitrary practice settings. TradeHQ executes market orders; stop mechanics are conceptual. Record an exit assumption and compare it with the actual practice result.",
  },
  {
    id: "dca",
    keywords: ["dollar cost", "dca", "dollar-cost", "averaging"],
    title: "Dollar-Cost Averaging (DCA)",
    answer:
      "Dollar-cost averaging means contributing a fixed amount on a stated schedule. For example, $200 each Friday changes purchase timing and the units acquired. It does not guarantee a lower average cost, better returns or emotional discipline. Compare equal total contributions under scheduled purchases and a lump-sum hypothetical example, including a declining-price path.",
  },
  {
    id: "risk-management",
    keywords: ["risk management", "manage risk", "position size", "position sizing", "how much should i risk"],
    title: "Risk Management Basics",
    answer:
      "Risk review compares exposure, realized gains and losses, costs and drawdown. Choose several hypothetical position sizes and document the assumptions instead of using a universal risk percentage, minimum reward-to-risk ratio or maximum asset weight. A planned exit does not guarantee a maximum loss. TradeHQ can illustrate practice portfolio accounting without certifying a real-money risk plan.",
  },
  {
    id: "bull-market",
    keywords: ["bull market", "bullish", "uptrend"],
    title: "Bull Markets",
    answer:
      "Bull market describes a sustained rising market; a twenty-percent rise is a commonly used convention, not a trading instruction. Rising past prices do not establish that a dip will recover or that a moving average provides an entry. For a practice exercise, describe the observation period and compare continuation with reversal outcomes.",
  },
  {
    id: "bear-market",
    keywords: ["bear market", "bearish", "downtrend", "crash"],
    title: "Bear Markets",
    answer:
      "Bear market commonly describes a substantial decline, often using a twenty-percent convention. It does not prescribe cash, gold, defensive sectors or additional purchases. Compare hypothetical exposures and price shocks with the same starting balance. A declining asset can keep falling and a recovery is not guaranteed.",
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
      "A moving average summarizes a specified historical price series. Different periods and SMA/EMA methods produce different values. A shorter average crossing a longer one describes that series and lags price changes; it does not prove an entry, support level or future direction. Compare settings and record where their descriptions differ.",
  },
  {
    id: "candlestick",
    keywords: ["candlestick", "candle", "doji", "hammer", "engulfing"],
    title: "Candlestick Patterns",
    answer:
      "A candlestick shows open, high, low and close for a stated interval. Doji, hammer and engulfing names describe shapes, not guaranteed reversals. Inspect the data source and interval before interpreting the chart. TradeHQ can show provider candles or generated practice candles, and neither shape establishes the next move.",
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
      "**Cure:** Journal every trade. Set rules *before* you enter. TradeHQ's Ghost Journal and Revenge Blocker are built for this exact reason.",
  },
  {
    id: "diversification",
    keywords: ["diversif", "portfolio allocation", "asset allocation"],
    title: "Diversification",
    answer:
      "**Don't put all your eggs in one basket** — but don't put them in 50 baskets either.\n\n" +
      "**Practical allocation for $100K:**\n" +
      "• There is no universal allocation that fits everyone.\n" +
      "• In TradeHQ, compare concentrated and diversified practice portfolios and observe how volatility and drawdown change.\n" +
      "• Treat any example allocation as a simulation scenario, not a recommendation for real money.\n\n" +
      "True diversification means uncorrelated assets — owning 10 tech stocks isn't diversified, it's one bet 10 times.",
  },
  {
    id: "leverage",
    keywords: ["leverage", "margin", "10x", "100x", "liquidation"],
    title: "Leverage & Margin",
    answer:
      "Leverage increases gains and losses relative to funds committed. In simplified arithmetic, a ten-percent adverse move on ten-times exposure equals the original funds before costs, but actual margin calls and liquidation may occur earlier and losses can exceed a deposit. Requirements depend on the product and provider. TradeHQ spot practice does not implement futures margin or leverage.",
  },
  {
    id: "crypto-basics",
    keywords: ["bitcoin", "btc", "ethereum", "eth", "crypto", "altcoin", "defi"],
    title: "Crypto Basics",
    answer:
      "Cryptocurrencies have different network designs, issuance, custody and operational risks. Volatility and correlation depend on the asset and observation period; neither market-cap rank nor a halving schedule establishes a safe tier or a predictable four-year return cycle. Compare equal hypothetical exposures rather than presume a universal daily move or a reliable price forecast.",
  },
  {
    id: "etfs",
    keywords: ["etf", "spy", "qqq", "index fund", "vti"],
    title: "ETFs & Index Funds",
    answer:
      "An ETF provides the exposure defined by its objective and holdings. Fees, leverage, concentration and overlaps vary by fund. SPY and QQQ illustrate different index exposures, but no fund is universally beginner-friendly or assuredly low risk. Use current fund documents and compare hypothetical positions without a claimed outperformance rate.",
  },
  {
    id: "tax",
    keywords: ["tax", "capital gains", "wash sale", "tax loss"],
    title: "Trading & Taxes",
    answer:
      "Tax treatment depends on the country, asset, account type, holding period and the rules in force at the time. TradeHQ cannot determine what tax rate, loss rule or reporting requirement applies to a specific user.\n\n" +
      "For real-money activity, check the current guidance published by your tax authority or ask a qualified local tax professional. The simulator itself uses virtual money and this explanation is educational, not tax advice.",
  },
  {
    id: "compounding",
    keywords: ["compound", "compounding", "interest"],
    title: "Compounding",
    answer:
      "Hypothetical arithmetic: $100,000 with a fixed ten-percent effective annual gain and no contributions or costs becomes about $259,374 after ten years and $672,750 after twenty. The positive rate is an assumption, not a forecast or an investing rule. Negative returns and costs change the path; compare several scenarios rather than use one result as a promise.",
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
  return "Rule-based educational response (AI service unavailable):\n\n" + getSmartMentorReply(input);
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
  return "Rule-based educational response (AI service unavailable):\n\n" + getPortfolioMentorReply(input, ctx);
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
    if (cashPct > 80) lines.push(`\n**Observation:** You're sitting on heavy cash (${cashPct.toFixed(0)}%) — compare how different hypothetical cash weights change the practice result; this percentage does not prescribe purchases.`);
    else if (cashPct < 5) lines.push(`\n**Observation:** Cash is ${cashPct.toFixed(0)}% of the practice portfolio. Compare alternative weights without treating a cash band as a universal requirement.`);
    return lines.join("\n") + DISCLAIMER;
  }

  // Risk assessment
  if (/risk|overexposed|exposure|concentration/.test(text)) {
    const lines = ["**Risk review:**"];
    if (ctx.topPosition && ctx.topPosition.weightPct > 30) {
      lines.push(`• ${ctx.topPosition.symbol} is ${ctx.topPosition.weightPct.toFixed(0)}% of the simulated portfolio. That is a useful concentration scenario to stress-test, but there is no universal percentage that automatically makes a position acceptable or unacceptable.`);
    }
    if (ctx.positionsCount === 1) lines.push("• A one-position simulated portfolio is fully dependent on one asset. Compare that outcome with a diversified practice portfolio.");
    if (ctx.positionsCount > 15) lines.push(`• The portfolio has ${ctx.positionsCount} positions. Position count alone does not determine diversification; check weights and how strongly the holdings move together.`);
    if (lines.length === 1) lines.push("• Review position weights, correlation, liquidity assumptions and how the portfolio behaves under different simulated losses. Choose any practice risk limit explicitly and test it rather than treating one percentage as universal.");
    return lines.join("\n") + DISCLAIMER;
  }

  // Trade history
  if (/trade history|recent trades|review my trades|patterns/.test(text)) {
    if (ctx.tradesCount === 0) return "You haven't placed any trades yet. Start with a small position on a familiar asset, journal your reasoning, and we'll review patterns once you have 10+ trades." + DISCLAIMER;
    if (ctx.tradesCount < 10) return `You have ${ctx.tradesCount} trades — too few for pattern analysis. The sample is small; no universal trade count establishes a dependable pattern.${ctx.winRate !== null ? ` Current win rate: ${ctx.winRate.toFixed(0)}%.` : ""}` + DISCLAIMER;
    const wr = ctx.winRate ?? 0;
    const verdict = "descriptive sample; no benchmark ranking";
    return `**Trade history review** (${ctx.tradesCount} trades, ${wr.toFixed(0)}% win rate — ${verdict}):\n\n• Win rate alone is misleading without R-multiple. With fixed realized 3R wins and 1R losses,40%wins gives0.6R gross expectancy;60%wins at1R gives0.2R beforecosts. These are hypothetical inputs.\n• Track avg-win / avg-loss in your journal.\n• Look for time-of-day or asset-class patterns.` + DISCLAIMER;
  }

  // What should I do
  if (/what should i (do|buy|sell|trade)|next move|next action/.test(text)) {
    return "I won't give you specific buy/sell calls. For a simulation, you can instead:\n\n1. Write the idea or assumption you want to test.\n2. Choose a practice risk limit and record why you chose it; no single percentage is universally correct.\n3. Define the conditions that would make you exit, while remembering that real orders may not fill at the planned price.\n4. Journal the reasoning so you can compare the plan with the outcome later." + DISCLAIMER;
  }

  // Selected asset analysis
  if (ctx.selectedSymbol && /this asset|analyze.*asset|current asset|this coin|this stock/.test(text)) {
    const dir = (ctx.selectedChangePct ?? 0) >= 0 ? "up" : "down";
    return `**${ctx.selectedSymbol}** — ${dir} ${Math.abs(ctx.selectedChangePct ?? 0).toFixed(2)}% today.\n\nWithout giving a call, here's a framework:\n• Mark the higher-timeframe trend (daily, weekly).\n• Identify the nearest support and resistance.\n• Compare the planned downside and upside assumptions before a simulated entry; a ratio does not guarantee an outcome.\n• If the setup is unclear, record what information is missing instead of forcing a simulated decision.` + DISCLAIMER;
  }

  // Fall back to topic engine
  return "Rule-based educational response (AI service unavailable):\n\n" + getSmartMentorReply(input);
}