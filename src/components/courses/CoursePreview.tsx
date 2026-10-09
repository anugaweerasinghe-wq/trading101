import type { CourseDocument } from "../../../supabase/functions/_shared/courseDocument";

export function CoursePreview({ document: doc }: { document: CourseDocument }) {
  return <article className="space-y-8 text-foreground">
    <header><p className="text-sm text-primary mb-2">{doc.level}</p><h2 className="text-3xl font-semibold">{doc.title || "Untitled course"}</h2>
      <p className="mt-3 text-muted-foreground">{doc.tagline}</p><p className="mt-5 leading-relaxed">{doc.description}</p></header>
    <section><h3 className="font-semibold mb-3">Learning outcomes</h3><ul className="list-disc pl-5 space-y-2">{doc.outcomes.map((o, i) => <li key={i}>{o}</li>)}</ul></section>
    <section className="space-y-3"><h3 className="font-semibold">Before you start</h3><p>{doc.prerequisites}</p><h3 className="font-semibold">How the lessons build</h3><p>{doc.progression}</p><h3 className="font-semibold">Scope</h3><p>{doc.notFor}</p></section>
    {doc.lessons.map((l, i) => <section key={l.slug || i} className="border-t border-border pt-8 space-y-4">
      <p className="text-sm text-primary">Lesson {i + 1} · {l.readingMinutes} minutes</p><h3 className="text-2xl font-semibold">{l.title}</h3><p className="text-muted-foreground">{l.summary}</p>
      {l.body.map((p, pi) => p.startsWith("## ") ? <h4 key={pi} className="text-xl font-semibold pt-4">{p.slice(3)}</h4>
        : <p key={pi} className="leading-7 whitespace-pre-wrap">{p}</p>)}
      <h4 className="font-semibold">Key takeaways</h4><ul className="list-disc pl-5 space-y-2">{l.keyTakeaways.map((t, ti) => <li key={ti}>{t}</li>)}</ul>
      <h4 className="font-semibold">Sources</h4><ul className="space-y-2">{l.sources.map((s, si) => <li key={si}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-primary underline">{s.label}</a></li>)}</ul>
      <h4 className="font-semibold">Quiz and answer key</h4>{l.quiz.map((q, qi) => <div key={qi} className="rounded-xl bg-muted/40 p-4 space-y-2"><p className="font-medium">{qi + 1}. {q.question}</p>
        <ol className="list-[upper-alpha] pl-6">{q.options.map((o, oi) => <li key={oi} className={oi === q.correctAnswer ? "text-primary" : ""}>{o}{oi === q.correctAnswer ? " ✓" : ""}</li>)}</ol><p className="text-sm text-muted-foreground">{q.explanation}</p></div>)}
    </section>)}
  </article>;
}
