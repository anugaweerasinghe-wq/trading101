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
  etf: "ETFs pool exposure according to a fund objective; concentration, leverage and the underlying holdings determine their risks.",
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
    { question: "How can I practice trading Bitcoin without losing money?", answer: "Use a crypto simulator like TradeHQ. You get $100,000 in virtual funds to practice Bitcoin's price action with simulated charts — no financial risk." },
    { question: "What is a free Bitcoin trading simulator?", answer: "TradeHQ offers a free BTC simulator with $100K virtual cash, candlestick charts, and educational mentor explanations. No signup or credit card required — start in seconds." },
    { question: "How to practice Bitcoin trading in Colombo as a student?", answer: "Students in Sri Lanka can use TradeHQ's free simulator to practice BTC trading with virtual money. Learn chart reading and risk management before using real capital." },
    { question: "Is Bitcoin a good asset for beginner traders to practice?", answer: "BTC is one available practice market. Its price can be volatile and chart levels can fail; suitability depends on what mechanics the learner wants to study." }
  ],
  eth: [
    { question: "What is one way to learn Ethereum trading?", answer: "Use virtual funds to compare ETH quantity, price changes and fees. Network fees and ETH exchange prices are different measures; neither a correlation nor a gas-fee trend establishes readiness for real-money trading." },
    { question: "How does Ethereum differ from Bitcoin for trading practice?", answer: "Ethereum supports a smart-contract ecosystem while Bitcoin has a different network design. Comparing their returns over a defined period can illustrate correlations that change over time." },
    { question: "Can students practice Ethereum trading for free?", answer: "Yes. TradeHQ gives you $100K virtual cash to practise ETH price and quantity calculations. It does not execute DeFi transactions, stake ETH or send coins to a wallet." },
    { question: "What indicators can be studied for Ethereum trading practice?", answer: "Gas fees, network activity and relative-price measures can be studied as different inputs. No indicator is universally best, and none establishes a future ETH price." }
  ],
  nvda: [
    { question: "How do I trade the AI boom with a simulator?", answer: "NVDA is the primary AI stock. Practice identifying momentum breakouts and RSI overbought levels using $100K demo cash to learn tech cycles." },
    { question: "Is NVIDIA stock good for beginner stock trading practice?", answer: "NVDA is one company example for a virtual practice exercise. News narratives and historical trends do not establish its suitability for a beginner or predict the next move." },
    { question: "How to practice NVIDIA stock trading as a student in Sri Lanka?", answer: "Use TradeHQ's free simulator with $100K virtual cash. It can be used to study semiconductor-cycle assumptions without opening a real-money brokerage account." },
    { question: "What moves NVIDIA stock price the most?", answer: "Data center revenue growth, AI chip demand, and quarterly earnings drive NVDA. Practice correlating these catalysts with price action in the simulator." }
  ],
  aapl: [
    { question: "Is Apple stock good for day trading practice?", answer: "AAPL is available for learning order entry and portfolio accounting with virtual cash. Earnings reactions are uncertain, and no stock has predictably profitable news responses." },
    { question: "How to practice Apple stock trading without real money?", answer: "TradeHQ lets you trade AAPL with $100K virtual cash. Practice the 'buy the rumor, sell the news' pattern around product launches and earnings." },
    { question: "What makes Apple stock move during earnings season?", answer: "iPhone revenue, Services growth, and guidance drive AAPL earnings moves. Practice reading pre-earnings positioning and post-earnings gap fills." },
    { question: "Can students in Sri Lanka practice US stock trading for free?", answer: "Yes. TradeHQ simulates US stocks including AAPL with virtual cash. No brokerage account, ID verification, or minimum deposit required." }
  ],
  tsla: [
    { question: "Why is Tesla stock so volatile in trading simulators?", answer: "Tesla-related practice data can illustrate gains and losses under different price changes. Simulator movements need not reproduce actual news reactions or market volatility." },
    { question: "How to practice Tesla stock trading as a complete beginner?", answer: "Start on TradeHQ with $100K virtual cash. Compare hypothetical position sizes and record an exit condition in your journal. Stop-loss orders are discussed conceptually; this simulator executes market orders." },
    { question: "What can contribute to Tesla stock gaps?", answer: "TSLA can react sharply to delivery reports, earnings, company announcements, broader market moves and other news. A simulator can be used to compare gap scenarios without assuming that one headline determines the move." },
    { question: "Is Tesla stock too risky for student traders to practice?", answer: "The simulator uses virtual funds, so a practice loss is not a real-money loss. That does not establish that TSLA is a suitable real investment or the best learning asset." }
  ],
  spy: [
    { question: "Should beginners start with SPY or individual stocks?", answer: "SPY represents an index-fund example, while individual stocks illustrate company-specific exposure. A learner can compare both; there is no universally required starting asset." },
    { question: "How to practice paper trading the S&P 500 for free?", answer: "Use TradeHQ's free simulator to practise SPY with $100K virtual cash. Compare market breadth, volume and moving-average observations without putting real money at risk." },
    { question: "What is one way to learn index ETF trading?", answer: "Start with SPY to understand how the overall market moves, then compare with QQQ (tech-heavy) to learn sector rotation and relative strength analysis." },
    { question: "Can I practice SPY options strategies in a simulator?", answer: "TradeHQ focuses on spot trading for SPY. Practice identifying entry/exit points, trend direction, and risk management — foundational skills for any strategy." }
  ],
  sol: [
    { question: "Is Solana trading harder than Bitcoin?", answer: "Solana is faster and often more volatile. Practice your 'entry and exit' speed in the simulator to account for Solana's aggressive price swings." },
    { question: "How to practice Solana trading for free?", answer: "TradeHQ offers SOL trading with $100K virtual cash. Practice fast-moving crypto trades and learn to handle high-volatility altcoin price action." },
    { question: "What drives Solana price movements?", answer: "Network activity, DeFi TVL, NFT minting volume, and ecosystem growth drive SOL. Practice correlating on-chain metrics with price action." },
    { question: "Is Solana suitable for beginner crypto traders?", answer: "Use virtual cash to compare how different price shocks affect a SOL position. A tight exit setting is a practice assumption, not a universal risk rule." }
  ],
  gold: [
    { question: "How does Gold react during market crashes?", answer: "Gold and stock prices can respond differently across periods. A practice chart is simulated and does not establish an inverse relationship or reproduce a market crash." },
    { question: "How to practice gold trading for free as a student?", answer: "TradeHQ provides $100K virtual cash for simulated gold practice. Students can compare how gold has behaved alongside inflation, rates and market stress without using real money." },
    { question: "What factors drive gold prices?", answer: "Real interest rates, USD strength, central bank purchases, and geopolitical tensions drive gold. Practice correlating these macro factors with XAU charts." },
    { question: "Is gold trading good for learning macro analysis?", answer: "Gold can be used to study supply, demand, interest-rate and currency hypotheses. Its reaction to inflation or geopolitical news is uncertain rather than reliably directional." }
  ],
  amzn: [
    { question: "When is a useful time to trade Amazon stock?", answer: "Earnings and other announcements can affect expectations and volatility, but there is no universally best trading time. A practice exercise can compare different possible news responses." },
    { question: "How to practice Amazon stock trading without a brokerage?", answer: "Use TradeHQ's free simulator — no brokerage account needed. Trade AMZN with $100K virtual cash and learn earnings-driven price patterns." },
    { question: "What drives Amazon stock price the most?", answer: "AWS cloud revenue, e-commerce growth, advertising income, and operating margins are key AMZN drivers. Practice reading these metrics before earnings." },
    { question: "Can students practice trading Amazon stock for free?", answer: "Yes. TradeHQ simulates AMZN with virtual capital. Students worldwide can learn to trade one of the world's largest companies without financial risk." }
  ],
  eurusd: [
    { question: "How do I learn Forex trading for free?", answer: "Use a $100,000 demo account to trade the EUR/USD pair. Compare session schedules as a learning exercise. Practice data does not reproduce actual session liquidity or execution." },
    { question: "What is a free forex simulator for beginners?", answer: "TradeHQ offers EUR/USD trading with $100K virtual cash. Practice currency pair analysis, pip calculations, and session-based trading strategies." },
    { question: "How to practice forex trading without money in Sri Lanka?", answer: "TradeHQ is free for students in Sri Lanka and worldwide. Practice EUR/USD and GBP/USD with simulated charts — no deposit or signup required." },
    { question: "What moves EUR/USD the most?", answer: "ECB and Fed interest rate decisions, inflation data, employment reports, and trade balance shifts drive EUR/USD. Practice fundamental analysis with these catalysts." }
  ],
  gbpusd: [
    { question: "How can I practice GBP/USD forex trading for free?", answer: "TradeHQ provides $100K virtual cash to practice Cable (GBP/USD) trading. Focus on London session volatility and BOE vs Fed policy divergence." },
    { question: "What is a useful time to trade GBP/USD?", answer: "Trading activity varies by session, holidays, news and daylight-saving changes. Session overlap is context rather than a profitable-timing rule; TradeHQ practice data need not mirror actual liquidity." },
    { question: "Is GBP/USD good for beginner forex traders?", answer: "GBP/USD is one currency-pair example. Observed volatility changes by period, and no pair or technical level guarantees faster learning or better outcomes." },
    { question: "How to learn forex trading without money as a student?", answer: "Use TradeHQ's free forex simulator. Students can practice GBP/USD, EUR/USD, and more currency pairs with $100K demo capital — no signup required." }
  ],
  oil: [
    { question: "How to practice crude oil trading for free?", answer: "TradeHQ lets you practise WTI crude oil with $100K virtual cash. Use scheduled reports and OPEC+ meetings as observation points rather than guaranteed trading signals." },
    { question: "What factors drive crude oil prices?", answer: "OPEC+ production decisions, US inventory data, geopolitical tensions, and global demand forecasts drive oil. Practice correlating news with price action." },
    { question: "Is oil trading suitable for beginner traders?", answer: "Oil can be volatile but educational. Start with small virtual positions and learn to read EIA reports and OPEC announcements before scaling up." },
    { question: "How do geopolitical events affect oil prices?", answer: "Middle East tensions, sanctions, and shipping disruptions can spike oil prices. Practice identifying geopolitical catalysts and managing risk during news events." }
  ],
  msft: [
    { question: "How to practice Microsoft stock trading for free?", answer: "TradeHQ offers MSFT trading with $100K virtual cash. Practice position sizing with MSFT's steady trends before moving to higher-volatility tech stocks." },
    { question: "What drives Microsoft stock price?", answer: "Azure cloud growth, AI Copilot adoption, enterprise software renewals, and LinkedIn revenue drive MSFT. Practice reading these metrics pre-earnings." },
    { question: "Is MSFT good for learning stock trading basics?", answer: "MSFT is one available company example for learning order mechanics and business analysis. Its volatility depends on the period examined and is not inherently suitable for every beginner." },
    { question: "Can I practice trading US tech stocks from Sri Lanka?", answer: "Yes. TradeHQ simulates US stocks including MSFT, AAPL, and NVDA. Students anywhere can practice free with $100K virtual cash." }
  ],
  googl: [
    { question: "How to practice trading Google stock for free?", answer: "Use TradeHQ to trade GOOGL with $100K virtual cash. Learn to identify breakout patterns around AI announcements and earnings reports." },
    { question: "What moves Alphabet stock price the most?", answer: "Search ad revenue, YouTube growth, Google Cloud performance, and AI product launches drive GOOGL. Practice correlating these with chart patterns." },
    { question: "Is Google stock good for practicing breakout trading?", answer: "Yes — GOOGL often consolidates then breaks out on AI news. Practice identifying consolidation ranges and volume-confirmed breakouts." },
    { question: "How to learn AI stock trading as a student?", answer: "Start with GOOGL and NVDA on TradeHQ. Practice identifying how AI product announcements create momentum trades and gap patterns." }
  ],
  meta: [
    { question: "How to practice META stock trading for free?", answer: "TradeHQ offers META practice with $100K virtual cash. Compare reported engagement, advertising and spending metrics with price changes without assuming a stable causal relationship." },
    { question: "What drives Meta Platforms stock price?", answer: "Ad revenue growth, user engagement (Reels, Threads), AI ad targeting improvements, and Reality Labs spending drive META's price action." },
    { question: "Is META good for practicing earnings plays?", answer: "Yes — META has some of the most dramatic earnings reactions in tech. Practice identifying pre-earnings positioning and post-earnings gap strategies." },
    { question: "How to learn social media stock analysis?", answer: "Start with META on TradeHQ. Practice tracking Daily Active Users, ad revenue per user, and engagement metrics as price drivers." }
  ],
  xrp: [
    { question: "How to practice XRP trading for free?", answer: "TradeHQ provides $100K virtual cash to practice XRP trading. Learn how regulatory news and Ripple partnerships affect price action." },
    { question: "Why can XRP react to regulatory news?", answer: "XRP has historically reacted to legal and regulatory developments, exchange access, network use and broader crypto-market conditions. A single headline does not guarantee a particular price response." },
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
    { question: "How to practice Nasdaq-100 ETF trading for free?", answer: "TradeHQ lets you practise QQQ with $100K virtual cash. Compare technology-sector concentration and broader index moves without using real money." },
    { question: "What is the difference between SPY and QQQ for practice?", answer: "SPY tracks the broad S&P 500 while QQQ is tech-heavy (Nasdaq-100). Practice comparing both to learn how sector concentration affects returns." },
    { question: "Is QQQ good for beginners learning ETF trading?", answer: "QQQ can illustrate Nasdaq-100 index concentration and how fund exposure differs from a broad-market example. A QQQ/SPY ratio does not establish a reliable risk-on signal." },
    { question: "How to learn tech sector trading as a student?", answer: "Compare the fund's published holdings and weighting method with individual companies. Use virtual cash to study concentration effects rather than assume a technology narrative predicts prices." }
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
    sectorPillar: "crypto-defi"
  },
  eth: {
    whatIs: "The foundation for DeFi and smart contracts. Ethereum powers thousands of decentralized applications, NFT marketplaces, and layer-2 scaling solutions. Its transition to Proof of Stake made it more energy-efficient.",
    strategy: "Compare ETH and BTC percentage changes over the same stated period. Network activity and gas fees provide context, but do not establish price direction or a leading signal. Educational simulation only; not financial advice.",
    category: "Cryptocurrency",
    keywords: ["Ethereum trading", "ETH simulator", "smart contracts", "DeFi", "Web3", "staking"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Stake",
      source: "CoinGecko"
    },
    sectorPillar: "crypto-defi"
  },
  sol: {
    whatIs: "A high-performance blockchain built for mass adoption with sub-second finality and minimal transaction costs. Solana hosts a growing ecosystem of DeFi, NFTs, and consumer applications competing with Ethereum.",
    strategy: "Compare hypothetical price changes with reports of network usage and reliability. Throughput or congestion alone does not establish an entry or a price forecast. Educational simulation only; not financial advice.",
    category: "Cryptocurrency",
    keywords: ["Solana trading", "SOL practice", "fast blockchain", "high TPS", "DeFi"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",

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
    strategy: "Separate exchange activity, token supply changes and regulatory announcements when studying BNB. A platform update does not prove accumulation or a future rally. Educational simulation only; not financial advice.",
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
    strategy: "Compare earnings, chip demand and spending assumptions with alternative outcomes in a practice journal. An RSI reading or news narrative does not establish an entry or a guaranteed trend. Educational simulation only; not financial advice.",
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
    strategy: "Compare revenue, guidance and product expectations with what was known before an earnings release. A buy-the-rumour narrative is a hypothesis that can fail. Educational simulation only; not financial advice.",
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
    strategy: "Compare cloud revenue, expenses and enterprise software demand in reported results. Relative volatility changes across observation periods and does not make a stock suitable for every beginner. Educational simulation only; not financial advice.",
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
    strategy: "Compare advertising revenue and cloud results with expectations before considering how an announcement could affect price. Positive product news need not produce a breakout. Educational simulation only; not financial advice.",
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
    whatIs: "The world's largest streaming entertainment service with 280M+ subscribers globally. Netflix produces award-winning original content and is expanding into live sports, gaming, and ad-supported tiers.",
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
    strategy: "Compare the index composition and practice return with individual holdings over a defined period. Volume or options data alone does not reveal institutional intentions. Educational simulation only; not financial advice.",
    category: "ETF",
    keywords: ["SPY ETF trading", "S&P 500 practice", "index fund", "benchmark", "passive investing"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Large-Cap",
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
    strategy: "Compare Bank of England and Federal Reserve policy expectations and write down alternative currency responses. London/New York session overlaps change with daylight-saving schedules and do not guarantee liquidity or profitable timing. Educational simulation only; not financial advice.",
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
    strategy: "Compare holding periods and moving-average settings as separate hypothetical rules. Neither a three-to-seven-day period nor a 50-day average is a universal instruction for ADA. Educational simulation only; not financial advice.",
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
    strategy: "Separate reported news, social-media promotion and observed volume. A pullback need not hold, and social attention does not establish a price forecast. Educational simulation only; not financial advice.",
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
    strategy: "Compare network-specific developments with broader crypto movements over a defined period. A decline in BTC dominance does not establish that AVAX will outperform. Educational simulation only; not financial advice.",
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
    strategy: "Compare interoperability adoption and network activity with alternative demand scenarios. Consolidation and resistance labels do not ensure profitable exits. Educational simulation only; not financial advice.",
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
    strategy: "Compare the asset identification and current network documentation before studying historical percentage changes. A historical correlation with ETH is not a reliable leading indicator. Educational simulation only; not financial advice.",
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
    strategy: "Compare an announced integration with evidence of actual usage. Announcements do not establish the timing or direction of a LINK price response. Educational simulation only; not financial advice.",
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
    strategy: "Compare price variability over a stated period rather than treating LTC as a safe haven. A lower historical fluctuation does not remove cryptocurrency loss risk. Educational simulation only; not financial advice.",
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
    whatIs: "Tesla Inc. is the world's most valuable automaker, leading in electric vehicles, energy storage, and AI-powered autonomous driving. Known for high volatility driven by CEO Elon Musk's statements.",
    strategy: "Compare how hypothetical position sizes change gains and losses during a price shock. No fixed five-percent allocation is appropriate for every account or objective. Educational simulation only; not financial advice.",
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
    strategy: "Compare AMD and NVIDIA percentage changes over the same sample and record differences in business exposure. Relative performance and measured beta can change. Educational simulation only; not financial advice.",
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
    strategy: "Separate reported operating results from a turnaround hypothesis. A longer holding period does not ensure that the hypothesis succeeds or losses recover. Educational simulation only; not financial advice.",
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
    strategy: "Compare payment volume, cross-border activity and business costs in reported results. Those factors do not guarantee steady compounding or a suitable long-term position. Educational simulation only; not financial advice.",
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
    strategy: "Compare Mastercard and Visa using the same observation period. Similar businesses can diverge, and a relative-price gap need not revert. Educational simulation only; not financial advice.",
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
    strategy: "Compare fund concentration and percentage changes with SPY over a stated period. A relative-price ratio describes that sample rather than certifying risk appetite or direction. Educational simulation only; not financial advice.",
    category: "ETF",
    keywords: ["QQQ ETF trading", "Nasdaq practice", "tech ETF", "growth stocks"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Tech & Growth",
      source: "Invesco"
    }
  },
  iwm: {
    whatIs: "iShares Russell 2000 ETF tracks small-cap U.S. stocks. It's often used to gauge risk appetite, domestic economic health, and breadth of market rallies.",
    strategy: "Compare small-cap and large-cap index exposure with costs and the chosen observation period. Small-cap outperformance does not reliably predict a wider market rally. Educational simulation only; not financial advice.",
    category: "ETF",
    keywords: ["IWM ETF trading", "small-cap practice", "Russell 2000"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Small-Cap",
      source: "iShares"
    }
  },
  dia: {
    whatIs: "SPDR Dow Jones Industrial Average ETF tracks the 30 blue-chip stocks in the Dow Jones. It represents established, dividend-paying companies across diverse sectors.",
    strategy: "Compare the Dow index weighting with the Nasdaq-100 weighting and record how composition affects practice results. DIA is not inherently defensive in every market. Educational simulation only; not financial advice.",
    category: "ETF",
    keywords: ["DIA ETF trading", "Dow Jones practice", "blue chips"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Blue-Chips",
      source: "SPDR"
    }
  },
  voo: {
    whatIs: "Vanguard S&P 500 ETF is a low-cost alternative to SPY, tracking the same S&P 500 index. Popular for long-term investors due to its minimal expense ratio.",
    strategy: "Compare fund objectives, costs and reported holdings with SPY. Similar index exposure does not make their prices, distributions or execution conditions identical. Educational simulation only; not financial advice.",
    category: "ETF",
    keywords: ["VOO ETF trading", "Vanguard practice", "low-cost index"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Large-Cap",
      source: "Vanguard"
    }
  },
  arkk: {
    whatIs: "ARK Innovation ETF is actively managed by Cathie Wood, focusing on disruptive innovation across genomics, AI, fintech, autonomous vehicles, and blockchain technology.",
    strategy: "Compare concentration and hypothetical price shocks when studying an actively managed ETF. There is no universal three-percent allocation limit, and volatility does not promise higher returns. Educational simulation only; not financial advice.",
    category: "ETF",
    keywords: ["ARKK ETF trading", "innovation practice", "Cathie Wood", "disruptive tech"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Disruptive Innovation",
      source: "ARK Invest"
    }
  },
  eurusd: {
    whatIs: "EUR/USD is the world's most traded currency pair, representing the exchange rate between the Euro and US Dollar. Its trading share depends on the survey period and measure used.",
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
    strategy: "Compare US and Swiss policy expectations with alternative exchange-rate outcomes. A historical safe-haven relationship can change and is not an assured hedge. Educational simulation only; not financial advice.",
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
    whatIs: "Gold is a precious metal used in jewellery, industry and reserves. Gold is used to hedge against inflation, currency devaluation, and geopolitical uncertainty. Central banks hold it as a reserve asset.",
    strategy: "Educational example: Analyze gold price action during periods of high CPI data, Fed policy shifts, or stock market volatility. Focus on real yields as a key driver. (Educational simulation only — not financial advice.)",
    category: "Commodity",
    keywords: ["gold trading", "XAU practice", "precious metals", "safe haven", "inflation hedge"],
    stats: {
      assetClass: "Commodity",
      marketCap: "live_sourced_at_runtime",
      correlation: "Relationship varies by period",
      source: "COMEX"
    }
  },
  silver: {
    whatIs: "Both a precious metal and industrial commodity, used in electronics, solar panels, medicine, and as a store of value. Silver is more volatile than gold and often amplifies gold's movements.",
    strategy: "Compare industrial demand, monetary conditions and the gold-silver ratio over a defined sample. A ratio above 80 does not establish future silver outperformance. Educational simulation only; not financial advice.",
    category: "Commodity",
    keywords: ["silver trading", "XAG practice", "precious metals", "industrial"],
    stats: {
      assetClass: "Commodity",
      marketCap: "live_sourced_at_runtime",
      correlation: "Relationship varies by period",
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
    strategy: "Compare industrial demand and supply assumptions with alternative macroeconomic scenarios. Copper prices are not a reliable advance signal of a broader market rally. Educational simulation only; not financial advice.",
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

// Variant A descriptions (active): "Learn & practice" + "risk-free" / "strategy builder" hooks, ≤155 chars
const CUSTOM_META_DESCRIPTIONS: Record<string, string> = {
  btc: "Practice Bitcoin with $100K virtual cash. Simulated BTC charts and educational mentor prompts. No signup.",
  eth: "Practice Ethereum with $100K virtual cash. Simulated ETH charts and educational DeFi context. No signup.",
  nvda: "Practice NVIDIA with $100K virtual cash. Simulated charts and educational mentor prompts. No signup.",
  aapl: "Practice Apple with $100K virtual cash. Simulated charts and educational earnings context. No signup.",
  sol: "Practice Solana with $100K virtual cash. Simulated SOL charts and educational mentor prompts. No signup.",
  msft: "Practice Microsoft with $100K virtual cash. Simulated charts and educational mentor prompts. No signup.",
  googl: "Practice Alphabet with $100K virtual cash. Simulated GOOGL charts and educational mentor prompts. No signup.",
  amzn: "Practice Amazon with $100K virtual cash. Simulated charts and educational mentor prompts. No signup.",
  tsla: "Practice Tesla with $100K virtual cash. Simulated TSLA charts and educational mentor prompts. No signup.",
  meta: "Practice Meta with $100K virtual cash. Simulated charts and educational mentor prompts. No signup.",
  xrp: "Practice XRP with $100K virtual cash. Simulated charts and educational mentor prompts. No signup needed.",
  bnb: "Practice BNB with $100K virtual cash. Simulated charts and educational mentor prompts. No signup.",
  spy: "Practice SPY with $100K virtual cash. Simulated ETF charts and educational mentor prompts. No signup.",
  qqq: "Practice QQQ with $100K virtual cash. Simulated ETF charts and educational mentor prompts. No signup.",
  gold: "Practice gold with $100K virtual cash. Simulated XAU charts and educational mentor prompts. No signup.",
  oil: "Practice crude oil with $100K virtual cash. Simulated WTI charts and educational mentor prompts. No signup.",
  gbpusd: "Practice GBP/USD with $100K virtual cash. Simulated forex charts and educational mentor prompts. No signup."
};

// Variant B descriptions for A/B testing (CTA-first — swap in after 7-day test)
export const META_DESC_VARIANTS_B: Record<string, string> = {
  btc: "Start trading BTC now — $100K free virtual cash, simulated Bitcoin charts, AI mentor. No signup. Master crypto.",
  eth: "Start trading ETH now — $100K free virtual cash, simulated Ethereum charts. No signup. Learn DeFi strategies free.",
  nvda: "Practice NVDA with $100K virtual cash and simulated NVIDIA charts. No signup. Educational analysis only.",
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
  const title = `${label} — Practice Data & Educational Guide | TradeHQ`;
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
    description = `Practice ${asset.symbol} with virtual cash. ${content.whatIs} No real money is involved.`;
  } else {
    description = `Trade ${asset.name} (${asset.symbol}) in our free simulator. Get $100K demo cash, simulated charts, and educational mentor explanations. No signup needed!`;
  }

  // ALWAYS enforce 155 character limit
  return truncateMetaDescription(description, 155);
}

// Generate 300+ word Market Strategic Outlook for SEO content
export function generateMarketOutlook(asset: Asset): string {
  const content = ASSET_CONTENT[asset.id];
  const typeLabel = asset.type === 'crypto' ? 'cryptocurrency'
    : asset.type === 'etf' ? 'ETF'
    : asset.type === 'forex' ? 'currency pair'
    : asset.type;

  // Introduction paragraph
  const intro = `${asset.name} (${asset.symbol}) is a ${content?.category || typeLabel} example available for virtual practice. As global markets continue to evolve with technological advancement and shifting macroeconomic conditions, understanding ${asset.symbol}'s price dynamics becomes increasingly important for traders seeking to develop their skills.`;

  // Fundamentals paragraph
  const fundamentals = content?.whatIs
    ? `${content.whatIs} This foundational understanding helps traders contextualize price movements and identify potential catalysts for volatility.`
    : `${asset.name} is available for practice trading in the TradeHQ simulator. Understanding the fundamental drivers of this asset helps traders make more informed decisions about entry and exit points.`;

  // Strategy paragraph
  const strategy = content?.strategy
    ? content.strategy
    : `Develop your ${asset.symbol} trading strategy by analyzing chart patterns, support and resistance levels, and market sentiment indicators. Compare multiple timeframes and record where their descriptions disagree. Technical analysis can be used as one way to describe price behaviour, but it does not guarantee better outcomes; compare any method against a simple baseline in the simulator.`;

  // Risk management paragraph
  const riskManagement = `Risk management is a useful part of a ${asset.symbol} simulation. Compare several position sizes and predefined exit rules, and record how each choice changes drawdown and portfolio volatility. Treat percentage limits as test settings rather than universal real-money rules.`;

  // Practice advice paragraph
  const practiceAdvice = `TradeHQ provides $100,000 in virtual capital to practise ${asset.symbol} trading. Use the simulator to test a written process, learn order mechanics, and review results over a larger sample. Paper trading can help with practice, but it cannot reproduce every feature of live execution or the emotions attached to real losses.`;

  // Educational disclaimer paragraph
  const disclaimer = `This analysis is for educational purposes only. Past simulated performance does not guarantee future results. Market conditions can change rapidly, and all trading involves risk of loss. Always conduct your own research and consult a qualified financial advisor before making investment decisions. TradeHQ is a practice simulator that uses virtual money; simulated results do not predict live-market performance.`;

  return `${intro}\n\n${fundamentals}\n\n${strategy}\n\n${riskManagement}\n\n${practiceAdvice}\n\n${disclaimer}`;
}

// Get asset content or generate fallback
export function getAssetContent(assetId: string): AssetContent {
  return ASSET_CONTENT[assetId] || {
    whatIs: `This asset is available for practice trading in the TradeHQ simulator. Learn its price patterns and develop your trading strategy without risking real money.`,
    strategy: `Compare hypothetical position sizes and record an exit condition before a practice order. TradeHQ executes market orders; stop and limit mechanics are studied conceptually.`,
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
