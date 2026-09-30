// Unique SEO content for each asset - Anti-thin content blocks
import { Asset } from './types';
import { ASSETS } from './assets';

interface AssetFAQ {
  question: string;
  answer: string;
}

interface AssetStats {
  marketCap?: string;
  maxSupply?: string;
  assetClass?: string;
  sector?: string;
  primaryDriver?: string;
  correlation?: string;
  source?: string;
  consensus?: string;
  TPS?: string;
  avgDailyVolume?: string;
  pipValue?: string;
  benchmark?: string;
  units?: string;
  expenseRatio?: string;
}

// NEW: Executive Outlook for Google AI Overviews (50-60 words)
interface ExecutiveOutlook {
  summary: string;
  lastUpdated: string;
}

// NEW: Institutional Drivers with Bull/Bear scenarios
interface InstitutionalDrivers {
  bull: string;
  bear: string;
}

// Category intro text for SEO multiplier
export const CATEGORY_INTROS: Record<string, string> = {
  crypto: "Cryptocurrencies are decentralized digital assets known for 24/7 market cycles and high volatility.",
  stock: "Equities represent ownership in public companies and are driven by earnings, macro trends, and sector performance.",
  etf: "ETFs provide diversified exposure to baskets of securities, offering lower risk than individual stock picking.",
  forex: "Global currencies reflect macroeconomic health and geopolitical shifts, trading 24/5 across global markets.",
  commodity: "Commodities are raw materials and resources that reflect macroeconomic health and geopolitical shifts."
};

// Get category intro by asset type
export function getCategoryIntro(assetType: string): string {
  return CATEGORY_INTROS[assetType] || "Practice trading this asset class with virtual funds.";
}

interface AssetContent {
  whatIs: string; // Block A: What is [AssetName]?
  strategy: string; // Block B: Simulator Strategy
  category: string;
  keywords: string[];
  stats?: AssetStats; // Professional stats data
  executiveOutlook?: ExecutiveOutlook; // NEW: For AI Overviews
  institutionalDrivers?: InstitutionalDrivers; // NEW: Bull/Bear scenarios
  sectorPillar?: string; // NEW: Topic cluster linking
}

