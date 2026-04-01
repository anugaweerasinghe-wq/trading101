import { Portfolio } from "@/lib/types";
import { Brain, TrendingUp, TrendingDown, AlertTriangle, ShieldCheck, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIInsightSummaryProps {
  portfolio: Portfolio;
}

interface Insight {
  icon: React.ReactNode;
  text: string;
  type: "positive" | "negative" | "neutral" | "warning";
}

function generateInsights(portfolio: Portfolio): Insight[] {
  const insights: Insight[] = [];
  const positions = portfolio.positions;

  if (positions.length === 0) {
    insights.push({
      icon: <BarChart3 className="w-4 h-4" />,
      text: "No open positions. Visit the Trade page to build your portfolio and start tracking performance.",
      type: "neutral",
    });
    return insights;
  }

  // Sort by P&L%
  const sorted = [...positions].sort((a, b) => b.profitLossPercent - a.profitLossPercent);
  const best = sorted[0];
  const worst = sorted[sorted.length - 1];

  // Top performer
  if (best.profitLoss > 0) {
    insights.push({
      icon: <TrendingUp className="w-4 h-4" />,
      text: `Strongest holding: ${best.asset.symbol} at +${best.profitLossPercent.toFixed(1)}%. Consider whether taking partial profits aligns with your strategy.`,
      type: "positive",
    });
  }

  // Worst performer
  if (worst.profitLoss < 0) {
    insights.push({
      icon: <TrendingDown className="w-4 h-4" />,
      text: `Weakest holding: ${worst.asset.symbol} at ${worst.profitLossPercent.toFixed(1)}%. Review your original thesis — has anything changed?`,
      type: "negative",
    });
  }

  // Concentration risk (single position > 30%)
  const totalValue = positions.reduce((s, p) => s + p.currentValue, 0);
  if (totalValue > 0) {
    const concentrated = positions.find((p) => p.currentValue / totalValue > 0.3);
    if (concentrated) {
      const pct = ((concentrated.currentValue / totalValue) * 100).toFixed(0);
      insights.push({
        icon: <AlertTriangle className="w-4 h-4" />,
        text: `Concentration alert: ${concentrated.asset.symbol} represents ${pct}% of your positions. Diversifying can reduce portfolio volatility.`,
        type: "warning",
      });
    }
  }

  // Asset type concentration (>60% in one type)
  if (totalValue > 0) {
    const typeMap = new Map<string, number>();
    positions.forEach((p) => {
      typeMap.set(p.asset.type, (typeMap.get(p.asset.type) || 0) + p.currentValue);
    });
    for (const [type, val] of typeMap) {
      if (val / totalValue > 0.6) {
        insights.push({
          icon: <AlertTriangle className="w-4 h-4" />,
          text: `Over 60% of your holdings are in ${type}s. Consider exposure to other asset classes for balance.`,
          type: "warning",
        });
        break;
      }
    }
  }

  // Diversification suggestion
  if (positions.length < 3) {
    insights.push({
      icon: <ShieldCheck className="w-4 h-4" />,
      text: `You hold ${positions.length} position${positions.length === 1 ? "" : "s"}. Adding more assets can help spread risk and smooth returns.`,
      type: "neutral",
    });
  }

  // All green
  if (positions.every((p) => p.profitLoss >= 0) && positions.length >= 2) {
    insights.push({
      icon: <TrendingUp className="w-4 h-4" />,
      text: "All positions are in profit. Monitor for potential pullbacks and consider setting mental stop-loss levels.",
      type: "positive",
    });
  }

  return insights.slice(0, 4); // cap at 4
}

const TYPE_STYLES: Record<Insight["type"], string> = {
  positive: "text-profit",
  negative: "text-loss",
  warning: "text-warning",
  neutral: "text-muted-foreground",
};

export function AIInsightSummary({ portfolio }: AIInsightSummaryProps) {
  const insights = generateInsights(portfolio);

  return (
    <div className="glass-tactile border-chrome rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <Brain className="w-4.5 h-4.5 text-primary" />
        <h3 className="text-sm font-semibold tracking-tight-cyber">Portfolio Insight</h3>
        <span className="text-2xs text-muted-foreground ml-auto">Educational Analysis</span>
      </div>
      <div className="space-y-3">
        {insights.map((insight, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className={cn("shrink-0 mt-0.5", TYPE_STYLES[insight.type])}>{insight.icon}</span>
            <p className="text-sm text-foreground/85 leading-relaxed">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
