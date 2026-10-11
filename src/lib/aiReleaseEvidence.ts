// Read-only release evidence. A successful named job alone is not a release gate.
export type ReleaseCheck = {
  id: number;
  name: string;
  head_sha: string;
  status: string;
  conclusion: string | null;
  app?: { slug?: string };
  check_suite?: { id: number };
  started_at?: string | null;
  completed_at?: string | null;
};
export type ReleaseRun = {
  id: number;
  path: string;
  head_sha: string;
  status: string;
  conclusion: string | null;
  run_attempt?: number;
  check_suite_id?: number;
  event?: string;
  created_at?: string;
  run_started_at?: string;
  updated_at?: string;
};
const requiredChecks = [
  "TradeHQ Phase 3 tests",
  "TradeHQ Cloudflare compatibility / Cloudflare build and SEO",
  "TradeHQ Required validation",
] as const;
const maxAgeMs = 24 * 60 * 60 * 1000;
function fresh(start: string | null | undefined, finish: string | null | undefined, now: number) {
  const a = Date.parse(start || ""), b = Date.parse(finish || "");
  return Number.isFinite(now) && Number.isFinite(a) && Number.isFinite(b)
    && a <= b && b <= now + 60_000 && a >= now - maxAgeMs;
}

export function summarizeReleaseEvidence(sha: string, checks: ReleaseCheck[], runs: ReleaseRun[], now = Date.now()) {
  if (!/^[a-f0-9]{40}$/.test(sha)) return { failed: true, summary: "Invalid proposal commit; release blocked" };
  const blockers: string[] = [];
  const latest = runs.filter(run => run.head_sha === sha && run.path === ".github/workflows/phase3-high-check.yml"
    && ["pull_request", "push"].includes(run.event || ""))
    .sort((a, b) => b.id - a.id || (b.run_attempt || 0) - (a.run_attempt || 0))[0];
  if (!latest) blockers.push("Phase 3 validation not reported");
  else if (latest.status !== "completed" || latest.conclusion !== "success") blockers.push("Phase 3 validation " + (latest.conclusion || latest.status));
  else if (!fresh(latest.run_started_at, latest.updated_at, now)
    || !Number.isFinite(Date.parse(latest.created_at || ""))
    || Date.parse(latest.created_at || "") > Date.parse(latest.run_started_at || "") || !Number.isInteger(latest.run_attempt)
    || (latest.run_attempt || 0) < 1 || !Number.isInteger(latest.check_suite_id)) blockers.push("Phase 3 validation stale or incomplete");
  for (const name of requiredChecks) {
    const matching = checks.filter(check => check.head_sha === sha && check.name === name
      && check.app?.slug === "github-actions" && check.check_suite?.id === latest?.check_suite_id)
      .sort((a, b) => b.id - a.id);
    const check = matching[0];
    if (!latest || !Number.isInteger(latest.check_suite_id) || !check) blockers.push(name + " not reported for current workflow");
    else if (matching.length !== 1 || check.status !== "completed" || check.conclusion !== "success"
      || !fresh(check.started_at, check.completed_at, now)
      || Date.parse(check.started_at || "") < Date.parse(latest.run_started_at || "")) blockers.push(name + " failed, stale, ambiguous or unverified");
  }
  const pages = checks.filter(check => check.head_sha === sha && check.name === "Cloudflare Pages"
    && check.app?.slug === "cloudflare-workers-and-pages").sort((a, b) => b.id - a.id)[0];
  if (!pages) blockers.push("Cloudflare Pages deployment NOT VERIFIED");
  else if (pages.status !== "completed") blockers.push("Cloudflare Pages deployment pending");
  else if (pages.conclusion !== "success") blockers.push("Cloudflare Pages deployment FAILED; release blocked (" + (pages.conclusion || "unverified") + ")");
  else if (!fresh(pages.started_at, pages.completed_at, now)) blockers.push("Cloudflare Pages deployment stale or incomplete");
  const worker = checks.filter(check => check.head_sha === sha && check.name.startsWith("Workers Builds:")
    && check.app?.slug === "cloudflare-workers-and-pages").sort((a, b) => b.id - a.id)[0];
  const note = worker ? " · Separate Worker: " + (worker.conclusion || worker.status) : "";
  return {
    failed: blockers.length > 0,
    summary: (blockers.length ? blockers.join("; ") + "; do not merge"
      : "Required CI and Cloudflare Pages checks passed; owner review and live verification still required") + note,
  };
}
