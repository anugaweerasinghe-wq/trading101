import { useState } from "react";
import { Portfolio } from "@/lib/types";
import { ChevronDown, Wallet, DollarSign, TrendingUp, TrendingDown, PieChart } from "lucide-react";
import { cn } from "@/lib/utils";

interface MinimalistPortfolioBarProps {
  portfolio: Portfolio;
}

export function MinimalistPortfolioBar({ portfolio }: MinimalistPortfolioBarProps) {
  const [showDetails, setShowDetails] = useState(false);

  const totalValue = portfolio.cash + portfolio.positions.reduce(
    (sum, pos) => sum + pos.quantity * pos.asset.price,
    0
  );

  const totalPnL = portfolio.positions.reduce((sum, pos) => sum + pos.profitLoss, 0);
  const totalPnLPercent = totalValue > 0 ? (totalPnL / (totalValue - totalPnL)) * 100 : 0;
  const isPositive = totalPnL >= 0;

  return (
    <div className="glass-panel border border-white/10 rounded-2xl overflow-hidden">
      {/* Main Stats */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-6">
          {/* Total Value */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Value</p>
              <p className="text-xl font-bold tabular-nums text-glow-cyan">
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>

          <div className="h-10 w-px bg-white/10" />

          {/* Available Cash */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-secondary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Available Cash</p>
              <p className="text-xl font-bold tabular-nums">
                ${portfolio.cash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>

        {/* Toggle Details */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors text-sm text-muted-foreground hover:text-foreground"
        >
          Details
          <ChevronDown className={cn(
            "w-4 h-4 transition-transform",
            showDetails && "rotate-180"
          )} />
        </button>
      </div>

      {/* Expanded Details */}
      {showDetails && (
        <div className="px-4 pb-4 pt-2 border-t border-white/5 animate-fade-in">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* P&L */}
            <div className="p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 mb-1">
                {isPositive ? (
                  <TrendingUp className="w-4 h-4 text-profit" />
                ) : (
                  <TrendingDown className="w-4 h-4 text-loss" />
                )}
                <span className="text-xs text-muted-foreground">Total P&L</span>
              </div>
              <p className={cn(
                "text-lg font-bold tabular-nums",
                isPositive ? "text-profit" : "text-loss"
              )}>
                {isPositive ? '+' : ''}${totalPnL.toFixed(2)}
              </p>
              <p className={cn(
                "text-xs tabular-nums",
                isPositive ? "text-profit" : "text-loss"
              )}>
                {isPositive ? '+' : ''}{totalPnLPercent.toFixed(2)}%
              </p>
            </div>

            {/* Positions */}
            <div className="p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 mb-1">
                <PieChart className="w-4 h-4 text-primary" />
                <span className="text-xs text-muted-foreground">Positions</span>
              </div>
              <p className="text-lg font-bold">
                {portfolio.positions.length}
              </p>
              <p className="text-xs text-muted-foreground">
                Active holdings
              </p>
            </div>

            {/* Invested */}
            <div className="p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 mb-1">
                <Wallet className="w-4 h-4 text-secondary" />
                <span className="text-xs text-muted-foreground">Invested</span>
              </div>
              <p className="text-lg font-bold tabular-nums">
                ${(totalValue - portfolio.cash).toLocaleString('en-US', { maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-muted-foreground">
                In positions
              </p>
            </div>

            {/* Trades */}
            <div className="p-3 rounded-xl bg-white/5">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4 text-profit" />
                <span className="text-xs text-muted-foreground">Trades</span>
              </div>
              <p className="text-lg font-bold">
                {portfolio.trades.length}
              </p>
              <p className="text-xs text-muted-foreground">
                Total executed
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
