// Programmatic SEO content library — curated, unique copy per page.
// Keeps all content static (no runtime LLM cost) so it ships free + fast.

export interface ComparePair {
  slug: string;        // e.g. "bitcoin-vs-ethereum"
  a: { symbol: string; name: string; tag: string };
  b: { symbol: string; name: string; tag: string };
  intro: string;       // 2-3 sentences, unique per pair
  verdict: string;     // who wins, when
  bullets: string[];   // 4 differentiators
}

export const COMPARE_PAIRS: ComparePair[] = [
  {
    slug: "bitcoin-vs-ethereum",
    a: { symbol: "BTC", name: "Bitcoin", tag: "Digital gold" },
    b: { symbol: "ETH", name: "Ethereum", tag: "Smart-contract platform" },
    intro: "Bitcoin is the original cryptocurrency built as a scarce digital store of value. Ethereum is a programmable settlement layer powering DeFi, NFTs and most of Web3. Picking between them is a question of conviction: hard-money savings vs. an internet-native economy.",
    verdict: "BTC for long-horizon savings and macro hedge exposure. ETH for upside on app-layer adoption, staking yield and L2 throughput growth.",
    bullets: [
      "Supply: BTC is capped at 21M; ETH issuance is variable and currently slightly deflationary post-Merge.",
      "Yield: BTC has no native yield; ETH stakers earn ~3-4% APR on Lovable practice models.",
      "Use case: BTC = settlement and reserve asset; ETH = computation, DeFi rails, tokenization.",
      "Volatility: ETH typically swings 1.3-1.6x harder than BTC during risk-on/off cycles.",
    ],
  },
  {
    slug: "tesla-vs-nvidia",
    a: { symbol: "TSLA", name: "Tesla", tag: "EV + energy + AI" },
    b: { symbol: "NVDA", name: "Nvidia", tag: "AI compute monopoly" },
    intro: "Tesla blends auto, energy storage and an emerging humanoid/robotaxi narrative. Nvidia is the picks-and-shovels supplier of the entire AI buildout. Both are high-beta names, but the drivers behind them are completely different.",
    verdict: "NVDA for direct exposure to AI capex cycles. TSLA for asymmetric long-tail bets on autonomy, energy and Optimus.",
    bullets: [
      "Moat: NVDA owns CUDA + the AI accelerator stack; TSLA owns vertical EV manufacturing + FSD data.",
      "Margins: NVDA gross margin ~75% in data center; TSLA auto gross margin ~17-20%.",
      "Risk: NVDA depends on hyperscaler capex; TSLA depends on demand cycles + execution.",
      "Beta: TSLA typically 2.0+, NVDA ~1.7 — both punish leverage in drawdowns.",
    ],
  },
  {
    slug: "bitcoin-vs-gold",
    a: { symbol: "BTC", name: "Bitcoin", tag: "Digital store of value" },
    b: { symbol: "GLD", name: "Gold", tag: "Physical hedge" },
    intro: "Both are non-yielding scarce assets, but they trade very differently in stress. Gold is the 5,000-year hedge with central-bank demand. Bitcoin is the 16-year-old digital alternative with a fixed supply schedule and rising sovereign adoption.",
    verdict: "Gold for stability and currency-crisis insurance. Bitcoin for asymmetric upside if adoption keeps compounding.",
    bullets: [
      "Volatility: Gold ~15% annualised; Bitcoin ~60-80% — sizing must reflect that gap.",
      "Correlation: Both decoupled from equities in 2025 risk-off; BTC re-coupled briefly in liquidity crunches.",
      "Carry: Neither pays yield; storage cost differs (vault fees vs. self-custody hardware).",
      "Liquidity: Gold trades 24/5 via futures; BTC trades 24/7/365 with deep on-chain settlement.",
    ],
  },
  {
    slug: "apple-vs-microsoft",
    a: { symbol: "AAPL", name: "Apple", tag: "Consumer hardware + services" },
    b: { symbol: "MSFT", name: "Microsoft", tag: "Enterprise cloud + AI" },
    intro: "Apple owns the consumer ecosystem and recurring services revenue. Microsoft owns enterprise productivity and is the primary commercial distribution channel for OpenAI. Both are mega-cap defensives but with very different growth engines.",
    verdict: "MSFT for enterprise AI tailwinds via Azure + Copilot. AAPL for buyback-driven shareholder yield and brand moat.",
    bullets: [
      "Growth: MSFT cloud growth ~20-25% YoY; AAPL services ~12-15%, hardware flat-to-low single digits.",
      "AI exposure: MSFT direct via Azure/OpenAI; AAPL indirect via on-device intelligence.",
      "Capital return: AAPL is the largest buyback program in history; MSFT prefers reinvestment + smaller dividends.",
      "Regulatory: AAPL faces App Store antitrust pressure; MSFT navigating EU AI Act + cloud bundling probes.",
    ],
  },
  {
    slug: "ethereum-vs-solana",
    a: { symbol: "ETH", name: "Ethereum", tag: "L1 + L2 ecosystem" },
    b: { symbol: "SOL", name: "Solana", tag: "Monolithic high-throughput chain" },
    intro: "Ethereum scales through rollups (L2s) and prioritises decentralisation. Solana scales by running a single fast chain with parallel execution. Both lead in DeFi and tokenization but make opposite architectural bets.",
    verdict: "ETH for credibly neutral settlement and the largest developer base. SOL for consumer apps, payments and high-frequency on-chain UX.",
    bullets: [
      "Throughput: SOL ~2,000-4,000 TPS sustained; ETH L1 ~15 TPS, with L2s aggregating much higher.",
      "Fees: SOL averages <$0.01; ETH L1 spikes during NFT/airdrop seasons, L2s sit at $0.05-$0.30.",
      "Outage risk: SOL has had multi-hour outages historically; ETH has never halted.",
      "Yield: ETH staking ~3-4% APR; SOL staking ~6-8% with higher inflation offset.",
    ],
  },
  {
    slug: "stocks-vs-crypto",
    a: { symbol: "SPY", name: "Stocks (S&P 500)", tag: "Equity index" },
    b: { symbol: "BTC", name: "Crypto (Bitcoin)", tag: "Digital asset" },
    intro: "A 60/40 question for the 2026 saver: equities give you fractional ownership of cash-flowing businesses, crypto gives you exposure to a new monetary and settlement layer. The smart approach is rarely 'one or the other' — it's how much of each.",
    verdict: "Most beginners should anchor in index equities and use a small (5-10%) crypto allocation for asymmetric upside.",
    bullets: [
      "Returns: S&P 500 ~10%/yr long-term; BTC has compounded faster but with massive drawdowns.",
      "Drawdowns: S&P max ~55% (2008); BTC has had 4 separate >75% drawdowns.",
      "Yield: Equities pay dividends + buybacks; BTC is non-yielding unless lent.",
      "Access: Both fractional and 24/7 on TradeHQ's $100K practice account.",
    ],
  },
  {
    slug: "nvidia-vs-amd",
    a: { symbol: "NVDA", name: "Nvidia", tag: "AI accelerator leader" },
    b: { symbol: "AMD", name: "AMD", tag: "Challenger + CPU strength" },
    intro: "Nvidia is the incumbent in AI training silicon with the CUDA software moat. AMD has the strongest credible alternative roadmap (MI300/MI400) and dominates server CPUs via EPYC. The trade is incumbency vs. catch-up.",
    verdict: "NVDA for compounding dominance. AMD for higher torque if hyperscaler diversification accelerates.",
    bullets: [
      "Software moat: NVDA's CUDA has 15+ years of developer lock-in; AMD's ROCm is closing the gap.",
      "Margins: NVDA data-center gross margin ~75%; AMD ~50%.",
      "Multiple: NVDA usually trades at a higher P/E reflecting the moat premium.",
      "Catalyst: Both ride AI capex; AMD has more re-rating upside per dollar of share gain.",
    ],
  },
  {
    slug: "forex-vs-stocks",
    a: { symbol: "FX", name: "Forex", tag: "24/5 currency markets" },
    b: { symbol: "Stocks", name: "Equities", tag: "Company ownership" },
    intro: "Forex is the largest, most liquid market in the world but trades macroeconomic differentials, not company fundamentals. Stocks are slower-moving but tied to durable cash flow and innovation. They reward completely different skill sets.",
    verdict: "Stocks for compounding wealth on a multi-year horizon. Forex for tactical macro and short-term technical traders.",
    bullets: [
      "Liquidity: FX trades ~$7T/day; equities trade ~$500B/day globally.",
      "Leverage: FX commonly 30-100x; equity margin caps at ~2x without options.",
      "Hours: FX 24/5; equities limited to regional sessions.",
      "Edge: FX edge comes from macro + flow; equity edge from research + duration.",
    ],
  },
];

