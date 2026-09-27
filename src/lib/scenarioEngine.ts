import type { Portfolio, AssetType } from "./types";

export interface Shock {
  symbol: string;
  shockPercent: number; // total % over horizon, e.g. -30
  /** Parser metadata only. This is NOT statistical confidence and is not used by the simulation engine. */
  confidence?: number;
}

export interface ScenarioResult {
  current: number;
  expected: number;
  median: number;
  p5: number;
  p25: number;
  p75: number;
  p95: number;
  worstCase: number;
  bestCase: number;
  deltaPercent: number;
  /** Share of this model run's paths finishing below the starting simulator value. Not a real-market probability forecast. */
  probabilityOfLoss: number;
  modelAssumptions: string[];
  perAsset: Array<{
    symbol: string;
    name: string;
    quantity: number;
    currentPrice: number;
    expectedPrice: number;
    expectedValue: number;
    shockApplied: number;
  }>;
  bands: Array<{
    day: number;
    p5: number;
    p25: number;
    median: number;
    p75: number;
    p95: number;
  }>;
}

// Illustrative fixed DAILY volatility assumptions used only by the scenario sandbox.
const DAILY_VOL: Record<AssetType, number> = {
  crypto: 0.04,
  stock: 0.015,
  etf: 0.01,
  commodity: 0.012,
  forex: 0.006,
};

export const SCENARIO_MODEL_ASSUMPTIONS = [
  "User-entered shock is spread as a constant log drift across the selected horizon.",
  "Daily volatility uses fixed TradeHQ sandbox values by broad asset type, not current implied or realized volatility.",
  "Asset shocks are simulated independently; cross-asset correlations are not modeled.",
  "Random path shocks use a normal distribution and do not model jumps, fat tails, liquidity gaps or regime changes.",
  "Cash is held constant and the model excludes taxes, dividends, financing costs, spread and slippage.",
  "Percentiles and loss frequency describe this model run only; they are not confidence intervals or market forecasts.",
] as const;

// Box-Muller standard normal
function randn(): number {
  let u = 0, v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

function quantile(sorted: number[], q: number): number {
  if (sorted.length === 0) return 0;
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor(q * (sorted.length - 1))));
  return sorted[idx];
}

export function runScenario(
  portfolio: Portfolio,
  shocks: Shock[],
  horizonDays: number,
  paths = 1000,
): ScenarioResult {
  const days = Math.max(1, Math.min(365, Math.round(horizonDays || 30)));
  const pathCount = Math.max(100, Math.min(5000, Math.round(paths || 1000)));
  const shockMap = new Map<string, number>();
  shocks.forEach((s) => {
    if (s?.symbol) shockMap.set(s.symbol.toUpperCase(), s.shockPercent / 100);
  });

  const currentValue = portfolio.totalValue;
  const cash = portfolio.cash;

  // User shock is treated as a terminal scenario assumption and spread evenly as daily log drift.
  const positions = portfolio.positions.map((p) => {
    const totalShock = shockMap.get(p.asset.symbol.toUpperCase()) ?? 0;
    // Convert total return over horizon to log-drift per day
    const totalLog = Math.log(1 + Math.max(-0.99, totalShock));
    const dailyDrift = totalLog / days;
    const dailySigma = DAILY_VOL[p.asset.type] ?? 0.02;
    return { p, dailyDrift, dailySigma, totalShock };
  });

  // Run an illustrative Monte Carlo-style sandbox. Fixed sigma and independent normal shocks
  // are simplifying assumptions, not calibrated forecasts.
  const bandCheckpoints = Math.min(days, 30);
  const checkpointEvery = Math.max(1, Math.floor(days / bandCheckpoints));
  const dailyValuesByDay: number[][] = [];
  for (let d = 0; d < days; d++) dailyValuesByDay.push([]);

  const finalValues: number[] = [];

  for (let path = 0; path < pathCount; path++) {
    const prices = positions.map((x) => x.p.asset.price);
    for (let d = 0; d < days; d++) {
      for (let i = 0; i < positions.length; i++) {
        const { dailyDrift, dailySigma } = positions[i];
        const z = randn();
        prices[i] = prices[i] * Math.exp(dailyDrift - 0.5 * dailySigma * dailySigma + dailySigma * z);
      }
      let val = cash;
      for (let i = 0; i < positions.length; i++) {
        val += prices[i] * positions[i].p.quantity;
      }
      dailyValuesByDay[d].push(val);
    }
    finalValues.push(dailyValuesByDay[days - 1][dailyValuesByDay[days - 1].length - 1]);
  }

  finalValues.sort((a, b) => a - b);
  const p5 = quantile(finalValues, 0.05);
  const p25 = quantile(finalValues, 0.25);
  const median = quantile(finalValues, 0.5);
  const p75 = quantile(finalValues, 0.75);
  const p95 = quantile(finalValues, 0.95);
  const expected = finalValues.reduce((a, b) => a + b, 0) / finalValues.length;
  const lossCount = finalValues.filter((v) => v < currentValue).length;
  const probabilityOfLoss = (lossCount / finalValues.length) * 100;

  const bands: ScenarioResult["bands"] = [];
  for (let d = 0; d < days; d += checkpointEvery) {
    const sorted = [...dailyValuesByDay[d]].sort((a, b) => a - b);
    bands.push({
      day: d + 1,
      p5: quantile(sorted, 0.05),
      p25: quantile(sorted, 0.25),
      median: quantile(sorted, 0.5),
      p75: quantile(sorted, 0.75),
      p95: quantile(sorted, 0.95),
    });
  }
  // Ensure final day included
  if (bands[bands.length - 1]?.day !== days) {
    const sorted = [...dailyValuesByDay[days - 1]].sort((a, b) => a - b);
    bands.push({
      day: days,
      p5: quantile(sorted, 0.05),
      p25: quantile(sorted, 0.25),
      median: quantile(sorted, 0.5),
      p75: quantile(sorted, 0.75),
      p95: quantile(sorted, 0.95),
    });
  }

  // Deterministic terminal value implied by the user's shock assumption; not an expected market price.
  const perAsset = positions.map(({ p, totalShock }) => {
    const expectedPrice = p.asset.price * (1 + totalShock);
    return {
      symbol: p.asset.symbol,
      name: p.asset.name,
      quantity: p.quantity,
      currentPrice: p.asset.price,
      expectedPrice,
      expectedValue: expectedPrice * p.quantity,
      shockApplied: totalShock * 100,
    };
  });

  return {
    current: currentValue,
    expected,
    median,
    p5,
    p25,
    p75,
    p95,
    worstCase: p5,
    bestCase: p95,
    deltaPercent: ((expected - currentValue) / currentValue) * 100,
    probabilityOfLoss,
    modelAssumptions: [...SCENARIO_MODEL_ASSUMPTIONS],
    perAsset,
    bands,
  };
}
