import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight, Medal, Home, ChevronRight, Users, Swords, RefreshCw, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssetFAQSection } from "@/components/AssetFAQSection";
import { EducationalDisclaimer } from "@/components/EducationalDisclaimer";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { MIN_TRADES_TO_RANK, syncStats } from "@/lib/traderSync";
import { pushPortfolio, reconcilePortfolio, startRankedPractice } from "@/lib/cloudPortfolio";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { STARTING_BALANCE_LABEL } from "@/lib/constants";

interface BoardRow {
  userId: string;
  username: string;
  country: string | null;
  portfolioValue: number;
  pnlPct: number;
  trades: number;
  pricedAt: string | null;
}

interface DuelRow {
  id: string;
  code: string;
  creatorName: string;
  opponentName: string;
  creatorPct: number;
  opponentPct: number;
  endsAt: string;
  finished: boolean;
}

const LEADERBOARD_FAQS = [
  {
    question: "Is the TradeHQ leaderboard real?",
    answer:
      "Each row belongs to a public account with a server-recorded ranked practice portfolio. Orders use cached provider quotes or fixed simulator prices. Browser imports and submitted scores are excluded. This is simulated practice, not audited investment performance.",
  },
  {
    question: "How do I climb the leaderboard?",
    answer:
      "Public accounts with at least five server-recorded trades in a ranked portfolio can appear. The board sorts simulated return against a $100,000 virtual starting balance. A rank is not evidence of real-money skill.",
  },
  {
    question: "Do I need an account to compete?",
    answer:
      "An account and a public profile are needed to appear on the board. Cash and open positions can sync across devices when portfolio sync is available; browser-held trade history is separate. Core learning tools work without signing up.",
  },
  {
    question: "What data does TradeHQ store if I sign up?",
    answer:
      "Optional accounts use authentication data and can store a username, profile fields, simulated cash balance and simulated positions so practice progress can sync. TradeHQ does not require brokerage credentials or a real-money deposit.",
  },
  {
    question: "Can I stay private?",
    answer:
      "Yes. Profiles can be switched to private at any time from your trader profile page, which removes you from the leaderboard immediately while keeping your account.",
  },
];

const FAQ_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: LEADERBOARD_FAQS.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-sm font-mono text-muted-foreground w-5 text-center">{rank}</span>;
}

