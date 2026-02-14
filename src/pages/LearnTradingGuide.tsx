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
        <title>Learn AI Trading 2026 | Free $10K Simulator</title>
        <meta name="description" content="Master AI-assisted trading in 2026. Learn Bitcoin Layer 2, tokenized securities & trading psychology. Practice with our free $10K crypto simulator." />
        <link rel="canonical" href={`${DOMAIN}/learn-trading-guide`} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Ambient Background Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />
        
        <MarketSentimentTicker />
        <div className="pt-6 relative z-10"><Navigation /></div>

        {/* --- Hero Section --- */}
        <header className="relative pt-24 pb-20">
          <div className="relative z-10 container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center justify-center gap-2 mb-6 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm shadow-[0_0_15px_rgba(16,185,129,0.1)]"
            >
              <Sparkles className="w-4 h-4 animate-pulse" /> 2026 Education Series
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-black mb-8 tracking-tighter"
            >
              AI-ASSISTED TRADING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-600">FOR BEGINNERS</span>
            </motion.h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl mx-auto bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-2xl p-6 md:p-8 mb-10 text-left shadow-2xl relative overflow-hidden group"
            >
              {/* Subtle hover effect for the box */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              <p className="text-lg leading-relaxed text-gray-300 relative z-10">
                <strong className="text-white">Bottom line:</strong> Trading in 2026 is driven by AI and Bitcoin Layer 2. Start with the <Link to="/trade/BTC" className="text-emerald-400 underline decoration-emerald-500/30 underline-offset-4 font-bold hover:text-emerald-300 transition-colors">TradeHQ $10K Simulator</Link> to master psychology before risking real capital.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex justify-center"
            >
               <Link to="/trade/BTC">
                  <Button size="lg" className="h-14 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all hover:-translate-y-1">
                    Open Free Simulator <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
               </Link>
            </motion.div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 space-y-24 relative z-10">
          
          {/* --- Roadmap & Calculator Grid --- */}
          <section className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              
              {/* Left Column: Concepts */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-white/5 rounded-xl border border-white/10">
                    <Target className="text-emerald-400 w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold tracking-tight text-white">Core Concepts</h2>
                </div>
                
                <Card className="p-8 md:p-10 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] rounded-full transition-opacity group-hover:bg-emerald-500/10" />
                  
                  <ul className="space-y-8 relative z-10">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-white block mb-1">AI Trading Bots</span>
                        <p className="text-gray-400 leading-relaxed">Scan 150+ assets for patterns automatically while you sleep. Leverage machine learning to identify breakouts.</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-white block mb-1">The 1% Rule</span>
                        <p className="text-gray-400 leading-relaxed">Never risk more than 1% of your simulator balance per trade. This ensures longevity and teaches proper risk scaling.</p>
                      </div>
                    </li>
                  </ul>
                </Card>
              </motion.div>

              {/* Right Column: Calculator */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
                    <LineChart className="text-emerald-400 w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-bold tracking-tight text-white">Compound Growth</h3>
                </div>
                
                {/* Wrapped the calculator in a subtle glass container to frame it beautifully */}
                <div className="p-1 md:p-2 bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/10 shadow-2xl">
                  <div className="bg-background rounded-[1.25rem] overflow-hidden">
                    <CompoundCalculator animateBars />
                  </div>
                </div>
              </motion.div>
              
            </div>
          </section>

          {/* --- Sri Lanka Opportunity / Features --- */}
          <section className="relative py-20 px-6 -mx-6 bg-black/40 border-y border-white/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-emerald-900/20 via-transparent to-transparent pointer-events-none" />
            
            <div className="max-w-6xl mx-auto text-center space-y-12 relative z-10">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">Mastering Global Markets from South Asia</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  Trade US Stocks (NVDA, AAPL) and Crypto (BTC) simultaneously. Real-time feeds provide a professional trading desk experience from Colombo or New York.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {[
                  { icon: Globe, title: "Global Access", desc: "Trade 24/7 across all major global timezones seamlessly." },
                  { icon: Shield, title: "Risk Management", desc: "Built-in stop-loss education and capital preservation tracking." },
                  { icon: Zap, title: "Real Data", desc: "Live, millisecond-accurate price action via Supabase infrastructure." }
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    className="p-8 bg-white/[0.02] rounded-3xl border border-white/5 hover:bg-white/[0.04] hover:border-white/10 transition-all duration-300 group text-left"
                  >
                    <div className="w-12 h-12 bg-black/50 rounded-2xl flex items-center justify-center border border-white/10 mb-6 group-hover:scale-110 group-hover:border-emerald-500/30 transition-all">
                      <f.icon className="text-emerald-400 w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-xl text-white mb-2">{f.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FAQ --- */}
          <section id="faq" className="max-w-3xl mx-auto space-y-12">
             <div className="text-center">
               <h2 className="text-3xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
               <p className="text-gray-400">Everything you need to know about the TradeHQ simulator.</p>
             </div>
             
             <div className="space-y-6">
                {[
                  { q: "Is the simulator really free?", a: "Yes, TradeHQ provides $10,000 virtual funds to learn risk-free. There are no hidden fees to practice." },
                  { q: "Which asset is best for beginners?", a: "Start with AAPL for stability to learn mechanics, or BTC if you are ready to learn how to manage rapid volatility." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <h4 className="font-bold text-emerald-400 text-lg mb-2 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item.q}
                    </h4>
                    <p className="text-gray-400 pl-3.5 leading-relaxed">{item.a}</p>
                  </motion.div>
                ))}
             </div>
          </section>

          <div className="text-center pt-8 pb-12">
            <SocialShare title="I'm learning AI-assisted trading on TradeHQ! 🚀" description="Master 2026 trading with a free $10K simulator" variant="compact" />
          </div>
        </main>

        <CredibilityFooter />
      </div>
    </>
  );
};

export default LearnTradingGuide;
