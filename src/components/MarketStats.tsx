import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketStatsProps {
  totalMarketCap: number;
  totalVolume24h: number;
  gainers: number;
  losers: number;
}

export function MarketStats({ totalMarketCap, totalVolume24h, gainers, losers }: MarketStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Market Cap</p>
          <DollarSign className="w-5 h-5 text-primary" />
        </div>
        <p className="text-2xl font-bold">${(totalMarketCap / 1000000000000).toFixed(2)}T</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">24h Volume</p>
          <Activity className="w-5 h-5 text-blue-500" />
        </div>
        <p className="text-2xl font-bold">${(totalVolume24h / 1000000000).toFixed(2)}B</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-success/10 to-success/5 border-success/20">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Gainers</p>
          <TrendingUp className="w-5 h-5 text-success" />
        </div>
        <p className="text-2xl font-bold">{gainers}</p>
        <p className="text-xs text-muted-foreground">+24h</p>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm text-muted-foreground">Losers</p>
          <TrendingDown className="w-5 h-5 text-destructive" />
        </div>
        <p className="text-2xl font-bold">{losers}</p>
        <p className="text-xs text-muted-foreground">-24h</p>
      </Card>
    </div>
  );
}
