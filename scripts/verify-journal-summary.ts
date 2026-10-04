import assert from 'node:assert/strict';
import { getJournalSummary } from '../src/lib/tradingJournal';
import type { Trade } from '../src/lib/types';

function trade(id: string, emotions?: string[]): Trade {
  return {
    id, assetId: 'bitcoin', symbol: 'BTC', type: 'buy', quantity: 1,
    price: 100, total: 100, timestamp: new Date('2026-01-01T00:00:00Z'),
    ...(emotions === undefined ? {} : { journal: { emotions, notes: 'Keep this note', reasoning: 'Practice' } }),
  };
}
// This derived view must not read, overwrite or delete any stored user data.
Object.defineProperty(globalThis, 'localStorage', {
  get() { throw new Error('Summary must not access browser storage'); },
});
assert.deepEqual(getJournalSummary([]), { totalEntries: 0, taggedEntries: 0, emotions: [] });
assert.deepEqual(getJournalSummary([trade('unlogged')]), { totalEntries: 0, taggedEntries: 0, emotions: [] });
assert.deepEqual(getJournalSummary([trade('no-tags', [])]), { totalEntries: 1, taggedEntries: 0, emotions: [] });
const entries = [trade('1', ['Confident', ' confident ', 'FOMO']), trade('2', ['CONFIDENT', ' ']), trade('3', []), trade('4')];
const original = JSON.stringify(entries);
assert.deepEqual(getJournalSummary(entries), {
  totalEntries: 3, taggedEntries: 2,
  emotions: [{ emotion: 'confident', count: 2 }, { emotion: 'fomo', count: 1 }],
});
assert.equal(JSON.stringify(entries), original, 'Original journal notes/tags must remain unchanged');
assert.deepEqual(getJournalSummary([trade('tie', ['Calm', 'Anxious'])]).emotions,
  [{ emotion: 'anxious', count: 1 }, { emotion: 'calm', count: 1 }]);
const changed = [...entries, trade('5', ['FOMO'])];
assert.equal(getJournalSummary(changed).totalEntries, 4, 'New entries must be reflected without a cached analysis');
assert.equal(getJournalSummary(changed).emotions.find(e => e.emotion === 'fomo')?.count, 2);
console.log('Journal summary checks passed: empty/untagged, case/deduplication, multiple emotions, ties, current entries and data preservation.');
