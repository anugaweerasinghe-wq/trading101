import assert from "node:assert/strict";
import { compareMemberActivity } from "../src/lib/memberActivity";

const members = [
  { userId: "zero", username: "aaa", trades: 0, previousTrades: 0, portfolioStatus: "not_started", practiceRank: null },
  { userId: "past", username: "past", trades: 0, previousTrades: 5, portfolioStatus: "not_started", practiceRank: null },
  { userId: "import", username: "import", trades: 0, previousTrades: 0, portfolioStatus: "imported", practiceRank: null },
  { userId: "return", username: "return", trades: 1, previousTrades: 0, portfolioStatus: "ranked", practiceRank: 1 },
  { userId: "active", username: "active", trades: 3, previousTrades: 0, portfolioStatus: "ranked", practiceRank: 2 },
];
const sorted = [...members].sort(compareMemberActivity);
assert.deepEqual(sorted.map(m => m.userId), ["active", "return", "past", "import", "zero"]);
assert.equal(sorted[0].practiceRank, 2, "activity must not rewrite return-based rank");
assert.equal(sorted[2].practiceRank, null, "past reported trades must not create a verified rank");
assert.deepEqual(members.map(m => m.userId), ["zero", "past", "import", "return", "active"]);
assert.deepEqual([...members].reverse().sort(compareMemberActivity), sorted, "stable order across refreshed RPC results");
console.log("Member activity passed: server activity first, labelled past activity, imports before inactive profiles, ranks unchanged");
