import { Asset } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetContextCardProps {
  asset: Asset;
}

const TYPE_LABELS: Record<Asset["type"], string> = {
  crypto: "Crypto",
  stock: "Stock",
  etf: "ETF",
  commodity: "Commodity",
  forex: "Forex",
};

function formatPrice(value: number) {
  if (value < 1) return `$${value.toFixed(4)}`;
  return `$${value.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

function getRiskProfile(asset: Asset) {
  if (asset.type === "crypto") return "High volatility";
  if (asset.type === "forex" || asset.type === "commodity") return "Active market";
  return "Moderate volatility";
}

function getBiasLabel(changePercent: number) {
  if (changePercent > 2) return "Bullish bias";
  if (changePercent < -2) return "Bearish bias";
  return "Balanced";
}

export function AssetContextCard({ asset }: AssetContextCardProps) {
  const isUp = asset.changePercent >= 0;

  return (
    <section className="glass-tactile border-chrome rounded-2xl p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="truncate text-xl font-semibold md:text-2xl">
              {asset.name}
            </h2>
            <Badge
              variant="outline"
              className="border-white/10 bg-white/5 text-[10px] uppercase tracking-wide text-muted-foreground"
            >
              {TYPE_LABELS[asset.type] ?? asset.type}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{asset.symbol}</p>
        </div>

        <div className="text-left md:text-right">
          <p className="text-2xl font-semibold tabular-nums md:text-3xl">
            {formatPrice(asset.price)}
          </p>
          <div
            className={cn(
              "mt-1 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
              isUp ? "bg-profit/10 text-profit" : "bg-loss/10 text-loss",
            )}
          >
            {isUp ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
            {isUp ? "+" : ""}
            {asset.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
          <p className="text-2xs uppercase tracking-wide text-muted-foreground">
            What you&apos;re trading
          </p>
          <p className="mt-1 text-sm font-medium">
            {TYPE_LABELS[asset.type]} · Simulated market practice
          </p>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
          <p className="text-2xs uppercase tracking-wide text-muted-foreground">
            Risk profile
          </p>
          <p className="mt-1 text-sm font-medium">{getRiskProfile(asset)}</p>
        </div>

        <div className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
          <p className="text-2xs uppercase tracking-wide text-muted-foreground">
            Short-term bias
          </p>
          <p className="mt-1 text-sm font-medium">{getBiasLabel(asset.changePercent)}</p>
        </div>
      </div>
    </section>
  );
}
