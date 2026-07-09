import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star, Quote, ShieldCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Review {
  id: string;
  name: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

const REVIEW_SUBMITTED_KEY = "tradehq:review-submitted:v1";

function Stars({ value, size = 16, onChange }: { value: number; size?: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex gap-0.5" role={onChange ? "radiogroup" : undefined} aria-label="rating">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type={onChange ? "button" : undefined}
          onClick={onChange ? () => onChange(n) : undefined}
          disabled={!onChange}
          aria-label={`${n} star${n > 1 ? "s" : ""}`}
          className={onChange ? "hover:scale-110 active:scale-95 transition-transform" : "cursor-default"}
        >
          <Star
            style={{ width: size, height: size }}
            className={n <= value ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground/40"}
          />
        </button>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(() => !!localStorage.getItem(REVIEW_SUBMITTED_KEY));

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reviews")
      .select("id, name, content, rating, is_featured, created_at")
      .eq("is_visible", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: false });
    if (error) toast.error("Could not load reviews");
    else setReviews(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    if (!reviews.length) return { avg: 0, count: 0 };
    const sum = reviews.reduce((a, r) => a + r.rating, 0);
    return { avg: sum / reviews.length, count: reviews.length };
  }, [reviews]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitted) {
      toast.error("You've already submitted a review from this device.");
      return;
    }
    if (content.trim().length < 5) {
      toast.error("Review must be at least 5 characters.");
      return;
    }
    setSubmitting(true);
    const { data, error } = await supabase.functions.invoke("submit-review", {
      body: { name: name.trim() || undefined, content: content.trim(), rating },
    });
    setSubmitting(false);
    if (error || (data as { error?: string })?.error) {
      const msg = (data as { error?: string })?.error ?? error?.message ?? "Submission failed";
      toast.error(msg);
      if (/already/i.test(msg)) {
        localStorage.setItem(REVIEW_SUBMITTED_KEY, "1");
        setSubmitted(true);
      }
      return;
    }
    localStorage.setItem(REVIEW_SUBMITTED_KEY, "1");
    setSubmitted(true);
    setName("");
    setContent("");
    setRating(5);
    toast.success("Thanks! Your review was submitted.");
    load();
  };

  // Programmatic SEO: AggregateRating + Review JSON-LD
  const jsonLd = useMemo(() => {
    const base: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "TradeHQ — Free Trading Simulator",
      description: "Practice stock, crypto, ETF and forex trading with $100,000 simulated cash. Free, no signup.",
      url: "https://tradinghq.vercel.app/reviews",
    };
    if (stats.count > 0) {
      base.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: stats.avg.toFixed(1),
        reviewCount: stats.count,
        bestRating: 5,
        worstRating: 1,
      };
      base.review = reviews.slice(0, 20).map((r) => ({
        "@type": "Review",
        reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
        author: { "@type": "Person", name: r.name || "Anonymous Trader" },
        datePublished: r.created_at,
        reviewBody: r.content,
      }));
    }
    return base;
  }, [reviews, stats]);

  return (
    <>
      <Helmet>
        <title>{`TradeHQ Reviews — ${stats.count > 0 ? `${stats.avg.toFixed(1)}/5 from ${stats.count} traders` : "Real Trader Feedback"} | TradeHQ`}</title>
        <meta
          name="description"
          content={`Read ${stats.count || "real"} verified reviews from traders using TradeHQ's free $100,000 simulator. ${stats.count > 0 ? `Average rating ${stats.avg.toFixed(1)}/5.` : ""} Share your own experience.`}
        />
        <link rel="canonical" href="https://tradinghq.vercel.app/reviews" />
        <meta name="robots" content="index, follow, max-snippet:-1" />
        <meta property="og:title" content="TradeHQ Reviews — What Traders Say" />
        <meta property="og:description" content="Real reviews from real traders using TradeHQ's free simulator." />
        <meta property="og:url" content="https://tradinghq.vercel.app/reviews" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />

        <main className="pt-24 pb-16 container mx-auto px-4 max-w-5xl">
          <header className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-4 rounded-full bg-primary/10 border border-primary/20">
              <ShieldCheck className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">Verified Reviews</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">What Traders Say About TradeHQ</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Honest feedback from real users of our free $100,000 trading simulator. One review per visitor — no fakes, no incentives.
            </p>
            {stats.count > 0 && (
              <div className="mt-5 inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-card border border-border">
                <Stars value={Math.round(stats.avg)} size={20} />
                <span className="font-bold text-lg tabular-nums">{stats.avg.toFixed(1)}</span>
                <span className="text-sm text-muted-foreground">from {stats.count} review{stats.count > 1 ? "s" : ""}</span>
              </div>
            )}
          </header>

          <div className="grid md:grid-cols-[1fr_360px] gap-6">
            {/* Reviews list */}
            <section aria-label="Reviews">
              {loading ? (
                <Card className="p-6 text-sm text-muted-foreground">Loading reviews…</Card>
              ) : reviews.length === 0 ? (
                <Card className="p-8 text-center">
                  <Quote className="w-8 h-8 text-muted-foreground/40 mx-auto mb-3" />
                  <p className="text-muted-foreground">Be the first to review TradeHQ.</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {reviews.map((r) => (
                    <Card key={r.id} className={`p-5 ${r.is_featured ? "border-primary/40 bg-primary/[0.03]" : ""}`}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Stars value={r.rating} />
                          {r.is_featured && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/20 text-primary uppercase tracking-wide font-semibold">
                              Featured
                            </span>
                          )}
                        </div>
                        <time className="text-xs text-muted-foreground" dateTime={r.created_at}>
                          {new Date(r.created_at).toLocaleDateString()}
                        </time>
                      </div>
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">{r.content}</p>
                      <p className="text-sm text-muted-foreground mt-3">— {r.name || "Anonymous Trader"}</p>
                    </Card>
                  ))}
                </div>
              )}
            </section>

            {/* Submit form */}
            <aside className="md:sticky md:top-24 h-fit">
              <Card className="p-5">
                <h2 className="font-semibold mb-1">Share your experience</h2>
                <p className="text-xs text-muted-foreground mb-4">
                  One review per visitor, forever. Name is optional.
                </p>

                {submitted ? (
                  <div className="text-sm text-muted-foreground p-4 rounded-lg bg-muted/30 text-center">
                    Thanks — you've already submitted your review.
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Your rating</label>
                      <Stars value={rating} size={24} onChange={setRating} />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Name (optional)</label>
                      <Input value={name} onChange={(e) => setName(e.target.value)} maxLength={60} placeholder="Anonymous" />
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Your review</label>
                      <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={5}
                        maxLength={1000}
                        placeholder="What did you think of TradeHQ?"
                        required
                      />
                      <p className="text-[10px] text-muted-foreground mt-1 text-right">{content.length}/1000</p>
                    </div>
                    <Button type="submit" disabled={submitting} className="w-full active:scale-[0.97]">
                      {submitting ? "Submitting…" : "Submit review"}
                    </Button>
                  </form>
                )}
              </Card>
            </aside>
          </div>
        </main>
      </div>
    </>
  );
}