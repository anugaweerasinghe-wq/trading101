import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, TrendingUp, Shield, Zap, GraduationCap, Star } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Gold glow effect */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-card/50 border border-border backdrop-blur-sm animate-pulse">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">$10,000 Demo Cash • 150+ Real Assets • No Sign Up</span>
          </div>
          
          <h1 className="text-7xl md:text-8xl font-bold mb-6 leading-tight">
            Trade Like a Pro,
            <br />
            <span className="text-gradient-gold">Learn Risk-Free.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Experience real-time market simulation with 150+ stocks, cryptos, ETFs & commodities. Master trading with fake cash before risking real money.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/trade">
              <Button size="lg" className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground shadow-gold">
                Start Trading Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary/30 hover:bg-primary/10">
                Learn Trading Basics
              </Button>
            </Link>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Trading Assets', value: '150+' },
              { label: 'Starting Cash', value: '$10K' },
              { label: 'Real-Time Data', value: 'Yes' },
              { label: 'Weekly Bonus', value: '$10K' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-gradient-gold mb-2">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why TradeSandbox?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">100% Risk-Free</h3>
              <p className="text-muted-foreground">
                Trade with virtual money. Make mistakes, learn, and improve without risking a single dollar of real capital.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Real-Time Markets</h3>
              <p className="text-muted-foreground">
                Experience realistic price movements with our advanced simulation engine. Practice day trading, swing trading, and long-term investing.
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-xl transition-shadow bg-gradient-to-br from-primary/5 to-transparent">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Built-In Education</h3>
              <p className="text-muted-foreground">
                Learn from comprehensive trading courses and get AI-powered advice. Build your skills from beginner to advanced trader.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
