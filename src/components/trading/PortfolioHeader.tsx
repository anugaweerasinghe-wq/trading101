import { Portfolio } from "@/lib/types";
import { cn } from "@/lib/utils";
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank,
  Activity,
  BarChart3
} from "lucide-react";

interface PortfolioHeaderProps {
  portfolio: Portfolio;
}

export function PortfolioHeader({ portfolio }: PortfolioHeaderProps) {
  const positionsValue = portfolio.positions.reduce((sum, p) => sum + p.currentValue, 0);
  const totalPnL = portfolio.positions.reduce((sum, p) => sum + p.profitLoss, 0);
  const pnlPercent = positionsValue > 0 ? (totalPnL / (positionsValue - totalPnL)) * 100 : 0;
  const isProfit = totalPnL >= 0;

  const stats = [
    {
      label: "Total Balance",
      value: `$${portfolio.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Wallet,
      change: null,
      highlight: true,
    },
    {
      label: "Available Cash",
      value: `$${portfolio.cash.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: PiggyBank,
      change: null,
    },
    {
      label: "In Positions",
      value: `$${positionsValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: Activity,
      change: null,
    },
    {
      label: "Unrealized P&L",
      value: `${isProfit ? '+' : ''}$${totalPnL.toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
      icon: isProfit ? TrendingUp : TrendingDown,
      change: `${isProfit ? '+' : ''}${pnlPercent.toFixed(2)}%`,
      isProfit,
    },
    {
      label: "Open Positions",
      value: portfolio.positions.length.toString(),
      icon: BarChart3,
      change: null,
    },
  ];

  return (
    <div className="flex items-center gap-1 bento-card p-1">
      {stats.map((stat, index) => (
        <div 
          key={stat.label}
          className={cn(
            "flex items-center gap-3 px-4 py-2 rounded-xl transition-colors",
            stat.highlight && "bg-primary/10",
            index !== stats.length - 1 && "border-r border-border/30"
          )}
        >
          <stat.icon className={cn(
            "w-4 h-4",
            stat.isProfit !== undefined 
              ? (stat.isProfit ? "text-profit" : "text-loss")
              : "text-muted-foreground"
          )} />
          <div>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <div className="flex items-center gap-2">
              <p className={cn(
                "text-sm font-semibold tabular-nums",
                stat.highlight && "text-glow-cyan text-primary",
                stat.isProfit !== undefined && (stat.isProfit ? "text-profit" : "text-loss")
              )}>
                {stat.value}
              </p>
              {stat.change && (
                <span className={cn(
                  "text-xs tabular-nums",
                  stat.isProfit ? "text-profit" : "text-loss"
                )}>
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
