import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, TrendingDown, TrendingUp, AlertTriangle, Loader2, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
} from "recharts";
import { runScenario, SCENARIO_MODEL_ASSUMPTIONS, type ScenarioResult, type Shock } from "@/lib/scenarioEngine";
import { parseScenarioPrompt } from "@/lib/scenarioPrompt";
import type { Portfolio, Asset } from "@/lib/types";

const EXAMPLES = [
  "What if BTC drops 30%?",
  "ETH gains 50% in 30 days",
  "All stocks drop 20%",
  "Crypto rallies 40% over 60 days",
];

interface Props {
  portfolio: Portfolio;
  /** Current displayed asset list from the trading UI. Depending on the
   * instrument, values may be realtime, delayed, cached or simulated. */
  liveAssets?: Asset[];
}

export function ScenarioBuilder({ portfolio, liveAssets }: Props) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ScenarioResult | null>(null);
  const [narrative, setNarrative] = useState<string>("");
  const [shocks, setShocks] = useState<Shock[]>([]);
  const [horizonDays, setHorizonDays] = useState<number>(30);
  const { toast } = useToast();

  // Build a snapshot from the prices currently displayed by the trading UI.
  const livePortfolio = (() => {
    if (!liveAssets || liveAssets.length === 0) return portfolio;
    const liveById = new Map(liveAssets.map((a) => [a.id, a]));
    const positions = portfolio.positions.map((p) => {
      const live = liveById.get(p.asset.id);
      if (!live) return p;
      const currentValue = live.price * p.quantity;
      const totalCost = p.avgPrice * p.quantity;
      return {
        ...p,
        asset: { ...p.asset, price: live.price, change: live.change, changePercent: live.changePercent },
        currentValue,
        profitLoss: currentValue - totalCost,
        profitLossPercent: totalCost > 0 ? ((currentValue - totalCost) / totalCost) * 100 : 0,
      };
    });
    const positionsValue = positions.reduce((s, p) => s + p.currentValue, 0);
    return { ...portfolio, positions, totalValue: portfolio.cash + positionsValue };
  })();

  const hasPositions = livePortfolio.positions.length > 0;

  const runQuery = async (queryText?: string) => {
    const finalPrompt = (queryText ?? prompt).trim();
    if (!finalPrompt) return;
    if (!hasPositions) {
      toast({
        title: "No positions yet",
        description: "Add virtual positions first so the scenario has something to model.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setResult(null);
    try {
      const parsed = parseScenarioPrompt(finalPrompt, livePortfolio.positions.map(p => p.asset));
      setShocks(parsed.shocks ?? []);
      setHorizonDays(parsed.horizonDays ?? 30);
      setNarrative(parsed.narrative ?? "");

      const sim = runScenario(livePortfolio, parsed.shocks ?? [], parsed.horizonDays ?? 30, 1000);
      setResult(sim);
    } catch (e: any) {
      toast({ title: "Scenario error", description: e?.message ?? "Unknown error", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const fmt = (v: number) => `$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

  return (
    <Card className="p-6 bg-card/40 backdrop-blur-xl border-white/[0.08]">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-9 h-9 rounded-lg bg-primary/15 flex items-center justify-center">
          <Brain className="w-4 h-4 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Scenario Builder
            <Badge variant="outline" className="text-2xs border-primary/30 text-primary">Beta</Badge>
          </h2>
          <p className="text-2xs text-muted-foreground">Enter a hypothetical shock and inspect model-generated ranges. These are not forecasts or confidence intervals for real markets.</p>
        </div>
      </div>

      <div className="mt-4 rounded-lg border border-white/10 p-3 text-xs text-muted-foreground">
        <h3 className="font-semibold text-foreground mb-2">Model assumptions</h3>
        <ul className="list-disc pl-4 space-y-1">
          {SCENARIO_MODEL_ASSUMPTIONS.map((assumption) => <li key={assumption}>{assumption}</li>)}
        </ul>
        <p className="mt-2">Use one exact held ticker/name, an asset class (crypto, stocks, ETFs, forex or commodities), or “all holdings”, followed by a move such as “drops 30% in 30 days”. The default horizon is 30 days; supported horizons are 1–365 days and shocks are greater than -100% through +1000%. This is a limited text parser, not AI interpretation. Check the applied holdings and horizon below.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <Input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. What if BTC drops 30% in 30 days?"
          onKeyDown={(e) => e.key === "Enter" && runQuery()}
          disabled={loading}
        />
        <Button
          onClick={() => runQuery()}
          disabled={loading || !prompt.trim()}
          className="gap-1.5 active:scale-[0.97] transition-transform"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {loading ? "Simulating…" : "Run Scenario"}
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            onClick={() => {
              setPrompt(ex);
              runQuery(ex);
            }}
            disabled={loading}
            className="text-2xs px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.08] transition-colors disabled:opacity-50"
          >
            {ex}
          </button>
        ))}
      </div>

      {!hasPositions && (
        <div className="mt-4 p-4 rounded-lg bg-warning/5 border border-warning/20 text-2xs text-warning">
          Buy some assets in the Trade tab first — the scenario engine needs positions to simulate.
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card className="p-3 bg-white/[0.02] border-white/[0.06]">
              <p className="text-2xs text-muted-foreground">Model mean value</p>
              <p className="text-base font-bold tabular-nums mt-1">{fmt(result.expected)}</p>
              <p className={cn("text-2xs tabular-nums", result.deltaPercent >= 0 ? "text-success" : "text-destructive")}>
                {result.deltaPercent >= 0 ? "+" : ""}{result.deltaPercent.toFixed(2)}%
              </p>
            </Card>
            <Card className="p-3 bg-white/[0.02] border-white/[0.06]">
              <div className="flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-destructive" />
                <p className="text-2xs text-muted-foreground">Model 5th percentile</p>
              </div>
              <p className="text-base font-bold tabular-nums mt-1 text-destructive">{fmt(result.worstCase)}</p>
            </Card>
            <Card className="p-3 bg-white/[0.02] border-white/[0.06]">
              <div className="flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-success" />
                <p className="text-2xs text-muted-foreground">Model 95th percentile</p>
              </div>
              <p className="text-base font-bold tabular-nums mt-1 text-success">{fmt(result.bestCase)}</p>
            </Card>
            <Card className="p-3 bg-white/[0.02] border-white/[0.06]">
              <div className="flex items-center gap-1">
                <AlertTriangle className="w-3 h-3 text-warning" />
                <p className="text-2xs text-muted-foreground">Simulated loss frequency</p>
              </div>
              <p className="text-base font-bold tabular-nums mt-1">{result.probabilityOfLoss.toFixed(0)}%</p>
            </Card>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer>
              <ComposedChart data={result.bands} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="bandWide" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.04} />
                  </linearGradient>
                  <linearGradient id="bandInner" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.12} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="hsl(var(--border))" strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="day" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} label={{ value: `Day (horizon ${horizonDays}d)`, position: "insideBottom", offset: -5, fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }} tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`} domain={["auto", "auto"]} />
                <Tooltip
                  contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                  formatter={(v: number, name: string) => [`$${v.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, name]}
                />
                <Area type="monotone" dataKey="p95" stroke="none" fill="url(#bandWide)" />
                <Area type="monotone" dataKey="p5" stroke="none" fill="hsl(var(--card))" />
                <Area type="monotone" dataKey="p75" stroke="none" fill="url(#bandInner)" />
                <Area type="monotone" dataKey="p25" stroke="none" fill="hsl(var(--card))" />
                <Line type="monotone" dataKey="median" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {result.perAsset.length > 0 && (
            <div className="rounded-lg border border-white/[0.06] overflow-hidden">
              <div className="grid grid-cols-5 gap-2 px-3 py-2 bg-white/[0.03] text-2xs uppercase tracking-wide text-muted-foreground">
                <span>Asset</span>
                <span className="text-right">Qty</span>
                <span className="text-right">Now</span>
                <span className="text-right">Shock price</span>
                <span className="text-right">Shock</span>
              </div>
              {result.perAsset.map((a) => (
                <div key={a.symbol} className="grid grid-cols-5 gap-2 px-3 py-2 text-xs border-t border-white/[0.04]">
                  <span className="font-medium">{a.symbol}</span>
                  <span className="text-right tabular-nums text-muted-foreground">{a.quantity}</span>
                  <span className="text-right tabular-nums">${a.currentPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className="text-right tabular-nums">${a.expectedPrice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <span className={cn("text-right tabular-nums", a.shockApplied >= 0 ? "text-success" : "text-destructive")}>
                    {a.shockApplied >= 0 ? "+" : ""}{a.shockApplied.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          )}

          {narrative && (
            <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-muted-foreground italic leading-relaxed">{narrative}</p>
            </div>
          )}

          <p className="text-2xs text-muted-foreground/70 text-center">
            {1000} model paths under TradeHQ's scenario assumptions • User shock: {shocks.length ? shocks.map((s) => `${s.symbol} ${s.shockPercent >= 0 ? "+" : ""}${s.shockPercent}%`).join(", ") : "none"} • Horizon {horizonDays} days • Percentiles and loss frequency describe this model run only; they are not market forecasts.
          </p>
        </div>
      )}
    </Card>
  );
}
