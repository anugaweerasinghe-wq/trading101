import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { AssetCard } from "@/components/AssetCard";
import { TradeDialog } from "@/components/TradeDialog";
import { AIAssistant } from "@/components/AIAssistant";
import { AssetDetailDialog } from "@/components/AssetDetailDialog";
import { MarketStats } from "@/components/MarketStats";
import { WatchlistPanel } from "@/components/WatchlistPanel";
import { OrderBook } from "@/components/OrderBook";
import { PriceTicker } from "@/components/PriceTicker";
import { ASSETS } from "@/lib/assets";
import { Asset, JournalEntry } from "@/lib/types";
import { OrderType, createOrder, addOrder } from "@/lib/orderTypes";
import { saveJournalToTrade } from "@/lib/tradingJournal";
import { getPortfolio, executeTrade, updatePositionPrices } from "@/lib/portfolio";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { simulateAssetPrices, shouldUpdatePrices, setLastUpdateTime, fetchMarketPredictions } from "@/lib/priceSimulation";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Star, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Trade() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState(ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [detailAsset, setDetailAsset] = useState<Asset | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showTradeDialog, setShowTradeDialog] = useState(false);
  const { toast } = useToast();

  // Keyboard shortcuts
  useKeyboardShortcuts({
    's': () => document.getElementById('search-input')?.focus(),
    'w': () => setFavorites(getFavorites()),
    'escape': () => {
      setShowTradeDialog(false);
      setDetailAsset(null);
    }
  });

  useEffect(() => {
    // Initialize with AI predictions
    const initTrade = async () => {
      // Fetch AI predictions and update assets
      const predictions = await fetchMarketPredictions(assets);
      if (Object.keys(predictions).length > 0) {
        const updatedAssets = simulateAssetPrices(assets, 0.01, predictions);
        setAssets(updatedAssets);
      }
      
      const updated = updatePositionPrices(portfolio);
      setPortfolio(updated);
      setFavorites(getFavorites());
    };

    initTrade();

    // Simulate price updates every 5 seconds
    const priceInterval = setInterval(() => {
      if (shouldUpdatePrices()) {
        const updatedAssets = simulateAssetPrices(assets, 0.01); // Small updates
        setAssets(updatedAssets);
        setLastUpdateTime(new Date());
      }
    }, 5000);

    return () => clearInterval(priceInterval);
  }, []);

  const handleTrade = (asset: Asset, type: 'buy' | 'sell', quantity: number, orderType?: OrderType, limitPrice?: number, journal?: JournalEntry) => {
    if (orderType && orderType !== 'market') {
      // Handle limit/stop-loss orders
      const order = createOrder(asset.id, asset.symbol, orderType, type, quantity, limitPrice);
      addOrder(order);
      toast({
        title: "Order Placed",
        description: `${orderType} order for ${quantity} ${asset.symbol} at $${limitPrice?.toFixed(2)}`,
      });
      setShowTradeDialog(false);
      setSelectedAsset(null);
      return;
    }

    // Handle market orders
    const result = executeTrade(portfolio, asset, type, quantity);
    
    if (result.success && result.portfolio) {
      // Add journal entry to the trade if provided
      if (journal && result.portfolio.trades.length > 0) {
        const lastTrade = result.portfolio.trades[result.portfolio.trades.length - 1];
        const updatedTrade = saveJournalToTrade(lastTrade, journal);
        result.portfolio.trades[result.portfolio.trades.length - 1] = updatedTrade;
      }
      
      setPortfolio(result.portfolio);
      toast({
        title: "Trade Executed",
        description: result.message,
      });
      setShowTradeDialog(false);
      setSelectedAsset(null);
    } else {
      toast({
        title: "Trade Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleFavorite = (assetId: string) => {
    const isFavorite = toggleFavorite(assetId);
    setFavorites(getFavorites());
    toast({
      title: isFavorite ? "Added to Watchlist" : "Removed from Watchlist",
      description: isFavorite ? "Asset added to your watchlist" : "Asset removed from your watchlist",
    });
  };

  const handleAssetClick = (asset: Asset) => {
    setDetailAsset(asset);
  };

  const handleTradeClick = () => {
    setSelectedAsset(detailAsset);
    setShowTradeDialog(true);
    setDetailAsset(null);
  };

  const filteredAssets = assets.filter(asset =>
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const assetsByType = {
    stock: filteredAssets.filter(a => a.type === 'stock'),
    crypto: filteredAssets.filter(a => a.type === 'crypto'),
    etf: filteredAssets.filter(a => a.type === 'etf'),
    commodity: filteredAssets.filter(a => a.type === 'commodity'),
  };

  const favoriteAssets = assets.filter(a => favorites.includes(a.id));
  const gainers = assets.filter(a => a.changePercent > 0).length;
  const losers = assets.filter(a => a.changePercent < 0).length;
  const totalMarketCap = assets.reduce((sum, a) => sum + a.price * 1000000000, 0);
  const totalVolume24h = assets.length * 50000000000;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PriceTicker assets={assets} />
      
      <main className="pt-20 pb-12">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                  Markets
                </h1>
                <p className="text-xl text-muted-foreground">
                  Available Cash: <span className="text-primary font-bold">${portfolio.cash.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" size="lg">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Top Gainers
                </Button>
              </div>
            </div>
            
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search stocks, crypto, ETFs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
          </div>

          {/* Market Stats */}
          <MarketStats 
            totalMarketCap={totalMarketCap}
            totalVolume24h={totalVolume24h}
            gainers={gainers}
            losers={losers}
          />

          {/* Order Book */}
          {detailAsset && (
            <div className="mb-8">
              <OrderBook asset={detailAsset} />
            </div>
          )}

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="favorites">
                <Star className="w-4 h-4 mr-2" />
                Watchlist
              </TabsTrigger>
              <TabsTrigger value="stock">Stocks</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="etf">ETFs</TabsTrigger>
              <TabsTrigger value="commodity">Commodities</TabsTrigger>
            </TabsList>

            <TabsContent value="favorites" className="space-y-4">
              <WatchlistPanel 
                favorites={favoriteAssets}
                onRemoveFavorite={handleToggleFavorite}
                onSelectAsset={handleAssetClick}
              />
            </TabsContent>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredAssets.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    onClick={() => handleAssetClick(asset)}
                    isFavorite={favorites.includes(asset.id)}
                    onToggleFavorite={() => handleToggleFavorite(asset.id)}
                  />
                ))}
              </div>
            </TabsContent>

            {Object.entries(assetsByType).map(([type, typeAssets]) => (
              <TabsContent key={type} value={type} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {typeAssets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      onClick={() => handleAssetClick(asset)}
                      isFavorite={favorites.includes(asset.id)}
                      onToggleFavorite={() => handleToggleFavorite(asset.id)}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <AssetDetailDialog
        asset={detailAsset}
        open={detailAsset !== null}
        onOpenChange={(open) => !open && setDetailAsset(null)}
        onTrade={handleTradeClick}
        isFavorite={detailAsset ? favorites.includes(detailAsset.id) : false}
        onToggleFavorite={() => detailAsset && handleToggleFavorite(detailAsset.id)}
      />

      <TradeDialog
        asset={selectedAsset}
        open={showTradeDialog}
        onOpenChange={(open) => {
          setShowTradeDialog(open);
          if (!open) setSelectedAsset(null);
        }}
        onTrade={handleTrade}
        availableCash={portfolio.cash}
      />

      <AIAssistant portfolio={portfolio} assets={assets} />
    </div>
  );
}
