import assert from "node:assert/strict";
import { compareMemberRank } from "../src/lib/memberActivity";

const members = [
  { userId: "zero", username: "aaa", trades: 0, previousTrades: 0, portfolioStatus: "not_started", practiceRank: null },
  { userId: "past", username: "past", trades: 0, previousTrades: 5, portfolioStatus: "not_started", practiceRank: null },
  { userId: "import", username: "import", trades: 0, previousTrades: 0, portfolioStatus: "imported", practiceRank: null },
  { userId: "return", username: "return", trades: 1, previousTrades: 0, portfolioStatus: "ranked", practiceRank: 1 },
  { userId: "active", username: "active", trades: 3, previousTrades: 0, portfolioStatus: "ranked", practiceRank: 2 },
];
const sorted = [...members].sort(compareMemberRank);
assert.deepEqual(sorted.map(m => m.userId), ["return", "active", "past", "import", "zero"]);
assert.equal(sorted[0].practiceRank, 1, "return rank must lead even when another member has more trades");
assert.equal(sorted[2].practiceRank, null, "past reported trades must not create a verified rank");
assert.deepEqual(members.map(m => m.userId), ["zero", "past", "import", "return", "active"]);
assert.deepEqual([...members].reverse().sort(compareMemberRank), sorted, "stable order across refreshed RPC results");

const refreshed = members.map(m => ({ ...m, practiceRank: m.userId === "return" ? 2 : m.userId === "active" ? 1 : null }));
assert.deepEqual(refreshed.sort(compareMemberRank).map(m => m.userId), ["active", "return", "past", "import", "zero"], "new server ranks must reorder the board on refresh");
const tied = [
  { ...members[3], userId: "tie-low", practiceRank: 1 },
  { ...members[4], userId: "tie-high", practiceRank: 1 },
  { ...members[3], userId: "third", practiceRank: 3 },
];
assert.deepEqual(tied.sort(compareMemberRank).map(m => m.userId), ["tie-high", "tie-low", "third"], "activity may break a shared-rank tie without moving lower ranks above it");
assert.deepEqual(tied.map(m => m.practiceRank), [1, 1, 3], "display sorting must preserve shared ranks and gaps supplied by the server");
console.log("Member order passed: return ranks first, automatic reordering, shared ranks preserved, unranked activity retained");
