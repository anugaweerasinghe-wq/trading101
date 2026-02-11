// Unique SEO content for each asset - Anti-thin content blocks
import { Asset } from './types';

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
    {
      question: "How can I practice trading Bitcoin without losing money?",
      answer: "Use a crypto simulator like TradeHQ. You get $10,000 in virtual funds to practice Bitcoin's price action with simulated charts — no financial risk."
    }
  ],
  aapl: [
    {
      question: "Is Apple stock good for day trading practice?",
      answer: "Yes, AAPL is a favorite for beginners due to its high liquidity and predictable reactions to tech sector news and earnings reports."
    }
  ],
  eth: [
    {
      question: "What is the best way to learn Ethereum trading?",
      answer: "Start by simulating trades on a platform that offers simulated charts. Focus on ETH/BTC correlation and gas fee trends before moving to real capital."
    }
  ],
  tsla: [
    {
      question: "Why is Tesla stock so volatile in trading simulators?",
      answer: "Tesla's price is heavily driven by sentiment and macro-news. It is the perfect asset for practicing emotional discipline and stop-loss management."
    }
  ],
  nvda: [
    {
      question: "How do I trade the AI boom with a simulator?",
      answer: "NVDA is the primary AI stock. Practice identifying momentum breakouts and RSI overbought levels using $10k demo cash to learn tech cycles."
    }
  ],
  spy: [
    {
      question: "Should beginners start with SPY or individual stocks?",
      answer: "Beginners should practice with SPY (S&P 500 ETF) first. It provides a 'market average' experience, making it easier to learn technical analysis basics."
    }
  ],
  gold: [
    {
      question: "How does Gold react during market crashes?",
      answer: "Gold often acts as a safe-haven. Use the TradeHQ simulator to watch how XAU/USD moves inversely to the stock market during high-volatility events."
    }
  ],
  sol: [
    {
      question: "Is Solana trading harder than Bitcoin?",
      answer: "Solana is faster and often more volatile. Practice your 'entry and exit' speed in the simulator to account for Solana's aggressive price swings."
    }
  ],
  amzn: [
    {
      question: "When is the best time to trade Amazon stock?",
      answer: "Amazon often shows high volatility during 'Prime Day' and quarterly earnings. Practice the 'Buy the Rumor' strategy on these specific dates."
    }
  ],
  eurusd: [
    {
      question: "How do I learn Forex trading for free?",
      answer: "Use a $10,000 demo account to trade the EUR/USD pair. Focus on the overlap of the London and New York sessions for the most realistic practice."
    }
  ]
};

