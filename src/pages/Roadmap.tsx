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
  { icon: GraduationCap, title: "Guided Learning Pathways", desc: "Personalised next-lesson suggestions based on what you've already studied and which simulated trades went wrong. Rolling out this month.", status: "in-progress", eta: "Jul 2026" },
  { icon: Bell, title: "Daily Streak + Practice Reminders", desc: "Gentle browser notifications to keep your practice habit alive — fully opt-in, fully free.", status: "in-progress", eta: "Jul 2026" },
  { icon: Trophy, title: "Public Trader Profiles", desc: "Optional shareable profile page showing your simulated stats — perfect for building a track record before a prop-firm challenge.", status: "in-progress", eta: "Jul 2026" },
  { icon: UserCircle2, title: "Optional Email + Google Sign-In", desc: "Sync your practice portfolio, journal and watchlists across devices. Still 100% optional — guest mode stays forever.", status: "planned", eta: "Aug 2026" },
  { icon: LineChart, title: "Realistic Portfolio Projections", desc: "See where your simulated equity curve trends if your current win rate, R-multiple and frequency continue — powered by your real trade history.", status: "planned", eta: "Aug 2026" },
  { icon: Users2, title: "Challenge a Friend", desc: "Share a referral link, both start with $100K practice capital, leaderboard tracks who's ahead after 30 days.", status: "planned", eta: "Sep 2026" },
  { icon: BarChart3, title: "Embeddable Live Price Widgets", desc: "Drop a TradeHQ live BTC, ETH or SPY widget into any blog or notion page — free, no API key.", status: "planned", eta: "Oct 2026" },
  { icon: Globe2, title: "Localised Country Pages", desc: "Dedicated guides for Sri Lankan, Indian, Filipino, Pakistani and Nigerian students — local context, same free $100K account.", status: "in-progress", eta: "Rolling — next drop Aug 2026" },
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
  const description = "Sneak peek at upcoming TradeHQ features: expanded courses, optional sign-in, realistic portfolio projections, public trader profiles and more — all free.";
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
              We're building the world's most rewarding practice-trading experience — and keeping it 100% free, forever. Here's what's on deck.
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