// FAQ data for Google PAA (People Also Ask) targeting
export const ASSET_FAQS: Record<string, AssetFAQ[]> = {
  btc: [
    { question: "How can I practice Bitcoin trading without placing a real-money order?", answer: "Use a virtual-money simulator such as TradeHQ. The $100,000 practice balance lets you explore order mechanics and price movement without a real-money transaction, although simulation does not reproduce every live-market cost or risk." },
    { question: "What does TradeHQ's Bitcoin practice simulator include?", answer: "TradeHQ offers a free BTC practice simulator with $100K virtual cash, simulated candlestick charts, and educational tools. Core simulator use does not require signup or a credit card." },
    { question: "How to practice Bitcoin trading in Colombo as a student?", answer: "Students in Sri Lanka can use TradeHQ's free simulator to practice BTC trading with virtual money. Learn chart reading and risk management before using real capital." },
    { question: "Can beginners use Bitcoin for trading practice?", answer: "Bitcoin can be used to practise order mechanics and volatility observation, but its price can move sharply. Treat support/resistance and other chart tools as descriptive practice concepts rather than reliable predictions." }
  ],
  eth: [
    { question: "How can Ethereum be studied in a trading simulator?", answer: "Use virtual trades to compare ETH price behavior with network metrics and with other crypto assets. Correlations and gas-fee relationships change over time, so record observations rather than treating them as fixed signals." },
    { question: "How does Ethereum differ from Bitcoin for trading practice?", answer: "Ethereum and Bitcoin have different network designs, issuance rules and application ecosystems. A simulator can be used to compare their volatility and co-movement without assuming that one narrative mechanically drives price." },
    { question: "Can students practice Ethereum trading for free?", answer: "TradeHQ provides virtual cash for ETH practice without a brokerage deposit. The exercise can cover order mechanics and volatility observation; it does not establish a profitable DeFi or trading pattern." },
    { question: "What Ethereum-specific metrics can I compare in a simulator?", answer: "Gas fees, network activity, DeFi TVL and the ETH/BTC ratio are examples of metrics you can observe alongside simulated price action. None is a guaranteed trading signal." }
  ],
  nvda: [
    { question: "How can NVIDIA be studied in a simulator?", answer: "Use NVDA as one example of a semiconductor company with AI-related exposure. Compare earnings periods, volatility and broad technology-market moves without assuming a breakout or indicator reading predicts the next move." },
    { question: "What can beginners learn by simulating NVIDIA trades?", answer: "NVDA can be used to study earnings gaps, semiconductor-cycle narratives and volatility. The exercise is to compare outcomes, not assume a trend will continue." },
    { question: "How can a student practise NVIDIA stock mechanics?", answer: "TradeHQ's virtual-money simulator can be used to explore NVDA order mechanics without opening a US brokerage account. Simulator outcomes do not reproduce every real-market execution cost, tax or liquidity condition." },
    { question: "What factors can affect NVIDIA stock?", answer: "Earnings, guidance, semiconductor demand, customer spending, competition, supply constraints and broader market conditions can all matter. Their importance changes over time, so no single catalyst should be treated as a guaranteed driver." }
  ],
  aapl: [
    { question: "What can Apple stock be used to practise?", answer: "AAPL can be used to study how a large, liquid stock behaves around earnings and product news. Reactions are not predictable, so compare multiple examples rather than treating an event as a signal." },
    { question: "How can I practise Apple stock trading without real money?", answer: "TradeHQ lets you simulate AAPL trades with $100K virtual cash. You can compare price behavior around product launches and earnings without treating 'buy the rumor, sell the news' as a rule." },
    { question: "What makes Apple stock move during earnings season?", answer: "iPhone revenue, Services growth, and guidance drive AAPL earnings moves. Practice reading pre-earnings positioning and post-earnings gap fills." },
    { question: "Can students in Sri Lanka practice US stock trading for free?", answer: "Yes. TradeHQ simulates US stocks including AAPL with virtual cash. No brokerage account, ID verification, or minimum deposit required." }
  ],
  tsla: [
    { question: "Why can Tesla be volatile in a trading simulator?", answer: "TSLA can react strongly to company news, delivery data and broader market conditions. In a simulator, that volatility can be used to study position sizing and decision-making without assuming one risk-control rule is universally correct." },
    { question: "How can a beginner practise with Tesla in TradeHQ?", answer: "Use virtual positions to compare how different position sizes and predefined exit assumptions change simulated drawdown. This is a practice exercise, not a real-money sizing recommendation." },
    { question: "What causes Tesla stock to gap up or down?", answer: "Elon Musk's statements, delivery numbers, FSD updates, and macro sentiment cause TSLA gaps. Practice gap-and-go and gap-fill strategies risk-free." },
    { question: "Can students use Tesla for simulator practice?", answer: "Yes. Because no real money is used, TSLA can be included in a simulation to observe volatility and decision-making. Simulated results do not establish that the asset is suitable for a real portfolio." }
  ],
  spy: [
    { question: "How does practising with SPY differ from an individual stock?", answer: "SPY tracks a broad US equity index, while an individual stock adds company-specific risk. Comparing both in a simulator can help learners observe those differences without prescribing which one they should use with real money." },
    { question: "How to practice paper trading the S&P 500 for free?", answer: "Use TradeHQ's free simulator to trade SPY with $100K virtual cash. Learn to read market breadth, volume patterns, and moving averages risk-free." },
    { question: "How can I compare index ETFs in a simulator?", answer: "One practice exercise is to compare SPY with a more technology-heavy ETF such as QQQ and record how their simulated returns and drawdowns differ across the same period." },
    { question: "Can I practice SPY options strategies in a simulator?", answer: "TradeHQ focuses on spot trading for SPY. Practice identifying entry/exit points, trend direction, and risk management — foundational skills for any strategy." }
  ],
  sol: [
    { question: "Is Solana trading harder than Bitcoin?", answer: "Solana is faster and often more volatile. Practice your 'entry and exit' speed in the simulator to account for Solana's aggressive price swings." },
    { question: "How can I practise Solana trading with virtual money?", answer: "TradeHQ offers SOL trading with $100K virtual cash. Practice fast-moving crypto trades and learn to handle high-volatility altcoin price action." },
    { question: "What drives Solana price movements?", answer: "Network activity, DeFi TVL, NFT minting volume, and ecosystem growth drive SOL. Practice correlating on-chain metrics with price action." },
    { question: "Is Solana suitable for beginner crypto traders?", answer: "SOL's volatility can be challenging but educational. Start with small virtual positions and use tight stop-losses to practice risk management." }
  ],
  gold: [
    { question: "How can gold behave during equity stress?", answer: "Gold is often discussed as a defensive asset, but its relationship with equities and the US dollar varies by period. Use the simulator to compare scenarios rather than assuming an inverse relationship." },
    { question: "How to practice gold trading for free as a student?", answer: "TradeHQ provides $100K virtual cash to trade gold (XAU). Students can learn safe-haven dynamics and inflation hedging strategies risk-free." },
    { question: "What factors can influence gold prices?", answer: "Real interest rates, US-dollar moves, central-bank demand and geopolitical conditions are commonly monitored alongside gold. Their effects can differ across periods, so they should be studied as context rather than fixed signals." },
    { question: "Can gold be used to practise macro analysis?", answer: "Gold can be used to compare how inflation expectations, rates, currencies and geopolitical events coincide with price changes. The relationships are not stable enough to treat one factor as a guaranteed direction signal." }
  ],
  amzn: [
    { question: "When can Amazon show unusual volatility?", answer: "AMZN can move around earnings and company-specific events such as major sales periods. A simulator can be used to compare those event windows without assuming a repeatable 'buy the rumor' outcome." },
    { question: "How to practice Amazon stock trading without a brokerage?", answer: "Use TradeHQ's free simulator — no brokerage account needed. Trade AMZN with $100K virtual cash and learn earnings-driven price patterns." },
    { question: "What drives Amazon stock price the most?", answer: "AWS cloud revenue, e-commerce growth, advertising income, and operating margins are key AMZN drivers. Practice reading these metrics before earnings." },
    { question: "Can students practice trading Amazon stock for free?", answer: "Yes. TradeHQ simulates AMZN with virtual capital. Students worldwide can learn to trade one of the world's largest companies without financial risk." }
  ],
  eurusd: [
    { question: "How do I learn Forex trading for free?", answer: "Use a $100,000 demo account to trade the EUR/USD pair. Focus on the overlap of the London and New York sessions for the most realistic practice." },
    { question: "What is the best free forex simulator for beginners?", answer: "TradeHQ offers EUR/USD trading with $100K virtual cash. Practice currency pair analysis, pip calculations, and session-based trading strategies." },
    { question: "How to practice forex trading without money in Sri Lanka?", answer: "TradeHQ is free for students in Sri Lanka and worldwide. Practice EUR/USD and GBP/USD with simulated charts — no deposit or signup required." },
    { question: "What moves EUR/USD the most?", answer: "ECB and Fed interest rate decisions, inflation data, employment reports, and trade balance shifts drive EUR/USD. Practice fundamental analysis with these catalysts." }
  ],
  gbpusd: [
    { question: "How can I practice GBP/USD forex trading for free?", answer: "TradeHQ provides $100K virtual cash to practice Cable (GBP/USD) trading. Focus on London session volatility and BOE vs Fed policy divergence." },
    { question: "How do trading sessions affect GBP/USD?", answer: "Liquidity and volatility can vary across London, New York and overlap periods, with daylight-saving changes affecting local clock times. Use the simulator to compare session behavior rather than treating one fixed time window as a recommendation." },
    { question: "What can beginners compare with GBP/USD?", answer: "GBP/USD can be compared with another major pair such as EUR/USD to observe differences in volatility and session behavior. Technical levels are subjective and should not be treated as guaranteed boundaries." },
    { question: "How to learn forex trading without money as a student?", answer: "Use TradeHQ's free forex simulator. Students can practice GBP/USD, EUR/USD, and more currency pairs with $100K demo capital — no signup required." }
  ],
  oil: [
    { question: "How to practice crude oil trading for free?", answer: "TradeHQ lets you trade WTI crude oil with $100K virtual cash. Practice around EIA inventory reports and OPEC+ meetings risk-free." },
    { question: "What factors drive crude oil prices?", answer: "OPEC+ production decisions, US inventory data, geopolitical tensions, and global demand forecasts drive oil. Practice correlating news with price action." },
    { question: "Is oil trading suitable for beginner traders?", answer: "Oil can be volatile but educational. Start with small virtual positions and learn to read EIA reports and OPEC announcements before scaling up." },
    { question: "How do geopolitical events affect oil prices?", answer: "Middle East tensions, sanctions, and shipping disruptions can spike oil prices. Practice identifying geopolitical catalysts and managing risk during news events." }
  ],
  msft: [
    { question: "How to practice Microsoft stock trading for free?", answer: "TradeHQ offers MSFT trading with $100K virtual cash. Practice position sizing with MSFT's steady trends before moving to higher-volatility tech stocks." },
    { question: "What drives Microsoft stock price?", answer: "Azure cloud growth, AI Copilot adoption, enterprise software renewals, and LinkedIn revenue drive MSFT. Practice reading these metrics pre-earnings." },
    { question: "What can learners practise with MSFT?", answer: "MSFT can be used to practise reading charts, comparing moving averages and observing earnings-related moves. Historical volatility can change, so the asset is not labelled 'ideal' for every learner." },
    { question: "Can I practice trading US tech stocks from Sri Lanka?", answer: "Yes. TradeHQ simulates US stocks including MSFT, AAPL, and NVDA. Students anywhere can practice free with $100K virtual cash." }
  ],
  googl: [
    { question: "How to practice trading Google stock for free?", answer: "Use TradeHQ to trade GOOGL with $100K virtual cash. Learn to identify breakout patterns around AI announcements and earnings reports." },
    { question: "What moves Alphabet stock price the most?", answer: "Search ad revenue, YouTube growth, Google Cloud performance, and AI product launches drive GOOGL. Practice correlating these with chart patterns." },
    { question: "What can learners study with GOOGL?", answer: "GOOGL can be used to mark consolidation ranges and compare how price reacted around earnings or product news. A breakout pattern does not guarantee continuation." },
    { question: "How to learn AI stock trading as a student?", answer: "Start with GOOGL and NVDA on TradeHQ. Practice identifying how AI product announcements create momentum trades and gap patterns." }
  ],
  meta: [
    { question: "How to practice META stock trading for free?", answer: "TradeHQ offers META trading with $100K virtual cash. Learn to correlate social media engagement metrics with price movements risk-free." },
    { question: "What drives Meta Platforms stock price?", answer: "Ad revenue growth, user engagement (Reels, Threads), AI ad targeting improvements, and Reality Labs spending drive META's price action." },
    { question: "Is META good for practicing earnings plays?", answer: "Yes — META has some of the most dramatic earnings reactions in tech. Practice identifying pre-earnings positioning and post-earnings gap strategies." },
    { question: "How to learn social media stock analysis?", answer: "Start with META on TradeHQ. Practice tracking Daily Active Users, ad revenue per user, and engagement metrics as price drivers." }
  ],
  xrp: [
    { question: "How to practice XRP trading for free?", answer: "TradeHQ provides $100K virtual cash to practice XRP trading. Learn how regulatory news and Ripple partnerships affect price action." },
    { question: "Why does XRP move on regulatory news?", answer: "XRP's price is sensitive to SEC rulings, Ripple partnerships, and cross-border payment adoption. Practice news-driven trading strategies risk-free." },
    { question: "Is XRP good for learning news-based trading?", answer: "Yes — XRP reacts sharply to legal and partnership news. Practice managing position size around uncertain news events without risking real money." },
    { question: "How to practice crypto trading in Colombo?", answer: "Use TradeHQ's free simulator. Students in Colombo can trade XRP, BTC, ETH and 30+ cryptos with $100K virtual cash — no signup needed." }
  ],
  bnb: [
    { question: "How to practice BNB trading for free?", answer: "Use TradeHQ to trade BNB with $100K virtual cash. Learn how exchange activity and token burns affect BNB's price patterns." },
    { question: "What drives BNB token price?", answer: "Binance exchange volume, quarterly BNB burns, BNB Chain DeFi activity, and exchange regulatory news drive BNB price movements." },
    { question: "Is BNB good for practicing exchange token analysis?", answer: "Yes — BNB teaches you how exchange tokens correlate with platform activity. Practice tracking volume trends and burn schedules as indicators." },
    { question: "How does BNB compare to BTC for trading practice?", answer: "BNB is more correlated with exchange-specific events while BTC tracks macro sentiment. Practice both to learn different types of catalysts." }
  ],
  qqq: [
    { question: "How to practice Nasdaq-100 ETF trading for free?", answer: "TradeHQ lets you trade QQQ with $100K virtual cash. Practice tech-focused index trading and learn sector rotation strategies risk-free." },
    { question: "What is the difference between SPY and QQQ for practice?", answer: "SPY tracks the broad S&P 500 while QQQ is tech-heavy (Nasdaq-100). Practice comparing both to learn how sector concentration affects returns." },
    { question: "Is QQQ good for beginners learning ETF trading?", answer: "Yes — QQQ provides concentrated tech exposure with high liquidity. Practice using the QQQ/SPY ratio as a risk-on/risk-off signal." },
    { question: "How to learn tech sector trading as a student?", answer: "Start with QQQ on TradeHQ. It gives you exposure to AAPL, MSFT, NVDA, and GOOGL in one instrument — perfect for learning tech cycles." }
  ]
};

