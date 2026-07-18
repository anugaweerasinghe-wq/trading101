import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, RotateCcw, X } from "lucide-react";
import { getLastVisit } from "@/lib/lastVisit";
import { loadProgress } from "@/lib/courseProgress";
import { getTrack } from "@/lib/coursesData";

const DISMISS_KEY = "tradehq_continue_dismissed_at";

function labelForRoute(path: string): string {
  if (path.startsWith("/trade/")) return `your last trade — ${path.split("/").pop()?.toUpperCase()}`;
  if (path.startsWith("/wiki/")) return "the wiki entry you were reading";
  if (path.startsWith("/learn")) return "your Learn lesson";
  if (path === "/portfolio") return "your portfolio";
  if (path === "/leaderboard") return "the leaderboard";
  if (path === "/markets") return "the markets page";
  return "where you left off";
}

/** Shown on the homepage only when the user is returning (day 2+). */
export function ContinueBanner() {
  const [show, setShow] = useState(false);
  const [route, setRoute] = useState<string>("");
  const [label, setLabel] = useState<string>("");

  useEffect(() => {
    // Prefer resuming an in-progress course lesson
    const prog = loadProgress();
    if (prog.lastLesson) {
      const t = getTrack(prog.lastLesson.track);
      const l = t?.lessons.find((x) => x.slug === prog.lastLesson!.lesson);
      if (t && l) {
        const dismissedAt = localStorage.getItem(DISMISS_KEY);
        if (dismissedAt) {
          const hrs = (Date.now() - new Date(dismissedAt).getTime()) / 36e5;
          if (hrs < 24) return;
        }
        setRoute(`/courses/${t.slug}/${l.slug}`);
        setLabel(`your lesson — ${l.title}`);
        setShow(true);
        return;
      }
    }
    const v = getLastVisit();
    if (!v.route || v.route === "/" || v.daysAgo === null || v.daysAgo < 1) return;
    const dismissedAt = localStorage.getItem(DISMISS_KEY);
    if (dismissedAt) {
      const hrs = (Date.now() - new Date(dismissedAt).getTime()) / 36e5;
      if (hrs < 24) return;
    }
    setRoute(v.route);
    setLabel(labelForRoute(v.route));
    setShow(true);
  }, []);

  if (!show || !route) return null;

  return (
    <div className="container mx-auto px-6 max-w-7xl pt-6">
      <div className="relative flex items-center justify-between gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0">
          <RotateCcw className="h-4 w-4 text-emerald-400 shrink-0" />
          <p className="text-sm text-foreground/90 truncate">
            Welcome back — jump straight to <span className="font-semibold">{label}</span>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            to={route}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Continue <ArrowRight className="w-3 h-3" />
          </Link>
          <button
            type="button"
            aria-label="Dismiss"
            onClick={() => {
              localStorage.setItem(DISMISS_KEY, new Date().toISOString());
              setShow(false);
            }}
            className="p-1 rounded hover:bg-white/[0.05]"
          >
            <X className="w-3.5 h-3.5 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}