export interface LearnArticleSection {
  heading: string;
  paragraphs: string[];
}

export interface LearnArticleLink {
  href: string;
  label: string;
}

export interface LearnArticle {
  slug: string;
  title: string;
  summary: string;
  metaDescription: string;
  readTime: string;
  sections: LearnArticleSection[];
  relatedLinks: LearnArticleLink[];
}

export const LEARN_ARTICLES: LearnArticle[] = [
  {
    slug: "what-is-paper-trading",
    title: "What Is Paper Trading and Why Every Beginner Should Start Here",
    summary: "Paper trading lets you practice buying and selling stocks, crypto, and other assets using virtual money — so you can learn without losing a cent.",
    metaDescription: "Learn what paper trading is and how virtual practice works. Practice with $100,000 virtual cash on TradeHQ — no signup, no risk.",
    readTime: "5 min read",
    sections: [
      {
        heading: "What Is Paper Trading?",
        paragraphs: [
          "Paper trading is the practice of simulating trades without using real money. Instead of risking your hard-earned savings, you use virtual currency to buy and sell stocks, ETFs, cryptocurrencies, and other financial instruments. The term dates back to a time when aspiring traders would literally write their hypothetical trades on paper to track performance.",
          "Today, paper trading is usually done digitally through simulated platforms. It can help beginners practise order entry, chart reading, record-keeping, and portfolio mechanics without risking real money. It is one practical way to learn how markets work, but it cannot reproduce every part of live trading, especially slippage, liquidity constraints, and the emotions attached to real losses.",
          "On TradeHQ, every user starts with $100,000 in virtual cash. You can trade 149 assets including blue-chip stocks like Apple (AAPL), cryptocurrencies like Bitcoin (BTC), ETFs like SPY, forex pairs, and commodities like gold. Every trade you make is tracked, giving you a realistic portfolio experience."
        ]
      },
      {
        heading: "Why Beginners Should Paper Trade First",
        paragraphs: [
          "Paper trading gives you a controlled environment to make mistakes, test a process, and learn the mechanics before real money is involved. There is no universal number of practice weeks or months that guarantees better results. A more useful goal is to practise until you can follow the same written process consistently across a meaningful sample of simulated trades.",
          "A virtual exercise can compare day trading, swing trading and buy-and-hold under the same stated assumptions. Record hypothetical entries and exits and review gains and losses over a meaningful sample. TradeHQ executes market orders; stop and limit orders are explained conceptually rather than implemented as pending orders.",
          "Paper trading can also be used to practise risk management. You can test position sizing, predefined exit rules, diversification, and the discipline of writing a trading plan before placing an order. Any percentage risk limit should be treated as a practice parameter, not a universal rule."
        ]
      },
      {
        heading: "How to Get Started with Paper Trading on TradeHQ",
        paragraphs: [
          "Visit TradeHQ to start with $100,000 in virtual cash. Browse the asset catalogue, read the practice-data labels, place a simulated market order, and review the portfolio accounting. The practice snapshot is descriptive and need not reflect actual news or market execution.",
          "The mentor offers rule-based educational prompts about a practice portfolio. Use those prompts as questions for a journal, rather than personalized investment recommendations. Compare what was expected with what happened in the simulation and record where an assumption failed.",
          "A simulator can help document a process before testing it elsewhere, but virtual results do not establish readiness for real-money trading. Liquidity, transaction costs, gaps, taxes and behaviour under real losses can differ. Learning the mechanics is the purpose of this exercise."
        ]
      }
    ],
    relatedLinks: [
      { href: "/trade", label: "Start paper trading with $100,000 virtual cash" },
      { href: "/trade/aapl", label: "Practice trading Apple (AAPL)" },
      { href: "/trade/btc", label: "Practice trading Bitcoin (BTC)" },
      { href: "/learn/article/how-to-read-stock-charts", label: "Learn how to read stock charts" },
    ],
  },
  {
    slug: "how-to-read-stock-charts",
    title: "How to Read a Stock Chart: A Beginner's Guide",
    summary: "Stock charts are the language of the market. Learn how to read candlestick patterns, identify trends, and use indicators to make smarter trades.",
    metaDescription: "Learn how to read stock charts like a pro. Understand candlesticks, support and resistance, volume, and key indicators. Free guide on TradeHQ.",
    readTime: "6 min read",
    sections: [
      {
        heading: "Understanding the Basics of Stock Charts",
        paragraphs: [
          "A stock chart is a visual representation of a security's price movement over time. The x-axis shows time (minutes, hours, days, or years) and the y-axis shows price. The most common chart types are line charts, bar charts, and candlestick charts. Candlestick charts are the most popular among traders because they show four key data points: open, high, low, and close prices.",
          "Each candlestick represents a specific time period. A green (or hollow) candle means the closing price was higher than the opening price — the asset went up. A red (or filled) candle means it went down. The body of the candle shows the open-to-close range, while the thin lines above and below (called wicks or shadows) show the high and low.",
          "Candlestick names such as Doji, Hammer and Engulfing describe shapes in an observed price series. They do not prove that a reversal or continuation will occur. On TradeHQ, inspect whether the chart uses provider candles or generated practice candles before interpreting the displayed shape."
        ]
      },
      {
        heading: "Support, Resistance, and Trend Lines",
        paragraphs: [
          "Support and resistance describe areas where a price has previously paused or changed direction. They are approximate chart observations rather than floors or ceilings. A price may cross a marked level and keep moving, so compare both continuation and reversal scenarios in a journal.",
          "Trend lines connect selected price points, such as higher lows or lower highs. Their placement depends on the observation period and chosen points. A break changes that chart description; it does not establish that a new trend will continue.",
          "Volume counts shares, contracts or units traded during a stated period. A price move with high volume is an observation to investigate, not proof of reliability or institutional intent. Compare the source, interval …30488 tokens truncated…ere the highest volume was traded during the selected period. A volume-profile value area commonly encloses a selected share of observed volume, often 70%. That convention is not equivalent to one standard deviation unless additional distributional assumptions are made. The Value Area concept, derived from Market Profile theory developed by Peter Steidlmayer at the Chicago Board of Trade, provides a statistical framework for identifying overbought and oversold conditions. When price trades above the VAH, the market is considered overextended to the upside; below the VAL, overextended to the downside.",
    proTip: "Check the selected time window and how traded volume was allocated to price bins. High- and low-volume nodes describe that sample, not a guaranteed future reaction.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "Technical Analysis",
    keyPoints: [
      "Plots volume horizontally at each price level, not over time",
      "Point of Control (POC) is the highest-volume price — acts as a magnet",
      "Value Area (70% of volume) defines fair value range"
    ],
    studentPerspective: "Volume Profile allocates observed trading volume to price bins; it does not identify who still holds positions. Once you learn to read it, standard support/resistance levels make even more sense.",
    relatedTerms: ["support-and-resistance", "order-block", "vwap"]
  },
  {
    slug: "vwap",
    term: "VWAP",
    definition: "VWAP is the average observed trading price weighted by volume over a stated period. Price above or below it describes the sample; the relationship alone does not establish future direction.",
    expertDefinition: "VWAP — Volume Weighted Average Price — is a trading benchmark that represents the average price at which an asset has traded throughout the day, weighted by volume at each price level. Unlike a simple moving average that gives equal weight to each price point, VWAP gives more weight to prices where more shares or contracts were traded, making it a more accurate measure of the 'true average price' paid by market participants during a session. VWAP is calculated by summing the product of price and volume for each transaction, then dividing by the total cumulative volume. The formula produces a smooth line on an intraday chart that represents where the average buyer and seller transacted. Its primary use among institutional traders is as a benchmark for execution quality — a buy execution below VWAP is considered favorable because the institution paid less than the average market participant, while a buy above VWAP is considered unfavorable. Retail traders use VWAP as a dynamic support/resistance level and as a trend filter. Some chart users label price above VWAP bullish. An aggregate volume-weighted average does not reveal individual entry prices, costs or how many participants are profitable. When price is below VWAP, the intraday trend is bearish. Mean reversion strategies look to buy when price dips below VWAP and sell when it rises above, based on the expectation that price tends to oscillate around this average. Anchored VWAP is a more advanced variation where the trader selects a specific starting point (such as an earnings release, a significant low, or the beginning of a trend) and calculates VWAP from that anchor point forward.",
    proTip: "Recalculate the volume-weighted average for the chosen session or anchor. VWAP is a historical benchmark; price crossing it does not prove future support, resistance or profitability.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Technical Analysis",
    keyPoints: [
      "Average price weighted by volume — gives true market average",
      "Price above VWAP = bullish trend; below = bearish trend",
      "Institutional benchmark for judging execution quality"
    ],
    studentPerspective: "Recalculate the volume-weighted average for the chosen session or anchor. VWAP is a historical benchmark; price crossing it does not prove future support, resistance or profitability.",
    relatedTerms: ["volume-profile", "support-and-resistance", "day-trading"]
  },
  {
    slug: "ichimoku-cloud",
    term: "Ichimoku Cloud",
    definition: "A comprehensive Japanese indicator system showing support/resistance, trend direction, and momentum in a single view. The Cloud (Kumo) is the signature feature.",
    expertDefinition: "The Ichimoku Kinko Hyo — commonly called the Ichimoku Cloud — is a comprehensive technical analysis system developed by Japanese journalist Goichi Hosoda in the late 1930s (published in 1969 after 30 years of refinement). Unlike most Western indicators that measure only one dimension of price action, Ichimoku integrates five distinct calculations into a single chart overlay that simultaneously displays support/resistance levels, trend direction, momentum, and potential future support/resistance zones. The five components are: Tenkan-sen (Conversion Line) — the midpoint of the highest high and lowest low over the past 9 periods, serving as a fast signal line. Kijun-sen (Base Line) — the midpoint over 26 periods, serving as a medium-term trend indicator and potential support/resistance. Senkou Span A (Leading Span A) — the average of Tenkan and Kijun lines, plotted 26 periods into the future. Senkou Span B (Leading Span B) — the midpoint of the highest high and lowest low over 52 periods, plotted 26 periods ahead. The shaded area between Senkou Span A and B forms the Cloud (Kumo) — the system's signature feature. Chikou Span (Lagging Span) — the current closing price plotted 26 periods in the past, used for confirmation. Trading signals in Ichimoku follow a hierarchy. One convention labels a bullish alignment when price is above the Cloud, Tenkan-sen is above Kijun-sen, Chikou Span is above the earlier price and Senkou Span A is above B. The alignment describes selected historical calculations; it is not a proven strongest signal.",
    proTip: "Record the lookback and plotting offsets of each line. Lines drawn ahead on a chart are calculated from past prices and do not contain future market information.",
    difficulty: "Pro",
    readTime: "6 min",
    category: "Technical Analysis",
    keyPoints: [
      "Five components that show trend, momentum, and support/resistance",
      "The Cloud (Kumo) provides dynamic, future-projected support/resistance",
      "Strongest signals align all five components in one direction"
    ],
    studentPerspective: "Ichimoku looks complex but provides the most complete single-indicator view of any market. Learning it gives you a framework that replaces 3-4 separate indicators.",
    relatedTerms: ["support-and-resistance", "golden-cross", "macd"]
  },
  {
    slug: "elliott-wave-theory",
    term: "Elliott Wave Theory",
    definition: "Elliott wave theory interprets price patterns using impulse and corrective wave counts. Different counts can fit the same observations; a chosen count does not establish a reliable forecast.",
    expertDefinition: "Elliott Wave Theory is a form of technical analysis developed by Ralph Nelson Elliott in the 1930s, proposing that financial markets move in repetitive cycles driven by collective investor psychology. The theory identifies two types of waves: impulse waves (which move in the direction of the main trend in 5 sub-waves labeled 1-2-3-4-5) and corrective waves (which move against the main trend in 3 sub-waves labeled A-B-C). These patterns occur at every degree of trend, from multi-decade supercycles down to minute-by-minute micro-waves, creating a fractal structure where smaller patterns nest within larger ones. The rules governing Elliott Wave counts are strict: Wave 2 cannot retrace more than 100% of Wave 1. Wave 3 cannot be the shortest of waves 1, 3, and 5 (and is typically the longest and most powerful). Wave 4 cannot overlap the price territory of Wave 1 (in non-leveraged markets). Within the impulse sequence, waves 1, 3, and 5 are motive waves that move in the trend direction, while waves 2 and 4 are corrective waves. The corrective waves typically retrace specific Fibonacci percentages of the preceding impulse wave — 38.2%, 50%, or 61.8% — creating a direct link between Elliott Wave Theory and Fibonacci analysis. The theory's appeal lies in its ability to provide a structural framework for understanding where the market is within a larger cycle.",
    proTip: "Record the proposed count and alternative counts before observing the next move. Wave labels involve interpretation and do not establish the probability or timing of a forecast.",
    difficulty: "Pro",
    readTime: "6 min",
    category: "Technical Analysis",
    keyPoints: [
      "The framework labels selected movements as five-wave impulses and three-wave corrections",
      "Wave labels depend on interpretation and can be revised",
      "Fibonacci levels are selected reference ratios, not established reversal probabilities"
    ],
    studentPerspective: "Elliott Wave provides an interpretive vocabulary. Compare alternative counts; a count does not establish trend age, exhaustion or a reliable forecast.",
    relatedTerms: ["fibonacci-retracement", "support-and-resistance", "ichimoku-cloud"]
  },
  {
    slug: "wyckoff-method",
    term: "Wyckoff Method",
    definition: "The Wyckoff method interprets price and volume through phases such as accumulation, markup, distribution and markdown. Those labels describe a framework rather than verified institutional intentions.",
    expertDefinition: "The Wyckoff Method is a technical analysis approach developed by Richard D. Wyckoff in the early 20th century that focuses on understanding market behavior through the lens of supply and demand dynamics driven by institutional (smart money) activity. The method is built on three fundamental laws: the Law of Supply and Demand (price moves toward equilibrium between buying and selling pressure), the Law of Cause and Effect (consolidation ranges create the 'cause' for subsequent trending moves, with the width of the range proportional to the extent of the trend), and the Law of Effort vs. Result (volume should confirm price movements — high volume should produce proportional price change). Wyckoff identified four distinct market phases that repeat cyclically: Accumulation (institutions quietly build positions at low prices during a trading range), Markup (the resulting uptrend as accumulated demand overwhelms supply), Distribution (institutions quietly sell their positions at high prices during a trading range), and Markdown (the resulting downtrend as distributed supply overwhelms demand). Each phase has specific structural events. The Accumulation phase includes the Selling Climax (panic selling that marks the approximate low), Automatic Rally (sharp bounce after the climax), Secondary Test (retest of the low on decreased volume), Spring (brief break below the range to shake out weak hands), and Sign of Strength (strong rally that signals the markup is about to begin). The Distribution phase has mirror-image events including the Buying Climax, Upthrust, and Sign of Weakness. Public price, volume and blockchain records offer different observations. Wallet transfers do not automatically identify beneficial owners, exchange positions or buying intentions. Phase labels remain an interpretation and do not establish institutional accumulation, a future rally or the timing of a trade.",
    proTip: "Compare the labelled phases with observable price and volume. The framework interprets those observations; it does not prove institutional intent or guarantee that an accumulation phase will produce a rally.",
    difficulty: "Pro",
    readTime: "6 min",
    category: "Technical Analysis",
    keyPoints: [
      "Four phases: Accumulation, Markup, Distribution, Markdown",
      "A Spring is a framework label, not an established highest-probability entry",
      "Price and volume interpretation does not reveal institutional positions"
    ],
    studentPerspective: "Wyckoff supplies a vocabulary for price and volume interpretation, without proving institutional intent. Compare alternative phase labels and record examples that do not follow the proposed sequence.",
    relatedTerms: ["order-block", "whale-manipulation", "volume-profile"]
  },
  {
    slug: "market-maker",
    term: "Market Maker",
    definition: "Firms that provide liquidity by continuously quoting bid and ask prices. They profit from the spread and are essential to orderly market functioning.",
    expertDefinition: "A market maker is a financial firm or individual that provides liquidity to a market by continuously quoting both bid (buy) and ask (sell) prices for a specific asset, standing ready to buy or sell at those quoted prices. Market makers earn profit from the bid-ask spread — the difference between their buy and sell prices — and are essential to the functioning of orderly markets by providing quotes subject to liquidity, obligations and market conditions. In equity markets, designated market makers (DMMs) on the New York Stock Exchange and similar firms on other exchanges are formally contracted to maintain continuous two-sided quotes within specified spread parameters. In return, they receive certain advantages: early access to order flow information, fee rebates from exchanges, and the ability to maintain inventory positions. Major market-making firms include Citadel Securities, Virtu Financial, and Jane Street, which collectively handle a significant portion of all US equity trading volume. In cryptocurrency markets, market makers serve a similar function but operate in a less regulated environment. Crypto market makers include Wintermute, Alameda Research (before its collapse), GSR, and DWF Labs. They provide liquidity to both centralized exchanges (like Binance, Coinbase) and decentralized exchanges (like Uniswap, dYdX). On decentralized exchanges, 'automated market makers' (AMMs) replace human/algorithmic market makers with smart contracts that use mathematical formulas to price assets based on the ratio of tokens in a liquidity pool.",
    proTip: "Compare quoted spreads, depth and actual trades. A wider spread can have several causes; it is not proof of a market maker's directional forecast.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Market Mechanics",
    keyPoints: [
      "Provide continuous bid/ask quotes to ensure market liquidity",
      "Profit from the bid-ask spread between buy and sell prices",
      "AMMs on decentralized exchanges use algorithms instead of human market makers"
    ],
    studentPerspective: "Understanding market makers helps you see that the spread isn't random — it reflects real-time risk assessment by the most sophisticated players in the market.",
    relatedTerms: ["limit-order-vs-market-order", "whale-manipulation", "slippage"]
  },
  {
    slug: "dark-pool",
    term: "Dark Pool",
    definition: "Private trading venues with orders that are not displayed publicly before execution. Off-exchange trading includes several venue types; it is not all dark-pool activity.",
    expertDefinition: "Dark pools are private electronic trading venues where institutional investors can trade large blocks of securities anonymously, outside of public stock exchanges. The term 'dark' refers to the fact that orders and trades are not visible to the general public until after they are executed — in contrast to 'lit' exchanges like the NYSE or Nasdaq where all orders are displayed on the order book in real-time. Dark pools emerged in the 1980s to solve a fundamental problem facing institutional investors: when a pension fund or mutual fund needs to buy or sell millions of shares, executing that order on a public exchange would reveal their intentions to the entire market, causing the price to move against them before their order is fully filled — a phenomenon known as market impact. Non-displayed orders can reduce pre-trade disclosure, but execution still has liquidity, information and market-impact risks. Venue operators, registrations and market shares change. Check the current regulator directory and identify the reporting period before assigning a volume percentage to a particular venue category. There is regulatory debate about whether dark pools harm price discovery and retail investor fairness. Critics argue that routing so much volume away from public exchanges degrades the quality of publicly available price information, making it harder for all participants to determine true asset values. Proponents counter that dark pools reduce market impact costs for institutional investors, which ultimately benefits the end clients (pension beneficiaries, mutual fund investors) who bear those costs.",
    proTip: "Check the venue and reporting context of an off-exchange print. Every completed trade has both a buyer and seller, so a large print alone does not reveal a bullish institutional view.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "Market Mechanics",
    keyPoints: [
      "Private exchanges for anonymous institutional block trading",
      "Current venue shares require a dated market-data source; no percentage is asserted here",
      "May change execution exposure but does not eliminate market impact"
    ],
    studentPerspective: "A reported off-exchange trade does not establish why a price moved or what the participants intended. Identify the venue, timestamp and reporting context before drawing conclusions.",
    relatedTerms: ["market-maker", "whale-manipulation", "volume-profile"]
  },
  {
    slug: "slippage",
    term: "Slippage",
    definition: "The difference between expected trade price and actual execution price. Occurs during high volatility or low liquidity. Can be positive or negative.",
    expertDefinition: "Slippage is the difference between the expected execution price of a trade and the actual price at which the trade is filled. It occurs most frequently with market orders during periods of high volatility, low liquidity, or when trading large position sizes relative to available order book depth. Slippage can be either negative (executing at a worse price than expected, which is most common) or positive (executing at a better price, which is less common but does occur). Negative slippage happens because the market moves between the time you submit an order and the time it reaches the exchange and gets filled. In fast-moving markets, this delay — even if measured in milliseconds — can result in significant price differences. For example, if you submit a market buy order for Bitcoin when the displayed price is $67,000 but by the time the order executes, the best available ask has moved to $67,050, you've experienced $50 of negative slippage. Slippage is particularly impactful in cryptocurrency markets and forex markets that operate 24/7, where sudden news events or liquidation cascades can cause rapid price movements. On decentralized exchanges (DEXs), slippage is even more pronounced because of the Automated Market Maker (AMM) mechanism — large trades move the price along the bonding curve, and the price impact is directly proportional to the trade size relative to the liquidity pool depth. Some decentralized exchanges let users set a slippage tolerance. Available settings and their effect depend on the platform and transaction; no percentage is prescribed here.",
    proTip: "Compare the expected price with the weighted average fill and include fees separately. A limit order constrains its execution price but may remain unfilled and cannot remove every execution risk.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Difference between expected and actual execution price",
      "Worse during high volatility and low liquidity conditions",
      "Limit orders eliminate slippage risk; market orders are vulnerable"
    ],
    studentPerspective: "Slippage is a hidden cost that eats into your profits. Even small amounts compound over hundreds of trades — use limit orders to control it.",
    relatedTerms: ["limit-order-vs-market-order", "market-maker", "leverage-trading"]
  },
  {
    slug: "impermanent-loss",
    term: "Impermanent Loss",
    definition: "The opportunity cost of providing liquidity in a DEX pool compared to simply holding the assets. Occurs when token prices diverge from their ratio at deposit time.",
    expertDefinition: "Impermanent loss (IL) is a phenomenon unique to decentralized finance (DeFi) liquidity provision that represents the difference in value between holding two assets in a liquidity pool versus simply holding those same assets in a wallet. The 'loss' occurs when the relative prices of the paired tokens change from their ratio at the time of deposit — the greater the price divergence, the larger the impermanent loss. The term 'impermanent' refers to the fact that the loss is only realized when the liquidity provider withdraws their position. If the prices return to their original ratio before withdrawal, the loss disappears. However, in practice, significant price divergence is common and persistent, making the loss very real for many liquidity providers. The mathematics of impermanent loss in a constant product AMM (like Uniswap v2) follow a precise formula: IL = 2 × √(price_ratio) / (1 + price_ratio) - 1, where price_ratio is the ratio of the new price to the original price. If one token doubles in price (2x), the IL is approximately 5.7%. If one token 5x's, the IL is approximately 25.5%. These percentages represent the amount by which the liquidity position underperforms a simple buy-and-hold strategy. Liquidity providers accept impermanent loss risk in exchange for trading fee income. Every swap that occurs in the pool generates a fee (typically 0.3% on Uniswap v2) that is distributed proportionally to liquidity providers. The key question for any LP position is whether the accumulated trading fees exceed the impermanent loss over the holding period.",
    proTip: "State the pool model, relative price change and fee assumptions when comparing liquidity provision with holding. Stablecoin or correlated pairs still carry depegging, contract and liquidity risks.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "DeFi",
    keyPoints: [
      "Value difference between LP position and simply holding the tokens",
      "Increases as the price ratio of paired tokens diverges from deposit ratio",
      "Only 'realized' upon withdrawal — can reverse if prices converge"
    ],
    studentPerspective: "Impermanent loss is the hidden cost of DeFi yield farming. Understanding it prevents you from being lured by high APY numbers that don't account for the IL you're absorbing.",
    relatedTerms: ["yield-farming", "slippage", "market-maker"]
  },
  {
    slug: "yield-farming",
    term: "Yield Farming",
    definition: "Depositing crypto assets into DeFi protocols to earn rewards through trading fees, token incentives, or interest. High APYs often carry high impermanent loss and smart contract risk.",
    expertDefinition: "Yield farming — also known as liquidity mining — is a decentralized finance (DeFi) strategy where users deposit cryptocurrency assets into smart contract-based protocols to earn returns in the form of trading fees, governance token rewards, interest payments, or a combination of all three. The practice exploded in popularity during 'DeFi Summer' of 2020 when Compound Finance pioneered the distribution of its governance token (COMP) to users who supplied assets to its lending protocol, creating the template for liquidity incentive programs across the ecosystem. The basic mechanics vary by protocol type. On decentralized exchanges (DEXs) like Uniswap or Curve Finance, yield farmers provide liquidity by depositing token pairs into trading pools and earn a share of trading fees generated by the pool. On lending protocols like Aave or Compound, users deposit assets that other users can borrow, earning interest from borrowers. On yield aggregators like Yearn Finance, smart contracts automatically move user deposits between various protocols to maximize returns through constantly evolving strategies. Advertised APYs (Annual Percentage Yields) in yield farming can range from single digits on established stablecoin pools to thousands of percent on newly launched, speculative protocols. However, these headline numbers are misleading for several reasons. First, high APYs typically decline rapidly as more capital enters the pool, diluting returns. Third, impermanent loss can exceed the earned fees and rewards, making the overall position unprofitable despite the nominally high APY.",
    proTip: "Separate fees, token incentives and token-price changes in an example return. An advertised APY can change and does not account for every loss or smart-contract risk.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "DeFi",
    keyPoints: [
      "Depositing crypto into protocols to earn fees, interest, or token rewards",
      "High APYs often unsustainable and offset by IL and token depreciation",
      "Smart contract risk means deposited funds can be lost to exploits"
    ],
    studentPerspective: "Yield farming combines several risks, including changing incentives, token prices, contract failures and withdrawal conditions. A displayed reward rate is not the same as a guaranteed net return.",
    relatedTerms: ["impermanent-loss", "slippage", "leverage-trading"]
  },
  {
    slug: "flash-crash",
    term: "Flash Crash",
    definition: "An extremely rapid and deep market decline followed by a swift recovery, typically lasting minutes. Often caused by algorithmic cascades or erroneous large orders.",
    expertDefinition: "A flash crash is a sudden, severe, and brief market decline — typically lasting seconds to minutes — followed by a rapid recovery to near pre-crash levels. Flash crashes are characterized by extreme price dislocations, evaporation of liquidity, and the triggering of cascading stop-loss orders and algorithmic trading responses. They represent moments where normal market functioning temporarily breaks down, creating both extreme risk for existing positions and extraordinary opportunities for prepared traders. The most famous flash crash occurred on May 6, 2010, when the Dow Jones Industrial Average plummeted nearly 1,000 points (approximately 9%) in minutes before recovering most of the decline. The Securities and Exchange Commission (SEC) investigation attributed the crash to a large sell order of $4.1 billion in E-Mini S&P 500 futures contracts placed by a single firm (Waddell & Reed), which overwhelmed available liquidity and triggered a cascade of algorithmic selling. Individual stocks experienced even more extreme dislocations — Accenture briefly traded at $0.01 per share, while Apple traded at $100,000 per share due to erroneous orders filling in the absence of liquidity. In cryptocurrency markets, flash crashes are more frequent due to 24/7 trading, thinner liquidity during off-peak hours, and the prevalence of high-leverage positions. Bitcoin has experienced numerous flash crashes, including a 15% decline in minutes on September 7, 2021 (the day El Salvador adopted Bitcoin as legal tender) and multiple crashes during illiquid Asian trading hours where large market sells swept through thin order books.",
    proTip: "Compare prices, depth and available execution records around the event. A cheap-looking quote may not be executable, and a sharp decline need not recover.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Market Mechanics",
    keyPoints: [
      "Extreme price decline and recovery within minutes",
      "Caused by algorithmic cascades, large erroneous orders, or liquidity gaps",
      "Flash crash of May 2010 saw the Dow drop ~1,000 points in minutes"
    ],
    studentPerspective: "Flash crashes are terrifying in real-time but educational in hindsight. They teach the importance of limit orders, proper stop placement, and the danger of market orders during volatility.",
    relatedTerms: ["liquidation-cascade", "circuit-breaker", "slippage"]
  },
  {
    slug: "circuit-breaker",
    term: "Circuit Breaker",
    definition: "Automatic trading halts triggered when a market index falls beyond preset thresholds (7%, 13%, 20%). Designed to prevent panic-driven crashes.",
    expertDefinition: "Circuit breakers are regulatory mechanisms that automatically halt trading across an entire exchange or in individual securities when prices decline by predetermined percentages within a single trading session. Implemented to prevent panic-driven cascading sell-offs, circuit breakers provide a 'cooling off' period that allows market participants to digest information, reassess positions, and restore orderly market functioning. In the United States, market-wide circuit breakers were first introduced after the stock market crash of October 19, 1987 (Black Monday), when the Dow Jones fell 22.6% in a single day. The current system, updated in 2013, uses the S&P 500 as the reference index with three threshold levels: Level 1 (7% decline) triggers a 15-minute trading halt if triggered before 3:25 PM ET. Level 2 (13% decline) triggers another 15-minute halt if triggered before 3:25 PM ET. Level 3 (20% decline) halts trading for the remainder of the day regardless of when it's triggered. These percentages are calculated from the previous day's closing price. Level 1 and Level 2 halts can each only be triggered once per day. Individual stock circuit breakers, known as Limit Up-Limit Down (LULD), prevent trades from occurring outside of specified price bands that are recalculated every 5 minutes. The bands are typically 5-10% from the reference price for large-cap stocks and wider for smaller or more volatile issues. Cryptocurrency markets notably lack circuit breakers, which is one reason why crypto experiences more extreme flash crashes and volatility events. Some crypto exchanges have implemented their own versions — Binance has a 'cooling-off period' feature and BitMEX has historically paused trading during extreme events — but there is no industry-wide standard. The absence of circuit breakers in 24/7 crypto markets means that liquidation cascades can run unchecked during low-liquidity periods.",
    proTip: "Check the current exchange rules and time-of-day conditions before analysing a halt. The halt mechanism does not predict the direction of trading after reopening.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Market Mechanics",
    keyPoints: [
      "US market-wide halts at S&P 500 declines of 7%, 13%, and 20%",
      "Individual stock halts (LULD) prevent trades outside price bands",
      "Crypto markets lack circuit breakers — contributing to extreme volatility"
    ],
    studentPerspective: "Circuit breakers are your safety net in regulated markets. Understanding when they trigger helps you stay calm during crashes and prepare for post-halt opportunities.",
    relatedTerms: ["flash-crash", "liquidation-cascade", "stop-loss-hunting"]
  },
  {
    slug: "pump-and-dump",
    term: "Pump and Dump",
    definition: "A fraud scheme where promoters artificially inflate an asset's price through misleading hype, then sell their holdings at the peak, crashing the price.",
    expertDefinition: "A pump and dump is a form of securities fraud where individuals or groups artificially inflate the price of an asset through coordinated buying and misleading promotional activities (the 'pump'), then sell their pre-accumulated holdings at the elevated price (the 'dump'), causing the price to crash and leaving other investors with significant losses. The scheme is illegal in regulated securities markets but remains widespread in less regulated spaces, particularly cryptocurrency and penny stock markets. The modern pump and dump typically follows a predictable lifecycle. Phase 1 (Accumulation): the operators quietly accumulate a large position in a low-market-cap, illiquid asset at low prices. Phase 2 (Promotion): coordinated promotion begins across social media (Telegram groups, Twitter, TikTok, YouTube), using claims of insider knowledge, partnership announcements, revolutionary technology, or celebrity endorsements to generate excitement and FOMO. Phase 3 (Pump): as retail buyers flood in, the price rises sharply, and the operators may continue buying to maintain momentum and attract more participants. Phase 4 (Dump): the operators sell their accumulated holdings into the rising demand. Phase 5 (Crash): once operator selling is complete and the promotion stops, the price collapses as remaining holders try to sell and new buying evaporates. In cryptocurrency, pump and dump schemes are particularly prevalent due to the ease of creating new tokens (anyone can deploy an ERC-20 token on Ethereum in minutes), the abundance of low-market-cap assets with thin liquidity, and regulatory gaps. 'Rug pulls' — where developers abandon a project and drain its liquidity pool — are a DeFi-specific variant of the pump and dump. Detecting pump and dump schemes involves looking for warning signs: sudden unexplained price spikes in previously dormant assets, coordinated social media promotion with countdown timers ('BUY NOW before it moons!'), anonymous team members, lack of verifiable technology or product, and paid celebrity endorsements or influencer promotions.",
    proTip: "Check claims against primary disclosures and consider incentives behind a promotion. A social-media mention alone does not prove fraud, while coordinated misleading promotion warrants caution.",
    difficulty: "Novice",
    readTime: "4 min",
    category: "Market Mechanics",
    keyPoints: [
      "Coordinated price inflation followed by insider selling at the peak",
      "Illegal in regulated markets, widespread in crypto and penny stocks",
      "Red flags: sudden hype, anonymous teams, paid promotions, countdown timers"
    ],
    studentPerspective: "Check claims against primary disclosures and consider incentives behind a promotion. A social-media mention alone does not prove fraud, while coordinated misleading promotion warrants caution.",
    relatedTerms: ["whale-manipulation", "fomo", "fud"]
  },
  {
    slug: "paper-trading",
    term: "Paper Trading",
    definition: "Simulated trading with virtual money to practice strategies risk-free. Essential for skill development before risking real capital. TradeHQ provides a $100K simulator.",
    expertDefinition: "Paper trading — also known as simulated trading or virtual trading — is the practice of executing trades using a simulated trading environment with virtual capital, allowing traders to practice strategies, test ideas, and develop skills without risking real money. The term originates from the pre-digital era when aspiring traders would track hypothetical trades on paper, recording entries, exits, and profits or losses by hand. Modern paper trading is conducted through sophisticated simulators that replicate real market conditions, including live price feeds, order book dynamics, and realistic execution. Paper trading serves multiple essential functions in a trader's development. For beginners, it provides a risk-free environment to learn platform mechanics, order types, chart reading, and basic strategy execution. For intermediate traders, it enables strategy backtesting and forward testing — running a new strategy through real-time market conditions before committing capital. For advanced traders, it offers a sandbox for testing parameter changes, new markets, or radical strategy modifications without affecting their live portfolio. The limitations of paper trading are important to acknowledge. The most significant is the absence of emotional impact — because no real money is at risk, paper trading does not replicate the psychological pressure of live trading. Decisions are easier to make rationally when losses don't affect your bank account. Many traders who perform excellently in simulation struggle when transitioning to live trading because fear, greed, and loss aversion change their decision-making. Additionally, paper trading may not accurately simulate execution quality — real markets include slippage, partial fills, and liquidity constraints that simulators may not replicate.",
    proTip: "Use a journal to record assumptions, costs and decisions in a simulation. Practice can reveal mistakes, but no minimum duration or trade count establishes readiness for real-money trading.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Simulated trading with virtual money — zero financial risk",
      "Essential practice stage before committing real capital",
      "Limitation: doesn't replicate the emotional pressure of real trading"
    ],
    studentPerspective: "Paper trading is your training ground. Every professional athlete practices before competing — trading is no different. The TradeHQ simulator gives you $100K to learn with.",
    relatedTerms: ["day-trading", "swing-trading", "risk-reward-ratio"]
  },
  {
    slug: "risk-reward-ratio",
    term: "Risk-Reward Ratio",
    definition: "The risk-reward ratio compares a trade's planned loss with its planned gain. A 1:3 ratio means a planned $1 loss for a potential $3 gain; it does not guarantee those fills or establish a universal professional minimum.",
    expertDefinition: "The risk-reward ratio (R:R or RRR) is a measurement that compares the potential loss on a trade (from entry to stop loss) against the potential gain (from entry to take profit target). Expressed as a ratio like 1:2 or 1:3, it quantifies the trade's payoff structure before entry, enabling traders to make mathematically informed decisions about which trades are worth taking. A 1:2 risk-reward ratio means that for every dollar risked, two dollars of profit are targeted. A 1:3 ratio means three dollars of potential profit for each dollar of risk. This simple metric is one of the most important concepts in trading because it directly determines the win rate required for long-term profitability. For fixed realised payoffs before costs, a 1:1 ratio breaks even at 50% wins; profitability requires more than 50%. Planned exits do not ensure those realised payoffs. At 1:2 R:R, you only need a >33.3% win rate. At 1:3 with fixed realised gains and losses, a win rate above 25% is required before costs; exactly 25% breaks even. This mathematical reality means that traders with mediocre win rates can still be highly profitable if their average winners are significantly larger than their average losers — a concept known as positive expectancy. A chosen planned payoff ratio is not a universal fund rule or evidence of positive realised expectancy. The calculation is straightforward: divide the distance to your take-profit target by the distance to your stop loss. If your stop loss is $5 below entry and your target is $15 above entry, the R:R is 1:3.",
    proTip: "Compare planned risk and reward with realised outcomes and costs. A positive average in one sample can be luck or overfitting; a ratio alone does not prove an edge.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Compares potential loss (stop loss) to potential gain (take profit)",
      "At 1:3 R:R, you only need 25% win rate to be profitable",
      "Professional traders require minimum 1:2 ratio before entering"
    ],
    studentPerspective: "Risk-reward ratio is the math that separates gambling from trading. Every trade should have the math in your favor BEFORE you enter.",
    relatedTerms: ["stop-loss-hunting", "leverage-trading", "drawdown"]
  },
  {
    slug: "drawdown",
    term: "Drawdown",
    definition: "The decline from a portfolio's peak value to its lowest point before a new peak. Maximum drawdown measures worst-case historical loss. Critical for risk assessment.",
    expertDefinition: "Drawdown is a risk metric that measures the decline in value from a portfolio's or trading account's peak (highest point) to its subsequent trough (lowest point) before a new peak is established. Expressed as a percentage, it quantifies the worst-case loss experience during a specific time period and is one of the most important measures of investment risk because it directly represents the real-world pain that an investor or trader experiences. Maximum drawdown (MDD) is the largest peak-to-trough decline ever recorded for a particular strategy, fund, or account. For example, if an account grew from $100,000 to $150,000, then declined to $110,000 before recovering to $160,000, the maximum drawdown was $40,000 / $150,000 = 26.7%. Recovery from drawdowns requires disproportionate gains — a mathematical reality that makes drawdown control critical. A 10% drawdown requires an 11.1% gain to recover. A 20% drawdown requires a 25% gain. A 50% drawdown requires a 100% gain (doubling your money) to return to the previous peak. A 90% drawdown requires a 900% gain. This asymmetric math is why professional risk managers obsess over drawdown control rather than maximizing returns. In quantitative finance, strategies are often evaluated using the Calmar Ratio (annualized return divided by maximum drawdown), the Sortino Ratio (return divided by downside deviation), or the MAR Ratio (minimum acceptable return versus maximum drawdown).",
    proTip: "Calculate the decline from the relevant peak and state the observation period. Historical maximum drawdown is not an upper bound on future loss, and no universal percentage is a suitable limit for everyone.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Peak-to-trough decline measuring worst-case loss experience",
      "50% drawdown requires 100% gain to recover — math is asymmetric",
      "Calmar Ratio (return/drawdown) measures risk-adjusted performance"
    ],
    studentPerspective: "Calculate the decline from the relevant peak and state the observation period. Historical maximum drawdown is not an upper bound on future loss, and no universal percentage is a suitable limit for everyone.",
    relatedTerms: ["risk-reward-ratio", "leverage-trading", "paper-trading"]
  },
  {
    slug: "backtesting",
    term: "Backtesting",
    definition: "Testing a strategy against historical data to evaluate its hypothetical performance. Essential for validation but subject to curve-fitting and survivorship bias.",
    expertDefinition: "Backtesting is the process of evaluating a trading strategy by applying its rules to historical market data to determine how it would have performed in the past. This retrospective analysis generates simulated trade results — including win rate, average return, maximum drawdown, Sharpe ratio, and total profitability — that help traders assess whether a strategy has a quantifiable edge worth deploying with real capital. The backtesting process involves defining strict entry and exit rules, applying them systematically to historical price data (often spanning 5-20 years), and analyzing the resulting simulated performance statistics. Professional-grade backtesting accounts for transaction costs (commissions, spreads, slippage), position sizing rules, and capital constraints. Tools range from simple spreadsheet-based analysis to sophisticated platforms like QuantConnect, Backtrader (Python), TradingView's Pine Script, and institutional platforms like Bloomberg's backtesting engine. However, backtesting has significant limitations that traders must understand. Curve fitting (or over-optimization) is the most dangerous pitfall — adjusting strategy parameters until they perfectly fit historical data, producing impressive backtest results that don't translate to live performance because they've been tailored to the specific noise patterns of the past rather than capturing genuine market phenomena. Look-ahead bias (using future information unavailable at the time of the simulated trade), survivorship bias (testing only on stocks that still exist, ignoring those that went bankrupt), and selection bias (only backtesting strategies that visually appear to work on a chart) further compromise results.",
    proTip: "Separate rule development from evaluation on unseen data and include realistic costs. Out-of-sample results can expose overfitting, but they do not certify future performance.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Simulates strategy performance using historical price data",
      "Curve fitting is the biggest pitfall — overfit strategies fail live",
      "Out-of-sample testing validates that the edge is genuine"
    ],
    studentPerspective: "Backtesting gives you confidence that your strategy has worked in the past. But remember — the map is not the territory. Always forward-test (paper trade) before going live.",
    relatedTerms: ["paper-trading", "risk-reward-ratio", "drawdown"]
  },
  {
    slug: "correlation-trading",
    term: "Correlation Trading",
    definition: "Exploiting statistical relationships between assets. Positive correlation (BTC and ETH move together), negative (gold and USD), or decorrelation breakdowns for opportunity.",
    expertDefinition: "Correlation trading is a strategy that exploits the statistical relationships between different financial instruments, entering positions based on how assets move relative to each other rather than on the absolute direction of any single asset. Correlation is measured on a scale from -1 (perfect inverse relationship — when one rises, the other falls) to +1 (perfect positive relationship — assets move together), with 0 indicating no statistical relationship. Pairs trading is the most common form of correlation trading. Pairs-trading examples combine a long and short position to test a hypothesis about a spread. The relationship can change and the spread need not converge. For example, if Coca-Cola and Pepsi historically trade with a 0.85 correlation and the spread suddenly widens, a pairs trader would buy the underperformer and short the outperformer, betting that the historical relationship will reassert itself. This strategy is market-neutral — it profits regardless of whether the overall market rises or falls, because the returns depend on the relative performance, not absolute direction. Correlation breakdowns — moments when historically correlated assets suddenly diverge — can signal either opportunities or risks. A breakdown in the Bitcoin-Ethereum correlation (which typically exceeds 0.80) might indicate that one asset is experiencing unique fundamental pressure that the other is not, creating a relative value opportunity.",
    proTip: "State the return frequency, observation window and dataset used to calculate correlation. Correlations can change, and a high or low value does not define a universal portfolio allocation.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Measures how assets move relative to each other (-1 to +1 scale)",
      "Pairs trading profits from correlated assets reverting to mean",
      "Correlations break down during crises — all assets fall together"
    ],
    studentPerspective: "Correlation trading teaches you that diversification is about statistical relationships, not just owning different assets. It's the foundation of professional portfolio construction.",
    relatedTerms: ["risk-reward-ratio", "drawdown", "support-and-resistance"]
  }
];
