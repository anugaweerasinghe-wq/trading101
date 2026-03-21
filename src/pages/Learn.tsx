import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Shield, PieChart, LineChart, Target, ArrowRight, Zap, Coins, Brain, ChevronRight, Home, Clock } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { LEARN_ARTICLES } from "@/lib/learnArticles";
import tradingBasics from "@/assets/course-trading-basics.jpg";
import riskManagement from "@/assets/course-risk-management.jpg";
import technicalAnalysis from "@/assets/course-technical-analysis.jpg";
import diversification from "@/assets/course-diversification.jpg";
import goals from "@/assets/course-goals.jpg";
import marketTrends from "@/assets/course-market-trends.jpg";

const lessons = [
  { id: 1, title: "Getting Started with Trading", category: "Basics", icon: BookOpen, image: tradingBasics, description: "Learn the fundamentals of trading, key terminology, and how markets work.", content: ["Understanding stocks, ETFs, and other securities", "How to read stock quotes and charts", "Market orders vs. limit orders", "Trading hours and market sessions"] },
  { id: 2, title: "Risk Management", category: "Strategy", icon: Shield, image: riskManagement, description: "Essential strategies to protect your capital and manage trading risk.", content: ["Position sizing and the 2% rule", "Stop-loss orders and take-profit targets", "Understanding risk-reward ratios", "Diversification strategies"] },
  { id: 3, title: "Technical Analysis Basics", category: "Analysis", icon: LineChart, image: technicalAnalysis, description: "Learn to read charts and identify trading opportunities using technical indicators.", content: ["Candlestick patterns and what they mean", "Support and resistance levels", "Moving averages (SMA and EMA)", "RSI and MACD indicators"] },
  { id: 4, title: "Portfolio Diversification", category: "Strategy", icon: PieChart, image: diversification, description: "Build a balanced portfolio across different asset classes and sectors.", content: ["Asset allocation strategies", "Balancing stocks, ETFs, and crypto", "Sector diversification", "Rebalancing your portfolio"] },
  { id: 5, title: "Setting Trading Goals", category: "Basics", icon: Target, image: goals, description: "Define clear objectives and develop a trading plan that works for you.", content: ["Short-term vs. long-term strategies", "Setting realistic profit targets", "Creating a trading journal", "Evaluating your performance"] },
  { id: 6, title: "Market Trends & Patterns", category: "Analysis", icon: TrendingUp, image: marketTrends, description: "Identify market trends and learn how to trade with momentum.", content: ["Bull markets vs. bear markets", "Identifying trend reversals", "Volume analysis", "Market sentiment indicators"] },
];

const trendingTopics = [
  { id: "bitcoin-l2", title: "Bitcoin Layer 2", subtitle: "Lightning & Stacks", description: "Master Bitcoin L2 solutions for faster, cheaper transactions.", icon: Zap, badge: "Hot 2026" },
  { id: "rwa", title: "Real World Assets", subtitle: "Tokenized Securities", description: "Explore tokenized treasuries, real estate, and commodities.", icon: Coins, badge: "Trending" },
  { id: "ai-trading", title: "AI-Driven Trading", subtitle: "Smart Strategies", description: "Leverage AI algorithms for market analysis and automated strategies.", icon: Brain, badge: "Innovation" },
];

// NEW: for internal linking
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

const SECTORS = [
  { id: "ai-tech", label: "AI & Tech" },
  { id: "crypto-defi", label: "Crypto & DeFi" },
  { id: "mega-cap", label: "Mega Cap" },
  { id: "etf-indices", label: "ETFs & Indices" },
  { id: "forex-currencies", label: "Forex & Currencies" },
  { id: "commodities", label: "Commodities" },
];

