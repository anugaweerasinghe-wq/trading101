import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, CheckCircle2, ArrowRight } from "lucide-react";
import { courseTracks } from "@/lib/coursesData";
import { loadProgress, trackCompletionPct } from "@/lib/courseProgress";
import { EducationalDisclaimer } from "@/components/EducationalDisclaimer";
import { AIAnswerBlock } from "@/components/seo/AIAnswerBlock";

const DOMAIN = "https://tradinghq.vercel.app";

export default function Courses() {
  const progress = loadProgress();
  const resume = progress.lastLesson;

  const title = "Free Trading Courses 2026 — Options, Futures, Macro & Psychology | TradeHQ";
  const description =
    "Four structured, expert-written trading courses covering options, futures, macro reading and trading psychology. Free lessons, quizzes, completion badges. Practice with $100,000 virtual cash.";

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: courseTracks.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${DOMAIN}/courses/${t.slug}`,
      name: t.title,
    })),
  };

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${DOMAIN}/courses`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${DOMAIN}/courses`} />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-28 pb-20 max-w-6xl">
          <header className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs uppercase tracking-widest text-emerald-400 mb-4">
              <GraduationCap className="h-3 w-3" /> TradeHQ Courses
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-br from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
              Free Trading Courses
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Four expert-written tracks. Twenty premium lessons. Quizzes, completion badges, and $100,000 in
              virtual cash to practice everything you learn — free, no signup.
            </p>
          </header>

          <AIAnswerBlock
            className="mb-10"
            question="What courses does TradeHQ offer?"
            answer="TradeHQ offers four free trading courses: Options Trading Fundamentals, Futures & Derivatives, Macro Reading for Traders, and Trading Psychology Mastery. Each course has 5 lessons with quizzes and a completion badge. Every concept can be practiced immediately on TradeHQ's simulator with $100,000 in virtual cash. Educational simulation only — not financial advice."
          />

          {resume && (
            <Card className="p-5 mb-8 border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between gap-4 flex-wrap">
              <div className="text-sm">
                <div className="text-emerald-400 uppercase text-[10px] tracking-widest mb-1">Continue where you left off</div>
                <div className="text-foreground font-medium">
                  Resume: {resume.track.replace(/-/g, " ")} · {resume.lesson.replace(/-/g, " ")}
                </div>
              </div>
              <Link
                to={`/courses/${resume.track}/${resume.lesson}`}
                className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
              >
                Resume lesson <ArrowRight className="w-4 h-4" />
              </Link>
            </Card>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {courseTracks.map((track) => {
              const pct = trackCompletionPct(track.slug, track.lessons.length);
              return (
                <Card key={track.slug} className="overflow-hidden bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-colors group">
                  <Link to={`/courses/${track.slug}`}>
                    <div className="aspect-[16/9] overflow-hidden bg-black relative">
                      <img
                        src={track.hero}
                        alt={`${track.title} — TradeHQ course cover`}
                        width={1200}
                        height={675}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline" className="text-[10px] uppercase tracking-widest">{track.level}</Badge>
                        <span className="text-xs text-muted-foreground">{track.lessons.length} lessons</span>
                      </div>
                      <h2 className="text-xl font-semibold mb-1 group-hover:text-emerald-300 transition-colors">
                        {track.title}
                      </h2>
                      <p className="text-sm text-muted-foreground mb-4">{track.tagline}</p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {pct}% complete
                        </span>
                        <span className="text-emerald-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                          Start course <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div className="mt-3 h-1 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>

          <div className="mt-12">
            <EducationalDisclaimer />
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
