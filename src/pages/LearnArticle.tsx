import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { ArrowRight, Home, ChevronRight, Clock, BookOpen } from "lucide-react";
import { LEARN_ARTICLES } from "@/lib/learnArticles";

const DOMAIN = "https://tradinghq.vercel.app";

function normalizeLearnHref(href: string) {
  if (!href.startsWith("/learn/")) return href;
  if (href.startsWith("/learn/article/")) return href;
  const slug = href.replace("/learn/", "").trim();
  return `/learn/article/${slug}`;
}

export default function LearnArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = LEARN_ARTICLES.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/learn" replace />;
  }

  const articleUrl = `${DOMAIN}/learn/article/${article.slug}`;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
      { "@type": "ListItem", position: 2, name: "Learn", item: `${DOMAIN}/learn` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: articleUrl,
    datePublished: "2026-03-01",
    dateModified: "2026-04-02",
    author: { "@type": "Organization", name: "TradeHQ" },
    publisher: {
      "@type": "Organization",
      name: "TradeHQ",
      url: `${DOMAIN}/`,
      logo: { "@type": "ImageObject", url: `${DOMAIN}/og-image.png` },
    },
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | TradeHQ Learn</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={articleUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={`${article.title} | TradeHQ Learn`} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={articleUrl} />
        <meta property="og:image" content={`${DOMAIN}/og-image.png`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${article.title} | TradeHQ Learn`} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content={`${DOMAIN}/og-image.png`} />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-20 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/" className="inline-flex items-center gap-1 hover:text-foreground transition-colors">
                <Home className="w-4 h-4" />Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/learn" className="hover:text-foreground transition-colors">Learn</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground truncate">{article.title}</span>
            </nav>

            <article className="rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 md:p-10 backdrop-blur-xl">
              <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" />{article.readTime}</span>
                <span className="inline-flex items-center gap-1.5"><BookOpen className="w-4 h-4" />Beginner Guide</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">{article.summary}</p>

              <div className="space-y-10">
                {article.sections.map((section, sectionIndex) => (
                  <section key={`${section.heading}-${sectionIndex}`}>
                    <h2 className="text-2xl font-semibold mb-4">{section.heading}</h2>
                    <div className="space-y-4">
                      {section.paragraphs.map((paragraph, paragraphIndex) => (
                        <p key={`${section.heading}-${paragraphIndex}`} className="text-base leading-8 text-foreground/90">{paragraph}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              {article.relatedLinks.length > 0 && (
                <section className="mt-12 border-t border-white/[0.08] pt-8">
                  <h3 className="text-xl font-semibold mb-4">Related Resources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {article.relatedLinks.map((link) => (
                      <Link key={link.href} to={normalizeLearnHref(link.href)} className="rounded-2xl border border-white/[0.08] bg-card/40 px-4 py-3 text-sm font-medium text-foreground transition-all hover:border-primary/30 hover:text-primary">
                        <span className="inline-flex items-center gap-2">{link.label}<ArrowRight className="w-4 h-4" /></span>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              <section className="mt-12 rounded-2xl border border-primary/15 bg-primary/[0.04] p-6">
                <h3 className="text-xl font-semibold mb-2">Ready to practice?</h3>
                <p className="text-muted-foreground mb-4">Test what you learned with $10,000 in virtual cash and zero real risk.</p>
                <Link to="/trade" className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90">
                  Start Trading Free <ArrowRight className="w-4 h-4" />
                </Link>
              </section>
            </article>
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
