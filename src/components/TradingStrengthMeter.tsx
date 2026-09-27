import { Asset } from "@/lib/types";
import { Gauge, TrendingUp, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface TradingStrengthMeterProps {
  asset: Asset;
}

// Descriptive simulator activity score based only on the displayed percentage move.
// It is not a quality, opportunity, suitability, or expected-return score.
function calculateActivityScore(asset: Asset): {
  score: number;
  factors: { name: string; value: number; icon: React.ComponentType<any> }[];
  interpretation: string;
} {
  const changePercent = asset.changePercent || asset.change || 0;
  const directionScore = Math.min(100, Math.max(0, 50 + changePercent * 10));
  const movementScore = Math.min(100, Math.max(0, Math.abs(changePercent) * 12));
  const overallScore = Math.round(directionScore * 0.5 + movementScore * 0.5);

  let interpretation = "The displayed simulator price is showing limited movement.";
  if (movementScore >= 70) {
    interpretation = "The displayed simulator price is showing a relatively large move. This does not imply a better trading opportunity.";
  } else if (movementScore >= 35) {
    interpretation = "The displayed simulator price is showing moderate movement. Use the score only as a descriptive practice indicator.";
  }

  return {
    score: overallScore,
    factors: [
      { name: "Direction", value: Math.round(directionScore), icon: TrendingUp },
      { name: "Movement", value: Math.round(movementScore), icon: Zap },
    ],
    interpretation,
  };
}

export function TradingStrengthMeter({ asset }: TradingStrengthMeterProps) {
  const { score, factors, interpretation } = calculateActivityScore(asset);
  
  // Determine color based on score
  const getScoreColor = (s: number) => {
    if (s >= 70) return "text-green-400";
    if (s >= 50) return "text-yellow-400";
    return "text-red-400";
  };
  
  const getProgressColor = (s: number) => {
    if (s >= 70) return "bg-green-500";
    if (s >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };
  
  // Gauge rotation calculation (-90 to 90 degrees for half circle)
  const gaugeRotation = -90 + (score / 100) * 180;
  
  return (
    <section 
      className="glass-panel border border-white/10 rounded-2xl p-6"
      aria-label="Practice activity indicator"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
          <Gauge className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">
            Practice Activity Meter
          </h3>
          <p className="text-xs text-muted-foreground">
            Simulator-derived movement score for {asset.symbol}
          </p>
        </div>
      </div>
      
      {/* Visual Gauge */}
      <div className="flex justify-center my-6">
        <div className="relative w-40 h-20 overflow-hidden">
          {/* Background arc */}
          <div className="absolute inset-0 border-8 border-muted/30 rounded-t-full" />
          
          {/* Colored segments */}
          <div className="absolute inset-0 border-8 border-transparent border-t-red-500/50 border-l-red-500/50 rounded-t-full" 
               style={{ clipPath: 'polygon(0 100%, 0 0, 33% 0, 33% 100%)' }} />
          <div className="absolute inset-0 border-8 border-transparent border-t-yellow-500/50 rounded-t-full"
               style={{ clipPath: 'polygon(33% 100%, 33% 0, 66% 0, 66% 100%)' }} />
          <div className="absolute inset-0 border-8 border-transparent border-t-green-500/50 border-r-green-500/50 rounded-t-full"
               style={{ clipPath: 'polygon(66% 100%, 66% 0, 100% 0, 100% 100%)' }} />
          
          {/* Needle */}
          <div 
            className="absolute bottom-0 left-1/2 w-1 h-16 origin-bottom transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-50%) rotate(${gaugeRotation}deg)` }}
          >
            <div className={cn("w-full h-full rounded-t", getProgressColor(score))} />
          </div>
          
          {/* Center circle */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 rounded-full bg-background border-2 border-primary" />
        </div>
      </div>
      
      {/* Score Display */}
      <div className="text-center mb-4">
        <span className={cn("text-4xl font-bold", getScoreColor(score))}>
          {score}
        </span>
        <span className="text-muted-foreground text-lg">/100</span>
      </div>
      
      {/* Factor Breakdown */}
      <div className="space-y-3 mb-4">
        {factors.map((factor) => {
          const Icon = factor.icon;
          return (
            <div key={factor.name} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Icon className="w-4 h-4" />
                  {factor.name}
                </span>
                <span className={cn("font-medium", getScoreColor(factor.value))}>
                  {factor.value}%
                </span>
              </div>
              <div className="h-1.5 bg-muted/30 rounded-full overflow-hidden">
                <div 
                  className={cn("h-full rounded-full transition-all duration-500", getProgressColor(factor.value))}
                  style={{ width: `${factor.value}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Interpretation */}
      <p className="text-xs text-muted-foreground text-center italic border-t border-white/5 pt-3">
        {interpretation}
      </p>
    </section>
  );
}