import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Percent, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface CalculatorResult {
  finalValue: number;
  totalProfit: number;
  totalFees: number;
  netProfit: number;
  yearlyBreakdown: { year: number; value: number; profit: number }[];
}

export function CompoundCalculator() {
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualReturn, setAnnualReturn] = useState(12);
  const [tradingFeePct, setTradingFeePct] = useState(0.1);
  const [years, setYears] = useState(10);

  const result = useMemo<CalculatorResult>(() => {
    const monthlyRate = annualReturn / 100 / 12;
    const feeRate = tradingFeePct / 100;
    const months = years * 12;
    
    let balance = initialInvestment;
    let totalContributions = initialInvestment;
    let totalFees = 0;
    const yearlyBreakdown: { year: number; value: number; profit: number }[] = [];

    for (let month = 1; month <= months; month++) {
      // Add monthly contribution
      balance += monthlyContribution;
      totalContributions += monthlyContribution;
      
      // Calculate growth
      const growth = balance * monthlyRate;
      balance += growth;
      
      // Apply trading fees on growth (simulating active trading)
      const fee = Math.abs(growth) * feeRate;
      balance -= fee;
      totalFees += fee;

      // Record yearly snapshot
      if (month % 12 === 0) {
        yearlyBreakdown.push({
          year: month / 12,
          value: balance,
          profit: balance - totalContributions
        });
      }
    }

    return {
      finalValue: balance,
      totalProfit: balance - totalContributions,
      totalFees,
      netProfit: balance - totalContributions,
      yearlyBreakdown
    };
  }, [initialInvestment, monthlyContribution, annualReturn, tradingFeePct, years]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-card via-card to-primary/5 border-primary/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
          <Calculator className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-2xl font-bold">Compound Interest & Fee Calculator</h3>
          <p className="text-sm text-muted-foreground">See your potential growth with trading fees factored in</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Inputs */}
        <div className="space-y-6">
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-primary" />
              Initial Investment
            </Label>
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-primary" />
              Monthly Contribution
            </Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="bg-background/50"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 justify-between">
              <span className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-primary" />
                Expected Annual Return
              </span>
              <span className="text-primary font-semibold">{annualReturn}%</span>
            </Label>
            <Slider
              value={[annualReturn]}
              onValueChange={([v]) => setAnnualReturn(v)}
              min={1}
              max={30}
              step={0.5}
              className="py-2"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 justify-between">
              <span className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-primary" />
                Trading Fee per Trade
              </span>
              <span className="text-primary font-semibold">{tradingFeePct}%</span>
            </Label>
            <Slider
              value={[tradingFeePct]}
              onValueChange={([v]) => setTradingFeePct(v)}
              min={0}
              max={1}
              step={0.01}
              className="py-2"
            />
          </div>

          <div className="space-y-3">
            <Label className="flex items-center gap-2 justify-between">
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Investment Period
              </span>
              <span className="text-primary font-semibold">{years} years</span>
            </Label>
            <Slider
              value={[years]}
              onValueChange={([v]) => setYears(v)}
              min={1}
              max={30}
              step={1}
              className="py-2"
            />
          </div>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-4 bg-primary/10 border-primary/30">
              <p className="text-xs text-muted-foreground mb-1">Final Portfolio Value</p>
              <p className="text-2xl font-bold text-primary">{formatCurrency(result.finalValue)}</p>
            </Card>
            <Card className="p-4 bg-profit/10 border-profit/30">
              <p className="text-xs text-muted-foreground mb-1">Total Profit</p>
              <p className={cn("text-2xl font-bold", result.netProfit >= 0 ? "text-profit" : "text-loss")}>
                {result.netProfit >= 0 ? "+" : ""}{formatCurrency(result.netProfit)}
              </p>
            </Card>
          </div>

          <Card className="p-4 bg-background/50">
            <p className="text-xs text-muted-foreground mb-1">Total Trading Fees Paid</p>
            <p className="text-lg font-semibold text-loss">-{formatCurrency(result.totalFees)}</p>
            <p className="text-xs text-muted-foreground mt-1">
              Lower fees = more compound growth. Our simulator has 0% fees!
            </p>
          </Card>

          {/* Mini Chart */}
          <div className="h-32 flex items-end gap-1">
            {result.yearlyBreakdown.map((data, i) => (
              <div
                key={data.year}
                className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t transition-all hover:from-primary/80"
                style={{ 
                  height: `${(data.value / result.finalValue) * 100}%`,
                  minHeight: '8px'
                }}
                title={`Year ${data.year}: ${formatCurrency(data.value)}`}
              />
            ))}
          </div>
          <p className="text-xs text-center text-muted-foreground">
            Portfolio growth over {years} years
          </p>

          <Button className="w-full" size="lg" asChild>
            <a href="/trade">
              Practice with $10K Risk-Free
              <TrendingUp className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
