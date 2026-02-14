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
    <Card className="p-4 bg-[#030506] border-white/10 rounded-xl shadow-2xl overflow-hidden">
      {/* Header - Micro Size */}
      <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-2">
        <Calculator className="w-3.5 h-3.5 text-emerald-500" />
        <h3 className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Projection</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs */}
        <div className="space-y-4">
          <div className="space-y-1">
            <Label className="text-[9px] uppercase font-bold text-slate-500">Initial Capital</Label>
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="h-8 bg-white/5 border-white/10 text-[11px] font-bold text-white"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] uppercase font-bold text-slate-500">Monthly Add</Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="h-8 bg-white/5 border-white/10 text-[11px] font-bold text-white"
            />
          </div>

          <div className="space-y-4 pt-2">
            <div className="flex justify-between text-[9px] font-black text-emerald-500/80 uppercase">
              <span>Return: {annualReturn}%</span>
              <span>Fees: {tradingFeePct}%</span>
            </div>
            <Slider value={[annualReturn]} onValueChange={([v]) => setAnnualReturn(v)} max={30} step={0.5} className="py-1" />
            <Slider value={[tradingFeePct]} onValueChange={([v]) => setTradingFeePct(v)} max={1} step={0.01} className="py-1" />
          </div>
        </div>

        {/* Results - THE FIX IS HERE */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Box 1: Value */}
            <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
              <p className="text-[8px] uppercase font-bold text-slate-500 mb-1">Final Value</p>
              {/* Force small font and tabular spacing */}
              <p className="text-[13px] font-black text-emerald-400 tabular-nums tracking-tighter truncate">
                {formatCurrency(result.finalValue)}
              </p>
            </div>

            {/* Box 2: Profit */}
            <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/20 rounded-lg">
              <p className="text-[8px] uppercase font-bold text-slate-500 mb-1">Total Profit</p>
              <p className="text-[13px] font-black text-emerald-500 tabular-nums tracking-tighter truncate">
                +{formatCurrency(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Broker Fees */}
          <div className="px-2.5 py-1.5 bg-red-500/5 border border-red-500/10 rounded-lg flex justify-between items-center">
            <span className="text-[8px] uppercase font-bold text-slate-500">Broker Fees:</span>
            <span className="text-[10px] font-black text-red-400">-{formatCurrency(result.totalFees)}</span>
          </div>

          {/* Mini Chart */}
          <div className="h-14 flex items-end gap-[1px] mt-2 px-1">
            {result.yearlyBreakdown.map((data, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500/20 rounded-t-[1px]"
                style={{ height: `${(data.value / result.finalValue) * 100}%` }}
              />
            ))}
          </div>

          <Button 
            className="w-full h-8 mt-1 bg-emerald-500 hover:bg-emerald-400 text-black text-[9px] font-black uppercase tracking-[0.15em]" 
            asChild
          >
            <a href="/trade">START SIMULATOR</a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
