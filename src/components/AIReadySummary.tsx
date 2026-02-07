import { Asset } from "@/lib/types";
import { getAssetContent } from "@/lib/assetContent";
import { Sparkles, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIReadySummaryProps {
  asset: Asset;
}

// Generate AI Overview-optimized summary for GEO (Generative Engine Optimization)
function generateTradingSummary(asset: Asset): {
  verdict: 'bullish' | 'bearish' | 'neutral';
  summary: string;
  confidence: number;
} {
  const content = getAssetContent(asset.id);
  const changePercent = asset.changePercent || asset.change || 0;
  
  // Determine verdict based on price action and strategy alignment
  let verdict: 'bullish' | 'bearish' | 'neutral' = 'neutral';
  let confidence = 60;
  
  if (changePercent > 2) {
    verdict = 'bullish';
    confidence = Math.min(85, 65 + changePercent * 3);
  } else if (changePercent < -2) {
    verdict = 'bearish';
    confidence = Math.min(80, 60 + Math.abs(changePercent) * 2);
  } else if (changePercent > 0.5) {
    verdict = 'bullish';
    confidence = 55 + changePercent * 5;
  } else if (changePercent < -0.5) {
    verdict = 'bearish';
    confidence = 55 + Math.abs(changePercent) * 5;
  }
  
  // Generate contextual summary using strategy data
  const strategyHint = content?.strategy?.split('.')[0] || `Practice ${asset.symbol} trading patterns`;
  
  const summaries = {
    bullish: `${asset.name} shows upward momentum (+${changePercent.toFixed(1)}%). ${strategyHint}. Current conditions favor practicing long positions with defined stop-losses.`,
    bearish: `${asset.name} faces downward pressure (${changePercent.toFixed(1)}%). ${strategyHint}. Use this simulation to practice identifying reversal patterns or short-term hedging.`,
    neutral: `${asset.name} trades in consolidation (${changePercent >= 0 ? '+' : ''}${changePercent.toFixed(1)}%). ${strategyHint}. Ideal for practicing range-bound strategies and patience.`
  };
  
  return {
    verdict,
    summary: summaries[verdict],
    confidence: Math.round(confidence)
  };
}

export function AIReadySummary({ asset }: AIReadySummaryProps) {
  const { verdict, summary, confidence } = generateTradingSummary(asset);
  
  const verdictConfig = {
    bullish: {
      icon: TrendingUp,
      label: "Bullish Bias",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    bearish: {
      icon: TrendingDown,
      label: "Bearish Bias",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    neutral: {
      icon: Minus,
      label: "Neutral Range",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20"
    }
  };
  
  const config = verdictConfig[verdict];
  const Icon = config.icon;
  
  return (
    <section 
      className={cn(
        "rounded-xl border p-4 mb-6",
        config.bg,
        config.border
      )}
      aria-label="AI Trading Summary"
    >
      <div className="flex items-start gap-3">
        <div className={cn(
          "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0",
          config.bg
        )}>
          <Sparkles className={cn("w-5 h-5", config.color)} />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h2 className="text-sm font-semibold text-foreground">
              Should I Trade {asset.symbol} Today? — 2026 Strategy Snapshot
            </h2>
            <span className={cn(
              "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
              config.bg,
              config.color
            )}>
              <Icon className="w-3 h-3" />
              {config.label}
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {summary}
          </p>
          
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground/70">
            <span className="flex items-center gap-1">
              <span className="font-medium">Simulation Confidence:</span>
              <span className={config.color}>{confidence}%</span>
            </span>
            <span>•</span>
            <span>Updated: Just now</span>
            <span>•</span>
            <span className="italic">Educational simulation only</span>
          </div>
        </div>
      </div>
    </section>
  );
}