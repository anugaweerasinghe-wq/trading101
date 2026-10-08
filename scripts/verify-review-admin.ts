import assert from 'node:assert/strict';
import { createReviewAdminHandler } from '../supabase/functions/_shared/reviewAdmin.ts';
const id = '00000000-0000-4000-8000-000000000501';
const calls: { id: string; patch: Record<string,unknown>; state: string }[] = [];
let listed = 0;
const handle = createReviewAdminHandler({getKey:()=> 'isolated-test-key',getStore:()=>({
 list:async()=> { listed++; return [{id}]; },
 update:async(id,patch,state)=> { calls.push({id,patch,state}); return true; }
})});
const request = (body:unknown,key?:string) => handle(new Request('https://example.invalid', {method:'POST',headers: key ? {'x-admin-key':key} : {},body:JSON.stringify(body)}));
for(const action of ['list','reply','delete','restore','update']) for(const key of [undefined,'wrong-key']) assert.equal((await request({action,id,reply:'Forged',patch:{owner_reply:'Forged'}},key)).status,401);
assert.equal(calls.length,0); assert.equal(listed,0);
assert.equal((await request({action:'list'},'isolated-test-key')).status,200);
assert.equal((await request({action:'reply',id,reply:' Hello owner reply '},'isolated-test-key')).status,200);
assert.equal(calls.at(-1)?.patch.owner_reply,'Hello owner reply');
assert.ok(calls.at(-1)?.patch.owner_reply_updated_at);
await request({action:'reply',id,reply:''},'isolated-test-key');
assert.equal(calls.at(-1)?.patch.owner_reply,null);
for(const payload of [{action:'reply',id,reply:'x'.repeat(2001)},{action:'delete',id:'invalid'},{action:'update',id,patch:{rating:2.5}},{action:'update',id,patch:{content:'x'}}]) assert.equal((await request(payload,'isolated-test-key')).status,400);
await request({action:'delete',id},'isolated-test-key'); assert.ok(calls.at(-1)?.patch.deleted_at);
await request({action:'restore',id},'isolated-test-key'); assert.equal(calls.at(-1)?.state,'deleted'); assert.equal(calls.at(-1)?.patch.deleted_at,null);
await request({action:'update',id,patch:{owner_reply:'Forged',deleted_at:null,is_visible:false}},'isolated-test-key');
assert.equal(calls.at(-1)?.patch.owner_reply,undefined); assert.equal(calls.at(-1)?.patch.deleted_at,undefined); assert.equal(calls.at(-1)?.patch.is_visible,false);
assert.equal((await handle(new Request('https://example.invalid',{method:'GET'}))).status,405);
const failClosed = createReviewAdminHandler({getKey:()=>undefined,getStore:()=>{throw new Error('Must not be reached');}});
assert.equal((await failClosed(new Request('https://example.invalid',{method:'POST',headers:{'x-admin-key':'anything'},body:'{}'}))).status,401);
console.log('PASS admin authentication, validation, reply removal, delete/restore and field whitelist');
