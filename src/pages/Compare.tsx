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

  const title = `${pair.a.name} vs ${pair.b.name} — Structural Comparison | TradeHQ`;
  const description = `${pair.a.name} vs ${pair.b.name}: side-by-side educational comparison of structure, market drivers and risk characteristics. Practise both with $100K in virtual cash on TradeHQ.`;
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
            question={`${pair.a.name} vs ${pair.b.name}: what is structurally different?`}
            answer={`${pair.verdict} Both are available in TradeHQ's virtual-money simulator for side-by-side practice. The comparison does not select a preferred asset.`}
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
            <h2 className="text-xl font-semibold mb-2">Comparison lens</h2>
            <p className="text-base text-muted-foreground">{pair.verdict}</p>
            <p className="mt-3 text-xs text-muted-foreground/70 italic">(Educational simulation only — not financial advice.)</p>
          </Card>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              What actually separates {pair.a.name} and {pair.b.name}
            </h2>
            <div className="space-y-4">
              {pair.deepDive.map((p, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">{p}</p>
              ))}
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Common mistakes with this comparison</h2>
            <ul className="space-y-3">
              {pair.mistakes.map((m, i) => (
                <li key={i} className="text-sm leading-relaxed text-muted-foreground flex gap-3">
                  <span className="shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-rose-400" aria-hidden />
                  <span>{m}</span>
                </li>
              ))}
            </ul>
          </section>

          <Card className="p-6 mb-8">
            <h2 className="text-xl font-semibold mb-2">How to settle it for yourself</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Rather than treating the article as a ranking, test both in the simulator under the
              same documented assumptions. Keep the virtual position-size rule, observation window
              and review method consistent, then compare volatility, drawdown and event sensitivity.
              A short simulation does not establish personal suitability or future performance, and
              nothing here is a recommendation to buy either one.
            </p>
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
              { question: `Is ${pair.a.name} better than ${pair.b.name}?`, answer: `TradeHQ does not rank one as universally better. ${pair.verdict} Use the simulator to compare the two under the same hypothetical assumptions.` },
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
  const description = "Compare Bitcoin vs Ethereum, Tesla vs Nvidia, stocks vs crypto and more. Side-by-side educational breakdowns of structure, market drivers and risk characteristics.";
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

          <section className="mb-10 max-w-3xl space-y-4">
            <p className="text-sm leading-relaxed text-muted-foreground">
              Most "X vs Y" questions mix together several different issues: what each instrument
              represents, what can move its price, how its market operates, and how volatile it has
              been. Each comparison below separates those structural questions without deciding what
              anyone should buy or which asset is personally suitable.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              A useful practice habit is to hold the assumptions constant. Use the same virtual
              observation window and documented sizing rule, then compare how the two instruments
              behaved. Historical volatility and drawdown can provide context, but they do not determine
              a future outcome or a real-world allocation.
            </p>
            <p className="text-xs text-muted-foreground/70 italic">
              (Educational simulation only — not financial advice.)
            </p>
          </section>

          <h2 className="text-xl font-semibold mb-4">All comparisons</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {COMPARE_PAIRS.map((p) => (
              <Link key={p.slug} to={`/compare/${p.slug}`}>
                <Card className="p-6 hover:border-emerald-500/40 transition">
                  <div className="text-xs text-muted-foreground mb-2">{p.a.tag} vs {p.b.tag}</div>
                  <h3 className="text-xl font-bold">{p.a.name} vs {p.b.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{p.intro}</p>
                </Card>
              </Link>
            ))}
          </div>

          <section className="mt-10 max-w-3xl">
            <h2 className="text-xl font-semibold mb-3">Test the comparison instead of arguing about it</h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Every supported asset named on these pages can be explored with virtual cash. Apply the
              same hypothetical rules to both sides and compare the resulting simulator analytics.
              A one-month or any other short practice sample is educational only and should not be
              treated as proof of expected returns or suitability.
            </p>
          </section>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}