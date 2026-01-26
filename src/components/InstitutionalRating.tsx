import { Star, Shield, Users } from "lucide-react";

interface InstitutionalRatingProps {
  variant?: "compact" | "full";
  className?: string;
}

/**
 * InstitutionalRating - Social proof badge for trust signals
 * Displays verified rating and beta strategist count
 */
export function InstitutionalRating({ variant = "compact", className = "" }: InstitutionalRatingProps) {
  if (variant === "compact") {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/30 ${className}`}>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star 
              key={i} 
              className={`w-3 h-3 ${i < 5 ? 'text-yellow-500 fill-yellow-500' : 'text-muted-foreground'}`} 
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">4.9</span>/5
        </span>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          (1,500+ Strategists)
        </span>
      </div>
    );
  }

  return (
    <div className={`glass-liquid-card p-6 ${className}`}>
      <div className="flex items-start gap-4">
        {/* Shield icon */}
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
          <Shield className="w-6 h-6 text-primary" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-semibold text-foreground">
              Verified Institutional Rating
            </span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className="w-4 h-4 text-yellow-500 fill-yellow-500" 
                />
              ))}
            </div>
            <span className="text-sm font-bold text-foreground">4.9/5</span>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">1,500+</span> Beta Strategists
              </span>
            </div>
            <div className="h-3 w-px bg-border/50" />
            <span className="text-xs text-muted-foreground">
              Updated: January 2026
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
