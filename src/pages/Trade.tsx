import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { GlowStatusBar } from "@/components/trading/GlowStatusBar";
import { AssetSearchDropdown } from "@/components/trading/AssetSearchDropdown";
import { MinimalistAreaChart } from "@/components/trading/MinimalistAreaChart";
import { MinimalistOrderPanel } from "@/components/trading/MinimalistOrderPanel";
import { MinimalistPortfolioBar } from "@/components/trading/MinimalistPortfolioBar";
import { AIMentor } from "@/components/trading/AIMentor";
import { ChartSkeleton } from "@/components/trading/ChartSkeleton";
import { MobileOrderDrawer } from "@/components/trading/MobileOrderDrawer";
import { LiveDataToggle } from "@/components/trading/LiveDataToggle";
import { MegaFooter } from "@/components/MegaFooter";
import { ASSETS } from "@/lib/assets";
import { Asset } from "@/lib/types";
import { getPortfolio, executeTrade, updatePositionPrices } from "@/lib/portfolio";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { setLastUpdateTime } from "@/lib/priceSimulation";
import { useToast } from "@/hooks/use-toast";

export default function Trade() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const isMounted = useRef(true);
  const isRefreshing = useRef(false);
  const assetsRef = useRef<Asset[]>([]);

  // Keep assetsRef updated
  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  // Function to fetch live data for a single asset
  const fetchLivePrice = async (asset: Asset): Promise<Asset> => {
    // Guard: skip if asset has no valid price
    if (!asset || typeof asset.price !== 'number' || isNaN(asset.price) || asset.price <= 0) {
      return asset;
    }
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=quote`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        // Only update if we got a valid price number back
        if (result.success && result.data && typeof result.data.price === 'number' && !isNaN(result.data.price) && result.data.price > 0) {
          return {
            ...asset,
            price: result.data.price,
            change: typeof result.data.change24h === 'number' ? result.data.change24h : asset.change,
            changePercent: typeof result.data.changePercent24h === 'number' ? result.data.changePercent24h : asset.changePercent,
          };
        }
      }
    } catch (err) {
      // Silently fail, return original asset
    }
    return asset;
  };

  // Simulate price changes for assets not fetched via API
  const simulatePrice = (asset: Asset): Asset => {
    if (!asset || typeof asset.price !== 'number' || isNaN(asset.price) || asset.price <= 0) {
      return asset;
    }
    
    const volatility = asset.type === 'crypto' ? 0.015 : 0.008;
    const changePercent = (Math.random() * volatility * 2 - volatility) * 100;
    const change = asset.price * (changePercent / 100);
    
    return {
      ...asset,
      price: Math.max(0.0001, asset.price + change * 0.1),
      change: change,
      changePercent: changePercent,
    };
  };

  // Batch refresh all assets
  const refreshAllAssets = useCallback(async () => {
    if (!isMounted.current || isRefreshing.current) return;
    
    const currentAssets = assetsRef.current;
    if (currentAssets.length === 0) return;
    
    isRefreshing.current = true;
    
    try {
      // Fetch live data for top 15 crypto assets in parallel
      const cryptoAssets = currentAssets.filter(a => a.type === 'crypto').slice(0, 15);
      const updatedCrypto = await Promise.all(
        cryptoAssets.map(asset => fetchLivePrice(asset))
      );
      
      // Create a map for quick lookup
      const updatedMap = new Map<string, Asset>();
      updatedCrypto.forEach(a => updatedMap.set(a.id, a));
      
      // Update all assets - use live data for fetched ones, simulate the rest
      const allUpdated = currentAssets.map(asset => {
        if (updatedMap.has(asset.id)) {
          return updatedMap.get(asset.id)!;
        }
        return simulatePrice(asset);
      });
      
      if (isMounted.current) {
        setAssets(allUpdated);
        setLastUpdateTime(new Date());
      }
    } catch (err) {
      console.error('Batch refresh error:', err);
    } finally {
      isRefreshing.current = false;
    }
  }, []); // Empty deps - uses refs instead

  // Initialize assets
  useEffect(() => {
    isMounted.current = true;
    
    // Validate and filter assets to ensure all have valid prices
    const validAssets = ASSETS.filter(asset => 
      asset && 
      typeof asset.price === 'number' && 
      !isNaN(asset.price) && 
      asset.price > 0 &&
      typeof asset.change === 'number' &&
      typeof asset.changePercent === 'number'
    );
    
    const loadTimer = setTimeout(() => {
      if (!isMounted.current) return;
      setAssets(validAssets);
      setSelectedAsset(validAssets[0] || null);
      setIsLoading(false);
    }, 400);

    const updated = updatePositionPrices(portfolio);
    setPortfolio(updated);
    setFavorites(getFavorites());

    return () => {
      isMounted.current = false;
      clearTimeout(loadTimer);
    };
  }, []);

  // Auto-refresh every 45 seconds with live data
  useEffect(() => {
    if (isLoading || assets.length === 0) return;

    // Initial refresh after load
    const initialRefresh = setTimeout(refreshAllAssets, 2000);
    
    // Set up 45-second interval for all assets
    const refreshInterval = setInterval(refreshAllAssets, 45000);

    return () => {
      clearTimeout(initialRefresh);
      clearInterval(refreshInterval);
    };
  }, [isLoading, refreshAllAssets]);

  // Update selected asset when assets change
  useEffect(() => {
    if (selectedAsset && isMounted.current && assets.length > 0) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated && updated.price !== selectedAsset.price) {
        setSelectedAsset(updated);
      }
    }
  }, [assets, selectedAsset?.id]);

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
      const priceStr = typeof asset.price === 'number' ? asset.price.toLocaleString() : 'N/A';
      toast({
        title: `${type === 'buy' ? '🟢' : '🔴'} Order Executed`,
        description: `${type === 'buy' ? 'Bought' : 'Sold'} ${quantity.toFixed(4)} ${asset.symbol} at $${priceStr}`,
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

  const handleAssetSelect = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
  }, []);

  return (
    <>
      <Helmet>
        <title>Trade Now — Free Stock & Crypto Simulator | TradeHQ 2026</title>
        <meta name="description" content="🚀 Start trading in 5 seconds — no signup! Practice stocks, Bitcoin, ETFs & forex with $100K virtual cash. Real charts, real skills, zero risk. Try it free →" />
        <link rel="canonical" href="https://tradinghq.vercel.app/trade" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <Navigation />
        
        {/* Glow Status Bar */}
        <GlowStatusBar />

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-6 space-y-6 max-w-7xl">
          {/* Section 1: Asset Search, Live Toggle & Portfolio Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <AssetSearchDropdown
                assets={assets}
                selectedAsset={selectedAsset}
                favorites={favorites}
                onSelectAsset={handleAssetSelect}
                onToggleFavorite={handleToggleFavorite}
              />
              
              {/* Live Data Toggle with WiFi indicator */}
              <LiveDataToggle 
                asset={selectedAsset}
                onLiveDataReceived={(livePrice, isLive) => {
                  if (isLive && selectedAsset && typeof livePrice === 'number' && !isNaN(livePrice) && livePrice > 0) {
                    setAssets(prev => prev.map(a => 
                      a.id === selectedAsset.id 
                        ? { ...a, price: livePrice }
                        : a
                    ));
                  }
                }}
              />
            </div>
            
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

        {/* Mega Footer */}
        <MegaFooter />
      </div>
    </>
  );
}
