import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Zap, GraduationCap, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

export function Hero() {
  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
        {/* Pitch black background with neon gradients */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Animated grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(180_100%_50%/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(180_100%_50%/0.03)_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        {/* Subtle ambient glow */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[180px]" />
        
        {/* Secondary ambient glow */}
        <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-secondary/5 rounded-full blur-[150px]" />
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass-card border-primary/30 backdrop-blur-sm">
            <BarChart3 className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">$10,000 Demo Cash • 150+ Real Assets • No Sign Up</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-foreground">Master the Markets.</span>
            <br />
            <span className="text-primary">Own the <span className="text-glow-cyan">Future</span>.</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12">
            Experience real-time market simulation with 150+ stocks, cryptos, ETFs & commodities. 
            <span className="text-secondary"> Master AI-assisted trading</span> with fake cash before risking real money.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/trade">
              <Button size="lg" className="group text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all hover:scale-105">
                Start Trading Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/learn">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-muted-foreground/30 hover:bg-muted/20 hover:border-primary/50 transition-all">
                Learn Trading Basics
              </Button>
            </Link>
          </div>
          
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { label: 'Trading Assets', value: '150+', highlight: true },
              { label: 'Starting Cash', value: '$10K', highlight: false },
              { label: 'Real-Time Data', value: 'Yes', highlight: true },
              { label: 'Weekly Bonus', value: '$10K', highlight: false },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.highlight ? 'text-primary' : 'text-foreground'}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
            Why <span className="text-primary">TradeHQ</span>?
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-xl mx-auto">
            The elite <span className="text-primary text-glow-cyan">AI-powered</span> trading simulator for 2026 and beyond
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-8 text-center glass-card hover:border-primary/40 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">100% <span className="text-primary text-glow-cyan">Risk-Free</span></h3>
              <p className="text-muted-foreground">
                Trade with virtual money. Make mistakes, learn, and improve without risking a single dollar of real capital.
              </p>
            </Card>

            <Card className="p-8 text-center glass-card hover:border-secondary/40 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold mb-4"><span className="text-secondary text-glow-purple">Real-Time</span> Markets</h3>
              <p className="text-muted-foreground">
                Experience realistic price movements with our advanced simulation engine. Practice day trading, swing trading, and long-term investing.
              </p>
            </Card>

            <Card className="p-8 text-center glass-card hover:border-primary/40 transition-all duration-300">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4"><span className="text-primary text-glow-cyan">AI-Powered</span> Education</h3>
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