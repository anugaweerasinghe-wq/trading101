import { useState, useEffect } from "react";
import { TrendingUp, Activity, Zap, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface MarketData {
  label: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export function MarketSentimentTicker() {
  const [sentimentIndex, setSentimentIndex] = useState(78);
  const [isVisible, setIsVisible] = useState(true);

  // Simulate live market sentiment changes
  useEffect(() => {
    const interval = setInterval(() => {
      setSentimentIndex(prev => {
        const change = (Math.random() - 0.45) * 3;
        return Math.max(25, Math.min(95, prev + change));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getSentimentLabel = (index: number) => {
    if (index >= 75) return { label: "Extreme Greed", color: "text-profit" };
    if (index >= 55) return { label: "Greed", color: "text-profit" };
    if (index >= 45) return { label: "Neutral", color: "text-warning" };
    if (index >= 25) return { label: "Fear", color: "text-loss" };
    return { label: "Extreme Fear", color: "text-loss" };
  };

  const sentiment = getSentimentLabel(sentimentIndex);

  const marketData: MarketData[] = [
    { label: "BTC", value: "$98,432", change: 2.4, icon: <Flame className="w-3 h-3" /> },
    { label: "ETH Layer 2", value: "$4,812", change: 5.7, icon: <Zap className="w-3 h-3" /> },
    { label: "S&P 500", value: "5,892", change: 0.8, icon: <TrendingUp className="w-3 h-3" /> },
    { label: "AI Index", value: "2,456", change: 3.2, icon: <Activity className="w-3 h-3" /> },
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-card via-card/95 to-card border-b border-border/50 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-10 overflow-hidden">
          {/* Sentiment Index */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <svg className="w-8 h-8 -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-muted/30"
                    strokeDasharray="100, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                  />
                  <path
                    className={sentiment.color}
                    strokeDasharray={`${sentimentIndex}, 100`}
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                  {Math.round(sentimentIndex)}
                </span>
              </div>
              <div className="hidden sm:block">
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider">2026 Market</p>
                <p className={cn("text-xs font-semibold", sentiment.color)}>{sentiment.label}</p>
              </div>
            </div>
          </div>

          {/* Market Data Ticker */}
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
            {marketData.map((data) => (
              <div key={data.label} className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-muted-foreground">{data.label}</span>
                <span className="text-xs font-semibold">{data.value}</span>
                <span className={cn(
                  "flex items-center gap-0.5 text-[10px] font-medium",
                  data.change >= 0 ? "text-profit" : "text-loss"
                )}>
                  {data.icon}
                  {data.change >= 0 ? "+" : ""}{data.change}%
                </span>
              </div>
            ))}
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-muted-foreground hover:text-foreground transition-colors ml-4 shrink-0"
            aria-label="Close ticker"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}