// Get FAQs for an asset
export function getAssetFAQs(assetId: string): AssetFAQ[] {
  const handWritten = ASSET_FAQS[assetId];
  if (handWritten && handWritten.length > 0) return handWritten;
  return generateAssetFAQs(assetId);
}

// Programmatic FAQ generator — emits 5 unique, asset-tailored Q&A
// for any asset that lacks a hand-written ASSET_FAQS entry.
// Pulls asset name, symbol, type, sector and category context so the
// FAQ block is unique per page (not boilerplate) for FAQPage rich results.
export function generateAssetFAQs(assetId: string): AssetFAQ[] {
  const asset = ASSETS.find((a) => a.id === assetId);
  if (!asset) return [];

  const name = asset.name;
  const sym = asset.symbol;
  const type = asset.type;
  const content = ASSET_CONTENT[assetId];
  const driver =
    content?.stats?.primaryDriver ||
    (type === "crypto"
      ? "network adoption, regulatory news and overall crypto market sentiment"
      : type === "stock"
        ? "quarterly earnings, sector trends and macroeconomic conditions"
        : type === "etf"
          ? "the underlying index composition, fund flows and sector rotation"
          : type === "forex"
            ? "central bank policy, interest-rate differentials and macro releases"
            : "global supply/demand, USD strength and geopolitical events");

  const categoryLabel =
    type === "crypto"
      ? "cryptocurrency"
      : type === "stock"
        ? "stock"
        : type === "etf"
          ? "ETF"
          : type === "forex"
            ? "forex pair"
            : "commodity";

  return [
    {
      question: `How can I practice trading ${name} (${sym}) for free?`,
      answer: `Open the TradeHQ simulator, search for ${sym}, and place a buy or sell order using your $100,000 in virtual cash. There's no signup, no credit card and no real money at risk. (Educational simulation only — not financial advice.)`,
    },
    {
      question: `What drives ${name} price action?`,
      answer: `${name} (${sym}) is primarily influenced by ${driver}. On TradeHQ you can practice reading these catalysts on simulated charts before risking real capital.`,
    },
    {
      question: `Is ${sym} a good ${categoryLabel} for beginner traders to study?`,
      answer: `${sym} is one of the more widely-followed ${categoryLabel}s, which makes it a useful learning instrument because chart patterns, news flow and analyst commentary are all easy to find. Use the TradeHQ practice account to test entries and exits without financial risk.`,
    },
    {
      question: `How does ${sym} compare to other ${categoryLabel}s on the simulator?`,
      answer: `Open the Markets page to compare ${sym} side-by-side with other ${categoryLabel}s by price, 24h change and simulated volume. Practice rotating between assets to learn how correlations behave in different market conditions.`,
    },
    {
      question: `Can I lose real money trading ${sym} on TradeHQ?`,
      answer: `No. Every ${sym} trade on TradeHQ uses virtual currency only — your portfolio is stored in your browser and no real funds are ever at risk. The platform is designed purely for education and skill-building.`,
    },
  ];
}

// Asset brand colors for OG images
export const ASSET_COLORS: Record<string, string> = {
  btc: '#F7931A',    // Bitcoin Orange
  eth: '#627EEA',    // Ethereum Purple
  sol: '#14F195',    // Solana Green
  bnb: '#F3BA2F',    // BNB Yellow
  xrp: '#23292F',    // XRP Dark
  ada: '#0033AD',    // Cardano Blue
  doge: '#C2A633',   // Doge Gold
  avax: '#E84142',   // Avalanche Red
  dot: '#E6007A',    // Polkadot Pink
  matic: '#8247E5',  // Polygon Purple
  link: '#2A5ADA',   // Chainlink Blue
  ltc: '#345D9D',    // Litecoin Blue
  aapl: '#A2AAAD',   // Apple Silver
  msft: '#00A4EF',   // Microsoft Blue
  googl: '#4285F4',  // Google Blue
  amzn: '#FF9900',   // Amazon Orange
  nvda: '#76B900',   // NVIDIA Green
  tsla: '#CC0000',   // Tesla Red
  meta: '#0668E1',   // Meta Blue
  nflx: '#E50914',   // Netflix Red
  amd: '#ED1C24',    // AMD Red
  spy: '#00A651',    // SPY Green
  qqq: '#00B4D8',    // QQQ Cyan
  gold: '#FFD700',   // Gold
  oil: '#1A1A1A',    // Oil Black
  eurusd: '#003399', // EU Blue
  gbpusd: '#00247D', // UK Blue
};

// Top 25 seed assets for initial rollout
export const SEED_ASSET_IDS = [
  'btc', 'eth', 'sol', 'bnb', 'xrp', 'ada', 'doge', 'avax', 'dot', 'matic', 'link', 'ltc',
  'aapl', 'msft', 'googl', 'amzn', 'nvda', 'tsla', 'meta',
  'spy', 'qqq',
  'eurusd', 'gbpusd',
  'gold', 'oil'
];

