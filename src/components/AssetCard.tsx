import { Asset } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Star, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculate24hStats } from "@/lib/marketData";
import { useState, useEffect } from "react";

interface AssetCardProps {
  asset: Asset;
  onClick: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function AssetCard({ asset, onClick, isFavorite, onToggleFavorite }: AssetCardProps) {
  const isPositive = asset.change >= 0;
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const newStats = calculate24hStats(asset);
    setStats(newStats);
  }, [asset]);

  return (
    <Card 
      className="p-6 hover-lift cursor-pointer border-border/50 hover:border-primary/50 bg-card/50 backdrop-blur-sm transition-all duration-300 relative group"
    >
      <div onClick={onClick}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-xl font-bold">{asset.symbol}</h3>
              <Activity className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{asset.name}</p>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="capitalize text-xs">
              {asset.type}
            </Badge>
          </div>
        </div>
        
        <div className="space-y-3">
          <div>
            <div className="text-3xl font-bold mb-2">
              ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </div>
            <div className={cn(
              "flex items-center gap-1 text-sm font-medium",
              isPositive ? "text-success" : "text-destructive"
            )}>
              {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              {isPositive ? '+' : ''}{asset.change.toFixed(2)} ({isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%)
            </div>
          </div>

          {stats && (
            <div className="pt-3 border-t border-border/50 grid grid-cols-2 gap-2 text-xs">
              <div>
                <p className="text-muted-foreground">24h High</p>
                <p className="font-semibold">${stats.high24h.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">24h Low</p>
                <p className="font-semibold">${stats.low24h.toFixed(2)}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {onToggleFavorite && (
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity",
            isFavorite && "opacity-100 text-yellow-500"
          )}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          <Star className={cn("w-4 h-4", isFavorite && "fill-current")} />
        </Button>
      )}
    </Card>
  );
}