// Get FAQs for an asset
export function getAssetFAQs(assetId: string): AssetFAQ[] {
  return ASSET_FAQS[assetId] || [];
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
      summary: "Bitcoin enters 2026 as the dominant digital asset with institutional adoption accelerating. ETF inflows, halving effects, and Layer 2 scaling (Lightning, Stacks) position BTC for potential new highs. Risk factors include regulatory uncertainty and macroeconomic headwinds.",
      lastUpdated: "January 2026"
    },
    institutionalDrivers: {
      bull: "Institutional ETF accumulation, post-halving supply shock, Lightning Network adoption, and sovereign nation treasury allocations drive bullish momentum.",
      bear: "Fed rate decisions, regulatory crackdowns on self-custody, and potential ETF outflows during risk-off periods could pressure prices."
    },
    sectorPillar: "crypto-defi"
  },
  eth: {
    whatIs: "The foundation for DeFi and smart contracts. Ethereum powers thousands of decentralized applications, NFT marketplaces, and layer-2 scaling solutions. Its transition to Proof of Stake made it more energy-efficient.",
    strategy: "Practice trading ETH/BTC ratios or position around network upgrade cycles. Focus on gas fee trends and DeFi TVL as leading indicators. (Educational simulation only — not financial advice.)",
    category: "Cryptocurrency",
    keywords: ["Ethereum trading", "ETH simulator", "smart contracts", "DeFi", "Web3", "staking"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Stake",
      source: "CoinGecko"
    },
    executiveOutlook: {
      summary: "Ethereum's 2026 outlook centers on Layer 2 ecosystem growth and institutional staking adoption. Proto-danksharding (EIP-4844) has reduced L2 costs dramatically, driving DeFi and NFT activity. Deflationary supply mechanics post-Merge continue to benefit long-term holders.",
      lastUpdated: "January 2026"
    },
    institutionalDrivers: {
      bull: "L2 scaling success, institutional staking yields, and growing RWA tokenization on Ethereum mainnet support price appreciation.",
      bear: "Competition from Solana and alternative L1s, plus regulatory classification uncertainty, pose headwinds."
    },
    sectorPillar: "crypto-defi"
  },
  sol: {
    whatIs: "A high-performance blockchain built for mass adoption with sub-second finality and minimal transaction costs. Solana hosts a growing ecosystem of DeFi, NFTs, and consumer applications competing with Ethereum.",
    strategy: "Test entries during high-volatility sessions to understand network throughput impact. Monitor validator performance and network congestion as trading signals. (Educational simulation only — not financial advice.)",
    category: "Cryptocurrency",
    keywords: ["Solana trading", "SOL practice", "fast blockchain", "high TPS", "DeFi"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      TPS: "50,000+",
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
    strategy: "BNB often correlates with Binance exchange activity and token burn announcements. Practice identifying accumulation patterns before major platform updates. (Educational simulation only — not financial advice.)",
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
    strategy: "Educational example: Practice trend-following with risk management and RSI-based pullback entries. Monitor AI chip demand and data center spending as leading indicators. (Educational simulation only — not financial advice.)",
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
    strategy: "AAPL is a bellwether for tech sentiment and consumer spending. Practice trading around product launches and earnings—master the 'buy the rumor, sell the news' pattern. (Educational simulation only — not financial advice.)",
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
    strategy: "Practice position sizing with MSFT's relatively lower volatility before trading high-beta tech stocks. Focus on Azure growth metrics and enterprise AI adoption. (Educational simulation only — not financial advice.)",
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
    strategy: "Practice trading breakouts above resistance during positive AI announcements. Monitor advertising revenue trends and YouTube growth as key metrics. (Educational simulation only — not financial advice.)",
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
    strategy: "Practice reading market sentiment through SPY before trading individual stocks. Use SPY options data and volume to gauge institutional positioning. (Educational simulation only — not financial advice.)",
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
    strategy: "Simulate trading during the London/New York session overlap (1-4 PM GMT) for maximum liquidity and volatility. Monitor BOE and Fed policy divergence. (Educational simulation only — not financial advice.)",
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
    strategy: "Cardano moves in longer cycles—ideal for practicing swing trading. Hold positions for 3-7 days and use the 50-day moving average as your guide. (Educational simulation only — not financial advice.)",
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
    strategy: "DOGE is highly sensitive to social media sentiment. Practice monitoring volume spikes and avoid FOMO-driven entries—wait for pullbacks to support levels. (Educational simulation only — not financial advice.)",
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
    strategy: "AVAX is a strong performer during altcoin seasons. Practice identifying BTC dominance drops as signals to rotate into AVAX positions. (Educational simulation only — not financial advice.)",
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
    strategy: "DOT moves with DeFi and interoperability narratives. Practice building positions during consolidation periods and taking profits at resistance levels. (Educational simulation only — not financial advice.)",
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
    strategy: "MATIC often leads Ethereum moves. Practice using MATIC as a leading indicator and building correlated positions across both assets. (Educational simulation only — not financial advice.)",
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
    strategy: "LINK often rallies on major DeFi integrations. Practice tracking partnership announcements and positioning before confirmations hit mainstream news. (Educational simulation only — not financial advice.)",
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
    strategy: "LTC is a stable mover compared to altcoins. Practice using it as a safe haven during high-volatility periods while learning technical analysis basics. (Educational simulation only — not financial advice.)",
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
    strategy: "TSLA is the ultimate volatility trainer. Practice managing emotions during rapid price swings and never allocate more than 5% of your portfolio to a single high-beta position. (Educational simulation only — not financial advice.)",
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
    strategy: "AMD often moves with NVDA but with higher beta. Practice identifying divergences when AMD underperforms or outperforms its competitor for relative value plays. (Educational simulation only — not financial advice.)",
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
    strategy: "INTC is a turnaround story—practice patience and longer holding periods. Use it to learn about value investing vs. growth investing approaches. (Educational simulation only — not financial advice.)",
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
    strategy: "Practice long-term position building with this steady compounder. Focus on cross-border transaction volumes and digital payment adoption trends. (Educational simulation only — not financial advice.)",
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
    strategy: "MA moves similarly to V—practice pair trading strategies. When one outperforms, consider rebalancing between the two to learn mean reversion. (Educational simulation only — not financial advice.)",
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
    strategy: "Compare QQQ vs SPY performance to gauge tech sentiment and sector rotation. Use the QQQ/SPY ratio as a risk-on/risk-off indicator. (Educational simulation only — not financial advice.)",
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
    strategy: "IWM leads during risk-on rallies. Practice using IWM as a leading indicator—when small caps outperform, it often signals broader market strength. (Educational simulation only — not financial advice.)",
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
    strategy: "DIA is defensive compared to QQQ. Practice rotating between DIA and QQQ based on economic cycles to learn sector allocation strategies. (Educational simulation only — not financial advice.)",
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
    strategy: "VOO is identical to SPY for price action. Practice comparing bid-ask spreads between VOO and SPY to understand liquidity's impact on execution quality. (Educational simulation only — not financial advice.)",
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
    strategy: "ARKK is extremely volatile—high risk, high reward. Practice position sizing discipline and never allocate more than 3% of your portfolio to high-beta ETFs. (Educational simulation only — not financial advice.)",
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
    strategy: "USD/CHF inversely correlates with market fear. Practice using it as a hedge indicator—when stocks fall, CHF often strengthens. (Educational simulation only — not financial advice.)",
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
    whatIs: "The ultimate safe-haven asset with 5,000 years of monetary history. Gold is used to hedge against inflation, currency devaluation, and geopolitical uncertainty. Central banks hold it as a reserve asset.",
    strategy: "Educational example: Analyze gold price action during periods of high CPI data, Fed policy shifts, or stock market volatility. Focus on real yields as a key driver. (Educational simulation only — not financial advice.)",
    category: "Commodity",
    keywords: ["gold trading", "XAU practice", "precious metals", "safe haven", "inflation hedge"],
    stats: {
      assetClass: "Commodity",
      marketCap: "live_sourced_at_runtime",
      correlation: "Inverse to USD",
      source: "COMEX"
    }
  },
  silver: {
    whatIs: "Both a precious metal and industrial commodity, used in electronics, solar panels, medicine, and as a store of value. Silver is more volatile than gold and often amplifies gold's movements.",
    strategy: "Practice trading the gold-silver ratio—when historically high (>80), silver often outperforms. Monitor industrial demand from solar and electronics sectors. (Educational simulation only — not financial advice.)",
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
    strategy: "Copper leads economic cycles. Practice using copper as a leading indicator—strength often precedes broader market rallies. Monitor China construction data. (Educational simulation only — not financial advice.)",
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
  btc: "Learn & Practice Bitcoin Trading Free — $10K Simulator | Simulated BTC Data 2026",
  eth: "Learn & Practice Ethereum Trading Free — $10K Simulator | Simulated ETH Data 2026",
  nvda: "Learn & Practice NVDA Trading Free — $10K Simulator | Simulated Data 2026",
  aapl: "Learn & Practice Apple Stock Trading Free — $10K Simulator | 2026",
  sol: "Learn & Practice Solana Trading Free — $10K Simulator | Simulated SOL Data 2026",
  msft: "Learn & Practice MSFT Trading Free — $10K Simulator | Simulated Data 2026",
  googl: "Learn & Practice GOOGL Trading Free — $10K Simulator | Simulated Data 2026",
  amzn: "Learn & Practice AMZN Trading Free — $10K Simulator | Simulated Data 2026",
  tsla: "Learn & Practice Tesla Trading Free — $10K Simulator | Simulated TSLA Data 2026",
  meta: "Learn & Practice META Trading Free — $10K Simulator | Simulated Data 2026",
  xrp: "Learn & Practice XRP Trading Free — $10K Simulator | Simulated Data 2026",
  bnb: "Learn & Practice BNB Trading Free — $10K Simulator | Simulated Data 2026",
  spy: "Learn & Practice SPY ETF Trading Free — $10K Simulator | Simulated Data 2026",
  qqq: "Learn & Practice QQQ ETF Trading Free — $10K Simulator | Simulated Data 2026",
  gold: "Learn & Practice Gold Trading Free — $10K Simulator | Simulated XAU Data 2026",
  oil: "Learn & Practice Oil Trading Free — $10K Simulator | Simulated WTI Data 2026",
  gbpusd: "Learn & Practice GBP/USD Forex Free — $10K Simulator | Simulated Data 2026"
};

// Variant B titles for A/B testing (stored, not yet active — swap in after 7-day test)
export const META_TITLE_VARIANTS_B: Record<string, string> = {
  btc: "BTC 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  eth: "ETH 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  nvda: "NVDA 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  aapl: "AAPL 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  sol: "SOL 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  msft: "MSFT 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  googl: "GOOGL 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  amzn: "AMZN 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  tsla: "TSLA 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  meta: "META 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  xrp: "XRP 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  bnb: "BNB 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  spy: "SPY 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  qqq: "QQQ 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  gold: "Gold 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  oil: "Oil 2026 Simulated Analysis — Free $10K Trading Simulator | TradeHQ",
  gbpusd: "GBP/USD 2026 Simulated Analysis — Free Forex Simulator | TradeHQ"
};

// Variant A descriptions (active): "Learn & practice" + "risk-free" / "strategy builder" hooks, ≤155 chars
const CUSTOM_META_DESCRIPTIONS: Record<string, string> = {
  btc: "Learn & practice Bitcoin trading risk-free with $10K virtual cash. Simulated BTC charts, AI strategy builder, no signup.",
  eth: "Learn & practice Ethereum trading risk-free with $10K virtual cash. Simulated ETH charts, DeFi strategy builder. No signup.",
  nvda: "Learn & practice NVIDIA stock trading risk-free with $10K virtual cash. Simulated charts, AI strategy builder. No signup.",
  aapl: "Learn & practice Apple stock trading risk-free with $10K virtual cash. Earnings strategy builder, simulated charts. No signup.",
  sol: "Learn & practice Solana trading risk-free with $10K virtual cash. Simulated SOL charts, strategy builder. No signup.",
  msft: "Learn & practice Microsoft stock trading risk-free with $10K demo. Simulated charts, strategy builder. Start free today.",
  googl: "Learn & practice Google stock trading risk-free with $10K demo cash. Simulated GOOGL charts, strategy builder. No signup.",
  amzn: "Learn & practice Amazon stock trading risk-free with $10K demo cash. Simulated charts, strategy builder. No signup.",
  tsla: "Learn & practice Tesla stock trading risk-free with $10K virtual cash. Simulated TSLA charts, strategy builder. No signup.",
  meta: "Learn & practice META stock trading risk-free with $10K demo cash. Simulated charts, strategy builder. Start free.",
  xrp: "Learn & practice XRP trading risk-free with $10K virtual cash. Simulated charts, strategy builder. No signup needed.",
  bnb: "Learn & practice BNB trading risk-free with $10K demo cash. Simulated charts, strategy builder. Start free today.",
  spy: "Learn & practice S&P 500 ETF trading risk-free with $10K demo. Simulated charts, strategy builder. No signup.",
  qqq: "Learn & practice Nasdaq-100 ETF trading risk-free with $10K demo. Simulated charts, strategy builder. Start free.",
  gold: "Learn & practice gold trading risk-free with $10K virtual cash. Simulated XAU charts, strategy builder. No signup.",
  oil: "Learn & practice crude oil trading risk-free with $10K demo cash. Simulated WTI charts, strategy builder. No signup.",
  gbpusd: "Learn & practice GBP/USD forex trading risk-free with $10K demo. Simulated charts, strategy builder. No signup."
};

// Variant B descriptions for A/B testing (CTA-first — swap in after 7-day test)
export const META_DESC_VARIANTS_B: Record<string, string> = {
  btc: "Start trading BTC now — $10K free virtual cash, simulated Bitcoin charts, AI mentor. No signup. Master crypto in 2026.",
  eth: "Start trading ETH now — $10K free virtual cash, simulated Ethereum charts. No signup. Learn DeFi strategies free.",
  nvda: "Start trading NVDA now — $10K free demo, simulated NVIDIA charts. No signup. Master AI stocks risk-free.",
  aapl: "Start trading AAPL now — $10K free demo, simulated Apple charts. No signup. Practice earnings plays free.",
  sol: "Start trading SOL now — $10K free demo, simulated Solana charts. No signup. Master fast crypto trading.",
  msft: "Start trading MSFT now — $10K free demo, simulated charts. No signup. Practice cloud stock analysis.",
  googl: "Start trading GOOGL now — $10K free demo, simulated charts. No signup. Practice AI stock analysis.",
  amzn: "Start trading AMZN now — $10K free demo, simulated charts. No signup. Practice e-commerce stock plays.",
  tsla: "Start trading TSLA now — $10K free demo, simulated Tesla charts. No signup. Master volatility trading.",
  meta: "Start trading META now — $10K free demo, simulated charts. No signup. Practice social media stocks.",
  xrp: "Start trading XRP now — $10K free demo, simulated charts. No signup. Practice crypto regulation plays.",
  bnb: "Start trading BNB now — $10K free demo, simulated charts. No signup. Master exchange token trading.",
  spy: "Start trading SPY now — $10K free demo, simulated S&P 500 charts. No signup. Practice index trading.",
  qqq: "Start trading QQQ now — $10K free demo, simulated Nasdaq charts. No signup. Practice tech ETF trading.",
  gold: "Start trading gold now — $10K free demo, simulated XAU charts. No signup. Practice safe-haven strategies.",
  oil: "Start trading oil now — $10K free demo, simulated WTI charts. No signup. Practice energy trading.",
  gbpusd: "Start forex trading now — $10K free demo, simulated GBP/USD charts. No signup. Practice currency pairs."
};

// Generate meta title - Institutional pattern for priority, fallback for others
export function generateAssetMetaTitle(asset: Asset): string {
  // Priority assets get institutional-grade titles
  if (CUSTOM_META_TITLES[asset.id]) {
    return CUSTOM_META_TITLES[asset.id];
  }
  
  // Fallback pattern for other assets
  const title = `${asset.symbol} — Market Analysis & 2026 Strategy | TradeHQ`;
  return title.length > 60 ? `${asset.symbol} Analysis | TradeHQ` : title;
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
    description = `Practice ${asset.symbol} trading risk-free. ${content.whatIs} Start with $10K virtual cash now.`;
  } else {
    description = `Trade ${asset.name} (${asset.symbol}) in our free simulator. Get $10K demo cash, simulated charts, and AI mentoring. No signup needed!`;
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
  const intro = `${asset.name} (${asset.symbol}) represents a ${content?.category || typeLabel} opportunity in the 2026 market environment. As global markets continue to evolve with technological advancement and shifting macroeconomic conditions, understanding ${asset.symbol}'s price dynamics becomes increasingly important for traders seeking to develop their skills.`;
  
  // Fundamentals paragraph
  const fundamentals = content?.whatIs 
    ? `${content.whatIs} This foundational understanding helps traders contextualize price movements and identify potential catalysts for volatility.`
    : `${asset.name} is available for practice trading in the TradeHQ simulator. Understanding the fundamental drivers of this asset helps traders make more informed decisions about entry and exit points.`;
  
  // Strategy paragraph
  const strategy = content?.strategy 
    ? content.strategy
    : `Develop your ${asset.symbol} trading strategy by analyzing chart patterns, support and resistance levels, and market sentiment indicators. Consider using multiple timeframes to confirm trends and identify optimal entry points. Technical analysis combined with awareness of broader market conditions can improve trading outcomes.`;
  
  // Risk management paragraph
  const riskManagement = `Risk management is critical when trading ${asset.symbol}. Consider position sizing relative to your virtual portfolio, set appropriate stop-loss levels, and never risk more than 2% of capital on a single trade. Understanding volatility patterns specific to ${asset.symbol} helps set realistic profit targets and loss limits. Paper trading allows you to practice these risk management techniques without financial consequences.`;
  
  // Practice advice paragraph
  const practiceAdvice = `TradeHQ provides $10,000 in virtual capital to practice ${asset.symbol} trading. Use this simulator to test strategies, learn technical analysis, and build confidence before committing real capital. Track your performance over time and refine your approach based on results. The ability to practice without financial risk accelerates the learning curve for new traders while helping experienced traders test new strategies.`;
  
  // Educational disclaimer paragraph
  const disclaimer = `This analysis is for educational purposes only. Past simulated performance does not guarantee future results. Market conditions can change rapidly, and all trading involves risk of loss. Always conduct your own research and consult a qualified financial advisor before making investment decisions. TradeHQ is a practice simulator designed to help you develop skills in a risk-free environment.`;
  
  return `${intro}\n\n${fundamentals}\n\n${strategy}\n\n${riskManagement}\n\n${practiceAdvice}\n\n${disclaimer}`;
}

// Get asset content or generate fallback
export function getAssetContent(assetId: string): AssetContent {
  return ASSET_CONTENT[assetId] || {
    whatIs: `This asset is available for practice trading in the TradeHQ simulator. Learn its price patterns and develop your trading strategy without risking real money.`,
    strategy: `Start with small position sizes to understand this asset's volatility. Use stop-losses and take-profit orders to build disciplined trading habits.`,
    category: "Asset",
    keywords: ["trading practice", "simulator", "demo trading"]
  };
}

// Check if asset is in seed set
export function isInSeedSet(assetId: string): boolean {
  return SEED_ASSET_IDS.includes(assetId);
}

// Get asset brand color for OG images
export function getAssetColor(assetId: string): string {
  return ASSET_COLORS[assetId] || '#00FFFF'; // Default to cyan
}