// ============================================================================
// "How to trade X" pages — beginner long-tail intent
// ============================================================================
export interface HowToAsset {
  symbol: string;       // lowercase slug, e.g. "btc"
  name: string;
  fullName: string;
  type: "crypto" | "stock" | "etf" | "forex" | "commodity";
  whyTrade: string;
  steps: string[];      // 5 steps
  beginnerTip: string;
  risk: string;
  studentNote: string;  // localized for SL audience
}

export const HOWTO_ASSETS: HowToAsset[] = [
  {
    symbol: "btc",
    name: "BTC",
    fullName: "Bitcoin",
    type: "crypto",
    whyTrade: "Bitcoin trades 24/7, has the deepest crypto liquidity, and reacts strongly to macro liquidity shifts — perfect for learning volatility on a practice account.",
    steps: [
      "Open TradeHQ's free $100K practice account — no signup required.",
      "Navigate to /trade/btc to see the live BTC chart and order panel.",
      "Start with a small simulated position (1-2% of practice capital) to learn order flow.",
      "Set a stop-loss below recent support; never trade without one, even on practice.",
      "Journal every entry, exit and reason — the Ghost Journal does this automatically.",
    ],
    beginnerTip: "Use the 1-hour chart with RSI(14) and the 20/50 EMA. Most rookies blow accounts by trading 1-minute candles.",
    risk: "BTC can move 5-10% in a day. On real money that obliterates undersized accounts. Practice sizing here first.",
    studentNote: "For Sri Lankan students: even when LKR is volatile, treat BTC as an educational asset, not a savings plan. Master discipline first, capital second.",
  },
  {
    symbol: "eth",
    name: "ETH",
    fullName: "Ethereum",
    type: "crypto",
    whyTrade: "Ethereum captures DeFi, L2 and staking narratives. It's the second-deepest crypto market and a cleaner trade for tech-driven setups than alt-coins.",
    steps: [
      "Launch your free TradeHQ practice account.",
      "Open /trade/eth and study the 4-hour chart for clean structure.",
      "Watch ETH/BTC ratio — if rising, ETH is leading; if falling, BTC is dominant.",
      "Place a simulated buy at a higher-low; set stop below the low and target the prior swing high.",
      "Review the trade in your portfolio analytics — was the R-multiple worth it?",
    ],
    beginnerTip: "ETH trades cleaner technicals than most alts. Stick with horizontal support/resistance before chasing indicators.",
    risk: "Smart-contract narratives can flip overnight (exploits, regulation). Size positions assuming a 30% gap is possible.",
    studentNote: "Students: use ETH practice trades to learn risk-reward — not to time tops. Most pros agree timing is the hardest skill.",
  },
  {
    symbol: "tsla",
    name: "TSLA",
    fullName: "Tesla",
    type: "stock",
    whyTrade: "TSLA is one of the most-traded retail stocks on the planet, with huge options volume and earnings volatility — ideal for practising event-driven setups.",
    steps: [
      "Open the TradeHQ practice account.",
      "Go to /trade/tsla and pull the daily + 1-hour timeframes side by side.",
      "Identify the trend on daily; trade pullbacks on 1-hour in that direction only.",
      "Use a 1.5-2x ATR stop; size the position so a stop-out loses ≤1% of practice equity.",
      "After earnings, journal whether the move respected your invalidation level.",
    ],
    beginnerTip: "Avoid trading TSLA into earnings unless you understand options-implied moves. Sit out the event, trade the reaction.",
    risk: "TSLA can gap 8-12% on earnings. A 10x leveraged FX-style mindset will be liquidated here.",
    studentNote: "Sri Lankan students: US market hours are late evening local time — practise during weekends to build the habit without sleep loss.",
  },
  {
    symbol: "nvda",
    name: "NVDA",
    fullName: "Nvidia",
    type: "stock",
    whyTrade: "NVDA is the cleanest pure-play on AI compute demand. It trends hard in cycles and rewards patient trend-followers more than fast scalpers.",
    steps: [
      "Spin up your free TradeHQ practice account.",
      "Open /trade/nvda. Mark the 50-day and 200-day moving averages on the daily chart.",
      "Wait for a pullback to the 50-day in a confirmed uptrend.",
      "Buy small, stop below the 200-day or the last swing low.",
      "Trail your stop under each new higher-low — let winners run.",
    ],
    beginnerTip: "NVDA respects trend more than most names. Don't shortcut it with reversal trades.",
    risk: "AI capex cycles can pause without warning (hyperscaler guidance cuts). Always know your exit.",
    studentNote: "Practise compounding here — a 2% R-trade weekly on NVDA, over 50 weeks, teaches more than chasing 10x crypto setups.",
  },
  {
    symbol: "spy",
    name: "SPY",
    fullName: "S&P 500 ETF",
    type: "etf",
    whyTrade: "SPY is the global benchmark. Learning to read its trend teaches you risk-on/off conditions for every other asset you'll ever trade.",
    steps: [
      "Open the TradeHQ practice account.",
      "Navigate to /trade/spy.",
      "Use the daily chart with VWAP and the 20-day EMA.",
      "Trade only in the direction of the daily trend on intraday timeframes.",
      "Track P&L vs. simply holding SPY — does your activity actually add alpha?",
    ],
    beginnerTip: "Most retail traders underperform a simple SPY DCA. Practising here will show you why — and how to beat it.",
    risk: "SPY rarely moves >2% in a day, but leverage products on it can wipe accounts during gaps.",
    studentNote: "For long-term Sri Lankan investors: SPY practice teaches that boring, consistent exposure beats most trading attempts.",
  },
  {
    symbol: "sol",
    name: "SOL",
    fullName: "Solana",
    type: "crypto",
    whyTrade: "SOL has tighter spreads than most alts, hot consumer narratives (memecoins, payments) and trends harder than ETH in risk-on regimes.",
    steps: [
      "Open your TradeHQ practice account.",
      "Open /trade/sol and check SOL/BTC ratio for relative strength.",
      "Identify a higher-timeframe range; only buy near the bottom of that range.",
      "Set invalidation just below the range low.",
      "Take partial profits at the mid-range; let the rest ride to the top.",
    ],
    beginnerTip: "SOL trends explosively but reverses just as fast. Lock in partials — perfection is the enemy of profit.",
    risk: "Network outages have happened. Don't be max-leveraged through low-liquidity weekends.",
    studentNote: "Use SOL practice to learn position-sizing on a fast-moving asset — the lesson transfers to every other market.",
  },
];

