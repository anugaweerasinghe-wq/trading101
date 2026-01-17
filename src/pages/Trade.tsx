import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
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

export default function Trade() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const isMounted = useRef(true);

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
  }, []);

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
        {/* Glow Status Bar */}
        <GlowStatusBar />

        {/* Main Content */}
        <div className="flex-1 container mx-auto px-4 py-6 space-y-6 max-w-7xl">
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
