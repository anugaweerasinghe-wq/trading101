/**
 * Course progress persistence — localStorage-backed, versioned schema.
 * Tracks lesson completion, quiz scores, badges earned, and last-read
 * lesson so users can resume where they left off across sessions.
 */
export interface LessonProgress {
  status: "not-started" | "in-progress" | "completed";
  score?: number;
  completedAt?: string;
  scrolledPct?: number;
}

export interface TrackProgress {
  lessons: Record<string, LessonProgress>;
  badgeEarnedAt?: string;
}

export interface CourseProgressState {
  v: 1;
  tracks: Record<string, TrackProgress>;
  lastLesson?: { track: string; lesson: string; at: string };
  updatedAt: string;
}

const KEY = "tradehq_course_progress_v1";

const empty = (): CourseProgressState => ({
  v: 1,
  tracks: {},
  updatedAt: new Date(0).toISOString(),
});

export function loadProgress(): CourseProgressState {
  if (typeof window === "undefined") return empty();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as CourseProgressState;
    if (parsed.v !== 1) return empty();
    return parsed;
  } catch {
    return empty();
  }
}

function save(state: CourseProgressState) {
  if (typeof window === "undefined") return;
  state.updatedAt = new Date().toISOString();
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {}
}

export function markLessonStarted(track: string, lesson: string) {
  const s = loadProgress();
  s.tracks[track] ??= { lessons: {} };
  const l = s.tracks[track].lessons[lesson];
  if (!l || l.status === "not-started") {
    s.tracks[track].lessons[lesson] = { status: "in-progress" };
  }
  s.lastLesson = { track, lesson, at: new Date().toISOString() };
  save(s);
}

export function markLessonCompleted(track: string, lesson: string, score: number) {
  const s = loadProgress();
  s.tracks[track] ??= { lessons: {} };
  s.tracks[track].lessons[lesson] = {
    status: "completed",
    score,
    completedAt: new Date().toISOString(),
  };
  s.lastLesson = { track, lesson, at: new Date().toISOString() };
  save(s);
}

export function awardBadge(track: string) {
  const s = loadProgress();
  s.tracks[track] ??= { lessons: {} };
  if (!s.tracks[track].badgeEarnedAt) {
    s.tracks[track].badgeEarnedAt = new Date().toISOString();
    save(s);
  }
}

export function getTrackProgress(track: string): TrackProgress {
  return loadProgress().tracks[track] ?? { lessons: {} };
}

export function isLessonCompleted(track: string, lesson: string): boolean {
  return getTrackProgress(track).lessons[lesson]?.status === "completed";
}

export function trackCompletionPct(track: string, totalLessons: number): number {
  const p = getTrackProgress(track);
  const done = Object.values(p.lessons).filter((l) => l.status === "completed").length;
  return totalLessons === 0 ? 0 : Math.round((done / totalLessons) * 100);
}
