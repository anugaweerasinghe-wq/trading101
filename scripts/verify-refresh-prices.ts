import assert from "node:assert/strict";
import { refreshHeldQuotes } from "../supabase/functions/_shared/refreshPrices.ts";
const stored: string[] = [];
let calls = 0;
const deps = {
  fetch: (async () => { calls++; return new Response(JSON.stringify({ bitcoin: { usd: 100000, last_updated_at: 1700000000 }, ethereum: { usd: 3000, last_updated_at: 1700000000 } })); }) as typeof fetch,
  stock: async () => null, forex: async () => null,
  store: async (asset: string) => { stored.push(asset); return true; },
};
assert.deepEqual(await refreshHeldQuotes([{ assetId: "btc", type: "crypto" }, { assetId: "eth", type: "crypto" }, { assetId: "btc", type: "crypto" }, { assetId: "aapl", type: "stock" }], deps), { requested: 3, updated: 2, unavailable: 1 });
assert.equal(calls, 1); assert.deepEqual(stored, ["btc", "eth"]);
stored.length = 0;
const failure = { ...deps, fetch: (async () => new Response("Rate limited", { status: 429 })) as typeof fetch };
assert.deepEqual(await refreshHeldQuotes([{ assetId: "btc", type: "crypto" }], failure), { requested: 1, updated: 0, unavailable: 1 });
assert.equal(stored.length, 0);
assert.deepEqual(await refreshHeldQuotes([], deps), { requested: 0, updated: 0, unavailable: 0 });
console.log("Refresh pricing passed: crypto batching/deduplication, missing providers, rate limits, no synthetic replacement and empty portfolios.");
