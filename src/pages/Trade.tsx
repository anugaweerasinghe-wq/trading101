import { useState, useEffect } from "react";
import { TradingSidebar } from "@/components/trading/TradingSidebar";
import { CandlestickChart } from "@/components/trading/CandlestickChart";
import { AssetTable } from "@/components/trading/AssetTable";
import { OrderPanel } from "@/components/trading/OrderPanel";
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

    const priceInterval = setInterval(() => {
      setAssets(prev => {
        const updated = simulateAssetPrices(prev, 0.05);
        return updated;
      });
      setLastUpdateTime(new Date());
    }, 3000);

    return () => clearInterval(priceInterval);
  }, []);

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
      <TradingSidebar />

      <div className="flex-1 ml-16 flex flex-col h-screen overflow-hidden animate-fade-in">
        {/* Header */}
        <header className="h-14 px-4 border-b border-border/50 bg-card/50 backdrop-blur-sm flex items-center shrink-0 transition-all duration-300">
          <PortfolioHeader portfolio={portfolio} />
        </header>

        {/* Desktop Layout */}
        <div className="hidden lg:flex flex-1 overflow-hidden">
          {/* Asset List */}
          <aside className="w-56 border-r border-border/50 bg-card/30 overflow-hidden transition-all duration-300 hover:bg-card/40">
            <AssetTable
              assets={assets}
              favorites={favorites}
              selectedAsset={selectedAsset}
              onSelectAsset={setSelectedAsset}
              onToggleFavorite={handleToggleFavorite}
            />
          </aside>

          {/* Main Chart Area */}
          <main className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 min-h-0 p-3 transition-all duration-300">
              <div className="h-full rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl">
                {selectedAsset && <CandlestickChart asset={selectedAsset} />}
              </div>
            </div>
          </main>

          {/* Order Panel */}
          <aside className="w-72 border-l border-border/50 bg-card/30 overflow-hidden transition-all duration-300 hover:bg-card/40">
            <OrderPanel
              asset={selectedAsset}
              availableCash={portfolio.cash}
              onTrade={handleTrade}
            />
          </aside>
        </div>

        {/* Tablet Layout */}
        <div className="hidden md:flex lg:hidden flex-1 overflow-hidden">
          <aside className="w-48 border-r border-border/50 bg-card/30 overflow-hidden transition-all duration-300">
            <AssetTable
              assets={assets}
              favorites={favorites}
              selectedAsset={selectedAsset}
              onSelectAsset={setSelectedAsset}
              onToggleFavorite={handleToggleFavorite}
            />
          </aside>

          <div className="flex-1 flex flex-col overflow-hidden">
            <main className="flex-1 min-h-0 p-2 transition-all duration-300">
              <div className="h-full rounded-lg border border-border/50 bg-card/50 overflow-hidden transition-shadow duration-300">
                {selectedAsset && <CandlestickChart asset={selectedAsset} />}
              </div>
            </main>
            <aside className="h-52 shrink-0 border-t border-border/50 bg-card/30 transition-all duration-300">
              <OrderPanel
                asset={selectedAsset}
                availableCash={portfolio.cash}
                onTrade={handleTrade}
              />
            </aside>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col flex-1 overflow-hidden">
          <main className="flex-1 min-h-0 p-2 transition-all duration-300">
            <div className="h-full rounded-lg border border-border/50 bg-card/50 overflow-hidden transition-shadow duration-300">
              {selectedAsset && <CandlestickChart asset={selectedAsset} />}
            </div>
          </main>
          <aside className="h-48 shrink-0 border-t border-border/50 bg-card/30 transition-all duration-300">
            <OrderPanel
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
  );
}
