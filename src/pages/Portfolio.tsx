import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { AIAssistant } from "@/components/AIAssistant";
import { PortfolioChart } from "@/components/PortfolioChart";
import { PortfolioAnalytics } from "@/components/PortfolioAnalytics";
import { RiskManagement } from "@/components/RiskManagement";
import { TradingJournal } from "@/components/TradingJournal";
import { TradeHistory } from "@/components/TradeHistory";
import { TradeAnalytics } from "@/components/TradeAnalytics";
import { PriceTicker } from "@/components/PriceTicker";
import { MegaFooter } from "@/components/MegaFooter";
import {
  getPortfolio,
  updatePositionPrices,
  savePortfolio,
  canClaimWeeklyBonus,
  getTimeUntilNextBonus,
  claimWeeklyBonus,
} from "@/lib/portfolio";
import { updatePortfolioOverTime } from "@/lib/portfolioHistory";
import { ASSETS } from "@/lib/assets";
import { persistPrice, getPersistedPrices } from "@/lib/pricePersistence";
import { generatePriceMovement } from "@/lib/priceMovement";
import { recordSnapshot } from "@/lib/portfolioHistory";
import { calculateDayChange } from "@/lib/portfolio";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  DollarSign,
  PieChart,
  Gift,
  Bell,
  BellOff,
  Activity,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AIInsightSummary } from "@/components/portfolio/AIInsightSummary";
