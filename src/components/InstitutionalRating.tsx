import { Shield, Users } from "lucide-react";

interface InstitutionalRatingProps {
  variant?: "compact" | "full";
  className?: string;
}

/**
 * InstitutionalRating - Feature highlight badge
 * Displays platform features (no fabricated ratings)
 */
export function InstitutionalRating({ variant = "compact", className = "" }: InstitutionalRatingProps) {
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/30 ${className}`}>
        <Shield className="w-3 h-3 text-primary" />
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">150+</span> Assets
        </span>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          · $10K Virtual Cash
        </span>
      </div>
    );
  }

  return (
    <div className={`glass-liquid-card p-6 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-foreground">
              Educational Trading Simulator
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">150+</span> Tradeable Assets
              </span>
            </div>
            <div className="h-3 w-px bg-border/50" />
            <span className="text-xs text-muted-foreground">
              $10K Virtual Capital · Free Forever
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
