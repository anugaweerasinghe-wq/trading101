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
import { simulateAssetPrices, setLastUpdateTime } from "@/lib/priceSimulation";
import { useToast } from "@/hooks/use-toast";

export default function Trade() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveRefreshing, setIsLiveRefreshing] = useState(false);
  const { toast } = useToast();
  
  const isMounted = useRef(true);

  // Function to fetch live data for an asset
  const fetchLivePrice = async (asset: Asset): Promise<Asset> => {
    // Guard: skip if asset has no valid price
    if (!asset || typeof asset.price !== 'number' || isNaN(asset.price)) {
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
        if (result.success && result.data && typeof result.data.price === 'number' && !isNaN(result.data.price)) {
          return {
            ...asset,
            price: result.data.price,
            change: result.data.change24h ?? asset.change ?? 0,
            changePercent: result.data.changePercent24h ?? asset.changePercent ?? 0,
          };
        }
      }
    } catch (err) {
      console.log(`Live fetch failed for ${asset.symbol}, using simulation`);
    }
    // Return original asset unchanged if fetch fails or returns invalid data
    return asset;
  };

  // Batch refresh all assets with live data
  const refreshAllAssets = useCallback(async () => {
    if (!isMounted.current || assets.length === 0) return;
    
    setIsLiveRefreshing(true);
    
    try {
      // Fetch live data for top 20 assets in parallel (rate limit friendly)
      const topAssets = assets.slice(0, 20);
      const updatedTopAssets = await Promise.all(
        topAssets.map(asset => fetchLivePrice(asset))
      );
      
      // Simulate remaining assets with 2026 baseline
      const remainingAssets = assets.slice(20).map(asset => {
        const volatility = asset.type === 'crypto' ? 0.02 : 0.01;
        const change = asset.price * (Math.random() * volatility * 2 - volatility);
        return {
          ...asset,
          price: asset.price + change * 0.1,
          change: change,
          changePercent: (change / asset.price) * 100,
        };
      });
      
      const allUpdated = [...updatedTopAssets, ...remainingAssets];
      
      if (isMounted.current) {
        setAssets(allUpdated);
        setLastUpdateTime(new Date());
      }
    } catch (err) {
      console.error('Batch refresh error:', err);
      // Fallback to simulation
      setAssets(prev => simulateAssetPrices(prev, 0.05));
    } finally {
      if (isMounted.current) {
        setIsLiveRefreshing(false);
      }
    }
  }, [assets]);

  useEffect(() => {
    isMounted.current = true;
    
    const loadTimer = setTimeout(() => {
      if (!isMounted.current) return;
      setAssets(ASSETS);
      setSelectedAsset(ASSETS[0]);
      setIsLoading(false);
    }, 600);

    const updated = updatePositionPrices(portfolio);
    setPortfolio(updated);
    setFavorites(getFavorites());

    return () => {
      isMounted.current = false;
      clearTimeout(loadTimer);
    };
  }, []);

  // Auto-refresh every 30 seconds with live data
  useEffect(() => {
    if (isLoading || assets.length === 0) return;

    // Initial refresh after load
    const initialRefresh = setTimeout(refreshAllAssets, 1000);
    
    // Set up 30-second interval
    const refreshInterval = setInterval(refreshAllAssets, 30000);

    return () => {
      clearTimeout(initialRefresh);
      clearInterval(refreshInterval);
    };
  }, [isLoading, refreshAllAssets]);

  useEffect(() => {
    if (selectedAsset && isMounted.current && assets.length > 0) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated) setSelectedAsset(updated);
    }
  }, [assets]);

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
                onSelectAsset={setSelectedAsset}
                onToggleFavorite={handleToggleFavorite}
              />
              
              {/* Live Data Toggle with WiFi indicator */}
              <LiveDataToggle 
                asset={selectedAsset}
                onLiveDataReceived={(livePrice, isLive) => {
                  if (isLive && selectedAsset) {
                    // Update the selected asset with live price
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
