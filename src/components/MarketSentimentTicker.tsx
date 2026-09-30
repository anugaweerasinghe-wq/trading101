import { useEffect, useMemo, useState } from "react";
import { TrendingUp, Activity, Zap, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import { ASSETS } from "@/lib/assets";
import { getPersistedPrices } from "@/lib/pricePersistence";

interface MarketData {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export function MarketSentimentTicker() {
  const [prices, setPrices] = useState(getPersistedPrices());
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setPrices(getPersistedPrices()), 5000);
    return () => clearInterval(interval);
  }, []);

  const sentimentIndex = useMemo(() => {
    const changes = ASSETS.slice(0, 20)
      .map((asset) => prices[asset.id]?.changePercent ?? asset.changePercent ?? 0)
      .filter(Number.isFinite);
    if (!changes.length) return 50;
    const avg = changes.reduce((sum, value) => sum + value, 0) / changes.length;
    return Math.round(Math.max(0, Math.min(100, 50 + avg * 10)));
  }, [prices]);

  const getSentimentLabel = (index: number) => {
    if (index >= 75) return { label: "Very Strong", color: "text-profit" };
    if (index >= 55) return { label: "Strong", color: "text-profit" };
    if (index >= 45) return { label: "Neutral", color: "text-warning" };
    if (index >= 25) return { label: "Weak", color: "text-loss" };
    return { label: "Very Weak", color: "text-loss" };
  };

  const sentiment = getSentimentLabel(sentimentIndex);
  const chosen = ["btc", "eth", "spy", "nvda"]
    .map((id) => ASSETS.find((asset) => asset.id === id))
    .filter((asset): asset is NonNullable<typeof asset> => Boolean(asset));
  const icons = [<Flame className="w-3 h-3" />, <Zap className="w-3 h-3" />, <TrendingUp className="w-3 h-3" />, <Activity className="w-3 h-3" />];

  const marketData: MarketData[] = chosen.map((asset, index) => {
    const p = prices[asset.id];
    const price = p?.price ?? asset.price;
    const change = p?.changePercent ?? asset.changePercent ?? 0;
    return {
      label: asset.symbol,
      value: `$${price.toLocaleString(undefined, { maximumFractionDigits: price >= 100 ? 0 : 2 })}`,
      change,
      icon: icons[index],
    };
  });

  if (!isVisible) return null;

  return (
    <div className="relative z-[40] bg-gradient-to-r from-card via-card/95 to-card border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10 overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                  <path className="text-muted/30" strokeDasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
                  <path className={sentiment.color} strokeDasharray={`${sentimentIndex}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">{sentimentIndex}</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Practice Momentum</p>
                <p className={cn("text-xs font-semibold", sentiment.color)}>{sentiment.label}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {marketData.map((data) => (
              <div key={data.label} className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">{data.label}</span>
                <span className="text-xs font-semibold">{data.value}</span>
                <span className={cn("flex items-center gap-0.5 text-[10px] font-medium", data.change >= 0 ? "text-profit" : "text-loss")}>
                  {data.icon}
                  {data.change >= 0 ? "+" : ""}{data.change.toFixed(2)}%
                </span>
              </div>
            ))}
          </div>

          <button onClick={() => setIsVisible(false)} className="text-muted-foreground hover:text-foreground transition-colors ml-4 shrink-0" aria-label="Close ticker">×</button>
        </div>
        <p className="sr-only">Practice values are simulator-derived and are not a live market-data feed.</p>
      </div>
    </div>
  );
}
