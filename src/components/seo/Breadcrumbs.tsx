import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string; // omit for current page
}

const DOMAIN = "https://tradinghq.vercel.app";

export function Breadcrumbs({ items, className = "" }: { items: Crumb[]; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${DOMAIN}${c.href}` } : {}),
    })),
  };
  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <nav aria-label="Breadcrumb" className={`flex items-center gap-1 text-xs text-muted-foreground ${className}`}>
        {items.map((c, i) => (
          <span key={i} className="inline-flex items-center gap-1">
            {c.href ? (
              <Link to={c.href} className="hover:text-foreground transition-colors">{c.label}</Link>
            ) : (
              <span className="text-foreground font-medium" aria-current="page">{c.label}</span>
            )}
            {i < items.length - 1 && <ChevronRight className="w-3 h-3 opacity-60" />}
          </span>
        ))}
      </nav>
    </>
  );
}