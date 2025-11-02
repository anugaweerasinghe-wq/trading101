import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp, TrendingDown } from "lucide-react";
import { Asset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface WatchlistPanelProps {
  favorites: Asset[];
  onRemoveFavorite: (assetId: string) => void;
  onSelectAsset: (asset: Asset) => void;
}

export function WatchlistPanel({ favorites, onRemoveFavorite, onSelectAsset }: WatchlistPanelProps) {
  if (favorites.length === 0) {
    return (
      <Card className="p-8 text-center">
        <Star className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">No Favorites Yet</h3>
        <p className="text-muted-foreground">
          Click the star icon on any asset to add it to your watchlist
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {favorites.map((asset) => {
        const isPositive = asset.changePercent >= 0;
        return (
          <Card 
            key={asset.id}
            className="p-4 hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
            onClick={() => onSelectAsset(asset)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-bold text-lg">{asset.symbol}</h4>
                  <Badge variant="outline" className="text-xs capitalize">
                    {asset.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{asset.name}</p>
              </div>
              
              <div className="text-right">
                <div className="text-xl font-bold mb-1">
                  ${asset.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                </div>
                <div className={cn(
                  "flex items-center justify-end gap-1 text-sm font-medium",
                  isPositive ? "text-success" : "text-destructive"
                )}>
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {isPositive ? '+' : ''}{asset.changePercent.toFixed(2)}%
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="ml-4 text-yellow-500"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemoveFavorite(asset.id);
                }}
              >
                <Star className="w-5 h-5 fill-current" />
              </Button>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
