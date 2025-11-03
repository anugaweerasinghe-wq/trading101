import { useMemo } from "react";
import { Portfolio } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { TrendingUp, Target, Shield, Award } from "lucide-react";

interface PortfolioAnalyticsProps {
  portfolio: Portfolio;
}

const COLORS = ['hsl(45 100% 51%)', 'hsl(142 71% 45%)', 'hsl(217 91% 60%)', 'hsl(0 72% 51%)', 'hsl(280 100% 70%)'];

export function PortfolioAnalytics({ portfolio }: PortfolioAnalyticsProps) {
  const analytics = useMemo(() => {
    const totalInvested = portfolio.positions.reduce((sum, p) => sum + (p.avgPrice * p.quantity), 0);
    const currentValue = portfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);
    const totalReturn = currentValue - totalInvested;
    const returnPercent = totalInvested > 0 ? (totalReturn / totalInvested) * 100 : 0;

    // Calculate Sharpe Ratio (simplified)
    const returns = portfolio.positions.map(p => p.profitLossPercent);
    const avgReturn = returns.reduce((a, b) => a + b, 0) / (returns.length || 1);
    const stdDev = Math.sqrt(returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) / (returns.length || 1));
    const sharpeRatio = stdDev !== 0 ? (avgReturn / stdDev) : 0;

    // Win/Loss ratio
    const winners = portfolio.positions.filter(p => p.profitLoss > 0).length;
    const losers = portfolio.positions.filter(p => p.profitLoss < 0).length;
    const winRate = portfolio.positions.length > 0 ? (winners / portfolio.positions.length) * 100 : 0;

    // Sector allocation
    const allocation = portfolio.positions.reduce((acc, p) => {
      const type = p.asset.type;
      acc[type] = (acc[type] || 0) + p.currentValue;
      return acc;
    }, {} as Record<string, number>);

    const allocationData = Object.entries(allocation).map(([name, value]) => ({
      name: name.toUpperCase(),
      value,
      percentage: (value / currentValue) * 100
    }));

    // Diversification score (0-100)
    const diversificationScore = Math.min(
      100,
      (Object.keys(allocation).length * 20) + // Sector diversity
      (portfolio.positions.length * 5) // Number of positions
    );

    return {
      totalInvested,
      currentValue,
      totalReturn,
      returnPercent,
      sharpeRatio,
      winRate,
      winners,
      losers,
      allocationData,
      diversificationScore
    };
  }, [portfolio]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Performance Metrics */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Performance Metrics
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Return</span>
            <span className={`text-xl font-bold ${analytics.totalReturn >= 0 ? 'text-success' : 'text-destructive'}`}>
              {analytics.totalReturn >= 0 ? '+' : ''}${analytics.totalReturn.toFixed(2)} ({analytics.returnPercent.toFixed(2)}%)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Sharpe Ratio</span>
            <span className="text-xl font-bold">{analytics.sharpeRatio.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Win Rate</span>
            <span className="text-xl font-bold text-success">{analytics.winRate.toFixed(1)}%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Winners / Losers</span>
            <span className="font-medium">
              <span className="text-success">{analytics.winners}</span> / <span className="text-destructive">{analytics.losers}</span>
            </span>
          </div>
        </div>
      </Card>

      {/* Portfolio Allocation */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Target className="w-5 h-5 text-primary" />
          Asset Allocation
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
          <p className="text-muted-foreground text-center py-8">No positions yet</p>
        )}
      </Card>

      {/* Diversification Score */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Diversification Score
        </h3>
        <div className="text-center">
          <div className="relative inline-flex items-center justify-center">
            <div className="text-6xl font-bold text-gradient-gold">{analytics.diversificationScore}</div>
            <span className="absolute -bottom-2 text-sm text-muted-foreground">/100</span>
          </div>
          <p className="mt-6 text-muted-foreground">
            {analytics.diversificationScore >= 80 && "Excellent diversification!"}
            {analytics.diversificationScore >= 60 && analytics.diversificationScore < 80 && "Good diversification"}
            {analytics.diversificationScore >= 40 && analytics.diversificationScore < 60 && "Moderate diversification"}
            {analytics.diversificationScore < 40 && "Consider diversifying more"}
          </p>
        </div>
      </Card>

      {/* Risk Assessment */}
      <Card className="p-6 bg-card/50 backdrop-blur-sm">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          Risk Assessment
        </h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Portfolio Volatility</span>
              <span className="font-medium">
                {Math.abs(analytics.sharpeRatio) < 0.5 && "Low"}
                {Math.abs(analytics.sharpeRatio) >= 0.5 && Math.abs(analytics.sharpeRatio) < 1.5 && "Medium"}
                {Math.abs(analytics.sharpeRatio) >= 1.5 && "High"}
              </span>
            </div>
            <Progress 
              value={Math.min(100, Math.abs(analytics.sharpeRatio) * 40)} 
              className="h-2"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Cash Reserve</span>
              <span className="font-medium">{((portfolio.cash / portfolio.totalValue) * 100).toFixed(1)}%</span>
            </div>
            <Progress 
              value={(portfolio.cash / portfolio.totalValue) * 100} 
              className="h-2"
            />
          </div>
          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {portfolio.cash / portfolio.totalValue > 0.5 && "High cash reserve - consider more investments"}
              {portfolio.cash / portfolio.totalValue <= 0.5 && portfolio.cash / portfolio.totalValue > 0.2 && "Healthy cash balance"}
              {portfolio.cash / portfolio.totalValue <= 0.2 && "Low cash reserve - be cautious"}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
