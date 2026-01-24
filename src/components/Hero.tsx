import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, GraduationCap, BarChart3, TrendingUp, PieChart, Coins, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { MarketTrends2026 } from "./MarketTrends2026";
import { TopAssetsGrid } from "./TopAssetsGrid";
import { QuickLinksFooter } from "./QuickLinksFooter";
import { CredibilityFooter } from "./CredibilityFooter";

export function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Deep charcoal background with subtle gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/20" />
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(180_70%_50%/0.02)_1px,transparent_1px),linear-gradient(to_bottom,hsl(180_70%_50%/0.02)_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        {/* Very subtle ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[200px]" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bento-card border-border/30 animate-fade-in">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">$10,000 Virtual Capital • 150+ Assets • No Sign Up</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight tracking-tight animate-slide-up" style={{ animationDelay: "100ms" }}>
            <span className="text-foreground">Master the Markets.</span>
            <br />
            <span className="text-foreground">Own the </span>
            <span className="text-primary">Future</span>
            <span className="text-foreground">.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-normal animate-slide-up" style={{ animationDelay: "200ms" }}>
            Practice <span className="text-primary">stock market simulation</span> and <span className="text-primary">crypto trading</span> with 
            real-time market liquidity. Master Bitcoin L2, RWA tokenization & AI-driven strategies before risking real money.
          </p>

          {/* Weekly Bonus Banner */}
          <div className="inline-flex items-center gap-2 px-6 py-3 mb-8 rounded-2xl bg-gradient-to-r from-primary/20 via-primary/10 to-secondary/20 border border-primary/30 animate-pulse-glow animate-slide-up" style={{ animationDelay: "250ms" }}>
            <Shield className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">
              <span className="text-primary font-bold">$10,000 Weekly Bonus</span>
              <span className="text-muted-foreground"> — Refill your virtual capital every week!</span>
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up" style={{ animationDelay: "300ms" }}>
            <Link to="/trade">
              <Button size="lg" className="group text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 rounded-xl min-h-[48px] font-semibold hover:scale-105">
                Start Instant Trading
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/ai-mentor">
              <Button size="lg" variant="outline" className="text-base px-8 py-6 border-border hover:bg-muted/30 hover:border-primary/30 transition-all duration-300 rounded-xl min-h-[48px] hover:scale-105">
                <Brain className="mr-2 w-5 h-5" />
                Chat with AI Mentor
              </Button>
            </Link>
          </div>
          
          {/* Bento Grid Stats with LSI terms */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {[
              { label: 'Asset Class Diversification', value: '150+', highlight: true, icon: PieChart },
              { label: 'Virtual Capital', value: '$10K', highlight: false, icon: TrendingUp },
              { label: 'Real-Time Liquidity', value: 'Yes', highlight: true, icon: BarChart3 },
              { label: 'Weekly Bonus', value: '$10K', highlight: false, icon: Shield },
            ].map((stat, index) => (
              <div 
                key={stat.label} 
                className="bento-card p-6 text-center hover:scale-105 transition-transform duration-300 animate-slide-up"
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <stat.icon className={`w-5 h-5 mx-auto mb-2 ${stat.highlight ? 'text-primary' : 'text-muted-foreground'}`} />
                <div className={`text-2xl md:text-3xl font-semibold mb-1 ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {stat.value}
                </div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section with LSI terms */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Why <span className="text-primary">TradeHQ</span>?
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
            The #1 <span className="text-primary">stock market simulator</span> for crypto trading practice [2026 Edition]
          </p>
          
          {/* Bento Grid Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 text-center bento-card hover:border-primary/20 hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: "100ms" }}>
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Shield className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4">100% <span className="text-primary">Risk-Free</span></h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Practice with virtual capital allocation. Make mistakes, learn risk-adjusted returns, and improve without risking real money.
              </p>
            </Card>

            <Card className="p-8 text-center bento-card hover:border-secondary/20 hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: "200ms" }}>
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-secondary/10 flex items-center justify-center">
                <Zap className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-4"><span className="text-secondary">Real-Time</span> Markets</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Experience real-time market liquidity with our advanced simulation. Practice day trading, swing trading with technical analysis indicators.
              </p>
            </Card>

            <Card className="p-8 text-center bento-card hover:border-primary/20 hover:scale-105 transition-all duration-300 animate-slide-up" style={{ animationDelay: "300ms" }}>
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-4"><span className="text-primary">AI-Powered</span> Education</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Master asset class diversification and portfolio management. Build skills from beginner to advanced trader with AI guidance.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Assets Grid for SEO Internal Linking */}
      <TopAssetsGrid />

      {/* 2026 Market Trends Section */}
      <MarketTrends2026 />

      {/* FAQ Section for SEO */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-semibold text-center mb-4">
            Frequently Asked <span className="text-primary">Questions</span>
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            Everything you need to know about TradeHQ
          </p>

          <div className="space-y-6">
            <Card className="p-6 bento-card">
              <h3 className="text-lg font-semibold mb-3">How does virtual trading work?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Virtual trading on TradeHQ simulates real market conditions using $10,000 in demo cash. You can buy and sell 150+ assets including stocks, crypto, ETFs, and commodities with real-time price simulation. All trades are executed instantly with no real money at risk, allowing you to practice strategies and learn market dynamics before investing real capital.
              </p>
            </Card>

            <Card className="p-6 bento-card">
              <h3 className="text-lg font-semibold mb-3">What is Bitcoin L2?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Bitcoin Layer 2 (L2) refers to secondary protocols built on top of the Bitcoin blockchain to enable faster, cheaper transactions. Popular L2 solutions include the Lightning Network for instant payments and Stacks (STX) for smart contracts. These solutions inherit Bitcoin's security while adding scalability and programmability, making them ideal for trading and DeFi applications.
              </p>
            </Card>

            <Card className="p-6 bento-card">
              <h3 className="text-lg font-semibold mb-3">Is TradeHQ free?</h3>
              <p className="text-muted-foreground leading-relaxed">
                Yes, TradeHQ is completely free to use. You get $10,000 in virtual capital to practice trading with no signup required. We also provide weekly $10K refills so you can continue learning indefinitely. There are no hidden fees, subscriptions, or premium tiers—all features including AI-powered education and real-time market simulation are available to everyone.
              </p>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Link to="/trade">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl min-h-[48px] font-semibold">
                Start Free Trading Now
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Links Footer for SEO */}
      <QuickLinksFooter />

      {/* Credibility Footer */}
      <CredibilityFooter />
    </>
  );
}
