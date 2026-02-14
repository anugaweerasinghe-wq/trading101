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

      <div className="min-h-screen bg-background text-foreground">
        <MarketSentimentTicker />
        <div className="pt-6"><Navigation /></div>

        {/* --- Hero Section --- */}
        <header className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
          
          <div className="relative z-10 container mx-auto px-6 text-center">
            <Badge className="mb-4 bg-emerald-500/20 text-emerald-400 border-emerald-500/30 px-4 py-1 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4 animate-pulse" /> 2026 Education Series
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter italic">
              AI-ASSISTED TRADING <br />
              <span className="text-emerald-500 uppercase">FOR BEGINNERS</span>
            </h1>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 mb-10 text-left"
            >
              <p className="text-lg leading-relaxed text-gray-300">
                <strong className="text-white">Bottom line:</strong> Trading in 2026 is driven by AI and Bitcoin Layer 2. Start with the <Link to="/trade/BTC" className="text-emerald-400 underline font-bold hover:text-emerald-300 transition">TradeHQ $10K Simulator</Link> to master psychology before risking real capital.
              </p>
            </motion.div>

            <div className="flex justify-center gap-4">
               <Link to="/trade/BTC">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 transition-transform hover:scale-105">
                    Open Free Simulator <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
               </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-6 py-12 space-y-20">
          {/* --- Roadmap & Calculator --- */}
          <section className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              
              <Card className="p-8 bg-secondary/30 border border-white/5 hover:shadow-lg transition-all">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <Target className="text-emerald-500 animate-pulse" /> Core Concepts
                </h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 animate-bounce" />
                    <div>
                      <span className="font-bold text-white">AI Trading Bots:</span>
                      <p className="text-sm text-gray-400">Scan 150+ assets for patterns automatically while you sleep.</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-1 animate-bounce" />
                    <div>
                      <span className="font-bold text-white">The 1% Rule:</span>
                      <p className="text-sm text-gray-400">Never risk more than 1% of your simulator balance per trade.</p>
                    </div>
                  </li>
                </ul>
              </Card>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                <h3 className="text-xl font-bold italic underline decoration-emerald-500 mb-4">Compound Interest Growth</h3>
                <CompoundCalculator animateBars />
              </motion.div>
            </div>
          </section>

          {/* --- Sri Lanka Opportunity / Features --- */}
          <section className="bg-emerald-950/20 border-y border-white/5 py-16 px-6 -mx-6">
            <div className="max-w-5xl mx-auto text-center space-y-8">
              <h2 className="text-3xl font-bold">Mastering Global Markets from South Asia</h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                Trade US Stocks (NVDA, AAPL) and Crypto (BTC) simultaneously. Real-time feeds provide a professional trading desk experience from Colombo or New York.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {[
                  { icon: Globe, title: "Global Access", desc: "Trade 24/7 across all timezones." },
                  { icon: Shield, title: "Risk Management", desc: "Built-in stop-loss education." },
                  { icon: Zap, title: "Real Data", desc: "Live price action via Supabase." }
                ].map((f, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.6 }}
                    className="p-6 bg-black/40 rounded-xl border border-white/5 hover:scale-105 transition-transform"
                  >
                    <f.icon className="text-emerald-500 mb-3 w-6 h-6" />
                    <h4 className="font-bold text-white">{f.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* --- FAQ --- */}
          <section id="faq" className="max-w-3xl mx-auto space-y-8">
             <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
             <div className="space-y-6">
                {[
                  { q: "Is the simulator really free?", a: "Yes, TradeHQ provides $10,000 virtual funds to learn risk-free." },
                  { q: "Which asset is best for beginners?", a: "Start with AAPL for stability or BTC for learning volatility." }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="border-b border-white/5 pb-4"
                  >
                    <h4 className="font-bold text-emerald-400 mb-2">{item.q}</h4>
                    <p className="text-gray-400">{item.a}</p>
                  </motion.div>
                ))}
             </div>
          </section>

          <div className="text-center mt-12">
            <SocialShare title="I'm learning AI-assisted trading on TradeHQ! 🚀" description="Master 2026 trading with a free $10K simulator" variant="compact" />
          </div>
        </main>

        <CredibilityFooter />
      </div>
    </>
  );
};

export default LearnTradingGuide;
