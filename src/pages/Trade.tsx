import { useState, useEffect, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
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

// ----------------- SEO & Content Data -----------------
const TRADE_CONTENT: Record<string, any> = {
  BTC: {
    title: "Practice Bitcoin Trading for Beginners (Free Simulator)",
    description:
      "Bitcoin’s volatility teaches traders risk management. Use our $100K virtual cash simulator to master crypto without losing real money.",
    sections: [
      {
        heading: "Why Bitcoin Matters in 2026",
        text: "Bitcoin remains the most popular cryptocurrency with extreme volatility. Learning BTC trading helps you understand risk, support/resistance, and market psychology."
      },
      {
        heading: "How Students Can Practice BTC Trading",
        text: "As a student, track BTC charts, simulate trades, and test strategies with virtual capital. This builds confidence before entering live markets."
      }
    ],
    faqs: [
      {
        question: "Can I lose real money on this simulator?",
        answer: "No, all trades use $100K virtual cash. You can experiment freely."
      },
      {
        question: "Do I need prior experience?",
        answer: "No. Our simulator is beginner-friendly and guides you through every step."
      }
    ]
  },

  ETH: {
    title: "Practice Ethereum Trading for Beginners (Free Simulator)",
    description:
      "Ethereum is the second largest crypto and key for smart contracts. Learn to trade ETH safely in our simulator with $100K virtual cash.",
    sections: [
      {
        heading: "Why Ethereum is Unique",
        text: "Ethereum supports smart contracts and DeFi applications. Tracking ETH helps understand altcoin cycles."
      },
      {
        heading: "Simulating ETH Trades",
        text: "Experiment with buying/selling ETH, analyze trends, and practice strategy without risking real money."
      }
    ],
    faqs: [
      {
        question: "Can I trade ETH with real money?",
        answer: "No, this is a simulator only. Real trading requires separate platforms."
      }
    ]
  },

  NVDA: {
    title: "Practice NVIDIA Stock Trading (Free Simulator)",
    description:
      "NVIDIA is the 2026 AI hardware leader. Learn to trade NVDA shares safely with virtual cash to understand tech stock volatility.",
    sections: [
      {
        heading: "Why NVDA is Important",
        text: "NVIDIA leads the AI hardware market. Trading NVDA teaches stock price reactions to earnings, product launches, and tech trends."
      },
      {
        heading: "Student-Friendly NVDA Trading",
        text: "Simulate NVDA trades with $100K virtual cash to learn risk/reward, order types, and market psychology."
      }
    ],
    faqs: [
      {
        question: "Do I need to buy real NVDA stock?",
        answer: "No, this is fully simulated. Learn without risking real money."
      }
    ]
  },

  AAPL: {
    title: "Practice Apple Stock Trading (Free Simulator)",
    description:
      "Apple is a blue-chip stock that moves with global tech trends. Simulate trades to learn investing strategies safely.",
    sections: [
      {
        heading: "Why Apple Matters",
        text: "AAPL is a stable yet high-interest stock. Trading Apple helps students learn long-term and short-term market dynamics."
      },
      {
        heading: "Simulating AAPL Trades",
        text: "Test strategies like swing trading and risk management with virtual capital before using real money."
      }
    ],
    faqs: [
      {
        question: "Can beginners practice AAPL trading?",
        answer: "Yes! Our simulator is designed for complete beginners."
      }
    ]
  },

  EURUSD: {
    title: "Practice EUR/USD Forex Trading (Free Simulator)",
    description:
      "Learn to trade the world’s most popular currency pair safely with virtual capital. Master Forex basics without financial risk.",
    sections: [
      {
        heading: "Why EUR/USD is Important",
        text: "EUR/USD is the most liquid currency pair. Understanding its movement helps grasp interest rate impact, global economics, and forex volatility."
      },
      {
        heading: "Student-Friendly Forex Practice",
        text: "Simulate buying/selling EUR/USD, learn chart patterns, and manage risk with $100K virtual cash."
      }
    ],
    faqs: [
      {
        question: "Do I need a Forex account?",
        answer: "No, the simulator allows full practice without opening real accounts."
      }
    ]
  }
};

// ----------------- Trade Component -----------------
export default function Trade() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [assetContent, setAssetContent] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  
  const isMounted = useRef(true);
  const isRefreshing = useRef(false);
  const assetsRef = useRef<Asset[]>([]);

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  useEffect(() => {
    if (selectedAsset) {
      const content = TRADE_CONTENT[selectedAsset.symbol];
      if (content) setAssetContent(content);
    }
  }, [selectedAsset]);

  // ----------------- Existing Trade Logic -----------------
  const fetchLivePrice = async (asset: Asset): Promise<Asset> => {
    if (!asset || typeof asset.price !== 'number' || isNaN(asset.price) || asset.price <= 0) {
      return asset;
    }
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=quote`,
        {
          headers: {
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && typeof result.data.price === 'number' && !isNaN(result.data.price) && result.data.price > 0) {
          return {
            ...asset,
            price: result.data.price,
            change: typeof result.data.change24h === 'number' ? result.data.change24h : asset.change,
            changePercent: typeof result.data.changePercent24h === 'number' ? result.data.changePercent24h : asset.changePercent,
          };
        }
      }
    } catch (err) {}
    return asset;
  };

  const simulatePrice = (asset: Asset): Asset => {
    if (!asset || typeof asset.price !== 'number' || isNaN(asset.price) || asset.price <= 0) {
      return asset;
    }
    
    const volatility = asset.type === 'crypto' ? 0.015 : 0.008;
    const changePercent = (Math.random() * volatility * 2 - volatility) * 100;
    const change = asset.price * (changePercent / 100);
    
    return {
      ...asset,
      price: Math.max(0.0001, asset.price + change * 0.1),
      change: change,
      changePercent: changePercent,
    };
  };

  const refreshAllAssets = useCallback(async () => {
    if (!isMounted.current || isRefreshing.current) return;
    const currentAssets = assetsRef.current;
    if (currentAssets.length === 0) return;
    isRefreshing.current = true;
    
    try {
      const cryptoAssets = currentAssets.filter(a => a.type === 'crypto').slice(0, 15);
      const updatedCrypto = await Promise.all(
        cryptoAssets.map(asset => fetchLivePrice(asset))
      );
      
      const updatedMap = new Map<string, Asset>();
      updatedCrypto.forEach(a => updatedMap.set(a.id, a));
      
      const allUpdated = currentAssets.map(asset => {
        if (updatedMap.has(asset.id)) return updatedMap.get(asset.id)!;
        return simulatePrice(asset);
      });
      
      if (isMounted.current) {
        setAssets(allUpdated);
        setLastUpdateTime(new Date());
      }
    } catch (err) {
      console.error('Batch refresh error:', err);
    } finally {
      isRefreshing.current = false;
    }
  }, []);

  useEffect(() => {
    isMounted.current = true;
    const validAssets = ASSETS.filter(asset => asset && typeof asset.price === 'number' && !isNaN(asset.price) && asset.price > 0 && typeof asset.change === 'number' && typeof asset.changePercent === 'number');
    
    const loadTimer = setTimeout(() => {
      if (!isMounted.current) return;
      setAssets(validAssets);
      setSelectedAsset(validAssets[0] || null);
      setIsLoading(false);
    }, 400);

    const updated = updatePositionPrices(portfolio);
    setPortfolio(updated);
    setFavorites(getFavorites());

    return () => {
      isMounted.current = false;
      clearTimeout(loadTimer);
    };
  }, []);

  useEffect(() => {
    if (isLoading || assets.length === 0) return;
    const initialRefresh = setTimeout(refreshAllAssets, 2000);
    const refreshInterval = setInterval(refreshAllAssets, 45000);
    return () => {
      clearTimeout(initialRefresh);
      clearInterval(refreshInterval);
    };
  }, [isLoading, refreshAllAssets]);

  useEffect(() => {
    if (selectedAsset && isMounted.current && assets.length > 0) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated && updated.price !== selectedAsset.price) setSelectedAsset(updated);
    }
  }, [assets, selectedAsset?.id]);

  const handleTrade = useCallback((asset: Asset, type: 'buy' | 'sell', quantity: number) => {
    const result = executeTrade(portfolio, asset, type, quantity);
    if (result.success && result.portfolio) {
      setPortfolio(result.portfolio);
      const priceStr = typeof asset.price === 'number' ? asset.price.toLocaleString() : 'N/A';
      toast({
        title: `${type === 'buy' ? '🟢' : '🔴'} Order Executed`,
        description: `${type === 'buy' ? 'Bought' : 'Sold'} ${quantity.toFixed(4)} ${asset.symbol} at $${priceStr}`,
      });
    } else {
      toast({ title: "Order Failed", description: result.message, variant: "destructive" });
    }
  }, [portfolio, toast]);

  const handleToggleFavorite = useCallback((assetId: string) => {
    toggleFavorite(assetId);
    setFavorites(getFavorites());
  }, []);

  const handleAssetSelect = useCallback((asset: Asset) => {
    setSelectedAsset(asset);
  }, []);

  // ----------------- JSX -----------------
  return (
    <>
      <Helmet>
        <title>{assetContent ? assetContent.title : "Trade Now — Free Simulator | TradeHQ 2026"}</title>
        <meta name="description" content={assetContent ? assetContent.description : "🚀 Practice stocks, crypto, ETFs & forex with $100K virtual cash. Real charts, real skills, zero risk."} />
        <link rel="canonical" href="https://tradinghq.vercel.app/trade" />
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
                  if (isLive && selectedAsset && typeof livePrice === 'number' && !isNaN(livePrice) && livePrice > 0) {
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

          {/* ----------------- SEO Content ----------------- */}
          {assetContent && (
            <div className="mt-12 space-y-8">
              <h1 className="text-3xl font-bold">{assetContent.title}</h1>
              <p className="text-gray-300">{assetContent.description}</p>
              {assetContent.sections.map((s: any, i: number) => (
                <section key={i}>
                  <h2 className="text-2xl font-semibold mt-6 mb-2">{s.heading}</h2>
                  <p className="text-gray-400">{s.text}</p>
                </section>
              ))}
              <section className="mt-8">
                <h2 className="text-2xl font-semibold mb-4">FAQs</h2>
                <dl className="space-y-2">
                  {assetContent.faqs.map((faq: any, i: number) => (
                    <div key={i}>
                      <dt className="font-bold">{faq.question}</dt>
                      <dd className="text-gray-400">{faq.answer}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            </div>
          )}
        </div>

        <AIMentor portfolio={portfolio} assets={assets} selectedAsset={selectedAsset} />
        <MegaFooter />
      </div>
    </>
  );
}