export const ASSET_CONTENT: Record<string, AssetContent> = {
  // ===== CRYPTOCURRENCIES =====
  btc: {
    whatIs: "Digital Gold. A decentralized store of value with a capped supply of 21 million coins. Bitcoin is the world's first and most widely adopted cryptocurrency, pioneering blockchain technology and peer-to-peer digital transactions.",
    strategy: "Educational example: Simulate a HODL approach or test swing trades around long-term moving averages. Practice identifying key support/resistance levels at psychological price points. (Educational simulation only — not financial advice.)",
    category: "Cryptocurrency",
    keywords: ["Bitcoin trading", "BTC simulator", "crypto practice", "digital gold", "store of value", "blockchain"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      maxSupply: "21,000,000",
      consensus: "Proof of Work",
      source: "CoinGecko"
    },
    executiveOutlook: {
      summary: "Bitcoin is a large, volatile digital asset whose price can be affected by market liquidity, investor demand, regulation, macro conditions and developments in the broader crypto ecosystem. These factors are context for study, not a price forecast.",
      lastUpdated: "September 2026"
    },
    institutionalDrivers: {
      bull: "Institutional ETF accumulation, post-halving supply shock, Lightning Network adoption, and sovereign nation treasury allocations drive bullish momentum.",
      bear: "Fed rate decisions, regulatory crackdowns on self-custody, and potential ETF outflows during risk-off periods could pressure prices."
    },
    sectorPillar: "crypto-defi"
  },
  eth: {
    whatIs: "The foundation for DeFi and smart contracts. Ethereum powers thousands of decentralized applications, NFT marketplaces, and layer-2 scaling solutions. Its transition to Proof of Stake made it more energy-efficient.",
    strategy: "Compare ETH price changes with network activity and upgrade announcements across several periods. Gas fees and DeFi activity are context to investigate, not established leading signals. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Ethereum trading", "ETH simulator", "smart contracts", "DeFi", "Web3", "staking"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Stake",
      source: "CoinGecko"
    },
    executiveOutlook: {
      summary: "Ethereum is a smart-contract network whose market behavior can be studied alongside network activity, Layer 2 usage, staking, fees, competition and broader crypto-market conditions. None of those variables guarantees a particular return.",
      lastUpdated: "September 2026"
    },
    institutionalDrivers: {
      bull: "L2 scaling success, institutional staking yields, and growing RWA tokenization on Ethereum mainnet support price appreciation.",
      bear: "Competition from Solana and alternative L1s, plus regulatory classification uncertainty, pose headwinds."
    },
    sectorPillar: "crypto-defi"
  },
  sol: {
    whatIs: "A high-performance blockchain built for mass adoption with sub-second finality and minimal transaction costs. Solana hosts a growing ecosystem of DeFi, NFTs, and consumer applications competing with Ethereum.",
    strategy: "Compare price and volume around independently sourced network events. Record instances where network activity and token prices diverge rather than treating congestion or validator metrics as trading signals. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Solana trading", "SOL practice", "fast blockchain", "high TPS", "DeFi"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      throughput: "Varies by network conditions and measurement method",
      source: "CoinGecko"
    }
  },
  xrp: {
    whatIs: "XRP is the digital asset native to the XRP Ledger, designed for fast, low-cost cross-border payments. Ripple Labs uses it to facilitate international money transfers between financial institutions worldwide.",
    strategy: "XRP is known for sharp moves on regulatory news. Practice managing position size and setting news-based alerts to simulate real-world reaction trading. (Educational simulation only — not financial advice.)",
    category: "Cryptocurrency",
    keywords: ["XRP trading", "Ripple practice", "cross-border payments", "XRPL"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "RPCA",
      source: "CoinGecko"
    }
  },
  bnb: {
    whatIs: "BNB is the native token of the Binance ecosystem, powering the BNB Chain and providing trading fee discounts on the world's largest crypto exchange. It's used for DeFi, payments, and token burns.",
    strategy: "Compare price behavior around exchange and token-supply announcements. Record both positive and negative outcomes instead of assuming accumulation before an update. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["BNB trading", "Binance coin", "exchange token", "BNB Chain"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Staked Authority",
      source: "CoinGecko"
    }
  },
  
  // ===== TECHNOLOGY STOCKS =====
  nvda: {
    whatIs: "The undisputed leader in AI computing and GPUs. NVIDIA powers data centers, gaming, autonomous vehicles, and generative AI models. Its chips are essential infrastructure for the AI revolution.",
    strategy: "Compare several hypothetical exit and position-size rules over the same observation period. Semiconductor demand and company disclosures are research context, not guaranteed leading price signals. (Educational simulation only.)",
    category: "Technology Stock",
    keywords: ["NVIDIA stock trading", "NVDA simulator", "AI chips", "GPU", "data centers", "semiconductor"],
    stats: {
      sector: "Semiconductors",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "AI & Data Centers",
      source: "Yahoo Finance"
    }
  },
  aapl: {
    whatIs: "Apple Inc. is the world's most valuable company, known for the iPhone, Mac, iPad, and its rapidly growing services ecosystem. It commands premium pricing and fierce customer loyalty across all product lines.",
    strategy: "Practice comparing AAPL price behavior before and after earnings or product events. Record both continuation and reversal examples instead of treating 'buy the rumor, sell the news' as a rule. (Educational simulation only.)",
    category: "Technology Stock",
    keywords: ["Apple stock trading", "AAPL simulator", "tech stocks", "iPhone", "services"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Consumer Electronics & Services",
      source: "Yahoo Finance"
    }
  },
  msft: {
    whatIs: "A technology giant leading in cloud computing (Azure), enterprise software (Office 365), and AI development (Copilot, OpenAI partnership). Microsoft's diversified business model provides stability and growth.",
    strategy: "Compare Microsoft with other software companies over the same window. Measure volatility in that sample rather than assuming Microsoft is always less volatile. (Educational simulation only.)",
    category: "Technology Stock",
    keywords: ["Microsoft stock trading", "MSFT practice", "cloud computing", "Azure", "enterprise AI"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Cloud & AI",
      source: "Yahoo Finance"
    }
  },
  amzn: {
    whatIs: "The global leader in e-commerce and cloud computing (AWS), with expanding ventures into healthcare, streaming (Prime Video), logistics, and advertising. AWS alone generates the majority of Amazon's profits.",
    strategy: "Practice calculating risk-reward around earnings reports and Prime Day events. Monitor AWS growth and advertising revenue as key performance indicators. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Amazon stock trading", "AMZN practice", "e-commerce giant", "AWS", "cloud computing"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "E-commerce & Cloud",
      source: "Yahoo Finance"
    }
  },
  googl: {
    whatIs: "Alphabet, the parent company of Google, dominates search, digital advertising, YouTube, and cloud services. Its AI investments (Gemini, DeepMind) position it as a leader in the next computing paradigm.",
    strategy: "Practice marking consolidation ranges around earnings or product announcements and record whether apparent breakouts continued or failed. Advertising, cloud and YouTube metrics can be studied as context. (Educational simulation only.)",
    category: "Technology Stock",
    keywords: ["Google stock trading", "GOOGL simulator", "search advertising", "AI", "YouTube"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Advertising & AI",
      source: "Yahoo Finance"
    }
  },
  meta: {
    whatIs: "Owner of Facebook, Instagram, WhatsApp, and Threads—the world's largest social media platforms. Meta is investing heavily in AI infrastructure and mixed reality (Quest headsets, Ray-Ban Meta glasses).",
    strategy: "Practice correlating ad revenue metrics and user growth with price action during earnings. Monitor Reels engagement and AI ad targeting improvements. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Meta stock trading", "META simulator", "social media", "VR", "advertising", "AI"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Advertising & AI",
      source: "Yahoo Finance"
    }
  },
  nflx: {
    whatIs: "Netflix provides streaming entertainment. Its business can be studied through company disclosures about revenue, audience engagement, content spending and advertising.",
    strategy: "Practice earnings plays to understand volatility around subscriber growth and retention reports. Focus on content spending ROI and international expansion. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Netflix stock trading", "NFLX practice", "streaming", "entertainment", "content"],
    stats: {
      sector: "Entertainment",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Subscriber Growth",
      source: "Yahoo Finance"
    }
  },
  
  // ===== ETFs =====
  spy: {
    whatIs: "The world's most traded ETF, tracking the S&P 500 index—500 of America's largest public companies. SPY is the benchmark for U.S. equity performance and a cornerstone of passive investing strategies.",
    strategy: "Compare broad equity-index exposure with an individual stock under the same virtual sizing and observation rules. TradeHQ does not execute SPY options contracts. (Educational simulation only.)",
    category: "ETF",
    keywords: ["SPY ETF trading", "S&P 500 practice", "index fund", "benchmark", "passive investing"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Large-Cap",
      expenseRatio: "0.09%",
      source: "SPDR"
    }
  },
  
  // ===== COMMODITIES =====
  oil: {
    whatIs: "Crude Oil (WTI) is the primary energy commodity and a global inflation indicator. Oil prices affect transportation, manufacturing, and consumer costs worldwide. It trades on geopolitical news and inventory data.",
    strategy: "Analyze price action around OPEC+ meetings, EIA inventory reports, and geopolitical tensions. Practice understanding supply-demand dynamics. (Educational simulation only — not financial advice.)",
    category: "Commodity",
    keywords: ["oil trading", "WTI practice", "crude oil", "energy", "OPEC"],
    stats: {
      assetClass: "Commodity",
      benchmark: "WTI",
      units: "Barrels",
      source: "NYMEX"
    }
  },
  
  // ===== FOREX =====
  gbpusd: {
    whatIs: "The 'Cable' pair, representing the exchange rate between the British Pound Sterling and US Dollar. Named after the transatlantic telegraph cable, it's one of the most liquid and volatile major currency pairs.",
    strategy: "Compare simulated GBP/USD behavior across London, New York and overlap periods, noting that local clock times shift with daylight-saving rules. BOE and Fed policy can be tracked as macro context. (Educational simulation only.)",
    category: "Forex",
    keywords: ["GBP/USD trading", "Cable practice", "British Pound", "forex major", "currency trading"],
    stats: {
      assetClass: "Forex",
      avgDailyVolume: "live_sourced_at_runtime",
      pipValue: "Variable",
      source: "OANDA"
    }
  },
  
  // ===== ADDITIONAL ASSETS (Existing) =====
  ada: {
    whatIs: "Cardano (ADA) is a proof-of-stake blockchain platform founded by Ethereum co-founder Charles Hoskinson. It emphasizes peer-reviewed research, formal verification methods, and sustainable scalability.",
    strategy: "Use ADA to compare hypothetical holding periods and moving-average observations, then record how often those assumptions succeeded or failed. No fixed 3-7 day period or moving average is treated as a rule. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Cardano trading", "ADA simulator", "proof-of-stake", "smart contracts"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Ouroboros PoS",
      source: "CoinGecko"
    }
  },
  doge: {
    whatIs: "Dogecoin (DOGE) started as a meme cryptocurrency but has grown into a widely-accepted payment method. It features fast transaction times, low fees, and a passionate community.",
    strategy: "Use DOGE to observe how price, volume and social-media attention can move together or diverge. Compare multiple examples instead of treating a pullback or support level as an entry instruction. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Dogecoin trading", "DOGE practice", "meme coin", "payments"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Work",
      source: "CoinGecko"
    }
  },
  avax: {
    whatIs: "Avalanche (AVAX) is a layer-1 blockchain platform known for its speed and low transaction costs. It uses a unique consensus mechanism and supports multiple virtual machines for flexibility.",
    strategy: "Compare AVAX with Bitcoin over several selected periods and record changing relative returns. A change in Bitcoin dominance is not an instruction to rotate a portfolio. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Avalanche trading", "AVAX simulator", "layer-1 blockchain", "DeFi"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Avalanche Consensus",
      source: "CoinGecko"
    }
  },
  dot: {
    whatIs: "Polkadot (DOT) is a multi-chain protocol that enables different blockchains to connect and communicate. It aims to create a decentralized web where users control their own data.",
    strategy: "Record hypothetical consolidation and breakout observations for DOT, including failed examples. Describe exit assumptions in advance without treating resistance as a profit-taking instruction. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Polkadot trading", "DOT practice", "multi-chain", "interoperability"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Nominated PoS",
      source: "CoinGecko"
    }
  },
  matic: {
    whatIs: "Polygon (MATIC) is an Ethereum scaling solution that provides faster and cheaper transactions. It has become a leading layer-2 network for DeFi, gaming, and NFT applications.",
    strategy: "Compare the displayed Polygon reference instrument with ETH over a stated sample. Correlation and lead-lag relationships can change; a chart does not prove that one token predicts the other. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Polygon trading", "MATIC simulator", "layer-2 scaling", "Ethereum"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Stake",
      source: "CoinGecko"
    }
  },
  link: {
    whatIs: "Chainlink (LINK) is the leading decentralized oracle network, connecting smart contracts with real-world data. It's essential infrastructure for DeFi applications requiring price feeds and external data.",
    strategy: "Compare price behavior before and after publicly available integration announcements. An announcement does not establish the direction or size of a later move. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Chainlink trading", "LINK practice", "oracle network", "DeFi infrastructure"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Decentralized Oracle",
      source: "CoinGecko"
    }
  },
  ltc: {
    whatIs: "Litecoin (LTC) is one of the oldest cryptocurrencies, created as a 'lighter' version of Bitcoin. It offers faster transaction confirmations (2.5 min blocks) and uses the Scrypt hashing algorithm.",
    strategy: "Compare Litecoin volatility and drawdown with other crypto assets over a stated period. Do not assume it is stable or provides safe-haven protection. (Educational simulation only.)",
    category: "Cryptocurrency",
    keywords: ["Litecoin trading", "LTC simulator", "Bitcoin alternative", "faster transactions"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Work",
      source: "CoinGecko"
    }
  },
  tsla: {
    whatIs: "Tesla manufactures electric vehicles and energy products. Its shares can respond to company disclosures, competition, product developments and broader market conditions; market-value rankings change.",
    strategy: "Compare several virtual position weights and observe how TSLA price moves affect the simulated portfolio. A 5% allocation is not a universal limit or a real-money recommendation. (Educational simulation only.)",
    category: "Technology Stock",
    keywords: ["Tesla stock trading", "TSLA practice", "electric vehicles", "EV stocks"],
    stats: {
      sector: "Automotive",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "EV Demand & AI",
      source: "Yahoo Finance"
    }
  },
  amd: {
    whatIs: "Advanced Micro Devices (AMD) designs CPUs and GPUs competing directly with Intel and NVIDIA. It's a key player in gaming, data centers, and AI acceleration hardware.",
    strategy: "Compare AMD and NVIDIA over the same dates and measure relative movement in that sample. Their relationship can change; divergence does not establish a profitable relative-value trade. (Educational simulation only.)",
    category: "Technology Stock",
    keywords: ["AMD stock trading", "AMD simulator", "semiconductor", "CPU", "GPU"],
    stats: {
      sector: "Semiconductors",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Data Centers & Gaming",
      source: "Yahoo Finance"
    }
  },
  crm: {
    whatIs: "Salesforce Inc. (CRM) is the world's leading customer relationship management platform. It helps businesses manage sales, marketing, and customer service in the cloud with AI-powered analytics.",
    strategy: "CRM is a SaaS bellwether. Practice trading around tech sector rotation and use it as a gauge for enterprise software spending trends. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Salesforce stock trading", "CRM practice", "enterprise software", "SaaS"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Enterprise Software",
      source: "Yahoo Finance"
    }
  },
  intc: {
    whatIs: "Intel Corporation is a semiconductor giant known for PC processors. It's undergoing a major transformation to compete in AI and regain manufacturing leadership with its foundry services.",
    strategy: "Compare different hypothetical holding periods around company disclosures. A turnaround narrative does not guarantee recovery or make a longer holding period suitable. (Educational simulation only.)",
    category: "Technology Stock",
    keywords: ["Intel stock trading", "INTC simulator", "processors", "foundry"],
    stats: {
      sector: "Semiconductors",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "PC & Data Center",
      source: "Yahoo Finance"
    }
  },
  jpm: {
    whatIs: "JPMorgan Chase is America's largest bank by assets, operating in consumer banking, investment banking, and asset management. It's a bellwether for the financial sector and economic health.",
    strategy: "Practice correlating Fed announcements with bank stock movements to understand macro trading and interest rate sensitivity. (Educational simulation only — not financial advice.)",
    category: "Financial Stock",
    keywords: ["JPMorgan stock trading", "JPM practice", "banking", "financial sector"],
    stats: {
      sector: "Financials",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Interest Rates",
      source: "Yahoo Finance"
    }
  },
  v: {
    whatIs: "Visa operates the world's largest electronic payments network, processing billions of transactions annually. It benefits from the global shift from cash to digital payments.",
    strategy: "Compare virtual holding periods and drawdowns around payment-volume disclosures. Business growth does not guarantee steady share-price compounding. (Educational simulation only.)",
    category: "Financial Stock",
    keywords: ["Visa stock trading", "V simulator", "payments", "fintech"],
    stats: {
      sector: "Financials",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Digital Payments",
      source: "Yahoo Finance"
    }
  },
  ma: {
    whatIs: "Mastercard is the second-largest payment processor globally, operating in over 210 countries. It continues growing with digital payment adoption and fintech partnerships.",
    strategy: "Compare Mastercard and Visa over a defined period. Relative returns can diverge without subsequently reverting, so no rebalancing action is implied. (Educational simulation only.)",
    category: "Financial Stock",
    keywords: ["Mastercard stock trading", "MA practice", "credit cards", "payments"],
    stats: {
      sector: "Financials",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Digital Payments",
      source: "Yahoo Finance"
    }
  },
  qqq: {
    whatIs: "Tracks the Nasdaq-100 index, heavily weighted toward technology stocks including Apple, Microsoft, NVIDIA, and Amazon. Provides concentrated tech exposure for growth-focused investors.",
    strategy: "Compare QQQ and SPY under the same dates and virtual position weights. Their ratio describes relative price movement, not a dependable risk-on or risk-off instruction. (Educational simulation only.)",
    category: "ETF",
    keywords: ["QQQ ETF trading", "Nasdaq practice", "tech ETF", "growth stocks"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Tech & Growth",
      expenseRatio: "0.20%",
      source: "Invesco"
    }
  },
  iwm: {
    whatIs: "iShares Russell 2000 ETF tracks small-cap U.S. stocks. It's often used to gauge risk appetite, domestic economic health, and breadth of market rallies.",
    strategy: "Compare small-cap and large-cap index exposure over several samples. Small-cap outperformance does not by itself predict a broader market rally. (Educational simulation only.)",
    category: "ETF",
    keywords: ["IWM ETF trading", "small-cap practice", "Russell 2000"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Small-Cap",
      expenseRatio: "0.19%",
      source: "iShares"
    }
  },
  dia: {
    whatIs: "SPDR Dow Jones Industrial Average ETF tracks the 30 blue-chip stocks in the Dow Jones. It represents established, dividend-paying companies across diverse sectors.",
    strategy: "Compare DIA and QQQ concentration and drawdown under the same assumptions. Index composition alone does not establish a permanently defensive role or a rotation rule. (Educational simulation only.)",
    category: "ETF",
    keywords: ["DIA ETF trading", "Dow Jones practice", "blue chips"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Blue-Chips",
      expenseRatio: "0.16%",
      source: "SPDR"
    }
  },
  voo: {
    whatIs: "Vanguard S&P 500 ETF is a low-cost alternative to SPY, tracking the same S&P 500 index. Popular for long-term investors due to its minimal expense ratio.",
    strategy: "Compare the structures of funds tracking the same index. Real-world spreads and execution can differ, and simulator results do not reproduce every venue or liquidity condition. (Educational simulation only.)",
    category: "ETF",
    keywords: ["VOO ETF trading", "Vanguard practice", "low-cost index"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Large-Cap",
      expenseRatio: "0.03%",
      source: "Vanguard"
    }
  },
  arkk: {
    whatIs: "ARK Innovation ETF is actively managed by Cathie Wood, focusing on disruptive innovation across genomics, AI, fintech, autonomous vehicles, and blockchain technology.",
    strategy: "Compare how different virtual weights in a concentrated fund affect simulated drawdown. A 3% weight is one possible experiment input, not a universal maximum. (Educational simulation only.)",
    category: "ETF",
    keywords: ["ARKK ETF trading", "innovation practice", "Cathie Wood", "disruptive tech"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Disruptive Innovation",
      expenseRatio: "0.75%",
      source: "ARK Invest"
    }
  },
  eurusd: {
    whatIs: "EUR/USD is the world's most traded currency pair, representing the exchange rate between the Euro and US Dollar. It accounts for about 24% of global forex trading volume.",
    strategy: "EUR/USD moves on ECB and Fed policy divergence. Practice correlating central bank speeches with currency movements to master fundamental analysis. (Educational simulation only — not financial advice.)",
    category: "Forex",
    keywords: ["EUR/USD trading", "forex practice", "currency pair", "euro dollar"],
    stats: {
      assetClass: "Forex",
      avgDailyVolume: "live_sourced_at_runtime",
      pipValue: "Variable",
      source: "OANDA"
    }
  },
  usdjpy: {
    whatIs: "The US Dollar against the Japanese Yen—a key carry trade indicator and risk sentiment gauge. USD/JPY reflects interest rate differentials between the Fed and Bank of Japan.",
    strategy: "Practice understanding how interest rate differentials drive currency flows. Monitor BOJ intervention levels and Fed policy statements. (Educational simulation only — not financial advice.)",
    category: "Forex",
    keywords: ["USD/JPY trading", "Yen practice", "carry trade", "BOJ"],
    stats: {
      assetClass: "Forex",
      avgDailyVolume: "live_sourced_at_runtime",
      pipValue: "Variable",
      source: "OANDA"
    }
  },
  usdchf: {
    whatIs: "USD/CHF is the exchange rate between the US Dollar and Swiss Franc. The Swiss Franc is considered a safe-haven currency during market turbulence and geopolitical uncertainty.",
    strategy: "Compare USD/CHF with other instruments across several stressed and calmer periods. Currency correlations change, so a hedge relationship should not be assumed. (Educational simulation only.)",
    category: "Forex",
    keywords: ["USD/CHF trading", "Swiss Franc practice", "safe haven"],
    stats: {
      assetClass: "Forex",
      avgDailyVolume: "live_sourced_at_runtime",
      pipValue: "Variable",
      source: "OANDA"
    }
  },
  audusd: {
    whatIs: "AUD/USD represents the Australian Dollar against the US Dollar. It's heavily influenced by commodity prices, especially iron ore and coal, and Chinese economic data.",
    strategy: "AUD/USD tracks commodity cycles. Practice correlating it with gold and iron ore prices to develop cross-asset analysis skills. (Educational simulation only — not financial advice.)",
    category: "Forex",
    keywords: ["AUD/USD trading", "Aussie practice", "commodity currency"],
    stats: {
      assetClass: "Forex",
      avgDailyVolume: "live_sourced_at_runtime",
      pipValue: "Variable",
      source: "OANDA"
    }
  },
  gold: {
    whatIs: "Gold is a precious metal used in jewellery, industry and investment products. It is often discussed in relation to inflation, currencies and uncertainty, but those relationships vary and do not guarantee protection from losses.",
    strategy: "Educational example: Analyze gold price action during periods of high CPI data, Fed policy shifts, or stock market volatility. Focus on real yields as a key driver. (Educational simulation only — not financial advice.)",
    category: "Commodity",
    keywords: ["gold trading", "XAU practice", "precious metals", "safe haven", "inflation hedge"],
    stats: {
      assetClass: "Commodity",
      marketCap: "live_sourced_at_runtime",
      correlation: "Varies by period and market conditions",
      source: "COMEX"
    }
  },
  silver: {
    whatIs: "Both a precious metal and industrial commodity, used in electronics, solar panels, medicine, and as a store of value. Silver is more volatile than gold and often amplifies gold's movements.",
    strategy: "Observe the gold-silver ratio over a specified period and record both widening and narrowing. A ratio above 80 does not establish that silver will outperform. (Educational simulation only.)",
    category: "Commodity",
    keywords: ["silver trading", "XAG practice", "precious metals", "industrial"],
    stats: {
      assetClass: "Commodity",
      marketCap: "live_sourced_at_runtime",
      correlation: "Follows Gold (2-3x beta)",
      source: "COMEX"
    }
  },
  natgas: {
    whatIs: "Natural Gas is a major energy source for heating and electricity generation. Its price is highly seasonal, influenced by weather patterns, storage levels, and LNG export demand.",
    strategy: "Natural gas is extremely volatile seasonally. Practice trading around winter heating demand (Nov-Feb) and summer cooling patterns (Jun-Aug). (Educational simulation only — not financial advice.)",
    category: "Commodity",
    keywords: ["natural gas trading", "NG practice", "energy", "utilities"],
    stats: {
      assetClass: "Commodity",
      benchmark: "Henry Hub",
      units: "MMBtu",
      source: "NYMEX"
    }
  },
  copper: {
    whatIs: "Copper is called 'Dr. Copper' because its price is considered a leading indicator of economic health. It's essential for construction, electronics, EVs, and renewable energy infrastructure.",
    strategy: "Compare copper prices with dated economic releases and distinguish publication dates from observation periods. Coincidence in one sample does not establish a reliable leading indicator. (Educational simulation only.)",
    category: "Commodity",
    keywords: ["copper trading", "HG practice", "industrial metals", "economic indicator"],
    stats: {
      assetClass: "Commodity",
      benchmark: "COMEX",
      units: "Pounds",
      source: "COMEX"
    }
  },
};