import { PositionsTable } from "@/components/portfolio/PositionsTable";
import { useToast } from "@/hooks/use-toast";
import {
  requestNotificationPermission,
  checkMilestones,
  initializeMilestones,
  getMilestoneState,
} from "@/lib/notifications";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(getPortfolio());
  const [assets, setAssets] = useState(() => {
    // Hydrate from persisted prices for continuity
    const cached = getPersistedPrices();
    return ASSETS.map((a) => {
      const p = cached[a.id];
      return p ? { ...a, price: p.price, change: p.change, changePercent: p.changePercent } : a;
    });
  });
  const [dataStatus, setDataStatus] = useState<"live" | "cached" | "simulated">("cached");
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState(0);
  const assetsRef = useRef(assets);
  const isMounted = useRef(true);
  const [canClaim, setCanClaim] = useState(canClaimWeeklyBonus());
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    typeof Notification !== "undefined" &&
      Notification.permission === "granted",
  );
  const { toast } = useToast();

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  // Fetch real price for a single held asset
  const fetchLivePrice = async (asset: typeof ASSETS[number]) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/live-market-data?assetId=${asset.id}&type=${asset.type}&basePrice=${asset.price}&dataType=quote`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
      if (response.ok) {
        const result = await response.json();
        if (result.success && result.data && typeof result.data.price === "number" && result.data.price > 0) {
          return {
            ...asset,
            price: result.data.price,
            change: typeof result.data.change24h === "number" ? result.data.change24h : asset.change,
            changePercent: typeof result.data.changePercent24h === "number" ? result.data.changePercent24h : asset.changePercent,
            _live: true as const,
          };
        }
      }
    } catch (_err) {}
    return { ...asset, _live: false as const };
  };

  // Refresh held positions in staggered batches of 5
  const refreshHeldAssets = async () => {
    const heldIds = new Set(getPortfolio().positions.map((p) => p.asset.id));
    if (heldIds.size === 0) return;
    const heldAssets = assetsRef.current.filter((a) => heldIds.has(a.id));
    const batchSize = 5;
    let anyLive = false;
    const updates = new Map<string, typeof ASSETS[number]>();

    for (let i = 0; i < heldAssets.length; i += batchSize) {
      if (!isMounted.current) break;
      const batch = heldAssets.slice(i, i + batchSize);
      const results = await Promise.allSettled(batch.map(fetchLivePrice));
      results.forEach((r) => {
        if (r.status === "fulfilled") {
          const u = r.value;
          if (u._live) {
            anyLive = true;
            persistPrice(u.id, u.price, u.change, u.changePercent, "live");
          }
          const { _live, ...clean } = u;
          updates.set(u.id, clean as typeof ASSETS[number]);
        }
      });
      if (i + batchSize < heldAssets.length) await new Promise((r) => setTimeout(r, 1000));
    }

    if (!isMounted.current) return;
    const newAssets = assetsRef.current.map((a) => updates.get(a.id) ?? a);
    setAssets(newAssets);
    setDataStatus(anyLive ? "live" : "cached");
    setLastUpdated(new Date());

    // Recompute portfolio with fresh prices
    const fresh = updatePositionPrices(getPortfolio());
    setPortfolio(fresh);
    savePortfolio(fresh);
    const positionsValue = fresh.positions.reduce((s, p) => s + p.currentValue, 0);
    recordSnapshot(fresh.cash, positionsValue);

    checkMilestones(fresh.totalValue, (_m, label, type) => {
      const state = getMilestoneState();
      const profit = fresh.totalValue - state.initialValue;
      toast({
        title: `🎯 Milestone Reached: ${label}!`,
        description: `Your portfolio is now worth $${fresh.totalValue.toFixed(2)} (${profit >= 0 ? "+" : ""}$${profit.toFixed(2)})`,
        variant: type === "danger" ? "destructive" : "default",
      });
    });
  };

  useEffect(() => {
    isMounted.current = true;
    const initPortfolio = async () => {
      let updated = await updatePortfolioOverTime(portfolio);
      updated = updatePositionPrices(updated);
      setPortfolio(updated);
      savePortfolio(updated);
      initializeMilestones(updated.totalValue);
    };

    initPortfolio();
    refreshHeldAssets();

    // Real-data refresh every 60s
    const liveInterval = setInterval(refreshHeldAssets, 60000);

    // Visual micro-fluctuation every 3s for liveness, anchored to last real price
    const microInterval = setInterval(() => {
      setAssets((prev) =>
        prev.map((a) => {
          const m = generatePriceMovement(a.price);
          return { ...a, price: m.price, change: m.change, changePercent: m.changePercent };
        }),
      );
      setPortfolio((prev) => updatePositionPrices(prev));
    }, 3000);

    // "Updated Xs ago" ticker
    const tickInterval = setInterval(() => {
      setSecondsAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
    }, 1000);

    return () => {
      isMounted.current = false;
      clearInterval(liveInterval);
      clearInterval(microInterval);
      clearInterval(tickInterval);
    };
  }, []);

  useEffect(() => {
    setSecondsAgo(Math.floor((Date.now() - lastUpdated.getTime()) / 1000));
  }, [lastUpdated]);

  const totalPositionValue = portfolio.positions.reduce(
    (sum, p) => sum + p.currentValue,
    0,
  );
  const totalProfitLoss = portfolio.positions.reduce(
    (sum, p) => sum + p.profitLoss,
    0,
  );
  const totalProfitLossPercent =
    totalPositionValue > 0
      ? (totalProfitLoss / (totalPositionValue - totalProfitLoss)) * 100
      : 0;

  const dayChange = calculateDayChange(portfolio.totalValue);

  // US market hours indicator (9:30 - 16:00 ET, Mon-Fri)
  const isMarketOpen = (() => {
    const now = new Date();
    const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    const day = et.getDay();
    if (day === 0 || day === 6) return false;
    const minutes = et.getHours() * 60 + et.getMinutes();
    return minutes >= 570 && minutes < 960;
  })();

  const handleClaimBonus = () => {
    const result = claimWeeklyBonus(portfolio);

    if (result.success && result.portfolio) {
      setPortfolio(result.portfolio);
      setCanClaim(false);
      toast({
        title: "Weekly Bonus Claimed!",
        description: result.message,
      });
    } else {
      toast({
        title: "Cannot Claim Bonus",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleToggleNotifications = async () => {
    if (notificationsEnabled) {
      setNotificationsEnabled(false);
      toast({
        title: "Notifications Disabled",
        description: "You won't receive milestone notifications",
      });
    } else {
      const permission = await requestNotificationPermission();

      if (permission === "granted") {
        setNotificationsEnabled(true);
        toast({
          title: "Notifications Enabled!",
          description:
            "You'll receive alerts when you hit milestones like +10%, +50%, or -20%",
        });
      } else {
        toast({
          title: "Permission Denied",
          description: "Enable notifications in your browser settings",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Portfolio Dashboard — Track Your $10K Virtual Trading Performance | TradeHQ
        </title>
        <meta
          name="description"
          content="Real-time portfolio tracker with AI analytics, trading journal, performance charts, and milestone alerts. See your P&L, positions, and risk metrics instantly."
        />
        <link rel="canonical" href="https://tradinghq.vercel.app/portfolio" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Portfolio Dashboard — Track Your Virtual Trading Performance | TradeHQ"
        />
        <meta
          property="og:description"
          content="Live P&L, AI insights, journal, and risk management for your $10K practice portfolio."
        />
        <meta property="og:url" content="https://tradinghq.vercel.app/portfolio" />
        <meta
          property="og:image"
          content="https://tradinghq.vercel.app/og-image.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Portfolio Dashboard — TradeHQ" />
        <meta
          name="twitter:description"
          content="Track your virtual trading performance with AI analytics & journal."
        />
        <meta
          name="twitter:image"
          content="https://tradinghq.vercel.app/og-image.png"
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-20 pb-12">
          <div className="container mx-auto px-6 mb-6">
            <PriceTicker assets={assets} />
          </div>

          <div className="container mx-auto px-6">
            <header className="mb-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                    Portfolio Dashboard
                  </h1>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Track your virtual investments, analyze performance, and manage simulated risk.
                  </p>
                  <div className="flex items-center gap-3 mt-3 flex-wrap">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-2xs font-medium border",
                        dataStatus === "live"
                          ? "bg-success/10 text-success border-success/30"
                          : dataStatus === "cached"
                          ? "bg-primary/10 text-primary border-primary/30"
                          : "bg-muted text-muted-foreground border-border",
                      )}
                    >
                      <span
                        className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          dataStatus === "live" ? "bg-success animate-pulse" : "bg-current",
                        )}
                      />
                      {dataStatus === "live" ? "Live Data" : dataStatus === "cached" ? "Cached" : "Simulated"}
                    </span>
                    <span className="inline-flex items-center gap-1 text-2xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      Updated {secondsAgo}s ago
                    </span>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-2xs font-medium border",
                        isMarketOpen
                          ? "bg-success/10 text-success border-success/30"
                          : "bg-warning/10 text-warning border-warning/30",
                      )}
                    >
                      <Activity className="w-3 h-3" />
                      {isMarketOpen ? "US Markets Open" : "After Hours"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <Button
                    onClick={handleToggleNotifications}
                    size="sm"
                    variant="outline"
                    className="gap-1.5 text-xs"
                  >
                    {notificationsEnabled ? (
                      <Bell className="w-4 h-4" />
                    ) : (
                      <BellOff className="w-4 h-4" />
                    )}
                    {notificationsEnabled ? "Alerts On" : "Alerts"}
                  </Button>

                  <Button
                    onClick={handleClaimBonus}
                    disabled={!canClaim}
                    size="sm"
                    className="gap-1.5 text-xs"
                  >
                    <Gift className="w-4 h-4" />
                    {canClaim ? "Claim Bonus" : `${getTimeUntilNextBonus()}`}
                  </Button>
                </div>
              </div>
            </header>

            <div className="mb-12">
              <PortfolioChart />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-12">
              <div className="xl:col-span-2">
                <PortfolioAnalytics portfolio={portfolio} />
              </div>
              <div className="xl:col-span-1">
                <RiskManagement portfolio={portfolio} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <Card className="p-5 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Wallet className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Total Value</span>
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  ${portfolio.totalValue.toFixed(2)}
                </p>
                {dayChange ? (
                  <p
                    className={cn(
                      "text-2xs mt-0.5 tabular-nums",
                      dayChange.dollars >= 0 ? "text-success" : "text-destructive",
                    )}
                  >
                    {dayChange.dollars >= 0 ? "+" : ""}${dayChange.dollars.toFixed(2)} (
                    {dayChange.percent >= 0 ? "+" : ""}
                    {dayChange.percent.toFixed(2)}%) today
                  </p>
                ) : (
                  <p className="text-2xs text-muted-foreground mt-0.5">Cash + Positions</p>
                )}
              </Card>

              <Card className="p-5 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-success/20 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-success" />
                  </div>
                  <span className="text-xs text-muted-foreground">Available Cash</span>
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  ${portfolio.cash.toFixed(2)}
                </p>
                <p className="text-2xs text-muted-foreground mt-0.5">
                  Ready to deploy
                </p>
              </Card>

              <Card className="p-5 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center">
                    <PieChart className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">Invested</span>
                </div>
                <p className="text-2xl font-bold tabular-nums">
                  ${totalPositionValue.toFixed(2)}
                </p>
                <p className="text-2xs text-muted-foreground mt-0.5">
                  {portfolio.positions.length} position
                  {portfolio.positions.length !== 1 ? "s" : ""}
                </p>
              </Card>

              <Card className="p-5 bg-card/50 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={cn(
                      "w-9 h-9 rounded-lg flex items-center justify-center",
                      totalProfitLoss >= 0
                        ? "bg-success/20"
                        : "bg-destructive/20",
                    )}
                  >
                    {totalProfitLoss >= 0 ? (
                      <TrendingUp className="w-4 h-4 text-success" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-destructive" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Unrealized P&amp;L
                  </span>
                </div>
                <p
                  className={cn(
                    "text-2xl font-bold tabular-nums",
                    totalProfitLoss >= 0 ? "text-success" : "text-destructive",
                  )}
                >
                  {totalProfitLoss >= 0 ? "+" : ""}
                  ${totalProfitLoss.toFixed(2)}
                </p>
                <p
                  className={cn(
                    "text-2xs mt-0.5",
                    totalProfitLoss >= 0 ? "text-success" : "text-destructive",
                  )}
                >
                  {totalProfitLoss >= 0 ? "+" : ""}
                  {totalProfitLossPercent.toFixed(2)}% overall
                </p>
              </Card>
            </div>

            <div className="mb-8">
              <AIInsightSummary portfolio={portfolio} />
            </div>

            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-5">Positions</h2>
              <PositionsTable positions={portfolio.positions} />
            </div>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Trade Performance</h2>
              <TradeAnalytics portfolio={portfolio} />
            </div>

            <div className="mb-12">
              <TradingJournal trades={portfolio.trades} />
            </div>

            <div className="mb-12">
              <TradeHistory trades={portfolio.trades} />
            </div>
          </div>
        </main>

        <AIAssistant portfolio={portfolio} assets={assets} />
        <MegaFooter />
      </div>
    </>
  );
}
