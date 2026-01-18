import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { PageTransition } from "@/components/PageTransition";
import Index from "./pages/Index";
import Trade from "./pages/Trade";
import TradeAsset from "./pages/TradeAsset";
import Markets from "./pages/Markets";
import Portfolio from "./pages/Portfolio";
import Learn from "./pages/Learn";
import LessonDetail from "./pages/LessonDetail";
import LearnTradingGuide from "./pages/LearnTradingGuide";
import AIMentor from "./pages/AIMentor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <PageTransition key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/trade" element={<Trade />} />
        <Route path="/trade/:symbol" element={<TradeAsset />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/learn/:lessonId" element={<LessonDetail />} />
        <Route path="/learn-trading-guide" element={<LearnTradingGuide />} />
        <Route path="/ai-mentor" element={<AIMentor />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </PageTransition>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
