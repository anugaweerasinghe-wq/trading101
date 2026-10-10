/**
 * TradeHQ recurrence tracker: read-only analysis of two finished monitor reports.
 * Writes ONE bounded GitHub review issue, NEVER repository code or AI requests.
 * Reports must come from this exact GitHub Actions run; stale reports fail closed.
 */
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const TITLE = "[TradeHQ Repair Candidate] Repeated public check failures";
const MARKER = "tradehq-triage-state-v1";
const routeTitle = "[TradeHQ Agent] Daily route report";
const routeFailureTitle = "[TradeHQ Agent] Website route failures";
const browserTitle = "[TradeHQ Agent] Browser smoke report";
const browserFailureTitle = "[TradeHQ Agent] Browser smoke failures";
const repo = process.env.GITHUB_REPOSITORY || "anugaweerasinghe1-del/trading101";
const token = process.env.GITHUB_TOKEN;
const runId = String(process.env.GITHUB_RUN_ID || "");

function extractRunId(body) {
  return String(body || "").match(/^\*\*GitHub run ID:\*\*\s*(\d+)$/m)?.[1] || "";
}
function count(body, label) {
  const line = String(body || "").split("\n").find(x => x.startsWith("**" + label + ":** "));
  if (!line) return null;
  const n = Number(line.split(":** ")[1]);
  return Number.isSafeInteger(n) && n >= 0 ? n : null;
}
export function readFailures(issues, currentRun) {
  if (!/^\d+$/.test(currentRun)) throw Error("Missing GitHub Actions run ID.");
  const find = title => issues.find(x => !x.pull_request && x.title === title && x.state === "open");
  const routes = find(routeTitle), browser = find(browserTitle);
  if (!routes || !browser || extractRunId(routes.body) !== currentRun || extractRunId(browser.body) !== currentRun) {
    throw Error("Fresh reports from BOTH independent monitors are missing. No recurrence or success inferred.");
  }
  const routeCount = count(routes.body, "Failed URLs");
  const browserCount = count(browser.body, "Potential failures");
  if (routeCount === null || browserCount === null) throw Error("Monitor totals missing; no candidate issued.");
  if (routeCount > 0 && !find(routeFailureTitle)) throw Error("Route failures were reported without the evidence issue.");
  if (browserCount > 0 && !find(browserFailureTitle)) throw Error("Browser failures were reported without the evidence issue.");
  const records = [];
  if (routeCount) {
    const body = String(find(routeFailureTitle).body || "");
    for (const m of body.matchAll(/^- (\/[^\s:]*): ([^\r\n]+)$/gm)) {
      records.push({ key: "route:" + m[1], path: m[1], reason: m[2].slice(0, 130), source: "route" });
    }
  }
  if (browserCount) {
    const body = String(find(browserFailureTitle).body || "");
    for (const m of body.matchAll(/^- \`(\/[^\s\`]+)\`: ([^\r\n]+)$/gm)) {
      records.push({ key: "browser:" + m[1], path: m[1], reason: m[2].slice(0, 130), source: "browser" });
    }
  }
  if ((routeCount && !records.some(x => x.source === "route")) || (browserCount && !records.some(x => x.source === "browser"))) {
    throw Error("Positive failure totals lack actionable route evidence; investigation required.");
  }
  return { records: records.slice(0, 35), routeCount, browserCount };
}
export function severity(item) {
  // A high priority for owner inspection never authorizes edits to financial/auth paths.
  if (/^\/(auth|reset-password|admin|trade|portfolio|markets)(\/|$)/.test(item.path) ||
      /HTTP 5\d\d|Production JS bundle|blank screen|very little visible content/i.test(item.reason)) return "HIGH";
  if (/No HTML title|HTTP 4\d\d/.test(item.reason)) return "MEDIUM";
  return "REVIEW";
}
export function previousState(body) {
  const match = String(body || "").match(/<!-- tradehq-triage-state-v1 ([^\n]+) -->/);
  if (!match) return { runId: "", streaks: {} };
  try {
    const obj = JSON.parse(match[1]);
    if (!obj || typeof obj.runId !== "string" || !obj.streaks || typeof obj.streaks !== "object") throw Error("bad shape");
    return { runId: obj.runId, streaks: obj.streaks };
  } catch { return { runId: "", streaks: {} }; }
}
export function nextState(prior, findings, currentRun) {
  if (prior.runId === currentRun) return prior; // rerunning a job is NOT another independent observation
  const streaks = {};
  for (const item of findings) {
    const prev = Number(prior.streaks[item.key] || 0);
    streaks[item.key] = Math.min(Number.isInteger(prev) && prev >= 0 ? prev + 1 : 1, 99);
  }
  return { runId: currentRun, streaks };
}
async function github(method, endpoint, body) {
  if (!token) throw Error("GITHUB_TOKEN not configured.");
  const r = await fetch("https://api.github.com/repos/" + repo + endpoint, {
    method, headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  if (!r.ok) throw Error("GitHub issue reporting HTTP " + r.status + " on " + method + " " + endpoint);
  return r.json();
}
async function main() {
  const open = await github("GET", "/issues?state=open&per_page=100");
  const { records, routeCount, browserCount } = readFailures(open, runId);
  const all = await github("GET", "/issues?state=all&per_page=100");
  const existing = all.find(x => !x.pull_request && x.title === TITLE);
  const state = nextState(previousState(existing?.body), records, runId);
  if (!records.length) {
    if (existing?.state === "open") {
      await github("PATCH", "/issues/" + existing.number, {
        body: "No current route/browser findings in run " + runId + ". Prior candidate cleared; no code was changed.\n\n<!-- " +
          MARKER + " " + JSON.stringify({ runId, streaks: {} }) + " -->",
        state: "closed", state_reason: "completed",
      });
    }
    console.log("No current public failures; no new repair candidate.");
    return;
  }
  const max = 12;
  const lines = records.slice(0, max).map(item => {
    const consecutive = state.streaks[item.key] || 1;
    const label = consecutive >= 2 ? "REPRODUCED ACROSS RUNS" : "First observation";
    return "- **" + severity(item) + " · " + label + " (" + consecutive +
      ")** " + item.source + " " + item.path + ": " + item.reason.replace(/[<>\r]/g, "") ;
  });
  const body = [
    "## Public monitor recurrence tracker (review only)",
    "**Run ID:** " + runId,
    "**Route failures:** " + routeCount + " · **Browser failures:** " + browserCount,
    "**Reproduced candidates:** " + records.filter(x => state.streaks[x.key] >= 2).length,
    "This issue is based only on public HTTP/browser samples. A repeated symptom does NOT establish root cause.",
    "### Observations", lines.join("\n"),
    records.length > max ? "Additional entries omitted; review source monitor issues." : "",
    "Evidence: #" + open.find(x => x.title === routeTitle).number + " (route report), #" +
      open.find(x => x.title === browserTitle).number + " (browser report).",
    "### Guardrails",
    "No AI patch, branch, PR, automatic merge, trade, private-data access, authentication, backend or DNS edits were performed.",
    "A human must reproduce, establish cause and create a NEW owner-authored [TradeHQ Code Request] for allowed low-risk TSX edits.",
    "Sensitive/auth/portfolio/market-data repairs require separate manual engineering approval. Avoid retrying unclear problems.",
    "<!-- " + MARKER + " " + JSON.stringify(state) + " -->",
  ].filter(Boolean).join("\n\n").slice(0, 12000);
  if (existing) {
    await github("PATCH", "/issues/" + existing.number, { body, state: "open" });
    console.log("Updated existing recurrence issue #" + existing.number + "; no code changed.");
  } else {
    await github("POST", "/issues", { title: TITLE, body });
    console.log("Opened one owner-review recurrence issue; no code changed.");
  }
}
if (process.argv[1] && fileURLToPath(import.meta.url) === resolve(process.argv[1])) {
  main().catch(e => { console.error("Repair triage stopped safely:", e.message); process.exitCode = 1; });
}
