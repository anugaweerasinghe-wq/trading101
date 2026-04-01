import { useState, useEffect } from "react";
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
import {
  simulateAssetPrices,
  shouldUpdatePrices,
  setLastUpdateTime,
} from "@/lib/priceSimulation";
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
  const [assets, setAssets] = useState(ASSETS);
  const [canClaim, setCanClaim] = useState(canClaimWeeklyBonus());
  const [notificationsEnabled, setNotificationsEnabled] = useState(
    typeof Notification !== "undefined" &&
      Notification.permission === "granted",
  );
  const { toast } = useToast();

  useEffect(() => {
    const initPortfolio = async () => {
      let updated = await updatePortfolioOverTime(portfolio);
      updated = updatePositionPrices(updated);
      setPortfolio(updated);
      savePortfolio(updated);
      initializeMilestones(updated.totalValue);
    };

    initPortfolio();

    const priceInterval = setInterval(() => {
      if (shouldUpdatePrices()) {
        const updatedAssets = simulateAssetPrices(assets, 0.01);
        setAssets(updatedAssets);
        setLastUpdateTime(new Date());

        const updatedPortfolio = updatePositionPrices(getPortfolio());
        setPortfolio(updatedPortfolio);

        checkMilestones(updatedPortfolio.totalValue, (_milestone, label, type) => {
          const state = getMilestoneState();
          const profit = updatedPortfolio.totalValue - state.initialValue;

          toast({
            title: `🎯 Milestone Reached: ${label}!`,
            description: `Your portfolio is now worth $${updatedPortfolio.totalValue.toFixed(
              2,
            )} (${profit >= 0 ? "+" : ""}$${profit.toFixed(2)})`,
            variant: type === "danger" ? "destructive" : "default",
          });
        });
      }
    }, 5000);

    return () => clearInterval(priceInterval);
  }, []);

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
                <p className="text-2xs text-muted-foreground mt-0.5">
                  Cash + Positions
                </p>
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
