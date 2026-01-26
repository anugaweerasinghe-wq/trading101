import { Card } from "@/components/ui/card";
import { Shield, Zap, GraduationCap, Brain, BarChart3, Wallet } from "lucide-react";

/**
 * PremiumFeatures - Institutional-grade features section
 * Clean, professional layout with premium styling
 */
export function PremiumFeatures() {
  const features = [
    {
      icon: Shield,
      title: "100% Risk-Free",
      description: "Practice with virtual capital. Make mistakes, learn strategies, and improve without risking real money.",
      gradient: "from-primary/20 to-primary/5",
      iconColor: "text-primary"
    },
    {
      icon: Zap,
      title: "Real-Time Markets",
      description: "Experience live market simulation with instant execution. Practice day trading and swing trading strategies.",
      gradient: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary"
    },
    {
      icon: Brain,
      title: "AI-Powered Education",
      description: "Learn from our AI mentor. Get personalized insights, strategy feedback, and market analysis in real-time.",
      gradient: "from-primary/20 to-primary/5",
      iconColor: "text-primary"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Track your performance with professional-grade analytics. Sharpe ratio, max drawdown, and win/loss metrics.",
      gradient: "from-profit/20 to-profit/5",
      iconColor: "text-profit"
    },
    {
      icon: Wallet,
      title: "Portfolio Management",
      description: "Build and manage diversified portfolios across stocks, crypto, forex, and commodities all in one place.",
      gradient: "from-secondary/20 to-secondary/5",
      iconColor: "text-secondary"
    },
    {
      icon: GraduationCap,
      title: "Expert Courses",
      description: "Master trading fundamentals with our curated courses covering technical analysis, risk management, and more.",
      gradient: "from-primary/20 to-primary/5",
      iconColor: "text-primary"
    },
  ];

  return (
    <section className="py-24 bg-[hsl(0_0%_4%)]">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Why <span className="text-primary">TradeHQ</span>?
          </h2>
          <p className="text-muted-foreground text-lg">
            The #1 trading simulator for 2026. Built for beginners and experts alike.
          </p>
        </div>
        
        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="group p-8 bg-card/30 border-border/30 hover:border-primary/20 transition-all duration-300 rounded-2xl backdrop-blur-sm animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`w-14 h-14 mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-7 h-7 ${feature.iconColor}`} />
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-semibold mb-3 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
