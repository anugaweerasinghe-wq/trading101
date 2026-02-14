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
      balance += monthlyContribution;
      totalContributions += monthlyContribution;
      const growth = balance * monthlyRate;
      balance += growth;
      const fee = Math.abs(growth) * feeRate;
      balance -= fee;
      totalFees += fee;

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
    <Card className="p-4 bg-[#030608] border-white/10 rounded-xl overflow-hidden shadow-2xl">
      {/* Header - Minimalist */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-3">
        <Calculator className="w-3.5 h-3.5 text-emerald-500" />
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Strategy Projection</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left: Input Controls */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Initial Capital</Label>
            <div className="relative">
              <DollarSign className="absolute left-2 top-2 h-3 w-3 text-emerald-500/50" />
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="pl-7 h-8 bg-white/5 border-white/10 text-xs font-bold text-white focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Monthly Add</Label>
            <div className="relative">
              <TrendingUp className="absolute left-2 top-2 h-3 w-3 text-emerald-500/50" />
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="pl-7 h-8 bg-white/5 border-white/10 text-xs font-bold text-white focus:ring-emerald-500/20"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase">
              <span>ROI: <span className="text-emerald-500">{annualReturn}%</span></span>
              <span>Years: <span className="text-emerald-500">{years}</span></span>
            </div>
            <Slider value={[annualReturn]} onValueChange={([v]) => setAnnualReturn(v)} max={30} step={0.5} className="py-1" />
            <Slider value={[years]} onValueChange={([v]) => setYears(v)} min={1} max={30} className="py-1" />
          </div>
        </div>

        {/* Right: Results - THE OVERFLOW FIX */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Box 1: Final Value */}
            <div className="p-3 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-lg flex flex-col justify-center min-w-0">
              <p className="text-[8px] uppercase font-black text-slate-500 mb-1 leading-none tracking-tighter">Final Value</p>
              {/* text-sm is the secret. It looks like a terminal value but fits perfectly. */}
              <p className="text-sm md:text-base font-black text-emerald-400 tabular-nums tracking-tighter truncate">
                {formatCurrency(result.finalValue)}
              </p>
            </div>

            {/* Box 2: Total Profit */}
            <div className="p-3 bg-emerald-500/[0.03] border border-emerald-500/20 rounded-lg flex flex-col justify-center min-w-0">
              <p className="text-[8px] uppercase font-black text-slate-500 mb-1 leading-none tracking-tighter">Net Profit</p>
              <p className="text-sm md:text-base font-black text-emerald-500 tabular-nums tracking-tighter truncate">
                +{formatCurrency(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Fees Detail */}
          <div className="px-3 py-2 bg-red-500/[0.02] border border-red-500/10 rounded-lg flex justify-between items-center">
            <span className="text-[8px] uppercase font-bold text-slate-500">Broker Fees:</span>
            <span className="text-[10px] font-black text-red-400/80 tabular-nums">-{formatCurrency(result.totalFees)}</span>
          </div>

          {/* Micro Graph */}
          <div className="h-14 flex items-end gap-[2px] mt-1 overflow-hidden px-1">
            {result.yearlyBreakdown.map((data, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500/20 rounded-t-[1px] border-t border-emerald-500/40"
                style={{ height: `${Math.max((data.value / result.finalValue) * 100, 5)}%` }}
              />
            ))}
          </div>

          {/* Fixed Button */}
          <Button 
            className="w-full h-8 bg-emerald-500 hover:bg-emerald-400 text-black text-[9px] font-black uppercase tracking-[0.2em] rounded-md transition-all active:scale-95" 
            asChild
          >
            <a href="/trade">LAUNCH SIMULATOR</a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
