import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, Shield, PieChart, LineChart, Target, ArrowRight, Zap, Coins, Brain, ChevronRight, Home, Clock, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { LEARN_ARTICLES } from "@/lib/learnArticles";
import tradingBasics from "@/assets/course-trading-basics.jpg";
import riskManagement from "@/assets/course-risk-management.jpg";
import technicalAnalysis from "@/assets/course-technical-analysis.jpg";
import diversification from "@/assets/course-diversification.jpg";
import goals from "@/assets/course-goals.jpg";
import marketTrends from "@/assets/course-market-trends.jpg";

const lessons = [
  { id: 1, title: "Getting Started with Trading", category: "Basics", icon: BookOpen, image: tradingBasics, description: "Learn the fundamentals of trading, key terminology, and how markets work.", difficulty: "Beginner", readTime: "15 min", tier: "foundations" as const, content: ["Understanding stocks, ETFs, and other securities", "How to read stock quotes and charts", "Market orders vs. limit orders", "Trading hours and market sessions"] },
  { id: 5, title: "Setting Trading Goals", category: "Basics", icon: Target, image: goals, description: "Define clear objectives and develop a trading plan that works for you.", difficulty: "Beginner", readTime: "12 min", tier: "foundations" as const, content: ["Short-term vs. long-term strategies", "Setting realistic profit targets", "Creating a trading journal", "Evaluating your performance"] },
  { id: 2, title: "Risk Management", category: "Strategy", icon: Shield, image: riskManagement, description: "Essential strategies to protect your capital and manage trading risk.", difficulty: "Intermediate", readTime: "18 min", tier: "strategy" as const, content: ["Position sizing and the 2% rule", "Stop-loss orders and take-profit targets", "Understanding risk-reward ratios", "Diversification strategies"] },
  { id: 3, title: "Technical Analysis Basics", category: "Analysis", icon: LineChart, image: technicalAnalysis, description: "Learn to read charts and identify trading opportunities using technical indicators.", difficulty: "Intermediate", readTime: "20 min", tier: "strategy" as const, content: ["Candlestick patterns and what they mean", "Support and resistance levels", "Moving averages (SMA and EMA)", "RSI and MACD indicators"] },
  { id: 6, title: "Market Trends & Patterns", category: "Analysis", icon: TrendingUp, image: marketTrends, description: "Identify market trends and learn how to trade with momentum.", difficulty: "Intermediate", readTime: "18 min", tier: "strategy" as const, content: ["Bull markets vs. bear markets", "Identifying trend reversals", "Volume analysis", "Market sentiment indicators"] },
  { id: 4, title: "Portfolio Diversification", category: "Strategy", icon: PieChart, image: diversification, description: "Build a balanced portfolio across different asset classes and sectors.", difficulty: "Advanced", readTime: "22 min", tier: "advanced" as const, content: ["Asset allocation strategies", "Balancing stocks, ETFs, and crypto", "Sector diversification", "Rebalancing your portfolio"] },
];

