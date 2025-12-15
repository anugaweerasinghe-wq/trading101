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
    <div className="min-h-screen bg-background flex">
      {/* Left Sidebar */}
      <TradingSidebar />

      {/* Main Content */}
      <div className="flex-1 ml-16 flex flex-col overflow-hidden">
        {/* Portfolio Header */}
        <header className="p-2 md:p-3 border-b border-border shrink-0">
          <PortfolioHeader portfolio={portfolio} />
        </header>

        {/* Main Grid - Responsive */}
        <div className="flex-1 overflow-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-[260px_1fr_300px] gap-0.5 p-0.5 bg-border h-[calc(100vh-80px)]">
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
            <div className="flex flex-col gap-0.5">
              <div className="flex-[2] min-h-0">
                {selectedAsset && <CandlestickChart asset={selectedAsset} />}
              </div>
              <div className="flex-1 min-h-[180px]">
                <TradingTerminal portfolio={portfolio} />
              </div>
            </div>

            {/* Right: Order Book + Order Panel */}
            <div className="flex flex-col gap-0.5">
              <div className="flex-1 min-h-0">
                {selectedAsset && <ProOrderBook asset={selectedAsset} />}
              </div>
              <div className="h-[340px]">
                <OrderPanel
                  asset={selectedAsset}
                  availableCash={portfolio.cash}
                  onTrade={handleTrade}
                />
              </div>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className="hidden md:flex lg:hidden flex-col gap-2 p-2 h-[calc(100vh-80px)]">
            <div className="grid grid-cols-2 gap-2 flex-1">
              <div className="bg-card rounded-lg overflow-hidden">
                {selectedAsset && <CandlestickChart asset={selectedAsset} />}
              </div>
              <div className="bg-card rounded-lg overflow-hidden">
                <AssetTable
                  assets={assets}
                  favorites={favorites}
                  selectedAsset={selectedAsset}
                  onSelectAsset={setSelectedAsset}
                  onToggleFavorite={handleToggleFavorite}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 h-[300px]">
              <div className="bg-card rounded-lg overflow-hidden">
                {selectedAsset && <ProOrderBook asset={selectedAsset} />}
              </div>
              <div className="bg-card rounded-lg overflow-hidden">
                <OrderPanel
                  asset={selectedAsset}
                  availableCash={portfolio.cash}
                  onTrade={handleTrade}
                />
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="md:hidden flex flex-col gap-2 p-2 pb-20">
            {/* Chart */}
            <div className="bg-card rounded-lg h-[250px] overflow-hidden">
              {selectedAsset && <CandlestickChart asset={selectedAsset} />}
            </div>
            
            {/* Order Panel */}
            <div className="bg-card rounded-lg overflow-hidden">
              <OrderPanel
                asset={selectedAsset}
                availableCash={portfolio.cash}
                onTrade={handleTrade}
              />
            </div>

            {/* Asset List */}
            <div className="bg-card rounded-lg h-[300px] overflow-hidden">
              <AssetTable
                assets={assets}
                favorites={favorites}
                selectedAsset={selectedAsset}
                onSelectAsset={setSelectedAsset}
                onToggleFavorite={handleToggleFavorite}
              />
            </div>

            {/* Order Book */}
            <div className="bg-card rounded-lg h-[250px] overflow-hidden">
              {selectedAsset && <ProOrderBook asset={selectedAsset} />}
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
