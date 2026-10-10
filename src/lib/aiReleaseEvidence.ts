// Read-only release evidence. A successful named job alone is not a release gate.
export type ReleaseCheck = {
  id: number;
  name: string;
  head_sha: string;
  status: string;
  conclusion: string | null;
  app?: { slug?: string };
};
export type ReleaseRun = {
  id: number;
  path: string;
  head_sha: string;
  status: string;
  conclusion: string | null;
  run_attempt?: number;
};
const requiredWorkflows = [
  [".github/workflows/phase3-high-check.yml", "Phase 3 validation"],
  [".github/workflows/cloudflare-preview-build.yml", "Cloudflare offline compatibility"],
] as const;

export function summarizeReleaseEvidence(sha: string, checks: ReleaseCheck[], runs: ReleaseRun[]) {
  if (!/^[a-f0-9]{40}$/.test(sha)) return { failed: true, summary: "Invalid proposal commit; release blocked" };
  const blockers: string[] = [];
  for (const [path, label] of requiredWorkflows) {
    const latest = runs.filter(run => run.head_sha === sha && run.path === path)
      .sort((a, b) => b.id - a.id || (b.run_attempt || 1) - (a.run_attempt || 1))[0];
    if (!latest) blockers.push(label + " not reported");
    else if (latest.status !== "completed") blockers.push(label + " pending");
    else if (latest.conclusion !== "success") blockers.push(label + " " + (latest.conclusion || "unverified"));
  }
  const pages = checks.filter(check => check.head_sha === sha && check.name === "Cloudflare Pages"
    && check.app?.slug === "cloudflare-workers-and-pages").sort((a, b) => b.id - a.id)[0];
  if (!pages) blockers.push("Cloudflare Pages deployment NOT VERIFIED");
  else if (pages.status !== "completed") blockers.push("Cloudflare Pages deployment pending");
  else if (pages.conclusion !== "success") blockers.push("Cloudflare Pages deployment FAILED; release blocked (" + (pages.conclusion || "unverified") + ")");
  const worker = checks.filter(check => check.head_sha === sha && check.name.startsWith("Workers Builds:")
    && check.app?.slug === "cloudflare-workers-and-pages").sort((a, b) => b.id - a.id)[0];
  const note = worker ? " · Separate Worker: " + (worker.conclusion || worker.status) : "";
  return {
    failed: blockers.length > 0,
    summary: (blockers.length ? blockers.join("; ") + "; do not merge"
      : "Required CI and Cloudflare Pages checks passed; owner review and live verification still required") + note,
  };
}
