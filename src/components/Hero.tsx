import { Helmet } from "react-helmet-async";
import { PremiumHero } from "@/components/PremiumHero";
import { PremiumFeatures } from "@/components/PremiumFeatures";
import { TopAssetsGrid } from "@/components/TopAssetsGrid";
import { WhatIsTradeHQ } from "@/components/WhatIsTradeHQ";
import { MarketTrends2026 } from "@/components/MarketTrends2026";
import { PremiumFAQ } from "@/components/PremiumFAQ";
import { MegaFooter } from "@/components/MegaFooter";
import { Navigation } from "@/components/Navigation";

export function Hero() {
  return (
    <>
      {/* Premium Hero Section */}
      <PremiumHero />

      {/* What is TradeHQ? - AI Overview answerable section */}
      <WhatIsTradeHQ />

      {/* Why TradeHQ - Features */}
      <PremiumFeatures />

      {/* Top Assets Grid for SEO Internal Linking */}
      <TopAssetsGrid />

      {/* 2026 Market Trends Section */}
      <MarketTrends2026 />

      {/* FAQ Section for SEO */}
      <PremiumFAQ />

      {/* Mega Footer - Comprehensive SEO Internal Linking */}
      <MegaFooter />
    </>
  );
}
