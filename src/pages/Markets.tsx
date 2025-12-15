import { useState, useEffect } from "react";
import { TradingSidebar } from "@/components/trading/TradingSidebar";
import { ASSETS } from "@/lib/assets";
import { Asset } from "@/lib/types";
import { simulateAssetPrices } from "@/lib/priceSimulation";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, TrendingUp, TrendingDown, Star, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

type SortField = 'name' | 'price' | 'change' | 'volume';
type SortOrder = 'asc' | 'desc';

export default function Markets() {
  const [assets, setAssets] = useState(ASSETS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortField, setSortField] = useState<SortField>('volume');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev => simulateAssetPrices(prev, 0.03));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Calculate simulated volume based on price and change
  const getVolume = (asset: Asset) => Math.abs(asset.price * (100 + asset.change) * 10000);

  const filteredAssets = assets
    .filter(a => category === "all" || a.type === category)
    .filter(a => 
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.symbol.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'change':
          comparison = a.change - b.change;
          break;
        case 'volume':
          comparison = getVolume(a) - getVolume(b);
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  const gainers = [...assets].sort((a, b) => b.change - a.change).slice(0, 5);
  const losers = [...assets].sort((a, b) => a.change - b.change).slice(0, 5);

  const SortButton = ({ field, label }: { field: SortField; label: string }) => (
    <button
      onClick={() => handleSort(field)}
      className={cn(
        "flex items-center gap-1 text-xs font-medium transition-colors",
        sortField === field ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      <ArrowUpDown className="h-3 w-3" />
    </button>
  );

  return (
    <div className="min-h-screen bg-background flex">
      <TradingSidebar />

      <div className="flex-1 ml-16 p-4 md:p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Markets</h1>
              <p className="text-muted-foreground text-sm">
                Real-time market overview • {assets.length} assets
              </p>
            </div>
            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search assets..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Top Movers */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-profit" />
                <h2 className="font-semibold">Top Gainers</h2>
              </div>
              <div className="space-y-2">
                {gainers.map((asset, i) => (
                  <Link
                    key={asset.id}
                    to="/trade"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground text-sm w-4">{i + 1}</span>
                      <div>
                        <p className="font-medium text-sm">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">${asset.price.toLocaleString()}</p>
                      <Badge variant="outline" className="text-profit border-profit/30 text-xs">
                        +{asset.change.toFixed(2)}%
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="h-5 w-5 text-loss" />
                <h2 className="font-semibold">Top Losers</h2>
              </div>
              <div className="space-y-2">
                {losers.map((asset, i) => (
                  <Link
                    key={asset.id}
                    to="/trade"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-muted-foreground text-sm w-4">{i + 1}</span>
                      <div>
                        <p className="font-medium text-sm">{asset.symbol}</p>
                        <p className="text-xs text-muted-foreground">{asset.name}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm">${asset.price.toLocaleString()}</p>
                      <Badge variant="outline" className="text-loss border-loss/30 text-xs">
                        {asset.change.toFixed(2)}%
                      </Badge>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* All Assets Table */}
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <Tabs value={category} onValueChange={setCategory}>
              <div className="p-4 border-b border-border">
                <TabsList className="bg-muted/50">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="stocks">Stocks</TabsTrigger>
                  <TabsTrigger value="etf">ETFs</TabsTrigger>
                  <TabsTrigger value="forex">Forex</TabsTrigger>
                  <TabsTrigger value="commodities">Commodities</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value={category} className="m-0">
                {/* Table Header */}
                <div className="hidden md:grid grid-cols-5 gap-4 px-4 py-3 bg-muted/30 border-b border-border">
                  <SortButton field="name" label="Asset" />
                  <SortButton field="price" label="Price" />
                  <SortButton field="change" label="24h Change" />
                  <SortButton field="volume" label="Volume" />
                  <span className="text-xs text-muted-foreground">Action</span>
                </div>

                <ScrollArea className="h-[400px] md:h-[500px]">
                  <div className="divide-y divide-border">
                    {filteredAssets.map((asset) => (
                      <div
                        key={asset.id}
                        className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 p-4 hover:bg-accent/30 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xs font-bold text-primary">
                              {asset.symbol.slice(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{asset.symbol}</p>
                            <p className="text-xs text-muted-foreground hidden md:block">{asset.name}</p>
                          </div>
                        </div>

                        <div className="text-right md:text-left">
                          <p className="font-mono text-sm">${asset.price.toLocaleString()}</p>
                        </div>

                        <div className="md:col-span-1">
                          <Badge
                            variant="outline"
                            className={cn(
                              "text-xs",
                              asset.change >= 0
                                ? "text-profit border-profit/30"
                                : "text-loss border-loss/30"
                            )}
                          >
                            {asset.change >= 0 ? "+" : ""}
                            {asset.change.toFixed(2)}%
                          </Badge>
                        </div>

                        <div className="hidden md:block">
                          <p className="text-sm text-muted-foreground">
                            ${(getVolume(asset) / 1e6).toFixed(1)}M
                          </p>
                        </div>

                        <div className="col-span-2 md:col-span-1 mt-2 md:mt-0">
                          <Link
                            to="/trade"
                            className="inline-flex items-center justify-center w-full md:w-auto px-4 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                          >
                            Trade
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
