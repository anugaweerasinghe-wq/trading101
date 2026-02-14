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
    <Card className="p-6 md:p-8 bg-black/40 border-white/5 backdrop-blur-xl rounded-3xl shadow-2xl">
      {/* Header - Resized for sophistication */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
          <Calculator className="w-5 h-5 text-emerald-500" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight uppercase">Strategy Projector</h3>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Factoring 2026 Trading Fees</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Inputs - Tightened labels and inputs */}
        <div className="space-y-5">
          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-widest font-black text-slate-500 flex items-center gap-2">
              <DollarSign className="w-3 h-3" /> Initial Capital
            </Label>
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="h-10 bg-white/[0.03] border-white/10 text-white font-bold rounded-lg focus:ring-emerald-500/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-[11px] uppercase tracking-widest font-black text-slate-500 flex items-center gap-2">
              <TrendingUp className="w-3 h-3" /> Monthly Add
            </Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="h-10 bg-white/[0.03] border-white/10 text-white font-bold rounded-lg focus:ring-emerald-500/50"
            />
          </div>

          {/* Sliders - Resized Labels */}
          {[
            { label: "Annual Return", icon: Percent, val: `${annualReturn}%`, state: annualReturn, set: setAnnualReturn, min: 1, max: 30, step: 0.5 },
            { label: "Broker Fee", icon: Calculator, val: `${tradingFeePct}%`, state: tradingFeePct, set: setTradingFeePct, min: 0, max: 1, step: 0.01 },
            { label: "Duration", icon: Clock, val: `${years}Y`, state: years, set: setYears, min: 1, max: 30, step: 1 }
          ].map((s, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-[11px] uppercase tracking-widest font-black text-slate-500 flex items-center gap-2">
                  <s.icon className="w-3 h-3" /> {s.label}
                </Label>
                <span className="text-xs font-black text-emerald-400">{s.val}</span>
              </div>
              <Slider
                value={[s.state]}
                onValueChange={([v]) => s.set(v)}
                min={s.min}
                max={s.max}
                step={s.step}
                className="py-1"
              />
            </div>
          ))}
        </div>

        {/* Results - FIXED TEXT SIZE IMBALANCE */}
        <div className="space-y-6 flex flex-col justify-between">
          <div className="grid grid-cols-1 gap-4">
            {/* Final Value - Cleaned up to text-xl/2xl */}
            <div className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
              <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Final Portfolio Value</p>
              <p className="text-xl md:text-2xl font-black text-emerald-400 tracking-tighter">
                {formatCurrency(result.finalValue)}
              </p>
            </div>

            {/* Profit - Cleaned up */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl">
              <p className="text-[10px] uppercase tracking-widest font-black text-slate-500 mb-2">Total Profit Generated</p>
              <p className={cn("text-xl md:text-2xl font-black tracking-tighter", result.netProfit >= 0 ? "text-white" : "text-red-400")}>
                {result.netProfit >= 0 ? "+" : ""}{formatCurrency(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Fees info - Smaller, minimalist */}
          <div className="px-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[10px] uppercase font-bold text-slate-500">Trading Fees Paid</span>
              <span className="text-xs font-bold text-red-500/80">-{formatCurrency(result.totalFees)}</span>
            </div>
            <p className="text-[9px] text-slate-600 font-medium uppercase tracking-tight">
              Simulator users save 100% on fees.
            </p>
          </div>

          {/* Mini Chart - Institutional style */}
          <div className="h-20 flex items-end gap-1 px-1">
            {result.yearlyBreakdown.map((data, i) => (
              <div
                key={data.year}
                className="flex-1 bg-emerald-500/20 rounded-t-sm transition-all hover:bg-emerald-500/40 border-t border-emerald-500/30"
                style={{ 
                  height: `${(data.value / result.finalValue) * 100}%`,
                  minHeight: '4px'
                }}
              />
            ))}
          </div>

          {/* Button - Resized for premium feel */}
          <Button className="w-full h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all" asChild>
            <a href="/trade">
              Start Practice Session
              <TrendingUp className="ml-2 w-3 h-3" />
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
