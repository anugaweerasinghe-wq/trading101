import { Link } from "react-router-dom";
import { Asset } from "@/lib/types";
import { ASSETS } from "@/lib/assets";
import { TrendingUp, ArrowRight } from "lucide-react";

interface RelatedAssetsProps {
  currentAsset: Asset;
}

// Get related assets based on type
function getRelatedAssets(currentAsset: Asset): Asset[] {
  // Filter assets of the same type, excluding current
  const sameType = ASSETS.filter(
    a => a.type === currentAsset.type && a.id !== currentAsset.id
  );
  
  // Sort by market cap proxy (higher price first for simplicity)
  const sorted = [...sameType].sort((a, b) => b.price - a.price);
  
  // Return top 4
  return sorted.slice(0, 4);
}

// Get asset URL slug
function getAssetSlug(asset: Asset): string {
  return asset.symbol.toLowerCase().replace('/', '-');
}

// Get type-specific title
function getRelatedTitle(type: Asset['type']): string {
  switch (type) {
    case 'crypto':
      return 'Related Cryptocurrencies';
    case 'stock':
      return 'Related Stocks';
    case 'etf':
      return 'Related ETFs';
    case 'forex':
      return 'Related Currency Pairs';
    case 'commodity':
      return 'Related Commodities';
    default:
      return 'Related Assets';
  }
}

export function RelatedAssets({ currentAsset }: RelatedAssetsProps) {
  const relatedAssets = getRelatedAssets(currentAsset);
  
  if (relatedAssets.length === 0) return null;

  return (
    <section className="mt-8">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          {getRelatedTitle(currentAsset.type)}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {relatedAssets.map((asset) => (
          <Link
            key={asset.id}
            to={`/trade/${getAssetSlug(asset)}`}
            className="group glass-panel border border-white/10 rounded-xl p-4 hover:border-primary/30 transition-all duration-200 hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                {asset.symbol}
              </span>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            
            <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
              {asset.name}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">
                ${asset.price.toLocaleString(undefined, { 
                  minimumFractionDigits: 2, 
                  maximumFractionDigits: asset.price < 1 ? 4 : 2 
                })}
              </span>
              <span className={`text-xs font-medium ${
                asset.changePercent >= 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {asset.changePercent >= 0 ? '+' : ''}{asset.changePercent.toFixed(2)}%
              </span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* SEO-friendly internal link */}
      <div className="mt-4 text-center">
        <Link 
          to="/markets"
          className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
        >
          View all {currentAsset.type === 'crypto' ? 'cryptocurrencies' : 
                    currentAsset.type === 'stock' ? 'stocks' : 
                    currentAsset.type === 'etf' ? 'ETFs' :
                    currentAsset.type === 'forex' ? 'currency pairs' : 'commodities'}
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </section>
  );
}
