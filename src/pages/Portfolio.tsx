import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { AIAssistant } from "@/components/AIAssistant";
import { PortfolioChart } from "@/components/PortfolioChart";
import { getPortfolio, updatePositionPrices, savePortfolio } from "@/lib/portfolio";
import { updatePortfolioOverTime } from "@/lib/portfolioHistory";
import { ASSETS } from "@/lib/assets";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wallet, DollarSign, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState(getPortfolio());

  useEffect(() => {
    // First, simulate price changes over time since last visit
    let updated = updatePortfolioOverTime(portfolio);
    // Then update with current market prices
    updated = updatePositionPrices(updated);
    setPortfolio(updated);
    savePortfolio(updated);
  }, []);

  const totalPositionValue = portfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);
  const totalProfitLoss = portfolio.positions.reduce((sum, p) => sum + p.profitLoss, 0);
  const totalProfitLossPercent = totalPositionValue > 0 
    ? (totalProfitLoss / (totalPositionValue - totalProfitLoss)) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <h1 className="text-5xl font-bold mb-8">Portfolio</h1>

          {/* Performance Chart */}
          <div className="mb-12">
            <PortfolioChart />
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Total Value</span>
              </div>
              <p className="text-3xl font-bold">${portfolio.totalValue.toFixed(2)}</p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Cash</span>
              </div>
              <p className="text-3xl font-bold">${portfolio.cash.toFixed(2)}</p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <PieChart className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Positions</span>
              </div>
              <p className="text-3xl font-bold">${totalPositionValue.toFixed(2)}</p>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center",
                  totalProfitLoss >= 0 ? "bg-success/20" : "bg-destructive/20"
                )}>
                  {totalProfitLoss >= 0 ? (
                    <TrendingUp className="w-5 h-5 text-success" />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-destructive" />
                  )}
                </div>
                <span className="text-sm text-muted-foreground">P&L</span>
              </div>
              <p className={cn(
                "text-3xl font-bold",
                totalProfitLoss >= 0 ? "text-success" : "text-destructive"
              )}>
                {totalProfitLoss >= 0 ? '+' : ''}${totalProfitLoss.toFixed(2)}
              </p>
              <p className={cn(
                "text-sm",
                totalProfitLoss >= 0 ? "text-success" : "text-destructive"
              )}>
                {totalProfitLoss >= 0 ? '+' : ''}{totalProfitLossPercent.toFixed(2)}%
              </p>
            </Card>
          </div>

          {/* Positions */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold mb-6">Positions</h2>
            {portfolio.positions.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-xl text-muted-foreground">No positions yet. Start trading to build your portfolio!</p>
              </Card>
            ) : (
              <div className="grid gap-4">
                {portfolio.positions.map((position) => (
                  <Card key={position.asset.id} className="p-6 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="text-2xl font-bold">{position.asset.symbol}</h3>
                            <Badge variant="outline" className="capitalize">
                              {position.asset.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{position.asset.name}</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-muted-foreground mb-1">
                          {position.quantity} shares @ ${position.avgPrice.toFixed(2)}
                        </p>
                        <p className="text-2xl font-bold mb-1">
                          ${position.currentValue.toFixed(2)}
                        </p>
                        <p className={cn(
                          "text-sm font-medium flex items-center justify-end gap-1",
                          position.profitLoss >= 0 ? "text-success" : "text-destructive"
                        )}>
                          {position.profitLoss >= 0 ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          {position.profitLoss >= 0 ? '+' : ''}${position.profitLoss.toFixed(2)} ({position.profitLoss >= 0 ? '+' : ''}{position.profitLossPercent.toFixed(2)}%)
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Trade History */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Trade History</h2>
            {portfolio.trades.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-xl text-muted-foreground">No trades yet.</p>
              </Card>
            ) : (
              <div className="grid gap-3">
                {portfolio.trades.slice(0, 10).map((trade) => (
                  <Card key={trade.id} className="p-4 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Badge variant={trade.type === 'buy' ? 'default' : 'outline'}>
                          {trade.type.toUpperCase()}
                        </Badge>
                        <div>
                          <p className="font-semibold">{trade.symbol}</p>
                          <p className="text-sm text-muted-foreground">
                            {trade.quantity} shares @ ${trade.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${trade.total.toFixed(2)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(trade.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <AIAssistant portfolio={portfolio} assets={ASSETS} />
    </div>
  );
}
