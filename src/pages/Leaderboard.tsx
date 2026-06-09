import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Link } from "react-router-dom";
import { Trophy, ArrowRight, Medal, Home, ChevronRight, Clock, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssetFAQSection } from "@/components/AssetFAQSection";
import { useEffect, useState } from "react";
import {
  getLeaderboard,
  formatTimeAgo,
  formatTimeUntil,
  type LeaderboardTrader,
} from "@/lib/leaderboardEngine";

const LEADERBOARD_FAQS = [
  {
    question: "Is the TradeHQ leaderboard real?",
    answer:
      "The current leaderboard shows demo rankings to illustrate how the system works. Real user rankings roll out in the next release. (Educational simulation only — not financial advice.)",
  },
  {
    question: "How do I climb the leaderboard?",
    answer:
      "Trade your $100,000 of virtual cash to grow your portfolio percentage gain. Top performers by total % return rank highest. Risk management and consistency matter more than swinging for huge wins.",
  },
  {
    question: "Do I need an account to compete?",
    answer:
      "No — start trading with no signup. Your portfolio is tracked locally; opt-in account creation for leaderboard submission is coming soon.",
  },
  {
    question: "How often is the leaderboard updated?",
    answer:
      "Rankings auto-evolve every 3 days based on simulated market performance. Each virtual trader's portfolio drifts realistically based on their personality (aggressive, balanced, or steady), so the standings shift organically over time.",
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
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardTrader[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now());
  const [nextUpdate, setNextUpdate] = useState<number>(Date.now());
  const [, setTick] = useState(0);

  useEffect(() => {
    const board = getLeaderboard();
    setLeaderboardData(board.traders);
    setLastUpdate(board.lastUpdate);
    setNextUpdate(board.nextUpdate);

    // Re-check on focus + every minute (in case the 3-day window closes while page is open)
    const interval = setInterval(() => {
      const next = getLeaderboard();
      setLeaderboardData(next.traders);
      setLastUpdate(next.lastUpdate);
      setNextUpdate(next.nextUpdate);
      setTick((t) => t + 1);
    }, 60_000);

    const onFocus = () => {
      const next = getLeaderboard();
      setLeaderboardData(next.traders);
      setLastUpdate(next.lastUpdate);
      setNextUpdate(next.nextUpdate);
    };
    window.addEventListener("focus", onFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tradinghq.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Leaderboard", item: "https://tradinghq.vercel.app/leaderboard" },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Leaderboard — Top Virtual Traders 2026 | TradeHQ Simulator Rankings</title>
        <meta name="description" content="See who's crushing it with $100K virtual cash. Real-time leaderboard of the best paper traders on TradeHQ. Can you beat the top 10?" />
        <link rel="canonical" href="https://tradinghq.vercel.app/leaderboard" />
        <meta name="robots" content="index, follow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeHQ Leaderboard — Top Virtual Traders 2026" />
        <meta property="og:description" content="Live rankings of the best paper traders. Start with $100K and climb the leaderboard." />
        <meta property="og:url" content="https://tradinghq.vercel.app/leaderboard" />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeHQ Leaderboard — Top Virtual Traders 2026" />
        <meta name="twitter:description" content="Live rankings of the best paper traders. Start with $100K and climb the leaderboard." />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
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
                Live Rankings
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                TradeHQ Leaderboard — Top Virtual Traders
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track the best-performing paper traders. Everyone starts with $100,000 virtual cash — can you reach the top?
              </p>
              <div className="mt-4 inline-flex items-center gap-3 text-2xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Updated {formatTimeAgo(lastUpdate)}
                </span>
                <span className="opacity-50">•</span>
                <span className="inline-flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" />
                  Next refresh in {formatTimeUntil(nextUpdate)}
                </span>
              </div>
            </div>

            {/* Leaderboard Table */}
            <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl overflow-hidden" style={{ backdropFilter: "blur(12px)" }}>
              {/* Header */}
              <div className="hidden md:grid grid-cols-5 gap-4 px-6 py-4 bg-white/[0.03] border-b border-white/[0.06] text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <span>Rank</span>
                <span>Trader</span>
                <span className="text-right">Portfolio Value</span>
                <span className="text-right">% Gain/Loss</span>
                <span className="text-right">Best Trade</span>
              </div>

              {leaderboardData.map((trader) => (
                <div
                  key={trader.rank}
                  className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 px-4 md:px-6 py-4 border-b border-white/[0.04] hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {getRankIcon(trader.rank)}
                    <span className="font-semibold text-sm md:hidden">{trader.username}</span>
                  </div>
                  <div className="hidden md:flex items-center">
                    <span className="font-semibold text-sm text-foreground">{trader.username}</span>
                  </div>
                  <div className="flex items-center justify-end md:justify-end">
                    <span className="font-mono text-sm text-foreground">
                      ${trader.portfolioValue.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-end">
                    <Badge variant="outline" className={trader.gain >= 0 ? "text-profit border-profit/30" : "text-loss border-loss/30"}>
                      {trader.gain >= 0 ? "+" : ""}{trader.gain.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="hidden md:flex items-center justify-end">
                    <span className="text-xs text-muted-foreground">{trader.bestTrade}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-6">Start trading now to appear on the leaderboard</p>
              <Link to="/trade">
                <Button size="lg" className="bg-primary hover:bg-primary/90 !text-black px-10 py-6 text-base rounded-2xl font-bold shadow-[0_0_28px_hsl(168_100%_50%/0.35)]">
                  Start Trading Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <AssetFAQSection
              assetName="Leaderboard"
              assetSymbol="Leaderboard"
              faqs={LEADERBOARD_FAQS}
            />
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