// CTR-optimized titles — Variant A (active): "Learn & Practice" benefit-first
const CUSTOM_META_TITLES: Record<string, string> = {
  btc: "Learn & Practice Bitcoin Trading Free — $100K Simulator | Simulated BTC Data",
  eth: "Learn & Practice Ethereum Trading Free — $100K Simulator | Simulated ETH Data",
  nvda: "Learn & Practice NVDA Trading Free — $100K Simulator | Simulated Data",
  aapl: "Learn & Practice Apple Stock Trading Free — $100K Simulator",
  sol: "Learn & Practice Solana Trading Free — $100K Simulator | Simulated SOL Data",
  msft: "Learn & Practice MSFT Trading Free — $100K Simulator | Simulated Data",
  googl: "Learn & Practice GOOGL Trading Free — $100K Simulator | Simulated Data",
  amzn: "Learn & Practice AMZN Trading Free — $100K Simulator | Simulated Data",
  tsla: "Learn & Practice Tesla Trading Free — $100K Simulator | Simulated TSLA Data",
  meta: "Learn & Practice META Trading Free — $100K Simulator | Simulated Data",
  xrp: "Learn & Practice XRP Trading Free — $100K Simulator | Simulated Data",
  bnb: "Learn & Practice BNB Trading Free — $100K Simulator | Simulated Data",
  spy: "Learn & Practice SPY ETF Trading Free — $100K Simulator | Simulated Data",
  qqq: "Learn & Practice QQQ ETF Trading Free — $100K Simulator | Simulated Data",
  gold: "Learn & Practice Gold Trading Free — $100K Simulator | Simulated XAU Data",
  oil: "Learn & Practice Oil Trading Free — $100K Simulator | Simulated WTI Data",
  gbpusd: "Learn & Practice GBP/USD Forex Free — $100K Simulator | Simulated Data"
};

