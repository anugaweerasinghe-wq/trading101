/**
 * Monthly Gemini suggestions grounded in actual TradeHQ source features.
 * Brainstorms candidates -> rejects known duplicates -> second-pass critic ranks two.
 * Only publishes ideas for human review. Does not edit/deploy code.
 * "ideas_refresh" manually updates this month's existing issue after improvements.
 */
import { getFeatureInventory, hasObviousDuplicate } from "./agent-feature-inventory.mjs";
import { requestGeminiJson } from "./gemini-free-models.mjs";
const repo = process.env.GITHUB_REPOSITORY || "anugaweerasinghe-wq/trading101";
const token = process.env.GITHUB_TOKEN, key = process.env.GEMINI_API_KEY;
const model = process.env.GEMINI_AGENT_MODEL || "gemini-3.5-flash-lite";
const refresh = process.env.TRADEHQ_IDEAS_REFRESH === "1";
const month = new Date().toISOString().slice(0,7);
const title = "[TradeHQ Ideas] " + month + ": two improvements";
async function github(method, endpoint, body) {
  const response = await fetch("https://api.github.com/repos/"+repo+endpoint, {
    method,
    headers: {authorization:"Bearer "+token,accept:"application/vnd.github+json",
      "x-github-api-version":"2022-11-28","content-type":"application/json"},
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if(!response.ok) throw Error("GitHub HTTP " + response.status + " while saving report");
  return response.json();
}
function getPriorTitles(issues) {
  return issues.filter(x=>!x.pull_request && x.title?.startsWith("[TradeHQ Ideas]"))
    .flatMap(x=>[...String(x.body||"").matchAll(/^## Idea \d+: (.+)$/gm)].map(m=>m[1]))
    .slice(0,35);
}
function text(value, max=1000) { return String(value||"").trim().slice(0,max); }
async function main(){
  if(!token) throw Error("GitHub Actions token unavailable");
  const issues = await github("GET","/issues?state=all&per_page=100");
  const existing = issues.find(i=>!i.pull_request&&i.title===title);
  if(existing && !refresh){console.log("Already published this month's two ideas; no new API usage.");return;}
  if(!key){console.log("Paused: GEMINI_API_KEY is not configured. No paid fallback.");return;}
  const inventory = getFeatureInventory();
  const history = [...new Set([...getPriorTitles(issues),...inventory.rejectedOrPriorIdeas])];
  const context = JSON.stringify({currentWebsite:inventory.features,routes:inventory.routes,alreadySuggested:history});
  const draftPrompt = [
    "You are a critical product strategist for TradeHQ, a FREE and educational paper trading website.",
    "Study the CURRENT FEATURES backed by real source files. Existing features must NOT be pitched as new.",
    "Existing feature inventory and previous failed/suggested ideas (JSON):",context,
    "Propose EIGHT (8) truly fresh, practical product improvements NOT already provided.",
    "Prioritize improvements to real user understanding and retention; avoid gamification clones, speculative financial advice,",
    "fabricated visitor analytics, generic motivational features, fake prices, or feature ideas that simply rename existing duels/challenges/courses/mentors.",
    "Use only free existing frontend/backend infrastructure; NEVER assume free premium market data or introduce recurring paid APIs.",
    "Distinct ideas must solve different problems and be deliverable with 1-3 narrowly scoped code changes.",
    "Include constraints and testable acceptance criteria.",
    "Return JSON ONLY: {\"ideas\":[{\"id\":\"i1\", \"title\":\"...\", \"rationale\":\"...\", \"userExperience\":\"...\", \"implementation\":\"...\", \"risks\":\"...\", \"tests\":\"...\", \"noveltyEvidence\":\"specific difference from existing feature\", \"freeRuntime\":\"why no new paid service\"}]}",
  ].join("\n");
  const first = await requestGeminiJson({apiKey:key,prompt:draftPrompt,preferredModel:model,maxOutputTokens:7800,temperature:0.65});
  if(!Array.isArray(first.value.ideas) || first.value.ideas.length < 6 || first.value.ideas.length > 12) throw Error("Draft Gemini proposals incomplete; no issue created.");
  const seenIds=new Set(), eligible=[], rejected=[];
  for(const candidate of first.value.ideas){
    if(!candidate || typeof candidate.id!=="string" || !/^i\d{1,2}$/.test(candidate.id) || seenIds.has(candidate.id)) throw Error("Gemini ideas missing unique IDs.");
    seenIds.add(candidate.id);
    if(!candidate.title || !candidate.implementation || !candidate.tests || !candidate.noveltyEvidence || !candidate.freeRuntime){
      rejected.push(text(candidate.title,80)+" (insufficient evidence)"); continue;
    }
    if(hasObviousDuplicate(candidate,history)){rejected.push(text(candidate.title,80)+" (duplicate/existing feature)");continue;}
    eligible.push(candidate);
  }
  if(eligible.length<2) throw Error("Too few non-duplicate ideas. No weak suggestions will be published.");
  const criticPrompt = [
    "Act as a skeptical second-pass editor. Select EXACTLY TWO strongest ideas from the candidates below.",
    "You MUST evaluate uniqueness against the SOURCE-GROUNDED features and history, feasibility, value to students, educational accuracy, and zero additional monthly infrastructure cost.",
    "Never choose an idea that's already a variant of an existing duel, daily quiz, mentor, basic lessons, leaderboard, review engagement, or prior ideas.",
    "Do NOT blindly accept AI novelty claims. If fewer than two truly worthwhile ideas exist, return an empty selections array.",
    "Existing feature inventory: "+context,
    "Eligible candidates: "+JSON.stringify(eligible),
    "Return JSON ONLY {\"selections\":[{\"id\":\"i2\", \"whyNew\":\"detailed verifiable difference\", \"impact\":\"specific educational/user benefit with no invented analytics\", \"acceptance\":\"concrete observable acceptance criterion\", \"tradeoff\":\"meaningful downside\"}]}",
  ].join("\n");
  const second = await requestGeminiJson({apiKey:key,prompt:criticPrompt,preferredModel:model,maxOutputTokens:2200,temperature:0.15});
  const picks=second.value.selections;
  if(!Array.isArray(picks)||picks.length!==2||new Set(picks.map(p=>p.id)).size!==2) throw Error("Second-pass critic did not approve exactly two unique ideas. No issue updated.");
  const chosen = picks.map(p=>{
    const candidate=eligible.find(item=>item.id===p.id);
    if(!candidate||!p.whyNew||!p.acceptance||!p.tradeoff) throw Error("Critic chose unverifiable idea. No issue updated.");
    if(hasObviousDuplicate(candidate,history)) throw Error("Critic chose an existing feature. No issue updated.");
    return { ...candidate, audit:p };
  });
  const body=[
    "Two independent Gemini reasoning passes evaluated TradeHQ's current source files and previous ideas. Proposals are NOT automatically implemented.",
    "**Generated:** "+new Date().toISOString(),
    "**Grounding:** "+inventory.features.length+" code-referenced features and "+inventory.routes.length+" declared routes.",
    "**Candidates reviewed:** "+first.value.ideas.length+"; rejected by rule-based checks: "+rejected.length+".",
    ...chosen.map((c,i)=>[
      "## Idea "+(i+1)+": "+text(c.title,140),
      "**Why this is actually new:** "+text(c.audit.whyNew,800),
      "**Problem and expected benefit:** "+text(c.rationale,850)+" "+text(c.audit.impact,650),
      "**User experience:** "+text(c.userExperience,1000),
      "**Implementation:** "+text(c.implementation,1300),
      "**No-cost plan:** "+text(c.freeRuntime,550),
      "**Risks / trade-offs:** "+text(c.risks,650)+" "+text(c.audit.tradeoff,500),
      "**Acceptance tests:** "+text(c.tests,900)+" "+text(c.audit.acceptance,500),
    ].join("\n\n")),
    "### Editorial policy\nThese ideas require human review, feasibility checks and AdSense/YMYL scrutiny. No production code or personal data was touched.",
  ].join("\n\n---\n\n");
  if(existing && refresh){
    await github("PATCH","/issues/"+existing.number,{body});
    console.log("Refreshed the existing monthly suggestions issue #"+existing.number+".");
  } else {
    const issue=await github("POST","/issues",{title,body});
    console.log("Published two separately critiqued suggestions: "+issue.html_url);
  }
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
