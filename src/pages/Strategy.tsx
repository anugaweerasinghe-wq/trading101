import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { SEOSection } from "@/components/SEOSection";
import { AIAnswerBlock } from "@/components/seo/AIAnswerBlock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, ArrowRight } from "lucide-react";
import { STRATEGIES, SITE_DOMAIN } from "@/lib/seoData";

export default function Strategy() {
  const { slug } = useParams<{ slug: string }>();
  const s = STRATEGIES.find((x) => x.slug === slug);
  if (!s) return <Navigate to="/strategy" replace />;

  const title = `${s.name} Strategy — How It Works, When to Use It | TradeHQ`;
  const description = `${s.name}: ${s.oneLiner} Step-by-step rules, win-rate expectations and a worked example. Practise it free with $100K virtual cash. (Educational simulation only — not financial advice.)`;
  const url = `${SITE_DOMAIN}/strategy/${s.slug}`;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: `${s.name} trading strategy`,
          description: s.oneLiner,
          step: s.steps.map((st, i) => ({ "@type": "HowToStep", position: i + 1, text: st })),
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-12 max-w-4xl">
          <header className="mb-10">
            <p className="text-xs uppercase tracking-widest text-emerald-400 mb-3 flex items-center gap-2"><Target className="h-3 w-3" />Trading strategy</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{s.name}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{s.oneLiner}</p>
            <Link to="/trade"><Button className="mt-6">Practise this strategy <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </header>

          <AIAnswerBlock
            question={`What is the ${s.name} trading strategy and does it work?`}
            answer={`${s.name}: ${s.oneLiner} ${s.successRate} Best for ${s.bestFor.toLowerCase()} Practise it free on TradeHQ with $100,000 in virtual cash. (Educational simulation only — not financial advice.)`}
            className="mb-6"
          />

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-5 border-emerald-500/20">
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">Best for</h3>
              <p className="text-sm">{s.bestFor}</p>
            </Card>
            <Card className="p-5 border-rose-500/20">
              <h3 className="text-sm font-semibold text-rose-400 mb-2">Worst for</h3>
              <p className="text-sm">{s.worstFor}</p>
            </Card>
          </div>

          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">The rules</h2>
            <ol className="space-y-4">
              {s.steps.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm">{i + 1}</span>
                  <span className="text-sm pt-1">{step}</span>
                </li>
              ))}
            </ol>
          </Card>

          <Card className="p-6 mb-6">
            <h3 className="text-sm font-semibold mb-2">Worked example</h3>
            <p className="text-sm font-mono bg-black/30 p-3 rounded">{s.example}</p>
          </Card>

          <Card className="p-5 mb-8 bg-gradient-to-br from-emerald-500/5 to-transparent">
            <h3 className="text-sm font-semibold mb-1">Realistic expectations</h3>
            <p className="text-sm text-muted-foreground">{s.successRate}</p>
            <p className="mt-2 text-xs text-muted-foreground/70 italic">(Educational simulation only — not financial advice.)</p>
          </Card>

          <section className="mb-10">
            <h2 className="text-xl font-semibold mb-3">More strategies</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {STRATEGIES.filter((x) => x.slug !== s.slug).map((x) => (
                <Link key={x.slug} to={`/strategy/${x.slug}`} className="text-sm p-3 rounded-lg border border-white/10 hover:border-emerald-500/40">{x.name}</Link>
              ))}
            </div>
          </section>

          <SEOSection
            path={`/strategy/${s.slug}`}
            breadcrumbs={[
              { label: "Strategies", href: "/strategy" },
              { label: s.name },
            ]}
            faqs={[
              { question: `Does ${s.name} actually work?`, answer: s.successRate },
              { question: `What's the best market for ${s.name}?`, answer: s.bestFor },
              { question: `Can I practise ${s.name} for free?`, answer: `Yes — TradeHQ's $100K practice account is the right place to test ${s.name} before risking real money.` },
            ]}
            faqHeading={`${s.name} FAQ`}
          />
        </main>
        <MegaFooter />
      </div>
    </>
  );
}

export function StrategyIndex() {
  const title = "Trading Strategies — Scalping, Swing, DCA, RSI & More | TradeHQ";
  const description = "Free trading strategy guides: scalping, swing trading, day trading, DCA, RSI, MACD. Rules, win rates and worked examples. Practise on a $100K virtual account.";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_DOMAIN}/strategy`} />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-12 max-w-5xl">
          <h1 className="text-4xl font-bold mb-2">Trading Strategies</h1>
          <p className="text-muted-foreground mb-8">Pick one. Master it on the practice account before risking real capital.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {STRATEGIES.map((s) => (
              <Link key={s.slug} to={`/strategy/${s.slug}`}>
                <Card className="p-6 hover:border-emerald-500/40 transition">
                  <h2 className="text-xl font-bold">{s.name}</h2>
                  <p className="text-sm text-muted-foreground mt-2">{s.oneLiner}</p>
                </Card>
              </Link>
            ))}
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}