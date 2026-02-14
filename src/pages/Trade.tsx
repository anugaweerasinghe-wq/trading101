import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, Link } from "react-router-dom";
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
import { setLastUpdateTime } from "@/lib/priceSimulation";
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
        {
          headers: {
            "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && typeof result.data.price === "number" && result.data.price > 0) {
          return {
            ...asset,
            price: result.data.price,
            change: typeof result.data.change24h === "number" ? result.data.change24h : asset.change,
            changePercent: typeof result.data.changePercent24h === "number" ? result.data.changePercent24h : asset.changePercent,
          };
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

  const handleTrade = useCallback((asset: Asset, type: "buy" | "sell", quantity: number) => {
    const result = executeTrade(portfolio, asset, type, quantity);
    if (result.success && result.portfolio) {
      setPortfolio(result.portfolio);
      const priceStr = typeof asset.price === "number" ? asset.price.toLocaleString() : "N/A";
      toast({ title: `${type === "buy" ? "🟢" : "🔴"} Order Executed`, description: `${type === "buy" ? "Bought" : "Sold"} ${quantity.toFixed(4)} ${asset.symbol} at $${priceStr}` });
    } else { toast({ title: "Order Failed", description: result.message, variant: "destructive" }); }
  }, [portfolio, toast]);

  const handleToggleFavorite = useCallback((assetId: string) => { toggleFavorite(assetId); setFavorites(getFavorites()); }, []);
  const handleAssetSelect = useCallback((asset: Asset) => { setSelectedAsset(asset); }, []);

  return (
    <>
      <Helmet>
        {/* SEO title for Google */}
        <title>{selectedAsset 
          ? `${selectedAsset.name} Trading Simulator – Learn, Practice & Profit | TradeHQ 2026` 
          : "TradeHQ – Free Stock, Crypto & Forex Simulator | Learn, Practice & Profit"
        }</title>

        {/* Visible short title for the website tab */}
        <meta name="title" content={selectedAsset ? `${selectedAsset.name} Simulator | TradeHQ` : "TradeHQ Simulator"} />
        <meta
          name="description"
          content={selectedAsset ? `Practice ${selectedAsset.name} trading with $100K virtual cash. Learn technical analysis, risk management & real-time charts.` : "Start trading stocks, crypto & forex for free with TradeHQ. Real charts, zero risk."}
        />
        <link rel="canonical" href={`https://tradinghq.vercel.app/trade/${selectedAsset?.symbol || ""}`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <GlowStatusBar />

        <div className="flex-1 container mx-auto px-4 py-6 space-y-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <AssetSearchDropdown
                assets={assets}
                selectedAsset={selectedAsset}
                favorites={favorites}
                onSelectAsset={handleAssetSelect}
                onToggleFavorite={handleToggleFavorite}
              />
              <LiveDataToggle
                asset={selectedAsset}
                onLiveDataReceived={(livePrice, isLive) => {
                  if (isLive && selectedAsset && typeof livePrice === "number" && livePrice > 0) {
                    setAssets(prev => prev.map(a => a.id === selectedAsset.id ? { ...a, price: livePrice } : a));
                  }
                }}
              />
            </div>
            <div className="w-full lg:w-auto lg:flex-1 lg:max-w-2xl">
              <MinimalistPortfolioBar portfolio={portfolio} />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="glass-panel border border-white/10 rounded-2xl h-[500px] overflow-hidden">
                {isLoading ? <ChartSkeleton /> : selectedAsset && <MinimalistAreaChart asset={selectedAsset} />}
              </div>
            </div>
            <div className="hidden lg:block">
              <MinimalistOrderPanel asset={selectedAsset} availableCash={portfolio.cash} onTrade={handleTrade} />
            </div>
          </div>

          <div className="lg:hidden">
            <MobileOrderDrawer asset={selectedAsset} availableCash={portfolio.cash} onTrade={handleTrade} />
          </div>

          {/* --- Related Assets / Fixed clickable cards --- */}
          {assets.length > 1 && (
            <div className="glass-panel p-6 rounded-2xl mt-8 border border-white/10">
              <h3 className="text-xl font-bold mb-6">Other Assets You Can Practice</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {assets.filter(a => a.id !== selectedAsset?.id).map(asset => (
                  <Link
                    key={asset.id}
                    to={`/trade/${asset.symbol}`}
                    className="flex flex-col justify-center items-center p-4 bg-black/40 rounded-xl border border-white/5 text-center hover:bg-black/60 transition cursor-pointer"
                  >
                    <span className="font-bold text-gray-300 text-lg">{asset.symbol}</span>
                    <div className="text-xs text-gray-500 mt-1">{asset.name}</div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <AIMentor portfolio={portfolio} assets={assets} selectedAsset={selectedAsset} />
        <MegaFooter />
      </div>
    </>
  );
}
