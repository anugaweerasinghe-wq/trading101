import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Zap, Cpu } from "lucide-react";

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
    description: "The original cryptocurrency. Practice Bitcoin trading with real-time price action.",
    icon: Zap,
    badge: "Most Traded",
    badgeColor: "bg-primary/20 text-primary border-primary/30",
  },
  {
    id: "eth",
    symbol: "ETH",
    name: "Ethereum",
    description: "Smart contract leader. Master ETH trading strategies in our simulator.",
    icon: TrendingUp,
    badge: "DeFi Leader",
    badgeColor: "bg-secondary/20 text-secondary border-secondary/30",
  },
  {
    id: "nvda",
    symbol: "NVDA",
    name: "NVIDIA",
    description: "AI chip powerhouse. Practice NVIDIA stock trading with $10K virtual capital.",
    icon: Cpu,
    badge: "AI Revolution",
    badgeColor: "bg-profit/20 text-profit border-profit/30",
  },
];

/**
 * TopAssetsGrid - Homepage SEO Internal Linking Component
 * Links directly to individual trade pages for priority assets.
 */
export function TopAssetsGrid() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold mb-3">
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
              className="group block"
            >
              <Card 
                className="h-full p-6 bg-card hover:bg-card/80 border-border hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <asset.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {asset.symbol}
                    </h3>
                    <p className="text-sm text-muted-foreground">{asset.name}</p>
                  </div>
                </div>
                
                <Badge 
                  variant="outline" 
                  className={`mb-3 ${asset.badgeColor}`}
                >
                  {asset.badge}
                </Badge>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {asset.description}
                </p>
                
                <div className="mt-4 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  Start Trading {asset.symbol} →
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
