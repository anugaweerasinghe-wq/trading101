import { Mail, Phone } from "lucide-react";

/**
 * Contact card — replaces the previous newsletter / "Institutional Insights" form.
 * Keeps the same export name so MegaFooter and any other consumers continue to work.
 */
export function NewsletterSignup() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-2">
        <Mail className="w-4 h-4 text-[hsl(var(--neon))]" />
        <span className="text-sm font-semibold text-foreground">Contact Us</span>
      </div>
      <p className="text-xs text-muted-foreground">
        Questions, feedback, or partnership inquiries? Reach out directly.
      </p>
      <div className="space-y-2">
        <a
          href="mailto:anugaweerasinghe1@gmail.com"
          className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--neon))] transition-colors break-all"
        >
          <Mail className="w-3.5 h-3.5 flex-shrink-0" />
          anugaweerasinghe1@gmail.com
        </a>
        <a
          href="tel:+94714897346"
          className="flex items-center gap-2 text-sm text-foreground hover:text-[hsl(var(--neon))] transition-colors"
        >
          <Phone className="w-3.5 h-3.5 flex-shrink-0" />
          +94 71 489 7346
        </a>
      </div>
    </div>
  );
}
