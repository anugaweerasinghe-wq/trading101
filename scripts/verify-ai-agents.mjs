import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import assert from "node:assert/strict";

const scripts = [
  "scripts/agent-code-request.mjs",
  "scripts/agent-monthly-ideas.mjs",
  "scripts/agent-monitor.mjs",
  "scripts/agent-browser-smoke.mjs",
  "scripts/agent-feature-inventory.mjs",
];
for (const file of scripts) {
  const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
  assert.equal(result.status, 0, file + " syntax failed: " + result.stderr);
}
const workflow = readFileSync(".github/workflows/tradehq-code-agent.yml", "utf8");
const agent = readFileSync("scripts/agent-code-request.mjs", "utf8");
const app = readFileSync("src/App.tsx", "utf8");
const routes = readFileSync("scripts/routes.ts", "utf8");
assert.match(workflow, /github\.event\.issue\.user\.login == github\.repository_owner/);
assert.match(workflow, /pull-requests: write/);
assert.match(workflow, /contents: read/);
assert.match(workflow, /needs: propose/);
assert.match(workflow, /confirm-pr-created/);
assert.match(workflow, /pr_created/);
assert.match(agent, /pr_created=/);
assert.doesNotMatch(workflow, /merge_pull_request|gh pr merge|pull_request_target/);
assert.match(agent, /\/git\/refs/);
assert.match(agent, /draft: true/);
assert.match(agent, /MAX_FILES = 2/);
assert.match(agent, /src\\\/\(pages\|components\)/);
assert.match(agent, /Cannot|\ballowed\b/);
assert.match(app, /path="\/admin\/ai"/);
assert.match(routes, /"\/admin\/ai"/);
console.log("TradeHQ AI agent syntax, access boundaries, route and review gates verified.");