export default function Leaderboard() {
  const { user, profile } = useAuth();
  const [rows, setRows] = useState<BoardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [ranked, setRanked] = useState<boolean | null>(null);
  const [restartOpen, setRestartOpen] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [tab, setTab] = useState<"traders" | "duels">("traders");
  const [duels, setDuels] = useState<DuelRow[]>([]);
  const [duelsLoading, setDuelsLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const cloud = await supabase.rpc("get_cloud_leaderboard", { p_limit: 100 });
      if (cloud.error) throw cloud.error;
      setRows((cloud.data ?? []).map(row => ({
        userId: row.user_id, username: row.username, country: row.country,
        portfolioValue: Number(row.portfolio_value), pnlPct: Number(row.pnl_pct),
        trades: Number(row.trades), pricedAt: row.priced_at ?? null,
      })));
    } catch (error) {
      console.error("Leaderboard load failed", error);
      setRows([]);
      toast.error("Could not load rankings. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    let cancelled = false;
    setRanked(null);
    if (user) reconcilePortfolio(user.id).then(p => { if (!cancelled) setRanked(p.ranked); }).catch(() => {});
    return () => { cancelled = true; };
  }, [user?.id]);

  // Head-to-head duels between members with public profiles.
  useEffect(() => {
    (async () => {
      setDuelsLoading(true);
      const { data: raw } = await supabase
        .from("duels")
        .select("id, code, creator_id, opponent_id, creator_start_value, opponent_start_value, ends_at")
        .not("opponent_id", "is", null)
        .order("created_at", { ascending: false })
        .limit(50);

      const list = raw ?? [];
      if (list.length === 0) {
        setDuels([]);
        setDuelsLoading(false);
        return;
      }

      const ids = Array.from(
        new Set(list.flatMap((d) => [d.creator_id, d.opponent_id].filter(Boolean) as string[])),
      );
      const [{ data: profiles }, { data: stats }] = await Promise.all([
        supabase.from("profiles").select("id, username").in("id", ids).eq("is_public", true),
        supabase.from("trader_stats").select("user_id, portfolio_value").in("user_id", ids),
      ]);
      const nameOf = new Map((profiles ?? []).map((p) => [p.id, p.username]));
      const valueOf = new Map((stats ?? []).map((s) => [s.user_id, Number(s.portfolio_value)]));

      const mapped = list
        .filter((d) => nameOf.has(d.creator_id) && nameOf.has(d.opponent_id as string))
        .map((d) => {
          const cStart = Number(d.creator_start_value);
          const oStart = Number(d.opponent_start_value ?? 0) || cStart;
          const cVal = valueOf.get(d.creator_id) ?? cStart;
          const oVal = valueOf.get(d.opponent_id as string) ?? oStart;
          return {
            id: d.id,
            code: d.code,
            creatorName: nameOf.get(d.creator_id) as string,
            opponentName: nameOf.get(d.opponent_id as string) as string,
            creatorPct: ((cVal - cStart) / cStart) * 100,
            opponentPct: ((oVal - oStart) / oStart) * 100,
            endsAt: d.ends_at,
            finished: new Date(d.ends_at).getTime() <= Date.now(),
          };
        });

      setDuels(mapped);
      setDuelsLoading(false);
    })();
  }, []);

  const handleSync = async () => {
    if (!user) return;
    setSyncing(true);
    try {
      await pushPortfolio(user.id);
      toast.success("Account portfolio refreshed.");
      await load();
    } catch (error) {
      console.error("Portfolio sync failed", error);
      toast.error("Could not sync your practice portfolio. Please try again.");
    } finally {
      setSyncing(false);
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.thetradehq.com/" },
      { "@type": "ListItem", position: 2, name: "Leaderboard", item: "https://www.thetradehq.com/leaderboard" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Community Practice Board — TradeHQ Practice Stats</title>
        <meta name="description" content="Community practice board of public TradeHQ accounts using server-recorded simulated trades. Results are not independently verified or audited performance records." />
        <link rel="canonical" href="https://www.thetradehq.com/leaderboard" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeHQ Community Practice Board" />
        <meta property="og:description" content="Public TradeHQ accounts sorted by server-recorded simulated percentage return. Results are not independently verified or audited performance records." />
        <meta property="og:url" content="https://www.thetradehq.com/leaderboard" />
        <meta property="og:image" content="https://www.thetradehq.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeHQ Community Practice Board" />
        <meta name="twitter:description" content="Public TradeHQ accounts sorted by server-recorded simulated percentage return. Stats are not independently verified." />
        <meta name="twitter:image" content="https://www.thetradehq.com/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(FAQ_SCHEMA)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28 pb-20">
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8" aria-label="Breadcrumb">
              <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="w-4 h-4" />
                <span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium">Leaderboard</span>
            </nav>

            <div className="text-center mb-12">
              <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/30 text-primary inline-flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                Server-recorded practice
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                TradeHQ Leaderboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Rankings use account orders recorded by TradeHQ's server, with cached provider quotes or fixed simulator prices. Imported browser portfolios are excluded. These are educational simulations, not audited investment performance.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {user ? (
                  <>
                    <Button onClick={handleSync} disabled={syncing} className="!text-black font-bold rounded-xl">
                      {syncing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                      Refresh portfolio
                    </Button>
                    <Link to="/trader/me">
                      <Button variant="outline" className="rounded-xl">My profile</Button>
                    </Link>
                  </>
                ) : (
                  <Link to="/auth">
                    <Button className="!text-black font-bold rounded-xl">Create a free account to join</Button>
                  </Link>
                )}
                <Link to="/challenge">
                  <Button variant="outline" className="rounded-xl">
                    <Swords className="w-4 h-4 mr-2" /> Challenge a friend
                  </Button>
                </Link>
              </div>
            </div>

            {user && ranked === false && (
              <div className="mb-6 rounded-xl border border-white/10 p-4 text-sm">
                <p>Your imported practice portfolio is saved to your account. It cannot enter rankings because its earlier trades were recorded in your browser.</p>
                <Button variant="outline" className="mt-3" onClick={() => setRestartOpen(true)} disabled={syncing}>Start fresh ranked practice</Button>
              </div>
            )}
            <AlertDialog open={restartOpen} onOpenChange={setRestartOpen}>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Start fresh ranked practice?</AlertDialogTitle>
                  <AlertDialogDescription>Your current account portfolio will be archived, and a new portfolio will start with $100,000 virtual cash and no positions. Your old practice copy is preserved in account and browser backups. Current duels must finish first.</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep current portfolio</AlertDialogCancel>
                  <AlertDialogAction onClick={async () => {
                    if (!user) return;
                    setSyncing(true);
                    try { await startRankedPractice(user.id); setRanked(true); await load(); toast.success("Fresh ranked portfolio started."); }
                    catch (error) { toast.error((error as { message?: string }).message || "Could not start ranked practice."); }
                    finally { setSyncing(false); }
                  }}>Start fresh</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Tabs: overall board vs head-to-head duels */}
            <div className="flex gap-2 mb-4">
              {([
                { id: "traders", label: "Traders" },
                { id: "duels", label: "Duels" },
              ] as const).map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors border ${
                    tab === t.id
                      ? "bg-primary text-black border-transparent"
                      : "border-white/[0.08] text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {tab === "traders" ? (
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden" style={{ backdropFilter: "blur(12px)" }}>
              {/* Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/[0.06] text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Rank</span>
                <span>Trader</span>
                <span className="text-right">Portfolio Value</span>
                <span className="text-right">% Return</span>
                <span className="text-right">Trades</span>
              </div>

              {loading ? (
                <div className="py-16 text-center text-muted-foreground text-sm">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto mb-3" />
                  Loading rankings…
                </div>
              ) : rows.length === 0 ? (
                <div className="py-16 px-6 text-center">
                  <Users className="w-10 h-10 text-primary/60 mx-auto mb-4" />
                  <h2 className="text-lg font-semibold mb-2">No public traders yet — be the first</h2>
                  <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                    This board displays public accounts with at least {MIN_TRADES_TO_RANK}
                    server-recorded trades in a ranked practice portfolio. Results are simulated, not real investment returns.
                  </p>
                  <Link to={user ? "/trade" : "/auth"}>
                    <Button className="!text-black font-bold rounded-xl">
                      {user ? "Place your first trades" : "Create a free account"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              ) : (
                rows.map((trader, i) => (
                  <Link
                    key={trader.userId}
                    to={`/trader/${trader.username}`}
                    className={`grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 px-4 md:px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors ${
                      profile?.id === trader.userId ? "bg-primary/[0.06]" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(i + 1)}
                      <span className="font-semibold text-sm md:hidden">{trader.username}</span>
                    </div>
                    <div className="hidden md:flex items-center">
                      <span className="font-semibold text-sm text-foreground">{trader.username}</span>
                      {trader.country && (
                        <span className="ml-2 text-2xs text-muted-foreground">{trader.country}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-end">
                      <span className="font-mono text-sm text-foreground">
                        ${trader.portfolioValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </span>
                    </div>
                    <div className="flex items-center justify-end">
                      <Badge variant="outline" className={trader.pnlPct >= 0 ? "text-profit border-profit/30" : "text-loss border-loss/30"}>
                        {trader.pnlPct >= 0 ? "+" : ""}{trader.pnlPct.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="hidden md:flex items-center justify-end">
                      <span className="text-xs text-muted-foreground">
                        {trader.trades} trades
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>
            ) : (
              <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden" style={{ backdropFilter: "blur(12px)" }}>
                {duelsLoading ? (
                  <div className="py-16 text-center text-muted-foreground text-sm">
                    <Loader2 className="w-5 h-5 animate-spin mx-auto mb-3" />
                    Loading duels…
                  </div>
                ) : duels.length === 0 ? (
                  <div className="py-16 px-6 text-center">
                    <Swords className="w-10 h-10 text-primary/60 mx-auto mb-4" />
                    <h2 className="text-lg font-semibold mb-2">No public duels yet</h2>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto mb-6">
                      Duels are 30-day head-to-head practice challenges between two members.
                      Both sides are compared by percentage change from their own recorded starting balance.
                      Scores are simulated practice statistics and are not independently verified.
                    </p>
                    <Link to="/challenge">
                      <Button className="!text-black font-bold rounded-xl">
                        Challenge a friend <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                ) : (
                  duels.map((d) => {
                    const creatorAhead = d.creatorPct >= d.opponentPct;
                    return (
                      <Link
                        key={d.id}
                        to={`/challenge/${d.code}`}
                        className="flex items-center justify-between gap-4 px-4 md:px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-semibold truncate">
                            <span className={creatorAhead ? "text-foreground" : "text-muted-foreground"}>
                              {d.creatorName}
                            </span>
                            <span className="text-muted-foreground mx-2">vs</span>
                            <span className={!creatorAhead ? "text-foreground" : "text-muted-foreground"}>
                              {d.opponentName}
                            </span>
                          </p>
                          <p className="text-2xs text-muted-foreground mt-1">
                            {d.finished
                              ? "Finished"
                              : `Ends ${new Date(d.endsAt).toLocaleDateString(undefined, { day: "numeric", month: "short" })}`}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className={d.creatorPct >= 0 ? "text-profit border-profit/30" : "text-loss border-loss/30"}>
                            {d.creatorPct >= 0 ? "+" : ""}{d.creatorPct.toFixed(1)}%
                          </Badge>
                          <Badge variant="outline" className={d.opponentPct >= 0 ? "text-profit border-profit/30" : "text-loss border-loss/30"}>
                            {d.opponentPct >= 0 ? "+" : ""}{d.opponentPct.toFixed(1)}%
                          </Badge>
                        </div>
                      </Link>
                    );
                  })
                )}
              </div>
            )}

            {/* How ranking works — replaces the old synthetic "next refresh" widget */}
            <section className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                {
                  title: "Ranked by % return",
                  body: `Every member begins with the same ${STARTING_BALANCE_LABEL} of virtual capital, so rank reflects percentage return only — never account size.`,
                },
                {
                  title: "Minimum activity",
                  body: `A profile appears once it records at least ${MIN_TRADES_TO_RANK} practice trades, which prevents single-trade luck from topping the board.`,
                },
                {
                  title: "You control visibility",
                  body: "New profiles start public and can appear on this board once they meet its practice-trade requirements. You can make your profile private at any time from your trader profile page.",
                },
              ].map((c) => (
                <div key={c.title} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <h3 className="font-semibold mb-2 text-sm">{c.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{c.body}</p>
                </div>
              ))}
            </section>

            <AssetFAQSection
              assetName="Leaderboard"
              assetSymbol="Leaderboard"
              faqs={LEADERBOARD_FAQS}
            />

            <EducationalDisclaimer variant="footer" />
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
