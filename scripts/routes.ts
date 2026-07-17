/**
 * Shared route manifest — the single source of truth for:
 *   - public/sitemap.xml   (generate-sitemap.ts)
 *   - dist/<route>/index.html prerender (prerender.ts)
 *   - verify-seo.js
 *
 * Each route carries the SEO metadata that gets baked into its raw HTML
 * so search engines see a real title / description / canonical / H1 /
 * body copy BEFORE JavaScript executes.
 */

import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const DOMAIN = "https://tradinghq.vercel.app";
export const TODAY = new Date().toISOString().split("T")[0];
export const BALANCE = "$100,000";

export interface RouteMeta {
  path: string;                // "/wiki/macd"
  title: string;               // <title>
  description: string;         // <meta name="description">
  h1: string;                  // primary visible heading
  summary: string;             // 1-3 sentence prose visible to crawlers
  changefreq?: string;
  priority?: string;
  keywords?: string;
}

function readSrc(rel: string): string {
  return fs.readFileSync(path.resolve(__dirname, "..", rel), "utf-8");
}

function extractAssetIds(): string[] {
  const src = readSrc("src/lib/assets.ts");
  return (src.match(/id:\s*['"]([^'"]+)['"]/g) || [])
    .map((m) => m.replace(/id:\s*['"]/, "").replace(/['"]$/, ""));
}

function extractAssets(): { id: string; name: string; symbol: string }[] {
  const src = readSrc("src/lib/assets.ts");
  const results: { id: string; name: string; symbol: string }[] = [];
  const re = /id:\s*['"]([^'"]+)['"][\s\S]*?symbol:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"]/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    results.push({ id: m[1], symbol: m[2], name: m[3] });
  }
  return results;
}

function extractGlossary(): { slug: string; term: string; definition: string }[] {
  const src = readSrc("src/lib/tradingGlossary.ts");
  const results: { slug: string; term: string; definition: string }[] = [];
  const re = /slug:\s*["']([^"']+)["'][\s\S]*?term:\s*["']([^"']+)["'][\s\S]*?definition:\s*["']([^"']+?)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    results.push({ slug: m[1], term: m[2], definition: m[3].slice(0, 240) });
  }
  return results;
}

function extractLearnArticles(): { slug: string; title: string; metaDescription: string; summary: string }[] {
  const src = readSrc("src/lib/learnArticles.ts");
  const results: { slug: string; title: string; metaDescription: string; summary: string }[] = [];
  const re = /slug:\s*["']([^"']+)["'][\s\S]*?title:\s*["']([^"']+)["'][\s\S]*?summary:\s*["']([^"']+)["'][\s\S]*?metaDescription:\s*["']([^"']+)["']/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) {
    results.push({ slug: m[1], title: m[2], summary: m[3], metaDescription: m[4] });
  }
  return results;
}

function extractNicheSymbols(): string[] {
  const src = readSrc("src/lib/nicheData.ts");
  const symbols = new Set<string>();
  const re = /["']([A-Z0-9]{2,10})["']\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(src)) !== null) symbols.add(m[1]);
  return Array.from(symbols);
}

function extractSeoDataList(constName: "COMPARE_PAIRS" | "HOWTO_ASSETS" | "STRATEGIES"): { slug?: string; symbol?: string; title?: string; name?: string; fullName?: string; intro?: string; whyTrade?: string; hook?: string }[] {
  const src = readSrc("src/lib/seoData.ts");
  const idx = src.indexOf(`export const ${constName}`);
  if (idx < 0) return [];
  // Grab the array literal — everything up to the next `export const` or EOF.
  const rest = src.slice(idx);
  const nextExport = rest.indexOf("\nexport const ", 1);
  const block = nextExport > 0 ? rest.slice(0, nextExport) : rest;
  const out: any[] = [];
  const re = /\{[\s\S]*?\}(?=\s*,?\s*(?:\{|\]))/g;
  const items = block.match(re) || [];
  for (const item of items) {
    const pick = (key: string) => {
      const mm = item.match(new RegExp(`${key}:\\s*["']([^"']+)["']`));
      return mm ? mm[1] : undefined;
    };
    out.push({
      slug: pick("slug"),
      symbol: pick("symbol"),
      title: pick("title"),
      name: pick("name"),
      fullName: pick("fullName"),
      intro: pick("intro"),
      whyTrade: pick("whyTrade"),
      hook: pick("hook"),
    });
  }
  return out;
}

function extractCourses(): { slug: string; title: string; tagline: string; lessons: { slug: string; title: string; summary: string }[] }[] {
  const src = readSrc("src/lib/coursesData.ts");
  const tracks: { slug: string; title: string; tagline: string; lessons: { slug: string; title: string; summary: string }[] }[] = [];
  const trackRe = /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*tagline:\s*"([^"]+)"/g;
  let tm: RegExpExecArray | null;
  const trackStarts: { slug: string; title: string; tagline: string; index: number }[] = [];
  while ((tm = trackRe.exec(src)) !== null) {
    trackStarts.push({ slug: tm[1], title: tm[2], tagline: tm[3], index: tm.index });
  }
  for (let i = 0; i < trackStarts.length; i++) {
    const t = trackStarts[i];
    const end = i + 1 < trackStarts.length ? trackStarts[i + 1].index : src.length;
    const block = src.slice(t.index, end);
    const lessonRe = /slug:\s*"([^"]+)",\s*\n\s*title:\s*"([^"]+)",\s*\n\s*summary:\s*"([^"]+)"/g;
    const lessons: { slug: string; title: string; summary: string }[] = [];
    let lm: RegExpExecArray | null;
    while ((lm = lessonRe.exec(block)) !== null) {
      lessons.push({ slug: lm[1], title: lm[2], summary: lm[3] });
    }
    tracks.push({ slug: t.slug, title: t.title, tagline: t.tagline, lessons });
  }
  return tracks;
}