// Variant B titles for A/B testing (stored, not yet active — swap in after 7-day test)
export const META_TITLE_VARIANTS_B: Record<string, string> = {
  btc: "BTC Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  eth: "ETH Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  nvda: "NVDA Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  aapl: "AAPL Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  sol: "SOL Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  msft: "MSFT Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  googl: "GOOGL Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  amzn: "AMZN Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  tsla: "TSLA Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  meta: "META Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  xrp: "XRP Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  bnb: "BNB Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  spy: "SPY Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  qqq: "QQQ Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  gold: "Gold Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  oil: "Oil Simulated Analysis — Free $100K Trading Simulator | TradeHQ",
  gbpusd: "GBP/USD Simulated Analysis — Free Forex Simulator | TradeHQ"
};

// Variant A descriptions (active): "Learn & practice" + "risk-free" / "practice tools" hooks, ≤155 chars
const CUSTOM_META_DESCRIPTIONS: Record<string, string> = {
  btc: "Learn & practice Bitcoin trading risk-free with $100K virtual cash. Simulated BTC charts, educational tools, no signup.",
  eth: "Learn & practice Ethereum trading risk-free with $100K virtual cash. Simulated ETH charts, educational tools. No signup.",
  nvda: "Learn & practice NVIDIA stock trading risk-free with $100K virtual cash. Simulated charts, educational tools. No signup.",
  aapl: "Learn & practice Apple stock trading risk-free with $100K virtual cash. earnings study notes, simulated charts. No signup.",
  sol: "Learn & practice Solana trading risk-free with $100K virtual cash. Simulated SOL charts, practice tools. No signup.",
  msft: "Learn & practice Microsoft stock trading risk-free with $100K demo. Simulated charts, practice tools. Start free today.",
  googl: "Learn & practice Google stock trading risk-free with $100K demo cash. Simulated GOOGL charts, practice tools. No signup.",
  amzn: "Learn & practice Amazon stock trading risk-free with $100K demo cash. Simulated charts, practice tools. No signup.",
  tsla: "Learn & practice Tesla stock trading risk-free with $100K virtual cash. Simulated TSLA charts, practice tools. No signup.",
  meta: "Learn & practice META stock trading risk-free with $100K demo cash. Simulated charts, practice tools. Start free.",
  xrp: "Learn & practice XRP trading risk-free with $100K virtual cash. Simulated charts, practice tools. No signup needed.",
  bnb: "Learn & practice BNB trading risk-free with $100K demo cash. Simulated charts, practice tools. Start free today.",
  spy: "Learn & practice S&P 500 ETF trading risk-free with $100K demo. Simulated charts, practice tools. No signup.",
  qqq: "Learn & practice Nasdaq-100 ETF trading risk-free with $100K demo. Simulated charts, practice tools. Start free.",
  gold: "Learn & practice gold trading risk-free with $100K virtual cash. Simulated XAU charts, practice tools. No signup.",
  oil: "Learn & practice crude oil trading risk-free with $100K demo cash. Simulated WTI charts, practice tools. No signup.",
  gbpusd: "Learn & practice GBP/USD forex trading risk-free with $100K demo. Simulated charts, practice tools. No signup."
};

