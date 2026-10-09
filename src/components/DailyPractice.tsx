import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, CheckCircle2, ArrowRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { starterPracticeBank } from '@/lib/dailyPracticeBank';
import { newPractice, readPractice, savePractice } from '@/lib/dailyPracticeProgress';
import { practiceDate, validateBatch, type DailyBatch, type DailyExercise } from '../../supabase/functions/_shared/dailyPractice';

export function PracticeVisual({ exercise }: { exercise: DailyExercise }) {
  const max = Math.max(1, ...exercise.visual.bars.map(b => b.value));
  return <figure className="rounded-2xl border border-white/10 bg-black/20 p-4 my-6">
    <figcaption className="text-xs text-muted-foreground mb-4">{exercise.visual.caption} · {exercise.visual.unit}</figcaption>
    <div className="space-y-3">{exercise.visual.bars.map((b, i) => <div key={i}>
      <div className="flex justify-between gap-4 text-sm mb-1"><span>{b.label}</span><span className="font-mono tabular-nums">{b.value.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span></div>
      <div aria-hidden="true" className="h-2 rounded-full bg-white/5"><div className="h-2 rounded-full bg-primary/60" style={{ width: `${b.value / max * 100}%` }} /></div>
    </div>)}</div>
  </figure>;
}
export function DailyPractice({ date, onComplete }: { date: string; onComplete: () => void }) {
  const [progress, setProgress] = useState(() => readPractice(date) ?? newPractice(starterPracticeBank, date));
  const [pick, setPick] = useState<number | null>(null), [storageOk, setStorageOk] = useState(true);
  const { data: bank } = useQuery({ queryKey: ['daily-practice-bank', date], staleTime: 300000,
    queryFn: async (): Promise<DailyBatch> => {
      const { data, error } = await (supabase.rpc as unknown as (name: string) => Promise<{ data: unknown; error: unknown }>)('get_daily_practice_bank');
      if (error || !validateBatch(data)) return starterPracticeBank;
      return data;
    }, retry: false,
  });
  useEffect(() => {
    // A started attempt owns its snapshot, even if a new bank is approved mid-session.
    setProgress(prev => readPractice(date) ?? (prev.date === date && prev.answers.length > 0 ? prev : newPractice(bank ?? starterPracticeBank, date))); setPick(null);
  }, [date, bank]);
  useEffect(() => {
    const sync = () => { const saved = readPractice(date); if (saved) { setProgress(saved); setPick(null); } };
    window.addEventListener('storage', sync); return () => window.removeEventListener('storage', sync);
  }, [date]);
  const persist = (next: typeof progress) => { const result = savePractice(next); setStorageOk(result.saved); setProgress(result.progress); return result.progress; };
  const exercise = progress.exercise, answered = progress.answers.length, done = answered === 3;
  const score = progress.answers.filter((a, i) => a === exercise.questions[i].correctAnswer).length;
  const submit = () => {
    if (pick === null || done || date !== practiceDate() || progress.date !== date) return;
    const next = persist({ ...progress, answers: [...progress.answers, pick] }); setPick(null);
    if (next.answers.length === 3) onComplete();
  };
  return <section aria-labelledby="deeper-title" className="rounded-[24px] border border-primary/20 bg-gradient-to-br from-primary/[0.06] to-white/[0.02] p-6 md:p-8 mb-8">
    <div className="flex flex-wrap justify-between gap-3 mb-5"><p className="flex items-center gap-2 text-xs uppercase tracking-widest text-primary"><BookOpen className="w-4 h-4" />Go deeper</p><span className="text-xs text-muted-foreground">3–5 minutes · {answered}/3 reviewed</span></div>
    <h2 id="deeper-title" className="text-2xl md:text-3xl font-bold tracking-tight">{exercise.title}</h2>
    <p className="text-sm text-muted-foreground mt-2">{exercise.category} · {date}</p>
    <p className="text-base leading-relaxed text-foreground/85 mt-5">{exercise.scenario}</p>
    <PracticeVisual exercise={exercise} />
    <div className="space-y-5">{exercise.questions.map((q, i) => {
      if (i > answered) return null;
      const reviewed = i < answered;
      return <div key={`${exercise.id}-${i}`} className="rounded-2xl border border-white/10 p-4 md:p-5">
        <p className="text-xs text-muted-foreground mb-2">Question {i + 1} of 3</p>
        <fieldset disabled={reviewed}><legend className="font-semibold leading-relaxed mb-4">{q.prompt}</legend>
          <div className="space-y-2">{q.options.map((option, n) => <label key={n} className={`flex gap-3 items-start p-3 rounded-xl border cursor-pointer ${reviewed && n === q.correctAnswer ? 'border-primary/50 bg-primary/10' : 'border-white/10 bg-black/10'}`}>
            <input type="radio" name={`practice-${exercise.id}-${i}`} checked={reviewed ? progress.answers[i] === n : pick === n} onChange={() => setPick(n)} className="mt-1 accent-primary shrink-0" />
            <span className="text-sm leading-relaxed">{option}{reviewed && n === q.correctAnswer && <span className="block text-primary text-xs mt-1">Correct answer</span>}{reviewed && progress.answers[i] === n && n !== q.correctAnswer && <span className="block text-muted-foreground text-xs mt-1">Your answer</span>}</span>
          </label>)}</div>
        </fieldset>
        {reviewed ? <div role="status" className="mt-4"><p className="text-sm font-medium mb-2">{progress.answers[i] === q.correctAnswer ? 'That’s right.' : 'Here’s the reasoning.'}</p><p className="text-sm leading-relaxed text-muted-foreground">{q.explanation}</p></div>
          : <button onClick={submit} disabled={pick === null || progress.date !== date} className="mt-4 inline-flex items-center gap-2 bg-primary text-primary-foreground rounded-xl px-4 py-2.5 text-sm font-semibold disabled:opacity-40">Check and continue <ArrowRight className="w-4 h-4" /></button>}
      </div>;
    })}</div>
    {done && <div className="mt-6 space-y-4">
      <p className="flex gap-2 items-center font-medium text-primary" role="status"><CheckCircle2 className="w-5 h-5" />Practice complete · {score}/3 correct</p>
      <label className="block text-sm font-medium" htmlFor="daily-reflection">{exercise.reflection}<span className="block text-muted-foreground font-normal mt-1">Optional reflection · saved on this browser</span></label>
      <textarea id="daily-reflection" rows={3} maxLength={1500} value={progress.reflection} onChange={e => persist({ ...progress, reflection: e.target.value })} className="w-full rounded-xl bg-background border border-white/15 p-3 text-sm leading-relaxed" placeholder="Explain it in your own words…" />
      <details className="rounded-xl border border-white/10 p-4"><summary className="cursor-pointer font-medium text-sm">Review your reflection</summary><p className="text-sm text-muted-foreground leading-relaxed mt-3">{exercise.reflectionGuide}</p></details>
    </div>}
    <div className="mt-6 border-t border-white/10 pt-4"><p className="text-xs text-muted-foreground">Further reading</p><ul className="mt-2 space-y-1">{exercise.sources.map(s => <li key={s.url}><a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline underline-offset-4">{s.label}</a></li>)}</ul>
      <p className="text-xs leading-relaxed text-muted-foreground mt-4">50 rotating exercises. A new bank is prepared every two months and waits for owner approval; revisits are review practice. Progress and reflections stay on this browser. {bank?.reviewer ? `Bank reviewed by ${bank.reviewer}.` : 'Authored starter bank.'}</p>
      {!storageOk && <p role="alert" className="text-xs text-amber-400 mt-2">Browser storage is unavailable. This attempt may not survive a refresh.</p>}
    </div>
  </section>;
}
