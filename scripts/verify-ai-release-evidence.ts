import assert from "node:assert/strict";
import { summarizeReleaseEvidence, type ReleaseCheck, type ReleaseRun } from "../src/lib/aiReleaseEvidence";
const sha = "a".repeat(40), stale = "b".repeat(40);
const pages: ReleaseCheck = { id: 10, name: "Cloudflare Pages", head_sha: sha, status: "completed", conclusion: "success", app: { slug: "cloudflare-workers-and-pages" } };
const runs: ReleaseRun[] = ["phase3-high-check.yml", "cloudflare-preview-build.yml"].map((path, i) => ({ id: i + 1, path: ".github/workflows/" + path, head_sha: sha, status: "completed", conclusion: "success" }));
assert.equal(summarizeReleaseEvidence(sha, [pages], runs).failed, false);
// A duplicate/generic build check cannot substitute for either required workflow.
assert.equal(summarizeReleaseEvidence(sha, [pages, { ...pages, id: 20, name: "build" }], runs.slice(0, 1)).failed, true);
assert.equal(summarizeReleaseEvidence(sha, [pages], runs.map(run => ({ ...run, head_sha: stale }))).failed, true);
assert.equal(summarizeReleaseEvidence(sha, [{ ...pages, head_sha: stale }], runs).failed, true);
assert.equal(summarizeReleaseEvidence(sha, [{ ...pages, app: { slug: "untrusted-app" } }], runs).failed, true);
for (const conclusion of [null, "neutral", "skipped", "failure", "cancelled", "timed_out", "action_required", "stale"]) {
  assert.equal(summarizeReleaseEvidence(sha, [{ ...pages, conclusion }], runs).failed, true);
  assert.equal(summarizeReleaseEvidence(sha, [pages], [{ ...runs[0], conclusion }, runs[1]]).failed, true);
}
// A newer failed or pending run supersedes an older success on the same commit.
assert.equal(summarizeReleaseEvidence(sha, [pages], [...runs, { ...runs[0], id: 50, conclusion: "failure" }]).failed, true);
assert.equal(summarizeReleaseEvidence(sha, [pages], [...runs, { ...runs[0], run_attempt: 2, status: "in_progress", conclusion: null }]).failed, true);
assert.equal(summarizeReleaseEvidence(sha, [pages, { ...pages, id: 50, conclusion: "failure" }], runs).failed, true);
const separateWorker = { ...pages, id: 40, name: "Workers Builds: thetradehq", conclusion: "failure" };
const result = summarizeReleaseEvidence(sha, [pages, separateWorker], runs);
assert.equal(result.failed, false);
assert.match(result.summary, /Separate Worker: failure/);
assert.equal(summarizeReleaseEvidence("invalid", [pages], runs).failed, true);
console.log("AI release evidence: exact commit, both workflow gates, trusted Pages, non-success conclusions, reruns and separate Worker verified.");
