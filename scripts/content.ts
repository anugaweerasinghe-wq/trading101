/**
 * Builds crawler-visible page content (real sections, not a loading
 * placeholder) for every prerendered route, from the same data modules
 * the React app renders at runtime.
 */

import { loadSiteData } from "./loadData";
import { STATIC_COPY, DISCLAIMER } from "./staticCopy";
import { EXTRA_SECTIONS } from "./staticCopyExtra";

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


/** Asset-class specific pre-trade checklist, so instrument pages do not all
 *  close with the same four lines of text. */
const TYPE_CHECKLIST: Record<string, string[]> = {
  crypto: [
    "Check what the position would be worth after a 10% overnight move before you size it — crypto gaps happen while you sleep.",
    "Note whether the move you are reacting to came with rising volume or is a thin weekend drift.",
    "Write the invalidation price down first; leverage-driven wicks punish stops that are decided afterwards.",
  ],
  stock: [
    "Check whether earnings, a split or an index event falls inside your intended holding window.",
    "Size against the recent daily range rather than a round number of shares.",
    "Decide in advance what news would make you exit, and write it in the journal before entry.",
  ],
  etf: [
    "Look at what the fund actually holds; two ETFs with similar names can behave very differently.",
    "Remember that a broad fund moves slower than its largest holding — set expectations for a smaller daily range.",
    "Treat it as an exercise in patience: fund positions reward a longer review cycle than single names.",
  ],
  forex: [
    "Note which session you are trading in; the same pair behaves differently in London and in Asia.",
    "Check the economic calendar for rate decisions or inflation prints inside your window.",
    "Express risk in account currency, not pips, so the size means something concrete.",
  ],
  commodity: [
    "Check whether the move is supply-driven, demand-driven or currency-driven before deciding it is a trend.",
    "Expect seasonality: several commodities have recurring demand patterns that distort short samples.",
    "Give the position a wider stop and a smaller size than an equity trade of the same conviction.",
  ],
};


