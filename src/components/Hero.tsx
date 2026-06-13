import { PremiumHero } from "@/components/PremiumHero";
import { PremiumFeatures } from "@/components/PremiumFeatures";
import { TopAssetsGrid } from "@/components/TopAssetsGrid";
import { WhatIsTradeHQ } from "@/components/WhatIsTradeHQ";
import { MarketTrends2026 } from "@/components/MarketTrends2026";
import { PremiumFAQ } from "@/components/PremiumFAQ";
import { MegaFooter } from "@/components/MegaFooter";
import { SocialProofTicker } from "@/components/SocialProofTicker";
import { HowItWorks } from "@/components/HowItWorks";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <>
      <PremiumHero />
      <SocialProofTicker />
      <WhatIsTradeHQ />
      <HowItWorks />
      <PremiumFeatures />
      <TopAssetsGrid />
      <MarketTrends2026 />
      {/* Roadmap teaser — not in navigation, only linked here + on /learn */}
      <section className="container mx-auto px-4 py-12">
        <Link
          to="/roadmap"
          className="group block relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-500/10 via-background to-fuchsia-500/10 backdrop-blur-xl p-8 md:p-10 hover:border-emerald-500/40 transition-all"
        >
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition" />
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-emerald-400 mb-3">
                <Sparkles className="h-3 w-3" /> What's coming next
              </div>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight">The Future of TradeHQ</h3>
              <p className="mt-2 text-muted-foreground max-w-xl">Realistic portfolio projections, optional sign-in, expanded courses & more — all 100% free.</p>
            </div>
            <div className="inline-flex items-center gap-2 text-emerald-400 font-medium whitespace-nowrap">
              See the roadmap <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition" />
            </div>
          </div>
        </Link>
      </section>
      <PremiumFAQ />
      <MegaFooter />
    </>
  );
}
