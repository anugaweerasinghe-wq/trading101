import type { ReactNode } from "react";
import { Asset } from "@/lib/types";
import {
  Activity,
  BarChart3,
  Lightbulb,
  Minus,
  Target,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketInsightPanelProps {
  asset: Asset;
}

interface InsightTile {
  label: string;
  value: string;
  detail: string;
  icon: ReactNode;
  color: string;
}

function formatPrice(value: number) {
  if (value < 1) return value.toFixed(4);
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function deriveInsights(asset: Asset): InsightTile[] {
  const cp = asset.changePercent;
  const absChange = Math.abs(cp);
  const price = asset.price;

  const trendValue = cp > 1.5 ? "Uptrend" : cp < -1.5 ? "Downtrend" : "Sideways";
  const trendColor =
    cp > 1.5 ? "text-profit" : cp < -1.5 ? "text-loss" : "text-muted-foreground";
  const trendIcon =
    cp > 1.5 ? (
      <TrendingUp className="h-4 w-4" />
    ) : cp < -1.5 ? (
      <TrendingDown className="h-4 w-4" />
    ) : (
      <Minus className="h-4 w-4" />
    );

  const volatilityThreshold =
    asset.type === "crypto" ? { low: 2, high: 5 } : { low: 1, high: 3 };
  const volatilityValue =
    absChange < volatilityThreshold.low
      ? "Low"
      : absChange > volatilityThreshold.high
        ? "High"
        : "Moderate";
  const volatilityColor =
    volatilityValue === "High"
      ? "text-warning"
      : volatilityValue === "Low"
        ? "text-profit"
        : "text-muted-foreground";

  const momentumValue = cp > 2 ? "Bullish" : cp < -2 ? "Bearish" : "Neutral";
  const momentumColor =
    cp > 2 ? "text-profit" : cp < -2 ? "text-loss" : "text-muted-foreground";

  const levelOffset = asset.type === "crypto" ? 0.04 : 0.025;
  const support = price * (1 - levelOffset);
  const resistance = price * (1 + levelOffset);

  const beginnerTip =
    absChange > 4
      ? "High volatility day — smaller position sizes usually make practice more realistic."
      : cp > 2
        ? "Momentum is strong. Avoid chasing moves without a plan."
        : cp < -2
          ? "Price is under pressure. Watch whether support levels actually hold before reacting."
          : "Market conditions are calmer. This is a good moment to study structure and risk.";

  return [
    {
      label: "Trend",
      value: trendValue,
      detail: `${cp >= 0 ? "+" : ""}${cp.toFixed(2)}% recent move`,
      icon: trendIcon,
      color: trendColor,
    },
    {
      label: "Volatility",
      value: volatilityValue,
      detail: `${absChange.toFixed(1)}% current swing`,
      icon: <Activity className="h-4 w-4" />,
      color: volatilityColor,
    },
    {
      label: "Momentum",
      value: momentumValue,
      detail: cp > 0 ? "Buyers in control" : cp < 0 ? "Sellers in control" : "Balanced flow",
      icon: <BarChart3 className="h-4 w-4" />,
      color: momentumColor,
    },
    {
      label: "Key Levels",
      value: `S: $${formatPrice(support)}`,
      detail: `R: $${formatPrice(resistance)}`,
      icon: <Target className="h-4 w-4" />,
      color: "text-accent",
    },
    {
      label: "Beginner Tip",
      value: "",
      detail: beginnerTip,
      icon: <Lightbulb className="h-4 w-4" />,
      color: "text-primary",
    },
  ];
}

export function MarketInsightPanel({ asset }: MarketInsightPanelProps) {
  const insights = deriveInsights(asset);

  return (
    <section className="glass-tactile border-chrome rounded-2xl p-4 md:p-5">
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight-cyber">
            Market Insight
          </h3>
          <p className="text-xs text-muted-foreground">
            Educational estimate · not financial advice
          </p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
        {insights.map((tile) => (
          <div
            key={tile.label}
            className="rounded-xl border border-white/8 bg-white/[0.02] p-3"
          >
            <div className={cn("mb-2 flex items-center gap-2", tile.color)}>
              {tile.icon}
              <span className="text-2xs uppercase tracking-wide">{tile.label}</span>
            </div>

            {tile.value ? (
              <p className="text-sm font-semibold text-foreground">{tile.value}</p>
            ) : null}

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              {tile.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
