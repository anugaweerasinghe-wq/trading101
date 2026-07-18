import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Users,
  Clock,
  Sparkles,
  Target,
  Award,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { courseTracks } from "@/lib/coursesData";
import { loadProgress, trackCompletionPct } from "@/lib/courseProgress";
import { EducationalDisclaimer } from "@/components/EducationalDisclaimer";
import { AIAnswerBlock } from "@/components/seo/AIAnswerBlock";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";

const DOMAIN = "https://tradinghq.vercel.app";

const LEARNING_OUTCOMES = [
  "Read an options chain, understand strike/expiry and price defined-risk spreads with confidence",
  "Explain how futures margin, contango and backwardation work — and when a spot ETF is safer",
  "Translate CPI, Fed decisions, the yield curve and DXY moves into a tradable market view",
  "Recognise your own emotional biases (FOMO, revenge, overconfidence) before they cost money",
  "Design a written trading plan with position sizing, risk-per-trade and a journaling routine",
];

const WHY_TRUST = [
  {
    icon: ShieldCheck,
    title: "Educational only — no financial advice",
    body: "TradeHQ is not a brokerage. Every lesson explicitly notes that scenarios are illustrative and that past simulated performance does not predict future real-world returns.",
  },
  {
    icon: FileText,
    title: "Every claim sourced",
    body: "Statistics and definitions cite public sources: SEC, CFTC, Investopedia, FRED and CME Group. Sources are printed at the bottom of every lesson.",
  },
  {
    icon: Users,
    title: "Written and maintained by a real person",
    body: "All courses are written and reviewed by Anuga Weerasinghe, TradeHQ's creator. Reviewed dates and author byline appear on every lesson page.",
  },
  {
    icon: Award,
    title: "Practice, not preaching",
    body: "Every concept is paired with a matching paper trade you can execute immediately with $100,000 virtual cash. Learning without practice does not stick.",
  },
];

const HOW_IT_WORKS = [
  { step: "1", title: "Pick a track", body: "Choose the topic that matches your level. Beginners typically start with Trading Psychology or Macro Reading." },
  { step: "2", title: "Read the lesson", body: "Each lesson is 8–14 minutes. Written in plain English with real examples and printed sources." },
  { step: "3", title: "Take the quiz", body: "A 4–6 question knowledge check. Explanations for every answer — you learn from mistakes." },
  { step: "4", title: "Practice it live", body: "Every lesson links to a matching simulated trade so you use what you just learned with zero real money at risk." },
  { step: "5", title: "Earn the badge", body: "Complete every lesson in a track to earn a permanent completion badge on your practice profile." },
];

const FAQ = [
  {
    q: "Are the TradeHQ courses really free?",
    a: "Yes. Every lesson, quiz, badge and the $100,000 practice account are free forever, with no signup and no credit card. TradeHQ is an educational simulator and does not sell trading services or investment products.",
  },
  {
    q: "Is this financial advice?",
    a: "No. TradeHQ is educational only. Nothing on the site is financial, investment, legal or tax advice. Scenarios are illustrative and simulated. Speak with a licensed advisor before making real-money decisions.",
  },
  {
    q: "Do I need prior trading experience?",
    a: "No. Every track starts at fundamentals. If you have never placed a trade, start with 'Trading Psychology Mastery' or the first lesson of 'Options Trading Fundamentals'.",
  },
  {
    q: "How long does a track take?",
    a: "Each track is 5 lessons. Most people finish a track in 60–90 minutes of reading plus quiz time. Progress is saved automatically in your browser so you can resume any time.",
  },
  {
    q: "What do I get for completing a track?",
    a: "A permanent completion badge that shows on your practice profile, and — more importantly — the ability to explain the concept and paper trade it responsibly. There is no real-money certification.",
  },
  {
    q: "Where does the content come from?",
    a: "Written and reviewed by TradeHQ creator Anuga Weerasinghe. Every lesson lists its public sources (SEC, CFTC, FRED, CME Group, Investopedia) so you can verify any claim yourself.",
  },
  {
    q: "Will you cover crypto, forex or DeFi in depth?",
    a: "Existing lessons already reference crypto, forex and macro. Dedicated advanced crypto and forex tracks are on the public roadmap and will be added free.",
  },
];

