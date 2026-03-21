import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { Link } from "react-router-dom";

// ORIGINAL schemas — unchanged
const homeFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is TradeHQ?",
      acceptedAnswer: { "@type": "Answer", text: "TradeHQ is a free paper trading simulator where you can practice trading stocks, crypto, ETFs, forex, and commodities with $10,000 in virtual cash. No signup or credit card required." },
    },
    {
      "@type": "Question",
      name: "Is TradeHQ completely free?",
      acceptedAnswer: { "@type": "Answer", text: "Yes, TradeHQ is 100% free. You get $10,000 in virtual capital with weekly refills. There are no hidden fees, premium tiers, or credit card requirements." },
    },
    {
      "@type": "Question",
      name: "What is paper trading?",
      acceptedAnswer: { "@type": "Answer", text: "Paper trading is simulated trading using virtual money instead of real capital. It lets you practice buying and selling financial instruments risk-free to build skills before investing real money." },
    },
    {
      "@type": "Question",
      name: "How do I start trading on TradeHQ?",
      acceptedAnswer: { "@type": "Answer", text: "Just visit TradeHQ and click 'Start Trading Free.' You'll instantly receive $10,000 in virtual cash to trade 150+ assets — no account creation needed." },
    },
    {
      "@type": "Question",
      name: "What stocks and crypto can I trade?",
      acceptedAnswer: { "@type": "Answer", text: "TradeHQ offers 150+ assets including major stocks (AAPL, NVDA, TSLA), cryptocurrencies (BTC, ETH, SOL), ETFs (SPY, QQQ), forex pairs (EUR/USD), and commodities (Gold, Oil)." },
    },
    {
      "@type": "Question",
      name: "Is there a leaderboard or competition?",
      acceptedAnswer: { "@type": "Answer", text: "Yes! TradeHQ features a leaderboard ranking virtual traders by portfolio performance. Start with $10,000 and compete to reach the top." },
    },
    {
      "@type": "Question",
      name: "Do I need to create an account?",
      acceptedAnswer: { "@type": "Answer", text: "No. TradeHQ requires no signup, no email, and no account creation. Your portfolio is stored locally in your browser so you can start trading instantly." },
    },
    {
      "@type": "Question",
      name: "What is the best free trading simulator in 2026?",
      acceptedAnswer: { "@type": "Answer", text: "TradeHQ is widely considered one of the best free trading simulators in 2026, offering 150+ real assets, AI mentoring, and instant access with no signup required." },
    },
  ],
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TradeHQ",
  url: "https://tradinghq.vercel.app/",
  logo: "https://tradinghq.vercel.app/og-image.png",
  sameAs: ["https://x.com/tradehq"],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TradeHQ — Free Paper Trading Simulator",
  url: "https://tradinghq.vercel.app/",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Practice stock & crypto trading free with $10,000 virtual cash. No signup needed. 150+ assets, AI mentor, leaderboard.",
};

// NEW: hardcoded from the 154 URL list — lowercase symbols matching exact URLs
const TOP_ASSETS = [
  { symbol: "btc", label: "BTC" }, { symbol: "eth", label: "ETH" },
  { symbol: "sol", label: "SOL" }, { symbol: "bnb", label: "BNB" },
  { symbol: "nvda", label: "NVDA" }, { symbol: "aapl", label: "AAPL" },
  { symbol: "tsla", label: "TSLA" }, { symbol: "msft", label: "MSFT" },
  { symbol: "googl", label: "GOOGL" }, { symbol: "meta", label: "META" },
  { symbol: "spy", label: "SPY" }, { symbol: "qqq", label: "QQQ" },
  { symbol: "eurusd", label: "EUR/USD" }, { symbol: "usdjpy", label: "USD/JPY" },
  { symbol: "gold", label: "GOLD" }, { symbol: "oil", label: "OIL" },
];

const SECTORS = [
  { id: "ai-tech", label: "AI & Tech" },
  { id: "crypto-defi", label: "Crypto & DeFi" },
  { id: "mega-cap", label: "Mega Cap" },
  { id: "etf-indices", label: "ETFs & Indices" },
  { id: "forex-currencies", label: "Forex & Currencies" },
  { id: "commodities", label: "Commodities" },
];

