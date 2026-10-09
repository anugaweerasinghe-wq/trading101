import { DAILY_CATEGORIES, type DailyExercise } from '../../../supabase/functions/_shared/dailyPractice';
const input = 'w-full rounded-xl border border-white/15 bg-background p-3 text-sm';
function Text({ label, value, onChange, multiline = false }: { label: string; value: string; onChange: (v: string) => void; multiline?: boolean }) {
  return <label className="block text-sm space-y-2"><span className="font-medium">{label}</span>{multiline
    ? <textarea className={input} rows={4} value={value} onChange={e => onChange(e.target.value)} />
    : <input className={input} value={value} onChange={e => onChange(e.target.value)} />}</label>;
}
export function PracticeEditor({ exercise: e, onChange }: { exercise: DailyExercise; onChange: (value: DailyExercise) => void }) {
  const edit = (patch: Partial<DailyExercise>) => onChange({ ...e, ...patch });
  return <div className="space-y-5">
    <Text label="Title" value={e.title} onChange={title => edit({ title })} />
    <label className="block text-sm space-y-2"><span>Category</span><select className={input} value={e.category} onChange={v => edit({ category: v.target.value })}>{DAILY_CATEGORIES.map(c => <option key={c}>{c}</option>)}</select></label>
    <Text label="Hypothetical scenario" value={e.scenario} multiline onChange={scenario => edit({ scenario })} />
    <fieldset className="border border-white/10 rounded-2xl p-4 space-y-4"><legend className="px-2 font-medium text-sm">Visual inputs</legend>
      <Text label="Caption" value={e.visual.caption} onChange={caption => edit({ visual: { ...e.visual, caption } })} />
      <Text label="Unit" value={e.visual.unit} onChange={unit => edit({ visual: { ...e.visual, unit } })} />
      {e.visual.bars.map((bar, i) => <div key={i} className="grid grid-cols-[1fr_100px_auto] gap-2 items-end">
        <Text label={`Bar ${i + 1} label`} value={bar.label} onChange={label => edit({ visual: { ...e.visual, bars: e.visual.bars.map((b, n) => n === i ? { ...b, label } : b) } })} />
        <label className="text-xs space-y-2">Value<input className={input} type="number" min={0} max={1e9} step="any" value={Number.isFinite(bar.value) ? bar.value : ''} onChange={v => edit({ visual: { ...e.visual, bars: e.visual.bars.map((b, n) => n === i ? { ...b, value: v.target.value === '' ? NaN : Number(v.target.value) } : b) } })} /></label>
        <button type="button" disabled={e.visual.bars.length <= 2} onClick={() => edit({ visual: { ...e.visual, bars: e.visual.bars.filter((_, n) => n !== i) } })} className="text-xs p-3 disabled:opacity-30">Remove</button>
      </div>)}
      <button type="button" disabled={e.visual.bars.length >= 6} className="text-primary text-sm disabled:opacity-30" onClick={() => edit({ visual: { ...e.visual, bars: [...e.visual.bars, { label: 'New input', value: 0 }] } })}>Add bar</button>
    </fieldset>
    {e.questions.map((q, i) => {
      const change = (patch: Partial<typeof q>) => edit({ questions: e.questions.map((old, n) => n === i ? { ...old, ...patch } : old) });
      return <fieldset key={i} className="border border-white/10 rounded-2xl p-4 space-y-4"><legend className="px-2 font-medium text-sm">Question {i + 1}</legend>
        <Text label="Question" value={q.prompt} onChange={prompt => change({ prompt })} />
        {q.options.map((option, n) => <Text key={n} label={`Option ${n + 1}`} value={option} onChange={value => change({ options: q.options.map((o, j) => j === n ? value : o) })} />)}
        <label className="block text-sm space-y-2"><span>Correct answer</span><select className={input} value={q.correctAnswer} onChange={v => change({ correctAnswer: Number(v.target.value) })}>{q.options.map((o, n) => <option value={n} key={n}>Option {n + 1}: {o}</option>)}</select></label>
        <Text label="Worked explanation" value={q.explanation} multiline onChange={explanation => change({ explanation })} />
      </fieldset>;
    })}
    <Text label="Reflection prompt" value={e.reflection} multiline onChange={reflection => edit({ reflection })} />
    <Text label="Reflection review guide" value={e.reflectionGuide} multiline onChange={reflectionGuide => edit({ reflectionGuide })} />
    <fieldset className="border border-white/10 rounded-2xl p-4 space-y-4"><legend className="px-2 font-medium text-sm">Primary sources</legend>
      {e.sources.map((s, i) => <div key={i} className="space-y-2 border-b border-white/10 pb-4">
        <Text label={`Source ${i + 1} label`} value={s.label} onChange={label => edit({ sources: e.sources.map((old, n) => n === i ? { ...old, label } : old) })} />
        <Text label="HTTPS source URL" value={s.url} onChange={url => edit({ sources: e.sources.map((old, n) => n === i ? { ...old, url } : old) })} />
        <button type="button" disabled={e.sources.length <= 1} className="text-xs disabled:opacity-30" onClick={() => edit({ sources: e.sources.filter((_, n) => n !== i) })}>Remove source</button>
      </div>)}
      <button type="button" disabled={e.sources.length >= 4} className="text-primary text-sm disabled:opacity-30" onClick={() => edit({ sources: [...e.sources, { label: 'Primary source', url: 'https://www.investor.gov/introduction-investing' }] })}>Add source</button>
    </fieldset>
  </div>;
}
