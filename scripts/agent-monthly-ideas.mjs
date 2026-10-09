/**
 * Optional monthly free-tier Gemini research. Makes suggestions, never code changes.
 * A missing key pauses safely with no paid fallback.
 */
const repo=process.env.GITHUB_REPOSITORY||"anugaweerasinghe-wq/trading101";
const token=process.env.GITHUB_TOKEN,key=process.env.GEMINI_API_KEY;
const model=process.env.GEMINI_AGENT_MODEL||"gemini-2.5-flash-lite";
const month=new Date().toISOString().slice(0,7),title="[TradeHQ Ideas] "+month+": two improvements";
async function github(method,path,body){
 const r=await fetch("https://api.github.com/repos/"+repo+path,{method,headers:{authorization:"Bearer "+token,accept:"application/vnd.github+json","x-github-api-version":"2022-11-28","content-type":"application/json"},body:body?JSON.stringify(body):undefined});
 if(!r.ok)throw Error("GitHub HTTP "+r.status);
 return r.json();
}
async function main(){
 if(!token)throw Error("GitHub Actions token is unavailable.");
 const existing=await github("GET","/issues?state=all&per_page=100");
 if(existing.some(i=>!i.pull_request&&i.title===title)){console.log("Already generated this month.");return;}
 if(!key){console.log("Paused: repository GEMINI_API_KEY secret not configured. No API call or charge.");return;}
 const features="free simulated paper trading, courses, daily scored questions, portfolio, journal, leaderboard, reviews, glossary, market guides and AI mentor";
 const prompt="Find precisely two fresh, feasible, free-to-run feature ideas for TradeHQ, an educational website with "+features+". Do not duplicate existing features or invent user analytics or claim market returns. Each must include title, rationale, userExperience, implementation, risks, tests. Answer JSON only with {ideas:[{title,rationale,userExperience,implementation,risks,tests}]} and no other fields.";
 const r=await fetch("https://generativelanguage.googleapis.com/v1beta/models/"+encodeURIComponent(model)+":generateContent",{method:"POST",headers:{"x-goog-api-key":key,"content-type":"application/json"},body:JSON.stringify({contents:[{role:"user",parts:[{text:prompt}]}],generationConfig:{responseMimeType:"application/json",temperature:0.35,maxOutputTokens:1500}})});
 if(!r.ok)throw Error("Gemini HTTP "+r.status+". Free-tier error; no paid fallback.");
 const result=await r.json();
 const raw=result.candidates?.[0]?.content?.parts?.map(p=>p.text||"").join("")||"";
 const parsed=JSON.parse(raw);
 if(!Array.isArray(parsed.ideas)||parsed.ideas.length!==2||parsed.ideas.some(i=>!i.title||!i.implementation||!i.tests))throw Error("Invalid output. No issue created.");
 const body=["AI-assisted ideas for "+month+". These are not approved or deployed.",...parsed.ideas.map((item,index)=>["## Idea "+(index+1)+": "+String(item.title).slice(0,130),"**Why:** "+String(item.rationale||"").slice(0,900),"**User experience:** "+String(item.userExperience||"").slice(0,900),"**Implementation:** "+String(item.implementation).slice(0,1200),"**Risks:** "+String(item.risks||"").slice(0,900),"**Tests:** "+String(item.tests).slice(0,900)].join("\n\n")),"\nEditorial and AdSense/YMYL review required. AI never deploys from this workflow."].join("\n\n---\n\n");
 await github("POST","/issues",{title,body});
 console.log("Two suggestions entered the review queue.");
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
