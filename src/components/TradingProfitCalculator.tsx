import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Percent } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function TradingProfitCalculator() {
  const [investment, setInvestment] = useState(1000);
  const [targetPrice, setTargetPrice] = useState(150);
  const [entryPrice, setEntryPrice] = useState(100);
  const [leverage, setLeverage] = useState([1]);

  const calculations = useMemo(() => {
    const priceChange = ((targetPrice - entryPrice) / entryPrice) * 100;
    const shares = investment / entryPrice;
    const rawProfit = shares * (targetPrice - entryPrice);
    const leveragedProfit = rawProfit * leverage[0];
    const leveragedReturn = priceChange * leverage[0];
    const finalValue = investment + leveragedProfit;
    
    return {
      priceChange: priceChange.toFixed(2),
      shares: shares.toFixed(4),
      rawProfit: rawProfit.toFixed(2),
      leveragedProfit: leveragedProfit.toFixed(2),
      leveragedReturn: leveragedReturn.toFixed(2),
      finalValue: finalValue.toFixed(2),
      isProfit: targetPrice > entryPrice,
    };
  }, [investment, targetPrice, entryPrice, leverage]);

  return (
    <Card className="p-6 bento-card">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Calculator className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-bold text-lg">Profit Calculator</h3>
          <p className="text-xs text-muted-foreground">Estimate your potential returns</p>
        </div>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label className="text-sm flex items-center gap-2">
            <DollarSign className="w-3 h-3" />
            Investment Amount
          </Label>
          <Input
            type="number"
            value={investment}
            onChange={(e) => setInvestment(Number(e.target.value))}
            className="bg-muted/50"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs">Entry Price</Label>
            <Input
              type="number"
              value={entryPrice}
              onChange={(e) => setEntryPrice(Number(e.target.value))}
              className="bg-muted/50 text-sm"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs">Target Price</Label>
            <Input
              type="number"
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              className="bg-muted/50 text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Percent className="w-3 h-3" />
              Leverage
            </span>
            <Badge variant="outline" className="text-xs">{leverage[0]}x</Badge>
          </Label>
          <Slider
            value={leverage}
            onValueChange={setLeverage}
            min={1}
            max={10}
            step={1}
            className="py-2"
          />
        </div>

        <div className="pt-4 border-t border-border/50 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Price Change</span>
            <span className={calculations.isProfit ? 'text-green-500' : 'text-red-500'}>
              {calculations.isProfit ? '+' : ''}{calculations.priceChange}%
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shares/Units</span>
            <span>{calculations.shares}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Leveraged Return</span>
            <span className={calculations.isProfit ? 'text-green-500' : 'text-red-500'}>
              {calculations.isProfit ? '+' : ''}{calculations.leveragedReturn}%
            </span>
          </div>
          
          <div className="pt-3 border-t border-border/50">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Potential Profit</span>
              <div className="flex items-center gap-2">
                <TrendingUp className={`w-4 h-4 ${calculations.isProfit ? 'text-green-500' : 'text-red-500'}`} />
                <span className={`text-xl font-bold ${calculations.isProfit ? 'text-green-500' : 'text-red-500'}`}>
                  ${calculations.isProfit ? '+' : ''}{calculations.leveragedProfit}
                </span>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-sm text-muted-foreground">Final Value</span>
              <span className="text-primary font-semibold">${calculations.finalValue}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
