import { Asset } from "@/lib/types";
import { TrendingUp, TrendingDown, Minus, Activity, BarChart3, Target, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketInsightPanelProps {
  asset: Asset;
}

interface InsightTile {
  label: string;
  value: string;
  detail: string;
  icon: React.ReactNode;
  color: string;
}

function deriveInsights(asset: Asset): InsightTile[] {
  const cp = asset.changePercent;
  const absChange = Math.abs(cp);
  const price = asset.price;

  // Trend
  const trendValue = cp > 1.5 ? "Uptrend" : cp < -1.5 ? "Downtrend" : "Sideways";
  const trendColor = cp > 1.5 ? "text-profit" : cp < -1.5 ? "text-loss" : "text-muted-foreground";
  const trendIcon = cp > 1.5
    ? <TrendingUp className="w-4 h-4" />
    : cp < -1.5
      ? <TrendingDown className="w-4 h-4" />
      : <Minus className="w-4 h-4" />;

  // Volatility
  const volThreshold = asset.type === "crypto" ? { low: 2, high: 5 } : { low: 1, high: 3 };
  const volValue = absChange < volThreshold.low ? "Low" : absChange > volThreshold.high ? "High" : "Moderate";
  const volColor = volValue === "High" ? "text-warning" : volValue === "Low" ? "text-profit" : "text-muted-foreground";

  // Momentum
  const momValue = cp > 2 ? "Bullish" : cp < -2 ? "Bearish" : "Neutral";
  const momColor = cp > 2 ? "text-profit" : cp < -2 ? "text-loss" : "text-muted-foreground";

  // Key levels (simulated ±2-4% from current price)
  const supportPct = asset.type === "crypto" ? 0.04 : 0.025;
  const resistancePct = asset.type === "crypto" ? 0.04 : 0.025;
  const support = price * (1 - supportPct);
  const resistance = price * (1 + resistancePct);
  const fmt = (n: number) => n < 1 ? n.toFixed(4) : n.toLocaleString(undefined, { maximumFractionDigits: 2 });

  // Beginner tip (contextual)
  const tips = [
    absChange > 4
      ? "High volatility — consider smaller position sizes to manage risk."
      : cp > 2
        ? "Momentum is positive, but don't chase. Set a plan before entering."
        : cp < -2
          ? "Prices are falling. Experienced traders look for support levels before buying dips."
          : "Markets are calm. A good time to research and plan your next move.",
  ];

  return [
    { label: "Trend", value: trendValue, detail: `${cp >= 0 ? "+" : ""}${cp.toFixed(2)}% recent move`, icon: trendIcon, color: trendColor },
    { label: "Volatility", value: volValue, detail: `${absChange.toFixed(1)}% swing range`, icon: <Activity className="w-4 h-4" />, color: volColor },
    { label: "Momentum", value: momValue, detail: cp > 0 ? "Buyers in control" : cp < 0 ? "Sellers in control" : "Balanced flow", icon: <BarChart3 className="w-4 h-4" />, color: momColor },
    { label: "Key Levels", value: `S: $${fmt(support)}`, detail: `R: $${fmt(resistance)}`, icon: <Target className="w-4 h-4" />, color: "text-accent" },
    { label: "Beginner Tip", value: "", detail: tips[0], icon: <Lightbulb className="w-4 h-4" />, color: "text-primary" },
  ];
}

export function MarketInsightPanel({ asset }: MarketInsightPanelProps) {
  const insights = deriveInsights(asset);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight-cyber">Market Insight</h3>
        <span className="text-2xs text-muted-foreground">Educational Estimate · Not Financial Advice</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {insights.map((tile) => (
          <div
            key={tile.label}
            className="glass-tactile border-chrome rounded-xl p-3.5 space-y-1.5"
          >
            <div className="flex items-center gap-1.5">
              <span className={cn("shrink-0", tile.color)}>{tile.icon}</span>
              <span className="text-2xs uppercase tracking-wider text-muted-foreground font-medium">{tile.label}</span>
            </div>
            {tile.value && (
              <p className={cn("text-sm font-semibold", tile.color)}>{tile.value}</p>
            )}
            <p className="text-2xs text-muted-foreground leading-relaxed">{tile.detail}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
