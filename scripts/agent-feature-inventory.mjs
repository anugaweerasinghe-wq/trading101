/** Current TradeHQ feature inventory. Every entry is grounded in an existing source file. */
import { readFileSync } from "node:fs";
const featureSources = [
  ["practice-trading","Simulated multi-asset trading","Virtual account with stocks, funds and crypto; market-order execution and practice positions.","src/pages/Trade.tsx","market"],
  ["portfolio","Practice portfolio and position valuation","Portfolio and holdings pages track virtual investments and results.","src/pages/Portfolio.tsx","portfolio"],
  ["daily","Daily scenario and deeper case study","Daily quick challenge, 10-question scored extended case study, streak and rotating question bank.","src/pages/Daily.tsx","challenge"],
  ["duels","Shareable head-to-head duels","Existing duel creation, codes and sharable /challenge/:code routes compare members' results.","src/pages/Challenge.tsx","duel"],
  ["leaderboard","Ranked public leaderboard","Leaderboard ranks traders and supports privacy choices and duel results.","src/pages/Leaderboard.tsx","leaderboard"],
  ["reviews","Public reviews and owner replies","Reviews include likes, featured status, owner replies and admin moderation.","src/pages/Reviews.tsx","review"],
  ["courses","Courses, quizzes and completion badges","Multi-lesson guided courses with educational quizzes and completion badges; new drafts have editor approval.","src/pages/Courses.tsx","quiz"],
  ["mentor","Knowledge-based trading mentor","Rules-based educational Q&A about markets, risk and psychology; not generative stock predictions.","src/pages/AIMentor.tsx","Mentor"],
  ["learning","Learning articles, sectors and guides","Guided learning hub, articles, market themes, sectors, international perspectives and glossary.","src/pages/Learn.tsx","Learn"],
  ["markets","Market explorer with quotes","Assets market browsing with third-party/last-known prices and data-source labels.","src/pages/Markets.tsx","market"],
  ["wiki","Trading terms wiki","Existing definitions and educational glossary entries.","src/pages/WikiIndex.tsx","wiki"],
  ["compare","Side-by-side comparison guides","Explanatory comparison pages, including asset comparisons.","src/pages/Compare.tsx","compare"],
  ["profile","Public and private trader profiles","Profile and public account settings including public visibility.","src/pages/TraderProfile.tsx","profile"],
  ["roadmap","Public roadmap","Existing roadmap page summarizing site development plans.","src/pages/Roadmap.tsx","roadmap"],
  ["contact","Feedback/contact page","Existing contact form for users to send feedback.","src/pages/Contact.tsx","contact"],
];
const legacyIdeas = [
  "Peer Challenge Duel Creator (duplicate of already existing head-to-head duels and shareable challenge codes)",
  "Interactive Candlestick Pattern Sandbox (previously suggested but not implemented)",
];
export function getFeatureInventory() {
  const features = featureSources.map(([id, name, description, file, evidence]) => {
    let source;
    try { source = readFileSync(file, "utf8"); } catch { throw Error("Feature inventory source missing: " + file); }
    if (!source.toLowerCase().includes(evidence.toLowerCase())) throw Error("Feature inventory evidence missing for " + id + ": " + file);
    const lines = source.split("\n");
    const matches = lines.map((text, index) => ({text: text.trim().slice(0,155), index:index+1}))
      .filter(item => item.text && item.text.toLowerCase().includes(evidence.toLowerCase()) && item.text.length > 20)
      .slice(0, 3);
    return { id, name, description, file, evidence: matches };
  });
  const app = readFileSync("src/App.tsx", "utf8");
  const routes = [...app.matchAll(/<Route path="([^"]+)"/g)].map(x=>x[1]).slice(0,120);
  return { features, routes, rejectedOrPriorIdeas: legacyIdeas };
}
export function normalizeConcept(value) {
  return String(value||"").toLowerCase().replace(/[^a-z0-9 ]+/g, " ")
    .replace(/\b(a|an|the|tradehq|for|with|and|to|of|in|on|new|interactive|tool|feature|creator)\b/g," ")
    .replace(/\s+/g," ").trim();
}
export function hasObviousDuplicate(idea, history=[]) {
  const title = normalizeConcept(idea.title);
  const desc = normalizeConcept((idea.title||"")+" "+(idea.userExperience||""));
  if (!title || title.length < 8) return true;
  const blocked = [
    /\b(duel|peer challenge|challenge code|head to head)\b/,
    /\b(quiz streak|daily quiz|daily challenge|scored case study)\b/,
    /\b(review likes?|featured reviews?|review reply)\b/,
    /\b(course badge|completion badge|learning course)\b/,
    /\b(trading mentor|ai mentor|mentor chatbot)\b/,
    /\b(public leaderboard|trader leaderboard)\b/,
    /\b(public trader profile|trader profile)\b/,
  ];
  if (blocked.some(re=>re.test(desc))) return true;
  const proposed=new Set(title.split(" ").filter(w=>w.length>3));
  return history.some(text=>{
    const titleOnly=normalizeConcept(String(text).split("\n")[0].slice(0,180));
    const other=new Set(titleOnly.split(" ").filter(w=>w.length>3));
    const union = new Set([...proposed,...other]);
    const intersection = [...proposed].filter(w=>other.has(w));
    return union.size>0 && intersection.length/union.size >= 0.55;
  });
}