/** Asset-class background used as supporting context on instrument pages. */
const TYPE_GUIDE: Record<string, { h: string; p: string[]; list: string[] }> = {
  crypto: {
    h: "How to approach a crypto instrument as a learner",
    p: [
      "Crypto markets never close, which sounds convenient and is actually the hardest part of learning on them. There is no closing bell to force a review, no overnight gap to punish sloppy sizing visibly, and no session structure to tell you when liquidity is thin. Volatility is several times that of a large-cap equity, so a position size that feels small can produce an equity swing that feels enormous.",
      "Price is driven by overall market liquidity, flows into and out of listed products, exchange and custody news, protocol changes, and — more than most participants admit — leverage. Forced liquidations of leveraged positions cause a large share of the sharpest moves in both directions, which is why the same headline can produce a 2% move one week and a 12% move the next.",
    ],
    list: [
      "Size crypto positions smaller than equity positions for the same account risk; the stop distance has to be wider.",
      "Set a fixed review time each day, because the market will not create one for you.",
      "Never learn on leverage. Liquidation is a permanent loss of capital, not a temporary drawdown.",
      "Treat weekend moves with suspicion: liquidity is thinner and prices move further on less volume.",
    ],
  },
  stock: {
    h: "How to approach a listed stock as a learner",
    p: [
      "A share is a claim on a real business, so its price responds to earnings, guidance, margins, competition and the interest rate used to discount future profits. Over days, sentiment and sector rotation dominate; over years, the business does. Beginners tend to have a view about the company and no view at all about the timeframe on which that view could be right.",
      "Equities also carry structural features a simulator makes easy to forget: they gap between sessions, they halt on news, earnings dates cluster volatility into single days, and index membership can move a price for reasons unrelated to the business.",
    ],
    list: [
      "Know the next earnings date before entering; it is the single most predictable source of a large move.",
      "A stop does not protect you overnight — price can open below it.",
      "Read the last quarterly report before forming an opinion about the company.",
      "Be honest about whether your idea is a trade with an exit or an investment with a thesis.",
    ],
  },
  etf: {
    h: "How to approach an ETF as a learner",
    p: [
      "An exchange-traded fund is a basket, so its behaviour comes from what it holds and how it is weighted. A broad market ETF spreads risk across hundreds of companies; a sector or thematic ETF concentrates it, and can fall as hard as any single stock when that theme goes out of favour. The word 'diversified' on a fact sheet is not the same as diversified in practice.",
      "Costs and structure matter more than beginners expect: an expense ratio compounds, leveraged and inverse products reset daily and decay in choppy markets, and thinly traded funds can trade away from the value of their holdings.",
    ],
    list: [
      "Check the top ten holdings and their combined weight before assuming a fund is broad.",
      "Avoid daily-leveraged and inverse products entirely while learning — their maths works against holding periods longer than a day.",
      "Prefer funds with high average volume so the spread does not quietly tax every trade.",
      "Compare the fund's return to its benchmark, not to an unrelated index.",
    ],
  },
  forex: {
    h: "How to approach a currency pair as a learner",
    p: [
      "A currency pair is a relative price: buying one currency is simultaneously selling the other, so every move reflects a change in the relationship rather than in a single asset. The main drivers are interest-rate expectations, inflation data, growth surprises and global risk appetite, and the largest moves cluster around central-bank meetings and monthly data releases.",
      "Retail forex is where leverage does the most damage. Because daily percentage moves are small compared with equities or crypto, brokers offer very high leverage, which turns an ordinary move into an account-ending one. The mechanics are simple; the position sizing is where beginners fail.",
    ],
    list: [
      "Learn the economic calendar before learning any indicator — timing beats analysis in this market.",
      "Trade during the session where the pair is most liquid; spreads widen dramatically outside it.",
      "Calculate position size from stop distance and account risk every single time.",
      "Ignore any material that presents high leverage as an opportunity rather than a hazard.",
    ],
  },
  commodity: {
    h: "How to approach a commodity as a learner",
    p: [
      "Commodities are physical goods, so supply and demand for the actual material sets the price: weather, harvests, output decisions, inventories, transport and storage all matter in ways they never do for a share. Many commodities are also seasonal, and that seasonality shows up in price patterns that have a real cause rather than a chart-pattern one.",
      "Most commodity exposure is taken through futures, which expire and roll. That roll has a cost or a benefit depending on the shape of the forward curve, and it is the reason a long-held commodity product can drift away from the spot price it appears to track.",
    ],
    list: [
      "Learn what physically drives this specific commodity before trading it — the drivers differ completely between energy, metals and agriculture.",
      "Understand contract expiry and rolling if you ever move beyond a simulator.",
      "Expect gaps around production decisions, inventory reports and geopolitical news.",
      "Currency matters: most commodities are priced in dollars, so the dollar itself is part of the trade.",
    ],
  },
};


/** Per-asset-class note on where a simulator stops being representative. */
const TYPE_LIVE_GAP: Record<string, string> = {
  crypto:
    "One caveat before you take any of this to a live venue: crypto exchanges differ enormously in fees, withdrawal rules, custody arrangements and how they handle outages, and none of that appears in a simulator. Practice teaches you sizing, patience and how the instrument moves; it cannot teach you what happens when a venue halts withdrawals or when a stop is triggered during a liquidity gap at three in the morning. Assume live execution will be worse than practice execution, and that the emotional weight of a real drawdown in an asset that moves this fast is substantially heavier than the same percentage on a practice screen.",
  stock:
    "One caveat before you take any of this to a live account: real equity execution includes commissions or spreads, settlement rules, and the possibility of an overnight gap straight through your stop. Practice teaches you position sizing, patience and how earnings dates reshape a chart; it cannot teach you how it feels to hold a position through a halt or to watch a gap open against you before the market does. Assume live results will be meaningfully worse than practice results, and treat any simulated track record as evidence about your process rather than a forecast of returns.",
  etf:
    "One caveat before you take any of this to a live account: a fund's expense ratio, tracking difference, bid-ask spread and any dividend or distribution treatment all affect real returns and none of them are fully modelled here. Practice teaches you how the basket behaves and how to size exposure to it; it cannot teach you the tax treatment in your country or how a thinly traded fund behaves in a stressed market. Confirm the fund's own documentation before committing money, and assume real returns will lag the simulated ones.",
  forex:
    "One caveat before you take any of this to a live account: retail forex execution involves spreads that widen around news, overnight financing on positions held past the daily rollover, and leverage terms that vary by jurisdiction. None of those costs are fully represented in a simulator. Practice teaches you the mechanics of a pair and the discipline of sizing from a stop; it cannot teach you what a widened spread does to a tight stop during a rate decision. Assume live results are worse, and treat leverage as a hazard rather than a feature.",
  commodity:
    "One caveat before you take any of this to a live account: real commodity exposure usually means futures or a fund holding futures, which brings contract expiry, roll costs, margin requirements and, in some products, the theoretical obligation to take delivery. None of that is modelled here. Practice teaches you what drives the underlying market and how to size a volatile position; it cannot teach you the operational mechanics of a futures account. Read the contract specification and the product documentation before committing money.",
};

