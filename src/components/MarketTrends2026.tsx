import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Coins, Brain, ArrowRight, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const trends = [
  {
    id: "bitcoin-l2",
    title: "Bitcoin Layer 2s",
    subtitle: "Stacks, Lightning Network",
    description: "Bitcoin L2 solutions enable fast, low-cost transactions while inheriting Bitcoin's security. Practice trading STX, Lightning-enabled assets, and explore the future of Bitcoin scalability.",
    icon: Zap,
    badge: "Hot 2026",
    color: "primary",
    stats: [
      { label: "Lightning Capacity", value: "5,500+ BTC" },
      { label: "Stacks TVL", value: "$150M+" },
    ]
  },
  {
    id: "rwa",
    title: "Tokenized Real World Assets",
    subtitle: "RWA Revolution",
    description: "Real World Asset tokenization brings traditional assets on-chain. Trade tokenized treasuries, real estate, and commodities with 24/7 liquidity and fractional ownership.",
    icon: Coins,
    badge: "Trending",
    color: "secondary",
    stats: [
      { label: "RWA Market Cap", value: "$12B+" },
      { label: "Tokenized Treasuries", value: "$2.5B+" },
    ]
  },
  {
    id: "ai-liquidity",
    title: "AI-Driven Liquidity",
    subtitle: "Smart Market Making",
    description: "AI algorithms now power market making and liquidity provision. Learn how machine learning optimizes order flow, reduces slippage, and creates more efficient markets.",
    icon: Brain,
    badge: "Innovation",
    color: "primary",
    stats: [
      { label: "AI Trading Volume", value: "60%+" },
      { label: "Efficiency Gain", value: "3x" },
    ]
  },
];

export function MarketTrends2026() {
  return (
    <section className="py-24 bg-[hsl(0_0%_4%)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 border-primary/20 text-primary bg-primary/5">
            <TrendingUp className="w-3 h-3 mr-2" />
            Market Intelligence
          </Badge>
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            2026 <span className="text-primary">Market Trends</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay ahead with the hottest investment themes shaping the future of finance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {trends.map((trend, index) => {
            const Icon = trend.icon;
            return (
              <Card 
                key={trend.id}
                className="group p-8 bg-card/30 backdrop-blur-sm border-border/30 hover:border-primary/20 transition-all duration-300 rounded-2xl animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${trend.color === 'primary' ? 'bg-primary/10' : 'bg-secondary/10'} flex items-center justify-center`}>
                    <Icon className={`w-7 h-7 ${trend.color === 'primary' ? 'text-primary' : 'text-secondary'}`} />
                  </div>
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                    {trend.badge}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {trend.title}
                </h3>
                <p className="text-sm text-primary/80 mb-4">{trend.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {trend.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  {trend.stats.map((stat) => (
                    <div key={stat.label} className="bg-muted/30 rounded-xl p-3 text-center">
                      <div className="text-base font-semibold text-primary tabular-nums">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <Link to="/learn-trading-guide" className="flex items-center gap-2 text-sm text-primary font-medium group-hover:gap-3 transition-all">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <Link to="/trade">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-base rounded-2xl min-h-[56px] font-semibold shadow-glow-cyan">
              Start Instant Trading
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
