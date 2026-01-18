import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Breadcrumb } from "@/components/Breadcrumb";
import { RelatedAssets } from "@/components/RelatedAssets";
import { AssetFAQSection } from "@/components/AssetFAQSection";
import { AssetIntelligence } from "@/components/AssetIntelligence";
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
import { 
  getAssetContent, 
  generateAssetMetaTitle, 
  generateAssetMetaDescription,
  isInSeedSet,
  getAssetColor,
  getAssetFAQs
} from "@/lib/assetContent";
import { AlertTriangle } from "lucide-react";

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
    ? `https://tradinghq.vercel.app/trade/${selectedAsset.symbol.toLowerCase().replace('/', '-')}`
    : "https://tradinghq.vercel.app/trade";
  const assetColor = selectedAsset ? getAssetColor(selectedAsset.id) : '#00FFFF';

  // Generate JSON-LD schema for the asset page (WebPage + FAQPage for "How to practice trade")
  const assetSchema = selectedAsset ? {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": metaTitle,
    "description": metaDescription,
    "url": canonicalUrl,
    "mainEntity": {
      "@type": "FinancialProduct",
      "name": selectedAsset.name,
      "description": assetContent?.whatIs || "",
      "category": assetContent?.category || selectedAsset.type
    },
    "isPartOf": {
      "@type": "WebSite",
      "name": "TradeHQ",
      "url": "https://tradinghq.vercel.app/"
    }
  } : null;

  // FAQ Schema - combine asset-specific FAQs with generic ones
  const allFAQs = selectedAsset && assetContent ? [
    // Asset-specific FAQs from ASSET_FAQS
    ...assetFAQs.map(faq => ({
      "@type": "Question" as const,
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": faq.answer
      }
    })),
    // Generic FAQs
    {
      "@type": "Question" as const,
      "name": `How to practice trade ${selectedAsset.name}?`,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": `${assetContent.strategy} TradeHQ provides $10,000 in virtual capital to practice ${selectedAsset.symbol} trading risk-free. Simply select ${selectedAsset.symbol} from the asset list, analyze the chart, and place your first trade.`
      }
    },
    {
      "@type": "Question" as const,
      "name": `Is ${selectedAsset.symbol} trading risky for beginners?`,
      "acceptedAnswer": {
        "@type": "Answer" as const,
        "text": `Yes, ${selectedAsset.type === 'crypto' ? 'cryptocurrency' : selectedAsset.type} trading carries risk. That's why we recommend practicing with a simulator like TradeHQ first. Learn to read charts, manage positions, and develop strategies without risking real money.`
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
        "name": "Trade",
        "item": "https://tradinghq.vercel.app/trade"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": selectedAsset.name,
        "item": canonicalUrl
      }
    ]
  } : null;

  // Only render SEO content blocks for seed assets
  const showSeoBlocks = selectedAsset && isInSeedSet(selectedAsset.id);

  // Breadcrumb items
  const breadcrumbItems = selectedAsset ? [
    { label: "Trade", href: "/trade" },
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
        <meta property="og:image" content={`https://tradinghq.vercel.app/og/${selectedAsset?.symbol.toLowerCase().replace('/', '-') || 'default'}.png`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        
        {/* Twitter Card - summary_large_image */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tradehq" />
        <meta name="twitter:creator" content="@tradehq" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={`https://tradinghq.vercel.app/og/${selectedAsset?.symbol.toLowerCase().replace('/', '-') || 'default'}.png`} />
        
        {/* Theme color matching asset */}
        <meta name="theme-color" content={assetColor} />
        
        {/* Structured Data */}
        {assetSchema && (
          <script type="application/ld+json">
            {JSON.stringify(assetSchema)}
          </script>
        )}
        {faqSchema && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
        {breadcrumbSchema && (
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        )}
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <Navigation />
        
        {/* Glow Status Bar */}
        <GlowStatusBar />

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-6 space-y-6 max-w-7xl">
          {/* Breadcrumb Navigation */}
          {selectedAsset && <Breadcrumb items={breadcrumbItems} />}
          
          {/* Section 1: Asset Search & Portfolio Bar */}
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

          {/* Section 2: Chart + Order Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Chart - Takes 2 columns on desktop */}
            <div className="lg:col-span-2">
              <div className="glass-panel border border-white/10 rounded-2xl h-[500px] overflow-hidden">
                {isLoading ? (
                  <ChartSkeleton />
                ) : (
                  selectedAsset && <MinimalistAreaChart asset={selectedAsset} />
                )}
              </div>
            </div>

            {/* Order Panel - Hidden on mobile, shown on desktop */}
            <div className="hidden lg:block">
              <MinimalistOrderPanel
                asset={selectedAsset}
                availableCash={portfolio.cash}
                onTrade={handleTrade}
              />
            </div>
          </div>

          {/* Asset Intelligence Section - Professional 3-column grid */}
          {showSeoBlocks && selectedAsset && (
            <AssetIntelligence asset={selectedAsset} />
          )}

          {/* FAQ Section - Accordion with Schema Markup */}
          {selectedAsset && assetFAQs.length > 0 && (
            <AssetFAQSection 
              assetName={selectedAsset.name}
              assetSymbol={selectedAsset.symbol}
              faqs={assetFAQs}
            />
          )}

          {/* Related Assets Section - Internal Linking */}
          {selectedAsset && <RelatedAssets currentAsset={selectedAsset} />}

          {/* Legal Disclaimer */}
          <div className="mt-8 p-4 rounded-xl bg-muted/30 border border-white/5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-muted-foreground leading-relaxed">
                <strong>Not Financial Advice:</strong> TradeHQ is a simulator for educational purposes only. 
                No real money is at risk. Past performance in a simulation does not guarantee future real-world results. 
                Always consult a qualified financial advisor before making investment decisions.
              </p>
            </div>
          </div>

          {/* Mobile Order Drawer */}
          <div className="lg:hidden">
            <MobileOrderDrawer
              asset={selectedAsset}
              availableCash={portfolio.cash}
              onTrade={handleTrade}
            />
          </div>
        </div>

        {/* AI Mentor */}
        <AIMentor 
          portfolio={portfolio} 
          assets={assets} 
          selectedAsset={selectedAsset}
        />
      </div>
    </>
  );
}
