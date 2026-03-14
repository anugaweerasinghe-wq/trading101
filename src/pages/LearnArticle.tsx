import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Home, ChevronRight, Clock, BookOpen } from "lucide-react";
import { LEARN_ARTICLES, type LearnArticle as ArticleType } from "@/lib/learnArticles";

export default function LearnArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = LEARN_ARTICLES.find((a) => a.slug === slug);

  if (!article) return <Navigate to="/learn" replace />;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://tradinghq.vercel.app/" },
      { "@type": "ListItem", position: 2, name: "Learn", item: "https://tradinghq.vercel.app/learn" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://tradinghq.vercel.app/learn/${article.slug}` },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.metaDescription,
    url: `https://tradinghq.vercel.app/learn/${article.slug}`,
    datePublished: "2026-03-01",
    dateModified: "2026-03-14",
    author: { "@type": "Organization", name: "TradeHQ" },
    publisher: {
      "@type": "Organization",
      name: "TradeHQ",
      url: "https://tradinghq.vercel.app/",
      logo: { "@type": "ImageObject", url: "https://tradinghq.vercel.app/og-image.png" },
    },
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | TradeHQ Learn</title>
        <meta name="description" content={article.metaDescription} />
        <link rel="canonical" href={`https://tradinghq.vercel.app/learn/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.metaDescription} />
        <meta property="og:url" content={`https://tradinghq.vercel.app/learn/${article.slug}`} />
        <meta property="og:image" content="https://tradinghq.vercel.app/og-image.png" />
        <meta property="og:site_name" content="TradeHQ" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.metaDescription} />
        <meta name="twitter:image" content="https://tradinghq.vercel.app/og-image.png" />
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-28 pb-20">
          <article className="container mx-auto px-6 max-w-3xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap" aria-label="Breadcrumb">
              <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="w-4 h-4" /><span>Home</span>
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/learn" className="hover:text-primary transition-colors">Learn</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground font-medium line-clamp-1">{article.title}</span>
            </nav>

            <header className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {article.readTime}
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <BookOpen className="w-3.5 h-3.5" /> Beginner Guide
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{article.title}</h1>
              <p className="text-lg text-muted-foreground leading-relaxed">{article.summary}</p>
            </header>

            {/* Article body */}
            <div className="prose prose-invert max-w-none space-y-6">
              {article.sections.map((section, i) => (
                <section key={i}>
                  <h2 className="text-xl font-bold text-foreground mt-8 mb-3">{section.heading}</h2>
                  {section.paragraphs.map((p, j) => (
                    <p key={j} className="text-sm text-muted-foreground leading-relaxed mb-4">{p}</p>
                  ))}
                </section>
              ))}
            </div>

            {/* Internal links */}
            <div className="mt-10 p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl" style={{ backdropFilter: "blur(12px)" }}>
              <h3 className="font-bold text-foreground mb-3">Related Resources</h3>
              <ul className="space-y-2">
                {article.relatedLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-primary hover:underline flex items-center gap-2">
                      <ArrowRight className="w-3.5 h-3.5" /> {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Ready to practice?</p>
              <Link to="/trade">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-6 text-base rounded-2xl font-semibold">
                  Start Trading Free <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </article>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
