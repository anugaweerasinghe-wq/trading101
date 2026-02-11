import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Cpu, ArrowRight } from "lucide-react";

interface TopAsset {
  id: string;
  symbol: string;
  name: string;
  description: string;
  icon: React.ElementType;
  badge: string;
  badgeColor: string;
}

const TOP_ASSETS: TopAsset[] = [
  {
    id: "btc",
    symbol: "BTC",
    name: "Bitcoin",
    description: "The original cryptocurrency. Practice Bitcoin trading with simulated price action.",
    icon: Zap,
    badge: "Most Traded",
    badgeColor: "bg-primary/10 text-primary border-primary/20",
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    description: "Smart contract leader. Master ETH trading strategies in our simulator.",
    icon: TrendingUp,
    badge: "DeFi Leader",
    badgeColor: "bg-secondary/10 text-secondary border-secondary/20",
  },
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA",
    description: "AI chip powerhouse. Practice NVIDIA stock trading with $10K virtual capital.",
    icon: Cpu,
    badge: "AI Revolution",
    badgeColor: "bg-profit/10 text-profit border-profit/20",
  },
];

/**
 * TopAssetsGrid - Homepage SEO Internal Linking Component
 * Links directly to individual trade pages for priority assets.
 */
export function TopAssetsGrid() {
  return (
    <section className="py-24 bg-[hsl(0_0%_3%)]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">
            Start Trading <span className="text-primary">Top Assets</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Jump directly into our most popular trading simulations. Practice with $10,000 virtual capital — no signup required.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {TOP_ASSETS.map((asset, index) => (
            <Link
              key={asset.id}
              to={`/trade/${asset.id}`}
              className="group block animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Card 
                className="h-full p-8 bg-card/30 backdrop-blur-sm border-border/30 hover:border-primary/30 transition-all duration-300 hover:shadow-glow-cyan rounded-2xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <asset.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      {asset.symbol}
                    </h3>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                </div>
                
                <Badge 
                  variant="outline" 
                  className={`mb-4 ${asset.badgeColor}`}
                >
                  {asset.badge}
                </Badge>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {asset.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Start Trading {asset.symbol}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
