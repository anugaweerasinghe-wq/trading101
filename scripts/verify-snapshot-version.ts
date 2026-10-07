import assert from 'node:assert/strict';
import { snapshotIsStale } from '../src/lib/snapshotVersion.ts';
const recent={cycle:'a',count:2,updatedAt:'2026-10-07T12:00:00Z'};
assert.equal(snapshotIsStale({...recent,count:1},recent),true);
assert.equal(snapshotIsStale({...recent,count:3},recent),false);
const reset={cycle:'b',count:0,updatedAt:'2026-10-07T12:01:00Z'};
assert.equal(snapshotIsStale(reset,recent),false);assert.equal(snapshotIsStale(recent,reset),true);
assert.equal(snapshotIsStale(recent,null),false);
console.log('PASS account snapshot races: older order response and prior cycle cannot replace newer state');
