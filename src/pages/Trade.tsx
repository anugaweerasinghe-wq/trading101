import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { TradingSidebar } from "@/components/trading/TradingSidebar";
import { CandlestickChart } from "@/components/trading/CandlestickChart";
import { AssetTable } from "@/components/trading/AssetTable";
import { OrderPanel } from "@/components/trading/OrderPanel";
import { PortfolioHeader } from "@/components/trading/PortfolioHeader";
import { AIMentor } from "@/components/trading/AIMentor";
import { AssetTableSkeleton } from "@/components/trading/AssetTableSkeleton";
import { ChartSkeleton } from "@/components/trading/ChartSkeleton";
import { MobileOrderDrawer } from "@/components/trading/MobileOrderDrawer";
import { LiveStatusIndicator } from "@/components/LiveStatusIndicator";
import { TradingProfitCalculator } from "@/components/TradingProfitCalculator";
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
  
  // Ref to track if component is mounted for cleanup
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    
    // Simulate initial loading with skeleton screens
    const loadTimer = setTimeout(() => {
      if (!isMounted.current) return;
      setAssets(ASSETS);
      setSelectedAsset(ASSETS[0]);
      setIsLoading(false);
    }, 800);

    const updated = updatePositionPrices(portfolio);
    setPortfolio(updated);
    setFavorites(getFavorites());

    // Price simulation interval with cleanup to prevent memory leaks
    const priceInterval = setInterval(() => {
      if (!isMounted.current) return;
      
      setAssets(prev => {
        if (prev.length === 0) return prev;
        const updated = simulateAssetPrices(prev, 0.05);
        return updated;
      });
      setLastUpdateTime(new Date());
    }, 3000);

    // Cleanup function to stop data stream when leaving page
    return () => {
      isMounted.current = false;
      clearTimeout(loadTimer);
      clearInterval(priceInterval);
    };
  }, []);

  // Sync selected asset with latest prices
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
        <meta name="description" content="🚀 Start trading in 5 seconds — no signup! Practice stocks, Bitcoin, ETFs & forex with $10K virtual cash. Real charts, real skills, zero risk. Try it free →" />
        <link rel="canonical" href="https://tradinghq.vercel.app/trade" />
      </Helmet>
      
      <div className="h-screen bg-background flex flex-col overflow-hidden">
        {/* Live Status Indicator - Increases Dwell Time */}
        <LiveStatusIndicator />

        <div className="flex-1 flex overflow-hidden">
          <TradingSidebar />

          <div className="flex-1 ml-16 flex flex-col h-full overflow-hidden">
            {/* Header */}
            <header className="h-14 px-4 border-b border-border/30 bg-card/30 backdrop-blur-sm flex items-center shrink-0">
              <PortfolioHeader portfolio={portfolio} />
            </header>

          {/* Desktop Layout - Simplified */}
          <div className="hidden lg:flex flex-1 overflow-hidden gap-3 p-3">
            {/* Asset List */}
            <aside className="w-52 bento-card overflow-hidden">
              {isLoading ? (
                <AssetTableSkeleton />
              ) : (
                <AssetTable
                  assets={assets}
                  favorites={favorites}
                  selectedAsset={selectedAsset}
                  onSelectAsset={setSelectedAsset}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
            </aside>

            {/* Main Chart Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 min-h-0">
                <div className="h-full bento-card overflow-hidden">
                  {isLoading ? (
                    <ChartSkeleton />
                  ) : (
                    selectedAsset && <CandlestickChart asset={selectedAsset} />
                  )}
                </div>
              </div>
            </main>

            {/* Order Panel - Simplified sidebar */}
            <aside className="w-64 overflow-y-auto">
              <OrderPanel
                asset={selectedAsset}
                availableCash={portfolio.cash}
                onTrade={handleTrade}
              />
            </aside>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:flex lg:hidden flex-1 overflow-hidden gap-2 p-2">
            <aside className="w-48 bento-card overflow-hidden">
              {isLoading ? (
                <AssetTableSkeleton />
              ) : (
                <AssetTable
                  assets={assets}
                  favorites={favorites}
                  selectedAsset={selectedAsset}
                  onSelectAsset={setSelectedAsset}
                  onToggleFavorite={handleToggleFavorite}
                />
              )}
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden gap-2">
              <main className="flex-1 min-h-0">
                <div className="h-full bento-card overflow-hidden">
                  {isLoading ? (
                    <ChartSkeleton />
                  ) : (
                    selectedAsset && <CandlestickChart asset={selectedAsset} />
                  )}
                </div>
              </main>
              <aside className="h-52 shrink-0">
                <OrderPanel
                  asset={selectedAsset}
                  availableCash={portfolio.cash}
                  onTrade={handleTrade}
                />
              </aside>
            </div>
          </div>

          {/* Mobile Layout - Bottom Drawer for Order Panel */}
          <div className="md:hidden flex flex-col flex-1 overflow-hidden gap-2 p-2">
            <main className="flex-1 min-h-0">
              <div className="h-full bento-card overflow-hidden">
                {isLoading ? (
                  <ChartSkeleton />
                ) : (
                  selectedAsset && <CandlestickChart asset={selectedAsset} />
                )}
              </div>
            </main>
            {/* Mobile Order Drawer - Thumb-friendly bottom drawer */}
            <aside className="shrink-0 pb-2">
              <MobileOrderDrawer
                asset={selectedAsset}
                availableCash={portfolio.cash}
                onTrade={handleTrade}
              />
            </aside>
          </div>
        </div>

        <AIMentor 
          portfolio={portfolio} 
          assets={assets} 
          selectedAsset={selectedAsset}
        />
        </div>
      </div>
    </>
  );
}
