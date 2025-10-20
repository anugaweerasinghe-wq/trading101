import { Asset } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
}

export function AssetCard({ asset, onClick }: AssetCardProps) {
  const isPositive = asset.change >= 0;

  return (
    <Card 
      onClick={onClick}
      className="p-6 hover-lift cursor-pointer border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold mb-1">{asset.symbol}</h3>
          <p className="text-sm text-muted-foreground">{asset.name}</p>
        </div>
        <Badge variant="outline" className="capitalize">
          {asset.type}
        </Badge>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <div className="text-3xl font-bold mb-2">
            ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className={cn(
            "flex items-center gap-1 text-sm font-medium",
            isPositive ? "text-success" : "text-destructive"
          )}>
            {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
            {isPositive ? '+' : ''}{asset.change.toFixed(2)} ({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)
          </div>
        </div>
      </div>
    </Card>
  );
}
