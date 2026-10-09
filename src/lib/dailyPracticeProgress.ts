import { exerciseForDate, practiceDate, validateExercises, type DailyBatch, type DailyExercise } from '../../supabase/functions/_shared/dailyPractice';
export interface PracticeProgress { date: string; bankId: string; exercise: DailyExercise; answers: number[]; reflection: string }
const KEY = 'tradehq:deeper-practice:v1';
export function validProgress(value: unknown): value is PracticeProgress {
  const p = value as PracticeProgress;
  return !!p && typeof p === 'object' && p.date === practiceDate(new Date(p.date + 'T12:00:00'))
    && typeof p.bankId === 'string' && validateExercises([p.exercise], 1).length === 0
    && Array.isArray(p.answers) && p.answers.length <= 3 && p.answers.every(a => Number.isInteger(a) && a >= 0 && a <= 2)
    && typeof p.reflection === 'string' && p.reflection.length <= 1500;
}
export function readPractice(date = practiceDate(), storage?: Pick<Storage, 'getItem'>): PracticeProgress | null {
  try { const rows: unknown = JSON.parse((storage ?? globalThis.localStorage).getItem(KEY) ?? '[]');
    return Array.isArray(rows) ? rows.find(p => validProgress(p) && p.date === date) ?? null : null;
  } catch { return null; }
}
export function newPractice(bank: DailyBatch, date = practiceDate()): PracticeProgress {
  return { date, bankId: bank.id, exercise: exerciseForDate(bank, date), answers: [], reflection: '' };
}
/** Keep a completed/longer attempt from another tab; bounded local history, no account sync. */
export function savePractice(progress: PracticeProgress, storage?: Pick<Storage, 'getItem' | 'setItem'>) {
  try {
    const raw: unknown = JSON.parse((storage ?? globalThis.localStorage).getItem(KEY) ?? '[]');
    const rows = Array.isArray(raw) ? raw.filter(validProgress) : [];
    const old = rows.find(p => p.date === progress.date);
    const next = old && (old.bankId !== progress.bankId || old.answers.length > progress.answers.length) ? old : progress;
    (storage ?? globalThis.localStorage).setItem(KEY, JSON.stringify([next, ...rows.filter(p => p.date !== next.date)].slice(0, 60)));
    return { progress: next, saved: true };
  } catch { return { progress, saved: false }; }
}