// Variant B descriptions for A/B testing (CTA-first — swap in after 7-day test)
export const META_DESC_VARIANTS_B: Record<string, string> = {
  btc: "Start trading BTC now — $100K free virtual cash, simulated Bitcoin charts, AI mentor. No signup. Explore crypto mechanics.",
  eth: "Start trading ETH now — $100K free virtual cash, simulated Ethereum charts. No signup. Learn DeFi strategies free.",
  nvda: "Start trading NVDA now — $100K free demo, simulated NVIDIA charts. No signup. Master AI stocks risk-free.",
  aapl: "Start trading AAPL now — $100K free demo, simulated Apple charts. No signup. Practice earnings plays free.",
  sol: "Start trading SOL now — $100K free demo, simulated Solana charts. No signup. Master fast crypto trading.",
  msft: "Start trading MSFT now — $100K free demo, simulated charts. No signup. Practice cloud stock analysis.",
  googl: "Start trading GOOGL now — $100K free demo, simulated charts. No signup. Practice AI stock analysis.",
  amzn: "Start trading AMZN now — $100K free demo, simulated charts. No signup. Practice e-commerce stock plays.",
  tsla: "Start trading TSLA now — $100K free demo, simulated Tesla charts. No signup. Master volatility trading.",
  meta: "Start trading META now — $100K free demo, simulated charts. No signup. Practice social media stocks.",
  xrp: "Start trading XRP now — $100K free demo, simulated charts. No signup. Practice crypto regulation plays.",
  bnb: "Start trading BNB now — $100K free demo, simulated charts. No signup. Master exchange token trading.",
  spy: "Start trading SPY now — $100K free demo, simulated S&P 500 charts. No signup. Practice index trading.",
  qqq: "Start trading QQQ now — $100K free demo, simulated Nasdaq charts. No signup. Practice tech ETF trading.",
  gold: "Start trading gold now — $100K free demo, simulated XAU charts. No signup. Practice safe-haven strategies.",
  oil: "Start trading oil now — $100K free demo, simulated WTI charts. No signup. Practice energy trading.",
  gbpusd: "Start forex trading now — $100K free demo, simulated GBP/USD charts. No signup. Practice currency pairs."
};

