import type { Asset } from './types';
import type { Shock } from './scenarioEngine';

/** Deliberately limited grammar: never infer a target or a missing percentage. */
export function parseScenarioPrompt(prompt: string, holdings: Asset[]): {
  shocks: Shock[]; horizonDays: number; narrative: string;
} {
  const match = prompt.trim().match(/^(?:what if\s+)?(.+?)\s+(drops?|falls?|crashes?|gains?|rises?|rallies|moves?)\s+([+-]?\d+(?:\.\d+)?)\s*%(?:\s+(?:in|over)\s+(\d+)\s+(days?|weeks?|months?))?\s*\??$/i);
  if (!match) throw new Error('Use one target, one percentage and an optional horizon: BTC drops 30% in 30 days, or all holdings gain 10%.');
  const [, rawTarget, verb, rawPercent, rawDays, unit] = match;
  const target = rawTarget.trim().toLowerCase();
  const downward = /^(drop|fall|crash)/i.test(verb);
  const upward = /^(gain|rise|rall)/i.test(verb);
  const entered = Number(rawPercent);
  if ((downward && rawPercent.startsWith('+')) || (upward && entered < 0)) {
    throw new Error('The direction and signed percentage conflict. Use drops 30% or moves -30%.');
  }
  const shockPercent = downward ? -Math.abs(entered) : entered;
  if (!Number.isFinite(shockPercent) || shockPercent <= -100 || shockPercent > 1000) {
    throw new Error('This sandbox supports shocks greater than -100% and no more than +1000%.');
  }
  const horizonDays = rawDays ? Number(rawDays) * (/^week/i.test(unit) ? 7 : /^month/i.test(unit) ? 30 : 1) : 30;
  if (!Number.isInteger(horizonDays) || horizonDays < 1 || horizonDays > 365) {
    throw new Error('Choose a horizon of 1–365 days. Weeks count as 7 days and months as 30 days.');
  }
  const categories: Record<string, Asset['type']> = {
    crypto: 'crypto', 'all crypto': 'crypto', stocks: 'stock', 'all stocks': 'stock',
    etfs: 'etf', 'all etfs': 'etf', forex: 'forex', 'all forex': 'forex',
    commodities: 'commodity', 'all commodities': 'commodity',
  };
  const all = target === 'all holdings' || target === 'full portfolio';
  const category = categories[target];
  const selected = holdings.filter(a => all || (category ? a.type === category : a.symbol.toLowerCase() === target || a.name.toLowerCase() === target));
  if (!selected.length) throw new Error('No matching holding. Use an exact held ticker/name, crypto, stocks, ETFs, forex, commodities, or all holdings.');
  if (!all && !category && selected.length !== 1) throw new Error('That ticker matches multiple holdings. Use the exact asset name.');
  return {
    shocks: selected.map(a => ({ assetId: a.id, symbol: a.symbol, shockPercent })),
    horizonDays,
    narrative: `Applied ${shockPercent >= 0 ? '+' : ''}${shockPercent}% to ${selected.map(a => a.name).join(', ')} over ${horizonDays} days. Other holdings retain a zero user-entered shock but still receive the model’s random volatility. Cash stays constant.`,
  };
}
