import { useState, useEffect } from "react";
import { TradingSidebar } from "@/components/trading/TradingSidebar";
import { CandlestickChart } from "@/components/trading/CandlestickChart";
import { AssetTable } from "@/components/trading/AssetTable";
import { OrderPanel } from "@/components/trading/OrderPanel";
import { ProOrderBook } from "@/components/trading/ProOrderBook";
import { TradingTerminal } from "@/components/trading/TradingTerminal";
import { PortfolioHeader } from "@/components/trading/PortfolioHeader";
import { AIMentor } from "@/components/trading/AIMentor";
import { ASSETS } from "@/lib/assets";
import { Asset } from "@/lib/types";
import { getPortfolio, executeTrade, updatePositionPrices } from "@/lib/portfolio";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { simulateAssetPrices, setLastUpdateTime } from "@/lib/priceSimulation";
import { useToast } from "@/hooks/use-toast";

export default function Trade() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState(ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(ASSETS[0]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const updated = updatePositionPrices(portfolio);
    setPortfolio(updated);
    setFavorites(getFavorites());

    // Simulate live price updates every 3 seconds
    const priceInterval = setInterval(() => {
      setAssets(prev => {
        const updated = simulateAssetPrices(prev, 0.05);
        return updated;
      });
      setLastUpdateTime(new Date());
    }, 3000);

    return () => clearInterval(priceInterval);
  }, []);

  // Update selected asset when prices change
  useEffect(() => {
    if (selectedAsset) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated) setSelectedAsset(updated);
    }
  }, [assets]);

  const handleTrade = (
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
  };

  const handleToggleFavorite = (assetId: string) => {
    toggleFavorite(assetId);
    setFavorites(getFavorites());
  };

  return (
    <div className="h-screen bg-background flex overflow-hidden">
      {/* Left Sidebar */}
      <TradingSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden">
        {/* Portfolio Header - Compact */}
        <header className="py-1 px-2 border-b border-border shrink-0">
          <PortfolioHeader portfolio={portfolio} />
        </header>

        {/* Main Grid - No Scroll */}
        <div className="flex-1 overflow-hidden">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[200px_1fr_260px] gap-px p-px bg-border h-full">
            {/* Left: Asset Table */}
            <div className="bg-card overflow-hidden">
              <AssetTable
                assets={assets}
                favorites={favorites}
                selectedAsset={selectedAsset}
                onSelectAsset={setSelectedAsset}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>

            {/* Center: Chart + Terminal */}
            <div className="flex flex-col gap-px h-full">
              <div className="flex-[2] min-h-0">
                {selectedAsset && <CandlestickChart asset={selectedAsset} />}
              </div>
              <div className="h-[140px] shrink-0">
                <TradingTerminal portfolio={portfolio} />
              </div>
            </div>

            {/* Right: Order Book + Order Panel */}
            <div className="flex flex-col gap-px h-full">
              <div className="flex-1 min-h-0">
                {selectedAsset && <ProOrderBook asset={selectedAsset} />}
              </div>
              <div className="h-[260px] shrink-0">
                <OrderPanel
                  asset={selectedAsset}
                  availableCash={portfolio.cash}
                  onTrade={handleTrade}
                />
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-px p-px bg-border h-full">
            <div className="flex flex-col gap-px h-full">
              <div className="flex-1 bg-card overflow-hidden">
                {selectedAsset && <CandlestickChart asset={selectedAsset} />}
              </div>
              <div className="h-[160px] bg-card overflow-hidden shrink-0">
                {selectedAsset && <ProOrderBook asset={selectedAsset} />}
              </div>
            </div>
            <div className="flex flex-col gap-px h-full">
              <div className="flex-1 bg-card overflow-hidden">
                <AssetTable
                  assets={assets}
                  favorites={favorites}
                  selectedAsset={selectedAsset}
                  onSelectAsset={setSelectedAsset}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
              <div className="h-[200px] bg-card overflow-hidden shrink-0">
                <OrderPanel
                  asset={selectedAsset}
                  availableCash={portfolio.cash}
                  onTrade={handleTrade}
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout - Fit screen */}
          <div className="md:hidden flex flex-col h-full">
            <div className="flex-1 min-h-0 bg-card">
              {selectedAsset && <CandlestickChart asset={selectedAsset} />}
            </div>
            <div className="h-[220px] shrink-0 bg-card border-t border-border">
              <OrderPanel
                asset={selectedAsset}
                availableCash={portfolio.cash}
                onTrade={handleTrade}
              />
            </div>
          </div>
        </div>
      </div>

      {/* AI Mentor */}
      <AIMentor 
        portfolio={portfolio} 
        assets={assets} 
        selectedAsset={selectedAsset}
      />
    </div>
  );
}