export async function buildContentMap(): Promise<Map<string, PageContent>> {
  const d: any = await loadSiteData();
  const map = new Map<string, PageContent>();

  for (const [path, content] of Object.entries(STATIC_COPY)) {
    map.set(path, {
      ...content,
      sections: [...content.sections, ...(EXTRA_SECTIONS[path] || [])],
    });
  }

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
        h: "Why a glossary matters more in trading than in most subjects",
        p: [
          "Trading vocabulary is unusually hostile to beginners because the same word often carries a precise technical meaning and a loose marketing meaning at the same time. 'Leverage' is a neutral description of borrowed exposure in a textbook and a sales pitch in an advertisement. 'Support' is a level where buyers previously appeared, not a floor that holds. Reading material without pinning down which meaning is in play is how people end up confident about something they have misunderstood.",
          "Each entry here therefore gives a plain definition first, then a longer expert explanation of the mechanics, then the practical caveat that matters when you try to use the idea. Where a concept is popular but weakly evidenced, the entry says so instead of repeating the folklore.",
        ],
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
            glossaryPractice(g),
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
            list: l.quiz.map(
              (q: any) =>
                `${q.question} Options: ${q.options.join("; ")}. Correct answer: ${q.options[q.correctAnswer]}. Why: ${q.explanation}`
            ),
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
          "Comparison pages explain how two instruments differ in structure, market drivers and risk. They are designed to support side-by-side simulator exercises rather than choose a winner or tell a learner which asset to use.",
        ],
      },
      {
        h: "Available comparisons",
        list: pairs.map((p) => `${p.a.name} vs ${p.b.name} — ${p.a.tag} against ${p.b.tag}`),
      },
      {
        h: "Why comparison beats a ranking",
        p: [
          "Two instruments that look similar on a chart can represent very different legal claims, market structures and sources of risk. These pages compare those differences without inferring personal suitability from age, experience, schedule or a short simulation sample.",
          "None of them tell you what to buy or predict which side will perform better. The comparison-lens section summarizes the structural difference without ranking either instrument.",
        ],
      },
      {
        h: "How to use a comparison",
        list: [
          "Read both deep-dive sections before the comparison lens so each instrument is understood on its own terms first.",
          "Practise both sides under the same hypothetical assumptions and compare the recorded results.",
          "No page here treats a short simulator result as proof that one instrument is better or personally suitable.",
          "Check the mistakes section even if you think the comparison is obvious; the obvious version is usually where the error lives.",
          DISCLAIMER,
        ],
      },
      {
        h: "What a fair comparison controls for",
        p: [
          "A useful comparison holds as many assumptions constant as possible. Use the same observation window, the same virtual position-sizing rule, and the same review method before comparing outcomes. Otherwise a difference in result may come from the setup rather than from the instruments themselves.",
          "Also separate structural facts from changing market statistics. Trading hours, legal claims, custody model and network design can be relatively durable, while volatility, yields, fees, margins and correlations can change over time. When a comparison depends on a current figure, verify it at a primary or provider source before treating it as current.",
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
        { h: "Comparison lens", p: [p.verdict] },
        { h: "Common mistakes with this comparison", list: p.mistakes },
        {
          h: "Practise both sides",
          p: [
            `Rather than picking a winner, apply the same documented virtual assumptions to both and compare the resulting volatility, drawdown and event sensitivity. A short simulator sample is not a recommendation or forecast. ${DISCLAIMER}`,
          ],
        },
        {
          h: "How to interpret the comparison",
          p: [
            "Keep the test conditions consistent. If one side uses a different date range, different virtual position size, or a different exit rule, the result is not a clean comparison. Record those assumptions before the exercise so they can be reviewed afterward.",
            "Separate durable structure from changing statistics. Market hours, ownership rights, custody model and network design describe what an instrument is. Volatility, yield, fees, margins, valuation multiples and correlations are measurements that can change. A current figure should be checked at its original source before it is treated as current.",
            "A simulator can reveal how a rule behaved in one sample, but it cannot determine personal suitability, future returns or the correct real-money allocation. Use the exercise to understand differences and uncertainty rather than to manufacture a winner.",
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
      {
        h: "What every one of these guides has in common",
        p: [
          "The structure is deliberate. Beginners usually start with the question 'how do I buy this?', which is the least important part — placing the order takes seconds and any broker will show you how. The parts that decide whether the trade was sensible come before and after it: understanding what actually moves the instrument, choosing a size that survives being wrong, picking a time of day when liquidity is not working against you, and reviewing the result honestly afterwards.",
          "So each guide spends most of its length on those parts. None of them tell you whether to buy, none contain price targets, and none imply that following the steps produces a profit. They aim to make your first practice trade in an instrument an informed one rather than a random one.",
        ],
      },
      {
        h: "Using a guide properly",
        list: [
          "Read the drivers section before looking at a chart, so the chart does not supply your opinion.",
          "Copy the suggested first practice trade exactly, including the sizing, before improvising.",
          "Note the timing guidance — trading an instrument outside its liquid window is a common and avoidable handicap.",
          "Come back to the review section a day after the trade closes, not while it is open.",
        ],
      },
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
      {
        h: "What a strategy is, and what it is not",
        p: [
          "A strategy is a set of rules describing what you will trade, when you will enter, how much you will risk, and where you will get out. It is not a prediction and it is not an edge by itself. Two traders can follow identical rules and get opposite results over a year purely because one honoured the exit rule and the other did not.",
          "These pages therefore give as much space to failure modes and to the arithmetic of expectancy as they give to the entry conditions. If a method has a 45% win rate, that is not a flaw as long as the average win is comfortably larger than the average loss — and it is fatal if it is not. Understanding that trade-off is more useful than collecting more entry patterns.",
        ],
      },
      {
        h: "Testing a strategy without fooling yourself",
        list: [
          "Write the rules down before you start. Rules remembered after the fact always look better than they were.",
          "Take at least thirty trades before drawing any conclusion, and keep the size constant throughout.",
          "Record every trade the rules generated, including the ones you chose to skip, and why you skipped them.",
          "Judge the method by expectancy and drawdown together, never by the best week.",
          "Expect any method to have losing stretches long enough to make you doubt it — that is the normal condition, not a malfunction.",
          "Re-test in a different market environment before trusting it; a method tuned to a calm trending month often fails the first volatile one.",
        ],
      },
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
      {
        h: "Why location changes the practical answer",
        p: [
          "The mechanics of a limit order are identical everywhere, but almost everything around them is local. Which brokers are licensed to serve you, whether you can hold foreign currency, how money leaves and re-enters the country, what a realistic first account size is in local terms, and how any gains are treated for tax all depend on where you live. Advice written for a US audience quietly assumes a US answer to all of those questions.",
          "These guides supply the local context that global tutorials skip, so the general education elsewhere on the site actually connects to your situation. They describe how access typically works and point you to the official regulator, rather than recommending a particular broker.",
        ],
      },
      {
        h: "What these guides deliberately avoid",
        list: [
          "They do not rank or recommend brokers, and they contain no affiliate links.",
          "They do not give tax advice; tax sections point you to a qualified local professional.",
          "They do not suggest that trading is a realistic income source for someone with little capital.",
          "They do not claim regulatory endorsement of any kind — TradeHQ is a simulator, not a licensed firm.",
          "They do not present trading as a solution to financial pressure; if the capital matters to you, learning is the only safe use of it here.",
        ],
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
        ...(TYPE_GUIDE[a.type] ? [] : [{ h: `${c.category} as an asset class`, p: [intros[a.type] || ""] }]),
        ...(stats.length ? [{ h: "Reference facts", list: stats }] : []),
        { h: "How to practise it here", p: [c.strategy] },
        ...(TYPE_LIVE_GAP[a.type] ? [{ h: "Where practice stops being representative", p: [TYPE_LIVE_GAP[a.type]] }] : []),
        ...(TYPE_GUIDE[a.type]
          ? [
              { h: TYPE_GUIDE[a.type].h, p: TYPE_GUIDE[a.type].p },
              { h: "Rules of thumb for this asset class", list: TYPE_GUIDE[a.type].list },
            ]
          : []),
        ...(c.executiveOutlook ? [{ h: "Context to be aware of", p: [`${c.executiveOutlook.summary} This is background context on the asset, not a forecast and not a recommendation.`] }] : []),
        ...(c.institutionalDrivers
          ? [{ h: "Arguments people make on each side", list: [`Bull case commonly cited: ${c.institutionalDrivers.bull}`, `Bear case commonly cited: ${c.institutionalDrivers.bear}`] }]
          : []),
        ...(f.length ? [{ h: `Common questions about trading ${a.name}`, list: f.map((q) => `${q.question} — ${q.answer}`) }] : []),
        {
          h: `A practice checklist for ${a.name}`,
          list: [
            ...(TYPE_CHECKLIST[a.type] || TYPE_CHECKLIST.stock),
            `Read the ${a.name} sections above and look up any term here you cannot define out loud. ${DISCLAIMER}`,
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

/**
 * Closing "how to practise this" paragraph for a glossary term. Written
 * per category so 49 glossary pages do not end with one identical block.
 */
function glossaryPractice(g: any): string {
  const t = g.term;
  const cat = String(g.category || "").toLowerCase();
  if (cat.includes("technical")) {
    return `Recognising ${t} on a static example is easy; spotting it on the right-hand edge of a live chart, before the outcome is known, is the actual skill. Open the practice desk, scan a handful of instruments you already follow until you find a candidate, and mark the level that would prove the read wrong. Take a small simulated position, then come back a day later and compare what happened with what this page describes. ${DISCLAIMER}`;
  }
  if (cat.includes("risk")) {
    return `${t} only becomes real once it costs you something. Work through it on the simulator with deliberately awkward numbers — an odd position size, a stop that sits close to entry — so you feel how the maths behaves rather than reading it. Log the trade and check whether your actual loss matched the one you planned for. ${DISCLAIMER}`;
  }
  if (cat.includes("psych") || cat.includes("behav")) {
    return `${t} is a habit, not a fact to memorise, so the useful exercise is watching yourself. Trade a normal simulated session, then read back through the journal entries and mark the moments where this pattern showed up in your own decisions. Naming it after the fact is how you learn to catch it in advance. ${DISCLAIMER}`;
  }
  if (cat.includes("mechanic") || cat.includes("order")) {
    return `The fastest way to understand ${t} is to use it once. Place a small simulated order that involves it, watch exactly how the fill and the portfolio line respond, and repeat it on a second instrument so you can tell what is general and what is specific to one market. ${DISCLAIMER}`;
  }
  return `Reading about ${t} and using it are different skills. Try it once in the simulator on an instrument you already follow, write down beforehand what you expect to happen, and check the journal a day later to see whether it played out that way. ${DISCLAIMER}`;
}
