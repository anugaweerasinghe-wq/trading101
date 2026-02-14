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
import { Shield, Globe, CheckCircle2, ArrowRight, Target, Sparkles, LineChart, Zap } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const DOMAIN = "https://tradinghq.vercel.app";

const LearnTradingGuide = () => {
  // --- HIGH-LEVEL SEO SCHEMAS (DO NOT REMOVE) ---
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

      <div className="min-h-screen bg-[#020405] text-slate-300 selection:bg-emerald-500/30 font-sans">
        <MarketSentimentTicker />
        <div className="pt-4"><Navigation /></div>

        {/* --- Optimized Hero: Balanced Typography --- */}
        <header className="relative pt-16 pb-12">
          <div className="container mx-auto px-6 text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
              <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-bold mb-6">
                Institutional Grade Education
              </Badge>
            </motion.div>
            
            <h1 className="text-3xl md:text-5xl font-black mb-6 tracking-tight text-white leading-tight uppercase italic">
              Practice with <span className="text-emerald-500">$10K Risk-Free</span>
            </h1>

            <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Master the 2026 financial landscape. Learn AI-assisted strategies and Bitcoin Layer 2 dynamics 
              using our high-fidelity simulator. No capital required.
            </p>

            <Link to="/trade/BTC">
              <Button size="lg" className="h-12 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                LAUNCH TERMINAL <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </header>

        <main className="container mx-auto px-6 py-8">
          
          {/* --- Grid Layout: SEO Content + Functional Tools --- */}
          <div className="grid lg:grid-cols-12 gap-8 items-start max-w-7xl mx-auto">
            
            {/* Left: SEO Narrative & Progress (40%) */}
            <section className="lg:col-span-5 space-y-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="text-emerald-500 w-4 h-4" />
                  <h2 className="text-xs uppercase tracking-widest font-black text-slate-500">Curriculum</h2>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">AI-Assisted Trading Foundations</h3>
              </div>

              <Card className="p-6 bg-white/[0.02] border-white/5 rounded-2xl backdrop-blur-md shadow-2xl">
                <div className="space-y-8">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <Zap className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Algorithmic Edge</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Analyze market sentiment and price action using AI models to filter noise from actual opportunities.</p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                      <Shield className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white uppercase tracking-tight mb-1">Risk Architecture</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Master the 1% risk rule. Protect your virtual $10K balance as if it were your last dollar.</p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-4">
                <LearningProgressTracker />
              </div>
            </section>

            {/* Right: Compound Calculator Tool (60%) */}
            <section className="lg:col-span-7">
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-2">
                  <LineChart className="text-emerald-500 w-4 h-4" />
                  <h2 className="text-xs uppercase tracking-widest font-black text-slate-500">Strategy Projections</h2>
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Compound Growth Simulator</h3>
              </div>
              
              <div className="p-1 rounded-[2rem] bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border border-white/5 shadow-2xl">
                <div className="bg-[#010203] rounded-[1.8rem] overflow-hidden p-2 md:p-6">
                  <CompoundCalculator />
                </div>
              </div>
            </section>
          </div>

          {/* --- Global Trust Features --- */}
          <section className="mt-24 py-16 border-t border-white/5 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-20" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { icon: Globe, title: "150+ Assets", desc: "Equities, Crypto & Tokenized Securities." },
                { icon: Shield, title: "No Financial Risk", desc: "Pure educational environment." },
                { icon: Zap, title: "2026 Ready", desc: "Optimized for Bitcoin L2 & AI Bots." }
              ].map((f, i) => (
                <div key={i} className="text-center group">
                  <div className="w-10 h-10 mx-auto mb-4 bg-emerald-500/5 rounded-full flex items-center justify-center group-hover:bg-emerald-500/20 transition-all">
                    <f.icon className="w-4 h-4 text-emerald-500" />
                  </div>
                  <h4 className="text-[11px] uppercase tracking-[0.2em] font-black text-white mb-2">{f.title}</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-16 pt-8 border-t border-white/5 text-center">
            <SocialShare title="I'm learning AI-assisted trading on TradeHQ! 🚀" description="Mastering 2026 trading with a free $10K simulator" variant="compact" />
          </div>
        </main>

        <CredibilityFooter />
      </div>
    </>
  );
};

export default LearnTradingGuide;
