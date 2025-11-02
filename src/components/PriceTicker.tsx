import { useEffect, useState } from "react";
import { Asset } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface PriceTickerProps {
  assets: Asset[];
}

export function PriceTicker({ assets }: PriceTickerProps) {
  const [offset, setOffset] = useState(0);
  const topAssets = assets.slice(0, 20); // Show top 20 assets

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => (prev + 1) % (topAssets.length * 200));
    }, 50); // Smooth scrolling

    return () => clearInterval(interval);
  }, [topAssets.length]);

  return (
    <div className="bg-card/50 backdrop-blur-sm border-b border-border overflow-hidden">
      <div 
        className="flex gap-8 py-3 px-6"
        style={{
          transform: `translateX(-${offset}px)`,
          transition: 'transform 0.05s linear',
        }}
      >
        {[...topAssets, ...topAssets].map((asset, index) => {
          const isPositive = asset.changePercent >= 0;
          return (
            <div key={`${asset.id}-${index}`} className="flex items-center gap-3 whitespace-nowrap">
              <span className="font-bold">{asset.symbol}</span>
              <span className="text-muted-foreground">
                ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
              </span>
              <span className={cn(
                "flex items-center gap-1 text-sm font-medium",
                isPositive ? "text-success" : "text-destructive"
              )}>
                {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
