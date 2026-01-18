import { Asset } from "@/lib/types";
import { getAssetContent } from "@/lib/assetContent";
import { BookOpen, Target, BarChart3, AlertTriangle, Loader2 } from "lucide-react";

interface AssetIntelligenceProps {
  asset: Asset;
  liveMarketCap?: string;
}

// Truncate meta description to 155 characters safely (no mid-sentence cuts)
export function truncateMetaDescription(text: string, maxLength: number = 155): string {
  if (text.length <= maxLength) return text;
  
  // Find the last sentence boundary before maxLength
  const truncated = text.slice(0, maxLength);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastQuestion = truncated.lastIndexOf('?');
  const lastExclamation = truncated.lastIndexOf('!');
  
  const lastBoundary = Math.max(lastPeriod, lastQuestion, lastExclamation);
  
  if (lastBoundary > maxLength * 0.5) {
    return text.slice(0, lastBoundary + 1);
  }
  
  // Fallback: cut at last space and add ellipsis
  const lastSpace = truncated.lastIndexOf(' ');
  return text.slice(0, lastSpace) + '...';
}

export function AssetIntelligence({ asset, liveMarketCap }: AssetIntelligenceProps) {
  const content = getAssetContent(asset.id);
  
  if (!content) return null;

  const stats = content.stats;
  const isLiveData = stats?.marketCap === "live_sourced_at_runtime";

  return (
    <section 
      className="mt-8"
      aria-label={`${asset.name} Asset Intelligence`}
    >
      <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Asset Intelligence
      </h2>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        role="region"
        aria-label="Asset information cards"
      >
        {/* Column 1: Context (What Is) */}
        <article 
          className="glass-panel border border-white/10 rounded-2xl p-6"
          aria-labelledby={`context-heading-${asset.id}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <h3 
              id={`context-heading-${asset.id}`}
              className="text-lg font-semibold text-foreground"
            >
              What is {asset.name}?
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            {content.whatIs}
          </p>
        </article>

        {/* Column 2: Strategy */}
        <article 
          className="glass-panel border border-white/10 rounded-2xl p-6"
          aria-labelledby={`strategy-heading-${asset.id}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
              <Target className="w-5 h-5 text-accent" aria-hidden="true" />
            </div>
            <h3 
              id={`strategy-heading-${asset.id}`}
              className="text-lg font-semibold text-foreground"
            >
              Simulator Strategy
            </h3>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed mb-4">
            {content.strategy}
          </p>
          {/* Legal Disclaimer */}
          <div className="mt-auto pt-3 border-t border-white/5">
            <p className="text-xs text-muted-foreground/70 flex items-start gap-1.5">
              <AlertTriangle className="w-3 h-3 mt-0.5 flex-shrink-0 text-yellow-500/70" aria-hidden="true" />
              <span>Disclaimer: Not financial advice. For educational simulation only.</span>
            </p>
          </div>
        </article>

        {/* Column 3: Stats */}
        <article 
          className="glass-panel border border-white/10 rounded-2xl p-6"
          aria-labelledby={`stats-heading-${asset.id}`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-secondary" aria-hidden="true" />
            </div>
            <h3 
              id={`stats-heading-${asset.id}`}
              className="text-lg font-semibold text-foreground"
            >
              Key Stats
            </h3>
          </div>
          
          <div className="space-y-3">
            {/* Live Price */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">Price</span>
              <span className="text-foreground font-medium">
                ${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            
            {/* 24h Change */}
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground text-sm">24h Change</span>
              <span className={`font-medium ${asset.changePercent >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
              </span>
            </div>

            {/* Market Cap - Live or Static */}
            {stats?.marketCap && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Market Cap</span>
                <span className="text-foreground font-medium">
                  {isLiveData ? (
                    liveMarketCap ? (
                      liveMarketCap
                    ) : (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Loader2 className="w-3 h-3 animate-spin" />
                        Loading...
                      </span>
                    )
                  ) : (
                    stats.marketCap
                  )}
                </span>
              </div>
            )}
            
            {/* Asset Class */}
            {stats?.assetClass && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Asset Class</span>
                <span className="text-foreground font-medium">{stats.assetClass}</span>
              </div>
            )}
            
            {/* Sector (for stocks) */}
            {stats?.sector && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Sector</span>
                <span className="text-foreground font-medium">{stats.sector}</span>
              </div>
            )}
            
            {/* Primary Driver */}
            {stats?.primaryDriver && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Primary Driver</span>
                <span className="text-foreground font-medium">{stats.primaryDriver}</span>
              </div>
            )}
            
            {/* Max Supply (for crypto) */}
            {stats?.maxSupply && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Max Supply</span>
                <span className="text-foreground font-medium">{stats.maxSupply}</span>
              </div>
            )}
            
            {/* Correlation */}
            {stats?.correlation && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground text-sm">Correlation</span>
                <span className="text-foreground font-medium">{stats.correlation}</span>
              </div>
            )}
            
            {/* Source */}
            {stats?.source && (
              <div className="flex justify-between items-center pt-2 border-t border-white/5">
                <span className="text-muted-foreground/60 text-xs">Source</span>
                <span className="text-muted-foreground/60 text-xs">{stats.source}</span>
              </div>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}