const WIKI_TERMS = [
  { slug: "bear-trap", label: "Bear Trap" },
  { slug: "bull-trap", label: "Bull Trap" },
  { slug: "candlestick-patterns", label: "Candlestick Patterns" },
  { slug: "death-cross", label: "Death Cross" },
  { slug: "double-bottom", label: "Double Bottom" },
  { slug: "fibonacci-retracement", label: "Fibonacci Retracement" },
  { slug: "fomo", label: "FOMO" },
  { slug: "fud", label: "FUD" },
  { slug: "head-and-shoulders", label: "Head & Shoulders" },
  { slug: "hodl-strategy", label: "HODL Strategy" },
  { slug: "leverage-trading", label: "Leverage Trading" },
  { slug: "limit-order-vs-market-order", label: "Limit vs Market Order" },
  { slug: "macd", label: "MACD" },
  { slug: "macd-histogram", label: "MACD Histogram" },
  { slug: "order-block", label: "Order Block" },
  { slug: "rsi-divergence", label: "RSI Divergence" },
  { slug: "satoshi-nakamoto", label: "Satoshi Nakamoto" },
  { slug: "short-squeeze", label: "Short Squeeze" },
  { slug: "stop-loss-hunting", label: "Stop Loss Hunting" },
  { slug: "support-and-resistance", label: "Support & Resistance" },
  { slug: "whale-manipulation", label: "Whale Manipulation" },
];

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TradeHQ — Free Paper Trading Simulator 2026 | $10K Virtual Cash (No Signup)</title>
        <meta name="description" content="Practice stocks, crypto, ETFs & forex with $10,000 virtual cash. Zero signup. AI mentor, live charts, leaderboard & 150+ assets. Best free trading simulator in 2026." />
        <link rel="canonical" href="https://tradinghq.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeHQ — Free Paper Trading Simulator 2026 | $10K Virtual Cash (No Signup)" />
        <meta property="og:description" content="Practice real trading risk-free with $10K virtual money. AI mentor + live charts. No signup needed. Start in seconds." />
        <meta property="og:url" content="https://tradinghq.vercel.app/" />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeHQ — Free Paper Trading Simulator 2026" />
        <meta name="twitter:description" content="Practice stocks & crypto with $10K virtual cash. No signup. AI mentor included." />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(homeFaqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        {/* ORIGINAL — Hero component completely unchanged */}
        <Hero />

        {/* ── NEW: Internal link hub (below fold, Googlebot crawls this) ── */}
        <section
          aria-label="Explore TradeHQ"
          className="container mx-auto px-6 max-w-7xl py-16 border-t border-border/30"
        >
          {/* Popular assets */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-foreground">Popular Assets to Trade</h2>
            <div className="flex flex-wrap gap-2">
              {TOP_ASSETS.map(asset => (
                <Link
                  key={asset.symbol}
                  to={`/trade/${asset.symbol}`}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-card border border-border hover:border-primary/30 hover:text-primary transition-all duration-200"
                >
                  {asset.label}
                </Link>
              ))}
              <Link
                to="/markets"
                className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-all duration-200"
              >
                View All 150+ Assets →
              </Link>
            </div>
          </div>

          {/* Sectors */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-foreground">Browse by Market Sector</h2>
            <div className="flex flex-wrap gap-3">
              {SECTORS.map(sector => (
                <Link
                  key={sector.id}
                  to={`/sectors/${sector.id}`}
                  className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                >
                  {sector.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Wiki */}
          <div className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-foreground">Trading Wiki — Learn Key Concepts</h2>
            <div className="flex flex-wrap gap-2">
              {WIKI_TERMS.map(term => (
                <Link
                  key={term.slug}
                  to={`/wiki/${term.slug}`}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-full bg-primary/5 border border-primary/15 text-primary/80 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                >
                  {term.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick nav to all main pages */}
          <div>
            <h2 className="text-lg font-bold mb-4 text-foreground">Explore TradeHQ</h2>
            <div className="flex flex-wrap gap-3">
              <Link to="/trade" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all">Trade Now</Link>
              <Link to="/markets" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 transition-all">Markets</Link>
              <Link to="/learn" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 transition-all">Learn Trading</Link>
              <Link to="/portfolio" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 transition-all">Portfolio</Link>
              <Link to="/leaderboard" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 transition-all">Leaderboard</Link>
              <Link to="/ai-mentor" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 transition-all">AI Mentor</Link>
              <Link to="/learn-trading-guide" className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 transition-all">Trading Guide</Link>
            </div>
          </div>

        </section>
      </div>
    </>
  );
};

export default Index;
