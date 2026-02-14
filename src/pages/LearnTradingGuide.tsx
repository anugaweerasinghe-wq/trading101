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
  Shield, Globe, CheckCircle2, ArrowRight,
  Target, Sparkles, LineChart, Zap
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";

const DOMAIN = "https://tradinghq.vercel.app";

const LearnTradingGuide = () => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "headline": "AI-Assisted Trading for Beginners: 2026 Guide",
    "description": "Master AI-assisted trading, Bitcoin Layer 2, and risk management with a free $10K simulator.",
    "author": { "@type": "Organization", "name": "TradeHQ" },
    "datePublished": "2026-02-01",
    "image": `${DOMAIN}/og-image.jpg`
  };

  return (
    <>
      <Helmet>
        <title>Learn AI Trading 2026 | Free $10K Simulator</title>
        <meta name="description" content="Master AI-assisted trading in 2026. Learn Bitcoin Layer 2, tokenized securities & trading psychology. Practice with our free $10K crypto simulator." />
        <link rel="canonical" href={`${DOMAIN}/learn-trading-guide`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#030708] text-foreground relative overflow-hidden">
        {/* $10k Dev Team Glow Effects */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none" />
        
        <MarketSentimentTicker />
        <div className="pt-6 relative z-10"><Navigation /></div>

        {/* --- Hero Section --- */}
        <header className="relative pt-20 pb-16">
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mb-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
            >
              <Sparkles className="w-3.5 h-3.5" /> 2026 Pro Edition
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-black mb-6 tracking-tight leading-[1.1]"
            >
              PRACTICE WITH <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-200 to-emerald-500">
                $10K RISK-FREE
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Master 2026 market dynamics with our institutional-grade simulator. 
              No deposits. No risk. Just pure skill building.
            </motion.p>

            <div className="flex justify-center">
               <Link to="/trade/BTC">
                  <Button size="lg" className="h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-10 rounded-2xl shadow-[0_0_40px_rgba(16,185,129,0.2)] transition-all hover:scale-[1.02] active:scale-[0.98]">
                    START TRADING NOW <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
               </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 relative z-10">
          
          {/* --- The Balanced Grid: Concepts & Calculator --- */}
          <section className="max-w-7xl mx-auto mb-32">
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              
              {/* Left Column: Core Concepts */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <Target className="text-emerald-400 w-5 h-5" />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white">Mastery Roadmap</h2>
                </div>
                
                <div className="flex-1 p-8 md:p-10 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col justify-center">
                  <ul className="space-y-10">
                    <li className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                        <Zap className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-white block mb-1">AI Bot Assistance</span>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                          Deploy neural-network based indicators to identify high-probability setups in real-time.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start gap-5">
                      <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-lg">
                        <Shield className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-white block mb-1">Capital Protection</span>
                        <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                          Learn the strict 1% risk management rule used by top-tier proprietary trading firms.
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>

              {/* Right Column: Calculator */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                    <LineChart className="text-emerald-400 w-5 h-5" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">Compound Strategy</h3>
                </div>
                
                {/* Visual Frame for the Calculator */}
                <div className="p-1 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-[2.5rem]">
                  <div className="bg-[#050a0b] rounded-[2.4rem] overflow-hidden shadow-2xl p-2 md:p-4">
                    <CompoundCalculator />
                  </div>
                </div>
              </motion.div>
              
            </div>
          </section>

          {/* --- Global Features Section --- */}
          <section className="relative py-24 px-6 -mx-6 bg-emerald-950/5 border-y border-white/5">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Globe, title: "Global Assets", desc: "Trade US Equities, Crypto, and FX pairs from one terminal." },
                  { icon: Shield, title: "Zero Risk", desc: "100% simulated environment. No real money required." },
                  { icon: Zap, title: "Instant Execution", desc: "Experience zero-lag order matching on live market feeds." }
                ].map((f, i) => (
                  <div key={i} className="group p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] transition-all duration-300">
                    <f.icon className="text-emerald-500 w-8 h-8 mb-6 group-hover:scale-110 transition-transform" />
                    <h4 className="font-bold text-xl text-white mb-3">{f.title}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="text-center py-20">
            <SocialShare title="I'm practicing on TradeHQ! 🚀" description="Mastering 2026 trading risk-free." variant="compact" />
          </div>
        </main>

        <CredibilityFooter />
      </div>
    </>
  );
};

export default LearnTradingGuide;
