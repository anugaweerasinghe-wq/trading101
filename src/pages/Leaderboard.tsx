import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Link } from "react-router-dom";
import { Trophy, TrendingUp, ArrowRight, Medal, Home, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const leaderboardData = [
  { rank: 1, username: "CryptoPhantom", portfolioValue: 14820, gain: 48.2, bestTrade: "BTC +12.4%" },
  { rank: 2, username: "AlphaTrader99", portfolioValue: 13950, gain: 39.5, bestTrade: "NVDA +18.7%" },
  { rank: 3, username: "SilentBull", portfolioValue: 13410, gain: 34.1, bestTrade: "SOL +22.1%" },
  { rank: 4, username: "RiskManager_X", portfolioValue: 12780, gain: 27.8, bestTrade: "ETH +9.3%" },
  { rank: 5, username: "PipHunter", portfolioValue: 12340, gain: 23.4, bestTrade: "EUR/USD +5.1%" },
  { rank: 6, username: "IndexSurfer", portfolioValue: 11950, gain: 19.5, bestTrade: "SPY +7.8%" },
  { rank: 7, username: "NightOwlTrader", portfolioValue: 11620, gain: 16.2, bestTrade: "TSLA +14.5%" },
  { rank: 8, username: "GoldDigger2026", portfolioValue: 11280, gain: 12.8, bestTrade: "XAU +6.2%" },
  { rank: 9, username: "MomentumKing", portfolioValue: 10890, gain: 8.9, bestTrade: "AAPL +4.8%" },
  { rank: 10, username: "SteadyEddie", portfolioValue: 10540, gain: 5.4, bestTrade: "QQQ +3.9%" },
];

function getRankIcon(rank: number) {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-400" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="text-sm font-mono text-muted-foreground w-5 text-center">{rank}</span>;
}

export default function Leaderboard() {
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
        <title>TradeHQ Leaderboard — Top Virtual Traders | Free Trading Simulator Rankings</title>
        <meta name="description" content="See the top-performing virtual traders on TradeHQ. Can you beat the leaderboard? Start with $10,000 free and climb the ranks." />
        <link rel="canonical" href="https://tradinghq.vercel.app/leaderboard" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="TradeHQ Leaderboard — Top Virtual Traders" />
        <meta property="og:description" content="See the top-performing virtual traders on TradeHQ. Can you beat the leaderboard? Start with $10,000 free and climb the ranks." />
        <meta property="og:url" content="https://tradinghq.vercel.app/leaderboard" />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="TradeHQ Leaderboard — Top Virtual Traders" />
        <meta name="twitter:description" content="See the top-performing virtual traders on TradeHQ. Can you beat the leaderboard? Start with $10,000 free and climb the ranks." />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
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
              <Badge variant="outline" className="mb-4 px-4 py-1.5 border-primary/30 text-primary">Live Rankings</Badge>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                TradeHQ Leaderboard — Top Virtual Traders
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Track the best-performing paper traders. Everyone starts with $10,000 virtual cash — can you reach the top?
              </p>
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
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-base rounded-2xl font-semibold">
                  Start Trading Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