export default function Courses() {
  const progress = loadProgress();
  const resume = progress.lastLesson;

  const title = "Free Trading Courses 2026 — Options, Futures, Macro & Psychology | TradeHQ";
  const description =
    "Four expert-written, structured trading courses covering options, futures, macro reading and trading psychology. Free lessons, quizzes and completion badges. Practice with $100,000 virtual cash on TradeHQ.";

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

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const courseListSchema = courseTracks.map((t) => ({
    "@context": "https://schema.org",
    "@type": "Course",
    name: t.title,
    description: t.description,
    provider: { "@type": "Organization", name: "TradeHQ", url: DOMAIN },
    inLanguage: "en",
    isAccessibleForFree: true,
    educationalLevel: t.level,
    url: `${DOMAIN}/courses/${t.slug}`,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${t.lessons.length * 15}M`,
    },
    author: { "@type": "Person", name: "Anuga Weerasinghe" },
  }));

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${DOMAIN}/courses`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${DOMAIN}/courses`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        {courseListSchema.map((s, i) => (
          <script key={i} type="application/ld+json">{JSON.stringify(s)}</script>
        ))}
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />

        {/* atmospheric backdrop */}
        <div
          aria-hidden
          className="fixed inset-0 pointer-events-none -z-0 opacity-60"
          style={{
            background:
              "radial-gradient(900px 600px at 10% -10%, hsl(168 100% 50% / 0.10), transparent 60%), radial-gradient(700px 500px at 90% 10%, hsl(280 60% 55% / 0.07), transparent 60%)",
          }}
        />

        <main className="relative flex-1 container mx-auto px-4 pt-28 pb-20 max-w-6xl">
          <Breadcrumbs items={[{ label: "Learning", href: "/learn" }, { label: "Courses" }]} />

          {/* Hero */}
          <header className="my-10 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs uppercase tracking-widest text-emerald-400 mb-5">
              <GraduationCap className="h-3 w-3" /> Structured TradeHQ Courses · 2026 Edition
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent leading-[1.05]">
              Learn to Trade — Properly
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Four structured, expert-written courses on the topics that actually decide whether a
              trader survives their first year: options, futures, macro reading and psychology.
              Twenty full-length lessons. Quizzes, sources, completion badges, and a
              <span className="text-emerald-400 font-semibold"> $100,000 virtual practice account</span>
              so you can apply every concept the moment you learn it.
            </p>
            <p className="mt-4 text-sm text-muted-foreground/80 max-w-2xl mx-auto italic">
              Educational simulation only — not financial, investment, legal or tax advice.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#tracks"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition"
              >
                Browse the 4 tracks <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                to="/learn"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.04] border border-white/10 text-foreground hover:border-emerald-500/40 transition"
              >
                Or explore the full Learn hub
              </Link>
            </div>
          </header>

          <AIAnswerBlock
            className="mb-12"
            question="Are TradeHQ's free trading courses any good?"
            answer="TradeHQ offers four structured, expert-written trading courses — Options Fundamentals, Futures & Derivatives, Macro Reading, and Trading Psychology — with 20 lessons total, quizzes, cited public sources (SEC, CFTC, FRED, CME) and completion badges. Every concept can be practised immediately on a free $100,000 virtual account with no signup. Written by TradeHQ creator Anuga Weerasinghe; educational simulation only, not financial advice."
          />

          {resume && (
            <Card className="p-5 mb-10 border-emerald-500/30 bg-emerald-500/5 flex items-center justify-between gap-4 flex-wrap">
              <div className="text-sm">
                <div className="text-emerald-400 uppercase text-[10px] tracking-widest mb-1">
                  Continue where you left off
                </div>
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

          {/* What you'll learn */}
          <section className="mb-14" aria-labelledby="outcomes">
            <h2 id="outcomes" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Target className="w-6 h-6 text-emerald-400" /> What you will actually be able to do
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {LEARNING_OUTCOMES.map((o) => (
                <div
                  key={o}
                  className="flex items-start gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground/85 leading-relaxed">{o}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tracks */}
          <section id="tracks" className="mb-16">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
              <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-emerald-400" /> The four tracks
              </h2>
              <span className="text-xs text-muted-foreground">
                {courseTracks.reduce((n, t) => n + t.lessons.length, 0)} lessons · Free forever
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {courseTracks.map((track) => {
                const pct = trackCompletionPct(track.slug, track.lessons.length);
                return (
                  <Card
                    key={track.slug}
                    className="overflow-hidden bg-white/[0.02] border border-white/10 hover:border-emerald-500/40 transition-colors group"
                  >
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
                          <Badge variant="outline" className="text-[10px] uppercase tracking-widest">
                            {track.level}
                          </Badge>
                          <span className="text-xs text-muted-foreground inline-flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {track.lessons.length * 12}–{track.lessons.length * 15} min
                          </span>
                        </div>
                        <h3 className="text-xl font-semibold mb-1 group-hover:text-emerald-300 transition-colors">
                          {track.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                          {track.description || track.tagline}
                        </p>

                        <div className="mb-4">
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                            Syllabus
                          </p>
                          <ul className="space-y-1">
                            {track.lessons.slice(0, 3).map((l) => (
                              <li key={l.slug} className="text-xs text-foreground/70 flex items-start gap-1.5">
                                <span className="text-emerald-400/60">›</span> {l.title}
                              </li>
                            ))}
                            {track.lessons.length > 3 && (
                              <li className="text-xs text-muted-foreground italic">
                                + {track.lessons.length - 3} more lessons
                              </li>
                            )}
                          </ul>
                        </div>

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
          </section>

          {/* How it works */}
          <section className="mb-16" aria-labelledby="how-it-works">
            <h2 id="how-it-works" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-emerald-400" /> How the courses work
            </h2>
            <div className="grid md:grid-cols-5 gap-3">
              {HOW_IT_WORKS.map((s) => (
                <Card key={s.step} className="p-5 bg-white/[0.02] border border-white/10">
                  <div className="text-emerald-400 font-bold text-xl mb-2">{s.step}</div>
                  <h3 className="text-sm font-semibold mb-1.5">{s.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">{s.body}</p>
                </Card>
              ))}
            </div>
          </section>

          {/* Why trust */}
          <section className="mb-16" aria-labelledby="why-trust">
            <h2 id="why-trust" className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-emerald-400" /> Why you can trust this content
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {WHY_TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <Card
                    key={t.title}
                    className="p-5 bg-white/[0.02] border border-white/10 flex gap-4"
                  >
                    <Icon className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold mb-1.5">{t.title}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.body}</p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Author */}
          <section className="mb-16" aria-labelledby="author">
            <Card className="p-6 md:p-8 bg-white/[0.02] border border-white/10">
              <h2 id="author" className="text-xl font-bold mb-3">
                About the author
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                All TradeHQ courses are written and reviewed by{" "}
                <Link to="/about" className="text-emerald-400 hover:underline">
                  Anuga Weerasinghe
                </Link>
                , the creator of TradeHQ. TradeHQ is a free educational simulator built for
                self-directed learners — especially students in emerging markets — who want to
                understand how markets really work before ever risking real money.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Content is reviewed periodically and every lesson displays its last-reviewed date
                and its public sources (SEC, CFTC, FRED, CME Group, Investopedia). If you spot an
                error, please <Link to="/contact" className="text-emerald-400 hover:underline">contact us</Link> — corrections are shipped within 48 hours.
              </p>
            </Card>
          </section>

          {/* Risk warning — critical for AdSense YMYL */}
          <section className="mb-16" aria-labelledby="risk">
            <Card className="p-6 border-amber-500/30 bg-amber-500/[0.03]">
              <h2 id="risk" className="text-lg font-bold mb-3 flex items-center gap-2 text-amber-300">
                <AlertTriangle className="w-5 h-5" /> Important risk information
              </h2>
              <div className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Trading real financial instruments involves substantial risk of loss and is not
                  suitable for every investor. The majority of retail traders lose money over time.
                  Nothing on TradeHQ constitutes a recommendation to buy or sell any security.
                </p>
                <p>
                  Simulated results shown in these courses do not represent real trading. They do
                  not account for real-world slippage, spreads, commissions, taxes, funding costs,
                  gap risk, or the emotional impact of trading with real money. Past simulated
                  performance is not a reliable indicator of future real-world results.
                </p>
                <p>
                  Before making any real investment decision, consult a licensed financial
                  professional in your jurisdiction.
                </p>
              </div>
            </Card>
          </section>

          {/* FAQ */}
          <section className="mb-16" aria-labelledby="faq">
            <h2 id="faq" className="text-2xl md:text-3xl font-bold mb-6">
              Frequently asked questions
            </h2>
            <div className="space-y-3">
              {FAQ.map((f) => (
                <details
                  key={f.q}
                  className="group p-5 rounded-xl bg-white/[0.02] border border-white/10 open:border-emerald-500/30 transition-colors"
                >
                  <summary className="cursor-pointer font-semibold text-foreground/90 flex items-start justify-between gap-4">
                    <span>{f.q}</span>
                    <span className="text-emerald-400 shrink-0 group-open:rotate-45 transition-transform">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                </details>
              ))}
            </div>
          </section>

          <EducationalDisclaimer variant="footer" className="mb-12" />
        </main>

        <MegaFooter />
      </div>
    </>
  );
}