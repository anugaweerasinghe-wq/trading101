import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { AssetSearchDropdown } from "@/components/trading/AssetSearchDropdown";
import { MinimalistAreaChart } from "@/components/trading/MinimalistAreaChart";
import { MinimalistOrderPanel } from "@/components/trading/MinimalistOrderPanel";
import { NeuralPulseChart } from "@/components/trading/NeuralPulseChart";
import { MinimalistPortfolioBar } from "@/components/trading/MinimalistPortfolioBar";
import { AIMentor } from "@/components/trading/AIMentor";
import { ChartSkeleton } from "@/components/trading/ChartSkeleton";
import { MobileOrderDrawer } from "@/components/trading/MobileOrderDrawer";
import { LiveDataToggle } from "@/components/trading/LiveDataToggle";
import { MegaFooter } from "@/components/MegaFooter";
import { ASSETS } from "@/lib/assets";
import { Asset, JournalEntry } from "@/lib/types";
import { getPortfolio, executeTrade, updatePositionPrices, savePortfolio } from "@/lib/portfolio";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { setLastUpdateTime } from "@/lib/priceSimulation";
import { recordLoss } from "@/components/trading/RevengeTradingBlocker";
import { useToast } from "@/hooks/use-toast";

export default function Trade() {
  const { symbol } = useParams();
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const isMounted = useRef(true);
  const isRefreshing = useRef(false);
  const assetsRef = useRef<Asset[]>([]);

  useEffect(() => { assetsRef.current = assets; }, [assets]);

  const fetchLivePrice = async (asset: Asset): Promise<Asset> => {
    if (!asset || typeof asset.price !== "number" || isNaN(asset.price) || asset.price <= 0) return asset;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=quote`,
        { headers: { "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`, "Content-Type": "application/json" } }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && typeof result.data.price === "number" && result.data.price > 0) {
          return { ...asset, price: result.data.price, change: typeof result.data.change24h === "number" ? result.data.change24h : asset.change, changePercent: typeof result.data.changePercent24h === "number" ? result.data.changePercent24h : asset.changePercent };
        }
      }
    } catch (err) {}
    return asset;
  };

  const simulatePrice = (asset: Asset): Asset => {
    const volatility = asset.type === "crypto" ? 0.015 : 0.008;
    const changePercent = (Math.random() * volatility * 2 - volatility) * 100;
    const change = asset.price * (changePercent / 100);
    return { ...asset, price: Math.max(0.0001, asset.price + change * 0.1), change, changePercent };
  };

  const refreshAllAssets = useCallback(async () => {
    if (!isMounted.current || isRefreshing.current) return;
    const currentAssets = assetsRef.current;
    if (currentAssets.length === 0) return;
    isRefreshing.current = true;
    try {
      const cryptoAssets = currentAssets.filter(a => a.type === "crypto").slice(0, 15);
      const updatedCrypto = await Promise.all(cryptoAssets.map(fetchLivePrice));
      const updatedMap = new Map<string, Asset>();
      updatedCrypto.forEach(a => updatedMap.set(a.id, a));
      const allUpdated = currentAssets.map(asset => updatedMap.get(asset.id) || simulatePrice(asset));
      if (isMounted.current) { setAssets(allUpdated); setLastUpdateTime(new Date()); }
    } catch (err) { console.error("Batch refresh error:", err); }
    finally { isRefreshing.current = false; }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const validAssets = ASSETS.filter(asset =>
      asset && typeof asset.price === "number" && !isNaN(asset.price) && asset.price > 0 &&
      typeof asset.change === "number" && typeof asset.changePercent === "number"
    );
    setTimeout(() => {
      if (!isMounted.current) return;
      setAssets(validAssets);
      if (symbol) {
        const match = validAssets.find(a => a.symbol.toUpperCase() === symbol.toUpperCase());
        setSelectedAsset(match || validAssets[0] || null);
      } else setSelectedAsset(validAssets[0] || null);
      setIsLoading(false);
    }, 400);
    setPortfolio(updatePositionPrices(portfolio));
    setFavorites(getFavorites());
    return () => { isMounted.current = false; };
  }, [symbol]);

  useEffect(() => {
    if (isLoading || assets.length === 0) return;
    const initialRefresh = setTimeout(refreshAllAssets, 2000);
    const interval = setInterval(refreshAllAssets, 45000);
    return () => { clearTimeout(initialRefresh); clearInterval(interval); };
  }, [isLoading, refreshAllAssets]);

  useEffect(() => {
    if (selectedAsset && isMounted.current && assets.length > 0) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated && updated.price !== selectedAsset.price) setSelectedAsset(updated);
    }
  }, [assets, selectedAsset?.id]);

  const handleTrade = useCallback((asset: Asset, type: "buy" | "sell", quantity: number, _orderType?: string, _limitPrice?: number, rationale?: string) => {
    const result = executeTrade(portfolio, asset, type, quantity);
    if (result.success && result.portfolio) {
      // If rationale provided (Ghost Journal), attach journal entry to the trade
      if (rationale && result.portfolio.trades.length > 0) {
        const journalEntry: JournalEntry = {
          notes: "",
          emotions: [],
          reasoning: rationale,
        };
        result.portfolio.trades[0].journal = journalEntry;
        savePortfolio(result.portfolio);
      }

      // Track losses for revenge trading detection
      if (type === "sell") {
        const position = portfolio.positions.find(p => p.asset.id === asset.id);
        if (position && position.profitLoss < 0) {
          recordLoss();
        }
      }

      setPortfolio(result.portfolio);
      const priceStr = typeof asset.price === "number" ? asset.price.toLocaleString() : "N/A";
      toast({ title: `${type === "buy" ? "🟢" : "🔴"} Order Executed`, description: `${type === "buy" ? "Bought" : "Sold"} ${quantity.toFixed(4)} ${asset.symbol} at $${priceStr}${rationale ? " 📓" : ""}` });
    } else {
      toast({ title: "Order Failed", description: result.message, variant: "destructive" });
    }
  }, [portfolio, toast]);

  const handleToggleFavorite = useCallback((assetId: string) => { toggleFavorite(assetId); setFavorites(getFavorites()); }, []);
  const handleAssetSelect = useCallback((asset: Asset) => { setSelectedAsset(asset); }, []);

  return (
    <>
      <Helmet>
        <title>{selectedAsset ? `${selectedAsset.name} Trading Simulator – Learn, Practice & Profit | TradeHQ 2026` : "TradeHQ – Free Stock, Crypto & Forex Simulator | Learn, Practice & Profit"}</title>
        <meta name="title" content={selectedAsset ? `${selectedAsset.name} Simulator | TradeHQ` : "TradeHQ Simulator"} />
        <meta name="description" content={selectedAsset ? `Practice ${selectedAsset.name} trading with $100K virtual cash. Learn technical analysis, risk management & real-time charts.` : "Start trading stocks, crypto & forex for free with TradeHQ. Real charts, zero risk."} />
        <link rel="canonical" href={`https://tradinghq.vercel.app/trade/${selectedAsset?.symbol || ""}`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <div className="flex-1 container mx-auto px-4 pt-20 pb-6 space-y-4 max-w-7xl">
          <MinimalistPortfolioBar portfolio={portfolio} />

          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <AssetSearchDropdown assets={assets} selectedAsset={selectedAsset} favorites={favorites} onSelectAsset={handleAssetSelect} onToggleFavorite={handleToggleFavorite} />
            <LiveDataToggle asset={selectedAsset} onLiveDataReceived={(livePrice, isLive) => {
              if (isLive && selectedAsset && typeof livePrice === "number" && livePrice > 0) {
                setAssets(prev => prev.map(a => a.id === selectedAsset.id ? { ...a, price: livePrice } : a));
              }
            }} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-4">
              <div className="glass-tactile border-chrome rounded-2xl h-[500px] overflow-hidden">
                {isLoading ? <ChartSkeleton /> : selectedAsset && <MinimalistAreaChart asset={selectedAsset} />}
              </div>
            </div>
            <div className="hidden lg:block">
              <MinimalistOrderPanel asset={selectedAsset} availableCash={portfolio.cash} portfolio={portfolio} onTrade={handleTrade} />
            </div>
          </div>

          {/* Neural Pulse Chart — full width */}
          {selectedAsset && !isLoading && (
            <NeuralPulseChart asset={selectedAsset} height={360} />
          )}

          <div className="lg:hidden">
            <MobileOrderDrawer asset={selectedAsset} availableCash={portfolio.cash} portfolio={portfolio} onTrade={handleTrade} />
          </div>

          {/* Explore More Assets */}
          {assets.length > 1 && (
            <section className="mt-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold tracking-tight">Explore Markets</h3>
                <Link to="/markets" className="text-xs text-primary hover:underline flex items-center gap-1">View All <span aria-hidden>→</span></Link>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {assets.filter(a => a.id !== selectedAsset?.id).slice(0, 12).map(asset => {
                  const isUp = asset.changePercent >= 0;
                  return (
                    <Link key={asset.id} to={`/trade/${asset.symbol}`} className="group relative glass-tactile rounded-xl p-4 border-chrome hover:border-primary/30 transition-all duration-200 hover:scale-[1.03]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">{asset.symbol}</span>
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${isUp ? 'bg-profit/10 text-profit' : 'bg-loss/10 text-loss'}`}>{isUp ? '+' : ''}{asset.changePercent.toFixed(1)}%</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground truncate">{asset.name}</p>
                      <p className="text-xs font-medium mt-1 text-foreground/80">${asset.price < 1 ? asset.price.toFixed(4) : asset.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</p>
                    </Link>
                  );
                })}
              </div>
            </section>
          )}
        </div>

        <AIMentor portfolio={portfolio} assets={assets} selectedAsset={selectedAsset} />
        <MegaFooter />
      </div>
    </>
  );
}
