import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedAssets } from "@/components/RelatedAssets";
import { AssetFAQSection } from "@/components/AssetFAQSection";
import { AssetIntelligence } from "@/components/AssetIntelligence";
import { AIReadySummary } from "@/components/AIReadySummary";
import { GEOKeyTakeaways } from "@/components/GEOKeyTakeaways";
import { TradingStrengthMeter } from "@/components/TradingStrengthMeter";
import { GlowStatusBar } from "@/components/trading/GlowStatusBar";
import { AssetSearchDropdown } from "@/components/trading/AssetSearchDropdown";
import { MinimalistAreaChart } from "@/components/trading/MinimalistAreaChart";
import { MinimalistOrderPanel } from "@/components/trading/MinimalistOrderPanel";
import { MinimalistPortfolioBar } from "@/components/trading/MinimalistPortfolioBar";
import { AIMentor } from "@/components/trading/AIMentor";
import { ChartSkeleton } from "@/components/trading/ChartSkeleton";
import { MobileOrderDrawer } from "@/components/trading/MobileOrderDrawer";
import { ASSETS } from "@/lib/assets";
import { Asset } from "@/lib/types";
import { getPortfolio, executeTrade, updatePositionPrices } from "@/lib/portfolio";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { simulateAssetPrices, setLastUpdateTime } from "@/lib/priceSimulation";
import { useToast } from "@/hooks/use-toast";
import { useLiveMarketData } from "@/hooks/useLiveMarketData";
import { 
  getAssetContent, 
  generateAssetMetaTitle, 
  generateAssetMetaDescription,
  generateMarketOutlook,
  generateStudentUseSection,
  isInSeedSet,
  getAssetColor,
  getAssetFAQs
} from "@/lib/assetContent";
import { AlertTriangle } from "lucide-react";

// Wrapper component to provide live data to AssetIntelligence
function AssetIntelligenceWithLiveData({ asset }: { asset: Asset }) {
  const { liveData, isLoading } = useLiveMarketData(asset, { refreshInterval: 30000 });
  return <AssetIntelligence asset={asset} liveData={liveData} isLiveLoading={isLoading} />;
}