// Generate meta title - Institutional pattern for priority, fallback for others
export function generateAssetMetaTitle(asset: Asset): string {
  // Priority assets get institutional-grade titles
  if (CUSTOM_META_TITLES[asset.id]) {
    return CUSTOM_META_TITLES[asset.id];
  }
  
  // Fallback pattern for other assets — include the name so symbols that
  // collide across asset classes (e.g. ZS = Zscaler and Soybeans) stay unique.
  const label = asset.name && asset.name !== asset.symbol
    ? `${asset.name} (${asset.symbol})`
    : asset.symbol;
  const title = `${label} — Educational Overview & Practice | TradeHQ`;
  return title.length > 60 ? `${label} Analysis | TradeHQ` : title;
}

// Truncate meta description safely at 155 chars (no mid-sentence cuts)
export function truncateMetaDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastQuestion = truncated.lastIndexOf('?');
  const lastExclamation = truncated.lastIndexOf('!');
  
  const lastBoundary = Math.max(lastPeriod, lastQuestion, lastExclamation);
  
  if (lastBoundary > maxLength * 0.5) {
    return text.slice(0, lastBoundary + 1);
  }
  
  const lastSpace = truncated.lastIndexOf(' ');
  return text.slice(0, lastSpace) + '...';
}

// Generate meta description (120-155 chars) - Custom for top 5, fallback for others
export function generateAssetMetaDescription(asset: Asset): string {
  // Priority assets get custom CTR-optimized descriptions - ensure 155 char truncation
  if (CUSTOM_META_DESCRIPTIONS[asset.id]) {
    return truncateMetaDescription(CUSTOM_META_DESCRIPTIONS[asset.id], 155);
  }
  
  // Fallback for other assets
  const content = ASSET_CONTENT[asset.id];
  const typeLabel = asset.type === 'crypto' ? 'cryptocurrency' : asset.type;
  
  let description: string;
  if (content) {
    description = `Practice ${asset.symbol} trading with virtual money. ${content.whatIs} Explore with $100K virtual cash.`;
  } else {
    description = `Trade ${asset.name} (${asset.symbol}) in our free simulator. Get $100K demo cash, simulated charts, and AI mentoring. No signup needed!`;
  }
  
  // ALWAYS enforce 155 character limit
  return truncateMetaDescription(description, 155);
}

// Generate a neutral educational asset overview for SEO content
export function generateMarketOutlook(asset: Asset): string {
  const content = ASSET_CONTENT[asset.id];
  const typeLabel = asset.type === 'crypto' ? 'cryptocurrency' 
    : asset.type === 'etf' ? 'ETF' 
    : asset.type === 'forex' ? 'currency pair'
    : asset.type;
  
  // Introduction paragraph
  const intro = `${asset.name} (${asset.symbol}) is available in TradeHQ as a ${content?.category || typeLabel} practice instrument. This overview describes factors learners can observe in the simulator; it is not a current price target, forecast or recommendation.`;
  
  // Fundamentals paragraph
  const fundamentals = content?.whatIs 
    ? `${content.whatIs} This foundational understanding helps traders contextualize price movements and identify potential catalysts for volatility.`
    : `${asset.name} is available for practice trading in the TradeHQ simulator. Learners can compare the asset's characteristics and price behavior without treating the page as entry or exit advice.`;
  
  // Strategy paragraph
  const strategy = content?.strategy 
    ? content.strategy
    : `Use ${asset.symbol} to practise describing chart patterns, support/resistance zones and momentum across multiple timeframes. Record both successes and failures and compare the method with a simple baseline rather than assuming any indicator identifies an optimal entry.`;
  
  // Risk management paragraph
  const riskManagement = `Risk management is a useful part of a ${asset.symbol} simulation. Compare several position sizes and predefined exit rules, and record how each choice changes drawdown and portfolio volatility. Treat percentage limits as test settings rather than universal real-money rules.`;
  
  // Practice advice paragraph
  const practiceAdvice = `TradeHQ provides $100,000 in virtual capital to practise ${asset.symbol} trading. Use the simulator to test a written process, learn order mechanics, and review results over a larger sample. Paper trading can help with practice, but it cannot reproduce every feature of live execution or the emotions attached to real losses.`;
  
  // Educational disclaimer paragraph
  const disclaimer = `This overview is for educational simulation only. Simulated or historical examples do not predict future results, and TradeHQ does not provide a current buy, sell, target-price or suitability recommendation for this asset.`;
  
  return `${intro}\n\n${fundamentals}\n\n${strategy}\n\n${riskManagement}\n\n${practiceAdvice}\n\n${disclaimer}`;
}

// Get asset content or generate fallback
export function getAssetContent(assetId: string): AssetContent {
  return ASSET_CONTENT[assetId] || {
    whatIs: `This asset is available for virtual-money practice in the TradeHQ simulator. Use it to observe price behavior and order mechanics without risking real money.`,
    strategy: `Compare several virtual position sizes and predefined exit assumptions to see how they change simulated drawdown and outcomes. Treat these as experiment settings rather than real-money prescriptions.`,
    category: "Asset",
    keywords: ["trading practice", "simulator", "demo trading"]
  };
}

// Generate "How Students Use This Simulator" section per asset
export function generateStudentUseSection(asset: Asset): string {
  const typeLabel =
    asset.type === 'crypto' ? 'cryptocurrency' :
    asset.type === 'forex' ? 'forex' :
    asset.type === 'etf' ? 'ETF' :
    asset.type === 'commodity' ? 'commodity' :
    'stock';

  return `Use TradeHQ to practise ${asset.symbol} ${typeLabel} trading with virtual funds. Start by writing down what you think could move the asset, place a simulated order, choose an exit condition, and review the result afterwards. The goal is to learn order mechanics, position sizing and how volatility affects a practice portfolio — not to predict the next move or prepare for a specific real-money trade.`;
}

// Check if asset is in seed set
export function isInSeedSet(assetId: string): boolean {
  return SEED_ASSET_IDS.includes(assetId);
}

// Get asset brand color for OG images
export function getAssetColor(assetId: string): string {
  return ASSET_COLORS[assetId] || '#00FFFF';
}
