import type { Dispatch, SetStateAction } from "react";
import { courseCovers, lessonWordCount, minimumLessonWords, type CourseDocument } from "../../../supabase/functions/_shared/courseDocument";

const inputClass = "w-full rounded-xl border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40";
export function CourseField({ label, value, onChange, multiline = false, disabled = false }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean; disabled?: boolean;
}) {
  return <label className="block space-y-2 text-sm"><span className="text-muted-foreground">{label}</span>
    {multiline ? <textarea rows={5} className={inputClass} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} />
      : <input className={inputClass} value={value} onChange={e => onChange(e.target.value)} disabled={disabled} />}</label>;
}
export const newLesson = (number: number): CourseDocument["lessons"][number] => ({
  slug: "lesson-" + number, title: "", summary: "", readingMinutes: 6, body: [], keyTakeaways: [],
  sources: [], quiz: [],
});
export const blankCourse = (): CourseDocument => ({
  slug: "new-course", title: "", tagline: "", description: "", level: "Beginner", hero: courseCovers[0].path,
  badge: { name: "Course Completion", description: "Complete every lesson and quiz." },
  outcomes: [], prerequisites: "", progression: "", notFor: "", lessons: [newLesson(1)],
});
const lines = (value: string) => value.split("\n");
export function CourseDraftEditor({ document: doc, setDocument, published }: {
  document: CourseDocument; setDocument: Dispatch<SetStateAction<CourseDocument | null>>; published: boolean;
}) {
  const field = (name: keyof CourseDocument, value: unknown) => setDocument(prev => prev ? { ...prev, [name]: value } : prev);
  const lesson = (index: number, patch: Partial<CourseDocument["lessons"][number]>) => setDocument(prev => prev ? { ...prev, lessons: prev.lessons.map((l, i) => i === index ? { ...l, ...patch } : l) } : prev);
  return <div className="space-y-8">
    <section className="space-y-4">
      <CourseField label="Course title" value={doc.title} onChange={v => field("title", v)} />
      <div className="grid sm:grid-cols-2 gap-4"><CourseField label="Course URL slug" value={doc.slug} onChange={v => field("slug", v)} disabled={published} />
        <label className="text-sm space-y-2"><span className="block text-muted-foreground">Level</span><select className={inputClass} value={doc.level} onChange={e => field("level", e.target.value)}>
          <option>Beginner</option><option>Intermediate</option><option>Advanced</option></select></label></div>
      <CourseField label="Tagline" value={doc.tagline} onChange={v => field("tagline", v)} />
      <CourseField label="Course description" value={doc.description} onChange={v => field("description", v)} multiline />
      <CourseField label="Learning outcomes — one per line" value={doc.outcomes.join("\n")} onChange={v => field("outcomes", lines(v))} multiline />
      <CourseField label="Prerequisites" value={doc.prerequisites} onChange={v => field("prerequisites", v)} multiline />
      <CourseField label="How the lessons build on one another" value={doc.progression} onChange={v => field("progression", v)} multiline />
      <CourseField label="Who this course is for / scope limitations" value={doc.notFor} onChange={v => field("notFor", v)} multiline />
      <CourseField label="Cover image path" value={doc.hero} onChange={v => field("hero", v)} />
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" aria-label="Course illustrations">
        {courseCovers.map(cover => <button key={cover.path} type="button" aria-pressed={doc.hero === cover.path} onClick={() => field("hero", cover.path)}
          className={"overflow-hidden rounded-xl border text-left " + (doc.hero === cover.path ? "border-primary ring-1 ring-primary" : "border-border")}>
          <img src={cover.path} alt="" width={1920} height={1080} loading="lazy" className="aspect-video w-full object-cover" />
          <span className="block px-3 py-2 text-xs">{cover.label}</span>
        </button>)}
      </div>
      <CourseField label="Completion badge name" value={doc.badge.name} onChange={v => field("badge", { ...doc.badge, name: v })} />
      <CourseField label="Completion badge description" value={doc.badge.description} onChange={v => field("badge", { ...doc.badge, description: v })} />
    </section>
    {doc.lessons.map((l, i) => <details key={i} className="rounded-2xl border border-border p-5" open={i === 0}>
      <summary className="cursor-pointer font-medium">Lesson {i + 1}: {l.title || "Untitled"}</summary>
      <div className="space-y-4 mt-5">
        <CourseField label="Lesson title" value={l.title} onChange={v => lesson(i, { title: v })} />
        <CourseField label="Lesson URL slug" value={l.slug} onChange={v => lesson(i, { slug: v })} disabled={published} />
        <CourseField label="Summary" value={l.summary} onChange={v => lesson(i, { summary: v })} multiline />
        <label className="block text-sm space-y-2"><span className="text-muted-foreground">Reading time in minutes</span>
          <input type="number" min={1} max={90} className={inputClass} value={l.readingMinutes} onChange={e => lesson(i, { readingMinutes: Number(e.target.value) })} /></label>
        <CourseField label="Lesson text — blank line between paragraphs; ## for section headings" value={l.body.join("\n\n")} onChange={v => lesson(i, { body: v.split(/\n\s*\n/) })} multiline />
        <p className={"text-xs " + (lessonWordCount(l.body) >= minimumLessonWords ? "text-primary" : "text-muted-foreground")}>{lessonWordCount(l.body)} words of lesson text · Over 550 required before approval. Headings, quizzes and takeaways are excluded.</p>
        <CourseField label="Key takeaways — one per line" value={l.keyTakeaways.join("\n")} onChange={v => lesson(i, { keyTakeaways: lines(v) })} multiline />
        <div className="space-y-3"><h4 className="font-medium">Sources</h4>{l.sources.map((s, si) => <div key={si} className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
          <CourseField label="Source title" value={s.label} onChange={v => lesson(i, { sources: l.sources.map((x, xi) => xi === si ? { ...x, label: v } : x) })} />
          <CourseField label="HTTPS link" value={s.url} onChange={v => lesson(i, { sources: l.sources.map((x, xi) => xi === si ? { ...x, url: v } : x) })} />
          <button type="button" className="text-sm text-muted-foreground p-2" onClick={() => lesson(i, { sources: l.sources.filter((_, xi) => xi !== si) })}>Remove</button></div>)}
          <button type="button" className="text-sm text-primary" onClick={() => lesson(i, { sources: [...l.sources, { label: "", url: "https://" }] })}>+ Add source</button></div>
        <div className="space-y-4"><h4 className="font-medium">Quiz</h4>{l.quiz.map((q, qi) => {
          const update = (patch: Partial<typeof q>) => lesson(i, { quiz: l.quiz.map((x, xi) => xi === qi ? { ...x, ...patch } : x) });
          return <div key={qi} className="rounded-xl bg-muted/30 p-4 space-y-3">
            <CourseField label={"Question " + (qi + 1)} value={q.question} onChange={v => update({ question: v })} />
            {q.options.map((o, oi) => <CourseField key={oi} label={"Option " + String.fromCharCode(65 + oi)} value={o} onChange={v => update({ options: q.options.map((x, xi) => xi === oi ? v : x) })} />)}
            <label className="block text-sm space-y-2"><span className="text-muted-foreground">Correct answer</span><select className={inputClass} value={q.correctAnswer} onChange={e => update({ correctAnswer: Number(e.target.value) })}>
              {q.options.map((_, oi) => <option key={oi} value={oi}>Option {String.fromCharCode(65 + oi)}</option>)}</select></label>
            <CourseField label="Answer explanation" value={q.explanation} onChange={v => update({ explanation: v })} multiline />
            <button type="button" className="text-sm text-muted-foreground" onClick={() => lesson(i, { quiz: l.quiz.filter((_, xi) => xi !== qi) })}>Remove question</button>
          </div>;
        })}<button type="button" className="text-sm text-primary" onClick={() => lesson(i, { quiz: [...l.quiz, { question: "", options: ["", "", "", ""], correctAnswer: 0, explanation: "" }] })}>+ Add quiz question</button></div>
        {!published && <button type="button" className="text-sm text-muted-foreground" onClick={() => field("lessons", doc.lessons.filter((_, li) => li !== i))}>Remove lesson</button>}
      </div>
    </details>)}
    <button type="button" className="rounded-xl border border-border px-4 py-2 text-sm" onClick={() => field("lessons", [...doc.lessons, newLesson(doc.lessons.length + 1)])}>+ Add lesson</button>
  </div>;
}
