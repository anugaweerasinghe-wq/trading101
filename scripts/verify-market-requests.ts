import assert from 'node:assert/strict';
import { createMarketRequests, MarketRequestError } from '../src/lib/marketRequests.ts';
let time = Date.parse('2026-10-09T15:00:00Z'), rest = 0, edge = 0;
let limited = false;
const row = () => ({ asset_id: 'btc', price: 82000, source: 'CoinGecko', updated_at: new Date(time).toISOString(), observed_at: new Date(time-60000).toISOString(), quote_status: 'provider', quote_data: null });
const fetcher = (async (url: string | URL | Request) => {
 if (String(url).includes('/rest/v1/')) { rest++; return new Response(JSON.stringify([row()])); }
 edge++;
 if (limited) return new Response('', { status:429, headers:{'Retry-After':'60'} });
 return new Response(JSON.stringify({ success:true,assetId:'aapl',data:{price:200,source:'live',lastUpdated:new Date(time).toISOString(),provenance:{status:'previous_close',provider:'test',fetchedAt:new Date(time).toISOString(),observedAt:new Date(time).toISOString()}} }));
}) as typeof fetch;
const client = createMarketRequests('https://example.test', 'public-test-key', fetcher,()=>time);
await Promise.all(Array.from({length:170},()=>client.snapshots())); assert.equal(rest,1); assert.equal(edge,0);
const btc = {id:'btc',type:'crypto' as const,price:100};
const values = await Promise.all(Array.from({length:20},()=>client.request(btc)));
assert.equal(values.length,20); assert.equal(rest,1); assert.equal(edge,0);
assert.ok(!Array.isArray(values[0].data)); assert.equal((values[0].data as {price:number}).price,82000);
assert.equal(values[0].provenance?.observedAt,new Date(time-60000).toISOString());
assert.equal(values[0].provenance?.status,'provider'); // Never called realtime.
const apple={id:'aapl',type:'stock' as const,price:190};
await Promise.all(Array.from({length:20},()=>client.request(apple))); assert.equal(edge,1);
time+=121000; limited=true;
await assert.rejects(client.request(apple),e=>e instanceof MarketRequestError && !e.message.includes('429')); assert.equal(edge,2);
await assert.rejects(client.request(apple)); assert.equal(edge,2); // Same asset honours cooldown.
await assert.rejects(client.request({...apple,id:'msft'})); assert.equal(edge,2); // Shared upstream backoff.
assert.equal((await client.request(btc)).provenance?.status,'provider'); assert.equal(edge,2); // Public cache remains usable.
time+=61000; limited=false; assert.equal((await client.request(apple)).success,true); assert.equal(edge,3);
const broken=createMarketRequests('https://example.test','public-test-key',(async()=>new Response(JSON.stringify({success:true,data:{price:NaN}}))) as typeof fetch,()=>time);
await assert.rejects(broken.request(apple)); // Malformed data cannot enter a price cache.
console.log('PASS market requests: 170 snapshot consumers share one REST read, concurrent quotes share one fetch, original observation time, selected provider requests, cooldown across assets, cached crypto during 429, recovery and invalid-price rejection.');
