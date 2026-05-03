import { Helmet } from "react-helmet-async";
import { Breadcrumb } from "@/components/Breadcrumb";
import { AssetFAQSection } from "@/components/AssetFAQSection";

export interface SEOFAQ {
  question: string;
  answer: string;
}

export interface SEOBreadcrumb {
  label: string;
  href?: string;
}

interface SEOSectionProps {
  /** Canonical URL path beginning with `/` (e.g. `/trade`). */
  path: string;
  /** Visible breadcrumb trail (do NOT include "Home" — it's prepended). */
  breadcrumbs: SEOBreadcrumb[];
  /** FAQ entries — at least 3 recommended. */
  faqs: SEOFAQ[];
  /** Section title for the FAQ block. */
  faqHeading?: string;
  /** When true, renders only JSON-LD without visible UI (rare — prefer visible). */
  jsonLdOnly?: boolean;
  /** Hide the visible breadcrumb (still emits JSON-LD). */
  hideVisibleBreadcrumb?: boolean;
}

const DOMAIN = "https://tradinghq.vercel.app";

/**
 * SEOSection — drop-in component that emits:
 *  • Visible <Breadcrumb /> trail
 *  • Visible FAQ accordion (AssetFAQSection)
 *  • JSON-LD BreadcrumbList + FAQPage in <Helmet>
 *
 * Place near the bottom of the main content area on each page.
 */
export function SEOSection({
  path,
  breadcrumbs,
  faqs,
  faqHeading = "TradeHQ",
  jsonLdOnly = false,
  hideVisibleBreadcrumb = false,
}: SEOSectionProps) {
  const fullUrl = `${DOMAIN}${path}`;

  const breadcrumbItems = [
    { "@type": "ListItem", position: 1, name: "Home", item: `${DOMAIN}/` },
    ...breadcrumbs.map((b, i) => {
      const isLast = i === breadcrumbs.length - 1;
      // schema.org: `item` should be the canonical URL of that crumb's page.
      // For intermediate crumbs without an explicit href, omit `item` (allowed by spec)
      // rather than incorrectly point it at the current page URL.
      const item = b.href
        ? `${DOMAIN}${b.href}`
        : isLast
          ? fullUrl
          : undefined;
      const entry: Record<string, unknown> = {
        "@type": "ListItem",
        position: i + 2,
        name: b.label,
      };
      if (item) entry.item = item;
      return entry;
    }),
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbItems,
  };

  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }
      : null;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>

      {!jsonLdOnly && !hideVisibleBreadcrumb && (
        <Breadcrumb items={breadcrumbs} />
      )}

      {!jsonLdOnly && faqs.length > 0 && (
        <AssetFAQSection
          assetName={faqHeading}
          assetSymbol={faqHeading}
          faqs={faqs}
        />
      )}
    </>
  );
}