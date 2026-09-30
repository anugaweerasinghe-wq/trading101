import assert from 'node:assert/strict';
import { parseScenarioPrompt } from '../src/lib/scenarioPrompt';
import { runScenario } from '../src/lib/scenarioEngine';
import type { Asset, Portfolio } from '../src/lib/types';

const asset = (id: string, symbol: string, name: string, type: Asset['type']): Asset => ({
  id, symbol, name, type, price: 100, change: 0, changePercent: 0,
});
const holdings = [asset('visa', 'V', 'Visa', 'stock'), asset('btc', 'BTC', 'Bitcoin', 'crypto'), asset('eth', 'ETH', 'Ethereum', 'crypto')];
assert.deepEqual(parseScenarioPrompt('Crypto rallies 40% over 60 days', holdings).shocks.map(s => s.assetId), ['btc', 'eth']);
assert.deepEqual(parseScenarioPrompt('All stocks drop 20%', holdings).shocks.map(s => s.assetId), ['visa']);
assert.equal(parseScenarioPrompt('What if BTC drops 30%?', holdings).shocks[0].shockPercent, -30);
assert.equal(parseScenarioPrompt('Visa moves -99.5% in 1 day', holdings).shocks[0].shockPercent, -99.5);
for (const prompt of ['Silver drops 20%', 'Tech stocks crash 20%', 'BTC drops', 'BTC drops 20% over 999 days', 'BTC drops 100%', 'BTC gains -30%', 'BTC drops +30%', 'BTC gains 5% and ETH drops 10%', 'BTC rises 10% in 0 days']) {
  assert.throws(() => parseScenarioPrompt(prompt, holdings), undefined, prompt);
}
const duplicate = [...holdings, asset('other-btc', 'BTC', 'Other Bitcoin', 'stock')];
assert.throws(() => parseScenarioPrompt('BTC drops 20%', duplicate));
const parsed = parseScenarioPrompt('Bitcoin drops 99.5% in 1 day', duplicate);
const portfolio = {cash: 100, totalValue: 500, positions: duplicate.map(a => ({asset: a, quantity: 1, avgPrice: 100, currentValue: 100, profitLoss: 0, profitLossPercent: 0})), trades: []} as Portfolio;
const result = runScenario(portfolio, parsed.shocks, parsed.horizonDays, 100);
assert.equal(result.perAsset[1].shockApplied, -99.5);
assert.equal(result.perAsset[3].shockApplied, 0);
assert.ok(result.perAsset[1].expectedPrice > 0 && result.perAsset[1].expectedPrice < 1);
assert.equal(result.bands.at(-1)?.day, parsed.horizonDays);
assert.throws(() => runScenario(portfolio, [{symbol: 'BTC', shockPercent: -101}], 30));
assert.throws(() => runScenario(portfolio, [], 999));
console.log('Scenario input and model regression checks passed');