// ============================================================================
// Strategy pages — /strategy/:slug
// ============================================================================
export interface Strategy {
  slug: string;
  name: string;
  oneLiner: string;
  bestFor: string;
  worstFor: string;
  steps: string[];
  example: string;
  successRate: string;
  depth: StrategyDepth;
}

/** Long-form, page-specific depth added to each strategy page. */
export interface StrategyDepth {
  context: string;      // where the method came from / why it works
  regime: string;       // market conditions that help or hurt it
  mistakes: string[];   // 3 concrete failure modes
  math: string;         // expectancy / sizing worked in numbers
}

export const STRATEGIES: Strategy[] = [
  {
    slug: "scalping",
    name: "Scalping",
    oneLiner: "Capturing small price moves on the 1-5 minute timeframe.",
    bestFor: "Traders with fast execution, low latency and tight spreads. Liquid markets like SPY, BTC, ES futures.",
    worstFor: "Beginners, anyone on slow internet, or anyone trading wide-spread alts.",
    steps: [
      "Pick one liquid instrument and trade only that for 30 days.",
      "Use 1-min + 5-min charts; ignore higher timeframes for entries.",
      "Risk ≤0.25% of equity per trade — you'll take 10-30 trades a day.",
      "Hard stop after 3 consecutive losses; revenge trading is the #1 killer.",
      "Review every trade nightly — most edge comes from cutting bad setups, not adding new ones.",
    ],
    example: "Long BTC at $95,120 with stop $95,080, target $95,210 — risking $40 to make $90.",
    successRate: "Realistic win rate: 55-60% with 1:1.5 R. Below that, you'll grind to zero.",
    depth: {
      context:
        "Scalping exists because order books are noisy. Market makers quote a bid and an ask, and between those two prices there is a constant tug-of-war as large orders get worked into the book. A scalper is not predicting where an asset will be next month — they are trying to be on the right side of the next few hundred ticks and get out before the noise reverses. That makes execution quality, not analysis, the main variable: a 2-tick worse fill on a 10-tick target destroys a third of the trade's expected value.",
      regime:
        "Scalping works best when the spread is one tick wide and volume is heavy — US equity index products in the first hour, BTC and ETH during US/Europe overlap, EUR/USD around the London open. It fails in thin overnight sessions, in low-volume altcoins where the spread can be 0.3% (three times a typical target), and around scheduled events such as CPI or FOMC where the book empties out seconds before the print.",
      mistakes: [
        "Trading a wide-spread instrument. If the spread is 0.2% and your target is 0.15%, the position is negative-expectancy before you click.",
        "Increasing size after a losing streak to 'get it back'. Scalping produces long strings of small losses by design; size changes turn a normal drawdown into a blow-up.",
        "Holding a scalp that goes against you and calling it a swing trade. That is a different plan with a different stop, and switching mid-trade means you have no plan at all.",
      ],
      math:
        "With a 57% win rate and a 1:1.5 reward-to-risk ratio, expectancy per trade is (0.57 x 1.5) - (0.43 x 1) = +0.42R. On a $100,000 practice account risking 0.25% ($250) per trade, that is roughly $105 of expected value per trade before costs — and costs are the point: 20 trades a day at $3 round-turn is $60, so more than half the theoretical edge goes to friction. Test that friction in the simulator before assuming it away.",
    },
  },
  {
    slug: "swing-trading",
    name: "Swing Trading",
    oneLiner: "Holding positions 2-10 days to capture intermediate moves.",
    bestFor: "People with day jobs. Patient traders who can check charts twice a day.",
    worstFor: "Anyone who panics during overnight gaps.",
    steps: [
      "Use the daily chart to find the trend.",
      "Use the 4-hour chart for entries on pullbacks.",
      "Risk 0.5-1% per trade.",
      "Set stops outside daily noise (1.5x ATR is a good default).",
      "Take partial profits at 1R, trail the rest with a moving average.",
    ],
    example: "Bought NVDA at $145 after a pullback, stop $138, target $165 — risked $7 to make $20.",
    successRate: "Realistic win rate: 45-50% with 1:2+ R. Compounds nicely with discipline.",
    depth: {
      context:
        "Swing trading sits between day trading and investing: positions are held long enough for a thesis to play out, short enough that a single position is never a life decision. It suits anyone with a job because the analysis happens once, usually in the evening, and the market does the work while you are away. The trade-off is overnight risk — earnings, macro prints and weekend headlines all move price while your stop cannot protect you at the exact level you set.",
      regime:
        "It performs when a market is trending on the daily chart with regular pullbacks: think large-cap tech in an uptrend, or a major FX pair in a sustained rate-differential move. It performs badly in tight, headline-driven chop where every pullback becomes a reversal, and around earnings, where a single gap can exceed several planned stops.",
      mistakes: [
        "Placing the stop at a round number rather than outside the market's normal noise. Use a volatility measure such as 1.5x the 14-day ATR so ordinary movement does not close the trade.",
        "Holding through earnings on a full-size position because 'it should beat'. Either halve the size or close before the print — that event has nothing to do with your entry signal.",
        "Adding to a losing swing. Averaging down converts a defined-risk trade into an undefined one, which is the single most common way practice accounts hit zero.",
      ],
      math:
        "At a 47% win rate and 1:2 reward-to-risk, expectancy is (0.47 x 2) - (0.53 x 1) = +0.41R per trade. Risking 1% of a $100,000 practice account means $410 expected per trade, but with only 4-8 trades a month the sample is small — 30 trades is the minimum before the numbers say anything. Expect drawdowns of 5-7 losers in a row at that win rate; it is statistically ordinary, not evidence the method is broken.",
    },
  },
  {
    slug: "day-trading",
    name: "Day Trading",
    oneLiner: "Opening and closing all positions within a single session.",
    bestFor: "Full-time traders. Anyone who has at least 3 hours of focused screen time.",
    worstFor: "Part-time hobbyists — fatigue + emotion = death.",
    steps: [
      "Trade only the first 90 minutes and the last 60 minutes of the session.",
      "Use the 5-min chart with VWAP.",
      "Risk ≤0.5% per trade, max 5 trades per day.",
      "Close everything before the close — no overnight exposure.",
      "End every day with a journal entry: what worked, what didn't, what to cut tomorrow.",
    ],
    example: "Long SPY at VWAP reclaim, stop below VWAP, target the day's prior high.",
    successRate: "Realistic win rate: 50-55%. The edge comes from session selection, not magic indicators.",
    depth: {
      context:
        "Day trading concentrates a whole trading career into single sessions. Because everything is closed by the bell there is no overnight gap risk, but there is also no time for a thesis to recover — the market either agrees with you within hours or it does not. Most of the day's directional movement happens in the opening 90 minutes and the final hour, which is why disciplined day traders trade those windows and stay flat through the low-volume midday drift.",
      regime:
        "Good days have a clear opening drive, expanding range and volume above the recent average. Bad days are narrow, overlapping and volume-starved — typically the sessions before a major holiday or the day before a central-bank decision, when institutions stand aside. Learning to recognise a no-trade day is worth more than any additional indicator.",
      mistakes: [
        "Trading the midday lull out of boredom. Range contracts, stops get hit by noise, and the day's profit from the open is handed back.",
        "Using a fixed dollar stop instead of a structural one. The stop should sit where the idea is wrong — below VWAP, below the opening range — not at an arbitrary loss you find comfortable.",
        "Ignoring the daily loss limit. Two full stops in a session is a signal to close the platform; a third is almost always emotional rather than analytical.",
      ],
      math:
        "A 52% win rate at 1:1.5 gives (0.52 x 1.5) - (0.48 x 1) = +0.30R per trade. Five trades a day at 0.5% risk on $100,000 is $250 risk per trade, so roughly $375 of expected value a day before commissions and slippage — and slippage on market orders in fast conditions is routinely a quarter of that. Track your actual fills in the simulator's journal rather than assuming the mid-price.",
    },
  },
  {
    slug: "dca-dollar-cost-averaging",
    name: "Dollar-Cost Averaging (DCA)",
    oneLiner: "Buying a fixed amount on a fixed schedule, regardless of price.",
    bestFor: "Long-term investors, beginners, anyone who can't predict the market (i.e. everyone).",
    worstFor: "Active traders who think they can time bottoms.",
    steps: [
      "Pick one or two long-term assets (e.g. SPY, BTC).",
      "Decide an amount you can commit weekly or monthly.",
      "Buy it on the same day every period — no exceptions.",
      "Never sell on red days; rebalance once a year at most.",
      "Track total return on TradeHQ's portfolio analytics to see compounding in action.",
    ],
    example: "$100 into SPY every Friday for 10 years has historically outperformed 80% of active retail traders.",
    successRate: "Win rate of *strategy execution*: 100% if you stick to it. Most people don't.",
    depth: {
      context:
        "Dollar-cost averaging removes the hardest variable in investing: timing. By committing a fixed amount on a fixed schedule you automatically buy more units when prices are low and fewer when they are high, and you never have to form a view about the next three months. Academic work generally finds lump-sum investing beats DCA on average expected return simply because markets rise more often than they fall — but DCA wins on behaviour, and behaviour is what determines whether someone is still invested after a 30% drawdown.",
      regime:
        "It is designed for broad, diversified, long-lived assets — a total-market or S&P 500 index fund, and for those who accept the volatility, a small allocation to a major crypto asset. It is not designed for single stocks, leveraged products, or anything that can go to zero, because averaging into a permanently impaired asset just buys more of a losing position.",
      mistakes: [
        "Pausing contributions during a crash. That is precisely when the schedule is buying the cheapest units; stopping converts a mechanical plan into market timing.",
        "DCA-ing into a single speculative name and calling it investing. The method assumes the underlying asset recovers over long horizons — that assumption holds for a diversified index, not for one company.",
        "Checking the balance daily. The plan works on a horizon of years; daily monitoring only increases the chance of abandoning it.",
      ],
      math:
        "$500 a month for 20 years at an 8% annualised return contributes $120,000 of capital and ends near $295,000, so roughly 60% of the final balance comes from compounding rather than contributions. Raise the horizon to 30 years and contributions become a minority of the outcome entirely. Model your own numbers with the compound calculator on the learn pages before deciding a monthly amount.",
    },
  },
  {
    slug: "rsi-strategy",
    name: "RSI Mean-Reversion",
    oneLiner: "Buying oversold dips and selling overbought spikes using RSI(14).",
    bestFor: "Range-bound markets, large-cap stocks, and major crypto pairs.",
    worstFor: "Strong trends — RSI stays overbought/oversold for weeks and you'll get run over.",
    steps: [
      "Add RSI(14) to your chart.",
      "Wait for RSI < 30 (oversold) or > 70 (overbought).",
      "Confirm with a candlestick reversal pattern on the same bar.",
      "Enter, stop just beyond the reversal candle, target the 20 EMA.",
      "Skip the trade in obvious strong-trend regimes — check the 50/200 EMA first.",
    ],
    example: "BTC RSI dips to 26 at $92K with a bullish engulfing — buy, stop $91K, target $94K.",
    successRate: "55-60% in ranges. Drops to 30% in trends. Regime detection is the real edge.",
    depth: {
      context:
        "RSI, published by J. Welles Wilder in 1978, measures the ratio of average gains to average losses over a lookback window, normally 14 periods, and scales it from 0 to 100. Mean-reversion traders use it as a stretch gauge: a reading under 30 says recent selling has been unusually one-sided, which in a range-bound market often precedes a bounce. Crucially, RSI says nothing about direction — it describes how price got here, not where it goes next.",
      regime:
        "The method only makes sense in a market that is oscillating around a value area: a large-cap stock consolidating after a run, a major FX pair inside a monthly range, BTC chopping between well-defined levels. In a strong trend RSI can hold above 70 for weeks, and every 'overbought' short is a loss. Check the 50 and 200 EMA relationship first: if they are widely separated and sloping, this is a trend regime and mean reversion should be skipped.",
      mistakes: [
        "Taking the signal without confirmation. RSI under 30 alone is not an entry; wait for the reversal candle or a reclaim of a prior level so there is a defined place to be wrong.",
        "Shorting an overbought reading in an uptrend. This is the single most expensive misuse of the indicator, and it feels most compelling exactly when it is most dangerous.",
        "Tuning the lookback until history looks profitable. An RSI(9) that backtests beautifully on one asset and one year is usually curve-fitting, not an edge.",
      ],
      math:
        "In range conditions a 57% win rate at 1:1.2 reward-to-risk gives (0.57 x 1.2) - (0.43 x 1) = +0.25R. Apply the same rules to trending conditions at a 32% win rate and expectancy falls to (0.32 x 1.2) - (0.68 x 1) = -0.30R. The identical setup is profitable in one regime and clearly negative in the other, which is why regime classification — not indicator settings — is where the work belongs.",
    },
  },
  {
    slug: "macd-strategy",
    name: "MACD Crossover",
    oneLiner: "Trading the signal-line cross on the MACD indicator.",
    bestFor: "Trend-following on the daily timeframe.",
    worstFor: "Choppy markets — you'll whipsaw and bleed.",
    steps: [
      "Add MACD (12, 26, 9) to the daily chart.",
      "Wait for the MACD line to cross above the signal line above the zero line for longs (below for shorts).",
      "Enter on the next day's open.",
      "Stop below the last swing low.",
      "Exit when MACD crosses back.",
    ],
    example: "NVDA MACD crosses up at $130 with stop $124 — held for 6 weeks to $165.",
    successRate: "40-50% with 1:2.5+ R — payoff matters more than frequency.",
    depth: {
      context:
        "MACD is the difference between a 12-period and a 26-period exponential moving average, plotted against a 9-period signal line. Because it is built from averages, it always confirms a move after it has begun — it is a trend-following tool, not a predictive one. That lag is the price paid for filtering out most false starts, and it is why MACD systems typically lose more trades than they win while still making money: the winners run far longer than the losers.",
      regime:
        "It performs in markets that trend persistently on the daily chart — index ETFs, mega-cap equities, major commodities in a supply cycle. It performs badly in range-bound conditions, where the signal line crosses back and forth and each whipsaw costs a full stop. A simple filter that removes most of the damage: only take long crosses while price is above the 200-day moving average.",
      mistakes: [
        "Trading every cross. Crosses below the zero line in a downtrend, or inside a tight range, produce the bulk of the losing trades in any MACD backtest.",
        "Exiting winners at a fixed target. The method's entire expectancy depends on a handful of large trends; capping them at 1R while taking full 1R losses inverts the edge.",
        "Reading histogram divergence as a reversal signal. Divergence is common and frequently resolves by the trend simply continuing after a pause.",
      ],
      math:
        "At a 43% win rate with 1:2.5 reward-to-risk, expectancy is (0.43 x 2.5) - (0.57 x 1) = +0.51R per trade — strong, but delivered unevenly. Expect stretches of 6-8 consecutive losers; in a 40-trade sample that is normal variance rather than a broken system. This is why position sizing at 1% or less matters more here than in higher-win-rate methods: the strategy is only profitable if you are still trading when the trend finally arrives.",
    },
  },
];

export const COUNTRY_PAGES = [
  { slug: "sri-lanka", country: "Sri Lanka", currency: "LKR", note: "Practise in USD with $100K virtual cash — no LKR conversion or capital-control friction." },
  { slug: "india", country: "India", currency: "INR", note: "Learn US-market mechanics before opening a real GIFT-City or LRS-routed account." },
  { slug: "philippines", country: "Philippines", currency: "PHP", note: "Build a track record on practice equity before committing pesos to a live broker." },
  { slug: "nigeria", country: "Nigeria", currency: "NGN", note: "Master order flow without FX friction — the lessons transfer to any naira-denominated broker later." },
  { slug: "pakistan", country: "Pakistan", currency: "PKR", note: "Educational practice only — perfect for students before PSX or international broker accounts." },
];

export { SITE_DOMAIN } from "./constants";
