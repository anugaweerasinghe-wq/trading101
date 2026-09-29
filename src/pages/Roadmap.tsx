import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, BookOpenCheck, UserCircle2, LineChart, GraduationCap, Bell, Users2, BarChart3, Globe2, Trophy } from "lucide-react";
import { SITE_DOMAIN } from "@/lib/seoData";

interface RoadmapItem {
  icon: any;
  title: string;
  desc: string;
  status: "shipped" | "shipping-soon" | "in-progress" | "planned";
  eta: string;
}

const ITEMS: RoadmapItem[] = [
  { icon: BookOpenCheck, title: "Expanded Learning Courses", desc: "Four structured tracks — options, futures, macro reading and trading psychology — each with quizzes and a completion badge. Now live at /courses.", status: "shipped", eta: "Shipped Jul 2026" },
  { icon: GraduationCap, title: "Guided Learning Pathways", desc: "Personalised next-lesson suggestions based on what you've already studied. Live on the Learn hub — the 'Picked for you' card resumes your last lesson or points you to the best starting point.", status: "shipped", eta: "Shipped Jul 2026" },
  { icon: Bell, title: "Daily Streak + Practice Reminders", desc: "The local daily-challenge streak is live. Browser reminder delivery is still being repaired and verified, so reminders are not marked shipped yet.", status: "in-progress", eta: "No committed date" },
  { icon: Trophy, title: "Public Trader Profiles", desc: "Implementation exists, but production backend availability is under verification. Signed-in users can opt into a public profile at /trader/{username}. Displayed practice statistics are client-synced and are not independently verified performance records.", status: "in-progress", eta: "Backend verification pending" },
  { icon: Globe2, title: "Localised Country Pages", desc: "Free tailored guides for Sri Lanka, India, Philippines, Pakistan and Nigeria — local regulator, exchange, tax notes and student angle. Live under /learn/country.", status: "shipped", eta: "Shipped Jul 2026" },
  { icon: UserCircle2, title: "Optional Email + Google Sign-In", desc: "Implementation exists, but production backend availability is under verification. Create an optional account for profile/community features and to sync selected summary practice statistics. Core simulator features remain available in guest mode; this is not full cross-device portfolio synchronization.", status: "in-progress", eta: "Backend verification pending" },
  { icon: Users2, title: "Challenge a Friend", desc: "Implementation exists, but production backend availability is under verification. Share an invite link for a 30-day virtual-money duel. The comparison uses client-synced percentage-change statistics from each participant's recorded starting value; updates depend on syncs and are not independently verified.", status: "in-progress", eta: "Backend verification pending" },
  { icon: LineChart, title: "History-Based Portfolio Analysis", desc: "Potential future work: analysis based on a sufficiently documented simulator history. The current Scenario Builder is an assumption-driven sandbox, not a forecast based on your trade history.", status: "planned", eta: "No committed date" },
  { icon: BarChart3, title: "Embeddable Practice Price Widgets", desc: "Potential future widgets would preserve the same provenance labels used by TradeHQ — realtime, delayed, cached or simulated depending on the instrument and provider.", status: "planned", eta: "No committed date" },
];

const STATUS_STYLES: Record<RoadmapItem["status"], string> = {
  "shipped": "bg-sky-500/15 text-sky-300 border-sky-500/30",
  "shipping-soon": "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
  "in-progress": "bg-amber-500/15 text-amber-300 border-amber-500/30",
  "planned": "bg-fuchsia-500/15 text-fuchsia-300 border-fuchsia-500/30",
};

const STATUS_LABEL: Record<RoadmapItem["status"], string> = {
  "shipped": "Shipped",
  "shipping-soon": "Shipping soon",
  "in-progress": "In progress",
  "planned": "Planned",
};

export default function Roadmap() {
  const title = "TradeHQ Roadmap — What's Coming Next | Future Updates";
  const description = "Current TradeHQ feature status and potential future improvements, with shipped, in-progress and planned items clearly separated.";
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_DOMAIN}/roadmap`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_DOMAIN}/roadmap`} />
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
        {/* premium background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-fuchsia-500/10 rounded-full blur-3xl" />
        </div>

        <Navigation />

        <main className="flex-1 container mx-auto px-4 pt-28 pb-20 max-w-5xl relative">
          <header className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur text-xs uppercase tracking-widest text-muted-foreground mb-5">
              <Sparkles className="h-3 w-3 text-emerald-400" /> What's coming next
            </div>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-br from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent">
              The Future of TradeHQ
            </h1>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl mx-auto">
              This page records what exists now, what is still being repaired, and what is only planned. Planned items and dates are not commitments.
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-4">
            {ITEMS.map((item, i) => {
              const Icon = item.icon;
              return (
                <Card
                  key={i}
                  className="group p-6 bg-white/[0.02] border border-white/10 backdrop-blur-xl hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition" />
                  <div className="flex items-start justify-between mb-4 relative">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <Badge variant="outline" className={STATUS_STYLES[item.status]}>
                      {STATUS_LABEL[item.status]}
                    </Badge>
                  </div>
                  <h2 className="text-lg font-semibold tracking-tight mb-2">{item.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  <div className="mt-4 pt-4 border-t border-white/5 text-xs text-muted-foreground/70">
                    Target: <span className="text-emerald-400/80">{item.eta}</span>
                  </div>
                </Card>
              );
            })}
          </div>

          <section className="mt-12 max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold">What the statuses actually mean</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              "Shipped" means a working version exists in the current product; some shipped features
              still require an account or user action. "In progress" means part of the feature exists
              but the advertised behavior is not yet fully verified. "Planned" describes an idea or
              intended improvement, not a delivery promise. Dates shown for shipped items are historical
              labels; future items use no committed date unless one can actually be supported.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Items reach the list in one of two ways. Most come from watching where people get stuck:
              the courses were added because the glossary alone left readers without a sequence to
              follow, and the country guides exist because a large share of visitors were trying to
              work out whether any of this applied where they live. The rest come from messages
              readers send through the contact page, which is the fastest way to get something
              considered.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              TradeHQ's current product scope excludes real-money order execution, custody and deposits.
              The roadmap also does not promise trading signals or personalized buy/sell recommendations;
              the product is intended for virtual-money practice and education.
            </p>
            <p className="text-xs text-muted-foreground/60 italic">(Educational simulation only — not financial advice.)</p>
          </section>

          <Card className="mt-12 p-8 text-center bg-gradient-to-br from-emerald-500/10 via-transparent to-fuchsia-500/10 border-white/10 backdrop-blur-xl">
            <h3 className="text-xl font-semibold mb-2">Want a feature on this list?</h3>
            <p className="text-sm text-muted-foreground max-w-md mx-auto">
              Drop a review on our <a href="/reviews" className="text-emerald-400 underline-offset-4 hover:underline">reviews page</a> with your idea — every suggestion gets read.
            </p>
            <p className="mt-4 text-xs text-muted-foreground/60 italic">(Educational simulation only — not financial advice.)</p>
          </Card>
        </main>

        <MegaFooter />
      </div>
    </>
  );
}