const trendingTopics = [
  { id: "bitcoin-l2", title: "Bitcoin Layer 2", subtitle: "Lightning & Stacks", description: "Master Bitcoin L2 solutions for faster, cheaper transactions.", icon: Zap, badge: "Hot 2026", href: "/trade/btc" },
  { id: "rwa", title: "Real World Assets", subtitle: "Tokenized Securities", description: "Explore tokenized treasuries, real estate, and commodities.", icon: Coins, badge: "Trending", href: "/learn/article/stock-market-index-etfs" },
  { id: "ai-trading", title: "AI-Driven Trading", subtitle: "Smart Strategies", description: "Leverage AI algorithms for market analysis and automated strategies.", icon: Brain, badge: "Innovation", href: "/ai-mentor" },
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

const SECTORS = [
  { id: "ai-tech", label: "AI & Tech" },
  { id: "crypto-defi", label: "Crypto & DeFi" },
  { id: "mega-cap", label: "Mega Cap" },
  { id: "etf-indices", label: "ETFs & Indices" },
  { id: "forex-currencies", label: "Forex & Currencies" },
  { id: "commodities", label: "Commodities" },
];

const LEARNING_PATH = [
  { tier: "foundations" as const, label: "Foundations", tagline: "Start here — understand markets, terminology, and your first trade.", color: "text-emerald-400", borderColor: "border-emerald-500/20", bgColor: "bg-emerald-500/5" },
  { tier: "strategy" as const, label: "Strategy & Analysis", tagline: "Build your edge — risk management, technical analysis, and market patterns.", color: "text-blue-400", borderColor: "border-blue-500/20", bgColor: "bg-blue-500/5" },
  { tier: "advanced" as const, label: "Advanced Practice", tagline: "Refine your approach — portfolio construction, diversification, and real-world application.", color: "text-amber-400", borderColor: "border-amber-500/20", bgColor: "bg-amber-500/5" },
];

const difficultyColors: Record<string, string> = {
  Beginner: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Intermediate: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Advanced: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default function Learn() {
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

            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 animate-fade-in" aria-label="Breadcrumb">
              <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors"><Home className="w-4 h-4" /><span>TradeHQ</span></Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">Learning</span>
            </nav>

            {/* Hero */}
            <div className="mb-16 text-center animate-fade-in">
              <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/30 text-primary">2026 Edition</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
                Learn Trading — Free Beginner to Advanced Guides
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Master stocks, crypto, and market analysis with structured lessons. No experience needed.
              </p>
            </div>

            {/* Learning Path Overview */}
            <section className="mb-16" aria-label="Learning path">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold">Your Learning Path</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {LEARNING_PATH.map((step, i) => (
                  <div key={step.tier} className={`relative p-5 rounded-2xl border ${step.borderColor} ${step.bgColor} backdrop-blur-sm`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold uppercase tracking-wider ${step.color}`}>Step {i + 1}</span>
                      <span className={`text-sm font-semibold ${step.color}`}>{step.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.tagline}</p>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Follow the path below or jump to any lesson that fits your level.</p>
            </section>

            {/* Start Here CTA */}
            <div className="mb-16 p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col sm:flex-row items-center gap-4" style={{ backdropFilter: "blur(12px)" }}>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-1">New to trading?</h3>
                <p className="text-sm text-muted-foreground">Start with Lesson 1 — it covers everything you need to place your first simulated trade.</p>
              </div>
              <Link to="/learn/1">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-semibold whitespace-nowrap">
                  Start Lesson 1 <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Featured Guides */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" /> Featured Guides
              </h2>
              <p className="text-sm text-muted-foreground mb-6">In-depth articles on essential trading topics — read at your own pace.</p>
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

            {/* 2026 Market Trends — FIXED: onClick replaced with Link */}
            <div className="mb-20">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3"><TrendingUp className="w-6 h-6 text-primary" /> 2026 Market Trends</h2>
              <p className="text-sm text-muted-foreground mb-6">Emerging themes shaping markets this year — explore the trends driving new opportunities.</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {trendingTopics.map((topic, index) => {
                  const Icon = topic.icon;
                  return (
                    <Link key={topic.id} to={topic.href} className="block" style={{ animationDelay: `${index * 100}ms` }}>
                      <Card className="group h-full cursor-pointer p-6 bento-card hover:border-primary/30 transition-all duration-300">
                        <div className="flex items-center justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="w-6 h-6 text-primary" /></div>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">{topic.badge}</Badge>
                        </div>
                        <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">{topic.title}</h3>
                        <p className="text-sm text-primary mb-3">{topic.subtitle}</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{topic.description}</p>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Core Courses — FIXED: onClick replaced with Link */}
            {LEARNING_PATH.map((pathStep) => {
              const tierLessons = lessons.filter((l) => l.tier === pathStep.tier);
              if (tierLessons.length === 0) return null;
              return (
                <section key={pathStep.tier} className="mb-16" aria-label={`${pathStep.label} courses`}>
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`text-xs font-bold uppercase tracking-wider ${pathStep.color}`}>{pathStep.label}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-6">{pathStep.tagline}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {tierLessons.map((lesson) => {
                      const Icon = lesson.icon;
                      return (
                        <Link key={lesson.id} to={`/learn/${lesson.id}`} className="block">
                          <Card className="group cursor-pointer overflow-hidden border-0 bg-card/50 backdrop-blur-xl hover:shadow-2xl transition-all duration-500 h-full">
                            <div className="relative h-48 overflow-hidden">
                              <img src={lesson.image} alt={`${lesson.title} course - TradeHQ`} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                              <div className="absolute top-4 left-4 flex items-center gap-2">
                                <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm border-0 text-xs px-3 py-1">{lesson.category}</Badge>
                                <Badge variant="outline" className={`text-xs px-2 py-0.5 ${difficultyColors[lesson.difficulty]}`}>{lesson.difficulty}</Badge>
                              </div>
                            </div>
                            <div className="p-6">
                              <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><Icon className="w-5 h-5 text-primary" /></div>
                                <div className="flex-1 min-w-0">
                                  <h3 className="text-lg font-bold group-hover:text-primary transition-colors truncate">{lesson.title}</h3>
                                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {lesson.readTime}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{lesson.description}</p>
                              <ul className="space-y-2 mb-4">
                                {lesson.content.slice(0, 3).map((item, i) => (
                                  <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                                    <div className="w-1 h-1 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                              <div className="flex items-center gap-2 text-primary text-sm font-semibold group-hover:gap-3 transition-all">
                                <span>Start Lesson</span><ArrowRight className="w-4 h-4" />
                              </div>
                            </div>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}

            {/* Trading Wiki */}
            <section aria-label="Trading Wiki Glossary" className="mb-20">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-primary" /> Trading Wiki — Key Concepts
              </h2>
              <p className="text-sm text-muted-foreground mb-6">Understand the terms that matter. Each entry explains a concept with examples and context so you can recognize it in real markets.</p>
              <div className="flex flex-wrap gap-2">
                {WIKI_TERMS.map(term => (
                  <Link key={term.slug} to={`/wiki/${term.slug}`} className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-full bg-primary/5 border border-primary/15 text-primary/80 hover:text-primary hover:bg-primary/10 hover:border-primary/30 transition-all duration-200">
                    {term.label}
                  </Link>
                ))}
              </div>
            </section>

            {/* Market Sectors */}
            <section aria-label="Market Sectors" className="mb-20">
              <h2 className="text-2xl font-bold mb-3 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-primary" /> Explore by Market Sector
              </h2>
              <p className="text-sm text-muted-foreground mb-6">Browse assets grouped by sector to spot opportunities and understand how different parts of the market move.</p>
              <div className="flex flex-wrap gap-3">
                {SECTORS.map(sector => (
                  <Link key={sector.id} to={`/sectors/${sector.id}`} className="inline-flex items-center px-5 py-2.5 text-sm font-semibold rounded-xl bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all duration-200">
                    {sector.label} →
                  </Link>
                ))}
              </div>
            </section>

            {/* CTA */}
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
