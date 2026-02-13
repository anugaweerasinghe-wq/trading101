import { Navigation } from "@/components/Navigation";
import { MarketSentimentTicker } from "@/components/MarketSentimentTicker";
import { CompoundCalculator } from "@/components/CompoundCalculator";
import { LearningProgressTracker } from "@/components/LearningProgressTracker";
import { CredibilityFooter } from "@/components/CredibilityFooter";
import { SocialShare } from "@/components/SocialShare";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  TrendingUp, 
  Shield, 
  BarChart3, 
  Coins, 
  Globe, 
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Target,
  AlertTriangle,
  Brain,
  Bot,
  Layers,
  Sparkles,
  LineChart,
  Zap
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const DOMAIN = "https://tradinghq.vercel.app";

const LearnTradingGuide = () => {
  // FinancialService Schema for GEO
  const financialServiceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "TradeHQ",
    "description": "AI-powered financial education platform with risk-free trading simulator for beginners",
    "url": DOMAIN,
    "logo": `${DOMAIN}/og-image.png`,
    "areaServed": "Worldwide",
    "serviceType": ["Trading Education", "Investment Simulator", "Financial Literacy"],
    "provider": {
      "@type": "EducationalOrganization",
      "name": "TradeHQ",
      "url": DOMAIN
    }
  };

  // EducationalOrganization Schema
  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "TradeHQ",
    "description": "Premier AI-powered trading education platform offering courses on stocks, crypto, forex, and risk management",
    "url": DOMAIN,
    "logo": `${DOMAIN}/og-image.png`,
    
  };

  // Article Schema optimized for 2026
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "AI-Assisted Trading for Beginners: Complete 2026 Guide to Stocks, Crypto & Tokenized Securities",
    "description": "Master trading in 2026 with our comprehensive guide. Learn AI-assisted trading, Bitcoin Layer 2 investing, tokenized securities, and practice risk-free with our $10K crypto simulator.",
    "author": {
      "@type": "Organization",
      "name": "TradeHQ Editorial Team",
      "url": DOMAIN
    },
    "publisher": {
      "@type": "Organization",
      "name": "TradeHQ",
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/og-image.png`
      }
    },
    "datePublished": "2026-01-13",
    "dateModified": "2026-01-13",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${DOMAIN}/learn-trading-guide`
    },
    "image": `${DOMAIN}/og-image.png`,
    "keywords": "AI-assisted trading for beginners, Bitcoin Layer 2 investment guide, Risk-free $10k Crypto Simulator, Tokenized Securities 101, trading psychology 2026, AI trading bot safety"
  };

  // HowTo Schema
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Start AI-Assisted Trading in 2026",
    "description": "A step-by-step guide to starting your trading journey with AI tools and simulators in 2026.",
    "image": `${DOMAIN}/og-image.png`,
    "totalTime": "PT30M",
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": "0"
    },
    "step": [
      {
        "@type": "HowToStep",
        "name": "Learn AI-Assisted Trading Basics",
        "text": "Understand how AI trading bots work and their limitations before using them with real capital."
      },
      {
        "@type": "HowToStep",
        "name": "Practice with $10K Risk-Free Simulator",
        "text": "Use TradeHQ's free trading simulator to practice strategies with virtual money across 150+ assets."
      },
      {
        "@type": "HowToStep",
        "name": "Master Bitcoin Layer 2 & Tokenized Securities",
        "text": "Learn the 2026 trends including Bitcoin Layer 2 solutions and tokenized securities investing."
      },
      {
        "@type": "HowToStep",
        "name": "Develop Trading Psychology",
        "text": "Build emotional discipline and learn to manage fear and greed in volatile markets."
      },
      {
        "@type": "HowToStep",
        "name": "Start Small with Risk Management",
        "text": "Apply the 1-2% rule and use stop-losses to protect capital when trading with real money."
      }
    ]
  };

  // FAQ Schema for Rich Snippets - Consolidated all 8 FAQs into single schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is AI-assisted trading for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI-assisted trading uses artificial intelligence algorithms to analyze market data, identify patterns, and suggest trading opportunities. For beginners, AI tools can help with market analysis, risk assessment, and automated trade execution. However, beginners should always practice with a simulator first and understand that AI tools have limitations and risks."
        }
      },
      {
        "@type": "Question",
        "name": "Is Bitcoin Layer 2 a good investment in 2026?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bitcoin Layer 2 solutions like Lightning Network offer faster, cheaper transactions than the main Bitcoin blockchain. In 2026, these solutions have matured significantly, offering investment opportunities through related tokens and infrastructure. However, all crypto investments carry substantial risk—practice with a simulator before investing real money."
        }
      },
      {
        "@type": "Question",
        "name": "What are tokenized securities and how do they work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tokenized securities are traditional financial assets (stocks, bonds, real estate) represented as blockchain tokens. They offer fractional ownership, 24/7 trading, and instant settlement. In 2026, major exchanges offer tokenized versions of stocks and commodities, making investing more accessible to beginners with smaller capital."
        }
      },
      {
        "@type": "Question",
        "name": "How can I practice trading without risking real money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "TradeHQ offers a free trading simulator with $10,000 in virtual money. You can trade 150+ real assets including stocks, crypto, and ETFs with realistic price movements. This is the safest way to learn trading strategies, test AI trading bots, and build confidence before using real capital."
        }
      },
      {
        "@type": "Question",
        "name": "Are AI trading bots safe for beginners?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "AI trading bots can be useful tools but carry risks. Many scam bots promise unrealistic returns. Safe use requires: 1) Only using reputable, regulated platforms, 2) Starting with paper trading, 3) Never investing more than you can afford to lose, 4) Understanding the bot's strategy, and 5) Maintaining human oversight of all trades."
        }
      },
      {
        "@type": "Question",
        "name": "How does virtual trading work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Virtual trading on TradeHQ simulates market conditions using $10,000 in demo cash. You can buy and sell 150+ assets including stocks, crypto, ETFs, and commodities with simulated price data. All trades are executed instantly with no real money at risk, allowing you to practice strategies and learn market dynamics before investing real capital."
        }
      },
      {
        "@type": "Question",
        "name": "What is Bitcoin L2?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Bitcoin Layer 2 (L2) refers to secondary protocols built on top of the Bitcoin blockchain to enable faster, cheaper transactions. Popular L2 solutions include the Lightning Network for instant payments and Stacks (STX) for smart contracts. These solutions inherit Bitcoin's security while adding scalability and programmability, making them ideal for trading and DeFi applications."
        }
      },
      {
        "@type": "Question",
        "name": "Is TradeHQ free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, TradeHQ is completely free to use. You get $10,000 in virtual capital to practice trading with no signup required. We also provide weekly $10K refills so you can continue learning indefinitely. There are no hidden fees, subscriptions, or premium tiers—all features including AI-powered education and simulated market data are available to everyone."
        }
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": DOMAIN
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Learn",
        "item": `${DOMAIN}/learn`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "AI-Assisted Trading Guide 2026",
        "item": `${DOMAIN}/learn-trading-guide`
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>AI-Assisted Trading for Beginners | Risk-Free $10K Simulator | 2026 Guide</title>
        <meta 
          name="description" 
          content="Master AI-assisted trading in 2026. Learn Bitcoin Layer 2, tokenized securities & trading psychology. Practice with our free $10K crypto simulator—no risk, real skills." 
        />
        <link rel="canonical" href={`${DOMAIN}/learn-trading-guide`} />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="I9Z6Vo-t00zuqHRrR_RFgAZ14hsA5YzA0gHeK2POL-I" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="AI-Assisted Trading for Beginners: Master the 2026 Markets Risk-Free" />
        <meta property="og:description" content="Learn AI trading, Bitcoin Layer 2, tokenized securities & trading psychology. Practice with $10K virtual money on 150+ assets. Free forever." />
        <meta property="og:url" content={`${DOMAIN}/learn-trading-guide`} />
        <meta property="og:site_name" content="TradeHQ" />
        <meta property="og:image" content={`${DOMAIN}/og-image.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TradeHQ - AI-Assisted Trading Guide for 2026" />
        <meta property="article:published_time" content="2026-01-13T00:00:00Z" />
        <meta property="article:modified_time" content="2026-01-14T00:00:00Z" />
        <meta property="article:author" content="TradeHQ Editorial Team" />
        <meta property="article:section" content="Trading Education" />
        <meta property="article:tag" content="AI Trading" />
        <meta property="article:tag" content="Bitcoin Layer 2" />
        <meta property="article:tag" content="Tokenized Securities" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tradehq" />
        <meta name="twitter:creator" content="@tradehq" />
        <meta name="twitter:title" content="AI-Assisted Trading for Beginners | Free $10K Simulator" />
        <meta name="twitter:description" content="Master 2026 trading: AI tools, Bitcoin L2, tokenized securities. Practice risk-free with $10K virtual money. Start now!" />
        <meta name="twitter:image" content={`${DOMAIN}/og-image.png`} />
        <meta name="twitter:image:alt" content="TradeHQ - The AI-Powered Trading Education Hub" />
        
        {/* Additional SEO Meta */}
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="author" content="TradeHQ Editorial Team" />
        <meta name="keywords" content="AI-assisted trading for beginners, Bitcoin Layer 2 investment guide, Risk-free $10k Crypto Simulator, Tokenized Securities 101, trading psychology, AI trading bot safety, learn trading 2026" />
        
        <script type="application/ld+json">
          {JSON.stringify(financialServiceSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(educationalOrgSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <MarketSentimentTicker />
        <div className="pt-10">
          <Navigation />
        </div>
        
        {/* Hero Section - Answer First for SGE/AI Overviews */}
        <header className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              {/* Answer-First Content Block for AI Overviews */}
              <div className="bg-card/80 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 mb-8 text-left">
                <Badge className="mb-3 bg-profit/20 text-profit border-profit/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Featured Answer
                </Badge>
                <p className="text-lg font-medium leading-relaxed">
                  <strong>AI-assisted trading</strong> uses algorithms to analyze markets and suggest trades. 
                  Beginners should start with a <strong>risk-free simulator</strong> (like TradeHQ's $10K demo) 
                  to practice before using real money. In 2026, focus on <strong>Bitcoin Layer 2</strong>, 
                  <strong>tokenized securities</strong>, and always apply the <strong>1-2% risk rule</strong> per trade.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-card/50 border border-border backdrop-blur-sm">
                <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                <span className="text-sm text-muted-foreground">Complete 2026 Trading Education</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                AI-Assisted Trading for Beginners:
                <br />
                <span className="text-gradient-gold">Your Risk-Free $10K Simulator Guide</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Master Bitcoin Layer 2 investing, tokenized securities, and AI trading bot safety. 
                Practice with 150+ real assets using our free simulator—no risk, real skills.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/trade">
                  <Button size="lg" className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold">
                    Start $10K Risk-Free Simulator
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </Link>
              </div>

              <SocialShare 
                title="I'm learning AI-assisted trading on TradeHQ! 🚀"
                description="Master 2026 trading with a free $10K simulator"
                variant="compact"
              />
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16">
          {/* Learning Progress Tracker */}
          <section className="max-w-4xl mx-auto mb-20">
            <LearningProgressTracker />
          </section>

          {/* Table of Contents - Topic Cluster */}
          <nav className="max-w-4xl mx-auto mb-16" aria-label="Table of Contents">
            <Card className="p-8 bg-card/50 border-border">
              <h2 className="text-2xl font-bold mb-6">2026 Trading Mastery Roadmap</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <a href="#what-is-trading" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  What is AI-Assisted Trading?
                </a>
                <a href="#types-of-markets" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  2026 Markets: Crypto, Tokenized Securities & More
                </a>
                <a href="#bitcoin-layer2" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  Bitcoin Layer 2 Investment Guide
                </a>
                <a href="#ai-trading-safety" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  AI Trading Bot Safety
                </a>
                <a href="#psychology" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  Psychology of Trading
                </a>
                <a href="#risk-management" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  Risk Management Mastery
                </a>
                <a href="#market-outlook" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  2026 Market Outlook
                </a>
                <a href="#getting-started" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors p-3 rounded-lg hover:bg-primary/5">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                  Start Your $10K Practice Journey
                </a>
              </div>
            </Card>
          </nav>

          {/* Section 1: What is AI-Assisted Trading? */}
          <section id="what-is-trading" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Bot className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">What is AI-Assisted Trading?</h2>
                <p className="text-muted-foreground">The beginner's gateway to algorithmic markets</p>
              </div>
            </div>
            
            {/* Answer-First Paragraph */}
            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-lg leading-relaxed">
                <strong>AI-assisted trading uses artificial intelligence to analyze market patterns, predict price movements, 
                and execute trades automatically.</strong> For beginners in 2026, AI tools can scan thousands of assets in seconds, 
                identify opportunities, and manage risk—but they're not magic. The best approach is to practice with a 
                <Link to="/trade" className="text-primary hover:underline font-semibold"> risk-free simulator</Link> first, 
                then gradually incorporate AI tools as you learn.
              </p>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Trading is the act of buying and selling financial assets—like stocks, currencies, or cryptocurrencies—with 
                the goal of making a profit. In 2026, AI has transformed how traders analyze markets, but the fundamentals 
                remain the same: buy low, sell high, and manage your risk carefully.
              </p>

              <Card className="p-6 bg-card/50 border-border mb-8">
                <h3 className="text-xl font-semibold mb-4">Key 2026 Trading Concepts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground"><strong className="text-foreground">AI Market Scanners:</strong> Algorithms that identify trading opportunities 24/7</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Tokenized Assets:</strong> Traditional securities represented as blockchain tokens</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Layer 2 Scaling:</strong> Faster, cheaper crypto transactions for active trading</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" aria-hidden="true" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Sentiment Analysis:</strong> AI that reads news and social media to predict price moves</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Section 2: 2026 Markets */}
          <section id="types-of-markets" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">2026 Markets: Where to Trade</h2>
                <p className="text-muted-foreground">Stocks, Crypto, Tokenized Securities & Beyond</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              The 2026 trading landscape offers more opportunities than ever. Traditional markets now trade alongside 
              tokenized securities, while Bitcoin Layer 2 solutions have made crypto trading faster and cheaper.
            </p>

            <div className="grid gap-6">
              <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Stocks & ETFs</h3>
                    <p className="text-muted-foreground mb-4">
                      The foundation of most portfolios. In 2026, AI-powered stock screeners can analyze 
                      thousands of companies instantly. ETFs offer diversified exposure to sectors like 
                      AI, clean energy, and emerging markets—perfect for beginners.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Best for Beginners</Badge>
                      <Badge variant="outline">Long-term Growth</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card id="bitcoin-layer2" className="p-8 bg-gradient-to-r from-[#F7931A]/10 to-transparent border-[#F7931A]/30 hover:border-[#F7931A]/50 transition-colors scroll-mt-24">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-[#F7931A]/20 flex items-center justify-center shrink-0">
                    <Layers className="w-6 h-6 text-[#F7931A]" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Bitcoin Layer 2 Investment Guide</h3>
                    <p className="text-muted-foreground mb-4">
                      <strong>Bitcoin Layer 2 solutions like Lightning Network enable instant, near-free Bitcoin transactions.</strong> 
                      In 2026, L2 tokens and infrastructure projects offer compelling investment opportunities. Key players include 
                      Stacks (STX), Lightning Labs, and RGB Protocol. Always practice with our 
                      <Link to="/trade" className="text-primary hover:underline"> crypto simulator</Link> before investing real BTC.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F7931A]" aria-hidden="true" />
                        Sub-second transaction finality
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F7931A]" aria-hidden="true" />
                        Fees under $0.01 per transaction
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#F7931A]" aria-hidden="true" />
                        Smart contracts on Bitcoin
                      </li>
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      <Badge className="bg-[#F7931A]/20 text-[#F7931A] border-[#F7931A]/30">High Growth Potential</Badge>
                      <Badge variant="outline">Higher Risk</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-profit/20 flex items-center justify-center shrink-0">
                    <Coins className="w-6 h-6 text-profit" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Tokenized Securities 101</h3>
                    <p className="text-muted-foreground mb-4">
                      <strong>Tokenized securities are traditional assets (stocks, bonds, real estate) on the blockchain.</strong> 
                      They offer 24/7 trading, instant settlement, and fractional ownership. In 2026, you can buy $10 of 
                      Apple stock or 0.001% of a Manhattan building. Major exchanges now offer tokenized versions of S&P 500 stocks.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">Fractional Ownership</Badge>
                      <Badge variant="outline">24/7 Trading</Badge>
                      <Badge variant="outline">Instant Settlement</Badge>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Forex & Commodities</h3>
                    <p className="text-muted-foreground mb-4">
                      Currency pairs and commodities remain essential for diversification. AI trading bots excel 
                      at forex due to the market's 24/5 schedule and high liquidity. Gold and oil continue to be 
                      safe-haven assets during market volatility.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">High Liquidity</Badge>
                      <Badge variant="outline">24/5 Trading</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 3: AI Trading Bot Safety */}
          <section id="ai-trading-safety" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-destructive/20 flex items-center justify-center">
                <Bot className="w-7 h-7 text-destructive" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">AI Trading Bot Safety</h2>
                <p className="text-muted-foreground">Protect yourself from scams and losses</p>
              </div>
            </div>

            <Card className="p-8 bg-destructive/10 border-destructive/30 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">Critical Warning for 2026</h3>
                  <p className="text-muted-foreground">
                    AI trading bot scams have increased 400% since 2024. Any bot promising "guaranteed returns" 
                    or "no-loss trading" is a scam. Legitimate AI tools are supplements to your strategy, not 
                    replacements for learning. Always practice with a 
                    <Link to="/trade" className="text-primary hover:underline font-semibold"> free simulator</Link> first.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-profit">
                  <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                  Safe AI Trading Practices
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-profit">✓</span>
                    Use regulated, reputable platforms only
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-profit">✓</span>
                    Start with paper trading / simulators
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-profit">✓</span>
                    Understand the bot's strategy before using
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-profit">✓</span>
                    Set strict stop-losses and position limits
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-profit">✓</span>
                    Monitor trades daily, don't "set and forget"
                  </li>
                </ul>
              </Card>

              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2 text-destructive">
                  <AlertTriangle className="w-5 h-5" aria-hidden="true" />
                  Red Flags to Avoid
                </h3>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Promises of "guaranteed" or "risk-free" returns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Claims of 100%+ monthly returns
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Pressure to deposit quickly or recruit others
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Anonymous teams or unverifiable track records
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-destructive">✗</span>
                    Requests for private keys or wallet access
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Section 4: Psychology of Trading */}
          <section id="psychology" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Brain className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Psychology of Trading</h2>
                <p className="text-muted-foreground">Master your emotions before mastering markets</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
              <p className="text-lg leading-relaxed">
                <strong>Trading psychology is more important than any strategy.</strong> Studies show that 80% of losing 
                traders fail due to emotional decisions, not bad analysis. Fear causes selling at bottoms; greed causes 
                buying at tops. The <Link to="/trade" className="text-primary hover:underline">simulator</Link> is your 
                training ground for building emotional discipline.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border">
                <div className="text-3xl mb-4">😨</div>
                <h3 className="text-xl font-semibold mb-2">Fear</h3>
                <p className="text-muted-foreground text-sm">
                  Causes panic selling during dips. Solution: Set stop-losses in advance and stick to your plan.
                </p>
              </Card>
              <Card className="p-6 bg-card/50 border-border">
                <div className="text-3xl mb-4">🤑</div>
                <h3 className="text-xl font-semibold mb-2">Greed</h3>
                <p className="text-muted-foreground text-sm">
                  Leads to overleveraging and holding too long. Solution: Take profits at predetermined targets.
                </p>
              </Card>
              <Card className="p-6 bg-card/50 border-border">
                <div className="text-3xl mb-4">😤</div>
                <h3 className="text-xl font-semibold mb-2">Revenge Trading</h3>
                <p className="text-muted-foreground text-sm">
                  Trying to recover losses with bigger bets. Solution: Take breaks after losses; journal your emotions.
                </p>
              </Card>
            </div>

            <Card className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/20">
              <h3 className="text-xl font-semibold mb-4">Build Discipline with Practice</h3>
              <p className="text-muted-foreground mb-4">
                Our trading simulator includes a 
                <Link to="/portfolio" className="text-primary hover:underline"> trading journal</Link> with emotion tracking 
                and AI-powered psychology analysis. Track your emotional patterns and learn to trade rationally.
              </p>
              <Link to="/trade">
                <Button>Practice Emotional Discipline Free</Button>
              </Link>
            </Card>
          </section>

          {/* Section 5: Risk Management */}
          <section id="risk-management" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Risk Management Mastery</h2>
                <p className="text-muted-foreground">The #1 skill separating winners from losers</p>
              </div>
            </div>
            
            <Card className="p-8 bg-destructive/10 border-destructive/30 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">The Golden Rule of Trading</h3>
                  <p className="text-muted-foreground">
                    <strong>Never risk more than 1-2% of your total capital on a single trade.</strong> With a $10,000 account, 
                    that means risking maximum $100-200 per trade. This ensures even 10 consecutive losses won't wipe you out.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" aria-hidden="true" />
                  Stop-Loss Orders
                </h3>
                <p className="text-muted-foreground">
                  Automatically exit losing positions at a predetermined price. Set these BEFORE entering any trade. 
                  Never move a stop-loss further away to "give it more room."
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" aria-hidden="true" />
                  Position Sizing
                </h3>
                <p className="text-muted-foreground">
                  Calculate trade size based on your stop-loss distance. If risking 1% ($100) with a $2 stop-loss, 
                  your position size is 50 shares maximum.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" aria-hidden="true" />
                  Diversification
                </h3>
                <p className="text-muted-foreground">
                  Spread risk across different assets, sectors, and markets. Don't put more than 20% in any single 
                  position. Mix stocks, crypto, and tokenized securities.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" aria-hidden="true" />
                  Risk-Reward Ratio
                </h3>
                <p className="text-muted-foreground">
                  Only take trades where potential profit is at least 2x the potential loss. With a 2:1 ratio, 
                  you're profitable even winning only 40% of trades.
                </p>
              </Card>
            </div>
          </section>

          {/* Compound Calculator Widget */}
          <section className="max-w-4xl mx-auto mb-20">
            <CompoundCalculator />
          </section>

          {/* Section 6: 2026 Market Outlook */}
          <section id="market-outlook" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <LineChart className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">2026 Market Outlook</h2>
                <p className="text-muted-foreground">Key trends shaping trading this year</p>
              </div>
            </div>

            <div className="grid gap-6">
              <Card className="p-6 bg-gradient-to-r from-profit/10 to-transparent border-profit/30">
                <div className="flex items-start gap-4">
                  <Zap className="w-6 h-6 text-profit shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">AI Integration Everywhere</h3>
                    <p className="text-muted-foreground">
                      Every major brokerage now offers AI-powered analysis. Focus on platforms that integrate AI 
                      as a tool, not those promising AI to "trade for you."
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-[#F7931A]/10 to-transparent border-[#F7931A]/30">
                <div className="flex items-start gap-4">
                  <Layers className="w-6 h-6 text-[#F7931A] shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Bitcoin's Institutional Adoption</h3>
                    <p className="text-muted-foreground">
                      Major corporations and governments now hold Bitcoin. Layer 2 solutions have made it practical 
                      for everyday transactions. The volatility is lower than 2021 but still requires caution.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-primary/10 to-transparent border-primary/30">
                <div className="flex items-start gap-4">
                  <Globe className="w-6 h-6 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Tokenized Everything</h3>
                    <p className="text-muted-foreground">
                      Real estate, art, commodities, and stocks are all available as tokens. 24/7 global markets 
                      with instant settlement are the new normal. Start learning now.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 7: Getting Started */}
          <section id="getting-started" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-primary" aria-hidden="true" />
              </div>
              <div>
                <h2 className="text-4xl font-bold">Start Your $10K Practice Journey</h2>
                <p className="text-muted-foreground">From zero to confident trader</p>
              </div>
            </div>

            <ol className="space-y-6">
              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  1
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Master the Basics Above</h3>
                  <p className="text-muted-foreground">
                    Read through this guide completely. Understand AI trading, risk management, and the 2026 market 
                    landscape before placing your first trade.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  2
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Start the $10K Simulator</h3>
                  <p className="text-muted-foreground">
                    <Link to="/trade" className="text-primary hover:underline font-semibold">Launch our risk-free simulator</Link> with 
                    $10,000 virtual cash. Trade 150+ real assets including stocks, crypto, and tokenized securities with 
                    realistic price movements.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  3
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Practice the 1-2% Rule</h3>
                  <p className="text-muted-foreground">
                    In the simulator, treat your $10K like real money. Never risk more than $100-200 per trade. 
                    Set stop-losses on every position. Build discipline before it counts.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  4
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Track & Journal</h3>
                  <p className="text-muted-foreground">
                    Use the <Link to="/portfolio" className="text-primary hover:underline">portfolio analytics</Link> and 
                    trading journal to review every trade. Note your emotions. Learn from mistakes when they're free.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  5
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Graduate to Real Markets</h3>
                  <p className="text-muted-foreground">
                    Once you're consistently profitable in the simulator over 3+ months, you're ready for real trading. 
                    Start with small amounts and scale gradually as you prove yourself.
                  </p>
                </Card>
              </li>
            </ol>
          </section>

          {/* Final CTA Section */}
          <section className="max-w-4xl mx-auto mb-12">
            <Card className="p-12 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 text-center">
              <Badge className="mb-4 bg-profit/20 text-profit border-profit/30">
                No Credit Card Required • Free Forever
              </Badge>
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Risk-Free Trading Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Practice trading with $10,000 in virtual cash across 150+ assets. Master AI-assisted trading, Bitcoin Layer 2, and tokenized securities — all risk-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Link to="/trade">
                  <Button size="lg" className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start $10K Simulator Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                    Explore All Courses
                  </Button>
                </Link>
              </div>
              <SocialShare 
                title="Just started my trading education on TradingHQ! 📈"
                description="Free $10K simulator with 150+ assets. No risk, real skills."
              />
            </Card>
          </section>

          {/* Internal Linking Power Loop */}
          <section className="max-w-4xl mx-auto">
            <Card className="p-8 bg-card/50 border-border">
              <h3 className="text-2xl font-bold mb-6 text-center">Continue Your Trading Education</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <Link to="/learn" className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">All Trading Courses</p>
                  <p className="text-sm text-muted-foreground">25+ in-depth modules</p>
                </Link>
                <Link to="/trade" className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center">
                  <TrendingUp className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">$10K Trading Simulator</p>
                  <p className="text-sm text-muted-foreground">Practice risk-free</p>
                </Link>
                <Link to="/portfolio" className="p-4 rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-all text-center">
                  <LineChart className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="font-semibold">Portfolio Analytics</p>
                  <p className="text-sm text-muted-foreground">Track your progress</p>
                </Link>
              </div>
            </Card>
          </section>
        </main>

        <CredibilityFooter />
      </div>
    </>
  );
};

export default LearnTradingGuide;
