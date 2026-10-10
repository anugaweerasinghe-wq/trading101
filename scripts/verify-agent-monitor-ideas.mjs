import assert from "node:assert/strict";
import { getFeatureInventory, hasObviousDuplicate } from "./agent-feature-inventory.mjs";
import { assessBrowserHtml } from "./agent-browser-smoke.mjs";
const inventory=getFeatureInventory();
assert.ok(inventory.features.length>=14,"Need a meaningful source-backed feature inventory.");
assert.ok(inventory.routes.length>=25,"Require actual declared site routes.");
for(const f of inventory.features){
 assert.ok(f.file.startsWith("src/pages/"));
 assert.ok(f.evidence.length>0,"Need verifiable source snippets for "+f.name);
}
assert.ok(hasObviousDuplicate({title:"Peer Challenge Duel Creator",userExperience:"Generate shareable peer challenges"},[]));
assert.ok(hasObviousDuplicate({title:"Daily Quiz and Streak Tracker",userExperience:"quiz streaks"},[]));
assert.ok(hasObviousDuplicate({title:"Interactive Candlestick Pattern Sandbox",userExperience:"A candlestick sandbox"},["Interactive Candlestick Pattern Sandbox"]));
assert.equal(hasObviousDuplicate({title:"Accessible keyboard-navigation guide",userExperience:"Explain keyboard access in a tutorial"},[]),false);
const valid = html=>'<html><head><title>Test</title></head><body><div id="root"><main><h1>TradeHQ site</h1><p>'+html+'</p></main></div></body></html>';
assert.equal(assessBrowserHtml("/",valid("A sufficiently detailed site renders here and includes educational explanations and plenty of useful information.")),null);
assert.match(assessBrowserHtml("/","<html><body><div id=\"root\"></div></body></html>"),/very little/);
assert.match(assessBrowserHtml("/admin",valid("Completely unrelated heading with educational explanations long enough to pass the basic content check.")),/Admin landing/);
assert.match(assessBrowserHtml("/",valid("Something went wrong and API returned 429, an important public error")),/error is visibly/);
console.log("Verified "+inventory.features.length+" source-backed features, "+inventory.routes.length+" routes, deterministic idea dedupe and public-browser failure detection.");
