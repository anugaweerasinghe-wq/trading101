import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { AssetCard } from "@/components/AssetCard";
import { TradeDialog } from "@/components/TradeDialog";
import { ASSETS } from "@/lib/assets";
import { Asset } from "@/lib/types";
import { getPortfolio, executeTrade, updatePositionPrices } from "@/lib/portfolio";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Trade() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const updated = updatePositionPrices(portfolio);
    setPortfolio(updated);
  }, []);

  const handleTrade = (asset: Asset, type: 'buy' | 'sell', quantity: number) => {
    const result = executeTrade(portfolio, asset, type, quantity);
    
    if (result.success && result.portfolio) {
      setPortfolio(result.portfolio);
      toast({
        title: "Trade Executed",
        description: result.message,
      });
    } else {
      toast({
        title: "Trade Failed",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const filteredAssets = ASSETS.filter(asset =>
    asset.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
    asset.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const assetsByType = {
    stock: filteredAssets.filter(a => a.type === 'stock'),
    crypto: filteredAssets.filter(a => a.type === 'crypto'),
    etf: filteredAssets.filter(a => a.type === 'etf'),
    commodity: filteredAssets.filter(a => a.type === 'commodity'),
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Market</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Available Cash: <span className="text-primary font-bold">${portfolio.cash.toFixed(2)}</span>
            </p>
            
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search assets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Assets</TabsTrigger>
              <TabsTrigger value="stock">Stocks</TabsTrigger>
              <TabsTrigger value="crypto">Crypto</TabsTrigger>
              <TabsTrigger value="etf">ETFs</TabsTrigger>
              <TabsTrigger value="commodity">Commodities</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <AssetCard
                    key={asset.id}
                    asset={asset}
                    onClick={() => setSelectedAsset(asset)}
                  />
                ))}
              </div>
            </TabsContent>

            {Object.entries(assetsByType).map(([type, assets]) => (
              <TabsContent key={type} value={type} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {assets.map((asset) => (
                    <AssetCard
                      key={asset.id}
                      asset={asset}
                      onClick={() => setSelectedAsset(asset)}
                    />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <TradeDialog
        asset={selectedAsset}
        open={selectedAsset !== null}
        onOpenChange={(open) => !open && setSelectedAsset(null)}
        onTrade={handleTrade}
        availableCash={portfolio.cash}
      />
    </div>
  );
}
