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
            data: "/src/assets/lesson-stocks-basics.jpg",
            alt: "Understanding the basics of stock trading",
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
          {
            type: "quote",
            data: "Price is what you pay. Value is what you get. Control your entry, control your destiny.",
            author: "Trading Wisdom",
          },
          {
            type: "text",
            data: "One of the most important decisions you'll make when trading is choosing the right order type. The two main types are market orders and limit orders, and each has specific uses.",
          },
          {
            type: "heading",
            data: "Market Orders: Buy/Sell Now",
          },
          {
            type: "text",
            data: "A market order executes immediately at the current market price. It's the fastest way to enter or exit a trade.",
          },
          {
            type: "list",
            data: [
              "Pros: Executes instantly, guaranteed to fill",
              "Cons: Price not guaranteed (can slip in fast markets)",
              "Best for: Liquid stocks, when speed matters more than price",
              "Example: You want to buy Tesla RIGHT NOW at whatever price",
            ],
          },
          {
            type: "example",
            data: "You see Tesla at $200 and place a market order to buy 10 shares. By the time it executes (milliseconds later), the price might be $200.50 or $199.50. You're guaranteed the shares but not the exact price.",
          },
          {
            type: "heading",
            data: "Limit Orders: Set Your Price",
          },
          {
            type: "text",
            data: "A limit order only executes at your specified price or better. You have complete control over the price you pay.",
          },
          {
            type: "highlight",
            data: "Limit orders are your shield against volatile markets - you define the maximum you'll pay, and the market comes to you.",
          },
          {
            type: "list",
            data: [
              "Pros: Price control, no surprises",
              "Cons: May not fill if price doesn't reach your limit",
              "Best for: Patient traders, volatile markets, large orders",
              "Example: Only buy if price drops to $195 or lower",
            ],
          },
          {
            type: "stat",
            value: "73%",
            label: "Of Professional Traders Use Limit Orders",
            data: "Most experienced traders prefer price control over immediate execution",
          },
          {
            type: "tip",
            data: "Use limit orders for most trades! They give you price protection and help you avoid overpaying in volatile markets. Only use market orders when you absolutely need to get in or out immediately.",
          },
          {
            type: "heading",
            data: "Advanced Order Types",
          },
          {
            type: "text",
            data: "Once you master market and limit orders, you can explore these:",
          },
          {
            type: "list",
            data: [
              "Stop-Loss Order: Automatically sells if price drops to a certain level",
              "Stop-Limit Order: Combines stop and limit order features",
              "Trailing Stop: Moves with the price to lock in profits",
              "Good-Til-Canceled (GTC): Order stays active until filled or canceled",
              "Day Order: Expires at end of trading day if not filled",
            ],
          },
          {
            type: "example",
            data: "You buy Apple at $180 and set a stop-loss at $170. If Apple drops to $170, your shares automatically sell, limiting your loss to $10 per share.",
          },
          {
            type: "heading",
            data: "Which Should You Use?",
          },
          {
            type: "text",
            data: "Here's a simple decision guide:",
          },
          {
            type: "list",
            data: [
              "Use MARKET orders: When trading very liquid stocks (AAPL, MSFT, SPY) and speed is critical",
              "Use LIMIT orders: For less liquid stocks, large trades, or when you want specific pricing",
              "Use STOP orders: To protect profits or limit losses automatically",
              "As a beginner: Start with limit orders to learn price control",
            ],
          },
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
        question: "What type of order guarantees immediate execution?",
        options: ["Limit Order", "Stop Order", "Market Order", "Day Order"],
        correctAnswer: 2,
        explanation: "Market orders execute immediately at the current market price. They guarantee execution but not the exact price.",
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
            data: "You have $10,000 to trade. If you put all $10,000 into one stock and it drops 50%, you now have $5,000. Even if your next trade doubles, you're still at $10,000 - back to where you started!",
          },
          {
            type: "heading",
            data: "The 2% Rule Explained",
          },
          {
            type: "text",
            data: "Never risk more than 2% of your total capital on any single trade. This gives you 50 chances to be wrong before you're out of money!",
          },
          {
            type: "list",
            data: [
              "$10,000 account = Risk maximum $200 per trade",
              "$50,000 account = Risk maximum $1,000 per trade",
              "$100,000 account = Risk maximum $2,000 per trade",
              "Conservative traders use 1% rule instead",
              "Aggressive traders might use 3%, but never more",
            ],
          },
          {
            type: "tip",
            data: "The 2% rule refers to how much you're willing to LOSE, not how much you invest. If you buy $2,000 worth of stock with a stop-loss that risks $200, you're following the 2% rule perfectly.",
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
            data: "Account: $10,000 | Risk per trade: 2% = $200 | Stock price: $100 | Stop-loss: $95 | Risk per share: $5 | Position size: $200 ÷ $5 = 40 shares. Buy 40 shares at $100 = $4,000 investment, but only $200 at risk!",
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
            data: "Even professional traders are wrong 40-50% of the time. The 2% rule ensures that losing streaks don't wipe you out:",
          },
          {
            type: "list",
            data: [
              "10 losses in a row = -20% (painful but recoverable)",
              "20 losses in a row = -33% (extremely unlikely)",
              "You can be wrong many times and still survive",
              "Small losses, big winners = profitable long-term",
              "Protects you from emotional decisions",
            ],
          },
        ],
      },
      {
        title: "Stop-Loss & Take-Profit Targets",
        content: [
          {
            type: "highlight",
            data: "A stop-loss is not a sign of defeat - it's a sign of discipline. It's your automated risk manager working 24/7.",
          },
          {
            type: "text",
            data: "Every trade needs two critical levels set before you enter: where you'll exit if you're wrong (stop-loss) and where you'll exit if you're right (take-profit). Without these, you're gambling.",
          },
          {
            type: "stat",
            value: "95%",
            label: "Of Successful Traders Use Stop-Losses",
            data: "The most consistent winners in trading never let losses run wild",
          },
          {
            type: "heading",
            data: "Stop-Loss Orders: Your Safety Net",
          },
          {
            type: "text",
            data: "A stop-loss is an automatic order that sells your position when the price drops to a specific level. It limits your loss on a trade.",
          },
          {
            type: "list",
            data: [
              "Set BEFORE you enter the trade, not after",
              "Based on technical levels, not emotions",
              "Prevents small losses from becoming big losses",
              "Removes emotion from the decision",
              "Non-negotiable for every trade",
            ],
          },
          {
            type: "example",
            data: "You buy Tesla at $200 with a stop-loss at $190. If Tesla drops to $190, you automatically sell. Maximum loss: $10 per share. Even if Tesla crashes to $150 overnight, you're out at $190.",
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
            data: "Place stops just beyond key levels, not exactly on them. If support is at $100, place your stop at $99.50. This prevents getting stopped out by brief price spikes.",
          },
          {
            type: "heading",
            data: "Take-Profit Targets: Lock In Gains",
          },
          {
            type: "text",
            data: "Take-profit orders automatically sell when you've reached your profit goal. They prevent you from getting greedy and giving back gains.",
          },
          {
            type: "list",
            data: [
              "Set at resistance levels",
              "Near previous highs",
              "Based on risk-reward ratio (we'll cover next)",
              "Can use multiple targets (scale out)",
              "Better to take some profit than watch it disappear",
            ],
          },
          {
            type: "example",
            data: "You buy at $200 with targets at $220 (sell 50%) and $240 (sell remaining 50%). If the stock hits $220, you lock in some profit. If it reverses, you've secured gains instead of hoping it goes higher.",
          },
          {
            type: "heading",
            data: "Trailing Stops: Lock In Profits Automatically",
          },
          {
            type: "text",
            data: "A trailing stop moves up with the price, locking in profits while giving the trade room to grow:",
          },
          {
            type: "list",
            data: [
              "Follows the price up automatically",
              "Never moves down (locks in gains)",
              "Set as percentage or dollar amount",
              "Great for trending markets",
              "Example: 10% trailing stop on winning trades",
            ],
          },
          {
            type: "example",
            data: "Buy at $100 with 10% trailing stop ($90). Price rises to $150, stop moves to $135. If price drops to $135, you sell with $35 profit per share locked in!",
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
            data: "The risk-reward ratio is the secret to profitable trading. You don't need to win 90% of trades - you just need your winners to be bigger than your losers.",
          },
          {
            type: "stat",
            value: "1:3",
            label: "Ideal Minimum Risk-Reward Ratio",
            data: "Risk $1 to make $3 - this ratio allows profitability even with a 30% win rate",
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
              "1:1 ratio requires 50% win rate to break even",
              "1:2 ratio requires 33% win rate to break even",
              "1:3 ratio requires 25% win rate to break even",
              "You can lose 70% of trades and still profit with 1:3!",
              "Focus on finding high-reward, low-risk setups",
            ],
          },
          {
            type: "example",
            data: "10 trades with 1:3 ratio, 30% win rate: 3 winners at $300 = $900 profit. 7 losers at $100 = $700 loss. Net profit: $200 with only 3 winners!",
          },
          {
            type: "tip",
            data: "Never take a trade with less than 1:2 risk-reward. Ideally, aim for 1:3 or better. If you can't identify a setup with favorable risk-reward, wait for a better opportunity.",
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
            data: "Entry: $50 | Stop: $48 | Target: $56 | Risk: $2 | Reward: $6 | Ratio: $6 ÷ $2 = 3:1. Excellent trade setup!",
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
            data: "For a $10,000 account, hold 5-8 positions maximum. Too few = too much risk. Too many = can't manage effectively. Find the sweet spot.",
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
            data: "A balanced approach for most traders:",
          },
          {
            type: "list",
            data: [
              "Core (60-70%): Safe ETFs like SPY, QQQ for steady growth",
              "Satellite (30-40%): Individual stocks for higher returns",
              "Core provides stability",
              "Satellites provide excitement and outperformance",
              "Adjust percentages based on risk tolerance",
            ],
          },
          {
            type: "example",
            data: "$10,000 account: $6,000 in SPY and QQQ ETFs (core). $4,000 spread across AAPL, TSLA, NVDA, MSFT (satellites). Safe base with growth potential.",
          },
          {
            type: "heading",
            data: "Crypto in Your Portfolio",
          },
          {
            type: "text",
            data: "Crypto is high-risk, high-reward. Allocate carefully:",
          },
          {
            type: "list",
            data: [
              "Beginners: 5-10% maximum in crypto",
              "Moderate: 10-20% if you understand the risks",
              "Aggressive: Up to 30% (not recommended)",
              "Split between BTC (safer) and ETH/alts (riskier)",
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
            data: "If one position grows to more than 25% of your portfolio, consider taking some profits and rebalancing. This locks in gains and reduces concentration risk.",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "According to the 2% rule, how much should you risk per trade on a $10,000 account?",
        options: ["$100", "$200", "$500", "$1,000"],
        correctAnswer: 1,
        explanation: "The 2% rule means you risk 2% of your total capital per trade. 2% of $10,000 = $200.",
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
        explanation: "A stop-loss automatically exits your position at a predetermined price to limit your losses if the trade goes against you.",
      },
      {
        question: "With a 1:3 risk-reward ratio, what minimum win rate do you need to be profitable?",
        options: ["50%", "40%", "33%", "25%"],
        correctAnswer: 3,
        explanation: "With a 1:3 ratio, you only need to win 25% of trades to break even. Anything above 25% becomes profitable!",
      },
      {
        question: "What percentage of your portfolio should you typically hold in cryptocurrency as a beginner?",
        options: ["50%", "30%", "5-10%", "90%"],
        correctAnswer: 2,
        explanation: "Beginners should limit crypto exposure to 5-10% due to its high volatility and risk. Only invest what you can afford to lose.",
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
            type: "quote",
            data: "The most important decision you'll make is not what to buy, but how much of each asset to own.",
            author: "Ray Dalio",
          },
          {
            type: "text",
            data: "Asset allocation is how you divide your money among different investment types. It's the single most important factor in long-term returns - more important than picking individual stocks.",
          },
          {
            type: "image",
            data: "/src/assets/lesson-portfolio-allocation.jpg",
            alt: "Portfolio allocation strategy visualization",
            caption: "Build your fortress - diversified allocation is your strongest defense",
          },
          {
            type: "stat",
            value: "90%",
            label: "Of Portfolio Returns Determined by Asset Allocation",
            data: "Research shows asset allocation explains 90% of a portfolio's performance variance - stock picking matters far less than most think",
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
            data: "Aggressive (Age 20-35): 80% stocks, 15% crypto, 5% bonds. You have time to recover from downturns and capture maximum growth.",
          },
          {
            type: "example",
            data: "Moderate (Age 35-55): 60% stocks, 30% bonds, 10% alternatives. Balanced between growth and stability as you build wealth.",
          },
          {
            type: "example",
            data: "Conservative (Age 55+): 40% stocks, 50% bonds, 10% cash. Preserve capital while generating income for retirement.",
          },
          {
            type: "highlight",
            data: "Your age and goals determine your allocation. Young investors can afford more risk. Older investors need more stability.",
          },
          {
            type: "heading",
            data: "The 100-Minus-Age Rule",
          },
          {
            type: "text",
            data: "A simple rule of thumb for stock allocation:",
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
            data: "Review your allocation annually, but don't chase performance. Stick to your plan and rebalance when allocations drift more than 5% from targets.",
          },
        ],
      },
      {
        title: "Balancing Stocks, ETFs & Crypto",
        content: [
          {
            type: "highlight",
            data: "Each asset class serves a different purpose - ETFs for stability, stocks for growth, crypto for moonshots. The magic is in the mix.",
          },
          {
            type: "text",
            data: "Each asset class serves a different purpose in your portfolio. Combine them strategically for optimal risk-adjusted returns without putting all your eggs in one basket.",
          },
          {
            type: "heading",
            data: "ETFs: Your Foundation",
          },
          {
            type: "text",
            data: "ETFs should form 50-70% of most portfolios. They provide instant diversification and reduce single-stock risk.",
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
            data: "$10,000 portfolio: $6,000 in SPY/QQQ gives you exposure to 500+ companies with two purchases. That's instant diversification!",
          },
          {
            type: "heading",
            data: "Individual Stocks: Your Growth Engine",
          },
          {
            type: "text",
            data: "Allocate 20-40% to individual stocks for potential outperformance. Pick quality companies you understand:",
          },
          {
            type: "list",
            data: [
              "Blue chips: AAPL, MSFT, GOOGL (stability + growth)",
              "Growth stocks: TSLA, NVDA (higher risk, higher reward)",
              "Dividend payers: JNJ, PG (income generation)",
              "Limit to 5-8 individual positions",
              "Focus on companies with competitive advantages",
            ],
          },
          {
            type: "stat",
            value: "5-15%",
            label: "Recommended Crypto Allocation Maximum",
            data: "Crypto is exciting but volatile. Limit exposure to what you can afford to lose completely",
          },
          {
            type: "heading",
            data: "Cryptocurrency: Your High-Risk Bet",
          },
          {
            type: "text",
            data: "Allocate 5-15% maximum to crypto. It's speculative but offers asymmetric upside:",
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
            data: "Use the core-satellite approach: 60-70% in ETFs (core), 20-30% in individual stocks (satellites), 5-15% in crypto (speculation). This balances stability with growth potential.",
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
            data: "Never put more than 30% of your portfolio in a single sector, no matter how hot it is. When tech crashed in 2022, diversified portfolios survived.",
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
            data: "Build a 'weather any storm' portfolio: 40% tech/growth, 30% finance/cyclicals, 20% healthcare/staples, 10% energy/materials. This captures growth while providing downside protection.",
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
              "Historically adds 0.5-1% annual return",
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
            value: "0.5-1%",
            label: "Additional Annual Return from Rebalancing",
            data: "Studies show disciplined rebalancing adds meaningful returns over time by systematically buying low and selling high",
          },
          {
            type: "tip",
            data: "Use the 5/25 rule: Rebalance when any position drifts 5% from target OR grows to 25%+ of portfolio. This captures both small drifts and concentration risk.",
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
        explanation: "Asset allocation is the most important factor in determining your long-term returns and overall portfolio risk.",
      },
      {
        question: "How often should you typically rebalance your portfolio?",
        options: ["Daily", "Weekly", "Quarterly or when allocation drifts significantly", "Never"],
        correctAnswer: 2,
        explanation: "Quarterly rebalancing or when your allocation drifts 5%+ from targets strikes a good balance between maintenance and transaction costs.",
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
            value: "95%",
            label: "Of Day Traders Lose Money Long-Term",
            data: "Academic studies show the vast majority of day traders underperform buy-and-hold strategies after costs",
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
            data: "Day trader Sarah monitors charts 8 hours daily, makes 20+ trades weekly, needs 55%+ win rate to overcome fees. One emotional mistake can wipe out weeks of profits.",
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
            data: "Start with long-term investing. Once you're consistently profitable for 6+ months, consider adding swing trading. Only attempt day trading if you've mastered swing trading and can commit full-time.",
          },
        ],
      },
      {
        title: "Setting Realistic Profit Targets",
        content: [
          {
            type: "quote",
            data: "Rule No. 1 is never lose money. Rule No. 2 is never forget Rule No. 1.",
            author: "Warren Buffett",
          },
          {
            type: "text",
            data: "Unrealistic expectations lead to overtrading, excessive risk, and blown accounts. Set achievable goals based on your strategy and skill level - not YouTube guru promises.",
          },
          {
            type: "heading",
            data: "Reality Check: What's Actually Possible",
          },
          {
            type: "list",
            data: [
              "Beginners: 5-10% monthly returns are EXCELLENT",
              "Intermediate: 10-15% monthly with experience (rare)",
              "Professionals: 15-25% monthly (extremely rare)",
              "S&P 500 average: ~10% annually (not monthly!)",
              "Warren Buffett career average: 20% annually",
            ],
          },
          {
            type: "stat",
            value: "20-30%",
            label: "Annual Returns That Beat 95% of Funds",
            data: "If you can consistently achieve 20-30% annual returns, you're outperforming virtually all professional money managers",
          },
          {
            type: "highlight",
            data: "A 10% monthly return = 214% annually. If it were easy, everyone would be rich. Set realistic targets or risk gambling your account away chasing impossible dreams.",
          },
          {
            type: "heading",
            data: "Focus on Process, Not Profits",
          },
          {
            type: "text",
            data: "Successful traders focus on executing their strategy consistently, not hitting specific profit targets:",
          },
          {
            type: "list",
            data: [
              "Goal: Execute 20 quality trades following my rules",
              "NOT: Make $5,000 this month at all costs",
              "Track win rate, risk-reward, and process adherence",
              "Profits are byproduct of good process",
              "Bad months happen - focus on executing correctly",
            ],
          },
          {
            type: "example",
            data: "Trader A targets $10,000 monthly, takes risky trades to hit goal, blows up account. Trader B focuses on quality setups only, makes $8,000 some months, $2,000 others, but compounds wealth steadily over years.",
          },
          {
            type: "tip",
            data: "Set three goals: Minimum (stay profitable), Target (realistic stretch), and Maximum (dream scenario). Hit minimum? Success. Hit target? Excellent month. Exceeded target? Take profits and tighten risk management.",
          },
        ],
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
            value: "3x",
            label: "Profitability Increase with Journaling",
            data: "Studies show traders who journal consistently are 3x more likely to be profitable than those who don't",
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
            data: "Winning percentage doesn't matter as much as you think. A 40% win rate with 1:3 risk-reward beats 70% win rate with 1:1. Evaluate holistically using multiple metrics.",
          },
          {
            type: "heading",
            data: "Key Performance Metrics",
          },
          {
            type: "list",
            data: [
              "Total Return: Overall profit/loss percentage over time",
              "Win Rate: Percentage of winning trades (aim for 45%+)",
              "Average Win vs Average Loss: Your edge (target 2:1 or better)",
              "Max Drawdown: Largest peak-to-valley decline (keep under 20%)",
              "Sharpe Ratio: Risk-adjusted returns (higher is better)",
              "Profit Factor: Gross profit ÷ gross loss (target 1.5+)",
            ],
          },
          {
            type: "example",
            data: "Trader A: 80% win rate, avg win $100, avg loss $400, profit factor 0.5 = LOSING. Trader B: 40% win rate, avg win $300, avg loss $100, profit factor 2.0 = WINNING. Quality over quantity!",
          },
          {
            type: "highlight",
            data: "Track your Maximum Drawdown religiously. If you drop more than 20% from peak equity, stop trading and reassess your strategy - something is broken.",
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
              "Are my losses controlled (2% rule)?",
              "Is my risk-reward ratio 1:2 or better?",
              "Am I trading too much (overtrading)?",
              "Am I trading too little (missing opportunities)?",
              "What was my biggest mistake this month?",
              "What did I do really well?",
            ],
          },
          {
            type: "tip",
            data: "Create a performance dashboard. Track total return, win rate, profit factor, and max drawdown monthly. If any metric degrades for 2+ months, pause trading and fix the issue before continuing.",
          },
          {
            type: "stat",
            value: "1.5+",
            label: "Target Profit Factor for Consistent Success",
            data: "A profit factor above 1.5 means you make $1.50 for every $1 lost - a strong edge that compounds over time",
          },
        ],
      },
    ],
    quiz: [
      {
        question: "What is a realistic monthly return target for beginner traders?",
        options: ["50-100%", "20-30%", "5-10%", "2-3%"],
        correctAnswer: 2,
        explanation: "5-10% monthly returns are excellent for beginners and actually beat most professional fund managers over time!",
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
            value: "4:1",
            label: "Historical Bull vs Bear Market Time Ratio",
            data: "Bull markets last ~4 years on average while bear markets last ~1 year. Time in the market beats timing the market.",
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
              "Average bull market lasts 3-4 years",
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
              "Average bear market lasts 6-12 months",
              "Official definition: 20%+ decline from highs",
            ],
          },
          {
            type: "example",
            data: "The 2022 bear market saw S&P 500 drop 25%. Every rally attempt failed. Traders who bought every dip lost money. Better strategy: cash position and patience.",
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
            data: "Bitcoin tops at $69k in Nov 2021. RSI shows lower highs while price makes new highs (bearish divergence). Two weeks later, brutal 50% crash begins. Divergence warned early!",
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
              "Most reliable at major support/resistance levels",
              "Don't fight divergence - it's usually right",
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
            data: "Stock breaks out above resistance on 3x average volume = Strong move, likely to continue. Same breakout on below-average volume = Fake breakout, likely to fail.",
          },
          {
            type: "stat",
            value: "2-3x",
            label: "Volume Spike Confirming Breakouts",
            data: "Legitimate breakouts typically show 2-3x higher than average volume - this confirms real institutional buying",
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
            data: "Never trust a breakout without volume confirmation. 70% of low-volume breakouts fail within days. Wait for volume surge to confirm the move is real.",
          },
          {
            type: "tip",
            data: "Add volume bars to your charts. Set an alert for volume 2x above 20-day average. These spikes often signal the start of major moves - both up and down. Act quickly when volume speaks.",
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
            data: "March 2020 COVID crash: VIX spiked to 80+ (extreme panic). Those who bought stocks during peak fear made 50-100%+ in following months. Fear = opportunity.",
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
            value: "80%",
            label: "Of Retail Traders Wrong at Market Extremes",
            data: "When retail sentiment hits extremes, the smart money does the opposite - and profits from the crowd's mistakes",
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
            data: "Create a sentiment checklist: VIX level, Put/Call ratio, headline sentiment, social media buzz. When 3+ indicators show extreme fear, start buying. When 3+ show extreme greed, start selling. Sentiment extremes don't last long!",
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