export default function TradeAsset() {
  const { symbol } = useParams<{ symbol: string }>();
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
   
  const isMounted = useRef(true);

  // Find asset by symbol (case-insensitive)
  const findAssetBySymbol = useCallback((symbolParam: string): Asset | null => {
    const normalizedSymbol = symbolParam.toUpperCase().replace(/-/g, '/');
    return ASSETS.find(a => 
      a.symbol.toUpperCase() === normalizedSymbol || 
      a.id === symbolParam.toLowerCase()
    ) || null;
  }, []);

  useEffect(() => {
    isMounted.current = true;
    
    // Find the asset from the URL parameter
    const targetAsset = symbol ? findAssetBySymbol(symbol) : ASSETS[0];
    
    const loadTimer = setTimeout(() => {
      if (!isMounted.current) return;
      setAssets(ASSETS);
      setSelectedAsset(targetAsset);
      setIsLoading(false);
    }, 600);

    const updated = updatePositionPrices(portfolio);
    setPortfolio(updated);
    setFavorites(getFavorites());

    const priceInterval = setInterval(() => {
      if (!isMounted.current) return;
      
      setAssets(prev => {
        if (prev.length === 0) return prev;
        const updated = simulateAssetPrices(prev, 0.05);
        return updated;
      });
      setLastUpdateTime(new Date());
    }, 3000);

    return () => {
      isMounted.current = false;
      clearTimeout(loadTimer);
      clearInterval(priceInterval);
    };
  }, [symbol, findAssetBySymbol]);

  useEffect(() => {
    if (selectedAsset && isMounted.current && assets.length > 0) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated) setSelectedAsset(updated);
    }
  }, [assets, selectedAsset]);

  const handleTrade = useCallback((
    asset: Asset,
    type: 'buy' | 'sell',
    quantity: number,
    orderType?: 'market' | 'limit',
    limitPrice?: number
  ) => {
    const result = executeTrade(portfolio, asset, type, quantity);
    
    if (result.success && result.portfolio) {
      setPortfolio(result.portfolio);
      toast({
        title: `${type === 'buy' ? '🟢' : '🔴'} Order Executed`,
        description: `${type === 'buy' ? 'Bought' : 'Sold'} ${quantity.toFixed(4)} ${asset.symbol} at $${asset.price.toLocaleString()}`,
      });
    } else {
      toast({
        title: "Order Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  }, [portfolio, toast]);

  const handleToggleFavorite = useCallback((assetId: string) => {
    toggleFavorite(assetId);
    setFavorites(getFavorites());
  }, []);

  // Redirect if asset not found
  if (symbol && !findAssetBySymbol(symbol)) {
    return <Navigate to="/trade" replace />;
  }

  // Get content for SEO blocks
  const assetContent = selectedAsset ? getAssetContent(selectedAsset.id) : null;
  const assetFAQs = selectedAsset ? getAssetFAQs(selectedAsset.id) : [];
  const metaTitle = selectedAsset ? generateAssetMetaTitle(selectedAsset) : "Trade | TradeHQ";
  const metaDescription = selectedAsset ? generateAssetMetaDescription(selectedAsset) : "";
  const canonicalUrl = selectedAsset 
    ? `https://tradinghq.vercel.app/trade/${selectedAsset.id}`
    : "https://tradinghq.vercel.app/trade";
  const assetColor = selectedAsset ? getAssetColor(selectedAsset.id) : '#00FFFF';

  // --- CLEAN SCHEMA: No fake ratings, proper nesting ---
  // GEOKeySummary - neutral, factual, machine-readable for AI Overviews
  const geoKeySummarySchema = selectedAsset && assetContent ? {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": `${selectedAsset.name} (${selectedAsset.symbol})`,
    "description": assetContent.whatIs.split('. ')[0] + '.',
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "TradeHQ Asset Directory"
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "primaryInfluencers",
        "value": assetContent.stats?.primaryDriver || (selectedAsset.type === 'crypto' ? 'Network adoption, regulatory developments, digital asset sentiment' : 'Macroeconomic conditions, sector catalysts, earnings')
      },
      {
        "@type": "PropertyValue",
        "name": "simulatorScope",
        "value": `Practice ${selectedAsset.symbol} trading with $10K virtual capital, simulated charts, and AI mentoring — educational only.`
      },
      {
        "@type": "PropertyValue",
        "name": "studentPerspective",
        "value": `Students can practice ${selectedAsset.symbol} trading as beginners — build skills risk-free before committing real capital.`
      }
    ]
  } : null;

  // FinancialProduct schema for asset pages (no AggregateRating without real reviews)
  const financialProductSchema = selectedAsset ? {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${selectedAsset.name} Trading Simulator`,
    "description": assetContent?.whatIs || metaDescription || `${selectedAsset.name} trading simulator`,
    "url": canonicalUrl,
    "category": assetContent?.category || selectedAsset.type,
    "provider": {
      "@type": "Organization",
      "name": "TradeHQ",
      "url": "https://tradinghq.vercel.app/",
      "logo": "https://tradinghq.vercel.app/og-image.png"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    }
  } : null;

  // Organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TradeHQ",
    "url": "https://tradinghq.vercel.app/",
    "logo": "https://tradinghq.vercel.app/og-image.png",
    
  };

  // FAQ Schema - only if real FAQs exist
  const allFAQs = selectedAsset && assetFAQs.length > 0 ? [
    ...assetFAQs.map(faq => ({
      "@type": "Question" as const,
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": faq.answer || "Answer pending update."
      }
    })),
    {
      "@type": "Question" as const,
      "name": `How can I practice trading ${selectedAsset.name}?`,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": `TradeHQ provides $10,000 in virtual capital to practice ${selectedAsset.symbol} trading risk-free. Select ${selectedAsset.symbol} from the asset list to start practicing with simulated charts and AI mentoring.`
      }
    }
  ] : [];

  const faqSchema = allFAQs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": allFAQs
  } : null;

  // Breadcrumb schema
  const breadcrumbSchema = selectedAsset ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://tradinghq.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Markets",
        "item": "https://tradinghq.vercel.app/markets"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": selectedAsset.name,
        "item": canonicalUrl
      }
    ]
  } : null;

  const showSeoBlocks = selectedAsset && isInSeedSet(selectedAsset.id);

  const breadcrumbItems = selectedAsset ? [
    { label: "Markets", href: "/markets" },
    { label: selectedAsset.name }
  ] : [];

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tradehq" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
        
        <meta name="theme-color" content={assetColor} />
        
        {/* GEO KEY SUMMARY SCHEMA */}
        {geoKeySummarySchema && (
          <script type="application/ld+json">
            {JSON.stringify(geoKeySummarySchema)}
          </script>
        )}

        {/* FINANCIAL PRODUCT SCHEMA */}
        {financialProductSchema && (
          <script type="application/ld+json">
            {JSON.stringify(financialProductSchema)}
          </script>
        )}

        {/* ORGANIZATION SCHEMA */}
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
        
        {/* FAQ SCHEMA - only when real Q&A exist */}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
        
        {/* BREADCRUMB SCHEMA */}
        {breadcrumbSchema && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <GlowStatusBar />

        <main className="flex-1 container mx-auto px-4 py-6 space-y-6 max-w-7xl">
          {selectedAsset && <Breadcrumb items={breadcrumbItems} />}
          
          {selectedAsset && (
            <header>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {selectedAsset.name} — Practice Trading Simulator 2026
              </h1>
              <p className="text-sm text-muted-foreground mb-4">
                Use the TradeHQ simulator to practice {selectedAsset.symbol} trading with $10,000 in virtual capital. Learn to read charts, manage risk, and build strategies — all without risking real money.
              </p>
            </header>
          )}

          {/* GEO Key Takeaways - machine-readable for AI Overviews */}
          {selectedAsset && <GEOKeyTakeaways asset={selectedAsset} />}
          
          {selectedAsset && showSeoBlocks && (
            <AIReadySummary asset={selectedAsset} />
          )}
          
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <AssetSearchDropdown
              assets={assets}
              selectedAsset={selectedAsset}
              favorites={favorites}
              onSelectAsset={setSelectedAsset}
              onToggleFavorite={handleToggleFavorite}
            />
            
            <div className="w-full lg:w-auto lg:flex-1 lg:max-w-2xl">
              <MinimalistPortfolioBar portfolio={portfolio} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glass-liquid border border-white/10 rounded-2xl h-[500px] overflow-hidden">
                {isLoading ? (
                  <ChartSkeleton />
                ) : (
                  selectedAsset && <MinimalistAreaChart asset={selectedAsset} />
                )}
              </div>
            </div>

            <div className="hidden lg:flex lg:flex-col gap-4">
              <MinimalistOrderPanel
                asset={selectedAsset}
                availableCash={portfolio.cash}
                onTrade={handleTrade}
              />
              
              {selectedAsset && showSeoBlocks && (
                <TradingStrengthMeter asset={selectedAsset} />
              )}
            </div>
          </div>

          {/* Asset Intelligence - shown for seed assets */}
          {showSeoBlocks && selectedAsset && (
            <AssetIntelligenceWithLiveData asset={selectedAsset} />
          )}

          {/* Educational disclaimer - inline */}

          {selectedAsset && assetFAQs.length > 0 && (
            <AssetFAQSection 
              assetName={selectedAsset.name}
              assetSymbol={selectedAsset.symbol}
              faqs={assetFAQs}
            />
          )}

          {/* How Students Use This Simulator */}
          {selectedAsset && (
            <section className="mt-8 p-6 bg-card/30 backdrop-blur-xl rounded-2xl border border-border/30">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                How Students Practice {selectedAsset.symbol} Trading
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {generateStudentUseSection(selectedAsset)}
              </p>
              <p className="text-xs text-muted-foreground/60 mt-3 italic">
                Student perspective: Practice {selectedAsset.symbol} trading as a beginner in Colombo or anywhere — build skills risk-free.
              </p>
            </section>
          )}

          {/* Market Strategic Outlook - shown for ALL asset pages */}
          {selectedAsset && (
            <section className="mt-8 p-6 bg-card/30 backdrop-blur-xl rounded-2xl border border-border/30">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                {selectedAsset.symbol} Simulated Market Analysis — Educational Overview 2026
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                {generateMarketOutlook(selectedAsset).split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          )}

          {selectedAsset && <RelatedAssets currentAsset={selectedAsset} />}

          {/* Standardized disclaimer - ALL pages */}
          <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-white/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>(Educational simulation only — not financial advice.)</strong>{' '}
                TradeHQ is a simulator for educational purposes only. 
                No real money is at risk. Past performance in a simulation does not guarantee future real-world results. 
                Always consult a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </div>

          <div className="lg:hidden">
            <MobileOrderDrawer
              asset={selectedAsset}
              availableCash={portfolio.cash}
              onTrade={handleTrade}
            />
          </div>
        </main>

        <AIMentor 
          portfolio={portfolio} 
          assets={assets} 
          selectedAsset={selectedAsset}
        />
      </div>
    </>
  );
}
