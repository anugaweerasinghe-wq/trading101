import { Navigation } from "@/components/Navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  AlertTriangle
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const LearnTradingGuide = () => {
  // JSON-LD Schema for Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Learn Trading for Beginners: Complete 2026 Guide",
    "description": "Master the fundamentals of trading with our comprehensive beginner's guide. Learn about stocks, forex, crypto markets, risk management, and start your trading journey.",
    "author": {
      "@type": "Organization",
      "name": "TradeSandbox"
    },
    "publisher": {
      "@type": "Organization",
      "name": "TradeSandbox",
      "logo": {
        "@type": "ImageObject",
        "url": "https://tradesandbox.com/logo.png"
      }
    },
    "datePublished": "2026-01-10",
    "dateModified": "2026-01-10",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://tradesandbox.com/learn-trading-guide"
    }
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Start Trading as a Beginner",
    "description": "A step-by-step guide to starting your trading journey from scratch.",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Educate Yourself",
        "text": "Learn the basics of financial markets, trading terminology, and different asset classes before investing any money."
      },
      {
        "@type": "HowToStep",
        "name": "Choose Your Market",
        "text": "Decide whether you want to trade stocks, forex, cryptocurrencies, or other assets based on your goals and risk tolerance."
      },
      {
        "@type": "HowToStep",
        "name": "Practice with a Simulator",
        "text": "Use a trading simulator like TradeSandbox to practice strategies with virtual money before risking real capital."
      },
      {
        "@type": "HowToStep",
        "name": "Develop a Trading Plan",
        "text": "Create a written plan that includes your goals, risk tolerance, entry/exit strategies, and position sizing rules."
      },
      {
        "@type": "HowToStep",
        "name": "Start Small",
        "text": "When ready for real trading, start with small positions and gradually increase as you gain experience and confidence."
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Learn Trading for Beginners | Complete 2026 Guide</title>
        <meta 
          name="description" 
          content="Master trading basics with our free beginner guide. Learn stocks, forex, crypto, risk management & start trading confidently." 
        />
        <link rel="canonical" href="https://tradesandbox.com/learn-trading-guide" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Master Trading in 2026: A Beginner's Guide" />
        <meta property="og:description" content="Learn to trade stocks, forex & crypto with confidence. Free step-by-step guide covering risk management, market types & proven strategies." />
        <meta property="og:url" content="https://tradesandbox.com/learn-trading-guide" />
        <meta property="og:site_name" content="TradeSandbox" />
        <meta property="og:image" content="https://tradesandbox.com/og-trading-guide.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="TradeSandbox - Learn Trading for Beginners Guide" />
        <meta property="article:published_time" content="2025-01-10T00:00:00Z" />
        <meta property="article:author" content="TradeSandbox" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Master Trading in 2026: A Beginner's Guide" />
        <meta name="twitter:description" content="Learn to trade stocks, forex & crypto with confidence. Free step-by-step guide covering risk management & proven strategies." />
        <meta name="twitter:image" content="https://tradesandbox.com/og-trading-guide.png" />
        <meta name="twitter:image:alt" content="TradeSandbox - Learn Trading for Beginners Guide" />
        
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(howToSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        
        {/* Hero Section */}
        <header className="relative pt-32 pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
          
          <div className="relative z-10 container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-card/50 border border-border backdrop-blur-sm">
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">Complete Beginner's Guide</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Learn Trading for Beginners:
                <br />
                <span className="text-gradient-gold">Your Complete 2026 Guide</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                Whether you're curious about stocks, forex, or crypto, this comprehensive guide will teach you 
                everything you need to start trading confidently and manage your risk like a pro.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/trade">
                  <Button size="lg" className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold">
                    Practice Trading Free
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-16">
          {/* Table of Contents */}
          <nav className="max-w-4xl mx-auto mb-16" aria-label="Table of Contents">
            <Card className="p-8 bg-card/50 border-border">
              <h2 className="text-2xl font-bold mb-6">What You'll Learn</h2>
              <ul className="grid md:grid-cols-2 gap-4">
                <li>
                  <a href="#what-is-trading" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    What is Trading?
                  </a>
                </li>
                <li>
                  <a href="#types-of-markets" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Types of Markets
                  </a>
                </li>
                <li>
                  <a href="#risk-management" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Risk Management Basics
                  </a>
                </li>
                <li>
                  <a href="#getting-started" className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    Step-by-Step Getting Started
                  </a>
                </li>
              </ul>
            </Card>
          </nav>

          {/* Section 1: What is Trading? */}
          <section id="what-is-trading" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <TrendingUp className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">What is Trading?</h2>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Trading is the act of buying and selling financial assets—like stocks, currencies, or cryptocurrencies—with 
                the goal of making a profit. Unlike long-term investing where you hold assets for years, trading typically 
                involves shorter timeframes, from seconds to months.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                At its core, trading is about capitalizing on price movements. When you believe an asset's price will rise, 
                you buy (go "long"). When you think it will fall, you sell (go "short"). The difference between your entry 
                and exit prices determines your profit or loss.
              </p>

              <Card className="p-6 bg-card/50 border-border mb-8">
                <h3 className="text-xl font-semibold mb-4">Key Trading Concepts</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Buy Low, Sell High:</strong> The fundamental principle of profitable trading</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Market Orders:</strong> Buy or sell immediately at the current market price</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Limit Orders:</strong> Set a specific price at which you want to buy or sell</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-muted-foreground"><strong className="text-foreground">Spread:</strong> The difference between the buying and selling price</span>
                  </li>
                </ul>
              </Card>
            </div>
          </section>

          {/* Section 2: Types of Markets */}
          <section id="types-of-markets" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <BarChart3 className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Types of Markets</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Financial markets offer diverse opportunities for traders. Each market has unique characteristics, 
              trading hours, and risk profiles. Understanding these differences helps you choose the right market for your goals.
            </p>

            <div className="grid gap-6">
              {/* Stocks */}
              <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <BarChart3 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Stock Market</h3>
                    <p className="text-muted-foreground mb-4">
                      The stock market allows you to buy ownership shares in publicly traded companies. When a company 
                      performs well, its stock price typically rises. Stocks are ideal for beginners due to their 
                      transparency and extensive research availability.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Trading Hours: Monday-Friday, 9:30 AM - 4:00 PM EST
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Best For: Long-term growth, dividend income
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Forex */}
              <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Globe className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Forex (Foreign Exchange)</h3>
                    <p className="text-muted-foreground mb-4">
                      Forex is the largest financial market in the world, with over $6 trillion traded daily. 
                      You trade currency pairs like EUR/USD, profiting from exchange rate fluctuations. Forex 
                      offers high liquidity and 24-hour trading during weekdays.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Trading Hours: 24 hours, Sunday 5 PM - Friday 5 PM EST
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Best For: Active traders, global economic analysis
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              {/* Crypto */}
              <Card className="p-8 bg-card/50 border-border hover:border-primary/50 transition-colors">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <Coins className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-3">Cryptocurrency</h3>
                    <p className="text-muted-foreground mb-4">
                      Cryptocurrencies like Bitcoin and Ethereum trade on decentralized digital exchanges. 
                      This market is known for high volatility, offering significant profit potential but 
                      also substantial risk. Crypto markets never close, trading 24/7/365.
                    </p>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Trading Hours: 24/7, 365 days a year
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" />
                        Best For: Risk-tolerant traders, technology enthusiasts
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* Section 3: Risk Management */}
          <section id="risk-management" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Risk Management Basics</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Risk management is the most important skill for any trader. It's not about avoiding losses entirely—that's 
              impossible—but about controlling them so you can stay in the game long enough to be profitable.
            </p>

            <Card className="p-8 bg-destructive/10 border-destructive/30 mb-8">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold mb-2">The #1 Rule of Trading</h3>
                  <p className="text-muted-foreground">
                    Never risk more than 1-2% of your total trading capital on a single trade. This ensures that 
                    even a string of losses won't wipe out your account, giving you time to learn and improve.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Stop-Loss Orders
                </h3>
                <p className="text-muted-foreground">
                  A stop-loss automatically closes your position when the price moves against you by a 
                  predetermined amount. This limits your potential loss on any trade and removes emotion 
                  from the decision to exit a losing position.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Position Sizing
                </h3>
                <p className="text-muted-foreground">
                  Calculate how much to invest in each trade based on your account size and risk tolerance. 
                  Smaller positions mean less risk per trade, allowing you to survive losing streaks while 
                  learning the markets.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Diversification
                </h3>
                <p className="text-muted-foreground">
                  Don't put all your eggs in one basket. Spread your trades across different assets, 
                  sectors, or markets to reduce the impact of any single position going wrong.
                </p>
              </Card>

              <Card className="p-6 bg-card/50 border-border">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Risk-Reward Ratio
                </h3>
                <p className="text-muted-foreground">
                  Before entering a trade, ensure your potential profit is at least 2x your potential loss. 
                  This way, you can be profitable even if you're right only 40-50% of the time.
                </p>
              </Card>
            </div>
          </section>

          {/* Section 4: Getting Started */}
          <section id="getting-started" className="max-w-4xl mx-auto mb-20 scroll-mt-24">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7 text-primary" />
              </div>
              <h2 className="text-4xl font-bold">Step-by-Step Getting Started</h2>
            </div>
            
            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              Ready to begin your trading journey? Follow these steps to build a solid foundation before 
              risking any real money in the markets.
            </p>

            <ol className="space-y-6">
              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  1
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Educate Yourself First</h3>
                  <p className="text-muted-foreground">
                    Before investing any money, spend time learning the basics. Read books, take courses, 
                    and understand how markets work. Knowledge is your best investment and will save you 
                    from costly beginner mistakes.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  2
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Choose Your Market</h3>
                  <p className="text-muted-foreground">
                    Decide which market aligns with your interests, schedule, and risk tolerance. Stocks 
                    are great for beginners, while forex and crypto require more experience due to their 
                    volatility and complexity.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  3
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Practice with a Trading Simulator</h3>
                  <p className="text-muted-foreground">
                    Use a paper trading account or simulator like TradeSandbox to practice strategies 
                    without risking real money. This is where you develop your skills, test ideas, and 
                    build confidence before going live.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  4
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Develop a Trading Plan</h3>
                  <p className="text-muted-foreground">
                    Write down your goals, risk tolerance, and trading rules. Include your entry and exit 
                    criteria, position sizing rules, and how you'll manage emotions. A written plan keeps 
                    you disciplined when markets get volatile.
                  </p>
                </Card>
              </li>

              <li className="flex gap-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl shrink-0">
                  5
                </div>
                <Card className="flex-1 p-6 bg-card/50 border-border">
                  <h3 className="text-xl font-semibold mb-2">Start Small and Scale Gradually</h3>
                  <p className="text-muted-foreground">
                    When you're ready for real trading, start with small positions. Even experienced 
                    traders make mistakes in new markets. Increase your position sizes only as you 
                    consistently prove your strategy works.
                  </p>
                </Card>
              </li>
            </ol>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto">
            <Card className="p-12 bg-gradient-to-br from-primary/20 to-primary/5 border-primary/30 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Start Your Trading Journey?</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Put your new knowledge into practice with TradeSandbox. Trade 150+ assets with $10,000 in 
                virtual money and master the markets risk-free.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/trade">
                  <Button size="lg" className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Start Trading Now
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                    Explore More Lessons
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-border mt-20">
          <div className="container mx-auto px-6 py-12">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-gold rounded-lg flex items-center justify-center" role="img" aria-label="TradeSandbox Logo">
                    <TrendingUp className="w-5 h-5 text-primary-foreground" aria-hidden="true" />
                  </div>
                  <span className="text-xl font-bold font-serif">TradeSandbox</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Practice trading risk-free with real market simulations.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li><Link to="/trade" className="hover:text-primary transition-colors">Trade</Link></li>
                  <li><Link to="/portfolio" className="hover:text-primary transition-colors">Portfolio</Link></li>
                  <li><Link to="/markets" className="hover:text-primary transition-colors">Markets</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Learn</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><Link to="/learn" className="hover:text-primary transition-colors">All Courses</Link></li>
                  <li><Link to="/learn-trading-guide" className="hover:text-primary transition-colors">Trading Guide for Beginners</Link></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4">Resources</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li><a href="#risk-management" className="hover:text-primary transition-colors">Risk Management</a></li>
                  <li><a href="#types-of-markets" className="hover:text-primary transition-colors">Market Types</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} TradeSandbox. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default LearnTradingGuide;