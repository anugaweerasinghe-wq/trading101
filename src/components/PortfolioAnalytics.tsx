import { useMemo } from "react";
import { Portfolio } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Target, Shield, TrendingDown } from "lucide-react";
import { calculateMaxDrawdown, calculateRealizedPnL } from "@/lib/portfolio";

interface PortfolioAnalyticsProps {
  portfolio: Portfolio;
}

const COLORS = ['hsl(45 100% 51%)', 'hsl(142 71% 45%)', 'hsl(217 91% 60%)', 'hsl(0 72% 51%)', 'hsl(280 100% 70%)'];

export function PortfolioAnalytics({ portfolio }: PortfolioAnalyticsProps) {
  const analytics = useMemo(() => {
    const totalCostBasis = portfolio.positions.reduce((sum, p) => sum + (p.avgPrice * p.quantity), 0);
    const openPositionsValue = portfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);
    const unrealizedPnL = openPositionsValue - totalCostBasis;
    const unrealizedPct = totalCostBasis > 0 ? (unrealizedPnL / totalCostBasis) * 100 : 0;

    // These are OPEN-position counts, not a closed-trade win rate.
    const positiveOpenPositions = portfolio.positions.filter(p => p.profitLoss > 0).length;
    const negativeOpenPositions = portfolio.positions.filter(p => p.profitLoss < 0).length;

    const allocation = portfolio.positions.reduce((acc, p) => {
      const type = p.asset.type;
      acc[type] = (acc[type] || 0) + p.currentValue;
      return acc;
    }, {} as Record<string, number>);

    const allocationData = Object.entries(allocation).map(([name, value]) => ({
      name: name.toUpperCase(),
      value,
      percentage: openPositionsValue > 0 ? (value / openPositionsValue) * 100 : 0,
    }));

    const largestPositionWeight = openPositionsValue > 0
      ? Math.max(0, ...portfolio.positions.map(p => (p.currentValue / openPositionsValue) * 100))
      : 0;

    const maxDrawdown = calculateMaxDrawdown();
    const realizedPnL = calculateRealizedPnL(portfolio);
    const cashPct = portfolio.totalValue > 0 ? (portfolio.cash / portfolio.totalValue) * 100 : 0;

    return {
      totalCostBasis,
      openPositionsValue,
      unrealizedPnL,
      unrealizedPct,
      positiveOpenPositions,
      negativeOpenPositions,
      allocationData,
      assetClassCount: Object.keys(allocation).length,
      largestPositionWeight,
      maxDrawdown,
      realizedPnL,
      cashPct,
    };
  }, [portfolio]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Practice Portfolio Metrics
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Open-position unrealized P&amp;L</span>
            <span className={`text-xl font-bold ${analytics.unrealizedPnL >= 0 ? 'text-success' : 'text-destructive'}`}>
              {analytics.unrealizedPnL >= 0 ? '+' : ''}${analytics.unrealizedPnL.toFixed(2)} ({analytics.unrealizedPct.toFixed(2)}%)
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Positive / negative open positions</span>
            <span className="font-medium">
              <span className="text-success">{analytics.positiveOpenPositions}</span> / <span className="text-destructive">{analytics.negativeOpenPositions}</span>
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5" /> Max drawdown in local snapshot history
            </span>
            <span className="text-base font-semibold text-destructive tabular-nums">
              -{analytics.maxDrawdown.toFixed(2)}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Realized P&amp;L from recorded trades</span>
            <span className={`text-base font-semibold tabular-nums ${analytics.realizedPnL >= 0 ? "text-success" : "text-destructive"}`}>
              {analytics.realizedPnL >= 0 ? "+" : ""}${analytics.realizedPnL.toFixed(2)}
            </span>
          </div>
        </div>
        <p className="mt-5 text-xs text-muted-foreground/70 leading-relaxed">
          TradeHQ does not label a cross-section of current positions as a Sharpe ratio. A standard Sharpe calculation needs a return series, a time interval and a risk-free-rate convention that this card does not currently have.
        </p>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Open-Position Allocation
        </h3>
        {analytics.allocationData.length > 0 ? (
          <div className="flex items-center gap-6">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={analytics.allocationData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {analytics.allocationData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `$${value.toFixed(2)}`}
                  contentStyle={{ backgroundColor: 'hsl(0 0% 8%)', border: '1px solid hsl(0 0% 20%)' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex-1 space-y-3">
              {analytics.allocationData.map((item, index) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      {item.name}
                    </span>
                    <span className="font-medium">{item.percentage.toFixed(1)}%</span>
                  </div>
                  <Progress value={item.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground text-center py-8">No open positions yet</p>
        )}
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Concentration Snapshot
        </h3>
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Open positions</span>
            <span className="font-medium">{portfolio.positions.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Asset classes represented</span>
            <span className="font-medium">{analytics.assetClassCount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Largest open position</span>
            <span className="font-medium">{analytics.largestPositionWeight.toFixed(1)}% of invested value</span>
          </div>
          <p className="pt-3 border-t border-border text-xs text-muted-foreground/70 leading-relaxed">
            These are descriptive concentration measures. Position count and asset-class count alone do not measure correlation or prove that a portfolio is diversified.
          </p>
        </div>
      </Card>

      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6">Metric Notes</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Cash share</span>
              <span className="font-medium">{analytics.cashPct.toFixed(1)}%</span>
            </div>
            <Progress value={Math.max(0, Math.min(100, analytics.cashPct))} className="h-2" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Cash share is shown as a fact, not graded as healthy or unhealthy. Max drawdown uses TradeHQ's locally recorded portfolio snapshots, so it can differ from a continuously sampled real brokerage equity curve.
          </p>
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            Values are simulator metrics and depend on the price provenance and local history available to this browser.
          </p>
        </div>
      </Card>
    </div>
  );
}
