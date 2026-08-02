import { useCallback, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EducationalDisclaimer } from "@/components/EducationalDisclaimer";
import { Swords, Share2, Loader2, Clock, Trophy } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { computeLocalStats, syncStats } from "@/lib/traderSync";
import { SITE_DOMAIN, STARTING_BALANCE, STARTING_BALANCE_LABEL } from "@/lib/constants";

interface Duel {
  id: string;
  code: string;
  creator_id: string;
  opponent_id: string | null;
  creator_start_value: number;
  opponent_start_value: number | null;
  starts_at: string;
  ends_at: string;
  status: string;
}

interface SideStats {
  username: string;
  value: number;
  startValue: number;
}

function makeCode() {
  const alphabet = "abcdefghjkmnpqrstuvwxyz23456789";
  let out = "";
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  bytes.forEach((b) => (out += alphabet[b % alphabet.length]));
  return out;
}

function daysLeft(endsAt: string) {
  const ms = new Date(endsAt).getTime() - Date.now();
  return Math.max(0, Math.ceil(ms / 86_400_000));
}

export default function Challenge() {
  const { code } = useParams();
  const { user, profile } = useAuth();
  const [duel, setDuel] = useState<Duel | null>(null);
  const [sides, setSides] = useState<{ creator: SideStats | null; opponent: SideStats | null }>({
    creator: null,
    opponent: null,
  });
  const [myDuels, setMyDuels] = useState<Duel[]>([]);
  const [loading, setLoading] = useState(!!code);
  const [busy, setBusy] = useState(false);

  const loadSides = useCallback(async (d: Duel) => {
    const ids = [d.creator_id, d.opponent_id].filter(Boolean) as string[];
    const [{ data: profiles }, { data: stats }] = await Promise.all([
      supabase.from("profiles").select("id, username").in("id", ids),
      supabase.from("trader_stats").select("user_id, portfolio_value").in("user_id", ids),
    ]);
    const nameOf = new Map((profiles ?? []).map((p) => [p.id, p.username]));
    const valueOf = new Map((stats ?? []).map((s) => [s.user_id, Number(s.portfolio_value)]));
    setSides({
      creator: {
        username: nameOf.get(d.creator_id) ?? "Challenger",
        value: valueOf.get(d.creator_id) ?? d.creator_start_value,
        startValue: d.creator_start_value,
      },
      opponent: d.opponent_id
        ? {
            username: nameOf.get(d.opponent_id) ?? "Opponent",
            value: valueOf.get(d.opponent_id) ?? d.opponent_start_value ?? STARTING_BALANCE,
            startValue: d.opponent_start_value ?? STARTING_BALANCE,
          }
        : null,
    });
  }, []);

  const loadDuel = useCallback(async () => {
    if (!code) return;
    setLoading(true);
    const { data } = await supabase.from("duels").select("*").eq("code", code).maybeSingle();
    if (data) {
      setDuel(data as Duel);
      await loadSides(data as Duel);
    } else {
      setDuel(null);
    }
    setLoading(false);
  }, [code, loadSides]);

  useEffect(() => {
    loadDuel();
  }, [loadDuel]);

  useEffect(() => {
    if (code || !user) return;
    supabase
      .from("duels")
      .select("*")
      .or(`creator_id.eq.${user.id},opponent_id.eq.${user.id}`)
      .order("created_at", { ascending: false })
      .then(({ data }) => setMyDuels((data as Duel[]) ?? []));
  }, [code, user]);

  const createDuel = async () => {
    if (!user) return;
    setBusy(true);
    try {
      await syncStats(user.id);
      const stats = computeLocalStats();
      const newCode = makeCode();
      const { error } = await supabase.from("duels").insert({
        code: newCode,
        creator_id: user.id,
        creator_start_value: stats.portfolio_value,
      });
      if (error) throw error;
      const url = `${window.location.origin}/challenge/${newCode}`;
      await navigator.clipboard.writeText(
        `I challenge you to a 30-day TradeHQ practice duel — both of us trade virtual capital and the leaderboard tracks who's ahead. ${url} (Educational simulation only — not financial advice.)`,
      );
      toast.success("Challenge created — invite link copied to your clipboard.");
      window.location.href = `/challenge/${newCode}`;
    } catch {
      toast.error("Could not create the challenge. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const joinDuel = async () => {
    if (!user || !duel) return;
    setBusy(true);
    try {
      await syncStats(user.id);
      const stats = computeLocalStats();
      const { error } = await supabase
        .from("duels")
        .update({
          opponent_id: user.id,
          opponent_start_value: stats.portfolio_value,
          status: "active",
          starts_at: new Date().toISOString(),
          ends_at: new Date(Date.now() + 30 * 86_400_000).toISOString(),
        })
        .eq("id", duel.id)
        .is("opponent_id", null);
      if (error) throw error;
      toast.success("You joined the duel. 30 days on the clock.");
      await loadDuel();
    } catch {
      toast.error("Could not join this duel.");
    } finally {
      setBusy(false);
    }
  };

  const share = async () => {
    const url = `${window.location.origin}/challenge/${code}`;
    const text = `Join my 30-day TradeHQ practice trading duel. Both of us start from virtual capital — the leaderboard tracks who's ahead. (Educational simulation only — not financial advice.)`;
    try {
      if (navigator.share) await navigator.share({ title: "TradeHQ duel", text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        toast.success("Invite link copied");
      }
    } catch {
      /* user cancelled */
    }
  };

  const pct = (s: SideStats) => ((s.value - s.startValue) / s.startValue) * 100;

  const title = code
    ? "30-day practice trading duel | TradeHQ"
    : "Challenge a friend — 30-day practice trading duel | TradeHQ";
  const description =
    "Challenge a friend to a 30-day paper trading duel on TradeHQ. Both traders start from equal virtual capital and the scoreboard tracks who is ahead. Free, no real money.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_DOMAIN}/challenge`} />
        <meta name="robots" content={code ? "noindex, follow" : "index, follow"} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_DOMAIN}/challenge`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-28 pb-20 max-w-3xl">
          <Breadcrumbs
            items={[{ label: "Leaderboard", href: "/leaderboard" }, { label: "Challenge a friend" }]}
          />

          <header className="mt-8 mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-2xs uppercase tracking-widest text-primary mb-4">
              <Swords className="h-3 w-3" /> Head-to-head practice
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
              Challenge a friend to a 30-day duel
            </h1>
            <p className="text-sm text-muted-foreground mt-3 max-w-xl mx-auto">
              Send a link, both of you trade the simulator for 30 days, and the scoreboard
              tracks who is ahead by percentage return. Everyone starts from{" "}
              {STARTING_BALANCE_LABEL} of virtual capital. No real money is ever involved.
            </p>
          </header>

          {loading ? (
            <div className="py-16 text-center">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : code && !duel ? (
            <Card className="p-8 text-center glass-tactile border-chrome">
              <h2 className="text-lg font-semibold mb-2">This challenge link is not valid</h2>
              <p className="text-sm text-muted-foreground mb-6">
                It may have been removed. You can start a fresh duel instead.
              </p>
              <Link to="/challenge">
                <Button className="!text-black font-bold rounded-xl">Create a challenge</Button>
              </Link>
            </Card>
          ) : duel ? (
            <Card className="p-6 md:p-8 glass-tactile border-chrome">
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <Badge variant="outline" className="border-primary/30 text-primary">
                  {duel.status === "open" ? "Waiting for an opponent" : "Duel in progress"}
                </Badge>
                <span className="inline-flex items-center gap-1 text-2xs text-muted-foreground">
                  <Clock className="w-3 h-3" /> {daysLeft(duel.ends_at)} days remaining
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {[sides.creator, sides.opponent].map((s, i) => (
                  <div
                    key={i}
                    className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 text-center"
                  >
                    <p className="text-2xs uppercase tracking-widest text-muted-foreground mb-2">
                      {i === 0 ? "Challenger" : "Opponent"}
                    </p>
                    {s ? (
                      <>
                        <p className="font-semibold mb-1">{s.username}</p>
                        <p className={`text-2xl font-bold ${pct(s) >= 0 ? "text-profit" : "text-loss"}`}>
                          {pct(s) >= 0 ? "+" : ""}
                          {pct(s).toFixed(1)}%
                        </p>
                        <p className="text-2xs text-muted-foreground mt-1">
                          ${s.value.toLocaleString(undefined, { maximumFractionDigits: 0 })} simulated
                        </p>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground py-4">Seat open</p>
                    )}
                  </div>
                ))}
              </div>

              {sides.creator && sides.opponent && (
                <p className="mt-6 text-center text-sm">
                  <Trophy className="w-4 h-4 inline mr-1 text-primary" />
                  <strong>
                    {pct(sides.creator) === pct(sides.opponent)
                      ? "Dead even"
                      : pct(sides.creator) > pct(sides.opponent)
                        ? sides.creator.username
                        : sides.opponent.username}
                  </strong>{" "}
                  is currently ahead.
                </p>
              )}

              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button variant="outline" onClick={share} className="rounded-xl">
                  <Share2 className="w-4 h-4 mr-2" /> Share invite link
                </Button>
                {!user ? (
                  <Link to="/auth">
                    <Button className="!text-black font-bold rounded-xl">Sign in to join</Button>
                  </Link>
                ) : duel.status === "open" && duel.creator_id !== user.id ? (
                  <Button onClick={joinDuel} disabled={busy} className="!text-black font-bold rounded-xl">
                    {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Accept the challenge
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    className="rounded-xl"
                    disabled={busy}
                    onClick={async () => {
                      setBusy(true);
                      await syncStats(user.id).catch(() => null);
                      await loadDuel();
                      setBusy(false);
                    }}
                  >
                    Refresh my score
                  </Button>
                )}
              </div>
            </Card>
          ) : (
            <>
              <Card className="p-6 md:p-8 glass-tactile border-chrome text-center">
                {user ? (
                  <>
                    <p className="text-sm text-muted-foreground mb-5">
                      Signed in as <strong>{profile?.username ?? "you"}</strong>. Create a duel and
                      share the link with a friend.
                    </p>
                    <Button onClick={createDuel} disabled={busy} className="!text-black font-bold rounded-xl px-8">
                      {busy && <Loader2 className="w-4 h-4 mr-2 animate-spin" />} Create a challenge link
                    </Button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-muted-foreground mb-5">
                      Duels need a free account so both scores can be tracked. Everything else on
                      TradeHQ stays available without signing in.
                    </p>
                    <Link to="/auth">
                      <Button className="!text-black font-bold rounded-xl px-8">
                        Create a free account
                      </Button>
                    </Link>
                  </>
                )}
              </Card>

              {myDuels.length > 0 && (
                <section className="mt-10">
                  <h2 className="text-lg font-semibold mb-4">Your duels</h2>
                  <div className="space-y-2">
                    {myDuels.map((d) => (
                      <Link
                        key={d.id}
                        to={`/challenge/${d.code}`}
                        className="flex items-center justify-between rounded-xl border border-white/[0.08] bg-white/[0.02] px-4 py-3 hover:bg-white/[0.04] transition"
                      >
                        <span className="text-sm font-mono">{d.code}</span>
                        <span className="text-2xs text-muted-foreground">
                          {d.status === "open" ? "Waiting for opponent" : `${daysLeft(d.ends_at)} days left`}
                        </span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-10 grid gap-4 md:grid-cols-3">
                {[
                  { t: "1. Create a link", b: "Your current simulated balance is recorded as your starting line, so neither side gets a head start." },
                  { t: "2. Your friend joins", b: "They sign in, and their starting balance is recorded the moment they accept." },
                  { t: "3. 30 days of trading", b: "Both scores update whenever either of you syncs. Percentage return decides who is ahead." },
                ].map((s) => (
                  <div key={s.t} className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                    <h3 className="font-semibold text-sm mb-2">{s.t}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{s.b}</p>
                  </div>
                ))}
              </section>
            </>
          )}

          <div className="mt-10">
            <EducationalDisclaimer variant="footer" />
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}