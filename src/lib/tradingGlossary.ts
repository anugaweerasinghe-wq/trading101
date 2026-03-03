export interface GlossaryTerm {
  slug: string;
  term: string;
  definition: string;
  difficulty: "Novice" | "Intermediate" | "Pro";
  readTime: string;
  category: string;
  keyPoints: [string, string, string];
  studentPerspective: string;
  relatedTerms: string[];
}

export const tradingGlossary: GlossaryTerm[] = [
  {
    slug: "short-squeeze",
    term: "Short Squeeze",
    definition: "A short squeeze occurs when a heavily shorted asset's price rises sharply, forcing short sellers to buy back shares to cover their positions. This buying pressure accelerates the price increase further, creating a feedback loop. Short squeezes can cause dramatic price spikes in minutes or hours, often catching bearish traders off guard. The GameStop event of 2021 remains the most famous modern example of a coordinated short squeeze.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Market Mechanics",
    keyPoints: [
      "Triggered when short interest exceeds 20-30% of float",
      "Creates a positive feedback loop of forced buying",
      "Can result in 100%+ price moves within days"
    ],
    studentPerspective: "Understanding short squeezes helps you identify explosive setups and avoid being on the wrong side of a crowded trade.",
    relatedTerms: ["bull-trap", "whale-manipulation", "leverage-trading"]
  },
  {
    slug: "golden-cross",
    term: "Golden Cross",
    definition: "A golden cross is a bullish technical signal that occurs when a short-term moving average (typically the 50-day) crosses above a long-term moving average (typically the 200-day). This crossover suggests that recent price momentum is shifting upward relative to the longer trend. Institutional traders and algorithmic systems often use golden crosses as confirmation signals for entering long positions or increasing portfolio exposure.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Technical Analysis",
    keyPoints: [
      "50-day MA crossing above the 200-day MA is the classic setup",
      "Considered a lagging indicator — confirms trends already underway",
      "Often triggers algorithmic buying from institutional systems"
    ],
    studentPerspective: "The golden cross is one of the first indicators beginners learn. It's simple to spot on any chart and provides a clear directional bias.",
    relatedTerms: ["death-cross", "macd", "support-and-resistance"]
  },
  {
    slug: "death-cross",
    term: "Death Cross",
    definition: "A death cross is the bearish counterpart to the golden cross. It occurs when the 50-day moving average crosses below the 200-day moving average, signaling that short-term momentum is deteriorating relative to the longer-term trend. While not always predictive of a major crash, death crosses historically precede periods of increased volatility and downside risk. Traders use this signal to reduce exposure or initiate hedging strategies.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Technical Analysis",
    keyPoints: [
      "50-day MA crossing below the 200-day MA triggers the signal",
      "Historically preceded major market downturns like 2008 and 2020",
      "Best used in combination with volume analysis for confirmation"
    ],
    studentPerspective: "Recognizing a death cross early can help you protect your portfolio by reducing risk before a potential downturn accelerates.",
    relatedTerms: ["golden-cross", "rsi-divergence", "stop-loss-hunting"]
  },
  {
    slug: "liquidation-cascade",
    term: "Liquidation Cascade",
    definition: "A liquidation cascade is a chain reaction in leveraged markets where falling prices trigger forced liquidations of leveraged positions, which in turn push prices lower, triggering more liquidations. This domino effect is especially common in cryptocurrency markets where high leverage (50x-125x) is readily available. Cascades can wipe out billions in open interest within minutes and are responsible for some of the most violent price crashes in crypto history.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "Market Mechanics",
    keyPoints: [
      "Most common in crypto due to extreme leverage availability",
      "Can liquidate billions in positions within minutes",
      "Often creates wicking patterns on candlestick charts"
    ],
    studentPerspective: "Understanding liquidation cascades teaches you why proper position sizing and stop losses are non-negotiable when using leverage.",
    relatedTerms: ["leverage-trading", "stop-loss-hunting", "whale-manipulation"]
  },
  {
    slug: "fibonacci-retracement",
    term: "Fibonacci Retracement",
    definition: "Fibonacci retracement is a technical analysis tool that uses horizontal lines to indicate potential support and resistance levels based on the Fibonacci sequence. Key levels include 23.6%, 38.2%, 50%, 61.8%, and 78.6%. Traders draw these levels between a significant high and low point to predict where price may pull back before continuing its trend. The 61.8% level, known as the golden ratio, is considered the most significant retracement level.",
    difficulty: "Intermediate",
    readTime: "5 min",
    category: "Technical Analysis",
    keyPoints: [
      "Key levels: 23.6%, 38.2%, 50%, 61.8%, and 78.6%",
      "The 61.8% golden ratio is the most watched retracement level",
      "Works best when combined with other confluence factors"
    ],
    studentPerspective: "Fibonacci levels give you a mathematical framework for identifying high-probability entry points during pullbacks in trending markets.",
    relatedTerms: ["support-and-resistance", "golden-cross", "order-block"]
  },
  {
    slug: "rsi-divergence",
    term: "RSI Divergence",
    definition: "RSI divergence occurs when the Relative Strength Index (RSI) moves in the opposite direction of price. Bullish divergence happens when price makes a lower low but RSI makes a higher low, suggesting weakening selling momentum. Bearish divergence occurs when price makes a higher high but RSI makes a lower high, indicating fading buying pressure. Divergences are powerful reversal signals used by swing traders and position traders to time entries at market extremes.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Technical Analysis",
    keyPoints: [
      "Bullish divergence: price lower low + RSI higher low",
      "Bearish divergence: price higher high + RSI lower high",
      "Most reliable on higher timeframes (4H, Daily, Weekly)"
    ],
    studentPerspective: "RSI divergence is one of the most reliable reversal signals. Learning to spot it gives you an edge in timing market turning points.",
    relatedTerms: ["macd-histogram", "bollinger-band-squeeze", "support-and-resistance"]
  },
  {
    slug: "macd-histogram",
    term: "MACD Histogram",
    definition: "The MACD histogram represents the difference between the MACD line and the signal line, displayed as vertical bars. When the histogram is above zero and growing, bullish momentum is increasing. When it's below zero and shrinking, bearish momentum is weakening. Histogram divergence from price is one of the strongest signals in technical analysis. The histogram helps traders visualize momentum changes before they appear on the price chart itself.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Technical Analysis",
    keyPoints: [
      "Measures the gap between MACD line and signal line",
      "Growing bars = accelerating momentum in that direction",
      "Histogram divergence often precedes major reversals"
    ],
    studentPerspective: "The MACD histogram turns abstract momentum data into a visual tool you can read at a glance. It's essential for timing entries and exits.",
    relatedTerms: ["macd", "rsi-divergence", "golden-cross"]
  },
  {
    slug: "bollinger-band-squeeze",
    term: "Bollinger Band Squeeze",
    definition: "A Bollinger Band squeeze occurs when the upper and lower Bollinger Bands contract to their narrowest width, indicating a period of unusually low volatility. This compression typically precedes a significant price breakout in either direction. The squeeze is identified when the Bandwidth indicator drops to its lowest levels over a defined lookback period. Traders prepare for explosive moves by watching which direction price breaks out of the squeeze formation.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Technical Analysis",
    keyPoints: [
      "Narrow bands signal low volatility and an impending breakout",
      "The direction of the breakout determines the trade direction",
      "Often combined with volume spikes to confirm the move"
    ],
    studentPerspective: "The Bollinger squeeze is like a coiled spring — tight bands mean energy is building. Learning to spot squeezes helps you catch big moves early.",
    relatedTerms: ["rsi-divergence", "support-and-resistance", "candlestick-patterns"]
  },
  {
    slug: "order-block",
    term: "Order Block",
    definition: "An order block is a price zone where institutional traders have placed large orders, creating a supply or demand imbalance. In Smart Money Concepts (SMC), a bullish order block is identified as the last bearish candle before a strong upward move, while a bearish order block is the last bullish candle before a strong downward move. These zones act as magnets for price, which often returns to fill institutional orders before continuing in the trend direction.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "Smart Money Concepts",
    keyPoints: [
      "Represents zones of institutional accumulation or distribution",
      "Bullish OB: last red candle before impulsive move up",
      "Price often revisits order blocks before continuing the trend"
    ],
    studentPerspective: "Order blocks reveal where the 'smart money' is positioned. Trading from these zones aligns your entries with institutional flow.",
    relatedTerms: ["fair-value-gap", "support-and-resistance", "whale-manipulation"]
  },
  {
    slug: "fair-value-gap",
    term: "Fair Value Gap (FVG)",
    definition: "A Fair Value Gap is a three-candle pattern where the wicks of the first and third candles do not overlap, leaving an unfilled price gap on the chart. This gap represents an imbalance between buyers and sellers, typically caused by aggressive institutional orders. Price tends to return to fill these gaps before continuing its trend. FVGs are a core concept in Inner Circle Trader (ICT) methodology and Smart Money Concepts, used to identify high-probability entry zones.",
    difficulty: "Pro",
    readTime: "5 min",
    category: "Smart Money Concepts",
    keyPoints: [
      "Created by a 3-candle sequence with non-overlapping wicks",
      "Represents market inefficiency that price tends to correct",
      "Best traded as entry zones when price returns to fill the gap"
    ],
    studentPerspective: "FVGs give you institutional-grade entry points. Once you see them, you'll notice them everywhere — they're the market's footprints.",
    relatedTerms: ["order-block", "liquidity-cascade", "support-and-resistance"]
  },
  {
    slug: "bull-trap",
    term: "Bull Trap",
    definition: "A bull trap is a false breakout above a resistance level that lures buyers into long positions before price reverses sharply downward. The pattern begins with a convincing breakout that appears to signal continuation of an uptrend, attracting aggressive buyers. Once these buyers are committed, selling pressure overwhelms the move and price collapses back below resistance, trapping the bulls with losing positions. Bull traps are especially common at all-time highs and round-number psychological levels.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Market Mechanics",
    keyPoints: [
      "False breakout above resistance that reverses quickly",
      "Common at psychological levels and previous all-time highs",
      "Confirmed when price closes back below the broken resistance"
    ],
    studentPerspective: "Learning to identify bull traps saves you from chasing breakouts. Wait for confirmation before entering — patience pays.",
    relatedTerms: ["bear-trap", "support-and-resistance", "stop-loss-hunting"]
  },
  {
    slug: "bear-trap",
    term: "Bear Trap",
    definition: "A bear trap is a false breakdown below a support level that tricks traders into opening short positions before price reverses upward. The pattern mirrors a bull trap but in the opposite direction. Price briefly breaks below support, triggering stop losses on long positions and enticing short sellers. The reversal then squeezes short sellers as price rapidly recovers and rallies above the broken support level, often with significant momentum.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Market Mechanics",
    keyPoints: [
      "False breakdown below support that reverses sharply upward",
      "Designed to trigger stop losses on existing long positions",
      "Often precedes strong rallies as short sellers cover"
    ],
    studentPerspective: "Bear traps teach you that breakdowns can be deceptive. Waiting for a candle close below support helps avoid false signals.",
    relatedTerms: ["bull-trap", "short-squeeze", "support-and-resistance"]
  },
  {
    slug: "whale-manipulation",
    term: "Whale Manipulation",
    definition: "Whale manipulation refers to large traders or entities (whales) using their substantial capital to artificially influence market prices. Techniques include spoofing (placing and canceling large orders to create false signals), wash trading (trading with oneself to inflate volume), and strategic accumulation or distribution to create false breakouts. In crypto markets, where regulation is lighter, whale manipulation is particularly prevalent and can move prices by 5-10% within minutes.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Market Mechanics",
    keyPoints: [
      "Whales use spoofing, wash trading, and strategic order placement",
      "More prevalent in less regulated markets like cryptocurrency",
      "On-chain analytics can track whale wallet movements in crypto"
    ],
    studentPerspective: "Understanding whale tactics helps you avoid being the 'exit liquidity.' Watch for unusual volume spikes and order book imbalances.",
    relatedTerms: ["liquidation-cascade", "stop-loss-hunting", "order-block"]
  },
  {
    slug: "support-and-resistance",
    term: "Support and Resistance",
    definition: "Support and resistance are foundational concepts in technical analysis. Support is a price level where buying pressure historically prevents further decline, creating a floor. Resistance is a price level where selling pressure historically prevents further advance, creating a ceiling. When support breaks, it often becomes resistance, and vice versa. These levels are identified using historical price action, round numbers, moving averages, and Fibonacci levels.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Technical Analysis",
    keyPoints: [
      "Support = price floor where buyers step in; Resistance = price ceiling",
      "Broken support becomes resistance and vice versa (polarity principle)",
      "Strongest levels have multiple touches and high-volume reactions"
    ],
    studentPerspective: "Support and resistance is the bedrock of all chart analysis. Master this before anything else — every other pattern builds on it.",
    relatedTerms: ["fibonacci-retracement", "order-block", "candlestick-patterns"]
  },
  {
    slug: "candlestick-patterns",
    term: "Candlestick Patterns",
    definition: "Candlestick patterns are visual formations created by one or more Japanese candlesticks that signal potential market reversals or continuations. Key single-candle patterns include doji, hammer, and engulfing candles. Multi-candle patterns include morning star, evening star, and three white soldiers. Each pattern reflects the battle between buyers and sellers during a specific time period. Candlestick analysis originated in 18th-century Japanese rice trading and remains one of the most widely used charting methods globally.",
    difficulty: "Novice",
    readTime: "4 min",
    category: "Technical Analysis",
    keyPoints: [
      "Single-candle: doji, hammer, shooting star, engulfing",
      "Multi-candle: morning star, evening star, three white soldiers",
      "Context matters — patterns at support/resistance are strongest"
    ],
    studentPerspective: "Candlesticks are the language of the market. Learning to read them transforms a confusing chart into a narrative of buyer vs. seller battles.",
    relatedTerms: ["support-and-resistance", "head-and-shoulders", "double-bottom"]
  },
  {
    slug: "head-and-shoulders",
    term: "Head and Shoulders",
    definition: "The head and shoulders pattern is a classic reversal formation consisting of three peaks: a central peak (head) flanked by two lower peaks (shoulders). The neckline connects the lows between the peaks. A break below the neckline confirms the pattern and signals a bearish reversal. The inverse head and shoulders (three troughs) signals a bullish reversal. The measured move target equals the distance from the head to the neckline, projected downward from the breakout point.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Chart Patterns",
    keyPoints: [
      "Three peaks: left shoulder, head (highest), right shoulder",
      "Neckline break confirms the reversal with a measured move target",
      "Inverse version signals bullish reversal at market bottoms"
    ],
    studentPerspective: "Head and shoulders is one of the most reliable reversal patterns. Spotting it in real-time takes practice, but the payoff is significant.",
    relatedTerms: ["double-bottom", "support-and-resistance", "candlestick-patterns"]
  },
  {
    slug: "double-bottom",
    term: "Double Bottom",
    definition: "A double bottom is a bullish reversal pattern shaped like the letter W. Price drops to a support level, bounces, returns to test that same support level, and then rallies. The pattern is confirmed when price breaks above the peak between the two bottoms (the neckline). The measured move target equals the depth of the pattern projected upward from the neckline breakout. Double bottoms are most reliable when the second bottom forms with lower volume and RSI divergence.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Chart Patterns",
    keyPoints: [
      "W-shaped pattern with two tests of the same support level",
      "Confirmed when price breaks above the neckline (middle peak)",
      "Strongest with RSI divergence on the second bottom"
    ],
    studentPerspective: "The double bottom is beginner-friendly and appears frequently. It's a great pattern to build your initial trading confidence around.",
    relatedTerms: ["head-and-shoulders", "support-and-resistance", "bull-trap"]
  },
  {
    slug: "macd",
    term: "Moving Average Convergence Divergence",
    definition: "MACD is a trend-following momentum indicator that shows the relationship between two exponential moving averages of price. The standard settings use 12-period and 26-period EMAs. The MACD line is the difference between these two EMAs, while the signal line is a 9-period EMA of the MACD line. Bullish signals occur when the MACD crosses above the signal line; bearish signals when it crosses below. MACD is one of the most popular and versatile indicators used across all markets and timeframes.",
    difficulty: "Novice",
    readTime: "4 min",
    category: "Technical Analysis",
    keyPoints: [
      "MACD line = 12 EMA minus 26 EMA; Signal line = 9 EMA of MACD",
      "Crossovers generate buy/sell signals",
      "Zero-line crossovers confirm trend direction changes"
    ],
    studentPerspective: "MACD is the Swiss Army knife of indicators. It shows trend direction, momentum strength, and potential reversals all in one tool.",
    relatedTerms: ["macd-histogram", "golden-cross", "rsi-divergence"]
  },
  {
    slug: "limit-order-vs-market-order",
    term: "Limit Order vs Market Order",
    definition: "A market order executes immediately at the best available price, guaranteeing execution but not price. A limit order sets a specific price at which you're willing to buy or sell, guaranteeing price but not execution. Market orders are used when speed is critical; limit orders when price precision matters. In volatile markets, market orders can experience slippage — executing at a worse price than displayed. Professional traders predominantly use limit orders to control entry and exit prices precisely.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Market orders: instant execution, price may slip in volatility",
      "Limit orders: exact price control, but may not fill",
      "Professionals favor limit orders for precise risk management"
    ],
    studentPerspective: "Understanding order types is day-one knowledge. Using limit orders consistently will save you from costly slippage over hundreds of trades.",
    relatedTerms: ["stop-loss-hunting", "leverage-trading", "support-and-resistance"]
  },
  {
    slug: "stop-loss-hunting",
    term: "Stop Loss Hunting",
    definition: "Stop loss hunting is a practice where large traders or market makers deliberately push prices to levels where clusters of stop loss orders are placed, triggering them before reversing direction. Stop losses tend to cluster at obvious support/resistance levels, round numbers, and recent swing highs/lows. By triggering these stops, the hunters acquire liquidity at favorable prices. This practice is controversial but widely acknowledged across forex, crypto, and equity markets.",
    difficulty: "Intermediate",
    readTime: "4 min",
    category: "Market Mechanics",
    keyPoints: [
      "Targets clusters of stop losses at obvious technical levels",
      "Creates false breakouts/breakdowns before the real move",
      "Place stops beyond obvious levels to avoid being hunted"
    ],
    studentPerspective: "Stop loss hunting explains why your stops get triggered right before the market moves in your favor. Learning this changes how you place stops forever.",
    relatedTerms: ["whale-manipulation", "bull-trap", "bear-trap"]
  },
  {
    slug: "leverage-trading",
    term: "Leverage Trading",
    definition: "Leverage trading allows you to control a larger position than your capital would normally permit by borrowing funds from the exchange or broker. For example, 10x leverage means $1,000 controls a $10,000 position. While leverage amplifies profits, it equally amplifies losses. A 10% adverse move on 10x leverage wipes out your entire margin. Leverage ranges from 2x in traditional markets to 125x on some crypto exchanges. Risk management is paramount when using any leverage.",
    difficulty: "Intermediate",
    readTime: "5 min",
    category: "Trading Fundamentals",
    keyPoints: [
      "Amplifies both gains and losses by the leverage multiplier",
      "Liquidation occurs when losses exceed your margin deposit",
      "Professional traders rarely exceed 3-5x leverage"
    ],
    studentPerspective: "Leverage is the most dangerous tool in trading. Master position sizing and risk management on a simulator before ever using leverage with real funds.",
    relatedTerms: ["liquidation-cascade", "stop-loss-hunting", "limit-order-vs-market-order"]
  },
  {
    slug: "fomo",
    term: "FOMO (Fear of Missing Out)",
    definition: "FOMO is the anxiety-driven impulse to enter a trade because an asset's price is rising rapidly and you fear missing potential profits. FOMO-driven entries are typically poorly timed — occurring near local tops after a significant move has already happened. This emotional response overrides rational analysis and proper risk management. Studies show that FOMO-driven trades have significantly lower win rates because traders chase extended moves without waiting for pullbacks or proper setups.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Trading Psychology",
    keyPoints: [
      "Emotional response to seeing rapid price increases",
      "FOMO entries are statistically more likely to be near tops",
      "Combat FOMO with pre-defined trading plans and alerts"
    ],
    studentPerspective: "Every trader experiences FOMO. The difference between amateurs and professionals is that pros have systems to override emotional impulses.",
    relatedTerms: ["fud", "bull-trap", "hodl-strategy"]
  },
  {
    slug: "fud",
    term: "FUD (Fear, Uncertainty, Doubt)",
    definition: "FUD refers to negative information — whether true, exaggerated, or fabricated — spread to create fear and drive prices down. In crypto markets, FUD often involves regulatory crackdown rumors, exchange insolvency fears, or security vulnerability reports. While some FUD is legitimate and should inform risk assessment, manipulative FUD is spread deliberately by short sellers or competitors to profit from panic selling. Evaluating FUD requires critical thinking and verifying information sources.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Trading Psychology",
    keyPoints: [
      "Can be legitimate concerns or deliberate manipulation",
      "Often spread on social media to trigger panic selling",
      "Always verify FUD claims through official sources before reacting"
    ],
    studentPerspective: "FUD is a test of your conviction. If your thesis is based on fundamentals, short-term FUD becomes a buying opportunity rather than a reason to panic.",
    relatedTerms: ["fomo", "whale-manipulation", "bear-trap"]
  },
  {
    slug: "hodl-strategy",
    term: "HODL Strategy",
    definition: "HODL (Hold On for Dear Life) is a long-term investment strategy originating from a famous 2013 Bitcoin forum typo. The strategy involves buying an asset and holding it through all market conditions — crashes, corrections, and rallies — with the conviction that its long-term trajectory is upward. HODL contrasts with active trading by eliminating timing risk and reducing transaction costs. Historical data shows that Bitcoin HODLers who held for 4+ years have never been in a loss regardless of entry point.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Trading Psychology",
    keyPoints: [
      "Originated from a 2013 Bitcoin forum typo ('HODL' instead of 'HOLD')",
      "Eliminates timing risk and reduces transaction fees",
      "Requires strong conviction and tolerance for drawdowns"
    ],
    studentPerspective: "HODL is the simplest strategy that consistently outperforms most active traders. It teaches patience and removes emotional decision-making.",
    relatedTerms: ["fomo", "fud", "support-and-resistance"]
  },
  {
    slug: "satoshi-nakamoto",
    term: "Satoshi Nakamoto",
    definition: "Satoshi Nakamoto is the pseudonymous creator of Bitcoin, who published the original Bitcoin whitepaper in October 2008 and launched the network in January 2009. Satoshi mined approximately 1.1 million BTC in the early days of the network and has never moved these coins. Their true identity remains one of technology's greatest mysteries, with candidates ranging from cryptographers to academic researchers. Satoshi's smallest unit of Bitcoin (0.00000001 BTC) is named a 'satoshi' or 'sat' in their honor.",
    difficulty: "Novice",
    readTime: "3 min",
    category: "Crypto Fundamentals",
    keyPoints: [
      "Published the Bitcoin whitepaper on October 31, 2008",
      "Mined ~1.1 million BTC that have never been moved",
      "True identity remains unknown — one of tech's biggest mysteries"
    ],
    studentPerspective: "Satoshi's creation of Bitcoin introduced the concept of decentralized money. Understanding the origin story contextualizes the entire crypto ecosystem.",
    relatedTerms: ["hodl-strategy", "leverage-trading", "liquidation-cascade"]
  }
];
