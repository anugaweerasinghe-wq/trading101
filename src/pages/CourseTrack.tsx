import { Link, useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Navigation } from "@/components/Navigation";
import { MegaFooter } from "@/components/MegaFooter";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Clock, Award } from "lucide-react";
import { getTrack } from "@/lib/coursesData";
import { getTrackProgress, trackCompletionPct } from "@/lib/courseProgress";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { EducationalDisclaimer } from "@/components/EducationalDisclaimer";

const DOMAIN = "https://tradinghq.vercel.app";

export default function CourseTrack() {
  const { trackSlug } = useParams<{ trackSlug: string }>();
  const track = trackSlug ? getTrack(trackSlug) : undefined;
  if (!track) return <Navigate to="/courses" replace />;

  const url = `${DOMAIN}/courses/${track.slug}`;
  const title = `${track.title} — Free Trading Course | TradeHQ`;
  const description = `${track.tagline} ${track.lessons.length} free lessons with quizzes and a completion badge. Practice with $100,000 virtual cash on TradeHQ.`;

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: track.title,
    description: track.description,
    provider: {
      "@type": "Organization",
      name: "TradeHQ",
      sameAs: DOMAIN,
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${track.lessons.reduce((s, l) => s + l.readingMinutes, 0)}M`,
    },
    educationalCredentialAwarded: track.badge.name,
    inLanguage: "en",
    url,
  };
  const progress = getTrackProgress(track.slug);
  const pct = trackCompletionPct(track.slug, track.lessons.length);

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={track.hero} />
        <script type="application/ld+json">{JSON.stringify(courseSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-background flex flex-col">
        <Navigation />
        <main className="flex-1 container mx-auto px-4 pt-24 pb-20 max-w-4xl">
          <Breadcrumbs
            className="mb-6"
            items={[
              { label: "Home", href: "/" },
              { label: "Courses", href: "/courses" },
              { label: track.title },
            ]}
          />

          <div className="rounded-3xl overflow-hidden mb-8 bg-black relative aspect-[16/7]">
            <img src={track.hero} alt={`${track.title} — cover`} width={1200} height={525} className="w-full h-full object-cover opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <Badge variant="outline" className="mb-3">{track.level}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">{track.title}</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">{track.tagline}</p>
            </div>
          </div>

          <Card className="p-5 mb-6 bg-white/[0.02] border-white/10">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Your progress</span>
              <span className="font-semibold text-emerald-400">{pct}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all" style={{ width: `${pct}%` }} />
            </div>
            <div className="flex items-center gap-2 mt-3 text-xs text-muted-foreground">
              <Award className="w-4 h-4 text-amber-400" />
              Earn the <span className="text-foreground font-medium">{track.badge.name}</span> badge on completion
            </div>
          </Card>

          <p className="text-base text-muted-foreground leading-relaxed mb-8">{track.description}</p>

          <h2 className="text-xl font-semibold mb-4">Lessons</h2>
          <div className="space-y-3">
            {track.lessons.map((lesson, i) => {
              const done = progress.lessons[lesson.slug]?.status === "completed";
              return (
                <Link
                  key={lesson.slug}
                  to={`/courses/${track.slug}/${lesson.slug}`}
                  className="block"
                >
                  <Card className="p-4 md:p-5 flex items-start gap-4 bg-white/[0.02] border-white/10 hover:border-emerald-500/40 hover:bg-white/[0.04] transition-all">
                    <div className="mt-1">
                      {done ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                        Lesson {i + 1}
                      </div>
                      <div className="font-semibold text-foreground mb-1">{lesson.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-2">{lesson.summary}</div>
                    </div>
                    <div className="text-xs text-muted-foreground inline-flex items-center gap-1 whitespace-nowrap">
                      <Clock className="w-3.5 h-3.5" /> {lesson.readingMinutes} min
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-10">
            <EducationalDisclaimer />
          </div>
        </main>
        <MegaFooter />
      </div>
    </>
  );
}
