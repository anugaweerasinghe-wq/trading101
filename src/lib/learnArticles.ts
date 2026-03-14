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
    metaDescription: "Learn what paper trading is and why it's the safest way to start investing. Practice with $10,000 virtual cash on TradeHQ — no signup, no risk.",
    readTime: "5 min read",
    sections: [
      {
        heading: "What Is Paper Trading?",
        paragraphs: [
          "Paper trading is the practice of simulating trades without using real money. Instead of risking your hard-earned savings, you use virtual currency to buy and sell stocks, ETFs, cryptocurrencies, and other financial instruments. The term dates back to a time when aspiring traders would literally write their hypothetical trades on paper to track performance.",
          "Today, paper trading is done digitally through platforms like TradeHQ, which provide simulated trading environments with real-time market data. You get all the experience of placing orders, reading charts, and managing a portfolio — without any financial risk. It is the single best way for a beginner to learn how markets actually work.",
          "On TradeHQ, every user starts with $10,000 in virtual cash. You can trade over 150 assets including blue-chip stocks like Apple (AAPL), cryptocurrencies like Bitcoin (BTC), ETFs like SPY, forex pairs, and commodities like gold. Every trade you make is tracked, giving you a realistic portfolio experience."
        ]
      },
      {
        heading: "Why Beginners Should Paper Trade First",
        paragraphs: [
          "Jumping straight into live trading is like learning to drive on a highway during rush hour. Paper trading gives you a controlled environment to make mistakes, learn from them, and build confidence. Studies show that traders who practice for at least 3 months before going live have significantly better long-term results.",
          "With paper trading you can test different strategies — day trading, swing trading, buy-and-hold — to see what fits your personality and schedule. You can learn to read candlestick charts, set stop-loss orders, and understand the emotional discipline required for successful trading, all without the stress of watching real money fluctuate.",
          "Paper trading also teaches you about risk management. You'll learn concepts like position sizing (never risking more than 2% of your portfolio on a single trade), diversification across asset classes, and the importance of having a trading plan before you click the buy button."
        ]
      },
      {
        heading: "How to Get Started with Paper Trading on TradeHQ",
        paragraphs: [
          "Getting started is simple: visit TradeHQ, and you'll have $10,000 in virtual cash ready to trade immediately — no signup or credit card required. Browse over 150 assets, read the AI-generated market analysis, place your first simulated trade, and start tracking your portfolio performance.",
          "As you gain experience, use the AI Mentor feature to get personalized strategy recommendations. Review your trade history, analyze what worked and what didn't, and continuously refine your approach. The goal isn't to make money — it's to build the skills and discipline you'll need when you eventually trade with real capital.",
          "Many professional traders still use paper trading to test new strategies before deploying real capital. It's not just for beginners — it's a lifelong tool for any serious market participant. Start your paper trading journey today and build the foundation for long-term financial success."
        ]
      }
    ],
    relatedLinks: [
      { href: "/trade", label: "Start paper trading with $10,000 virtual cash" },
      { href: "/trade/aapl", label: "Practice trading Apple (AAPL)" },
      { href: "/trade/btc", label: "Practice trading Bitcoin (BTC)" },
      { href: "/learn/how-to-read-stock-charts", label: "Learn how to read stock charts" },
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
          "Learning to read candlestick patterns is foundational. Patterns like Doji (indecision), Hammer (potential reversal), and Engulfing (strong momentum shift) give traders clues about what might happen next. On TradeHQ, you can practice identifying these patterns on real market data without risking any money."
        ]
      },
      {
        heading: "Support, Resistance, and Trend Lines",
        paragraphs: [
          "Support is a price level where a stock tends to stop falling and bounce back up — think of it as a floor. Resistance is the opposite — a ceiling where the price tends to stop rising and pull back. Identifying these levels helps you decide when to buy (near support) and when to sell (near resistance).",
          "Trend lines connect two or more price points and extend into the future to act as a line of support or resistance. An uptrend line connects higher lows, while a downtrend line connects lower highs. When a stock breaks through a support or resistance level with high volume, it often signals the start of a new trend.",
          "Volume is the number of shares or contracts traded in a given period. High volume confirms the strength of a price move — a breakout on high volume is more reliable than one on low volume. Always check volume alongside price to avoid false signals."
        ]
      },
      {
        heading: "Key Technical Indicators for Beginners",
        paragraphs: [
          "Moving averages smooth out price data to identify trends. The 50-day moving average (MA) and 200-day MA are widely watched. When the 50-day crosses above the 200-day (a Golden Cross), it signals bullish momentum. The opposite (Death Cross) signals bearish momentum. These are simple but powerful tools for timing entries and exits.",
          "The Relative Strength Index (RSI) measures momentum on a scale of 0 to 100. An RSI above 70 suggests the asset is overbought (potentially due for a pullback), while below 30 suggests it's oversold (potentially due for a bounce). MACD (Moving Average Convergence Divergence) is another momentum indicator that shows the relationship between two moving averages.",
          "Practice reading charts on TradeHQ by opening any asset page — for example, NVIDIA (NVDA) or Ethereum (ETH). Study the candlestick patterns, identify support and resistance levels, and watch how indicators confirm or contradict price action. The more charts you study, the better your pattern recognition becomes."
        ]
      }
    ],
    relatedLinks: [
      { href: "/trade/nvda", label: "Practice reading NVIDIA (NVDA) charts" },
      { href: "/trade/eth", label: "Analyze Ethereum (ETH) price action" },
      { href: "/learn/trading-strategies-for-beginners", label: "5 trading strategies for beginners" },
      { href: "/learn/what-is-paper-trading", label: "What is paper trading?" },
    ],
  },
  {
    slug: "crypto-vs-stocks",
    title: "Crypto vs Stocks: Which Should You Practice Trading First?",
    summary: "Crypto and stocks have different risk profiles, trading hours, and volatility. Here's how to decide which to practice first as a beginner.",
    metaDescription: "Crypto vs stocks — which should beginners practice first? Compare volatility, risk, and trading hours. Practice both free on TradeHQ.",
    readTime: "5 min read",
    sections: [
      {
        heading: "The Key Differences Between Crypto and Stocks",
        paragraphs: [
          "Stocks represent ownership in real companies. When you buy Apple stock, you own a tiny piece of a trillion-dollar technology company that generates revenue, pays dividends, and is regulated by the SEC. Stock markets operate Monday through Friday during set hours (9:30 AM to 4:00 PM ET for the NYSE).",
          "Cryptocurrencies are decentralized digital assets that trade 24/7, 365 days a year. There's no closing bell, no holidays, and often no central authority governing their issuance. This means crypto prices can make dramatic moves at any hour — on a Sunday night, during a holiday, or while you sleep.",
          "The biggest difference for beginners is volatility. Bitcoin might move 5-10% in a single day, while a large-cap stock like Microsoft typically moves less than 2%. This makes crypto exciting but also more dangerous for inexperienced traders. Paper trading on TradeHQ lets you experience both markets without any real risk."
        ]
      },
      {
        heading: "Advantages of Starting with Stocks",
        paragraphs: [
          "Stocks offer more stability and a longer track record. The S&P 500 has returned an average of about 10% per year over the last century. Company fundamentals — earnings reports, revenue growth, dividends — provide concrete data points for making trading decisions, which can be easier for beginners to analyze.",
          "Stocks are also more heavily regulated, which provides investor protections. You can learn about well-known companies you already use daily (Apple, Google, Amazon) and understand how real-world events affect stock prices. This practical connection makes learning more intuitive.",
          "On TradeHQ, you can practice trading popular stocks like Tesla (TSLA), NVIDIA (NVDA), and Amazon (AMZN) with your $10,000 virtual portfolio. Watch how earnings announcements, product launches, and macro-economic data drive price movements."
        ]
      },
      {
        heading: "Why Some Beginners Prefer Crypto First",
        paragraphs: [
          "Crypto markets never close, so you can practice trading whenever it fits your schedule. The higher volatility means more frequent trading opportunities, which accelerates the learning process — you'll see the results of your decisions faster. Crypto also has lower barriers to entry, with many assets priced under $1.",
          "The crypto ecosystem introduces you to concepts like blockchain technology, decentralized finance (DeFi), and tokenomics — knowledge that's increasingly relevant in 2026 as traditional finance and crypto continue to converge. Understanding both worlds makes you a more versatile trader.",
          "Our recommendation: start with both. TradeHQ gives you access to 150+ assets across stocks, crypto, ETFs, forex, and commodities. Practice trading a few blue-chip stocks and major cryptocurrencies simultaneously to see which market fits your trading style and risk tolerance."
        ]
      }
    ],
    relatedLinks: [
      { href: "/trade/btc", label: "Practice trading Bitcoin (BTC)" },
      { href: "/trade/aapl", label: "Practice trading Apple (AAPL)" },
      { href: "/markets", label: "Explore all 150+ tradeable assets" },
      { href: "/learn/how-to-build-a-portfolio", label: "How to build a balanced portfolio" },
    ],
  },
  {
    slug: "trading-strategies-for-beginners",
    title: "5 Trading Strategies You Can Test Risk-Free on a Simulator",
    summary: "From buy-and-hold to momentum trading — explore five proven strategies you can practice with virtual money before risking real capital.",
    metaDescription: "5 beginner-friendly trading strategies to practice risk-free. Test momentum, swing, and value trading with $10K virtual cash on TradeHQ.",
    readTime: "7 min read",
    sections: [
      {
        heading: "1. Buy and Hold (The Warren Buffett Approach)",
        paragraphs: [
          "Buy and hold is the simplest strategy: purchase quality assets and hold them for the long term, ignoring short-term price fluctuations. Warren Buffett's Berkshire Hathaway has averaged 20% annual returns over decades using this approach. The idea is that great companies increase in value over time, and patient investors are rewarded.",
          "On TradeHQ, you can practice buying blue-chip stocks like Apple (AAPL) or index ETFs like SPY and tracking their performance over weeks or months. This strategy teaches you to think long-term and avoid the emotional trap of selling during temporary dips. It also helps you understand the power of compound growth.",
          "The key to successful buy-and-hold investing is selecting the right assets. Focus on companies with strong fundamentals: consistent revenue growth, healthy profit margins, competitive advantages (moats), and capable management. Use TradeHQ's AI Mentor to get analysis on any asset before you commit."
        ]
      },
      {
        heading: "2. Swing Trading (Capturing Multi-Day Moves)",
        paragraphs: [
          "Swing trading involves holding positions for several days to weeks, aiming to capture medium-term price moves. Unlike day trading, you don't need to watch screens all day — you can analyze charts in the evening, set your orders, and check back the next day. This makes it ideal for people with day jobs.",
          "The typical swing trading approach uses technical analysis to identify assets that are about to make a significant move. Look for stocks near support levels with bullish candlestick patterns, or assets breaking out above resistance on high volume. Set a stop-loss below your entry point and a profit target 2-3x your risk.",
          "Practice swing trading on TradeHQ with volatile assets like Tesla (TSLA) or Solana (SOL). Track your entry points, stop-losses, and targets in the built-in trading journal. After 20-30 trades, analyze your win rate and average profit/loss to refine your strategy."
        ]
      },
      {
        heading: "3. Momentum Trading, 4. Mean Reversion, and 5. Dollar-Cost Averaging",
        paragraphs: [
          "Momentum trading follows the trend: buy assets that are going up and sell assets that are going down. The theory is that trends tend to persist. Use moving averages and RSI to confirm momentum direction. On TradeHQ, sort assets by 24-hour change to find momentum candidates.",
          "Mean reversion is the opposite philosophy — it assumes that prices eventually return to their average. When an asset drops significantly below its 50-day moving average, mean reversion traders buy, expecting a bounce. When it spikes well above, they sell. This strategy works best in range-bound markets.",
          "Dollar-cost averaging (DCA) is the most passive strategy: invest a fixed amount at regular intervals regardless of price. This smooths out volatility over time and removes the emotional decision of timing the market. On TradeHQ, practice DCA by buying a small amount of Bitcoin or SPY every simulated week and compare your results to lump-sum investing.",
          "The best strategy is the one that fits your personality, schedule, and risk tolerance. Use TradeHQ's paper trading simulator to test all five strategies side-by-side. After several weeks of practice, you'll know which approach feels natural and produces the most consistent results for your style."
        ]
      }
    ],
    relatedLinks: [
      { href: "/trade", label: "Start testing strategies with $10K virtual cash" },
      { href: "/trade/tsla", label: "Practice swing trading Tesla (TSLA)" },
      { href: "/trade/sol", label: "Trade Solana (SOL) momentum" },
      { href: "/learn/how-to-read-stock-charts", label: "How to read stock charts" },
    ],
  },
  {
    slug: "stock-market-index-etfs",
    title: "What Is a Stock Market Index and How Do ETFs Work?",
    summary: "Understand what the S&P 500, Nasdaq, and Dow Jones actually track — and how ETFs let you invest in entire markets with a single trade.",
    metaDescription: "What are stock market indexes and ETFs? Learn about the S&P 500, Nasdaq, and Dow Jones. Practice trading SPY, QQQ on TradeHQ — free simulator.",
    readTime: "5 min read",
    sections: [
      {
        heading: "What Is a Stock Market Index?",
        paragraphs: [
          "A stock market index is a measurement of a section of the stock market. It's calculated from the prices of selected stocks and represents a benchmark for the overall market or a specific sector. The three most famous U.S. indexes are the S&P 500 (500 large companies), the Nasdaq Composite (tech-heavy), and the Dow Jones Industrial Average (30 blue-chip stocks).",
          "You can't directly buy an index — it's a number, not a tradeable security. But you can buy products that track the index, giving you exposure to all the stocks in it. These products are called ETFs (Exchange-Traded Funds), and they're one of the most popular investment vehicles in the world.",
          "When financial news says 'the market was up 2% today,' they're usually referring to the S&P 500 index. Understanding indexes helps you gauge overall market health and compare individual stock performance against the broader market."
        ]
      },
      {
        heading: "How ETFs Work",
        paragraphs: [
          "An ETF is a fund that holds a basket of securities (stocks, bonds, commodities) and trades on an exchange like a regular stock. SPY tracks the S&P 500, QQQ tracks the Nasdaq 100, and DIA tracks the Dow Jones. When you buy one share of SPY, you effectively own a tiny piece of all 500 companies in the S&P 500.",
          "ETFs offer instant diversification at a low cost. Instead of buying 500 individual stocks, you buy one ETF. Most ETFs have very low expense ratios (annual fees), often under 0.1%. They also trade throughout the day at real-time prices, unlike mutual funds which only trade once at market close.",
          "On TradeHQ, you can practice trading popular ETFs like SPY, QQQ, DIA, and ARKK. This lets you learn about market-wide movements without picking individual stocks — a strategy many professional investors recommend for beginners."
        ]
      },
      {
        heading: "Building a Portfolio with ETFs",
        paragraphs: [
          "A classic beginner portfolio might allocate 60% to a broad market ETF (SPY), 20% to a growth/tech ETF (QQQ), and 20% to individual stocks or crypto you want to learn about. This gives you diversified market exposure while still allowing you to practice active trading on a portion of your portfolio.",
          "ETFs are also excellent for learning about different sectors and asset classes. Want exposure to the semiconductor industry? There's an ETF for that. Interested in international markets, clean energy, or real estate? ETFs cover virtually every market segment imaginable.",
          "Use TradeHQ to build a virtual portfolio with ETFs and track its performance against individual stock picks. This exercise teaches you about correlation, diversification benefits, and the trade-off between concentrated bets and broad market exposure. Practice this strategy risk-free before committing real capital."
        ]
      }
    ],
    relatedLinks: [
      { href: "/trade/spy", label: "Practice trading the S&P 500 ETF (SPY)" },
      { href: "/trade/qqq", label: "Trade the Nasdaq 100 ETF (QQQ)" },
      { href: "/learn/how-to-build-a-portfolio", label: "How to build a balanced portfolio" },
      { href: "/learn/crypto-vs-stocks", label: "Crypto vs stocks comparison" },
    ],
  },
  {
    slug: "how-to-build-a-portfolio",
    title: "How to Build a Balanced Virtual Portfolio from Scratch",
    summary: "Learn the fundamentals of portfolio construction — asset allocation, diversification, and rebalancing — using your $10,000 TradeHQ virtual cash.",
    metaDescription: "Learn how to build a diversified portfolio from scratch. Practice asset allocation with $10K virtual cash on TradeHQ — free stock simulator.",
    readTime: "6 min read",
    sections: [
      {
        heading: "The Foundation: Asset Allocation",
        paragraphs: [
          "Asset allocation is the process of dividing your portfolio among different asset classes — stocks, bonds, crypto, commodities, and cash. Research consistently shows that asset allocation is the single most important factor in long-term portfolio performance, more impactful than individual stock selection or market timing.",
          "A common framework for beginners is the 60/30/10 split: 60% in stocks or stock ETFs for growth, 30% in bonds or stable assets for protection, and 10% in higher-risk opportunities like crypto or individual stock picks. On TradeHQ, you can experiment with different allocations to see how they perform.",
          "Your ideal allocation depends on your goals, time horizon, and risk tolerance. A 25-year-old saving for retirement can afford more risk (80% stocks, 20% bonds) than a 55-year-old approaching retirement (40% stocks, 60% bonds). Paper trading helps you discover your true risk tolerance before real money is on the line."
        ]
      },
      {
        heading: "Diversification: Don't Put All Eggs in One Basket",
        paragraphs: [
          "Diversification means spreading investments across different assets so that poor performance in one area doesn't devastate your entire portfolio. If you own only tech stocks and the tech sector drops 30%, your whole portfolio suffers. But if tech is just 25% of a diversified portfolio, the impact is cushioned.",
          "Effective diversification happens across multiple dimensions: asset classes (stocks, crypto, commodities), sectors (technology, healthcare, energy), geographies (US, international), and company sizes (large-cap, mid-cap, small-cap). ETFs make diversification simple — SPY gives you 500 stocks in one trade.",
          "On TradeHQ, build a portfolio that spans multiple asset types. Buy some stocks (AAPL, NVDA), add crypto exposure (BTC, ETH), include an ETF for broad market coverage (SPY), and maybe add a commodity like gold for hedging. Track how each piece contributes to your overall performance."
        ]
      },
      {
        heading: "Rebalancing and Ongoing Management",
        paragraphs: [
          "Over time, your portfolio allocation will drift as some assets outperform others. If your crypto holdings surge 50% while stocks grow 10%, crypto becomes a larger percentage of your portfolio than you intended — increasing your risk. Rebalancing means periodically selling some winners and buying more of the underperformers to maintain your target allocation.",
          "Most financial advisors recommend rebalancing quarterly or when any asset class drifts more than 5% from its target allocation. This disciplined approach forces you to sell high and buy low — the opposite of what emotional traders do. It's counterintuitive but mathematically sound.",
          "Practice rebalancing on TradeHQ by setting a target allocation at the start, then checking your portfolio monthly. Use the portfolio analytics feature to see how your allocations have shifted and make adjustment trades. This exercise builds the discipline you'll need when managing real investments. Remember: successful investing is a marathon, not a sprint."
        ]
      }
    ],
    relatedLinks: [
      { href: "/portfolio", label: "View and manage your virtual portfolio" },
      { href: "/trade/spy", label: "Add S&P 500 ETF (SPY) to your portfolio" },
      { href: "/trade/btc", label: "Add Bitcoin (BTC) to your portfolio" },
      { href: "/learn/stock-market-index-etfs", label: "Understanding ETFs and indexes" },
    ],
  },
];
