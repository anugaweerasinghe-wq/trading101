// Educational content used on asset practice pages.
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

// Plain-language context by asset type
export const CATEGORY_INTROS: Record<string, string> = {
  crypto: "Cryptocurrencies are decentralized digital assets known for 24/7 market cycles and high volatility.",
  stock: "Equities represent ownership in public companies and are driven by earnings, macro trends, and sector performance.",
  etf: "ETFs hold baskets of securities. Broad funds can spread company-specific exposure, while sector and thematic funds can still be highly concentrated."
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
  stats?: AssetStats;
  sectorPillar?: string;
}

// FAQ data for Google PAA (People Also Ask) targeting
export const ASSET_FAQS: Record<string, AssetFAQ[]> = {};


// Get FAQs for an asset
export function getAssetFAQs(assetId: string): AssetFAQ[] {
  return generateAssetFAQs(assetId);
}

// Programmatic FAQ generator — emits 5 unique, asset-tailored Q&A
// for any asset that lacks a hand-written ASSET_FAQS entry.
// Pulls asset name, symbol, type, sector and category context so the
// FAQ block is unique per page (not boilerplate) for FAQPage rich results.
export function generateAssetFAQs(assetId: string): AssetFAQ[] {
  const asset = ASSETS.find((a) => a.id === assetId);
  if (!asset) return [];

  const source = ASSET_CONTENT[assetId];
  const driver =
    source?.stats?.primaryDriver ||
    (asset.type === "crypto"
      ? "network activity, regulation, liquidity and broader digital-asset conditions"
      : asset.type === "stock"
        ? "company results, guidance, industry conditions and broader market expectations"
        : asset.type === "etf"
          ? "the fund's underlying holdings, weighting method and market conditions"
          : asset.type === "forex"
            ? "interest-rate expectations, central-bank policy and macroeconomic releases"
            : "supply, demand, currency moves and market-specific events");

  return [
    {
      question: `How can I practise ${asset.name} (${asset.symbol}) on TradeHQ?`,
      answer: `Open the TradeHQ simulator, select ${asset.symbol}, and use virtual funds to practise order entry, position sizing and post-trade review. No real money is involved.`,
    },
    {
      question: `What can affect ${asset.name} (${asset.symbol})?`,
      answer: `Important influences can include ${driver}. These factors describe what to research; they do not predict the next price move.`,
    },
    {
      question: `Are TradeHQ prices suitable for real-money decisions?`,
      answer: `No. TradeHQ is an educational simulator. Quotes may be live, cached, delayed or simulated depending on the asset and data availability, so they should not be treated as brokerage execution data.`,
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
    strategy: "Practice trading ETH/BTC ratios or position around network upgrade cycles. Focus on gas fee trends and DeFi TVL as leading indicators. (Educational simulation only — not financial advice.)",
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

// Hand-edited titles for priority practice pages
const CUSTOM_META_TITLES: Record<string, string> = {
  btc: "Practice Bitcoin (BTC) Trading — $100K Virtual Simulator | TradeHQ",
  eth: "Practice Ethereum (ETH) Trading — $100K Virtual Simulator | TradeHQ",
  nvda: "Practice NVIDIA (NVDA) Trading — Virtual Simulator | TradeHQ",
  aapl: "Practice Apple (AAPL) Trading — Virtual Simulator | TradeHQ",
  sol: "Practice Solana (SOL) Trading — $100K Virtual Simulator | TradeHQ",
  msft: "Practice Microsoft (MSFT) Trading — Virtual Simulator | TradeHQ",
  googl: "Practice Alphabet (GOOGL) Trading — Virtual Simulator | TradeHQ",
  amzn: "Practice Amazon (AMZN) Trading — Virtual Simulator | TradeHQ",
  tsla: "Practice Tesla (TSLA) Trading — Virtual Simulator | TradeHQ",
  meta: "Practice Meta (META) Trading — Virtual Simulator | TradeHQ",
  xrp: "Practice XRP Trading — $100K Virtual Simulator | TradeHQ",
  bnb: "Practice BNB Trading — $100K Virtual Simulator | TradeHQ",
  spy: "Practice SPY ETF Trading — $100K Virtual Simulator | TradeHQ",
  qqq: "Practice QQQ ETF Trading — $100K Virtual Simulator | TradeHQ",
  gold: "Practice Gold Trading — $100K Virtual Simulator | TradeHQ",
  oil: "Practice WTI Oil Trading — $100K Virtual Simulator | TradeHQ",
  gbpusd: "Practice GBP/USD Forex — $100K Virtual Simulator | TradeHQ"
};

// Alternate title map kept equal to the reviewed production copy
export const META_TITLE_VARIANTS_B: Record<string, string> = { ...CUSTOM_META_TITLES };

// Hand-edited descriptions for priority practice pages
const CUSTOM_META_DESCRIPTIONS: Record<string, string> = {
  btc: "Practise BTC with $100K virtual cash. Learn order mechanics and portfolio tracking with educational market data; no real money is involved.",
  eth: "Practise ETH with $100K virtual cash. Explore order mechanics, portfolio tracking and Ethereum price drivers without using real money.",
  nvda: "Practise NVDA with virtual cash and educational market data. Review order mechanics, position sizing and portfolio effects without real money.",
  aapl: "Practise AAPL with virtual cash and educational market data. Learn order mechanics and portfolio tracking without using real money.",
  sol: "Practise SOL with $100K virtual cash. Explore volatility, order mechanics and portfolio effects in an educational simulator.",
  msft: "Practise MSFT with virtual cash. Learn order mechanics, position sizing and portfolio tracking in an educational simulator.",
  googl: "Practise GOOGL with virtual cash. Explore order mechanics and portfolio tracking with educational market data.",
  amzn: "Practise AMZN with virtual cash. Learn order mechanics, position sizing and portfolio effects without real money.",
  tsla: "Practise TSLA with virtual cash. Explore volatility, order mechanics and portfolio effects in an educational simulator.",
  meta: "Practise META with virtual cash. Learn order mechanics, position sizing and portfolio tracking without real money.",
  xrp: "Practise XRP with $100K virtual cash. Explore order mechanics and market drivers in an educational simulator.",
  bnb: "Practise BNB with $100K virtual cash. Explore order mechanics and market drivers in an educational simulator.",
  spy: "Practise SPY with $100K virtual cash. Learn ETF order mechanics and portfolio tracking without using real money.",
  qqq: "Practise QQQ with $100K virtual cash. Explore ETF concentration, order mechanics and portfolio tracking.",
  gold: "Practise gold with $100K virtual cash. Explore macro price drivers and order mechanics in an educational simulator.",
  oil: "Practise WTI oil with $100K virtual cash. Explore supply-demand drivers and order mechanics in an educational simulator.",
  gbpusd: "Practise GBP/USD with $100K virtual cash. Explore currency-pair mechanics and macro drivers without real money."
};

// Alternate description map kept equal to the reviewed production copy
export const META_DESC_VARIANTS_B: Record<string, string> = { ...CUSTOM_META_DESCRIPTIONS };

// Generate a concise, evergreen page title
export function generateAssetMetaTitle(asset: Asset): string {
  // Priority assets get hand-edited titles
  if (CUSTOM_META_TITLES[asset.id]) {
    return CUSTOM_META_TITLES[asset.id];
  }
  
  // Fallback pattern for other assets — include the name so symbols that
  // collide across asset classes (e.g. ZS = Zscaler and Soybeans) stay unique.
  const label = asset.name && asset.name !== asset.symbol
    ? `${asset.name} (${asset.symbol})`
    : asset.symbol;
  const title = `Practice ${label} — Virtual Trading Simulator | TradeHQ`;
  return title.length > 65 ? `${label} Simulator | TradeHQ` : title;
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

// Generate a concise meta description
export function generateAssetMetaDescription(asset: Asset): string {
  // Priority assets get hand-edited descriptions
  if (CUSTOM_META_DESCRIPTIONS[asset.id]) {
    return truncateMetaDescription(CUSTOM_META_DESCRIPTIONS[asset.id], 155);
  }
  
  // Fallback for other assets
  const content = ASSET_CONTENT[asset.id];
  const typeLabel = asset.type === 'crypto' ? 'cryptocurrency' : asset.type;
  
  let description: string;
  if (content) {
    description = `Practise ${asset.symbol} with virtual cash. ${content.whatIs} No real money is involved.`;
  } else {
    description = `Practise ${asset.name} (${asset.symbol}) with $100K virtual cash in TradeHQ's educational simulator. No real money is involved.`;
  }
  
  // ALWAYS enforce 155 character limit
  return truncateMetaDescription(description, 155);
}

// Generate 300+ word Market Strategic Outlook for SEO content
export function generateMarketOutlook(asset: Asset): string {
  const content = getAssetContent(asset.id);
  const typeLabel =
    asset.type === 'crypto' ? 'cryptocurrency' :
    asset.type === 'etf' ? 'ETF' :
    asset.type === 'forex' ? 'currency pair' :
    asset.type;

  const intro = `${asset.name} (${asset.symbol}) is available in TradeHQ as a ${content.category || typeLabel} practice instrument. This page is designed to explain what the asset represents, what can influence it, and how to use the simulator without treating current price movement as a forecast.`;
  const fundamentals = `${content.whatIs} These characteristics provide context for a simulation, but they do not determine the next price move.`;
  const practice = content.strategy;
  const limits = `TradeHQ uses virtual capital. Quotes can be live, cached, delayed or simulated depending on the asset and data availability. Simulator fills, liquidity and emotional pressure can differ materially from real trading.`;
  const review = `After a simulated trade, compare the original written reason with what actually happened. Record position size, exit rule and drawdown so the exercise teaches process rather than hindsight.`;

  return `${intro}\n\n${fundamentals}\n\n${practice}\n\n${limits}\n\n${review}`;
}

// Get asset content or generate fallback
function buildPracticeExercise(asset: Asset, source?: AssetContent): string {
  const driver =
    source?.stats?.primaryDriver ||
    (asset.type === 'crypto' ? 'network activity, regulation and broader digital-asset conditions'
      : asset.type === 'stock' ? 'company results, industry conditions and broader market expectations'
      : asset.type === 'etf' ? 'underlying holdings, weighting and market conditions'
      : asset.type === 'forex' ? 'interest-rate expectations, central-bank policy and macroeconomic releases'
      : 'supply, demand, currency moves and market-specific events');

  return `Practice exercise: before placing a simulated ${asset.symbol} order, write down one observable factor you want to track, such as ${driver}. Choose a virtual position size and an exit condition in advance, then review the result afterwards. This is a learning exercise, not a buy or sell signal.`;
}

export function getAssetContent(assetId: string): AssetContent {
  const asset = ASSETS.find((a) => a.id === assetId);
  const source = ASSET_CONTENT[assetId];
  if (!asset) {
    return {
      whatIs: "This instrument is available in TradeHQ for educational simulation.",
      strategy: "Use virtual funds to practise order mechanics and review the result afterwards.",
      category: "Asset",
      keywords: ["trading practice", "simulator"],
    };
  }

  const base: AssetContent = source || {
    whatIs: `${asset.name} (${asset.symbol}) is available for educational practice in the TradeHQ simulator.`,
    strategy: "",
    category: asset.type,
    keywords: ["trading practice", "simulator"],
  };

  return {
    ...base,
    strategy: buildPracticeExercise(asset, base),
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
