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
}

// FAQ data for Google PAA (People Also Ask) targeting
export const ASSET_FAQS: Record<string, AssetFAQ[]> = {
  btc: [
    {
      question: "How can I practice trading Bitcoin without losing money?",
      answer: "Use a crypto simulator like TradeHQ. You get $10,000 in virtual funds to practice Bitcoin's price action in real-time without any financial risk."
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
      answer: "Start by simulating trades on a platform that offers real-time charts. Focus on ETH/BTC correlation and gas fee trends before moving to real capital."
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
  // Cryptocurrencies
  btc: {
    whatIs: "Digital Gold. A decentralized store of value with a capped supply (21M). Widely used for long-term store-of-value strategies.",
    strategy: "Educational example: simulate a HODL approach or test swing trades around long-term moving averages. (Educational purposes only — not financial advice.)",
    category: "Cryptocurrency",
    keywords: ["Bitcoin trading", "BTC simulator", "crypto practice", "digital gold", "store of value"],
    stats: {
      marketCap: "live_sourced_at_runtime",
      maxSupply: "21,000,000",
      assetClass: "Cryptocurrency",
      source: "CoinGecko"
    }
  },
  eth: {
    whatIs: "The foundation for DeFi and smart contracts.",
    strategy: "Practice trading ETH/BTC ratios or network upgrade cycles. (Educational simulation only — not financial advice.)",
    category: "Cryptocurrency",
    keywords: ["Ethereum trading", "ETH simulator", "smart contracts", "DeFi", "Web3"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      consensus: "Proof of Stake",
      source: "CoinGecko"
    }
  },
  sol: {
    whatIs: "A high-performance blockchain for mass adoption.",
    strategy: "Test entries during high-volatility sessions to understand network throughput. (Educational simulation only — not financial advice.)",
    category: "Cryptocurrency",
    keywords: ["Solana trading", "SOL practice", "fast blockchain", "high TPS"],
    stats: {
      assetClass: "Cryptocurrency",
      marketCap: "live_sourced_at_runtime",
      TPS: "50,000+",
      source: "Solana"
    }
  },
  bnb: {
    whatIs: "BNB is the native token of the Binance ecosystem, powering the Binance Smart Chain and providing trading fee discounts on the world's largest crypto exchange.",
    strategy: "BNB often correlates with Binance exchange activity. Practice identifying accumulation patterns before major Binance announcements or token burns.",
    category: "Cryptocurrency",
    keywords: ["BNB trading", "Binance coin", "exchange token"]
  },
  xrp: {
    whatIs: "XRP is the digital asset native to the XRP Ledger, designed for fast, low-cost cross-border payments. Ripple Labs uses it to facilitate international money transfers between financial institutions.",
    strategy: "XRP is known for sharp moves on regulatory news. Practice managing position size and setting news-based alerts to simulate real-world reaction trading.",
    category: "Cryptocurrency",
    keywords: ["XRP trading", "Ripple practice", "cross-border payments"]
  },
  ada: {
    whatIs: "Cardano (ADA) is a proof-of-stake blockchain platform founded by Ethereum co-founder Charles Hoskinson. It emphasizes peer-reviewed research and formal verification methods.",
    strategy: "Cardano moves in longer cycles—ideal for practicing swing trading. Hold positions for 3-7 days and use the 50-day moving average as your guide.",
    category: "Cryptocurrency",
    keywords: ["Cardano trading", "ADA simulator", "proof-of-stake"]
  },
  doge: {
    whatIs: "Dogecoin (DOGE) started as a meme cryptocurrency but has grown into a widely-accepted payment method. It features fast transaction times and has a passionate community.",
    strategy: "DOGE is highly sensitive to social media sentiment. Practice monitoring volume spikes and avoid FOMO-driven entries—wait for pullbacks to support levels.",
    category: "Cryptocurrency",
    keywords: ["Dogecoin trading", "DOGE practice", "meme coin"]
  },
  avax: {
    whatIs: "Avalanche (AVAX) is a layer-1 blockchain platform known for its speed and low transaction costs. It uses a unique consensus mechanism and supports multiple virtual machines.",
    strategy: "AVAX is a strong performer during altcoin seasons. Practice identifying BTC dominance drops as signals to rotate into AVAX positions.",
    category: "Cryptocurrency",
    keywords: ["Avalanche trading", "AVAX simulator", "layer-1 blockchain"]
  },
  dot: {
    whatIs: "Polkadot (DOT) is a multi-chain protocol that enables different blockchains to connect and communicate. It aims to create a decentralized web where users control their own data.",
    strategy: "DOT moves with DeFi and interoperability narratives. Practice building positions during consolidation periods and taking profits at resistance levels.",
    category: "Cryptocurrency",
    keywords: ["Polkadot trading", "DOT practice", "multi-chain"]
  },
  matic: {
    whatIs: "Polygon (MATIC) is an Ethereum scaling solution that provides faster and cheaper transactions. It has become a leading layer-2 network for DeFi and gaming applications.",
    strategy: "MATIC often leads Ethereum moves. Practice using MATIC as a leading indicator and building correlated positions across both assets.",
    category: "Cryptocurrency",
    keywords: ["Polygon trading", "MATIC simulator", "layer-2 scaling"]
  },
  link: {
    whatIs: "Chainlink (LINK) is the leading decentralized oracle network, connecting smart contracts with real-world data. It's essential infrastructure for DeFi applications.",
    strategy: "LINK often rallies on major DeFi integrations. Practice tracking partnership announcements and positioning before confirmations hit mainstream news.",
    category: "Cryptocurrency",
    keywords: ["Chainlink trading", "LINK practice", "oracle network"]
  },
  ltc: {
    whatIs: "Litecoin (LTC) is one of the oldest cryptocurrencies, created as a 'lighter' version of Bitcoin. It offers faster transaction confirmations and uses a different hashing algorithm.",
    strategy: "LTC is a stable mover compared to altcoins. Practice using it as a safe haven during high-volatility periods while learning technical analysis basics.",
    category: "Cryptocurrency",
    keywords: ["Litecoin trading", "LTC simulator", "Bitcoin alternative"]
  },
  
  // Tech Stocks
  aapl: {
    whatIs: "Apple Inc. (AAPL) is the world's most valuable company, known for the iPhone, Mac, and its services ecosystem. It's a core holding in most major indices and funds.",
    strategy: "AAPL is a bellwether for tech sentiment. Practice trading around product launches and earnings—master the 'buy the rumor, sell the news' pattern here.",
    category: "Technology Stock",
    keywords: ["Apple stock trading", "AAPL simulator", "tech stocks"]
  },
  msft: {
    whatIs: "A technology giant leading in cloud computing (Azure), enterprise software, and AI development.",
    strategy: "Practice position sizing with MSFT's lower volatility before trading high-beta stocks. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Microsoft stock trading", "MSFT practice", "cloud computing", "Azure", "enterprise"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Cloud & AI",
      source: "YahooFinance"
    }
  },
  googl: {
    whatIs: "The parent company of Google, dominating search, advertising, YouTube, and cloud services.",
    strategy: "Practice trading breakouts above resistance during positive AI announcements. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Google stock trading", "GOOGL simulator", "search advertising", "AI", "YouTube"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Advertising & AI",
      source: "YahooFinance"
    }
  },
  amzn: {
    whatIs: "The global leader in e-commerce and cloud computing (AWS), expanding into healthcare, streaming, and logistics.",
    strategy: "Practice calculating risk-reward around earnings and Prime Day events. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Amazon stock trading", "AMZN practice", "e-commerce giant", "AWS", "cloud"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "E-commerce & Cloud",
      source: "YahooFinance"
    }
  },
  nvda: {
    whatIs: "A leader in AI computing and GPUs powering data centers, gaming, and generative AI.",
    strategy: "Educational example: practice trend-following with risk management and RSI-based pullback entries. (Educational purposes only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["NVIDIA stock trading", "NVDA simulator", "AI chips", "GPU", "data centers"],
    stats: {
      sector: "Semiconductors",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "AI",
      source: "YahooFinance"
    }
  },
  tsla: {
    whatIs: "Tesla Inc. (TSLA) is the world's most valuable automaker, leading in electric vehicles and energy storage. It's known for high volatility driven by CEO Elon Musk's public statements.",
    strategy: "TSLA is the ultimate volatility trainer. Practice managing emotions during rapid price swings and never use more than 5% of your portfolio on a single TSLA position.",
    category: "Technology Stock",
    keywords: ["Tesla stock trading", "TSLA practice", "electric vehicles"]
  },
  meta: {
    whatIs: "Owner of Facebook, Instagram, and WhatsApp, investing heavily in AI and the metaverse.",
    strategy: "Practice correlating ad revenue metrics with price action during earnings. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Meta stock trading", "META simulator", "social media", "VR", "advertising"],
    stats: {
      sector: "Technology",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Advertising & AI",
      source: "YahooFinance"
    }
  },
  nflx: {
    whatIs: "The world's largest streaming entertainment service with 200M+ subscribers producing original content.",
    strategy: "Practice earnings plays to understand volatility around subscriber growth reports. (Educational simulation only — not financial advice.)",
    category: "Technology Stock",
    keywords: ["Netflix stock trading", "NFLX practice", "streaming", "entertainment"],
    stats: {
      sector: "Entertainment",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Subscriber Growth",
      source: "YahooFinance"
    }
  },
  amd: {
    whatIs: "Advanced Micro Devices (AMD) designs CPUs and GPUs competing directly with Intel and NVIDIA. It's a key player in gaming, data centers, and AI acceleration.",
    strategy: "AMD often moves with NVDA but with higher beta. Practice identifying divergences when AMD underperforms or outperforms its competitor.",
    category: "Technology Stock",
    keywords: ["AMD stock trading", "AMD simulator", "semiconductor"]
  },
  crm: {
    whatIs: "Salesforce Inc. (CRM) is the world's leading customer relationship management (CRM) platform. It helps businesses manage sales, marketing, and customer service in the cloud.",
    strategy: "CRM is a SaaS bellwether. Practice trading around tech sector rotation and use it as a gauge for enterprise software spending trends.",
    category: "Technology Stock",
    keywords: ["Salesforce stock trading", "CRM practice", "enterprise software"]
  },
  intc: {
    whatIs: "Intel Corporation (INTC) is a semiconductor giant known for PC processors. It's undergoing a major transformation to compete in AI and regain manufacturing leadership.",
    strategy: "INTC is a turnaround story—practice patience and longer holding periods. Use it to learn about value investing vs. growth investing approaches.",
    category: "Technology Stock",
    keywords: ["Intel stock trading", "INTC simulator", "processors"]
  },
  
  // Financial Stocks
  jpm: {
    whatIs: "America's largest bank by assets, operating in consumer banking, investment banking, and asset management.",
    strategy: "Practice correlating Fed announcements with bank stock movements to understand macro trading. (Educational simulation only — not financial advice.)",
    category: "Financial Stock",
    keywords: ["JPMorgan stock trading", "JPM practice", "banking", "financial sector"],
    stats: {
      sector: "Financials",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Interest Rates",
      source: "YahooFinance"
    }
  },
  v: {
    whatIs: "Operator of the world's largest electronic payments network, processing billions of transactions annually.",
    strategy: "Practice long-term position building with this steady compounder. (Educational simulation only — not financial advice.)",
    category: "Financial Stock",
    keywords: ["Visa stock trading", "V simulator", "payments", "fintech"],
    stats: {
      sector: "Financials",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "Digital Payments",
      source: "YahooFinance"
    }
  },
  ma: {
    whatIs: "Mastercard Incorporated (MA) is the second-largest payment processor globally. It operates in over 210 countries and continues growing with digital payment adoption.",
    strategy: "MA moves similarly to V—practice pair trading strategies. When one outperforms, consider rebalancing between the two to learn mean reversion.",
    category: "Financial Stock",
    keywords: ["Mastercard stock trading", "MA practice", "credit cards"]
  },
  
  // ETFs
  spy: {
    whatIs: "The world's most traded ETF tracking the S&P 500 index—500 of America's largest companies.",
    strategy: "Practice reading market sentiment through SPY before trading individual stocks. (Educational simulation only — not financial advice.)",
    category: "ETF",
    keywords: ["SPY ETF trading", "S&P 500 practice", "index fund", "benchmark"],
    stats: {
      assetClass: "ETF",
      marketCap: "live_sourced_at_runtime",
      primaryDriver: "US Large-Cap",
      expenseRatio: "0.09%",
      source: "SPDR"
    }
  },
  qqq: {
    whatIs: "Tracks the Nasdaq-100 index, heavily weighted toward technology stocks for concentrated tech exposure.",
    strategy: "Compare QQQ vs SPY performance to gauge tech sentiment and sector rotation. (Educational simulation only — not financial advice.)",
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
    whatIs: "iShares Russell 2000 ETF (IWM) tracks small-cap U.S. stocks. It's often used to gauge risk appetite and domestic economic health.",
    strategy: "IWM leads during risk-on rallies. Practice using IWM as a leading indicator—when small caps outperform, it often signals broader market strength.",
    category: "ETF",
    keywords: ["IWM ETF trading", "small-cap practice", "Russell 2000"]
  },
  dia: {
    whatIs: "SPDR Dow Jones Industrial Average ETF (DIA) tracks the 30 blue-chip stocks in the Dow Jones. It represents established, dividend-paying companies.",
    strategy: "DIA is defensive compared to QQQ. Practice rotating between DIA and QQQ based on economic cycles to learn sector allocation.",
    category: "ETF",
    keywords: ["DIA ETF trading", "Dow Jones practice", "blue chips"]
  },
  voo: {
    whatIs: "Vanguard S&P 500 ETF (VOO) is a low-cost alternative to SPY, tracking the same S&P 500 index. It's popular for long-term investors due to its minimal expense ratio.",
    strategy: "VOO is identical to SPY for price action. Practice comparing bid-ask spreads between VOO and SPY to understand liquidity's impact on execution.",
    category: "ETF",
    keywords: ["VOO ETF trading", "Vanguard practice", "low-cost index"]
  },
  arkk: {
    whatIs: "ARK Innovation ETF (ARKK) is actively managed by Cathie Wood, focusing on disruptive innovation across genomics, AI, fintech, and autonomous vehicles.",
    strategy: "ARKK is extremely volatile—high risk, high reward. Practice position sizing discipline and never allocate more than 3% of your portfolio to high-beta ETFs.",
    category: "ETF",
    keywords: ["ARKK ETF trading", "innovation practice", "Cathie Wood"]
  },
  
  // Forex
  eurusd: {
    whatIs: "EUR/USD is the world's most traded currency pair, representing the exchange rate between the Euro and the US Dollar. It accounts for about 20% of global forex trading volume.",
    strategy: "EUR/USD moves on ECB and Fed policy divergence. Practice correlating central bank speeches with currency movements to master fundamental analysis.",
    category: "Forex",
    keywords: ["EUR/USD trading", "forex practice", "currency pair"]
  },
  gbpusd: {
    whatIs: "The 'Cable' pair, representing the exchange rate between the British Pound and US Dollar.",
    strategy: "Simulate trading during the London/New York session overlap for maximum liquidity. (Educational simulation only — not financial advice.)",
    category: "Forex",
    keywords: ["GBP/USD trading", "Cable practice", "British Pound", "forex major"],
    stats: {
      assetClass: "Forex",
      avgDailyVolume: "live_sourced_at_runtime",
      pipValue: "Variable",
      source: "OANDA"
    }
  },
  usdjpy: {
    whatIs: "The US Dollar against the Japanese Yen—a key carry trade indicator and risk sentiment gauge.",
    strategy: "Practice understanding how interest rate differentials drive currency flows. (Educational simulation only — not financial advice.)",
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
    whatIs: "USD/CHF is the exchange rate between the US Dollar and Swiss Franc. The Swiss Franc is considered a safe-haven currency during market turbulence.",
    strategy: "USD/CHF inversely correlates with market fear. Practice using it as a hedge indicator—when stocks fall, CHF often strengthens.",
    category: "Forex",
    keywords: ["USD/CHF trading", "Swiss Franc practice", "safe haven"]
  },
  audusd: {
    whatIs: "AUD/USD represents the Australian Dollar against the US Dollar. It's heavily influenced by commodity prices, especially iron ore, and Chinese economic data.",
    strategy: "AUD/USD tracks commodity cycles. Practice correlating it with gold and iron ore prices to develop cross-asset analysis skills.",
    category: "Forex",
    keywords: ["AUD/USD trading", "Aussie practice", "commodity currency"]
  },
  
  // Commodities
  gold: {
    whatIs: "The ultimate safe-haven asset. Historically used to hedge against inflation and currency devaluation.",
    strategy: "Educational example: Analyze gold price action during periods of high CPI data or stock market volatility. (Educational purposes only — not financial advice.)",
    category: "Commodity",
    keywords: ["gold trading", "XAU practice", "precious metals", "safe haven", "inflation hedge"],
    stats: {
      assetClass: "Commodity",
      marketCap: "live_sourced_at_runtime",
      correlation: "Inverse to USD",
      source: "OANDA"
    }
  },
  silver: {
    whatIs: "Both a precious metal and industrial commodity, used in electronics, solar panels, and as a store of value.",
    strategy: "Practice trading the gold-silver ratio—when historically high, silver often outperforms. (Educational simulation only — not financial advice.)",
    category: "Commodity",
    keywords: ["silver trading", "XAG practice", "precious metals", "industrial"],
    stats: {
      assetClass: "Commodity",
      marketCap: "live_sourced_at_runtime",
      correlation: "Follows Gold",
      source: "COMEX"
    }
  },
  oil: {
    whatIs: "Crude Oil (WTI), a primary energy commodity and global inflation indicator.",
    strategy: "Analyze price action against OPEC news and inventory reports. (Educational simulation only — not financial advice.)",
    category: "Commodity",
    keywords: ["oil trading", "WTI practice", "crude oil", "energy"],
    stats: {
      assetClass: "Commodity",
      benchmark: "WTI",
      units: "Barrels",
      source: "NYMEX"
    }
  },
  natgas: {
    whatIs: "Natural Gas (NG) is a major energy source for heating and electricity generation. Its price is highly seasonal and influenced by weather patterns.",
    strategy: "Natural gas is extremely volatile seasonally. Practice trading around winter heating demand and summer cooling patterns.",
    category: "Commodity",
    keywords: ["natural gas trading", "NG practice", "energy"]
  },
  copper: {
    whatIs: "Copper (HG) is called 'Dr. Copper' because its price is considered a leading indicator of economic health. It's essential for construction, electronics, and renewable energy.",
    strategy: "Copper leads economic cycles. Practice using copper as a leading indicator—strength often precedes broader market rallies.",
    category: "Commodity",
    keywords: ["copper trading", "HG practice", "industrial metals"]
  }
};

// Generate meta title (< 60 chars)
export function generateAssetMetaTitle(asset: Asset): string {
  const title = `Practice Trading ${asset.name} (${asset.symbol}) | Free $10k Demo`;
  return title.length > 60 ? `Trade ${asset.symbol} | Free $10k Demo - TradeHQ` : title;
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

// Generate meta description (120-155 chars, safely truncated)
export function generateAssetMetaDescription(asset: Asset): string {
  const content = ASSET_CONTENT[asset.id];
  const typeLabel = asset.type === 'crypto' ? 'cryptocurrency' : asset.type;
  
  let description: string;
  if (content) {
    // Use the whatIs description for richer meta tags
    description = `Practice ${asset.symbol} trading risk-free. ${content.whatIs} Start with $10K virtual cash now.`;
  } else {
    description = `Trade ${asset.name} (${asset.symbol}) in our free simulator. Get $10K demo cash, real-time charts, and AI mentoring. No signup needed!`;
  }
  
  return truncateMetaDescription(description, 155);
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
