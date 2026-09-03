/**
 * Builds crawler-visible page content (real sections, not a loading
 * placeholder) for every prerendered route, from the same data modules
 * the React app renders at runtime.
 */

import { loadSiteData } from "./loadData";
import { STATIC_COPY, DISCLAIMER } from "./staticCopy";

export interface PageSection {
  h: string;
  p?: string[];
  list?: string[];
}

export interface PageContent {
  sections: PageSection[];
  links: { href: string; label: string }[];
}

const BALANCE = "$100,000";

/** Strip markdown-ish artefacts from lesson bodies for the static HTML. */
function clean(s: string): string {
  return s.replace(/^#+\s*/, "").replace(/\*\*/g, "").trim();
}

export async function buildContentMap(): Promise<Map<string, PageContent>> {
  const d: any = await loadSiteData();
  const map = new Map<string, PageContent>();

  for (const [path, content] of Object.entries(STATIC_COPY)) map.set(path, content);

  // ---------- Wiki glossary ----------
  const glossary: any[] = d.tradingGlossary;
  const bySlug = new Map(glossary.map((g) => [g.slug, g]));

  map.set("/wiki", {
    sections: [
      {
        h: "A plain-language trading glossary",
        p: [
          `Every term used across TradeHQ's lessons, guides and strategy pages is defined here in plain English, with an expert-level explanation, a worked example and a practical tip for each entry. There are ${glossary.length} terms in the index, grouped by the part of trading they belong to.`,
          "Definitions are written for people who are learning, not for people who already know. Where a term has a contested or marketing-inflated meaning, the entry says so rather than repeating the sales version.",
        ],
      },
      {
        h: "Browse by category",
        list: Array.from(new Set(glossary.map((g) => g.category))).map(
          (c) => `${c}: ${glossary.filter((g) => g.category === c).map((g) => g.term).slice(0, 8).join(", ")}`
        ),
      },
      {
        h: "How to use the glossary while practising",
        list: [
          "Look a term up the first time you meet it rather than guessing from context.",
          "After reading an entry, find the same concept on a live chart in the simulator.",
          "Use the related-terms links at the bottom of each entry to build a map of the topic.",
          `Practise anything you learn with ${BALANCE} in virtual cash — ${DISCLAIMER}`,
        ],
      },
    ],
    links: glossary.slice(0, 24).map((g) => ({ href: `/wiki/${g.slug}`, label: g.term })),
  });

  for (const g of glossary) {
    const related = (g.relatedTerms || []).filter((r: string) => bySlug.has(r));
    map.set(`/wiki/${g.slug}`, {
      sections: [
        { h: `What ${g.term} means`, p: [g.definition] },
        { h: "In depth", p: splitParagraphs(g.expertDefinition) },
        { h: "Key points", list: g.keyPoints },
        { h: "Practical tip", p: [g.proTip] },
        { h: "Why it matters when you are learning", p: [g.studentPerspective] },
        {
          h: `Practising ${g.term} on the simulator`,
          p: [
            `Reading a definition is not the same as recognising ${g.term} in a live chart under time pressure. Open the practice desk, find the pattern or condition described above on an instrument you already follow, and place a small simulated position with a written invalidation level. Review it a day later in the journal and note whether the concept behaved the way this page describes. ${DISCLAIMER}`,
          ],
        },
      ],
      links: [
        ...related.map((r: string) => ({ href: `/wiki/${r}`, label: bySlug.get(r)!.term })),
        { href: "/wiki", label: "Full glossary index" },
        { href: "/trade", label: "Practice desk" },
      ],
    });
  }

  // ---------- Courses ----------
  const tracks: any[] = d.courseTracks;
  map.set("/courses", {
    sections: [
      {
        h: "Four structured tracks",
        p: [
          "Courses on TradeHQ are sequential tracks, not a pile of articles. Each track states what you will be able to do at the end, what you need to know first, how the lessons build on one another, and who the track is not suitable for. Every lesson ends with key takeaways, cited sources and a short quiz, and each completed track awards a badge.",
        ],
      },
      ...tracks.map((t) => ({
        h: `${t.title} (${t.level}, ${t.lessons.length} lessons)`,
        p: [t.description],
        list: t.lessons.map((l: any) => `${l.title} — ${l.summary}`),
      })),
      {
        h: "How to work through a track",
        list: [
          "Do one lesson per session and take the quiz before moving on.",
          `Apply each lesson in the simulator the same day using ${BALANCE} of virtual cash.`,
          "Re-read the key takeaways a week later; recall beats re-reading for retention.",
          `Nothing in these courses is a recommendation. ${DISCLAIMER}`,
        ],
      },
    ],
    links: tracks.map((t) => ({ href: `/courses/${t.slug}`, label: t.title })),
  });

  for (const t of tracks) {
    map.set(`/courses/${t.slug}`, {
      sections: [
        { h: "About this track", p: [t.tagline, t.description] },
        { h: "What you will be able to do", list: t.outcomes },
        { h: "Before you start", p: [t.prerequisites] },
        { h: "How the lessons build", p: [t.progression] },
        { h: "Who this track is not for", p: [t.notFor] },
        {
          h: "Lessons in this track",
          list: t.lessons.map((l: any) => `${l.title} (${l.readingMinutes} min) — ${l.summary}`),
        },
        {
          h: "Completion badge",
          p: [`${t.badge.name}: ${t.badge.description} ${DISCLAIMER}`],
        },
      ],
      links: [
        ...t.lessons.map((l: any) => ({ href: `/courses/${t.slug}/${l.slug}`, label: l.title })),
        { href: "/courses", label: "All courses" },
      ],
    });

    t.lessons.forEach((l: any, i: number) => {
      const prev = t.lessons[i - 1];
      const next = t.lessons[i + 1];
      map.set(`/courses/${t.slug}/${l.slug}`, {
        sections: [
          { h: "Summary", p: [l.summary] },
          ...groupLessonBody(l.body),
          { h: "Key takeaways", list: l.keyTakeaways },
          {
            h: "Check your understanding",
            list: l.quiz.map((q: any) => `${q.question} — ${q.explanation}`),
          },
          {
            h: "Sources",
            list: (l.sources || []).map((s: any) => `${s.label} (${s.url})`),
          },
          {
            h: "Practise this lesson",
            p: [
              `Open the practice desk and apply this lesson immediately with ${BALANCE} in virtual cash. Concepts become usable when they are rehearsed under simulated conditions, not when they are read. ${DISCLAIMER}`,
            ],
          },
        ],
        links: [
          ...(prev ? [{ href: `/courses/${t.slug}/${prev.slug}`, label: `Previous: ${prev.title}` }] : []),
          ...(next ? [{ href: `/courses/${t.slug}/${next.slug}`, label: `Next: ${next.title}` }] : []),
          { href: `/courses/${t.slug}`, label: t.title },
          { href: "/courses", label: "All courses" },
        ],
      });
    });
  }

  // ---------- Compare ----------
  const pairs: any[] = d.COMPARE_PAIRS;
  map.set("/compare", {
    sections: [
      {
        h: "Head-to-head comparisons",
        p: [
          "Comparison pages answer the question beginners actually ask: given two instruments that look similar, which one should I learn on first? Each page explains what each side really is, where they differ structurally, when one is the better learning vehicle, and the mistakes people make when they treat them as interchangeable.",
        ],
      },
      {
        h: "Available comparisons",
        list: pairs.map((p) => `${p.a.name} vs ${p.b.name} — ${p.a.tag} against ${p.b.tag}`),
      },
      {
        h: "How to use a comparison",
        list: [
          "Read both deep-dive sections before looking at the verdict.",
          "Practise both sides in the simulator for a week before deciding which suits you.",
          "Note that 'better' here means better to learn on, never better to buy.",
          DISCLAIMER,
        ],
      },
    ],
    links: pairs.map((p) => ({ href: `/compare/${p.slug}`, label: `${p.a.name} vs ${p.b.name}` })),
  });

  for (const p of pairs) {
    map.set(`/compare/${p.slug}`, {
      sections: [
        { h: "The short answer", p: [p.intro] },
        { h: `${p.a.name}: ${p.a.tag}`, p: [p.deepDive[0]] },
        { h: `${p.b.name}: ${p.b.tag}`, p: [p.deepDive[1] || p.deepDive[0]] },
        { h: "Key differences", list: p.bullets },
        { h: "Which to practise first", p: [p.verdict] },
        { h: "Common mistakes with this comparison", list: p.mistakes },
        {
          h: "Practise both sides",
          p: [
            `Rather than picking on paper, trade both in the simulator with identical position sizes for a few weeks and compare how each behaves in your own hands. ${DISCLAIMER}`,
          ],
        },
      ],
      links: [
        { href: "/compare", label: "All comparisons" },
        { href: "/markets", label: "Browse markets" },
        { href: "/trade", label: "Practice desk" },
      ],
    });
  }

  // ---------- How to trade ----------
  const howto: any[] = d.HOWTO_ASSETS;
  map.set("/how-to-trade", {
    sections: [
      {
        h: "Step-by-step asset guides",
        p: [
          "Each guide covers one instrument: what actually moves it, a concrete first practice trade with sizing, when during the day or week it is worth trading, the mistakes beginners repeatedly make with that specific instrument, and how to review the trade afterwards.",
        ],
      },
      { h: "Available guides", list: howto.map((h) => `${h.fullName} (${h.type}) — ${h.whyTrade}`) },
    ],
    links: howto.map((h) => ({ href: `/how-to-trade/${h.symbol}`, label: `How to trade ${h.fullName}` })),
  });

  for (const h of howto) {
    map.set(`/how-to-trade/${h.symbol}`, {
      sections: [
        { h: `Why people trade ${h.fullName}`, p: [h.whyTrade] },
        { h: "What actually moves it", list: h.drivers },
        { h: "Step by step", list: h.steps },
        { h: "A realistic first practice trade", p: [h.firstTrade] },
        { h: "Timing and liquidity", p: [h.timing] },
        { h: "Mistakes specific to this instrument", list: h.mistakes },
        { h: "Reviewing the trade afterwards", p: [h.review] },
        { h: "Risk", p: [h.risk] },
        { h: "If you are learning from outside the US", p: [h.studentNote, DISCLAIMER] },
      ],
      links: [
        { href: `/trade/${h.symbol}`, label: `${h.fullName} practice page` },
        { href: "/how-to-trade", label: "All asset guides" },
        { href: "/strategy", label: "Strategy guides" },
      ],
    });
  }

  // ---------- Strategies ----------
  const strategies: any[] = d.STRATEGIES;
  map.set("/strategy", {
    sections: [
      {
        h: "Named strategy walkthroughs",
        p: [
          "Each strategy page explains where the method came from, the market conditions that help or hurt it, the exact steps to follow, a worked numeric example of expectancy and sizing, and the three ways it most often fails. None of them are presented as reliable ways to make money.",
        ],
      },
      { h: "Strategies covered", list: strategies.map((s) => `${s.name} — ${s.oneLiner}`) },
    ],
    links: strategies.map((s) => ({ href: `/strategy/${s.slug}`, label: s.name })),
  });

  for (const s of strategies) {
    map.set(`/strategy/${s.slug}`, {
      sections: [
        { h: "What it is", p: [s.oneLiner, s.depth.context] },
        { h: "Market conditions that matter", p: [s.depth.regime] },
        { h: "Best suited to", p: [s.bestFor] },
        { h: "Badly suited to", p: [s.worstFor] },
        { h: "The steps", list: s.steps },
        { h: "Worked example", p: [s.example] },
        { h: "The numbers behind it", p: [s.depth.math] },
        { h: "How it fails", list: s.depth.mistakes },
        {
          h: "Practising it safely",
          p: [
            `Run this method for at least thirty simulated trades with fixed sizing before judging it, and record every trade in the journal. A handful of winners proves nothing. ${DISCLAIMER}`,
          ],
        },
      ],
      links: [
        { href: "/strategy", label: "All strategies" },
        { href: "/wiki", label: "Glossary" },
        { href: "/trade", label: "Practice desk" },
      ],
    });
  }

  // ---------- Country guides ----------
  const countries: any[] = d.COUNTRY_GUIDES;
  map.set("/learn/country", {
    sections: [
      {
        h: "Localised learning guides",
        p: [
          "These guides explain how someone in a specific country actually reaches global markets: which regulator supervises brokers there, which local exchange exists, how much starting capital is realistic in local currency, and which assets are worth following while learning. They are educational context, not advice, and they do not rank or recommend brokers.",
        ],
      },
      {
        h: "Guides available",
        list: countries.map((c) => `${c.country} — ${c.localExchange}, regulated by ${c.regulator.name}, local currency ${c.currency}`),
      },
    ],
    links: countries.map((c) => ({ href: `/learn/country/${c.slug}`, label: `Learn trading in ${c.country}` })),
  });

  for (const c of countries) {
    map.set(`/learn/country/${c.slug}`, {
      sections: [
        { h: `Trading from ${c.country}`, p: [c.intro] },
        { h: "Why practise first", p: [c.whyPractice] },
        { h: "How market access works here", p: [c.marketAccess] },
        { h: "Regulation", p: [`Brokers serving ${c.country} residents are supervised by the ${c.regulator.name} (${c.regulator.url}). Check any broker's licence with the regulator directly before sending money.`] },
        { h: "Broker types used locally", list: c.brokers },
        { h: "Realistic starting capital", p: [c.startingCapital] },
        { h: "Locally relevant assets to follow", list: c.localAssets },
        { h: "A three-month practice plan", p: [c.practicePlan] },
        { h: "Tax", p: [`${c.taxNote} This is general information, not tax advice — confirm your own position with a qualified local professional.`] },
        { h: "If you are a student", p: [c.studentAngle] },
        { h: "Questions people in this country ask", list: c.faqs.map((f: any) => `${f.q} — ${f.a}`) },
      ],
      links: [
        { href: "/learn/country", label: "All country guides" },
        { href: "/learn-trading-guide", label: "Beginner guide" },
        { href: "/courses", label: "Structured courses" },
      ],
    });
  }

  // ---------- Learn articles ----------
  for (const a of d.LEARN_ARTICLES as any[]) {
    map.set(`/learn/article/${a.slug}`, {
      sections: [
        { h: "Summary", p: [a.summary] },
        ...a.sections.map((s: any) => ({ h: s.heading, p: s.paragraphs })),
        { h: "Practise what you just read", p: [`Apply this in the simulator with ${BALANCE} in virtual cash. ${DISCLAIMER}`] },
      ],
      links: [...(a.relatedLinks || []).map((l: any) => ({ href: l.href, label: l.label })), { href: "/learn", label: "All learn articles" }],
    });
  }

  // ---------- Trade asset pages with authored content ----------
  const content: Record<string, any> = d.ASSET_CONTENT;
  const faqs: Record<string, any[]> = d.ASSET_FAQS;
  const intros: Record<string, string> = d.CATEGORY_INTROS;
  const assets: any[] = d.ASSETS;
  const howtoSyms = new Set(howto.map((h) => h.symbol));

  for (const a of assets) {
    const c = content[a.id];
    if (!c) continue;
    const f = faqs[a.id] || [];
    const stats = Object.entries(c.stats || {})
      .filter(([, v]) => v !== "live_sourced_at_runtime")
      .map(([k, v]) => `${humanise(k)}: ${v}`);
    map.set(`/trade/${a.id}`, {
      sections: [
        { h: `What ${a.name} is`, p: [c.whatIs] },
        { h: `${c.category} as an asset class`, p: [intros[a.type] || ""] },
        ...(stats.length ? [{ h: "Reference facts", list: stats }] : []),
        { h: "How to practise it here", p: [c.strategy] },
        ...(c.executiveOutlook ? [{ h: "Context to be aware of", p: [`${c.executiveOutlook.summary} This is background context on the asset, not a forecast and not a recommendation.`] }] : []),
        ...(c.institutionalDrivers
          ? [{ h: "Arguments people make on each side", list: [`Bull case commonly cited: ${c.institutionalDrivers.bull}`, `Bear case commonly cited: ${c.institutionalDrivers.bear}`] }]
          : []),
        ...(f.length ? [{ h: `Common questions about trading ${a.name}`, list: f.map((q) => `${q.question} — ${q.answer}`) }] : []),
        {
          h: "Before you place a practice order",
          list: [
            `Decide the size first: 1-2% of your ${BALANCE} practice balance, not a round number of shares or coins.`,
            "Write the invalidation level down before entry, not after the position moves against you.",
            `Read the ${a.name} guide and glossary entries for any term you cannot define out loud.`,
            `Review the trade a day later in the journal. ${DISCLAIMER}`,
          ],
        },
      ],
      links: [
        ...(howtoSyms.has(a.id) ? [{ href: `/how-to-trade/${a.id}`, label: `How to trade ${a.name}` }] : []),
        { href: "/markets", label: "All markets" },
        { href: "/wiki", label: "Glossary" },
        { href: "/learn-trading-guide", label: "Beginner guide" },
      ],
    });
  }

  return map;
}

function humanise(k: string): string {
  return k.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());
}

function splitParagraphs(text: string): string[] {
  const sentences = text.split(/(?<=\.)\s+/);
  const out: string[] = [];
  let buf: string[] = [];
  for (const s of sentences) {
    buf.push(s);
    if (buf.join(" ").length > 550) {
      out.push(buf.join(" "));
      buf = [];
    }
  }
  if (buf.length) out.push(buf.join(" "));
  return out;
}

/** Lesson bodies use "## Heading" markers between paragraph runs. */
function groupLessonBody(body: string[]): PageSection[] {
  const sections: PageSection[] = [];
  let current: PageSection | null = null;
  for (const raw of body) {
    if (/^#{2,}\s/.test(raw)) {
      if (current) sections.push(current);
      current = { h: clean(raw), p: [] };
    } else {
      if (!current) current = { h: "Lesson", p: [] };
      current.p!.push(clean(raw));
    }
  }
  if (current) sections.push(current);
  return sections.filter((s) => (s.p || []).length > 0);
}
