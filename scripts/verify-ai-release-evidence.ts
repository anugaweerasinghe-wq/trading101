import assert from "node:assert/strict";
import { summarizeReleaseEvidence, type ReleaseCheck, type ReleaseRun } from "../src/lib/aiReleaseEvidence";
const sha = "a".repeat(40), stale = "b".repeat(40);
const now = Date.parse("2026-10-11T06:00:00Z");
const times = { started_at: "2026-10-11T05:01:00Z", completed_at: "2026-10-11T05:10:00Z" };
const pages: ReleaseCheck = { id: 10, name: "Cloudflare Pages", head_sha: sha, status: "completed", conclusion: "success", app: { slug: "cloudflare-workers-and-pages" }, ...times };
const runs: ReleaseRun[] = [{ id: 1, path: ".github/workflows/phase3-high-check.yml", head_sha: sha, status: "completed", conclusion: "success", event: "pull_request", run_attempt: 1, check_suite_id: 99, created_at: "2026-10-11T05:00:00Z", run_started_at: "2026-10-11T05:00:00Z", updated_at: "2026-10-11T05:11:00Z" }];
const gates: ReleaseCheck[] = ["TradeHQ Phase 3 tests", "TradeHQ Cloudflare compatibility / Cloudflare build and SEO", "TradeHQ Required validation"].map((name, i) => ({ ...pages, id: 20 + i, name, app: { slug: "github-actions" }, check_suite: { id: 99 } }));
const evaluate = (checks: ReleaseCheck[], workflowRuns: ReleaseRun[] = runs) => summarizeReleaseEvidence(sha, checks, workflowRuns, now);
assert.equal(evaluate([pages, ...gates]).failed, false);
// A duplicate/generic build check cannot substitute for either required workflow.
assert.equal(evaluate([pages, { ...pages, id: 20, name: "build" }]).failed, true);
assert.equal(evaluate([pages, ...gates], runs.map(run => ({ ...run, head_sha: stale }))).failed, true);
assert.equal(evaluate([{ ...pages, head_sha: stale }, ...gates]).failed, true);
assert.equal(evaluate([{ ...pages, app: { slug: "untrusted-app" } }, ...gates]).failed, true);
for (const conclusion of [null, "neutral", "skipped", "failure", "cancelled", "timed_out", "action_required", "stale"]) {
  assert.equal(evaluate([{ ...pages, conclusion }, ...gates]).failed, true);
  assert.equal(evaluate([pages, ...gates], [{ ...runs[0], conclusion }]).failed, true);
  for (let i = 0; i < gates.length; i++) assert.equal(evaluate([pages, ...gates.map((gate, j) => i === j ? { ...gate, conclusion } : gate)]).failed, true);
}
// A newer failed or pending run supersedes an older success on the same commit.
assert.equal(evaluate([pages, ...gates], [...runs, { ...runs[0], id: 50, conclusion: "failure" }]).failed, true);
assert.equal(evaluate([pages, ...gates], [...runs, { ...runs[0], run_attempt: 2, status: "in_progress", conclusion: null }]).failed, true);
assert.equal(evaluate([pages, ...gates], [...runs, { ...runs[0], id: 50, check_suite_id: 100 }]).failed, true);
assert.equal(evaluate([pages, ...gates, { ...pages, id: 50, conclusion: "failure" }]).failed, true);
for (const timestamp of [undefined, "bad", "2026-10-09T05:00:00Z", "2026-10-12T05:00:00Z"]) {
  assert.equal(evaluate([{ ...pages, started_at: timestamp }, ...gates]).failed, true);
  assert.equal(evaluate([pages, ...gates], [{ ...runs[0], run_started_at: timestamp }]).failed, true);
}
assert.equal(evaluate([pages, ...gates], [{ ...runs[0], created_at: "2026-10-09T05:00:00Z", run_attempt: 2 }]).failed, false, "A fresh rerun may validate an older PR; old attempt evidence still cannot substitute.");
assert.equal(evaluate([pages, ...gates, { ...gates[0], id: 30 }]).failed, true);
assert.equal(evaluate([pages, ...gates], [{ ...runs[0], event: "issues" }]).failed, true);
assert.equal(evaluate([pages, ...gates.map(gate => ({ ...gate, check_suite: { id: 100 } }))]).failed, true);
const separateWorker = { ...pages, id: 40, name: "Workers Builds: thetradehq", conclusion: "failure" };
const result = evaluate([pages, ...gates, separateWorker]);
assert.equal(result.failed, false);
assert.match(result.summary, /Separate Worker: failure/);
assert.equal(summarizeReleaseEvidence("invalid", [pages], runs, now).failed, true);
console.log("AI release evidence: immutable SHA, current workflow suite, three unique gates, 24-hour freshness, trusted Pages, non-success outcomes, reruns and separate Worker verified.");
