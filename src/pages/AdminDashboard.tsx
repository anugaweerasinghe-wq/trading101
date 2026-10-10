import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { Activity, BookOpen, CalendarCheck, CheckCircle2, ExternalLink, Lock, MessageSquare, RefreshCw, ShieldCheck, Sparkles, Wrench } from "lucide-react";

type Course = { id: string; status: string; document?: { title?: string }; updated_at?: string };
type DailyStatus = { enabled?: boolean; nextDue?: string; prepareAfter?: string; completed?: number; lastError?: string | null; model?: string; hasApiKey?: boolean; freeConfirmed?: boolean };
type CourseStatus = { enabled?: boolean; model?: string; runs?: Array<{ status?: string; last_error?: string | null }> };
type AgentIssue = { id: number; title: string; html_url: string; created_at: string; state: string; body?: string | null; pull_request?: unknown };
type Run = { id: number; status: string; conclusion: string | null; html_url: string; created_at: string };
const repo = "anugaweerasinghe-wq/trading101";
const card = "rounded-2xl border border-border bg-card/60 p-5 space-y-3";
const linkStyle = "inline-flex items-center gap-1 text-sm text-primary hover:underline";
export default function AdminDashboard() {
  const [key, setKey] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [courses, setCourses] = useState<Course[]>([]);
  const [daily, setDaily] = useState<DailyStatus | null>(null);
  const [courseStatus, setCourseStatus] = useState<CourseStatus | null>(null);
  const [reviews, setReviews] = useState<number | null>(null);
  const [issues, setIssues] = useState<AgentIssue[]>([]);
  const [run, setRun] = useState<Run | null>(null);
  const adminCall = useCallback(async (action: string) => {
    const { data, error: callError } = await supabase.functions.invoke("admin-courses", {
      body: { action }, headers: { "x-admin-key": key },
    });
    if (callError || data?.error) throw new Error(data?.error || "Admin verification failed.");
    return data.data;
  }, [key]);
  const refresh = useCallback(async () => {
    const [drafts, practice, settings, result] = await Promise.all([
      adminCall("list"), adminCall("daily-status"), adminCall("settings"),
      supabase.functions.invoke("admin-reviews", { body: { action: "list" }, headers: { "x-admin-key": key } }),
    ]);
    if (!Array.isArray(drafts) || !practice || !settings || result.error || result.data?.error || !Array.isArray(result.data?.data)) {
      throw new Error("Could not verify every admin desk. Check the master key.");
    }
    setCourses(drafts); setDaily(practice); setCourseStatus(settings); setReviews(result.data.data.length);
  }, [adminCall, key]);
  const loadAgents = useCallback(async () => {
    try {
      const [issuesResponse, runsResponse] = await Promise.all([
        fetch("https://api.github.com/repos/" + repo + "/issues?state=open&per_page=100"),
        fetch("https://api.github.com/repos/" + repo + "/actions/workflows/tradehq-agents.yml/runs?per_page=1"),
      ]);
      if (issuesResponse.ok) {
        const items = await issuesResponse.json();
        setIssues(Array.isArray(items) ? items.filter((i: AgentIssue) => !i.pull_request && /^\[TradeHQ (Agent|Ideas)\]/.test(i.title)) : []);
      }
      if (runsResponse.ok) {
        const data = await runsResponse.json();
        setRun(data.workflow_runs?.[0] ?? null);
      }
    } catch { /* Public GitHub reporting is optional; admin data remains available. */ }
  }, []);
  const unlock = async (event: React.FormEvent) => {
    event.preventDefault(); setError(""); setBusy(true);
    try { await refresh(); setUnlocked(true); await loadAgents(); }
    catch (failure) { setError(failure instanceof Error ? failure.message : "Could not open dashboard."); }
    finally { setBusy(false); }
  };
  useEffect(() => {
    if (!unlocked) return;
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") { void refresh().catch(() => setError("Dashboard data refresh failed.")); void loadAgents(); }
    }, 120000);
    return () => window.clearInterval(interval);
  }, [unlocked, refresh, loadAgents]);
  const agentFindings = issues.filter(item => item.title.startsWith("[TradeHQ Agent]"));
  const ideas = issues.filter(item => item.title.startsWith("[TradeHQ Ideas]"));
  return <main className="min-h-screen bg-background text-foreground px-4 py-10">
    <Helmet><title>Administration | TradeHQ</title><meta name="robots" content="noindex,nofollow" /></Helmet>
    <div className="mx-auto max-w-6xl space-y-7">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div><p className="text-xs tracking-[0.2em] text-primary uppercase mb-2">TradeHQ · private workspace</p><h1 className="text-3xl font-semibold">Admin dashboard</h1><p className="text-sm text-muted-foreground mt-2">Editorial controls, community moderation, automated checks and proposed improvements in one place.</p></div>
        <div className="flex gap-3">{unlocked && <button type="button" onClick={() => { setUnlocked(false); setKey(""); setCourses([]); setDaily(null); setCourseStatus(null); setReviews(null); setIssues([]); setRun(null); }} className="rounded-xl border border-border px-4 py-2 flex items-center gap-2 text-sm"><Lock className="w-4 h-4"/> Lock</button>}<Link to="/" className={linkStyle}>View website <ExternalLink className="h-3 w-3"/></Link></div>
      </header>
      {!unlocked ? <form onSubmit={unlock} className="max-w-md rounded-2xl border border-border bg-card p-6 space-y-5">
        <div className="flex gap-3 items-center"><ShieldCheck className="w-6 h-6 text-primary"/><h2 className="font-semibold">Verify administrator access</h2></div>
        <p className="text-sm text-muted-foreground">Uses the same server-checked master key as the existing Course and Review desks. The key is held only in memory on this page.</p>
        <label className="block text-sm space-y-2"><span>Admin master key</span><input type="password" autoComplete="off" required value={key} onChange={event => setKey(event.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3"/></label>
        {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
        <button type="submit" disabled={busy} className="w-full rounded-xl bg-primary text-primary-foreground py-3 text-sm font-medium disabled:opacity-50">{busy ? "Verifying…" : "Open dashboard"}</button>
      </form> : <>
        {error && <p role="alert" className="text-sm text-amber-400">{error}</p>}
        <div className="flex flex-wrap justify-between gap-3 items-center"><h2 className="text-lg font-semibold">Operations overview</h2><button type="button" disabled={busy} className="text-sm border border-border rounded-xl px-4 py-2 flex items-center gap-2 disabled:opacity-40" onClick={() => { setBusy(true); void Promise.all([refresh(),loadAgents()]).catch(() => setError("Refresh failed.")).finally(() => setBusy(false)); }}><RefreshCw className="w-4 h-4"/> Refresh</button></div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <section className={card}><BookOpen className="w-6 h-6 text-primary"/><h3 className="font-semibold">Courses</h3><p className="text-2xl font-semibold">{courses.filter(c => c.status === "draft").length} <span className="text-sm font-normal text-muted-foreground">drafts awaiting review</span></p><p className="text-xs text-muted-foreground">Generation: {courseStatus?.enabled ? "enabled" : "paused"} · {courseStatus?.model || "unknown"}</p><Link className={linkStyle} to="/admin/courses">Manage drafts and approvals →</Link></section>
          <section className={card}><CalendarCheck className="w-6 h-6 text-primary"/><h3 className="font-semibold">Daily practice</h3><p className="text-2xl font-semibold">{daily?.completed ?? 0}/50 <span className="text-sm font-normal text-muted-foreground">next bank ready</span></p><p className="text-xs text-muted-foreground">{daily?.enabled ? "Schedule enabled" : "Schedule paused"} · Next due {daily?.nextDue || "unknown"}</p>{daily?.lastError && <p className="text-xs text-amber-400">{daily.lastError}</p>}<Link className={linkStyle} to="/admin/daily">Review questions and schedule →</Link></section>
          <section className={card}><MessageSquare className="w-6 h-6 text-primary"/><h3 className="font-semibold">Community reviews</h3><p className="text-2xl font-semibold">{reviews ?? "—"} <span className="text-sm font-normal text-muted-foreground">reviews in moderation desk</span></p><Link className={linkStyle} to="/admin/reviews">Reply, feature or moderate →</Link></section>
        </div>
        <section className={card}>
          <div className="flex gap-3 items-center"><Activity className="w-5 h-5 text-primary"/><h2 className="font-semibold">Automated website checks</h2></div>
          <p className="text-sm text-muted-foreground">Read-only GitHub Actions checks inspect live public routes. Findings are proposed for review here; agents do not edit production directly. Reports describe public route failures only, never private customer data.</p>
          <p className="text-sm">{run ? <>Latest run: <strong>{run.conclusion || run.status}</strong> · {new Date(run.created_at).toLocaleString()}</> : "No completed agent workflow was returned from GitHub yet."}</p>
          <div className="flex flex-wrap gap-4"><a className={linkStyle} href={"https://github.com/" + repo + "/actions/workflows/tradehq-agents.yml"} target="_blank" rel="noopener noreferrer">View execution history <ExternalLink className="w-3 h-3"/></a><span className="text-sm text-muted-foreground">{agentFindings.length} open report(s)</span></div>
          {agentFindings.length === 0 ? <p className="text-sm text-muted-foreground">No open findings reported. This does not imply that every feature has been tested.</p> : <div className="space-y-2">{agentFindings.map(item => <div key={item.id} className="rounded-xl border border-border p-3 space-y-2"><a href={item.html_url} target="_blank" rel="noopener noreferrer" className="block text-sm hover:underline">{item.title}<span className="block text-xs text-muted-foreground mt-1">{new Date(item.created_at).toLocaleString()} · See evidence and reproduction steps ↗</span></a><a className={linkStyle} target="_blank" rel="noopener noreferrer" href={"https://github.com/" + repo + "/issues/new?" + new URLSearchParams({ title: "[TradeHQ Code Request]", body: ("Investigate this site-monitor finding and propose a safe frontend-only fix without changing backend/auth or trading logic. Finding: " + item.html_url + "\n\n" + (item.body || "").slice(0,1200)).slice(0,2400) }).toString()}>Propose a reviewed AI fix <ExternalLink className="h-3 w-3"/></a></div>)}</div>}
        </section>
        <section className={card}>
          <div className="flex items-center gap-3"><Sparkles className="w-5 h-5 text-primary"/><h2 className="font-semibold">Monthly AI improvement ideas</h2></div>
          <p className="text-sm text-muted-foreground">Two suggestions per month can be drafted with the optional free-tier Gemini API key in GitHub Actions. Ideas are proposals, not automatically published features.</p>
          {ideas.length ? ideas.map(item => <a key={item.id} href={item.html_url} target="_blank" rel="noopener noreferrer" className="block border border-border rounded-xl p-3 text-sm hover:border-primary/40">{item.title} <ExternalLink className="w-3 h-3 inline"/></a>) : <p className="text-sm text-muted-foreground">No monthly idea report has been published by the workflow yet.</p>}
        </section>
        <section className={card}>
          <div className="flex items-center gap-3"><Wrench className="w-5 h-5 text-primary"/><h2 className="font-semibold">Development and validation tools</h2></div>
          <p className="text-sm text-muted-foreground">Code-changing assistants must work on branches, pass checks, and produce reviewable pull requests. An AI issue-to-PR coding assistant can propose limited frontend edits without deploying. Use the AI development desk to submit requests and review proposals; approval is always manual.</p>
          <div className="flex flex-wrap gap-x-7 gap-y-3"><Link className={linkStyle} to="/admin/ai"><Bot className="w-4 h-4"/>AI development desk</Link><Link className={linkStyle} to="/admin/validator"><CheckCircle2 className="w-4 h-4"/>Internal link validator</Link><Link className={linkStyle} to="/admin/seo-audit">SEO audit utility</Link><Link className={linkStyle} to="/admin/editor">Legacy editor (opens Courses)</Link><a className={linkStyle} href={"https://github.com/" + repo + "/pulls"} target="_blank" rel="noopener noreferrer">Review code proposals ↗</a></div>
        </section>
      </>}
    </div>
  </main>;
}
