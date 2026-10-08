export interface ContentSection {
  type: "text" | "heading" | "list" | "image" | "example" | "tip" | "quote" | "stat" | "highlight";
  data?: string | string[];
  alt?: string;
  caption?: string;
  author?: string;
  value?: string;
  label?: string;
}

export interface Subtopic {
  title: string;
  content: ContentSection[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Lesson {
  id: number;
  title: string;
  category: string;
  description: string;
  subtopics: Subtopic[];
  quiz: QuizQuestion[];
}

export const lessonData: Lesson[] = [
  {
    id: 1,
    title: "Getting Started with Trading",
    category: "Basics",
    description: "Learn the fundamentals of trading, key terminology, and how markets work.",
    subtopics: [
      {
        title: "Understanding Stocks, ETFs & Securities",
        content: [
          {
            type: "quote",
            data: "The stock market is a device for transferring money from the impatient to the patient.",
            author: "Warren Buffett",
          },
          {
            type: "text",
            data: "Welcome to the world of trading! Before you make your first trade, it's crucial to understand what you're actually buying and selling. Think of securities as pieces of ownership or debt that you can trade on the market.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-trading-workspace.jpg",
            alt: "Professional trading workspace with multiple monitors",
            caption: "Your journey to financial freedom starts with understanding the fundamentals",
          },
          {
            type: "heading",
            data: "What are Stocks?",
          },
          {
            type: "text",
            data: "A stock represents a piece of ownership in a company. When you buy Apple stock, you become a tiny owner of Apple! Companies sell stocks to raise money, and you can profit if the company grows and the stock price increases.",
          },
          {
            type: "stat",
            value: "$2.8T",
            label: "Apple's Market Capitalization",
            data: "One of the most valuable companies in the world, showing the incredible potential of stock ownership",
          },
          {
            type: "example",
            data: "If you buy 10 shares of Tesla at $200 each, you've invested $2,000. If Tesla's price rises to $250, your investment is now worth $2,500 - a $500 profit!",
          },
          {
            type: "heading",
            data: "Exchange-Traded Funds (ETFs)",
          },
          {
            type: "text",
            data: "ETFs are like baskets of multiple stocks bundled together. Instead of buying one company, you're buying a piece of many companies at once. This is called diversification, and it helps reduce risk.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-etf-diversification.jpg",
            alt: "ETF diversification network visualization",
            caption: "ETFs connect you to multiple assets for better diversification",
          },
          {
            type: "highlight",
            data: "ETFs combine the diversification of mutual funds with the trading flexibility of individual stocks - giving you the best of both worlds.",
          },
          {
            type: "list",
            data: [
              "SPY tracks the S&P 500 (500 largest US companies)",
              "QQQ focuses on technology companies",
              "GLD tracks the price of gold",
              "Lower risk than individual stocks",
              "Great for beginners",
            ],
          },
          {
            type: "tip",
            data: "New to trading? Start with ETFs like SPY or QQQ. They're less volatile than individual stocks and give you instant diversification.",
          },
          {
            type: "heading",
            data: "Other Securities You Should Know",
          },
          {
            type: "text",
            data: "Beyond stocks and ETFs, there are other investment vehicles:",
          },
          {
            type: "list",
            data: [
              "Bonds: Loans to companies or governments that pay you interest",
              "Commodities: Physical goods like gold, oil, or wheat",
              "Cryptocurrencies: Digital currencies like Bitcoin and Ethereum",
              "Options: Contracts that give you the right to buy/sell at a specific price",
              "Futures: Agreements to buy/sell something at a future date",
            ],
          },
          {
            type: "text",
            data: "Each security type has different risk levels, time horizons, and potential returns. As a beginner, focus on stocks and ETFs until you understand the market better.",
          },
        ],
      },
      {
        title: "How to Read Stock Quotes & Charts",
        content: [
          {
            type: "quote",
            data: "Charts are the footprints of money. If you can read them, you can follow where the money is going.",
            author: "Anonymous Trader",
          },
          {
            type: "text",
            data: "Stock quotes and charts are the language of the market. Learning to read them is like learning to read a map - once you know how, you can navigate anywhere!",
          },
          {
            type: "heading",
            data: "Understanding Stock Quotes",
          },
          {
            type: "text",
            data: "A stock quote shows you critical information about a stock at a glance:",
          },
          {
            type: "list",
            data: [
              "Ticker Symbol: The stock's unique code (e.g., AAPL for Apple)",
              "Current Price: What the stock is trading at right now",
              "Change: How much the price moved today (in dollars and percentage)",
              "Volume: How many shares were traded today",
              "Market Cap: The total value of all the company's shares",
              "P/E Ratio: Price compared to earnings (valuation metric)",
            ],
          },
          {
            type: "example",
            data: "AAPL: $175.50 (+2.30, +1.33%) | Volume: 52M | Market Cap: $2.8T | P/E: 28.5. This tells us Apple is trading at $175.50, up 1.33% today, with high trading activity.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-candlestick.jpg",
            alt: "Understanding candlestick chart patterns",
            caption: "Master the art of reading price action through candlestick patterns",
          },
          {
            type: "heading",
            data: "Reading Price Charts",
          },
          {
            type: "text",
            data: "Charts visualize how a stock's price has moved over time. The most common chart types are:",
          },
          {
            type: "list",
            data: [
              "Line Charts: Simple line connecting closing prices",
              "Candlestick Charts: Show open, close, high, and low prices",
              "Bar Charts: Similar to candlesticks but with vertical bars",
            ],
          },
          {
            type: "heading",
            data: "Candlestick Patterns",
          },
          {
            type: "highlight",
            data: "Candlesticks are the DNA of price movement - they reveal the psychology of buyers and sellers in real-time.",
          },
          {
            type: "text",
            data: "Candlesticks are the most popular chart type because they show so much information:",
          },
          {
            type: "list",
            data: [
              "Green/White candle = Price went up (bullish)",
              "Red/Black candle = Price went down (bearish)",
              "The body shows opening and closing prices",
              "The wicks show the highest and lowest prices",
              "Longer bodies = stronger momentum",
            ],
          },
          {
            type: "stat",
            value: "4+",
            label: "Data Points Per Candlestick",
            data: "Each candlestick gives you Open, High, Low, and Close prices - telling a complete story of price action",
          },
          {
            type: "tip",
            data: "Practice reading charts daily! Look at different timeframes (1 day, 1 week, 1 month) to see different perspectives of the same stock.",
          },
          {
            type: "heading",
            data: "Key Chart Indicators",
          },
          {
            type: "text",
            data: "Professional traders use indicators to help predict future movements:",
          },
          {
            type: "list",
            data: [
              "Moving Averages: Shows average price over time (smooth out noise)",
              "Volume Bars: Shows trading activity (higher volume = stronger moves)",
              "Support/Resistance: Price levels where stocks tend to bounce or stop",
              "Trend Lines: Lines connecting highs or lows to show direction",
            ],
          },
        ],
      },
      {
        title: "Market Orders vs. Limit Orders",
        content: [
          { type: "text", data: "Order types describe different trade-offs between execution and price control. This lesson explains their mechanics rather than recommending one order type for every situation." },
          { type: "heading", data: "Market Orders: Execution Before Price Control" },
          { type: "text", data: "A market order seeks to buy or sell promptly at available prices. The last quoted price may differ from the fill price, particularly in fast or thin markets. Trading halts and limited liquidity can interrupt execution." },
          { type: "example", data: "Hypothetical example: a quote shows $200 and an order requests 10 shares. A $200.50 fill costs $2,005 before fees, while a $199.50 fill costs $1,995. The quote alone does not establish the final cost." },
          { type: "heading", data: "Limit Orders: A Price Condition" },
          { type: "text", data: "A buy limit specifies the highest acceptable purchase price; a sell limit specifies the lowest acceptable sale price. Execution is at that price or better, but the order may fill only partly or not at all. Reaching the limit does not guarantee a fill because other orders may have priority." },
          { type: "example", data: "A hypothetical buy limit at $195 cannot fill above $195. If the market stays higher, the order remains unfilled. Even if a fill occurs, the asset can subsequently fall in value." },
          { type: "heading", data: "Stop and Stop-Limit Mechanics" },
          { type: "text", data: "A stop order becomes a market order when its trigger is reached. A stop-limit instead becomes a limit order. A stop can execute beyond its trigger after a gap; a stop-limit can remain unfilled. Neither guarantees a maximum loss." },
          { type: "heading", data: "What TradeHQ Supports" },
          { type: "highlight", data: "TradeHQ executes simulated market orders. It does not place resting limit, stop or trailing-stop orders. Study those mechanics using a worksheet; recording an exit condition does not automate it in the simulator." },
          { type: "tip", data: "For a worksheet exercise, compare a market-order fill with an unfilled limit-order case and a stop triggered after a price gap. Record the assumptions, fees and remaining exposure rather than assuming any order type is always preferable." },
          { type: "heading", data: "Reference" },
          { type: "text", data: "SEC Investor.gov \u2014 Types of Orders and Stop, Stop-Limit, and Trailing Stop Orders explain the execution trade-offs: https://www.investor.gov/introduction-investing/investing-basics/how-stock-markets-work/types-orders and https://www.investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15" },
        ],
      },
      {
        title: "Trading Hours & Market Sessions",
        content: [
          {
            type: "text",
            data: "The stock market doesn't trade 24/7. Understanding when markets are open and how different sessions behave can significantly impact your trading success.",
          },
          {
            type: "heading",
            data: "Regular Trading Hours",
          },
          {
            type: "text",
            data: "US stock markets (NYSE and NASDAQ) are open:",
          },
          {
            type: "list",
            data: [
              "9:30 AM - 4:00 PM Eastern Time",
              "Monday through Friday",
              "Closed on market holidays (New Year's, Christmas, etc.)",
              "This is when most trading volume occurs",
              "Best liquidity and price stability",
            ],
          },
          {
            type: "tip",
            data: "The first and last hours of trading (9:30-10:30 AM and 3:00-4:00 PM) are the most volatile. As a beginner, consider avoiding these periods until you're more experienced.",
          },
          {
            type: "heading",
            data: "Pre-Market Trading (4:00 AM - 9:30 AM ET)",
          },
          {
            type: "text",
            data: "Pre-market allows trading before official market open:",
          },
          {
            type: "list",
            data: [
              "Lower volume = wider spreads and more volatility",
              "Reacts to overnight news and earnings reports",
              "Only limit orders accepted (no market orders)",
              "Not all brokers offer pre-market access",
              "Prices can gap significantly from previous close",
            ],
          },
          {
            type: "example",
            data: "Apple releases earnings at 4:05 PM. In pre-market the next day, the stock might jump from $180 to $195 before regular trading begins. This gap reflects overnight investor reaction.",
          },
          {
            type: "heading",
            data: "After-Hours Trading (4:00 PM - 8:00 PM ET)",
          },
          {
            type: "text",
            data: "After-hours trading continues after market close:",
          },
          {
            type: "list",
            data: [
              "Similar to pre-market: lower volume, higher volatility",
              "Many earnings are released at 4:00 PM",
              "Prices can move dramatically on news",
              "Limit orders only",
              "Great for experienced traders, risky for beginners",
            ],
          },
          {
            type: "heading",
            data: "Cryptocurrency Trading",
          },
          {
            type: "text",
            data: "Unlike stocks, cryptocurrency markets never close:",
          },
          {
            type: "list",
            data: [
              "Open 24/7, 365 days a year",
              "No concept of pre-market or after-hours",
              "Can trade Bitcoin at 3 AM on Christmas",
              "More volatile due to global, always-on trading",
              "Weekend trading can be especially volatile",
            ],
          },
          {
            type: "heading",
            data: "Best Times to Trade",
          },
          {
            type: "text",
            data: "Different times of day have different characteristics:",
          },
          {
            type: "list",
            data: [
              "9:30-10:30 AM: Opening bell - highest volume and volatility",
              "10:30 AM-3:00 PM: Mid-day - calmer, more predictable",
              "3:00-4:00 PM: Closing hour - volume picks up again",
              "Best for beginners: 10:00 AM - 3:00 PM for stability",
              "Best for day traders: Opening and closing hours",
            ],
          },
          {
            type: "tip",
            data: "Start trading during mid-day hours when volatility is lower. As you gain experience, you can explore the more active opening and closing periods.",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What does owning a stock represent?",
        options: [
          "Lending money to a company",
          "A piece of ownership in a company",
          "A contract to buy the company",
          "Insurance for the company",
        ],
        correctAnswer: 1,
        explanation: "When you buy a stock, you're purchasing a small ownership stake in that company. You become a shareholder!",
      },
      {
        question: "What is the main advantage of ETFs over individual stocks?",
        options: [
          "They're always more profitable",
          "They provide instant diversification",
          "They never lose value",
          "They're only for professional traders",
        ],
        correctAnswer: 1,
        explanation: "ETFs bundle multiple stocks together, giving you diversification in a single purchase. This helps reduce risk compared to buying individual stocks.",
      },
      {
        question: "Which order type prioritises immediate execution over price control?",
        options: ["Limit Order", "Stop Order", "Market Order", "Day Order"],
        correctAnswer: 2,
        explanation: "Market orders are designed to execute as quickly as available liquidity allows, but the final price can differ and execution is not literally guaranteed in every market condition.",
      },
      {
        question: "When are US stock markets open for regular trading?",
        options: [
          "24/7 like crypto",
          "8:00 AM - 5:00 PM ET",
          "9:30 AM - 4:00 PM ET",
          "10:00 AM - 3:00 PM ET",
        ],
        correctAnswer: 2,
        explanation: "Regular trading hours for US markets are 9:30 AM to 4:00 PM Eastern Time, Monday through Friday (excluding holidays).",
      },
      {
        question: "What does a green/white candlestick indicate?",
        options: [
          "The price went down",
          "No trading occurred",
          "The price went up",
          "The stock is overvalued",
        ],
        correctAnswer: 2,
        explanation: "A green or white candlestick means the closing price was higher than the opening price - the stock went up that period!",
      },
    ],
  },
  {
    id: 2,
    title: "Risk Management",
    category: "Strategy",
    description: "Essential strategies to protect your capital and manage trading risk.",
    subtopics: [
      {
        title: "Position Sizing & The 2% Rule",
        content: [
          {
            type: "quote",
            data: "Rule No. 1: Never lose money. Rule No. 2: Never forget Rule No. 1.",
            author: "Warren Buffett",
          },
          {
            type: "text",
            data: "Position sizing is the cornerstone of risk management. It's not about IF you'll have losing trades (you will), but about surviving them and staying in the game long enough to win.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-risk-shield.jpg",
            alt: "Financial risk protection shield",
            caption: "Protect your portfolio with proper risk management strategies",
          },
          {
            type: "text",
            data: "The fastest way to blow up your trading account is risking too much on a single trade. Position sizing is the most critical skill for long-term success.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-risk-management.jpg",
            alt: "Professional risk management strategies",
            caption: "Protect your capital first, profits will follow",
          },
          {
            type: "heading",
            data: "What is Position Sizing?",
          },
          {
            type: "text",
            data: "Position sizing determines how much money you invest in each trade. It's not about picking winners - it's about surviving losers.",
          },
          {
            type: "example",
            data: "You have $100,000 to trade. If you put all $100,000 into one stock and it drops 50%, you now have $50,000. A 100% gain from $50,000 is required just to return to $100,000.",
          },
          {
            type: "heading",
            data: "The 2% Rule Explained",
          },
          {
            type: "text",
            data: "For this lesson's hypothetical example, use a 2% risk budget per trade. If the budget is recalculated from current equity after each loss, the dollar amount falls as the account falls; it does not mean you have exactly 50 losses before reaching zero.",
          },
          {
            type: "list",
            data: [
              "$100,000 account at 2% = $2,000 risk budget",
              "$50,000 account at 2% = $1,000 risk budget",
              "$25,000 account at 2% = $500 risk budget",
              "The percentage is a modelling choice, not a universal rule",
              "Lower or higher risk changes the drawdown path",
            ],
          },
          {
            type: "tip",
            data: "A percentage risk budget refers to the amount at risk if the exit is reached, not the position's full notional value. On a $100,000 practice account, a 2% example budget is $2,000.",
          },
          {
            type: "heading",
            data: "Calculating Your Position Size",
          },
          {
            type: "text",
            data: "Here's the simple formula:",
          },
          {
            type: "example",
            data: "Account: $100,000 | Example risk budget: 2% = $2,000 | Stock price: $100 | Exit level: $95 | Risk per share: $5 | Position size: $2,000 ÷ $5 = 400 shares. A 400-share position has $40,000 notional value, with $2,000 at risk if filled at the assumed exit price.",
          },
          {
            type: "list",
            data: [
              "Step 1: Determine your risk amount (2% of account)",
              "Step 2: Set your stop-loss price",
              "Step 3: Calculate risk per share (entry - stop)",
              "Step 4: Divide risk amount by risk per share",
              "Step 5: That's how many shares to buy",
            ],
          },
          {
            type: "heading",
            data: "Why This Works",
          },
          {
            type: "text",
            data: "There is no universal win rate or risk percentage that guarantees survival. This 2% example simply shows how repeated fixed-percentage losses compound:",
          },
          {
            type: "list",
            data: [
              "10 consecutive 2%-of-current-equity losses leave about 81.7% of starting equity (about -18.3%)",
              "20 consecutive 2%-of-current-equity losses leave about 66.8% (about -33.2%)",
              "A smaller percentage loss budget reduces the amount exposed in each example trade but does not prevent a large drawdown",
              "Small losses alone do not guarantee profitable long-term results; gains, costs, gaps and trade frequency also matter",
              "A written risk rule can make simulated decision-making more consistent, but it cannot remove risk or emotion",
            ],
          },
        ],
      },
      {
        title: "Stop-Loss & Take-Profit Targets",
        content: [
          {
            type: "highlight",
            data: "Stop orders automate a trigger, not a guaranteed outcome. Availability, eligible trading hours and trigger rules depend on the broker and venue.",
          },
          {
            type: "text",
            data: "A practice plan can record an adverse exit and a profit target before entry. Compare planned outcomes with actual fills; neither level promises execution.",
          },
          {
            type: "text",
            data: "Source: SEC Investor Bulletin, Stop, Stop-Limit, and Trailing Stop Orders — investor.gov/introduction-investing/general-resources/news-alerts/alerts-bulletins/investor-bulletins-15. These are market concepts; TradeHQ currently exposes market orders only.",
          },
          {
            type: "heading",
            data: "Stop Orders: Trigger and Execution",
          },
          {
            type: "text",
            data: "A sell stop becomes a market order when triggered. A stop-limit instead becomes a limit order, which may remain unfilled.",
          },
          {
            type: "list",
            data: [
              "Set BEFORE you enter the trade, not after",
              "Based on technical levels, not emotions",
              "Losses can exceed the amount planned at the stop",
              "Removes emotion from the decision",
              "Check which order types the venue actually supports",
            ],
          },
          {
            type: "example",
            data: "Illustration: buy at $200 and set a $190 sell stop. If an overnight gap leads to a $150 fill, the loss is $50 per share before costs, not $10.",
          },
          {
            type: "heading",
            data: "Where to Place Stop-Losses",
          },
          {
            type: "text",
            data: "Don't place stops randomly! Use technical analysis:",
          },
          {
            type: "list",
            data: [
              "Below support levels (for long positions)",
              "Above resistance levels (for short positions)",
              "Below recent swing lows",
              "At key moving averages (50-day, 200-day)",
              "Beyond expected volatility (use ATR indicator)",
            ],
          },
          {
            type: "tip",
            data: "Moving a stop further away changes planned risk; no fixed buffer prevents short-term price moves from triggering it.",
          },
          {
            type: "heading",
            data: "Take-Profit Targets: Lock In Gains",
          },
          {
            type: "text",
            data: "A profit target is a planned exit level. Whether an order at that level executes depends on the order type, available liquidity and market conditions; a target does not guarantee a gain or remove emotion from the decision.",
          },
          {
            type: "list",
            data: [
              "A target can be compared with resistance levels or previous highs as part of a technical-analysis exercise",
              "Risk/reward ratios describe assumptions rather than guaranteed outcomes",
              "Multiple planned exits can be modelled in a simulation",
              "Actual fills may differ from the planned level depending on order type and market conditions",
              "Review the result against the original plan instead of treating any target as automatically correct",
            ],
          },
          {
            type: "example",
            data: "You buy at $200 with targets at $220 (sell 50%) and $240 (sell remaining 50%). If the stock hits $220, you lock in some profit. If it reverses, you've secured gains instead of hoping it goes higher.",
          },
          {
            type: "heading",
            data: "Trailing Stops: Moving Trigger Levels",
          },
          {
            type: "text",
            data: "For a long position, a trailing sell stop rises with favourable price moves and stays fixed when prices fall:",
          },
          {
            type: "list",
            data: [
              "Follows the price up automatically",
              "A higher trigger does not guarantee a profitable fill",
              "Set as percentage or dollar amount",
              "Great for trending markets",
              "Example: 10% trailing stop on winning trades",
            ],
          },
          {
            type: "example",
            data: "Illustration: a 10% trail moves from $90 to $135 as price rises from $100 to $150. Profit is $35 per share before costs only if execution occurs at $135.",
          },
        ],
      },
      {
        title: "Understanding Risk-Reward Ratios",
        content: [
          {
            type: "quote",
            data: "Win or lose, everybody gets what they want out of the market. Some people seem to like to lose, so they win by losing money.",
            author: "Ed Seykota",
          },
          {
            type: "text",
            data: "Reward-to-risk is one assumption in an expectancy calculation. Realized outcomes, frequency and costs all affect profitability; neither a planned ratio nor a win rate guarantees a profit.",
          },
          {
            type: "stat",
            value: "1:3",
            label: "Hypothetical Reward-to-Risk Example",
            data: "Assume fixed realized $3 wins and $1 losses: a 30% win rate gives 0.2R gross expectancy before costs. A planned target need not be filled.",
          },
          {
            type: "heading",
            data: "What is Risk-Reward Ratio?",
          },
          {
            type: "text",
            data: "It compares how much you're risking to how much you could potentially gain. A 1:3 ratio means you risk $1 to potentially make $3.",
          },
          {
            type: "example",
            data: "Entry: $100 | Stop-loss: $95 (risk $5) | Target: $115 (gain $15) | Risk-Reward: 1:3. You're risking $5 to potentially make $15.",
          },
          {
            type: "heading",
            data: "Why It Matters",
          },
          {
            type: "text",
            data: "With proper risk-reward ratios, you can be profitable even with a low win rate:",
          },
          {
            type: "list",
            data: [
              "Fixed realized 1:1 amounts require 50% wins for gross break-even before costs",
              "Fixed realized 1:2 loss-to-gain amounts require 33⅓% wins for gross break-even before costs",
              "Fixed realized 1:3 amounts require 25% wins for gross break-even before costs",
              "With fixed realized 3R wins and 1R losses, 30% wins yield 0.2R gross expectancy before costs",
              "Focus on finding high-reward, low-risk setups",
            ],
          },
          {
            type: "example",
            data: "10 trades with 1:3 ratio, 30% win rate: 3 winners at $300 = $900 profit. 7 losers at $100 = $700 loss. Net profit: $200 with only 3 winners!",
          },
          {
            type: "tip",
            data: "Compare several hypothetical reward-to-risk settings with realized gains, losses and costs. No minimum planned ratio is universally suitable or guarantees that targets will be achieved.",
          },
          {
            type: "heading",
            data: "Finding Good Risk-Reward Setups",
          },
          {
            type: "text",
            data: "Look for these characteristics:",
          },
          {
            type: "list",
            data: [
              "Clear support level for tight stops",
              "Multiple resistance levels for targets",
              "Entry near support, target at resistance",
              "Avoid chasing - wait for pullbacks",
              "Better to miss a trade than take bad risk-reward",
            ],
          },
          {
            type: "heading",
            data: "Calculating Before You Trade",
          },
          {
            type: "text",
            data: "Always calculate BEFORE entering:",
          },
          {
            type: "list",
            data: [
              "Step 1: Identify your entry price",
              "Step 2: Set stop-loss (your risk)",
              "Step 3: Identify target (your reward)",
              "Step 4: Calculate ratio: Reward ÷ Risk",
              "Step 5: If ratio is less than 2, reconsider the trade",
            ],
          },
          {
            type: "example",
            data: "Entry: $50 | Stop: $48 | Target: $56 | Risk: $2 | Reward: $6 | Ratio: $6 ÷ $2 = 3:1 under the stated exit assumptions, before costs. The ratio does not establish a successful setup.",
          },
          {
            type: "heading",
            data: "Adjusting Your Approach",
          },
          {
            type: "text",
            data: "Different trading styles require different ratios:",
          },
          {
            type: "list",
            data: [
              "Day trading: Minimum 1:2 (fast-paced, many trades)",
              "Swing trading: Minimum 1:3 (fewer trades, longer holds)",
              "Position trading: Can accept 1:5+ (patient, large moves)",
              "Scalping: Often 1:1 but very high win rate needed",
            ],
          },
        ],
      },
      {
        title: "Diversification Strategies",
        content: [
          {
            type: "text",
            data: "Don't put all your eggs in one basket! Diversification is your shield against catastrophic losses. It's not about picking more stocks - it's about spreading risk intelligently.",
          },
          {
            type: "heading",
            data: "Why Diversify?",
          },
          {
            type: "text",
            data: "Even the best companies can fail. Even the strongest trends can reverse. Diversification protects you when you're wrong.",
          },
          {
            type: "list",
            data: [
              "Reduces impact of any single bad trade",
              "Smooths out portfolio volatility",
              "Captures opportunities across different sectors",
              "Protects against sector-specific crashes",
              "Allows you to sleep better at night",
            ],
          },
          {
            type: "example",
            data: "In 2020, airlines crashed while tech soared. If you only held airlines, you lost big. If you held both, tech gains offset airline losses.",
          },
          {
            type: "heading",
            data: "Types of Diversification",
          },
          {
            type: "text",
            data: "Diversify across multiple dimensions:",
          },
          {
            type: "list",
            data: [
              "Asset Classes: Stocks, ETFs, crypto, bonds, commodities",
              "Sectors: Tech, finance, healthcare, energy, consumer",
              "Geography: US, international, emerging markets",
              "Market Cap: Large-cap, mid-cap, small-cap",
              "Time Horizons: Day trades, swing trades, long-term holds",
            ],
          },
          {
            type: "tip",
            data: "There is no universal correct number of positions. Diversification depends on what the holdings are, how strongly they move together, their sizes and the strategy being tested. More holdings do not automatically remove risk, and diversification cannot guarantee against losses.",
          },
          {
            type: "heading",
            data: "Sector Diversification",
          },
          {
            type: "text",
            data: "Don't load up on one sector, even if it's hot right now:",
          },
          {
            type: "list",
            data: [
              "Technology: AAPL, MSFT, NVDA (growth)",
              "Finance: JPM, V, MA (stability)",
              "Healthcare: JNJ, UNH (defensive)",
              "Energy: XOM, OIL (commodity exposure)",
              "Consumer: AMZN, WMT (diverse)",
            ],
          },
          {
            type: "example",
            data: "If you hold 5 tech stocks and tech crashes, all 5 drop together. If you hold tech, finance, healthcare, energy, and consumer stocks, losses in one sector are offset by gains in others.",
          },
          {
            type: "heading",
            data: "The Core-Satellite Strategy",
          },
          {
            type: "text",
            data: "A hypothetical weighting exercise, not an allocation recommendation:",
          },
          {
            type: "list",
            data: [
              "Example core: 60% in selected ETF exposures; holdings and concentration still matter",
              "Example satellites: 40% in selected company exposures; higher returns are not assured",
              "A core describes the role chosen in the example, not guaranteed stability",
              "Satellite positions can increase concentration and can underperform",
              "Adjust percentages based on risk tolerance",
            ],
          },
          {
            type: "example",
            data: "Illustrative $100,000 allocation: $60,000 in broad-market ETFs as a core and $40,000 across individual stocks as satellites. This is an example of the 60/40 split above, not a universal allocation recommendation.",
          },
          {
            type: "heading",
            data: "Crypto in Your Portfolio",
          },
          {
            type: "text",
            data: "Cryptocurrency exposure can produce substantial losses. Compare hypothetical weights rather than use universal limits:",
          },
          {
            type: "list",
            data: [
              "Example A: 0% crypto and 100% in other practice exposures",
              "Example B: 10% crypto and 90% in other practice exposures",
              "The examples are arbitrary simulation settings, not beginner or risk-profile limits",
              "Risk comparisons require the same observation period and measure; BTC is not assuredly safe",
              "Never more than you can afford to lose completely",
            ],
          },
          {
            type: "heading",
            data: "Rebalancing Your Portfolio",
          },
          {
            type: "text",
            data: "Set it and forget it doesn't work. Rebalance regularly:",
          },
          {
            type: "list",
            data: [
              "Review monthly or quarterly",
              "Sell winners that grew too large (take profits)",
              "Add to losers if thesis still valid",
              "Maintain target allocation percentages",
              "Adapt to changing market conditions",
            ],
          },
          {
            type: "tip",
            data: "Compare several hypothetical concentration thresholds and record turnover and costs. There is no universal 25% instruction to take profits, and selling changes exposure without guaranteeing a better outcome.",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "In the hypothetical 2% worksheet, what is 2% of $100,000?",
        options: ["$500", "$1,000", "$2,000", "$5,000"],
        correctAnswer: 2,
        explanation: "In this lesson's 2% example, 0.02 × $100,000 = $2,000.",
      },
      {
        question: "What is the main purpose of a stop-loss order?",
        options: [
          "To maximize profits",
          "To limit losses on a trade",
          "To buy more shares",
          "To calculate position size",
        ],
        correctAnswer: 1,
        explanation: "A stop order attempts to limit losses by triggering a market order. The execution price is not guaranteed.",
      },
      {
        question: "With a 1:3 risk-reward ratio, what minimum win rate do you need to be profitable?",
        options: ["50%", "40%", "33%", "25%"],
        correctAnswer: 3,
        explanation: "With fixed realized 3R wins and 1R losses, 25% wins gives gross break-even before costs. Planned targets and actual fills can differ.",
      },
      {
        question: "Which statement about a crypto allocation is accurate?",
        options: ["50% is always safe", "Age alone determines it", "No percentage is universally suitable", "90% guarantees gains"],
        correctAnswer: 2,
        explanation: "No crypto percentage is universally appropriate. Practice weights are assumptions rather than real-money recommendations.",
      },
      {
        question: "What does diversification protect you from?",
        options: [
          "Ever losing money",
          "Catastrophic losses in any single position",
          "Market crashes",
          "Bad trading decisions",
        ],
        correctAnswer: 1,
        explanation: "Diversification spreads risk so that a catastrophic loss in one position doesn't destroy your entire portfolio.",
      },
    ],
  },
  // Adding remaining 4 lessons with similar detailed structure...
  // For brevity, I'll create abbreviated versions - you can expand these similarly
  {
    id: 3,
    title: "Technical Analysis Basics",
    category: "Analysis",
    description: "Learn to read charts and identify trading opportunities using technical indicators.",
    subtopics: [
      {
        title: "Candlestick Patterns",
        content: [
          {
            type: "image",
            data: "/src/assets/lesson-technical-indicators.jpg",
            alt: "Technical analysis indicators and trend lines",
            caption: "Master technical indicators to predict market movements",
          },
          {
            type: "quote",
            data: "The market is a device for transferring money from the impatient to the patient.",
            author: "Warren Buffett",
          },
          {
            type: "text",
            data: "Candlestick patterns are the language of price action. Master these, and you'll understand what the market is telling you.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-candlestick.jpg",
            alt: "Candlestick pattern analysis",
            caption: "Each candle tells a story - learn to read the narrative of price",
          },
          {
            type: "heading",
            data: "Anatomy of a Candlestick",
          },
          {
            type: "list",
            data: [
              "Body: Shows opening and closing prices",
              "Wicks/Shadows: Show high and low prices",
              "Green/White: Close higher than open (bullish)",
              "Red/Black: Close lower than open (bearish)",
              "Longer body = stronger momentum",
            ],
          },
          {
            type: "tip",
            data: "Look for candlestick patterns at support and resistance levels - that's where they're most powerful and reliable!",
          },
        ],
      },
      {
        title: "Support & Resistance Levels",
        content: [
          {
            type: "highlight",
            data: "Support and resistance are where battles between buyers and sellers create invisible walls - price memories that the market never forgets.",
          },
          {
            type: "text",
            data: "Support and resistance are price levels where stocks tend to bounce or stall. They're like invisible floors and ceilings.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-support-resistance.jpg",
            alt: "Support and resistance levels explained",
            caption: "The foundation of technical analysis - where price action comes alive",
          },
          {
            type: "list",
            data: [
              "Support: Price level where buying pressure prevents further decline",
              "Resistance: Price level where selling pressure prevents further rise",
              "Strong levels are tested multiple times",
              "When broken, support becomes resistance (and vice versa)",
            ],
          },
        ],
      },
      {
        title: "Moving Averages (SMA & EMA)",
        content: [
          {
            type: "text",
            data: "Moving averages smooth out price data to identify trends and momentum. They're one of the most popular technical indicators.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-moving-averages.jpg",
            alt: "Understanding moving averages",
            caption: "Smooth out the noise and see the true trend with moving averages",
          },
          {
            type: "stat",
            value: "50 & 200",
            label: "Most Popular Moving Averages (Days)",
            data: "The golden cross (50-day crossing above 200-day) is one of the most powerful bullish signals",
          },
          {
            type: "list",
            data: [
              "SMA: Simple average of prices over time",
              "EMA: Emphasizes recent prices more",
              "50-day and 200-day MAs are most popular",
              "Price above MA = uptrend, below = downtrend",
              "Golden cross: 50-day crosses above 200-day (bullish)",
            ],
          },
        ],
      },
      {
        title: "RSI & MACD Indicators",
        content: [
          {
            type: "text",
            data: "RSI and MACD help identify overbought/oversold conditions and momentum changes.",
          },
          {
            type: "heading",
            data: "RSI (Relative Strength Index)",
          },
          {
            type: "list",
            data: [
              "Measures momentum on 0-100 scale",
              "Above 70 = overbought (potential reversal down)",
              "Below 30 = oversold (potential reversal up)",
              "Divergence signals powerful trend changes",
            ],
          },
          {
            type: "heading",
            data: "MACD (Moving Average Convergence Divergence)",
          },
          {
            type: "list",
            data: [
              "Shows relationship between two moving averages",
              "MACD line crosses above signal = bullish",
              "MACD line crosses below signal = bearish",
              "Histogram shows momentum strength",
            ],
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What does a green/white candlestick indicate?",
        options: [
          "Opening price was higher than closing",
          "Closing price was higher than opening",
          "The stock is overbought",
          "Volume is high",
        ],
        correctAnswer: 1,
        explanation: "Green or white candlesticks show bullish movement - the closing price was higher than the opening price.",
      },
      {
        question: "What RSI level typically indicates an oversold condition?",
        options: ["Above 70", "Below 30", "Exactly 50", "Above 80"],
        correctAnswer: 1,
        explanation: "RSI below 30 is considered oversold, suggesting the price may be due for a bounce upward.",
      },
      {
        question: "What happens when a support level is broken?",
        options: [
          "It disappears forever",
          "It often becomes a resistance level",
          "It doubles in strength",
          "Nothing changes",
        ],
        correctAnswer: 1,
        explanation: "When support is broken, it often flips to become resistance - sellers remember that level and use it to exit positions.",
      },
      {
        question: "What is a 'golden cross' in moving averages?",
        options: [
          "When price crosses the 200-day MA",
          "When 50-day MA crosses above 200-day MA",
          "When two candlesticks cross",
          "When volume exceeds average",
        ],
        correctAnswer: 1,
        explanation: "A golden cross occurs when the 50-day MA crosses above the 200-day MA, signaling a potential long-term bullish trend.",
      },
    ],
  },
  {
    id: 4,
    title: "Portfolio Diversification",
    category: "Strategy",
    description: "Build a balanced portfolio across different asset classes and sectors.",
    subtopics: [
      {
        title: "Asset Allocation Strategies",
        content: [
          {
            type: "image",
            data: "/src/assets/lesson-asset-allocation-chart.jpg",
            alt: "Portfolio asset allocation visualization",
            caption: "Strategic asset allocation is the foundation of portfolio success",
          },
          {
            type: "quote",
            data: "The most important decision you'll make is not what to buy, but how much of each asset to own.",
            author: "Ray Dalio",
          },
          {
            type: "text",
            data: "Asset allocation describes how value is divided among exposures. Its effect depends on holdings, correlations and the period examined; it does not guarantee performance or universally outrank every other decision.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-portfolio-allocation.jpg",
            alt: "Portfolio allocation strategy visualization",
            caption: "Build your fortress - diversified allocation is your strongest defense",
          },
          {
            type: "stat",
            value: "100%",
            label: "Total Weight in a Normalized Allocation",
            data: "The selected weights, including cash, should sum to 100%. This is an accounting identity, not evidence that an allocation determines a fixed share of returns.",
          },
          {
            type: "heading",
            data: "The Three Core Strategies",
          },
          {
            type: "text",
            data: "Choose your allocation based on age, risk tolerance, and time horizon:",
          },
          {
            type: "example",
            data: "Hypothetical A: 80% stock exposures, 15% crypto and 5% cash. Weights total 100%; this is not an age-based recommendation and losses can be permanent.",
          },
          {
            type: "example",
            data: "Hypothetical B: 60% stock exposures, 30% cash and 10% another practice asset. The example does not certify a balanced or suitable real portfolio.",
          },
          {
            type: "example",
            data: "Hypothetical C: 40% stock exposures and 60% cash. This illustrates a different weighting rather than promising capital preservation or retirement income.",
          },
          {
            type: "highlight",
            data: "Age alone cannot determine a suitable allocation. Objectives, liabilities, time horizon and ability to bear loss also matter; a simulator cannot make that determination.",
          },
          {
            type: "heading",
            data: "The 100-Minus-Age Rule",
          },
          {
            type: "text",
            data: "The 100-minus-age shortcut is a simplified heuristic, not a suitability assessment:",
          },
          {
            type: "list",
            data: [
              "Subtract your age from 100 = % in stocks",
              "Age 25: 75% stocks, 25% bonds/cash",
              "Age 50: 50% stocks, 50% bonds/cash",
              "Age 70: 30% stocks, 70% bonds/cash",
              "Adjust based on risk tolerance",
            ],
          },
          {
            type: "tip",
            data: "Compare hypothetical annual review and threshold rules under the same assumptions. Five-percent drift is an example setting, not a universally appropriate rebalancing trigger.",
          },
        ],
      },
      {
        title: "Balancing Stocks, ETFs & Crypto",
        content: [
          {
            type: "highlight",
            data: "Instrument labels do not guarantee stability, growth or profit. Compare holdings, concentration and hypothetical price shocks.",
          },
          {
            type: "text",
            data: "Different exposures can behave differently, but mixing them does not guarantee optimal returns. Inspect actual holdings and overlapping risks in a virtual example.",
          },
          {
            type: "heading",
            data: "ETFs: Your Foundation",
          },
          {
            type: "text",
            data: "There is no universal ETF weight. A fund's objective, underlying holdings, leverage and concentration determine its exposure.",
          },
          {
            type: "list",
            data: [
              "SPY: S&P 500 tracker (broad US market)",
              "QQQ: Tech-heavy NASDAQ tracker",
              "VTI: Total US market",
              "VXUS: International exposure",
              "Lower fees than mutual funds",
            ],
          },
          {
            type: "example",
            data: "Illustrative $100,000 portfolio: $60,000 in broad-market ETFs would represent a 60% foundation. ETF diversification depends on the funds' actual holdings and overlap.",
          },
          {
            type: "heading",
            data: "Individual Stocks: Your Growth Engine",
          },
          {
            type: "text",
            data: "There is no universal individual-stock weight. Compare company exposures and concentration as a practice exercise:",
          },
          {
            type: "list",
            data: [
              "Blue chips: AAPL, MSFT, GOOGL (stability + growth)",
              "Growth stocks: TSLA, NVDA (higher risk, higher reward)",
              "Dividend payers: JNJ, PG (income generation)",
              "The number of positions does not by itself measure diversification",
              "Focus on companies with competitive advantages",
            ],
          },
          {
            type: "stat",
            value: "Variable",
            label: "Crypto Weight Is an Assumption",
            data: "Crypto is exciting but volatile. Limit exposure to what you can afford to lose completely",
          },
          {
            type: "heading",
            data: "Cryptocurrency: Your High-Risk Bet",
          },
          {
            type: "text",
            data: "A crypto allocation has substantial loss risk and no universal maximum. A practice comparison can examine different hypothetical weights:",
          },
          {
            type: "list",
            data: [
              "Bitcoin: Digital gold, most established",
              "Ethereum: Smart contract platform leader",
              "Altcoins: Higher risk, higher reward potential",
              "Only invest what you can lose 100%",
              "Never FOMO into crypto during mania phases",
            ],
          },
          {
            type: "tip",
            data: "A normalized hypothetical example is 60% ETFs, 30% individual stocks and 10% crypto, totalling 100%. These arbitrary weights illustrate accounting only; neither stability nor higher returns is assured.",
          },
        ],
      },
      {
        title: "Sector Diversification",
        content: [
          {
            type: "quote",
            data: "Diversification is protection against ignorance. It makes little sense if you know what you are doing.",
            author: "Warren Buffett",
          },
          {
            type: "text",
            data: "Different sectors perform well in different economic conditions. Spread across sectors to capture opportunities and reduce risk from sector-specific crashes.",
          },
          {
            type: "heading",
            data: "The 11 Market Sectors",
          },
          {
            type: "list",
            data: [
              "Technology: Growth and innovation (AAPL, MSFT, NVDA)",
              "Healthcare: Defensive, always needed (JNJ, UNH, PFE)",
              "Finance: Economic growth proxy (JPM, V, MA)",
              "Energy: Commodity exposure (XOM, CVX)",
              "Consumer Discretionary: Economic sentiment (AMZN, TSLA)",
              "Consumer Staples: Recession-resistant (PG, KO, WMT)",
              "Industrials: Manufacturing and infrastructure (BA, CAT)",
              "Materials: Raw materials and chemicals",
              "Utilities: Stable dividends, low growth",
              "Real Estate: Property and REITs",
              "Communication: Media and telecom (META, GOOGL)",
            ],
          },
          {
            type: "highlight",
            data: "Compare several hypothetical sector weights using the same prices and period. No single concentration limit is suitable for everyone, and diversification does not prevent losses.",
          },
          {
            type: "heading",
            data: "Cyclical vs Defensive Sectors",
          },
          {
            type: "text",
            data: "Understand sector behavior in different economic phases:",
          },
          {
            type: "example",
            data: "Bull Market: Load up on cyclicals like tech, consumer discretionary, finance. These outperform when economy is strong.",
          },
          {
            type: "example",
            data: "Bear Market: Rotate to defensives like healthcare, utilities, consumer staples. These hold up when economy weakens.",
          },
          {
            type: "tip",
            data: "Hypothetical weights of 40% technology, 30% finance, 20% healthcare and 10% energy total 100%. Compare other weights under the same price shocks; this arithmetic does not promise growth or downside protection.",
          },
        ],
      },
      {
        title: "Rebalancing Your Portfolio",
        content: [
          {
            type: "highlight",
            data: "Rebalancing is the only strategy that forces you to sell high and buy low systematically. It's discipline automated.",
          },
          {
            type: "text",
            data: "Markets move, and so should your portfolio. Rebalancing maintains your target allocation and forces you to buy low and sell high - the secret to long-term wealth.",
          },
          {
            type: "heading",
            data: "Why Rebalance?",
          },
          {
            type: "text",
            data: "Without rebalancing, your portfolio drifts from your target allocation. Winners grow too large, increasing risk:",
          },
          {
            type: "example",
            data: "You start with 60% stocks, 40% bonds. Stocks surge and now you're 80% stocks. Your risk just increased dramatically without you realizing it!",
          },
          {
            type: "list",
            data: [
              "Maintains your target risk profile",
              "Forces selling winners (locks in gains)",
              "Forces buying losers (buys dips)",
              "Removes emotional decision-making",
              "Can restore a portfolio to its intended risk mix; return effects depend on market path, costs, and the chosen rule",
            ],
          },
          {
            type: "heading",
            data: "When to Rebalance",
          },
          {
            type: "text",
            data: "Choose a rebalancing strategy that fits your style:",
          },
          {
            type: "list",
            data: [
              "Calendar-based: Quarterly or annually on set date",
              "Threshold-based: When allocation drifts 5%+ from target",
              "Hybrid: Check quarterly, rebalance if drift exceeds 5%",
              "Tax-loss harvest while rebalancing",
              "Use new contributions to rebalance (avoids selling)",
            ],
          },
          {
            type: "stat",
            value: "Varies",
            label: "Return Effect of Rebalancing",
            data: "Rebalancing is primarily a risk-control process. Its effect on returns varies by market path, trading costs, taxes, and the chosen thresholds.",
          },
          {
            type: "tip",
            data: "Five-percent drift and 25% concentration are example thresholds to compare with other rules. Record turnover and costs; no threshold guarantees risk control or improved returns.",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What is the primary benefit of asset allocation?",
        options: [
          "Guarantees profits",
          "Determines long-term returns and risk",
          "Eliminates all losses",
          "Increases trading frequency",
        ],
        correctAnswer: 1,
        explanation: "Allocation changes exposure and risk. Its effect on returns depends on holdings, the market path and costs.",
      },
      {
        question: "Which is an example of a rebalancing rule rather than a universal requirement?",
        options: ["Daily", "Weekly", "Quarterly or when allocation drifts significantly", "Never"],
        correctAnswer: 2,
        explanation: "A calendar or drift threshold is one possible practice rule. Its effect depends on costs and the market path; no frequency is universally best.",
      },
    ],
  },
  {
    id: 5,
    title: "Setting Trading Goals",
    category: "Basics",
    description: "Define clear objectives and develop a trading plan that works for you.",
    subtopics: [
      {
        title: "Short-term vs Long-term Strategies",
        content: [
          {
            type: "image",
            data: "/src/assets/lesson-goals-roadmap.jpg",
            alt: "Trading goals roadmap with milestones",
            caption: "Chart your path to trading success with clear, achievable goals",
          },
          {
            type: "quote",
            data: "The stock market is a device for transferring money from the impatient to the patient.",
            author: "Warren Buffett",
          },
          {
            type: "text",
            data: "Your trading timeline dramatically affects your strategy, risk tolerance, and daily commitment. Choose what fits your lifestyle - not what looks exciting on social media.",
          },
          {
            type: "stat",
            value: "Uncertain",
            label: "No Universal Day-Trader Loss Rate",
            data: "Any study percentage needs its market, population, period and definition of loss. Simulator results do not establish a general success rate.",
          },
          {
            type: "heading",
            data: "Short-term Trading (Days to Weeks)",
          },
          {
            type: "text",
            data: "Active trading requires skill, discipline, and significant time commitment:",
          },
          {
            type: "list",
            data: [
              "Day Trading: In and out same day, extremely high intensity",
              "Swing Trading: Hold 2-7 days, medium intensity",
              "Requires constant monitoring and quick decisions",
              "Higher transaction costs from frequent trading",
              "Stressful - emotional discipline crucial",
              "Can generate consistent income IF done well (rare)",
            ],
          },
          {
            type: "example",
            data: "In a hypothetical journal, Sarah records time spent, trade frequency, realized gains and losses and costs. The break-even win rate depends on those gain/loss and cost amounts rather than a universal 55% threshold.",
          },
          {
            type: "heading",
            data: "Long-term Investing (Months to Years)",
          },
          {
            type: "text",
            data: "Patient investing lets time and compound growth work for you:",
          },
          {
            type: "list",
            data: [
              "Less stressful, minimal time commitment",
              "Lower transaction costs (fewer trades)",
              "Ride out short-term volatility without panic",
              "Compound growth works its magic over time",
              "Better tax treatment (long-term capital gains)",
              "Proven to beat most active traders",
            ],
          },
          {
            type: "example",
            data: "Investor Mike buys quality stocks and holds for years. He checks his portfolio monthly, pays less in fees, and lets compound growth build wealth while he focuses on his career.",
          },
          {
            type: "highlight",
            data: "Be honest with yourself: Do you have 8+ hours daily to dedicate to trading? Can you handle the stress? If not, long-term investing is your path to wealth.",
          },
          {
            type: "tip",
            data: "Compare holding periods in a simulator and record the time, costs and assumptions each requires. Six months of selected results does not establish readiness for real-money trading or suitability for a trading style.",
          },
        ],
      },
      {
        "title": "Return Assumptions and Practice Goals",
        "content": [
          {
            "type": "text",
            "data": "A practice lesson cannot establish a realistic monthly return from a label such as beginner, intermediate or professional. Outcomes depend on the strategy, exposure, market conditions and costs. A positive practice result is not evidence that the same result can be repeated with real money. Use explicit assumptions for calculations instead of treating a return target as an entitlement."
          },
          {
            "type": "heading",
            "data": "Separate arithmetic from expectations"
          },
          {
            "type": "list",
            "data": [
              "State the period: a monthly rate and an annual rate are different inputs.",
              "State whether gains are reinvested and whether deposits or withdrawals occur.",
              "Identify which costs the example includes and which it leaves out.",
              "A comparison with a fund or index needs a defined period, benchmark and method; no fund ranking is established here."
            ]
          },
          {
            "type": "example",
            "data": "Hypothetical arithmetic: start with $100, gain 10% in month one, then 10% on the new balance in month two. With reinvestment and no costs or cash flows, the balances are $110 and $121. The two-month gain is 21%, not 20%. The assumed gains are inputs, not forecasts."
          },
          {
            "type": "highlight",
            "data": "If a hypothetical 10% gain repeated every month for twelve months, (1.10^12 − 1) × 100 gives about 213.8% annual growth before costs. This shows the compounding implied by the assumption; it does not make such a result typical or achievable."
          },
          {
            "type": "heading",
            "data": "Losses compound too"
          },
          {
            "type": "example",
            "data": "A hypothetical $100 balance that falls 10% becomes $90. A subsequent 10% gain brings it to $99, not back to $100. Recovering from $90 to $100 requires a gain of about 11.1%. The order and size of gains and losses matter when reviewing a record."
          },
          {
            "type": "heading",
            "data": "Use reviewable practice goals"
          },
          {
            "type": "list",
            "data": [
              "Record the reason for each practice decision before checking its outcome.",
              "Compare the intended position size with the position actually entered.",
              "Review losses as well as gains, and identify missing information.",
              "Track costs and cash flows separately from market gains.",
              "Following a plan makes a decision easier to evaluate; it does not guarantee profit."
            ]
          },
          {
            "type": "tip",
            "data": "Choose a review task you can verify, such as checking whether each journal entry contains its original reasoning. Avoid requiring yourself to make a fixed number of trades or a fixed profit merely to meet a practice goal. Record uncertainty when the evidence is too limited to draw a conclusion."
          }
        ]
      },
      {
        title: "Creating a Trading Journal",
        content: [
          {
            type: "highlight",
            data: "Your trading journal is your most powerful tool. It transforms random trades into a systematic, improvable strategy.",
          },
          {
            type: "text",
            data: "A trading journal is your roadmap to improvement. It's the difference between gambling and trading systematically. Without it, you're flying blind.",
          },
          {
            type: "heading",
            data: "What to Track (The Essentials)",
          },
          {
            type: "list",
            data: [
              "Entry price, exit price, and position size",
              "Date and time (market conditions matter)",
              "Reason for entry: What was your thesis?",
              "Screenshots of charts before and after",
              "Emotions: Fearful? Confident? Greedy? Revenge trading?",
              "Result: Win/loss and percentage",
              "What you'd do differently next time",
            ],
          },
          {
            type: "example",
            data: "Entry: AAPL at $180 on 12/1, 50 shares. Reason: Bounced off 50-day MA with high volume. Felt: Confident, followed my rules. Exit: $185 on 12/5. Win: +$250 (2.8%). Lesson: Patience paid off, let winners run worked.",
          },
          {
            type: "heading",
            data: "Weekly Review Process",
          },
          {
            type: "text",
            data: "Every Sunday, review your journal to identify patterns:",
          },
          {
            type: "list",
            data: [
              "Which setups had highest win rate?",
              "When did you break your rules? Why?",
              "Were losses from bad luck or bad process?",
              "What emotional patterns emerge?",
              "Are you improving week over week?",
            ],
          },
          {
            type: "stat",
            value: "Record and review",
            label: "Journaling Purpose",
            data: "A journal preserves decisions and assumptions for review. No measured profitability multiplier is established here.",
          },
          {
            type: "tip",
            data: "Use a spreadsheet or specialized software like TraderSync or Edgewonk. Include photos of chart setups. Review it before each trading session to remember lessons learned.",
          },
        ],
      },
      {
        title: "Evaluating Your Performance",
        content: [
          {
            type: "quote",
            data: "In the short run, the market is a voting machine but in the long run, it is a weighing machine.",
            author: "Benjamin Graham",
          },
          {
            type: "text",
            data: "If realized wins are 3R and losses 1R, 40% wins give 0.6R gross expectancy per trade. With realized 1R wins and losses, 70% wins give 0.4R. These fixed inputs exclude costs and do not establish which real strategy is better.",
          },
          {
            type: "heading",
            data: "Key Performance Metrics",
          },
          {
            type: "list",
            data: [
              "Total Return: Overall profit/loss percentage over time",
              "Win Rate: Share of closed trades with positive realized net results; no universal target",
              "Average Win vs Average Loss: Measured realized amounts; no universal target",
              "Max Drawdown: Largest observed peak-to-trough decline in a specified equity series",
              "Sharpe Ratio: Risk-adjusted returns (higher is better)",
              "Profit Factor: Gross profit ÷ absolute gross loss over the stated sample; undefined when gross loss is zero",
            ],
          },
          {
            type: "example",
            data: "Trader A: 80% wins averaging $100 and 20% losses averaging $400 gives gross profit factor 1.0 before costs (80×$100 ÷ 20×$400 in a 100-trade illustration). Trader B: 40% wins averaging $300 and 60% losses averaging $100 gives profit factor 2.0. Win rate alone does not determine profitability.",
          },
          {
            type: "highlight",
            data: "Review the measured drawdown against the assumptions and observation period. A 20% threshold can be a chosen practice setting; it does not universally diagnose a broken strategy.",
          },
          {
            type: "heading",
            data: "The Monthly Review Checklist",
          },
          {
            type: "text",
            data: "Every month, evaluate these questions honestly:",
          },
          {
            type: "list",
            data: [
              "Am I following my trading rules consistently?",
              "Did actual losses stay within the risk limits chosen for this simulation?",
              "How did planned risk/reward compare with the actual outcomes?",
              "Am I trading too much (overtrading)?",
              "Am I trading too little (missing opportunities)?",
              "What was my biggest mistake this month?",
              "What did I do really well?",
            ],
          },
          {
            type: "tip",
            data: "A performance dashboard can track total return, win rate, profit factor and maximum drawdown over time. Compare changes across periods, but do not treat a single metric or fixed time threshold as proof that a strategy is valid or invalid.",
          },
          {
            type: "stat",
            value: "Gross profit ÷ gross loss",
            label: "Profit Factor Definition",
            data: "Profit factor compares gross profits with the absolute value of gross losses over the measured sample. A value above 1 means gross profits exceeded gross losses in that sample; it does not by itself prove a repeatable edge.",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "In the hypothetical example, what does $100 become after two consecutive 10% gains with no costs or cash flows?",
        options: ["$100", "$110", "$121", "$120"],
        correctAnswer: 2,
        explanation: "$100 × 1.10 × 1.10 = $121. The assumed gains illustrate compounding; they are not a forecast.",
      },
      {
        question: "What is the most important reason to keep a trading journal?",
        options: [
          "To brag about wins",
          "To identify patterns and improve systematically",
          "Required by law",
          "To calculate taxes",
        ],
        correctAnswer: 1,
        explanation: "A trading journal helps you identify what works and what doesn't, transforming you from random trader to systematic trader.",
      },
    ],
  },
  {
    id: 6,
    title: "Market Trends & Patterns",
    category: "Analysis",
    description: "Identify market trends and learn how to trade with momentum.",
    subtopics: [
      {
        title: "Bull Markets vs Bear Markets",
        content: [
          {
            type: "image",
            data: "/src/assets/lesson-market-trends-arrows.jpg",
            alt: "Market trend analysis with directional arrows",
            caption: "Learn to identify and ride market trends for maximum profit",
          },
          {
            type: "quote",
            data: "Be fearful when others are greedy. Be greedy when others are fearful.",
            author: "Warren Buffett",
          },
          {
            type: "text",
            data: "Markets move in cycles between bull and bear markets. Understanding which phase you're in completely changes your strategy - what works in bulls destroys accounts in bears.",
          },
          {
            type: "stat",
            value: "Specify the sample",
            label: "Comparing Market Regimes",
            data: "Regime durations depend on the index, date range and definition. This lesson does not establish a universal bull-to-bear duration ratio.",
          },
          {
            type: "heading",
            data: "Bull Markets (Rising Prices)",
          },
          {
            type: "text",
            data: "Bull markets are characterized by optimism, rising prices, and expanding valuations:",
          },
          {
            type: "list",
            data: [
              "Optimism and confidence dominate psychology",
              "'Buy the dip' strategy works consistently",
              "More stocks rise than fall (breadth is positive)",
              "Long positions have systematic edge",
              "Duration depends on the market, dates and definition used",
              "Corrections (10% drops) are buying opportunities",
            ],
          },
          {
            type: "example",
            data: "The 2009-2020 bull market lasted 11 years. Every significant dip recovered to new highs. Buyers who stayed calm and bought weakness accumulated wealth.",
          },
          {
            type: "heading",
            data: "Bear Markets (Falling Prices)",
          },
          {
            type: "text",
            data: "Bear markets are defined by fear, falling prices, and contracting valuations:",
          },
          {
            type: "list",
            data: [
              "Fear and pessimism dominate psychology",
              "Rally attempts fail quickly ('bear market rallies')",
              "More stocks fall than rise (negative breadth)",
              "Cash and defensive positions preferred",
              "Duration varies; specify the market and observation period",
              "A 20% decline is a common convention, not a universal official rule",
            ],
          },
          {
            type: "example",
            data: "For a historical comparison, identify the index, start and end dates and whether returns include dividends. Review rallies and declines without assuming every participant had the same entry, exit or result.",
          },
          {
            type: "highlight",
            data: "In bull markets, optimism is rewarded. In bear markets, optimism is punished. Adapt your strategy or get destroyed by market conditions.",
          },
          {
            type: "tip",
            data: "Use the 200-day moving average as your market compass: Above = bull market bias (buy dips). Below = bear market bias (cash and caution). When price crosses, the market may be transitioning.",
          },
        ],
      },
      {
        title: "Identifying Trend Reversals",
        content: [
          {
            type: "highlight",
            data: "The biggest money is made at market turning points. Learn to spot reversals early and position yourself ahead of the crowd.",
          },
          {
            type: "text",
            data: "The best profits come from catching trend changes early. Learn to spot when momentum is shifting - these inflection points offer asymmetric risk-reward.",
          },
          {
            type: "heading",
            data: "Top 5 Reversal Signals",
          },
          {
            type: "list",
            data: [
              "Divergence: Price makes new high but RSI/MACD doesn't (very powerful)",
              "Support/Resistance breaks: Key levels fail after multiple tests",
              "Moving average crossovers: Death cross (bearish), Golden cross (bullish)",
              "Volume spikes on reversals: Capitulation or euphoria",
              "Candlestick reversal patterns: Doji, hammer, shooting star at extremes",
            ],
          },
          {
            type: "example",
            data: "For a historical BTC example, identify the exchange, interval, dates and RSI calculation before comparing price and indicator peaks. A selected reversal after a divergence does not establish predictive accuracy.",
          },
          {
            type: "heading",
            data: "Divergence: The Holy Grail Signal",
          },
          {
            type: "text",
            data: "When price and momentum indicators disagree, momentum is usually right:",
          },
          {
            type: "list",
            data: [
              "Bullish divergence: Price makes lower low, RSI makes higher low",
              "Bearish divergence: Price makes higher high, RSI makes lower high",
              "Works on RSI, MACD, and momentum oscillators",
              "Potentially more informative when it aligns with other context such as trend and support/resistance",
              "Divergence can fail or persist for a long time, so treat it as context rather than a prediction",
            ],
          },
          {
            type: "tip",
            data: "Never try to catch exact tops or bottoms. Wait for confirmation: Wait for trend line break + volume surge + divergence signal. Missing first 10% of move is fine - catching reversal early beats catching falling knife!",
          },
        ],
      },
      {
        title: "Volume Analysis",
        content: [
          {
            type: "quote",
            data: "Volume is the fuel that drives the market engine. Without fuel, price moves nowhere.",
            author: "Trading Wisdom",
          },
          {
            type: "text",
            data: "Volume confirms price movements. High volume = conviction and strength. Low volume = weak move likely to reverse. Always check volume before entering trades!",
          },
          {
            type: "heading",
            data: "The Volume-Price Relationship",
          },
          {
            type: "text",
            data: "Volume tells you if a price move is real or fake:",
          },
          {
            type: "list",
            data: [
              "Rising prices + rising volume = Strong uptrend (healthy)",
              "Rising prices + falling volume = Weak uptrend (distribution, reversal coming)",
              "Falling prices + rising volume = Strong downtrend (capitulation)",
              "Falling prices + falling volume = Weak downtrend (accumulation possible)",
            ],
          },
          {
            type: "example",
            data: "Compare a price break with volume three times a chosen historical average and one with below-average volume. Both can continue or reverse; these observations do not supply a success probability.",
          },
          {
            type: "stat",
            value: "Relative volume",
            label: "A Historical Comparison",
            data: "State the averaging window when describing a volume multiple. Volume alone does not identify institutional buyers or validate a breakout.",
          },
          {
            type: "heading",
            data: "Volume Precedes Price",
          },
          {
            type: "text",
            data: "Smart money accumulates before big moves. Watch for volume clues:",
          },
          {
            type: "list",
            data: [
              "Volume spike without price movement = accumulation/distribution",
              "Rising volume on down days = sellers gaining control",
              "Rising volume on up days = buyers gaining control",
              "Volume dries up at tops (distribution complete)",
              "Volume spikes at bottoms (capitulation, wash-out)",
            ],
          },
          {
            type: "highlight",
            data: "Compare price and volume observations over a defined sample. There is no substantiated universal 70% failure rate here, and high volume does not guarantee a continuing breakout.",
          },
          {
            type: "tip",
            data: "Compare volume with a stated historical average and record subsequent outcomes, including reversals. A two-times threshold is a chosen worksheet setting, not a verified signal or a reason to act quickly.",
          },
        ],
      },
      {
        title: "Market Sentiment Indicators",
        content: [
          {
            type: "quote",
            data: "The time to buy is when there's blood in the streets, even if the blood is your own.",
            author: "Baron Rothschild",
          },
          {
            type: "text",
            data: "Markets are driven by two emotions: fear and greed. Sentiment indicators help you gauge crowd psychology - and profit from extremes by doing the opposite.",
          },
          {
            type: "heading",
            data: "The VIX: Wall Street's Fear Gauge",
          },
          {
            type: "text",
            data: "The Volatility Index (VIX) measures market fear and uncertainty:",
          },
          {
            type: "list",
            data: [
              "VIX below 15: Complacency, low fear (market tops often form here)",
              "VIX 15-25: Normal, moderate volatility",
              "VIX 25-35: Elevated fear, increased volatility",
              "VIX above 35: Extreme fear, panic (often marks bottoms)",
              "When VIX spikes, markets usually bottom soon after",
            ],
          },
          {
            type: "example",
            data: "A historical volatility spike describes its own sample, not an instruction to buy. Any return comparison needs specified assets, entry and exit dates and costs; a selected recovery does not show that buying during fear will work again.",
          },
          {
            type: "heading",
            data: "Put/Call Ratio: Options Sentiment",
          },
          {
            type: "text",
            data: "Ratio of put options (bearish bets) to call options (bullish bets):",
          },
          {
            type: "list",
            data: [
              "Ratio above 1.0: More puts than calls = extreme bearishness (contrarian bullish)",
              "Ratio below 0.6: More calls than puts = extreme bullishness (contrarian bearish)",
              "Extremes signal reversals (crowd is usually wrong at extremes)",
              "Best used as contrarian indicator",
            ],
          },
          {
            type: "stat",
            value: "Not established",
            label: "No Universal Contrarian Success Rate",
            data: "A sentiment extreme does not establish that retail traders are wrong or that an opposing trade will profit. Define the sample and test alternative outcomes.",
          },
          {
            type: "heading",
            data: "Sentiment Surveys & Social Media",
          },
          {
            type: "text",
            data: "Watch what the crowd is saying - then often do the opposite:",
          },
          {
            type: "list",
            data: [
              "When everyone's bullish: Be cautious, take profits",
              "When everyone's bearish: Look for buying opportunities",
              "AAII Sentiment Survey tracks retail investor mood",
              "Social media euphoria often marks tops",
              "Fear headlines often mark bottoms",
            ],
          },
          {
            type: "highlight",
            data: "Be greedy when others are fearful. Be fearful when others are greedy. The crowd is right during trends but wrong at turning points.",
          },
          {
            type: "tip",
            data: "A practice checklist can record volatility, put/call observations and sentiment sources. Three signals are not an instruction to buy or sell; extremes can persist, and opposite positions can lose.",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What characterizes a bull market?",
        options: [
          "Falling prices and pessimism",
          "Rising prices and optimism",
          "Sideways movement",
          "High volatility only",
        ],
        correctAnswer: 1,
        explanation: "Bull markets are characterized by rising prices, investor optimism, and confidence in economic growth.",
      },
      {
        question: "What does high volume on a price breakout indicate?",
        options: [
          "The move is weak",
          "The move has strong conviction and is likely to continue",
          "Nothing important",
          "Time to exit immediately",
        ],
        correctAnswer: 1,
        explanation: "High volume confirms price moves. When breakouts occur with high volume, it shows strong conviction and increases the likelihood of continuation.",
      },
    ],
  },
];
