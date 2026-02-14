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
    <Card className="p-4 md:p-6 bg-black/40 border-white/10 backdrop-blur-md rounded-2xl">
      {/* Header - Scaled Down */}
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-4 h-4 text-emerald-500" />
        <h3 className="text-sm font-bold text-white uppercase tracking-tight">Strategy Calculator</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side: Inputs */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase font-bold text-slate-500">Initial Investment</Label>
            <div className="relative">
              <DollarSign className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <Input
                type="number"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(Number(e.target.value))}
                className="pl-8 h-9 bg-white/5 border-white/10 text-sm"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label className="text-[10px] uppercase font-bold text-slate-500">Monthly Contribution</Label>
            <div className="relative">
              <TrendingUp className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
              <Input
                type="number"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                className="pl-8 h-9 bg-white/5 border-white/10 text-sm"
              />
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
              <span>Return: {annualReturn}%</span>
              <span>Fee: {tradingFeePct}%</span>
            </div>
            <Slider
              value={[annualReturn]}
              onValueChange={([v]) => setAnnualReturn(v)}
              max={30}
              className="py-1"
            />
            <Slider
              value={[tradingFeePct]}
              onValueChange={([v]) => setTradingFeePct(v)}
              max={1}
              step={0.01}
              className="py-1"
            />
          </div>
        </div>

        {/* Right Side: Results - RESIZED FOR OVERFLOW FIX */}
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2">
            {/* Final Portfolio Value */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl overflow-hidden">
              <p className="text-[9px] leading-tight text-slate-400 uppercase font-bold mb-1">Final Value</p>
              <p className="text-base md:text-lg font-black text-emerald-400 truncate">
                {formatCurrency(result.finalValue)}
              </p>
            </div>

            {/* Total Profit */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl overflow-hidden">
              <p className="text-[9px] leading-tight text-slate-400 uppercase font-bold mb-1">Total Profit</p>
              <p className="text-base md:text-lg font-black text-emerald-500 truncate">
                +{formatCurrency(result.netProfit)}
              </p>
            </div>
          </div>

          {/* Fees Section */}
          <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl">
            <p className="text-[9px] uppercase font-bold text-slate-500 mb-1">Trading Fees</p>
            <p className="text-sm font-bold text-red-400">-{formatCurrency(result.totalFees)}</p>
          </div>

          {/* Mini Graph */}
          <div className="h-16 flex items-end gap-0.5 mt-2">
            {result.yearlyBreakdown.map((data, i) => (
              <div
                key={i}
                className="flex-1 bg-emerald-500/30 rounded-t-[1px]"
                style={{ height: `${(data.value / result.finalValue) * 100}%` }}
              />
            ))}
          </div>

          {/* Practice Button - FIXED WIDTH */}
          <Button className="w-full mt-2 h-9 text-[10px] font-black uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-black" asChild>
            <a href="/trade">Practice Risk-Free</a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
