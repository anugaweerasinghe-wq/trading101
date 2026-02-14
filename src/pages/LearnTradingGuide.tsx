import { Navigation } from "@/components/Navigation";
import { MarketSentimentTicker } from "@/components/MarketSentimentTicker";
import { CompoundCalculator } from "@/components/CompoundCalculator";
import { LearningProgressTracker } from "@/components/LearningProgressTracker";
import { CredibilityFooter } from "@/components/CredibilityFooter";
import { SocialShare } from "@/components/SocialShare";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  TrendingUp, Shield, BarChart3, Coins, Globe, CheckCircle2, ArrowRight,
  BookOpen, Target, AlertTriangle, Brain, Bot, Layers, Sparkles, LineChart, Zap
} from "lucide-react";
import { Helmet } from "react-helmet-async";

const DOMAIN = "https://tradinghq.vercel.app";

const LearnTradingGuide = () => {
  // --- SEO STRUCTURED DATA (JSON-LD) ---
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "AI-Assisted Trading for Beginners: 2026 Guide",
    "description": "Master AI-assisted trading, Bitcoin Layer 2, and risk management with a free $10K simulator.",
    "author": { "@type": "Organization", "name": "TradeHQ" },
    "datePublished": "2026-02-01",
    "image": `${DOMAIN}/og-image.jpg`
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I start trading with no money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best way is to use a trading simulator like TradeHQ which provides $10,000 in virtual capital to practice risk-free."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>Learn AI Trading 2026 | Free $10K Risk-Free Simulator Guide</title>
        <meta name="description" content="Master AI-assisted trading in 2026. Learn Bitcoin Layer 2, tokenized securities & trading psychology. Practice with our free $10K crypto simulator." />
        <link rel="canonical" href={`${DOMAIN}/learn-trading-guide`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground">
        <MarketSentimentTicker />
        <div className="pt-6"><Navigation /></div>

        {/* --- Hero Section --- */}
        <header className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-1">
              <Sparkles className="w-3 h-3 mr-2" /> 2026 Education Series
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic">
              AI-ASSISTED TRADING <br />
              <span className="text-emerald-500 uppercase">FOR BEGINNERS</span>
            </h1>

            <div className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 mb-10 text-left">
              <p className="text-lg leading-relaxed text-gray-300">
                <strong className="text-white">Bottom line:</strong> Trading in 2026 is driven by AI and Bitcoin Layer 2. To succeed, students in Sri Lanka and globally should start with the <Link to="/trade/BTC" className="text-emerald-400 underline font-bold">TradeHQ $10K Simulator</Link> to master psychology before risking real capital.
              </p>
            </div>

            <div className="flex justify-center gap-4">
               <Link to="/trade/BTC">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8">
                    Open Free Simulator <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12">
          {/* --- Roadmap --- */}
          <section className="max-w-4xl mx-auto mb-20">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 bg-secondary/30 border-white/5">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Target className="text-emerald-500" /> Core Concepts
                </h2>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                    <div>
                      <span className="font-bold">AI Trading Bots:</span>
                      <p className="text-sm text-gray-400">Use AI to scan 150+ assets for patterns while you sleep.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1" />
                    <div>
                      <span className="font-bold">The 1% Rule:</span>
                      <p className="text-sm text-gray-400">Never risk more than 1% of your simulator balance on a single trade.</p>
                    </div>
                  </li>
                </ul>
              </Card>

              {/* Calculator Component */}
              <div className="space-y-6">
                <h3 className="text-xl font-bold italic underline decoration-emerald-500">Compound Interest Growth</h3>
                <CompoundCalculator />
              </div>
            </div>
          </section>

          {/* --- The "Sri Lanka Opportunity" Block --- */}
          <section className="bg-emerald-950/20 border-y border-white/5 py-16 px-6 mb-20 -mx-6">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">Mastering Global Markets from South Asia</h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Trading isn't just for Wall Street anymore. With the 2026 rise of tokenized securities, students can practice trading US Stocks (NVDA, AAPL) and Crypto (BTC) simultaneously. Our simulator uses real-time feeds to give you the exact experience of a professional desk in Colombo or New York.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <Globe className="text-emerald-500 mb-2" />
                  <h4 className="font-bold">Global Access</h4>
                  <p className="text-xs text-gray-500">Trade 24/7 across all timezones.</p>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <Shield className="text-emerald-500 mb-2" />
                  <h4 className="font-bold">Risk Management</h4>
                  <p className="text-xs text-gray-500">Built-in stop-loss education.</p>
                </div>
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <Zap className="text-emerald-500 mb-2" />
                  <h4 className="font-bold">Real Data</h4>
                  <p className="text-xs text-gray-500">Live price action via Supabase.</p>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section id="faq" className="max-w-3xl mx-auto mb-20">
             <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
             <div className="space-y-6">
                <div className="border-b border-white/5 pb-4">
                  <h4 className="font-bold text-emerald-400 mb-2">Is the simulator really free?</h4>
                  <p className="text-gray-400">Yes, TradeHQ is built for education. We provide $10,000 in virtual funds for students to learn without barriers.</p>
                </div>
                <div className="border-b border-white/5 pb-4">
                  <h4 className="font-bold text-emerald-400 mb-2">Which asset is best for beginners?</h4>
                  <p className="text-gray-400">We recommend starting with AAPL (Apple) for stability or BTC (Bitcoin) for learning how to handle volatility.</p>
                </div>
             </div>
          </section>

          <div className="text-center">
            <SocialShare title="I'm learning AI-assisted trading on TradeHQ! 🚀" description="Master 2026 trading with a free $10K simulator" variant="compact" />
          </div>
        </main>

        <CredibilityFooter />
      </div>
    </>
  );
};

export default LearnTradingGuide;
