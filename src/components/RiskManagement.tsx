import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertTriangle, TrendingUp, Activity } from "lucide-react";
import { Portfolio } from "@/lib/types";
import { Progress } from "@/components/ui/progress";

interface RiskManagementProps {
  portfolio: Portfolio;
}

export function RiskManagement({ portfolio }: RiskManagementProps) {
  // Calculate risk metrics
  const totalValue = portfolio.totalValue;
  const cashPercent = (portfolio.cash / totalValue) * 100;
  const positionsValue = totalValue - portfolio.cash;
  
  // Concentration risk (largest position as % of portfolio)
  const largestPositionPercent = portfolio.positions.length > 0
    ? Math.max(...portfolio.positions.map(p => (p.currentValue / totalValue) * 100))
    : 0;
  
  // Number of positions
  const positionCount = portfolio.positions.length;
  
  // Volatility exposure (based on asset types)
  const cryptoExposure = portfolio.positions
    .filter(p => p.asset.type === 'crypto')
    .reduce((sum, p) => sum + p.currentValue, 0);
  const cryptoPercent = (cryptoExposure / positionsValue) * 100;
  
  // Risk level calculation
  const getRiskLevel = (): { level: string; color: string; score: number } => {
    let riskScore = 0;
    
    // Cash reserve risk
    if (cashPercent < 10) riskScore += 30;
    else if (cashPercent < 20) riskScore += 15;
    
    // Concentration risk
    if (largestPositionPercent > 40) riskScore += 30;
    else if (largestPositionPercent > 25) riskScore += 15;
    
    // Diversification risk
    if (positionCount < 3) riskScore += 20;
    else if (positionCount < 5) riskScore += 10;
    
    // Crypto exposure risk
    if (cryptoPercent > 50) riskScore += 20;
    else if (cryptoPercent > 30) riskScore += 10;
    
    if (riskScore < 30) return { level: 'Low Risk', color: 'text-success', score: riskScore };
    if (riskScore < 60) return { level: 'Medium Risk', color: 'text-warning', score: riskScore };
    return { level: 'High Risk', color: 'text-destructive', score: riskScore };
  };
  
  const risk = getRiskLevel();
  
  return (
    <Card className="p-6 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          Risk Management
        </h3>
        <Badge variant={risk.score < 30 ? 'default' : risk.score < 60 ? 'outline' : 'destructive'}>
          {risk.level}
        </Badge>
      </div>
      
      <div className="space-y-6">
        {/* Risk Score */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Overall Risk Score</span>
            <span className={`font-bold ${risk.color}`}>{risk.score}/100</span>
          </div>
          <Progress value={risk.score} className="h-3" />
        </div>
        
        {/* Cash Reserve */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Cash Reserve
            </span>
            <span className="font-medium">{cashPercent.toFixed(1)}%</span>
          </div>
          <Progress value={cashPercent} className="h-2" />
          {cashPercent < 20 && (
            <p className="text-xs text-warning mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              Consider maintaining at least 20% cash reserve
            </p>
          )}
        </div>
        
        {/* Position Concentration */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Largest Position
            </span>
            <span className="font-medium">{largestPositionPercent.toFixed(1)}%</span>
          </div>
          <Progress value={largestPositionPercent} className="h-2" />
          {largestPositionPercent > 25 && (
            <p className="text-xs text-warning mt-1 flex items-center gap-1">
              <AlertTriangle className="w-3 h-3" />
              High concentration in single position
            </p>
          )}
        </div>
        
        {/* Diversification */}
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Positions</p>
            <p className="text-2xl font-bold">{positionCount}</p>
          </div>
          <div className="p-3 bg-background/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Crypto Exposure</p>
            <p className="text-2xl font-bold">{cryptoPercent.toFixed(0)}%</p>
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="pt-4 border-t border-border">
          <p className="text-sm font-medium mb-2">Recommendations:</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            {cashPercent < 20 && <li>• Increase cash reserve to at least 20%</li>}
            {positionCount < 5 && <li>• Add more positions for better diversification</li>}
            {largestPositionPercent > 25 && <li>• Reduce concentration in largest position</li>}
            {cryptoPercent > 30 && <li>• Consider reducing crypto exposure for stability</li>}
            {risk.score < 30 && <li>• Portfolio risk is well-managed</li>}
          </ul>
        </div>
      </div>
    </Card>
  );
}
