import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";

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
  sameAs: ["https://tradinghq.vercel.app/"],
};

const webAppSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "TradeHQ — Free Trading Simulator",
  url: "https://tradinghq.vercel.app/",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web Browser",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  description: "Practice stock & crypto trading free with $10,000 virtual cash. No signup needed.",
};

const Index = () => {
  return (
    <>
      <Helmet>
        <title>TradeHQ — Free Stock & Crypto Trading Simulator | Practice with $10K Virtual Cash</title>
        <meta name="description" content="Practice stock & crypto trading free with $10,000 virtual cash. No signup needed. 150+ real assets, AI mentoring, and a leaderboard. Start trading in seconds — TradeHQ 2026." />
        <link rel="canonical" href="https://tradinghq.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeHQ — Free Stock & Crypto Trading Simulator" />
        <meta property="og:description" content="Practice stock & crypto trading free with $10,000 virtual cash. No signup needed. Start trading in seconds." />
        <meta property="og:url" content="https://tradinghq.vercel.app/" />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeHQ — Free Stock & Crypto Trading Simulator" />
        <meta name="twitter:description" content="Practice trading free with $10,000 virtual cash. No signup needed. 150+ assets." />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(homeFaqSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(orgSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
      </div>
    </>
  );
};

export default Index;