export default function Learn() {
  const navigate = useNavigate();

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "TradeHQ", item: "https://tradinghq.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Learning", item: "https://tradinghq.vercel.app/learn" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Learn Trading 2026 — Free Beginner to Advanced Guides | TradeHQ</title>
        <meta name="description" content="Free trading education 2026: stocks, crypto, technical analysis & risk management. Practice everything with $10K virtual cash. No signup required — TradeHQ." />
        <link rel="canonical" href="https://tradinghq.vercel.app/learn" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Learn Trading 2026 — Free Beginner to Advanced Guides" />
        <meta property="og:description" content="Master trading with free beginner-to-advanced lessons. Practice instantly with $10K virtual cash. No signup required." />
        <meta property="og:url" content="https://tradinghq.vercel.app/learn" />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Learn Trading 2026 — Free Beginner to Advanced Guides" />
        <meta name="twitter:description" content="Free trading education: stocks, crypto, technical analysis & more. Practice with $10K virtual cash." />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-6 max-w-7xl">

            {/* Breadcrumb — ORIGINAL */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in" aria-label="Breadcrumb">
              <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors"><Home className="w-4 h-4" /><span>TradeHQ</span></Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">Learning</span>
            </nav>

            {/* Hero — ORIGINAL */}
            <div className="mb-16 text-center animate-fade-in">
              <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/30 text-primary">2026 Edition</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Learn Trading — Free Beginner to Advanced Guides
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Master stocks, crypto, and market analysis with free guides. No experience needed.
              </p>
            </div>

            {/* Article Cards — ORIGINAL */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" /> Featured Guides
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {LEARN_ARTICLES.map((article) => (
                  <Link key={article.slug} to={`/learn/article/${article.slug}`} className="group bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:scale-[1.02]" style={{ backdropFilter: "blur(12px)" }}>
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    </div>
                    <h3 className="text-base font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{article.summary}</p>
                    <span className="text-sm text-primary font-semibold flex items-center gap-1">Read Article <ArrowRight className="w-4 h-4" /></span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Trending Topics — ORIGINAL */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3"><TrendingUp className="w-6 h-6 text-primary" /> 2026 Market Trends</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <Card key={topic.id} onClick={() => navigate('/learn-trading-guide')} className="group cursor-pointer p-6 bento-card hover:border-primary/30 transition-all duration-300" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="w-6 h-6 text-primary" /></div>
                        <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">{topic.badge}</Badge>
                      </div>
                      <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{topic.title}</h3>
                      <p className="text-sm text-primary mb-3">{topic.subtitle}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Course Grid — ORIGINAL */}
            <h2 className="text-2xl font-bold mb-8">Core Courses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {lessons.map((lesson, index) => {
                const Icon = lesson.icon;
                return (
                  <Card key={lesson.id} onClick={() => navigate(`/learn/${lesson.id}`)} className="group cursor-pointer overflow-hidden border-0 bg-card/50 backdrop-blur-xl hover:shadow-2xl transition-all duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="relative h-80 overflow-hidden">
                      <img src={lesson.image} alt={`${lesson.title} course - TradeHQ`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      <Badge variant="secondary" className="absolute top-6 left-6 bg-background/80 backdrop-blur-sm border-0 text-sm px-4 py-1.5">{lesson.category}</Badge>
                    </div>
                    <div className="p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center"><Icon className="w-7 h-7 text-primary" /></div>
                        <h3 className="text-3xl font-bold group-hover:text-primary transition-colors">{lesson.title}</h3>
                      </div>
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{lesson.description}</p>
                      <ul className="space-y-3 mb-6">
                        {lesson.content.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                        <span>Start Learning</span><ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* ── NEW: Trading Wiki Glossary (internal linking for 21 wiki pages) ── */}
            <section aria-label="Trading Wiki Glossary" className="mb-20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" /> Trading Wiki — Key Concepts
              </h2>
              <p className="text-muted-foreground mb-6">
                Deep-dive guides on the most important trading terms and strategies:
              </p>
              <div className="flex flex-wrap gap-2">
                {WIKI_TERMS.map(term => (
                  <Link
                    key={term.slug}
                    to={`/wiki/${term.slug}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/5 border border-primary/15 text-primary/80 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200"
                  >
                    {term.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* ── NEW: Sector links (internal linking for 6 sector pages) ── */}
            <section aria-label="Market Sectors" className="mb-20">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" /> Explore by Market Sector
              </h2>
              <div className="flex flex-wrap gap-3">
                {SECTORS.map(sector => (
                  <Link
                    key={sector.id}
                    to={`/sectors/${sector.id}`}
                    className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                  >
                    {sector.label} →
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA — ORIGINAL */}
            <Card className="p-12 bg-gradient-to-br from-primary/5 via-background to-background border-primary/10 backdrop-blur-xl">
              <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Start Trading?</h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">Practice these strategies with your $10,000 virtual cash.</p>
                <Link to="/trade">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl min-h-[48px] font-semibold">
                    Start Trading Free <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            </Card>

          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
