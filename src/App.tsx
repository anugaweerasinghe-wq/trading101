import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PageTransition } from "@/components/PageTransition";
import { MobileBottomNav } from "@/components/MobileBottomNav";

import Index from "./pages/Index";

const Trade = lazy(() => import("./pages/Trade"));
const TradeAsset = lazy(() => import("./pages/TradeAsset"));
const Markets = lazy(() => import("./pages/Markets"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Learn = lazy(() => import("./pages/Learn"));
const LessonDetail = lazy(() => import("./pages/LessonDetail"));
const LearnTradingGuide = lazy(() => import("./pages/LearnTradingGuide"));
const AIMentor = lazy(() => import("./pages/AIMentor"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const SectorPillar = lazy(() => import("./pages/SectorPillar"));
const WikiTerm = lazy(() => import("./pages/WikiTerm"));
const NicheAsset = lazy(() => import("./pages/NicheAsset"));
const SEOAudit = lazy(() => import("./pages/SEOAudit"));
const AdminValidator = lazy(() => import("./pages/AdminValidator"));
const AdminEditor = lazy(() => import("./pages/AdminEditor"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const LearnArticle = lazy(() => import("./pages/LearnArticle"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1000 * 60 * 5 } },
});

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/trade" element={<Trade />} />
          <Route path="/trade/:symbol" element={<TradeAsset />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/article/:slug" element={<LearnArticle />} />
          <Route path="/learn/:lessonId" element={<LessonDetail />} />
          <Route path="/learn-trading-guide" element={<LearnTradingGuide />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/ai-mentor" element={<AIMentor />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/sectors/:sectorId" element={<SectorPillar />} />
          <Route path="/wiki/:slug" element={<WikiTerm />} />
          <Route path="/niche/:symbol" element={<NicheAsset />} />

          {/* ADMIN ROUTES — kept exactly as original */}
          <Route path="/admin/seo-audit" element={<SEOAudit />} />
          <Route path="/admin/validator" element={<AdminValidator />} />
          <Route path="/admin/editor" element={<AdminEditor />} />

          {/* CATCH-ALL */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageTransition>
    </Suspense>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner position="top-center" richColors closeButton />
        <BrowserRouter>
          <AnimatedRoutes />
          <MobileBottomNav />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
