import assert from 'node:assert/strict';
import { checkedLimit, marketLimit, RateLimitUnavailable } from '../supabase/functions/_shared/rateLimitPolicy.ts';
assert.equal(checkedLimit(true,null),true); assert.equal(checkedLimit(false,null),false);
for(const [data,error] of [[true,new Error('DB unavailable')],[null,null],[undefined,null],['true',null]]) assert.throws(()=>checkedLimit(data,error),RateLimitUnavailable);
const calls: unknown[][]=[];
assert.equal(await marketLimit('ip:forged',async(...args)=>{calls.push(args);return args[1]!=='lmd-global-minute';}),false);
assert.equal(calls.length,2); assert.equal(calls[1][0],'public-market-proxy');
for(const subject of ['ip:a','ip:b']){
 const seen:string[]=[];assert.equal(await marketLimit(subject,async(s)=>{seen.push(s);return true;}),true);
 assert.deepEqual(seen.slice(0,3),Array(3).fill('public-market-proxy'));
}
await assert.rejects(()=>marketLimit('ip:a',async()=>{throw new RateLimitUnavailable();}),RateLimitUnavailable);
console.log('PASS rate limits: strict boolean, outage denial, global header-independent budgets, early stop');
