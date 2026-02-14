import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calculator, TrendingUp, DollarSign, Percent, Clock } from "lucide-center";
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
    <Card className="p-5 md:p-6 bg-[#05080a] border-white/5 rounded-2xl shadow-2xl">
      {/* Header - Scaled Down */}
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-4 h-4 text-emerald-500" />
        <h3 className="text-xs font-black text-white uppercase tracking-[0.15em]">Growth Projection</h3>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left: Tightened Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 text-emerald-500" /> Initial Capital
            </Label>
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="h-9 bg-white/[0.03] border-white/10 text-white text-sm font-bold rounded-lg focus:ring-emerald-500/20"
            />
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-500" /> Monthly Add
            </Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="h-9 bg-white/[0.03] border-white/10 text-white text-sm font-bold rounded-lg focus:ring-emerald-500/20"
            />
          </div>

          {/* Sliders - Minimalist Scale */}
          {[
            { label: "Annual Return", val: `${annualReturn}%`, state: annualReturn, set: setAnnualReturn, max: 30 },
            { label: "Broker Fee", val: `${tradingFeePct}%`, state: tradingFeePct, set: setTradingFeePct, max: 1, step: 0.01 },
            { label: "Duration", val: `${years}Y`, state: years, set: setYears, max: 30 }
          ].map((s, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{s.label}</Label>
                <span className="text-[10px] font-black text-emerald-400">{s.val}</span>
              </div>
              <Slider
                value={[s.state]}
                onValueChange={([v]) => s.set(v)}
                min={0}
                max={s.max}
                step={s.step || 1}
                className="py-1"
              />
            </div>
          ))}
        </div>

        {/* Right: Results - RESIZED TO BE APPROPRIATE */}
        <div className="flex flex-col h-full space-y-4">
          <div className="grid grid-cols-1 gap-3">
            {/* Final Value Card */}
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mb-1">Portfolio Value</p>
              <p className="text-xl font-black text-emerald-400 tracking-tight">
                {formatCurrency(result.finalValue)}
              </p>
            </div>

            {/* Profit Card */}
            <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl">
              <p className="text-[9px] uppercase tracking-widest font-bold text-slate-500 mb-1">Net Profit</p>
              <p className={cn("text-xl font-black tracking-tight", result.netProfit >= 0 ? "text-white" : "text-red-400")}>
                {result.netProfit >= 0 ? "+" : ""}{formatCurrency(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Fees: Small & Out of the way */}
          <div className="px-1 flex justify-between items-center">
            <span className="text-[9px] uppercase font-bold text-slate-600 tracking-tight">Est. Fees Paid:</span>
            <span className="text-[10px] font-bold text-red-500/70">-{formatCurrency(result.totalFees)}</span>
          </div>

          {/* Mini Chart - Extremely Minimal */}
          <div className="h-16 flex items-end gap-1 px-1">
            {result.yearlyBreakdown.map((data, i) => (
              <div
                key={data.year}
                className="flex-1 bg-emerald-500/20 rounded-t-[1px] border-t border-emerald-500/30"
                style={{ height: `${(data.value / result.finalValue) * 100}%` }}
              />
            ))}
          </div>

          <Button className="w-full h-10 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest rounded-lg" asChild>
            <a href="/trade">Practice Risk-Free</a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