export function buildRoutes(): RouteMeta[] {
  const routes: RouteMeta[] = [];

  // ---- Core pages ----
  routes.push({
    path: "/",
    title: "TradeHQ — Free Paper Trading Simulator 2026 | $100K Virtual Cash (No Signup)",
    description: `Practice stock, crypto, ETF, forex & commodities trading with ${BALANCE} virtual cash. No signup. AI mentor, simulated charts, portfolio tracking & 150+ assets. Free educational trading simulator.`,
    h1: "TradeHQ — Free Paper Trading Simulator",
    summary: `Practice trading 150+ real assets with ${BALANCE} in virtual cash. No signup, no risk, no real money. An educational simulator for stocks, crypto, ETFs, forex and commodities — trusted by beginners learning the markets.`,
    priority: "1.0",
    changefreq: "daily",
  });

  routes.push({
    path: "/trade",
    title: "Paper Trade 150+ Assets — Free Simulator | TradeHQ",
    description: `Buy and sell 150+ stocks, crypto, ETFs, forex and commodities with ${BALANCE} in virtual cash. No signup, no risk. Educational simulation only.`,
    h1: "Paper Trade 150+ Assets",
    summary: `Choose from 150+ simulated assets and place buy or sell orders instantly. Every account starts with ${BALANCE} in virtual cash. Educational simulation — no real money and no brokerage relationship.`,
    priority: "0.9",
    changefreq: "daily",
  });

  routes.push({
    path: "/markets",
    title: "Live Markets — Stocks, Crypto, ETFs, Forex | TradeHQ",
    description: `Browse 150+ simulated markets across stocks, crypto, ETFs, forex and commodities. Practice trading with ${BALANCE} virtual cash — free, no signup.`,
    h1: "Markets Overview",
    summary: `Browse 150+ simulated markets across every major asset class. Movers, sentiment and sector clusters update throughout the day. Practice trading anything you see with ${BALANCE} virtual cash — free and no signup required.`,
    priority: "0.9",
    changefreq: "daily",
  });

  routes.push({
    path: "/portfolio",
    title: "Your Practice Portfolio — Positions, P&L, Analytics | TradeHQ",
    description: `Track your simulated positions, realised and unrealised P&L, Sharpe ratio, and max drawdown. Free practice portfolio seeded with ${BALANCE}.`,
    h1: "Practice Portfolio",
    summary: `See every position, trade, and analytics metric for your simulated portfolio — Sharpe ratio, max drawdown, sector allocation. Everything stays in your browser. Educational simulation only.`,
    priority: "0.8",
    changefreq: "daily",
  });

  routes.push({
    path: "/learn",
    title: "Learn to Trade — Free Lessons, Guides & Glossary | TradeHQ",
    description: `Free trading lessons, glossary, and step-by-step guides for beginners. Learn stocks, crypto and technical analysis, then practice with ${BALANCE} virtual cash.`,
    h1: "Learn to Trade",
    summary: `Structured lessons, a 50-term glossary, and long-form guides on stocks, crypto, ETFs and technical analysis. Every concept links to a matching practice trade on the free simulator.`,
    priority: "0.9",
    changefreq: "weekly",
  });

  routes.push({
    path: "/learn-trading-guide",
    title: "Complete Beginner Trading Guide 2026 | TradeHQ",
    description: `The full beginner's trading guide for 2026. Learn how markets work, how to place orders and how to manage risk — then practice with ${BALANCE} virtual cash.`,
    h1: "The Complete Beginner Trading Guide",
    summary: `A single long-form guide that walks a complete beginner from zero to placing their first informed trade. Covers order types, chart reading, risk sizing, and psychology. Practice everything with ${BALANCE} in virtual cash on the free simulator.`,
    priority: "0.9",
    changefreq: "weekly",
  });

  routes.push({
    path: "/leaderboard",
    title: "Trader Leaderboard — Top Practice Portfolios | TradeHQ",
    description: `See who is winning on TradeHQ this week. Ranked by simulated P&L, win rate and Sharpe ratio. Free practice account — join with ${BALANCE} virtual cash.`,
    h1: "Trader Leaderboard",
    summary: `See how the community's simulated portfolios stack up on P&L, win rate and Sharpe ratio. Join with a free practice account seeded with ${BALANCE}.`,
    priority: "0.7",
    changefreq: "daily",
  });

  routes.push({
    path: "/ai-mentor",
    title: "AI Trading Mentor — Free Practice Coach | TradeHQ",
    description: `Ask the free AI trading mentor about any strategy, indicator or asset. Educational simulation only — not financial advice.`,
    h1: "AI Trading Mentor",
    summary: `Ask an AI mentor about any indicator, strategy or asset. Answers are educational only — never financial advice. Practice what you learn on the free simulator with ${BALANCE} virtual cash.`,
    priority: "0.7",
    changefreq: "weekly",
  });

  routes.push({
    path: "/daily",
    title: "Daily Trading Challenge — Learn a New Skill Every Day | TradeHQ",
    description: `A new trading challenge every 24 hours. Build streaks, learn faster, and practice with ${BALANCE} virtual cash. Free, no signup.`,
    h1: "Daily Trading Challenge",
    summary: `A new bite-sized trading challenge every day. Build a streak, learn a new pattern, and try it out immediately on the free ${BALANCE} practice account.`,
    priority: "0.9",
    changefreq: "daily",
  });

  routes.push({
    path: "/reviews",
    title: "TradeHQ Reviews — What Traders Are Saying | TradeHQ",
    description: `Read honest reviews from TradeHQ practice traders. Free educational simulator with ${BALANCE} virtual cash — no signup.`,
    h1: "TradeHQ Reviews",
    summary: `Honest, community-submitted reviews of the TradeHQ practice simulator. TradeHQ is a free educational sandbox with ${BALANCE} virtual cash and no brokerage relationship.`,
    priority: "0.6",
    changefreq: "weekly",
  });

  routes.push({
    path: "/roadmap",
    title: "TradeHQ Roadmap — What's Shipping Next | TradeHQ",
    description: `See what's shipping next on TradeHQ. Public roadmap for the free trading simulator — options paper trading, backtesting and more.`,
    h1: "TradeHQ Roadmap",
    summary: `The public roadmap for TradeHQ — upcoming features on the free educational trading simulator, from options paper trading to backtesting and portfolio sharing.`,
    priority: "0.5",
    changefreq: "weekly",
  });

  routes.push({
    path: "/about",
    title: "About TradeHQ — Built by Anuga Weerasinghe | TradeHQ",
    description: `TradeHQ is a free educational trading simulator built by Anuga Weerasinghe. No brokerage, no real money, no signup — just ${BALANCE} virtual cash to learn with.`,
    h1: "About TradeHQ",
    summary: `TradeHQ is a free educational trading simulator built by Anuga Weerasinghe. It is not a brokerage. There is no real money, no signup, and no advertising trackers. Every practice account starts with ${BALANCE} virtual cash.`,
    priority: "0.6",
    changefreq: "monthly",
  });

  routes.push({
    path: "/contact",
    title: "Contact TradeHQ | TradeHQ",
    description: `Contact the TradeHQ team. Free educational trading simulator. We usually reply within 2 business days.`,
    h1: "Contact TradeHQ",
    summary: `Send a message to the TradeHQ team. Response time is typically within two business days. TradeHQ is a free educational simulator — not a brokerage.`,
    priority: "0.4",
    changefreq: "monthly",
  });

  routes.push({
    path: "/privacy",
    title: "Privacy Policy | TradeHQ",
    description: `TradeHQ privacy policy. What we store (locally in your browser), what we send to the server, and what we never do. Free educational trading simulator.`,
    h1: "Privacy Policy",
    summary: `TradeHQ stores your portfolio, journal, watchlist and streaks locally in your browser. We do not sell data, run ad trackers, or run behavioural profiling. Full policy below.`,
    priority: "0.3",
    changefreq: "monthly",
  });

  routes.push({
    path: "/terms",
    title: "Terms of Service | TradeHQ",
    description: `TradeHQ terms of service. Free educational trading simulator — no brokerage, no real money, no financial advice.`,
    h1: "Terms of Service",
    summary: `TradeHQ is a free educational simulator. It is not a brokerage, does not execute real trades, and none of its content is financial advice. Full terms below.`,
    priority: "0.3",
    changefreq: "monthly",
  });

  // ---- Trade asset pages (/trade/:id) ----
  for (const a of extractAssets()) {
    routes.push({
      path: `/trade/${a.id}`,
      title: `Paper Trade ${a.name} (${a.symbol}) Free — ${BALANCE} Simulator | TradeHQ`,
      description: `Practice trading ${a.name} (${a.symbol}) risk-free with ${BALANCE} in virtual cash. Simulated charts, portfolio tracking, no signup. Educational only.`,
      h1: `Paper Trade ${a.name} (${a.symbol})`,
      summary: `Simulate buying and selling ${a.name} (${a.symbol}) with ${BALANCE} in virtual cash. Charts and prices are for education only — no real money, no brokerage relationship.`,
      priority: "0.8",
      changefreq: "daily",
    });
  }

  // ---- Wiki glossary pages (/wiki/:slug) ----
  for (const g of extractGlossary()) {
    routes.push({
      path: `/wiki/${g.slug}`,
      title: `${g.term} — Definition, Example & How to Trade It | TradeHQ Wiki`,
      description: g.definition.length > 150 ? g.definition.slice(0, 147) + "..." : g.definition,
      h1: `${g.term} — Trading Wiki`,
      summary: `${g.definition} Practice trading this concept on TradeHQ with ${BALANCE} in free virtual cash.`,
      priority: "0.7",
      changefreq: "weekly",
    });
  }

  // ---- Learn articles (/learn/article/:slug) ----
  for (const a of extractLearnArticles()) {
    routes.push({
      path: `/learn/article/${a.slug}`,
      title: `${a.title} | TradeHQ Learn`,
      description: a.metaDescription,
      h1: a.title,
      summary: a.summary,
      priority: "0.8",
      changefreq: "weekly",
    });
  }

  // ---- Niche asset pages (/niche/:symbol) ----
  for (const sym of extractNicheSymbols()) {
    routes.push({
      path: `/niche/${sym}`,
      title: `${sym} Deep Dive — Chart, Analysis & Paper Trade | TradeHQ`,
      description: `In-depth ${sym} analysis with practice trading. ${BALANCE} virtual cash, no signup. Educational simulation only — not financial advice.`,
      h1: `${sym} — Deep Dive`,
      summary: `A dedicated ${sym} research page with simulated charts, AI-mentor commentary, and one-click paper trading. Everything is educational — no real orders and no brokerage.`,
      priority: "0.6",
      changefreq: "daily",
    });
  }

  // ---- Programmatic SEO pages from seoData ----
  for (const c of extractSeoDataList("COMPARE_PAIRS")) {
    if (!c.slug) continue;
    const label = c.slug.replace(/-/g, " ");
    routes.push({
      path: `/compare/${c.slug}`,
      title: `${label.replace(/\b\w/g, (l) => l.toUpperCase())} — Which Should You Trade? | TradeHQ`,
      description: c.intro || `Compare and paper-trade both with ${BALANCE} in virtual cash. Educational simulation only.`,
      h1: `${label.replace(/\b\w/g, (l) => l.toUpperCase())}`,
      summary: c.intro || `Head-to-head comparison and practice trading with ${BALANCE} virtual cash.`,
      priority: "0.7",
      changefreq: "weekly",
    });
  }

  routes.push({
    path: "/compare",
    title: "Compare Assets — Head-to-Head Trading Guides | TradeHQ",
    description: `Side-by-side comparisons of stocks, crypto and ETFs. Practice trading both with ${BALANCE} in free virtual cash.`,
    h1: "Compare Assets",
    summary: `Head-to-head comparisons across stocks, crypto and ETFs — so you can decide what to paper trade first with your ${BALANCE} practice balance.`,
    priority: "0.7",
    changefreq: "weekly",
  });

  for (const h of extractSeoDataList("HOWTO_ASSETS")) {
    if (!h.symbol) continue;
    const label = h.fullName || h.name || h.symbol.toUpperCase();
    routes.push({
      path: `/how-to-trade/${h.symbol}`,
      title: `How to Trade ${label} in 2026 — Step-by-Step Guide | TradeHQ`,
      description: `Learn how to trade ${label} step-by-step with ${BALANCE} virtual cash. Free practice account, no signup. Educational simulation only.`,
      h1: `How to Trade ${label}`,
      summary: h.whyTrade || `Step-by-step guide to trading ${label}, followed by risk-free practice on the free ${BALANCE} simulator.`,
      priority: "0.7",
      changefreq: "weekly",
    });
  }

  routes.push({
    path: "/how-to-trade",
    title: "How to Trade — Step-by-Step Asset Guides | TradeHQ",
    description: `Free step-by-step guides on how to trade Bitcoin, Ethereum, Tesla, Nvidia and more. Practise with ${BALANCE} virtual cash, no signup.`,
    h1: "How to Trade — Guides",
    summary: `Pick an asset and follow a step-by-step guide, then try it on the free simulator with ${BALANCE} virtual cash.`,
    priority: "0.7",
    changefreq: "weekly",
  });

  for (const s of extractSeoDataList("STRATEGIES")) {
    if (!s.slug) continue;
    const label = (s.title || s.slug).replace(/-/g, " ");
    routes.push({
      path: `/strategy/${s.slug}`,
      title: `${label} — Trading Strategy Guide | TradeHQ`,
      description: s.hook || s.intro || `Learn the ${label} strategy, then practice it with ${BALANCE} virtual cash.`,
      h1: label.replace(/\b\w/g, (l) => l.toUpperCase()),
      summary: s.hook || s.intro || `A step-by-step walkthrough of the ${label} strategy with practice on the free ${BALANCE} simulator.`,
      priority: "0.7",
      changefreq: "weekly",
    });
  }

  routes.push({
    path: "/strategy",
    title: "Trading Strategies — Free Guides & Simulator | TradeHQ",
    description: `Curated trading strategies with step-by-step examples. Practice each one with ${BALANCE} virtual cash — free, no signup.`,
    h1: "Trading Strategies",
    summary: `Curated trading strategies you can learn and immediately practice with ${BALANCE} in virtual cash.`,
    priority: "0.7",
    changefreq: "weekly",
  });

  // ---- Structured course tracks (/courses, /courses/:track, /courses/:track/:lesson) ----
  routes.push({
    path: "/courses",
    title: "Free Trading Courses 2026 — Options, Futures, Macro & Psychology | TradeHQ",
    description: `Four structured, expert-written trading courses. Free lessons, quizzes and completion badges. Practice with ${BALANCE} virtual cash.`,
    h1: "Structured Trading Courses",
    summary: `Four structured tracks — options, futures, macro reading, and trading psychology — each with quizzes and a completion badge. Practice everything with ${BALANCE} in virtual cash on TradeHQ.`,
    priority: "0.8",
    changefreq: "weekly",
  });
  for (const t of extractCourses()) {
    routes.push({
      path: `/courses/${t.slug}`,
      title: `${t.title} — Free Trading Course | TradeHQ`,
      description: `${t.tagline} ${t.lessons.length} free lessons with quizzes and a completion badge. Practice with ${BALANCE} virtual cash.`,
      h1: t.title,
      summary: `${t.tagline} Includes ${t.lessons.length} lessons, quizzes, sources, and a completion badge — plus a free ${BALANCE} practice account to apply everything you learn.`,
      priority: "0.75",
      changefreq: "weekly",
    });
    for (const l of t.lessons) {
      routes.push({
        path: `/courses/${t.slug}/${l.slug}`,
        title: `${l.title} — ${t.title} | TradeHQ`,
        description: l.summary.length > 155 ? l.summary.slice(0, 152) + "..." : l.summary,
        h1: l.title,
        summary: `${l.summary} Practice with ${BALANCE} virtual cash on TradeHQ — educational simulation only, not financial advice.`,
        priority: "0.7",
        changefreq: "monthly",
      });
    }
  }

  return routes;
}

// Dedupe path collisions (last write wins) so future data overlap can't ship two entries for the same URL.
export function uniqueRoutes(): RouteMeta[] {
  const map = new Map<string, RouteMeta>();
  for (const r of buildRoutes()) map.set(r.path, r);
  return Array.from(map.values());
}