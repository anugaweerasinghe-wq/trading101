import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Link } from "react-router-dom";
import { Flame, Trophy, Check, X, ArrowRight, Sparkles } from "lucide-react";
import {
  getTodayChallenge,
  getStreak,
  hasPlayedToday,
  recordChallenge,
  getUnlockedBadges,
  getNextBadge,
  getChallengeCount,
  type ChallengeDecision,
  type StreakState,
} from "@/lib/dailyChallenge";
import { cn } from "@/lib/utils";

export default function Daily() {
  const challenge = getTodayChallenge();
  const [streak, setStreak] = useState<StreakState | null>(null);
  const [selected, setSelected] = useState<ChallengeDecision | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setStreak(getStreak());
    if (hasPlayedToday()) setSubmitted(true);
  }, []);

  const handleSubmit = (decision: ChallengeDecision) => {
    if (submitted) return;
    const opt = challenge.options.find((o) => o.value === decision)!;
    const next = recordChallenge(challenge.id, decision, opt.correct);
    setSelected(decision);
    setSubmitted(true);
    setStreak(next);
  };

  const unlocked = streak ? getUnlockedBadges(streak.longest) : [];
  const next = streak ? getNextBadge(streak.longest) : null;

  return (
    <>
      <Helmet>
        <title>Daily Trading Challenge — Build Your Streak | TradeHQ</title>
        <meta name="description" content="A new trading scenario every day. Pick long, short, or hold. Build your streak, unlock badges, learn one new pro insight every 24 hours. Free, no signup." />
        <link rel="canonical" href="https://tradinghq.vercel.app/daily" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Daily Trading Challenge — TradeHQ" />
        <meta property="og:description" content="One new trading scenario per day. Build your streak. Free." />
        <meta property="og:url" content="https://tradinghq.vercel.app/daily" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Quiz",
          name: `Daily Trading Challenge: ${challenge.asset}`,
          about: challenge.scenario,
          educationalLevel: challenge.difficulty,
          provider: { "@type": "Organization", name: "TradeHQ", url: "https://tradinghq.vercel.app/" },
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-4xl">
            {/* Header */}
            <header className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-widest">Daily Challenge</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3 text-foreground">
                Today's Trading Scenario
              </h1>
              <p className="text-muted-foreground max-w-xl mx-auto">
                One scenario every UTC midnight. Practice decision-making with no money on the line.
                Build a streak, unlock badges, learn one pro insight per day.
              </p>
            </header>

            {/* Streak stats */}
            {streak && (
              <div className="grid grid-cols-3 gap-3 mb-8">
                <div className="p-4 rounded-2xl bg-orange-500/5 border border-orange-500/20 text-center">
                  <Flame className={cn("w-5 h-5 mx-auto mb-1", streak.current > 0 ? "text-orange-400" : "text-muted-foreground")} />
                  <div className="text-2xl font-bold tabular-nums text-foreground">{streak.current}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Current Streak</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <Trophy className="w-5 h-5 mx-auto mb-1 text-amber-400" />
                  <div className="text-2xl font-bold tabular-nums text-foreground">{streak.longest}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Personal Best</div>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
                  <Check className="w-5 h-5 mx-auto mb-1 text-success" />
                  <div className="text-2xl font-bold tabular-nums text-foreground">{streak.totalCompleted}</div>
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Total Played</div>
                </div>
              </div>
            )}

            {/* Challenge card */}
            <article
              className="rounded-3xl p-6 md:p-10 border border-white/[0.06] mb-6"
              style={{
                background: "linear-gradient(135deg, hsl(0 0% 6% / 0.9) 0%, hsl(0 0% 4% / 0.95) 100%)",
                backdropFilter: "blur(24px)",
                boxShadow: "0 8px 40px -10px hsl(0 0% 0% / 0.5)",
              }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded bg-primary/15 text-primary border border-primary/30">{challenge.asset} · {challenge.assetName}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{challenge.difficulty}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground leading-tight">{challenge.scenario}</h2>
              <p className="text-base text-muted-foreground mb-8 leading-relaxed">{challenge.context}</p>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {challenge.options.map((opt) => {
                  const isSelected = selected === opt.value;
                  const showCorrect = submitted && opt.correct;
                  const showWrong = submitted && isSelected && !opt.correct;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSubmit(opt.value)}
                      disabled={submitted}
                      className={cn(
                        "w-full text-left p-4 rounded-xl border transition-all active:scale-[0.98]",
                        !submitted && "bg-white/[0.03] border-white/[0.08] hover:border-primary/40 hover:bg-primary/5 cursor-pointer",
                        showCorrect && "bg-success/10 border-success/40",
                        showWrong && "bg-destructive/10 border-destructive/40",
                        submitted && !isSelected && !opt.correct && "bg-white/[0.02] border-white/[0.04] opacity-50",
                      )}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="text-sm font-bold text-foreground mb-1">{opt.label}</div>
                          {submitted && <div className="text-xs text-muted-foreground">{opt.rationale}</div>}
                        </div>
                        {showCorrect && <Check className="w-5 h-5 text-success flex-shrink-0" />}
                        {showWrong && <X className="w-5 h-5 text-destructive flex-shrink-0" />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Insight reveal */}
              {submitted && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-4">
                  <div className="text-[10px] uppercase tracking-widest text-primary font-bold mb-2">💡 Pro Insight</div>
                  <p className="text-sm text-foreground leading-relaxed">{challenge.insight}</p>
                </div>
              )}

              {submitted && (
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link to="/trade" className="flex-1">
                    <button className="w-full h-12 rounded-xl bg-primary font-bold text-sm flex items-center justify-center gap-2 active:scale-[0.97] transition-transform" style={{ color: "#000", boxShadow: "0 0 24px hsl(168 100% 50% / 0.3)" }}>
                      Practice This Trade Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </Link>
                  <Link to="/learn" className="flex-1">
                    <button className="w-full h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] font-semibold text-sm text-foreground active:scale-[0.97] transition-transform">
                      Learn More Concepts
                    </button>
                  </Link>
                </div>
              )}

              <p className="text-[10px] text-muted-foreground/70 text-center mt-6">
                Educational simulation only — not financial advice. Come back tomorrow for a new challenge.
              </p>
            </article>

            {/* Badges */}
            <section className="rounded-2xl p-5 bg-white/[0.02] border border-white/[0.06]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-foreground">Streak Badges</h3>
                <span className="text-xs text-muted-foreground">{unlocked.length}/5 unlocked</span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {[3, 7, 14, 30, 100].map((th) => {
                  const got = streak ? streak.longest >= th : false;
                  return (
                    <div key={th} className={cn("p-3 rounded-xl text-center border", got ? "bg-amber-500/10 border-amber-500/30" : "bg-white/[0.02] border-white/[0.04] opacity-40")}>
                      <div className="text-2xl mb-1">{got ? "🏆" : "🔒"}</div>
                      <div className="text-[10px] font-bold text-foreground">{th}-day</div>
                    </div>
                  );
                })}
              </div>
              {next && (
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Next: <strong className="text-foreground">{next.label}</strong> at {next.threshold}-day streak
                </p>
              )}
              <p className="text-[10px] text-muted-foreground/70 text-center mt-3">
                {getChallengeCount()} unique scenarios in rotation
              </p>
            </section>
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}