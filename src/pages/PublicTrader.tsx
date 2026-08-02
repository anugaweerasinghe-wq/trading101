import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EducationalDisclaimer } from "@/components/EducationalDisclaimer";
import { Loader2, Trophy, UserX } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { SITE_DOMAIN, STARTING_BALANCE_LABEL } from "@/lib/constants";

interface PublicTraderData {
  username: string;
  country: string | null;
  bio: string | null;
  createdAt: string;
  stats: {
    portfolio_value: number;
    pnl_pct: number;
    trades: number;
    win_rate: number;
    max_drawdown: number;
    badges: number;
  } | null;
}

export default function PublicTrader() {
  const { username = "" } = useParams();
  const [data, setData] = useState<PublicTraderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      setLoading(true);
      const { data: p } = await supabase
        .from("profiles")
        .select("id, username, country, bio, created_at, is_public")
        .eq("username", username)
        .eq("is_public", true)
        .maybeSingle();

      if (!p) {
        if (active) {
          setData(null);
          setLoading(false);
        }
        return;
      }

      const { data: s } = await supabase
        .from("trader_stats")
        .select("portfolio_value, pnl_pct, trades, win_rate, max_drawdown, badges")
        .eq("user_id", p.id)
        .maybeSingle();

      if (active) {
        setData({
          username: p.username,
          country: p.country,
          bio: p.bio,
          createdAt: p.created_at,
          stats: s
            ? {
                portfolio_value: Number(s.portfolio_value),
                pnl_pct: Number(s.pnl_pct),
                trades: s.trades,
                win_rate: Number(s.win_rate),
                max_drawdown: Number(s.max_drawdown),
                badges: s.badges,
              }
            : null,
        });
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [username]);

  const title = data
    ? `${data.username} — Practice Trading Stats | TradeHQ`
    : "Trader profile | TradeHQ";
  const description = data
    ? `Public practice-trading record for ${data.username} on TradeHQ: simulated portfolio value, percentage return, trade count and win rate on ${STARTING_BALANCE_LABEL} of virtual capital. Educational simulation only.`
    : "This TradeHQ trader profile is private or does not exist.";

  const schema = data
    ? {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        mainEntity: {
          "@type": "Person",
          name: data.username,
          url: `${SITE_DOMAIN}/trader/${data.username}`,
          ...(data.country ? { homeLocation: { "@type": "Place", name: data.country } } : {}),
        },
      }
    : null;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_DOMAIN}/trader/${username}`} />
        <meta name="robots" content={data ? "index, follow" : "noindex, follow"} />
        {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-28 pb-20 max-w-4xl">
          <Breadcrumbs items={[{ label: "Leaderboard", href: "/leaderboard" }, { label: username }]} />

          {loading ? (
            <div className="py-24 text-center text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            </div>
          ) : !data ? (
            <div className="py-24 text-center">
              <UserX className="w-10 h-10 mx-auto mb-4 text-muted-foreground" />
              <h1 className="text-2xl font-bold mb-2">This profile is private or unavailable</h1>
              <p className="text-sm text-muted-foreground mb-6">
                The trader may have set their profile to private, or the username does not exist.
              </p>
              <Link to="/leaderboard">
                <Button className="!text-black font-bold rounded-xl">Back to leaderboard</Button>
              </Link>
            </div>
          ) : (
            <>
              <header className="mt-8 mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-2xs uppercase tracking-widest text-primary mb-3">
                  <Trophy className="h-3 w-3" /> Public practice profile
                </div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{data.username}</h1>
                <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                  {data.bio ||
                    `Practice-trading record on TradeHQ, starting from ${STARTING_BALANCE_LABEL} of virtual capital.`}
                  {data.country ? ` · ${data.country}` : ""}
                </p>
                <p className="text-2xs text-muted-foreground mt-2">
                  Member since {new Date(data.createdAt).toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                </p>
              </header>

              {data.stats ? (
                <section className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
                  {[
                    { label: "Portfolio value", value: `$${data.stats.portfolio_value.toLocaleString(undefined, { maximumFractionDigits: 0 })}` },
                    {
                      label: "Total return",
                      value: `${data.stats.pnl_pct >= 0 ? "+" : ""}${data.stats.pnl_pct.toFixed(1)}%`,
                      color: data.stats.pnl_pct >= 0 ? "text-profit" : "text-loss",
                    },
                    { label: "Trades placed", value: String(data.stats.trades) },
                    { label: "Win rate", value: `${data.stats.win_rate}%` },
                  ].map((k) => (
                    <Card key={k.label} className="p-5 bg-white/[0.02] border-white/10">
                      <p className="text-2xs uppercase tracking-widest text-muted-foreground mb-1">{k.label}</p>
                      <p className={`text-xl font-bold ${k.color ?? ""}`}>{k.value}</p>
                    </Card>
                  ))}
                </section>
              ) : (
                <p className="text-sm text-muted-foreground mb-10">
                  This trader has not synced any practice statistics yet.
                </p>
              )}

              <Card className="p-5 bg-white/[0.02] border-white/10 mb-10">
                <h2 className="font-semibold mb-2">How to read these numbers</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All figures come from a simulated account funded with virtual money.
                  They are not audited, do not represent real trading results, and do not
                  predict future performance. Percentage return is measured against the
                  same {STARTING_BALANCE_LABEL} starting balance every member receives, and
                  max drawdown ({data.stats ? `${data.stats.max_drawdown.toFixed(1)}%` : "n/a"})
                  shows the largest peak-to-trough decline recorded in the simulator.
                </p>
              </Card>

              <EducationalDisclaimer variant="footer" />
            </>
          )}
        </main>
        <MegaFooter />
      </div>
    </>
  );
}