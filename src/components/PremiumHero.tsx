import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, Sparkles, TrendingUp, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * PremiumHero - Institutional-grade hero section
 * Dark mode luxury aesthetic with Bloomberg Terminal meets Stripe design
 */
export function PremiumHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Deep charcoal base with ultra-subtle grid */}
      <div className="absolute inset-0 bg-[hsl(0_0%_4%)]" />
      
      {/* Subtle premium grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(180 70% 50%) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(180 70% 50%) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Premium ambient glow - ultra subtle */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-primary/[0.03] rounded-full blur-[150px]" />
      <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/[0.02] rounded-full blur-[120px]" />
      
      {/* Gradient overlay from top */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(0_0%_4%)]" />

      <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
        {/* Premium badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-10 rounded-full bg-card/40 backdrop-blur-sm border border-border/30 animate-fade-in">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm text-muted-foreground font-medium tracking-wide">
            $10,000 Virtual Capital • 150+ Assets • Zero Risk
          </span>
        </div>
        
        {/* Massive headline - institutional style */}
        <h1 
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold mb-8 leading-[1.1] tracking-tight animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <span className="text-foreground">Master the Markets.</span>
          <br />
          <span className="text-foreground">Own the </span>
          <span className="text-primary">Future</span>
          <span className="text-foreground">.</span>
        </h1>
        
        {/* Refined subtitle */}
        <p 
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-normal leading-relaxed animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          Practice trading stocks, crypto, forex, and commodities with 
          real-time market simulation. Build strategies before risking real capital.
        </p>

        {/* Weekly Bonus - Premium pill */}
        <div 
          className="inline-flex items-center gap-3 px-6 py-3 mb-10 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 animate-slide-up"
          style={{ animationDelay: "250ms" }}
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Shield className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">
            <span className="text-primary font-semibold">$10,000 Weekly Bonus</span>
            <span className="text-muted-foreground"> — Refill your capital every week</span>
          </span>
        </div>
        
        {/* Premium CTA buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
          style={{ animationDelay: "300ms" }}
        >
          <Link to="/trade">
            <Button 
              size="lg" 
              className="group text-base px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 rounded-2xl min-h-[56px] font-semibold shadow-glow-cyan hover:shadow-lg"
            >
              Start Trading Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link to="/ai-mentor">
            <Button 
              size="lg" 
              variant="outline" 
              className="text-base px-10 py-7 border-border/50 bg-card/30 backdrop-blur-sm hover:bg-card/60 hover:border-primary/30 transition-all duration-300 rounded-2xl min-h-[56px]"
            >
              <Brain className="mr-2 w-5 h-5" />
              AI Mentor
            </Button>
          </Link>
        </div>
        
        {/* Premium stats row */}
        <div 
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto animate-slide-up"
          style={{ animationDelay: "400ms" }}
        >
          {[
            { label: 'Tradeable Assets', value: '150+', icon: TrendingUp },
            { label: 'Virtual Capital', value: '$10K', icon: Shield },
            { label: 'Real-Time Data', value: 'Yes', icon: Zap },
            { label: 'Weekly Refill', value: '$10K', icon: Sparkles },
          ].map((stat) => (
            <div 
              key={stat.label} 
              className="group p-6 rounded-2xl bg-card/30 backdrop-blur-sm border border-border/30 hover:border-primary/20 transition-all duration-300"
            >
              <stat.icon className="w-5 h-5 text-primary mb-3 mx-auto" />
              <div className="text-2xl md:text-3xl font-semibold text-foreground mb-1 tabular-nums">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
