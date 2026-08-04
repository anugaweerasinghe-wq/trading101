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
import { syncStats, MIN_TRADES_TO_RANK } from "@/lib/traderSync";
import { STARTING_BALANCE_LABEL } from "@/lib/constants";

interface BoardRow {
  userId: string;
  username: string;
  country: string | null;
  portfolioValue: number;
  pnlPct: number;
  trades: number;
  winRate: number;
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
      "Yes. Every entry belongs to a real person who created a free account and chose to make their profile public. There are no demo or bot traders. All figures are simulated practice results from virtual money. (Educational simulation only — not financial advice.)",
  },
  {
    question: "How do I climb the leaderboard?",
    answer:
      "Trade your $100,000 of virtual cash to grow your portfolio percentage return. Traders are ranked by total percentage return, so account size never matters — only discipline does. You need at least 5 recorded trades before you are listed.",
  },
  {
    question: "Do I need an account to compete?",
    answer:
      "An account is only needed to appear on the leaderboard. Everything else on TradeHQ — trading, courses, tools and guides — works with no sign-up at all, with your portfolio stored privately in your own browser.",
  },
  {
    question: "What data does TradeHQ store if I sign up?",
    answer:
      "Only your email address, the username you choose, and your simulated practice statistics (virtual portfolio value, percentage return, trade count and win rate). No payment details, no brokerage connections and no real financial data are ever collected.",
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
  const [syncing, setSyncing] = useState(false);
  const [tab, setTab] = useState<"traders" | "duels">("traders");
  const [duels, setDuels] = useState<DuelRow[]>([]);
  const [duelsLoading, setDuelsLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: profiles } = await supabase
      .from("profiles")
      .select("id, username, country")
      .eq("is_public", true);

    if (!profiles || profiles.length === 0) {
      setRows([]);
      setLoading(false);
      return;
    }

    const { data: stats } = await supabase
      .from("trader_stats")
      .select("user_id, portfolio_value, pnl_pct, trades, win_rate")
      .in("user_id", profiles.map((p) => p.id))
      .gte("trades", MIN_TRADES_TO_RANK);

    const byId = new Map(profiles.map((p) => [p.id, p]));
    const merged: BoardRow[] = (stats ?? [])
      .map((s) => {
        const p = byId.get(s.user_id);
        if (!p) return null;
        return {
          userId: s.user_id,
          username: p.username,
          country: p.country,
          portfolioValue: Number(s.portfolio_value),
          pnlPct: Number(s.pnl_pct),
          trades: s.trades,
          winRate: Number(s.win_rate),
        };
      })
      .filter(Boolean) as BoardRow[];

    merged.sort((a, b) => b.pnlPct - a.pnlPct);
    setRows(merged);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

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
      const s = await syncStats(user.id);
      toast.success(
        s.trades < MIN_TRADES_TO_RANK
          ? `Synced. Place ${MIN_TRADES_TO_RANK - s.trades} more practice trades to be listed.`
          : "Stats synced to the leaderboard.",
      );
      await load();
    } catch {
      toast.error("Could not sync your stats. Please try again.");
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
        <title>Leaderboard — Real TradeHQ Paper Traders Ranked by Return</title>
        <meta name="description" content="Live rankings of real TradeHQ members who opted in, ranked by percentage return on $100,000 of virtual practice capital. No bots, no demo data." />
        <link rel="canonical" href="https://www.thetradehq.com/leaderboard" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeHQ Leaderboard — Real Paper Traders Ranked" />
        <meta property="og:description" content="Real members ranked by percentage return on $100K of virtual practice capital." />
        <meta property="og:url" content="https://www.thetradehq.com/leaderboard" />
        <meta property="og:image" content="https://www.thetradehq.com/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeHQ Leaderboard — Real Paper Traders Ranked" />
        <meta name="twitter:description" content="Real members ranked by percentage return on $100K of virtual practice capital." />
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
                Real members only
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                TradeHQ Leaderboard
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Every trader below is a real member who opted in to a public profile.
                No bots and no demo entries. Everyone starts with {STARTING_BALANCE_LABEL} of
                virtual practice capital and is ranked by percentage return.
              </p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {user ? (
                  <>
                    <Button onClick={handleSync} disabled={syncing} className="!text-black font-bold rounded-xl">
                      {syncing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <RefreshCw className="w-4 h-4 mr-2" />}
                      Sync my stats
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

            {/* Leaderboard Table */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden" style={{ backdropFilter: "blur(12px)" }}>
              {/* Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/[0.06] text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Rank</span>
                <span>Trader</span>
                <span className="text-right">Portfolio Value</span>
                <span className="text-right">% Return</span>
                <span className="text-right">Trades · Win rate</span>
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
                    We removed all simulated placeholder traders. This board now fills up
                    only with real members who create a free account, make their profile
                    public and record at least {MIN_TRADES_TO_RANK} practice trades.
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
                        {trader.trades} trades · {trader.winRate}% win
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </div>

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
                  body: "Profiles are public by default but can be switched to private from your trader profile at any time, removing you from this board instantly.",
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
