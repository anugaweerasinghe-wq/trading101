import { Asset } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AssetContextCardProps {
  asset: Asset;
}

const TYPE_LABELS: Record<string, string> = {
  crypto: "Crypto",
  stock: "Stock",
  etf: "ETF",
  commodity: "Commodity",
  forex: "Forex",
};

function formatLargeNumber(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  return `$${n.toLocaleString()}`;
}

/** Deterministic simulated market cap & volume based on price and asset type */
function getSimulatedMetrics(asset: Asset) {
  // Seed from symbol characters for determinism
  const seed = asset.symbol.split("").reduce((s, c) => s + c.charCodeAt(0), 0);
  const priceBase = asset.price;

  const capMultipliers: Record<string, number> = {
    crypto: 18_000_000,
    stock: 2_500_000_000,
    etf: 800_000_000,
    commodity: 1_200_000_000,
    forex: 5_000_000_000,
  };

  const volMultipliers: Record<string, number> = {
    crypto: 450_000,
    stock: 12_000_000,
    etf: 3_000_000,
    commodity: 2_000_000,
    forex: 8_000_000,
  };

  const capBase = capMultipliers[asset.type] || 1_000_000_000;
  const volBase = volMultipliers[asset.type] || 5_000_000;

  const jitter = ((seed % 47) + 10) / 30; // 0.33 – 1.9 range
  const marketCap = priceBase * capBase * jitter * 0.001;
  const volume24h = volBase * jitter * (1 + Math.abs(asset.changePercent) * 0.1);

  return { marketCap, volume24h };
}

export function AssetContextCard({ asset }: AssetContextCardProps) {
  const isUp = asset.changePercent >= 0;
  const { marketCap, volume24h } = getSimulatedMetrics(asset);

  const formattedPrice =
    asset.price < 1
      ? `$${asset.price.toFixed(4)}`
      : `$${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="glass-tactile border-chrome rounded-2xl px-5 py-4 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Left: Name + type */}
      <div className="flex items-center gap-3 min-w-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold tracking-tight-cyber truncate">{asset.name}</h2>
            <Badge variant="outline" className="text-2xs uppercase tracking-wider border-border/60">
              {TYPE_LABELS[asset.type] || asset.type}
            </Badge>
          </div>
          <span className="text-sm text-muted-foreground font-medium">{asset.symbol}</span>
        </div>
      </div>

      {/* Center: Price + change */}
      <div className="flex items-baseline gap-3 sm:ml-auto">
        <span className="text-2xl font-bold tabular-nums">{formattedPrice}</span>
        <span
          className={cn(
            "flex items-center gap-1 text-sm font-semibold tabular-nums",
            isUp ? "text-profit" : "text-loss"
          )}
        >
          {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
          {isUp ? "+" : ""}
          {asset.changePercent.toFixed(2)}%
        </span>
      </div>

      {/* Right: Simulated stats */}
      <div className="flex gap-6 text-xs text-muted-foreground sm:ml-6 sm:border-l sm:border-border/40 sm:pl-6">
        <div>
          <span className="block text-2xs uppercase tracking-wider mb-0.5">Est. Mkt Cap</span>
          <span className="text-foreground font-medium tabular-nums">{formatLargeNumber(marketCap)}</span>
        </div>
        <div>
          <span className="block text-2xs uppercase tracking-wider mb-0.5">Est. 24h Vol</span>
          <span className="text-foreground font-medium tabular-nums">{formatLargeNumber(volume24h)}</span>
        </div>
      </div>
    </div>
  );
}
