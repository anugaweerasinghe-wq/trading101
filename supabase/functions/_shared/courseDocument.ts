export interface CourseQuestion {
  question: string; options: string[]; correctAnswer: number; explanation: string;
}
export interface CourseDocument {
  slug: string; title: string; tagline: string; description: string; hero: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  badge: { name: string; description: string };
  outcomes: string[]; prerequisites: string; progression: string; notFor: string;
  lessons: {
    slug: string; title: string; summary: string; readingMinutes: number; body: string[];
    keyTakeaways: string[]; sources: { label: string; url: string }[]; quiz: CourseQuestion[];
  }[];
  editorial?: { assisted: boolean; reviewer: string; reviewedAt: string };
}
export const reservedCourseSlugs = ["options-trading-fundamentals", "futures-and-derivatives", "macro-reading-for-traders", "trading-psychology-mastery"];
export const minimumLessonWords = 551;
export const courseCovers = [
  { label: "Trading and price feeds", path: "/course-covers/trading-basics.jpg", topics: "Spot instruments, crypto prices, quotes and trading mechanics" },
  { label: "Diversification", path: "/course-covers/diversification.jpg", topics: "Portfolio weights, diversification and rebalancing" },
  { label: "Risk management", path: "/course-covers/risk-management.jpg", topics: "Position sizing, concentration risk and loss scenarios" },
  { label: "Market trends", path: "/course-covers/market-trends.jpg", topics: "Market context, trends and macroeconomic concepts" },
];
export function lessonWordCount(body: string[]): number {
  const prose = body.filter(p => !p.trim().startsWith("## ")).join(" ").trim();
  return prose ? prose.split(/\s+/).length : 0;
}
const object = (value: unknown): value is Record<string, unknown> => !!value && typeof value === "object" && !Array.isArray(value);
const text = (value: unknown, max: number) => typeof value === "string" && value.length <= max;
const strings = (value: unknown, max: number, chars: number): value is string[] => Array.isArray(value) && value.length <= max && value.every(v => text(v, chars));
export function safeSourceUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 1500) return false;
  try { const u = new URL(value); return u.protocol === "https:" && !u.username && !u.password; } catch { return false; }
}
export function validateCourseDocument(value: unknown, publication = false): string[] {
  const errors: string[] = [];
  if (!object(value) || JSON.stringify(value).length > 250000) return ["Course must be a JSON object under 250 KB."];
  const fields = { title: 200, tagline: 500, description: 5000, prerequisites: 3000, progression: 5000, notFor: 3000 };
  if (typeof value.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.slug) || value.slug.length > 80) errors.push("Use a lowercase URL slug with hyphens.");
  if (reservedCourseSlugs.includes(String(value.slug))) errors.push("That URL belongs to an existing course.");
  for (const [field, max] of Object.entries(fields)) {
    if (!text(value[field], max) || (publication && !String(value[field]).trim())) errors.push("Check the course " + field + ".");
  }
  if (!["Beginner", "Intermediate", "Advanced"].includes(String(value.level))) errors.push("Choose a course level.");
  if (typeof value.hero !== "string" || !/^\/(?:[a-zA-Z0-9_./-])+\.(?:png|jpg|jpeg|webp|svg)$/.test(value.hero)) errors.push("Use a local image path for the cover.");
  if (!object(value.badge) || !text(value.badge.name, 160) || !text(value.badge.description, 500)) errors.push("Check the completion badge.");
  if (!strings(value.outcomes, 12, 1000) || (publication && (value.outcomes.filter(v => v.trim()).length < 3))) errors.push("Add at least three learning outcomes before approval.");
  if (!Array.isArray(value.lessons) || value.lessons.length > 12 || (publication && value.lessons.length < 3)) {
    errors.push("A published course needs 3–12 lessons."); return errors;
  }
  const slugs = new Set<string>();
  for (const [index, lesson] of value.lessons.entries()) {
    const prefix = "Lesson " + (index + 1) + ": ";
    if (!object(lesson)) { errors.push(prefix + "invalid lesson."); continue; }
    if (typeof lesson.slug !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(lesson.slug) || lesson.slug.length > 80 || slugs.has(lesson.slug)) errors.push(prefix + "use a unique URL slug.");
    slugs.add(String(lesson.slug));
    if (!text(lesson.title, 200) || !text(lesson.summary, 2000) || (publication && (!lesson.title || !lesson.summary))) errors.push(prefix + "add a title and summary.");
    if (!Number.isInteger(lesson.readingMinutes) || Number(lesson.readingMinutes) < 1 || Number(lesson.readingMinutes) > 90) errors.push(prefix + "reading time must be 1–90 minutes.");
    if (!strings(lesson.body, 100, 12000)) errors.push(prefix + "check the lesson paragraphs.");
    else if (publication && lessonWordCount(lesson.body) < minimumLessonWords) errors.push(prefix + "needs over 550 words of lesson text, excluding headings, quizzes and takeaways.");
    if (!strings(lesson.keyTakeaways, 12, 1000) || (publication && (lesson.keyTakeaways.filter(v => v.trim()).length < 3))) errors.push(prefix + "add at least three takeaways.");
    if (!Array.isArray(lesson.sources) || lesson.sources.length > 15 || (publication && lesson.sources.length < 2)
      || lesson.sources.some(s => !object(s) || !text(s.label, 300) || !safeSourceUrl(s.url))) errors.push(prefix + "add valid HTTPS sources (at least two before approval).");
    if (!Array.isArray(lesson.quiz) || lesson.quiz.length > 12 || (publication && lesson.quiz.length < 3)) errors.push(prefix + "add at least three quiz questions before approval.");
    else for (const q of lesson.quiz) {
      if (!object(q) || !text(q.question, 1000) || !strings(q.options, 6, 1000) || q.options.length < 2
        || !Number.isInteger(q.correctAnswer) || Number(q.correctAnswer) < 0 || Number(q.correctAnswer) >= q.options.length
        || !text(q.explanation, 2000) || (publication && (!q.question || !q.explanation || q.options.some(o => !o.trim())))) errors.push(prefix + "check quiz options, correct answer and explanation.");
    }
  }
  return errors;
}
