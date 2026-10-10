import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Bot, CheckCircle2, Code2, ExternalLink, GitPullRequest, KeyRound, Lock, MessageSquare, ShieldCheck, Sparkles } from "lucide-react";

type GithubIssue = { number: number; title: string; html_url: string; created_at: string; state: string; user?: { login: string }; pull_request?: unknown };
type GithubPr = { number: number; title: string; html_url: string; draft: boolean; created_at: string };
const repo = "anugaweerasinghe-wq/trading101";
const owner = "anugaweerasinghe-wq";
const borderCard = "rounded-2xl border border-border bg-card/60 p-5 sm:p-6";
const gitRoot = "https://github.com/" + repo;
const ISSUE_TITLE = "[TradeHQ Code Request]";
export default function AdminAIAssistant() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState("");
  const [issues, setIssues] = useState<GithubIssue[]>([]);
  const [prs, setPrs] = useState<GithubPr[]>([]);
  const [tab, setTab] = useState<"requests" | "ideas">("requests");
  const verify = async (event: React.FormEvent) => {
    event.preventDefault(); setChecking(true); setError("");
    try {
      const { data, error: remote } = await supabase.functions.invoke("admin-courses", {
        body: { action: "settings" }, headers: { "x-admin-key": key },
      });
      if (remote || data?.error || !data?.data) throw new Error("Could not verify your administrator key.");
      setUnlocked(true);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Unable to open this workspace.");
    } finally { setChecking(false); }
  };
  const refresh = useCallback(async () => {
    try {
      const [issueResponse, prResponse] = await Promise.all([
        fetch("https://api.github.com/repos/" + repo + "/issues?state=all&per_page=100"),
        fetch("https://api.github.com/repos/" + repo + "/pulls?state=open&per_page=50"),
      ]);
      if (issueResponse.ok) {
        const value = await issueResponse.json() as GithubIssue[];
        setIssues(value.filter(x => !x.pull_request && (x.title === ISSUE_TITLE && x.user?.login === owner || x.title.startsWith("[TradeHQ Ideas]") && x.user?.login === "github-actions[bot]")));
      }
      if (prResponse.ok) {
        const value = await prResponse.json() as GithubPr[];
        setPrs(value.filter(x => x.title.startsWith("AI proposal:")));
      }
    } catch { /* GitHub public API is best effort; issues are accessible at GitHub. */ }
  }, []);
  useEffect(() => { if (unlocked) void refresh(); }, [unlocked, refresh]);
  const issueUrl = gitRoot + "/issues/new?" + new URLSearchParams({ title: ISSUE_TITLE, body: prompt.trim() }).toString();
  const canSend = prompt.trim().length >= 20 && prompt.trim().length <= 2500;
  const codeIssues = issues.filter(x => x.title === ISSUE_TITLE);
  const ideaIssues = issues.filter(x => x.title.startsWith("[TradeHQ Ideas]"));
  return <main className="min-h-screen bg-background text-foreground px-4 py-10">
    <Helmet><title>AI Development Desk | TradeHQ Admin</title><meta name="robots" content="noindex,nofollow"/></Helmet>
    <div className="max-w-5xl mx-auto space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs uppercase tracking-widest text-primary">TradeHQ / Admin</p><h1 className="text-3xl font-semibold mt-2">AI development desk</h1><p className="text-sm text-muted-foreground mt-2">Free-tier Gemini suggestions and a human-reviewed code-change queue.</p></div>
        <div className="flex items-center gap-4"><Link className="text-sm text-primary hover:underline" to="/admin">← Admin dashboard</Link>{unlocked && <button type="button" className="border border-border rounded-xl px-3 py-2 text-sm flex items-center gap-2" onClick={() => { setKey(""); setUnlocked(false); setPrompt(""); setIssues([]); setPrs([]); }}><Lock className="w-4 h-4"/> Lock</button>}</div>
      </header>
      {!unlocked ? <form className={borderCard+" max-w-md space-y-4"} onSubmit={verify}>
        <ShieldCheck className="w-7 h-7 text-primary"/>
        <h2 className="font-semibold">Private admin access</h2>
        <p className="text-sm text-muted-foreground">Use the existing master key. Your key remains only in this page's temporary memory.</p>
        <input required type="password" autoComplete="off" aria-label="Admin master key" value={key} onChange={e => setKey(e.target.value)} className="w-full rounded-xl border border-border bg-background p-3"/>
        {error && <p role="alert" className="text-destructive text-sm">{error}</p>}
        <button disabled={checking} className="rounded-xl bg-primary text-primary-foreground px-4 py-3 text-sm w-full disabled:opacity-50">{checking ? "Checking…" : "Unlock AI workspace"}</button>
      </form> : <>
        <div className="flex flex-wrap gap-2">
          <button type="button" className={"rounded-xl border px-4 py-2 text-sm "+(tab==="requests"?"border-primary/50 bg-primary/10":"border-border")} onClick={() => setTab("requests")}><Code2 className="w-4 h-4 inline mr-2"/>AI code requests</button>
          <button type="button" className={"rounded-xl border px-4 py-2 text-sm "+(tab==="ideas"?"border-primary/50 bg-primary/10":"border-border")} onClick={() => setTab("ideas")}><Sparkles className="w-4 h-4 inline mr-2"/>Monthly ideas</button>
          <button type="button" className="ml-auto px-3 py-2 text-sm text-primary hover:underline" onClick={() => void refresh()}>Refresh activity</button>
        </div>
        {tab==="requests" ? <>
          <section className={borderCard+" space-y-4"}>
            <div className="flex items-center gap-3"><Bot className="w-6 h-6 text-primary"/><h2 className="text-xl font-semibold">Tell Gemini what to improve</h2></div>
            <p className="text-sm text-muted-foreground">Describe a specific frontend change. The next step opens a prefilled GitHub issue for you to submit. The AI then proposes a code change on a separate branch and runs isolated checks. Nothing merges automatically.</p>
            <label className="block space-y-2 text-sm"><span>Change request (20–2500 characters)</span>
              <textarea rows={5} maxLength={2500} placeholder="Example: Improve the spacing and hierarchy of the About page on mobile while preserving all existing content and links." value={prompt} onChange={e=>setPrompt(e.target.value)} className="w-full resize-y bg-background border border-border rounded-xl p-4 leading-relaxed"/>
            </label>
            <div className="flex flex-wrap gap-3 items-center justify-between">
              <p className="text-xs text-muted-foreground">{prompt.trim().length}/2500 · Only existing, non-sensitive frontend TSX files are eligible.</p>
              <a href={canSend?issueUrl:undefined} onClick={e=>{if(!canSend)e.preventDefault();}} target="_blank" rel="noopener noreferrer" aria-disabled={!canSend} className={"rounded-xl px-5 py-3 text-sm font-medium inline-flex items-center gap-2 "+(canSend?"bg-primary text-primary-foreground":"bg-muted text-muted-foreground pointer-events-none")}>Continue securely on GitHub <ExternalLink className="w-4 h-4"/></a>
            </div>
            <p className="text-xs text-amber-500"><strong>GitHub issues are public.</strong> Never include API keys, passwords, personal information, account records, or private logs. Gemini is disabled until the repository's free-tier API-key secret is configured. GitHub may also require permission to let Actions create pull requests.</p>
          </section>
          <section className={borderCard+" space-y-4"}>
            <div className="flex items-center gap-3"><GitPullRequest className="w-5 h-5 text-primary"/><h2 className="font-semibold">Pending AI code proposals</h2></div>
            {prs.length === 0 ? <p className="text-sm text-muted-foreground">No open AI pull requests yet.</p> : prs.map(pr=><a key={pr.number} href={pr.html_url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border p-3 text-sm hover:border-primary/40"><strong>#{pr.number} {pr.title}</strong><span className="block text-xs text-muted-foreground mt-1">{pr.draft?"Draft; review required":"Open for review"} · {new Date(pr.created_at).toLocaleDateString()} ↗</span></a>)}
            <h3 className="font-semibold text-sm pt-2">Previous requests</h3>
            {codeIssues.length === 0 ? <p className="text-sm text-muted-foreground">No code requests submitted yet.</p> : codeIssues.slice(0,8).map(issue=><a key={issue.number} href={issue.html_url} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border p-3 text-sm hover:border-primary/40">Request #{issue.number} · {issue.state}<span className="block text-xs text-muted-foreground mt-1">Open GitHub issue for agent replies and test results ↗</span></a>)}
          </section>
        </> : <>
          <section className={borderCard+" space-y-4"}>
            <div className="flex gap-3 items-center"><Sparkles className="w-6 h-6 text-primary"/><h2 className="text-xl font-semibold">Two new ideas each month</h2></div>
            <p className="text-sm text-muted-foreground">On the first day of each month the free-tier Gemini workflow suggests two improvements, including implementation notes, risks and tests. Ideas remain unimplemented until you approve them.</p>
            <div className="flex gap-3 items-start rounded-xl border border-border p-4"><KeyRound className="w-5 h-5 text-primary mt-0.5"/><div><strong className="text-sm">One-time GitHub secret required</strong><p className="text-xs text-muted-foreground mt-1">GitHub repository → Settings → Secrets and variables → Actions → New repository secret → name <code>GEMINI_API_KEY</code>. Add your eligible free-tier Gemini API key directly in GitHub, not in this dashboard or chat. Keep billing disabled.</p></div></div>
            <div className="flex flex-wrap gap-4">
              <a className="text-primary text-sm hover:underline inline-flex gap-1 items-center" href={gitRoot+"/actions/workflows/tradehq-agents.yml"} target="_blank" rel="noopener noreferrer">View schedule or run manually <ExternalLink className="w-3 h-3"/></a>
              <a className="text-primary text-sm hover:underline inline-flex gap-1 items-center" href={gitRoot+"/settings/secrets/actions"} target="_blank" rel="noopener noreferrer">Configure secret securely <ExternalLink className="w-3 h-3"/></a>
            </div>
            <h3 className="font-semibold text-sm">Research reports</h3>
            {ideaIssues.length ? ideaIssues.map(issue=><a href={issue.html_url} key={issue.number} target="_blank" rel="noopener noreferrer" className="block rounded-xl border border-border p-3 text-sm hover:border-primary/40">{issue.title} <ExternalLink className="w-3 h-3 inline"/></a>):<p className="text-sm text-muted-foreground">No generated suggestions yet; the scheduled workflow has not produced a report.</p>}
          </section>
        </>}
        <section className={borderCard+" space-y-3"}>
          <div className="flex gap-3 items-center"><CheckCircle2 className="w-5 h-5 text-primary"/><h3 className="font-semibold">Release rules</h3></div>
          <p className="text-sm text-muted-foreground">The coding agent may edit at most two existing approved frontend files in each request. It cannot change admin credentials, database tables, server functions, GitHub workflows or package dependencies. Its separate test job has no Gemini secret or write access. All pull requests require your review and a deliberate merge before they can reach production.</p>
          <div className="flex flex-wrap gap-4 text-sm"><Link to="/admin" className="text-primary hover:underline">Return to admin dashboard</Link><a href={gitRoot+"/pulls"} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Review all pull requests ↗</a></div>
        </section>
      </>}
    </div>
  </main>;
}
