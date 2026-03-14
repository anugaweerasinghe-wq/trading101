import { PremiumHero } from "@/components/PremiumHero";
import { PremiumFeatures } from "@/components/PremiumFeatures";
import { TopAssetsGrid } from "@/components/TopAssetsGrid";
import { WhatIsTradeHQ } from "@/components/WhatIsTradeHQ";
import { MarketTrends2026 } from "@/components/MarketTrends2026";
import { PremiumFAQ } from "@/components/PremiumFAQ";
import { MegaFooter } from "@/components/MegaFooter";
import { SocialProofTicker } from "@/components/SocialProofTicker";
import { HowItWorks } from "@/components/HowItWorks";

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
      <PremiumFAQ />
      <MegaFooter />
    </>
  );
}
