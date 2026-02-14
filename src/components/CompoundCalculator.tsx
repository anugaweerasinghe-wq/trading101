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
    <Card className="p-4 md:p-5 bg-[#05080a] border-white/10 rounded-xl shadow-2xl">
      {/* Header - Scaled Down Significantly */}
      <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-3">
        <Calculator className="w-4 h-4 text-emerald-500" />
        <h3 className="text-[11px] font-black text-white uppercase tracking-widest">Growth Analytics</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Left: Inputs */}
        <div className="space-y-3">
          <div className="space-y-1">
            <Label className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
              <DollarSign className="w-3 h-3 text-emerald-500" /> Initial
            </Label>
            <Input
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
              className="h-8 bg-white/5 border-white/10 text-xs font-bold"
            />
          </div>

          <div className="space-y-1">
            <Label className="text-[9px] uppercase font-bold text-slate-500 flex items-center gap-1.5">
              <TrendingUp className="w-3 h-3 text-emerald-500" /> Monthly
            </Label>
            <Input
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="h-8 bg-white/5 border-white/10 text-xs font-bold"
            />
          </div>

          {/* Sliders */}
          <div className="space-y-2 pt-1">
            <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase">
              <span>Return: {annualReturn}%</span>
              <span>Fee: {tradingFeePct}%</span>
            </div>
            <Slider value={[annualReturn]} onValueChange={([v]) => setAnnualReturn(v)} max={30} className="py-1" />
            <Slider value={[tradingFeePct]} onValueChange={([v]) => setTradingFeePct(v)} max={1} step={0.01} className="py-1" />
          </div>
        </div>

        {/* Right: Results - REDUCED FONT SIZES TO PREVENT OVERFLOW */}
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            {/* Final Value Card */}
            <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
              <p className="text-[8px] uppercase font-bold text-slate-500 mb-0.5">Final Value</p>
              {/* Reduced from 2xl/3xl to text-sm/base */}
              <p className="text-sm md:text-base font-black text-emerald-400 tracking-tighter truncate">
                {formatCurrency(result.finalValue)}
              </p>
            </div>

            {/* Total Profit Card */}
            <div className="p-2.5 bg-emerald-500/5 border border-emerald-500/10 rounded-lg">
              <p className="text-[8px] uppercase font-bold text-slate-500 mb-0.5">Total Profit</p>
              {/* Reduced from 2xl/3xl to text-sm/base */}
              <p className="text-sm md:text-base font-black text-emerald-500 tracking-tighter truncate">
                +{formatCurrency(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Fees Card */}
          <div className="p-2.5 bg-red-500/5 border border-red-500/10 rounded-lg">
            <p className="text-[8px] uppercase font-bold text-slate-500 mb-0.5">Trading Fees</p>
            <p className="text-xs font-bold text-red-400">-{formatCurrency(result.totalFees)}</p>
          </div>

          {/* Mini Graph */}
          <div className="h-12 flex items-end gap-0.5 mt-1">
            {result.yearlyBreakdown.map((data, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500/20 rounded-t-[1px]"
                style={{ height: `${(data.value / result.finalValue) * 100}%` }}
              />
            ))}
          </div>

          {/* Practice Button - Resized Text */}
          <Button 
            className="w-full h-8 text-[9px] font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-black mt-1" 
            asChild
          >
            <a href="/trade">Practice Risk-Free</a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
