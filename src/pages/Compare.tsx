import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { SEOSection } from "@/components/SEOSection";
import { AIAnswerBlock } from "@/components/seo/AIAnswerBlock";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { COMPARE_PAIRS, SITE_DOMAIN } from "@/lib/seoData";

export default function Compare() {
  const { slug } = useParams<{ slug: string }>();
  const pair = COMPARE_PAIRS.find((p) => p.slug === slug);
  if (!pair) return <Navigate to="/compare" replace />;

  const title = `${pair.a.name} vs ${pair.b.name} — Which Should You Trade in 2026? | TradeHQ`;
  const description = `${pair.a.name} vs ${pair.b.name}: side-by-side comparison on returns, volatility, use case and risk. Practise both risk-free with $100K virtual cash on TradeHQ. (Educational simulation only — not financial advice.)`;
  const url = `${SITE_DOMAIN}/compare/${pair.slug}`;

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
          "@type": "Article",
          headline: `${pair.a.name} vs ${pair.b.name}`,
          description,
          author: { "@type": "Organization", name: "TradeHQ" },
          publisher: { "@type": "Organization", name: "TradeHQ" },
          mainEntityOfPage: url,
          datePublished: "2026-06-13",
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-12 max-w-5xl">
          <header className="mb-10 text-center">
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Side-by-side comparison</p>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-rose-400 bg-clip-text text-transparent">
              {pair.a.name} vs {pair.b.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{pair.intro}</p>
          </header>

          <AIAnswerBlock
            question={`${pair.a.name} vs ${pair.b.name}: which should you trade in 2026?`}
            answer={`${pair.verdict} Both ${pair.a.name} and ${pair.b.name} are tradable free on TradeHQ with $100,000 virtual cash — no signup, no real-money risk. (Educational simulation only — not financial advice.)`}
            className="mb-8"
          />

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <Card className="p-6 border-emerald-500/20">
              <div className="text-xs text-emerald-400 mb-1">{pair.a.tag}</div>
              <div className="text-2xl font-bold">{pair.a.name} <span className="text-muted-foreground text-base">({pair.a.symbol})</span></div>
              <Link to={`/trade/${pair.a.symbol.toLowerCase()}`}>
                <Button variant="outline" size="sm" className="mt-4">Practise {pair.a.symbol} <ArrowRight className="ml-2 h-3 w-3" /></Button>
              </Link>
            </Card>
            <Card className="p-6 border-rose-500/20">
              <div className="text-xs text-rose-400 mb-1">{pair.b.tag}</div>
              <div className="text-2xl font-bold">{pair.b.name} <span className="text-muted-foreground text-base">({pair.b.symbol})</span></div>
              <Link to={`/trade/${pair.b.symbol.toLowerCase()}`}>
                <Button variant="outline" size="sm" className="mt-4">Practise {pair.b.symbol} <ArrowRight className="ml-2 h-3 w-3" /></Button>
              </Link>
            </Card>
          </div>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Key differences</h2>
            <ul className="space-y-3">
              {pair.bullets.map((b, i) => (
                <li key={i} className="flex gap-3 text-sm">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6 mb-8 bg-gradient-to-br from-emerald-500/5 to-rose-500/5 border-white/10">
            <h2 className="text-xl font-semibold mb-2">The verdict</h2>
            <p className="text-base text-muted-foreground">{pair.verdict}</p>
            <p className="mt-3 text-xs text-muted-foreground/70 italic">(Educational simulation only — not financial advice.)</p>
          </Card>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">More comparisons</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {COMPARE_PAIRS.filter((p) => p.slug !== pair.slug).slice(0, 6).map((p) => (
                <Link key={p.slug} to={`/compare/${p.slug}`} className="block p-3 rounded-lg border border-white/10 hover:border-emerald-500/40 transition text-sm">
                  {p.a.name} vs {p.b.name}
                </Link>
              ))}
            </div>
          </section>

          <SEOSection
            path={`/compare/${pair.slug}`}
            breadcrumbs={[
              { label: "Compare", href: "/compare" },
              { label: `${pair.a.name} vs ${pair.b.name}` },
            ]}
            faqs={[
              { question: `Is ${pair.a.name} better than ${pair.b.name}?`, answer: `${pair.verdict} You can practise both on TradeHQ with $100,000 virtual cash before committing real capital.` },
              { question: `Can I trade ${pair.a.name} and ${pair.b.name} on TradeHQ for free?`, answer: `Yes — both ${pair.a.name} and ${pair.b.name} are tradable on the TradeHQ practice simulator with no signup required.` },
              { question: `Which is more volatile, ${pair.a.name} or ${pair.b.name}?`, answer: pair.bullets.find((b) => /volatil/i.test(b)) ?? `Volatility differs by asset class — use the practice account to feel it without risking real money.` },
            ]}
            faqHeading="Comparison FAQ"
          />
        </main>
        <MegaFooter />
      </div>
    </>
  );
}

export function CompareIndex() {
  const title = "Asset Comparisons — Crypto, Stocks & ETFs Side-by-Side | TradeHQ";
  const description = "Compare Bitcoin vs Ethereum, Tesla vs Nvidia, stocks vs crypto and more. Side-by-side breakdowns of returns, risk and use cases. Practise both sides risk-free.";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_DOMAIN}/compare`} />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-12 max-w-5xl">
          <h1 className="text-4xl font-bold mb-2">Asset Comparisons</h1>
          <p className="text-muted-foreground mb-8">Pick a head-to-head. Each comparison is built around real differences in returns, risk and use case.</p>
          <div className="grid md:grid-cols-2 gap-4">
            {COMPARE_PAIRS.map((p) => (
              <Link key={p.slug} to={`/compare/${p.slug}`}>
                <Card className="p-6 hover:border-emerald-500/40 transition">
                  <div className="text-xs text-muted-foreground mb-2">{p.a.tag} vs {p.b.tag}</div>
                  <h2 className="text-xl font-bold">{p.a.name} vs {p.b.name}</h2>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.intro}</p>
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