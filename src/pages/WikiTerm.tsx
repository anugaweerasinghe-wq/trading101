import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { tradingGlossary } from "@/lib/tradingGlossary";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, Clock, Share2, Zap, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import NotFound from "./NotFound";

const DOMAIN = "https://tradinghq.vercel.app";

const WikiTerm = () => {
  const { slug } = useParams<{ slug: string }>();
  const term = tradingGlossary.find((t) => t.slug === slug);

  if (!term) return <NotFound />;

  const relatedTerms = term.relatedTerms
    .map((rs) => tradingGlossary.find((t) => t.slug === rs))
    .filter(Boolean);

  const definedTermSchema = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.term,
    "description": term.definition,
    "inDefinedTermSet": {
      "@type": "DefinedTermSet",
      "name": "TradingHQ Trading Glossary"
    }
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `I just mastered "${term.term}" on TradingHQ! 🚀📈 Learn it here: ${DOMAIN}/wiki/${term.slug}`
    );
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const difficultyColor = {
    Novice: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    Intermediate: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    Pro: "bg-red-500/10 text-red-400 border-red-500/20",
  }[term.difficulty];

  return (
    <>
      <Helmet>
        <title>What is {term.term}? | TradingHQ Guide</title>
        <meta
          name="description"
          content={`Master ${term.term}. Rated ${term.difficulty}. ${term.readTime} read. ${term.definition.slice(0, 100)}...`}
        />
        <link rel="canonical" href={`${DOMAIN}/wiki/${term.slug}`} />
        <script type="application/ld+json">{JSON.stringify(definedTermSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-[#020405] text-slate-300 font-sans selection:bg-emerald-500/30">
        <Navigation />

        <main className="container mx-auto px-6 pt-24 pb-16 max-w-3xl">
          {/* Back link */}
          <Link
            to="/learn-trading-guide"
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-emerald-400 transition-colors mb-8"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Trading Guide
          </Link>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge className={`${difficultyColor} text-[10px] uppercase tracking-[0.15em] font-bold`}>
                {term.difficulty}
              </Badge>
              <Badge className="bg-white/5 text-slate-400 border-white/10 text-[10px] uppercase tracking-[0.15em] font-bold">
                <Clock className="w-3 h-3 mr-1" /> {term.readTime}
              </Badge>
              <Badge className="bg-white/5 text-slate-400 border-white/10 text-[10px] uppercase tracking-[0.15em] font-bold">
                {term.category}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2 leading-tight">
              What is <span className="text-emerald-400">{term.term}</span>?
            </h1>
          </motion.div>

          {/* Definition */}
          <Card className="mt-8 p-6 md:p-8 bg-white/[0.02] border-white/5 rounded-2xl backdrop-blur-md">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs uppercase tracking-[0.15em] font-black text-slate-500">Definition</h2>
            </div>
            <p className="text-sm md:text-base text-slate-300 leading-relaxed">{term.definition}</p>
          </Card>

          {/* Key Points */}
          <Card className="mt-4 p-6 md:p-8 bg-white/[0.02] border-white/5 rounded-2xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-4 h-4 text-emerald-500" />
              <h2 className="text-xs uppercase tracking-[0.15em] font-black text-slate-500">Key Points</h2>
            </div>
            <ul className="space-y-3">
              {term.keyPoints.map((point, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  <span className="text-sm text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          </Card>

          {/* Student Perspective */}
          <Card className="mt-4 p-6 md:p-8 bg-emerald-500/[0.03] border-emerald-500/10 rounded-2xl">
            <h2 className="text-xs uppercase tracking-[0.15em] font-black text-emerald-500 mb-3">
              💡 Why This Matters
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed italic">{term.studentPerspective}</p>
          </Card>

          {/* WhatsApp Share */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleWhatsAppShare}
              className="h-11 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.2)]"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share to WhatsApp
            </Button>
          </div>

          {/* Related Terms */}
          {relatedTerms.length > 0 && (
            <section className="mt-12 pt-8 border-t border-white/5">
              <h2 className="text-xs uppercase tracking-[0.15em] font-black text-slate-500 mb-4">Related Terms</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {relatedTerms.map((rt) =>
                  rt ? (
                    <Link key={rt.slug} to={`/wiki/${rt.slug}`}>
                      <Card className="p-4 bg-white/[0.02] border-white/5 hover:border-emerald-500/30 transition-all rounded-xl group">
                        <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">
                          {rt.term}
                        </p>
                        <p className="text-[10px] text-slate-500 mt-1">{rt.difficulty} · {rt.readTime}</p>
                      </Card>
                    </Link>
                  ) : null
                )}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link to="/trade/BTC">
              <Button className="h-11 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-10 rounded-xl">
                Practice Trading Now →
              </Button>
            </Link>
          </div>
        </main>

        <MegaFooter />
      </div>
    </>
  );
};

export default WikiTerm;
