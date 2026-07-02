import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export interface RelatedItem {
  label: string;
  href: string;
  hint?: string;
}

export function RelatedContent({
  title = "Related on TradeHQ",
  items,
  className = "",
}: {
  title?: string;
  items: RelatedItem[];
  className?: string;
}) {
  if (!items?.length) return null;
  return (
    <section
      aria-label={title}
      className={`rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 ${className}`}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              to={it.href}
              className="group flex items-start justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 hover:border-primary/30 hover:bg-primary/5 transition-all"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium text-foreground truncate">{it.label}</div>
                {it.hint && (
                  <div className="text-xs text-muted-foreground truncate">{it.hint}</div>
                )}
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition" />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}