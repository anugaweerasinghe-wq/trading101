// Unique SEO content for each asset - Anti-thin content blocks
import { Asset } from './types';

interface AssetContent {
  whatIs: string; // Block A: What is [AssetName]?
  strategy: string; // Block B: Simulator Strategy
  category: string;
  keywords: string[];
}

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
    whatIs: "Bitcoin (BTC) is the world's first and largest cryptocurrency, created in 2009 by the pseudonymous Satoshi Nakamoto. It operates on a decentralized blockchain network, enabling peer-to-peer transactions without intermediaries.",
    strategy: "Practice dollar-cost averaging (DCA) by buying small amounts regularly. Bitcoin's volatility makes it ideal for learning support/resistance levels and understanding market cycles.",
    category: "Cryptocurrency",
    keywords: ["Bitcoin trading", "BTC simulator", "crypto practice"]
  },
  eth: {
    whatIs: "Ethereum (ETH) is the second-largest cryptocurrency and the leading smart contract platform. It powers thousands of decentralized applications (dApps), DeFi protocols, and NFT marketplaces.",
    strategy: "Monitor ETH's correlation with BTC while watching for independent catalysts like network upgrades. Practice trading ETH during high-volume periods for realistic spread simulation.",
    category: "Cryptocurrency",
    keywords: ["Ethereum trading", "ETH simulator", "smart contracts"]
  },
  sol: {
    whatIs: "Solana (SOL) is a high-performance blockchain known for its fast transaction speeds and low fees. It has become a major platform for DeFi, NFTs, and gaming applications.",
    strategy: "Solana is more volatile than BTC/ETH—perfect for practicing quick entries and exits. Set tight stop-losses and aim for 5-10% gains to build discipline.",
    category: "Cryptocurrency",
    keywords: ["Solana trading", "SOL practice", "fast blockchain"]
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
    whatIs: "Microsoft Corporation (MSFT) is a technology giant leading in cloud computing (Azure), enterprise software, and AI. It's the second-largest company by market capitalization.",
    strategy: "MSFT is less volatile than peers—ideal for practicing position sizing. Build confidence with smaller percentage moves before trading more volatile stocks.",
    category: "Technology Stock",
    keywords: ["Microsoft stock trading", "MSFT practice", "cloud computing"]
  },
  googl: {
    whatIs: "Alphabet Inc. (GOOGL) is the parent company of Google, dominating search, advertising, YouTube, and cloud services. It's also a major player in AI development.",
    strategy: "GOOGL responds to AI and ad revenue narratives. Practice trading breakouts above resistance levels during positive analyst coverage or AI announcements.",
    category: "Technology Stock",
    keywords: ["Google stock trading", "GOOGL simulator", "search advertising"]
  },
  amzn: {
    whatIs: "Amazon.com Inc. (AMZN) leads in e-commerce and cloud computing through AWS. It's constantly expanding into new sectors including healthcare, streaming, and logistics.",
    strategy: "AMZN moves big on earnings and Prime Day announcements. Practice calculating risk-reward ratios and setting realistic profit targets around key events.",
    category: "Technology Stock",
    keywords: ["Amazon stock trading", "AMZN practice", "e-commerce giant"]
  },
  nvda: {
    whatIs: "NVIDIA Corporation (NVDA) designs GPUs that power gaming, AI, and data centers. The AI boom has made it one of the most valuable and volatile tech stocks.",
    strategy: "NVDA is highly volatile—perfect for learning momentum trading. Practice identifying overbought/oversold conditions using RSI and MACD indicators.",
    category: "Technology Stock",
    keywords: ["NVIDIA stock trading", "NVDA simulator", "AI chips"]
  },
  tsla: {
    whatIs: "Tesla Inc. (TSLA) is the world's most valuable automaker, leading in electric vehicles and energy storage. It's known for high volatility driven by CEO Elon Musk's public statements.",
    strategy: "TSLA is the ultimate volatility trainer. Practice managing emotions during rapid price swings and never use more than 5% of your portfolio on a single TSLA position.",
    category: "Technology Stock",
    keywords: ["Tesla stock trading", "TSLA practice", "electric vehicles"]
  },
  meta: {
    whatIs: "Meta Platforms Inc. (META) owns Facebook, Instagram, and WhatsApp, and is investing heavily in virtual reality and the metaverse. It generates most revenue from digital advertising.",
    strategy: "META is sensitive to ad revenue and user growth metrics. Practice reading earnings transcripts and correlating specific metrics with price action.",
    category: "Technology Stock",
    keywords: ["Meta stock trading", "META simulator", "social media"]
  },
  nflx: {
    whatIs: "Netflix Inc. (NFLX) is the world's largest streaming entertainment service with over 200 million subscribers. It produces original content and competes with Disney+, HBO Max, and others.",
    strategy: "NFLX has large post-earnings moves. Practice paper trading earnings plays—buy puts or calls before earnings to understand options-like risk without real money.",
    category: "Technology Stock",
    keywords: ["Netflix stock trading", "NFLX practice", "streaming"]
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
    whatIs: "JPMorgan Chase & Co. (JPM) is America's largest bank by assets. It operates in consumer banking, investment banking, and asset management worldwide.",
    strategy: "JPM tracks interest rate expectations closely. Practice correlating Fed announcements with bank stock movements to understand macro trading.",
    category: "Financial Stock",
    keywords: ["JPMorgan stock trading", "JPM practice", "banking"]
  },
  v: {
    whatIs: "Visa Inc. (V) operates the world's largest electronic payments network. It processes billions of transactions annually and benefits from the global shift to cashless payments.",
    strategy: "Visa is a steady compounder—ideal for practicing long-term position building. Practice adding to winners instead of averaging down on losers.",
    category: "Financial Stock",
    keywords: ["Visa stock trading", "V simulator", "payments"]
  },
  ma: {
    whatIs: "Mastercard Incorporated (MA) is the second-largest payment processor globally. It operates in over 210 countries and continues growing with digital payment adoption.",
    strategy: "MA moves similarly to V—practice pair trading strategies. When one outperforms, consider rebalancing between the two to learn mean reversion.",
    category: "Financial Stock",
    keywords: ["Mastercard stock trading", "MA practice", "credit cards"]
  },
  
  // ETFs
  spy: {
    whatIs: "SPDR S&P 500 ETF Trust (SPY) tracks the S&P 500 index, representing 500 of America's largest companies. It's the world's most traded ETF with massive liquidity.",
    strategy: "SPY is the perfect starting point for beginners. Practice reading market sentiment through SPY before trading individual stocks—it teaches index-level thinking.",
    category: "ETF",
    keywords: ["SPY ETF trading", "S&P 500 practice", "index fund"]
  },
  qqq: {
    whatIs: "Invesco QQQ Trust (QQQ) tracks the Nasdaq-100 index, heavily weighted toward technology stocks. It's popular for tech sector exposure without individual stock risk.",
    strategy: "QQQ is more volatile than SPY—perfect for practicing sector rotation. Compare QQQ vs SPY performance to gauge tech sentiment.",
    category: "ETF",
    keywords: ["QQQ ETF trading", "Nasdaq practice", "tech ETF"]
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
    whatIs: "GBP/USD (Cable) is the exchange rate between the British Pound and US Dollar. It's the third most traded currency pair and is influenced by UK economic data and Brexit developments.",
    strategy: "GBP/USD is volatile during London market hours. Practice trading the London-New York overlap (8 AM - 12 PM EST) for maximum liquidity.",
    category: "Forex",
    keywords: ["GBP/USD trading", "Cable practice", "British Pound"]
  },
  usdjpy: {
    whatIs: "USD/JPY represents the US Dollar against the Japanese Yen. It's influenced by interest rate differentials between the Fed and Bank of Japan, and serves as a risk sentiment indicator.",
    strategy: "USD/JPY is a carry trade indicator. Practice understanding how interest rate differentials drive currency flows over medium-term periods.",
    category: "Forex",
    keywords: ["USD/JPY trading", "Yen practice", "carry trade"]
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
    whatIs: "Gold (XAU) is a precious metal considered the ultimate safe-haven asset. It's used as a hedge against inflation, currency devaluation, and geopolitical uncertainty.",
    strategy: "Gold moves inversely to real interest rates. Practice correlating gold with Treasury yields to understand macro hedging strategies.",
    category: "Commodity",
    keywords: ["gold trading", "XAU practice", "precious metals"]
  },
  silver: {
    whatIs: "Silver (XAG) is both a precious metal and industrial commodity. It's more volatile than gold and is used in electronics, solar panels, and as a store of value.",
    strategy: "Silver has higher beta than gold. Practice trading the gold-silver ratio—when it's historically high, silver often outperforms.",
    category: "Commodity",
    keywords: ["silver trading", "XAG practice", "precious metals"]
  },
  oil: {
    whatIs: "Crude Oil WTI (West Texas Intermediate) is the primary U.S. oil benchmark. Oil prices impact everything from transportation costs to inflation expectations.",
    strategy: "Oil is geopolitically sensitive. Practice monitoring OPEC announcements and inventory reports to develop event-driven trading skills.",
    category: "Commodity",
    keywords: ["oil trading", "WTI practice", "crude oil"]
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

// Generate meta description (120-160 chars)
export function generateAssetMetaDescription(asset: Asset): string {
  const content = ASSET_CONTENT[asset.id];
  const typeLabel = asset.type === 'crypto' ? 'cryptocurrency' : asset.type;
  
  if (content) {
    return `🚀 Practice ${asset.symbol} trading risk-free! Learn ${typeLabel} strategies with $10K virtual cash. Real charts, zero risk. Start now →`;
  }
  
  return `📈 Trade ${asset.name} (${asset.symbol}) in our free simulator. Get $10K demo cash, real-time charts, and AI mentoring. No signup needed!`;
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
