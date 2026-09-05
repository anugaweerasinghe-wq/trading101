/**
 * Additional crawler-visible sections for the interactive/tool pages.
 * Merged onto STATIC_COPY in content.ts. Everything here must be true of
 * the live product — this is what Google and AdSense read.
 */

import type { PageSection } from "./content";

export const EXTRA_SECTIONS: Record<string, PageSection[]> = {
  "/": [
    {
      h: "Why practice first, honestly",
      p: [
        "The argument for a simulator is not that practice guarantees profit — it does not. It is that the cost of learning market mechanics is unavoidable, and you get to choose whether you pay it in money or in time. A beginner who learns what a limit order does by watching it not fill in a fast market has learned the same lesson as one who paid for it, minus the loss.",
        "There is a real limitation to be honest about: a simulator removes the emotional weight of losing your own money, and that weight changes behaviour. Treat practice as the place to build a repeatable process — sizing, exits, journaling, review — and expect the emotional part to still be new when real money is involved.",
      ],
    },
    {
      h: "Common questions",
      list: [
        "Is TradeHQ free? Yes, entirely. There is no paid tier, no trial and no card required.",
        "Do I need an account? No. Practice trading, courses and the glossary all work without signing up; an account is only needed for public profiles, duels and cross-device sync.",
        "Is the money real? No. Every balance, order and result is simulated, and the platform holds no funds.",
        "Are the prices real? They are based on public market data and refreshed periodically, with a simulation layer between refreshes. They are not a live trading feed.",
        "Does TradeHQ give advice? No. There are no signals, price targets or recommendations anywhere on the site.",
        "Where is my data? Portfolio, journal and progress are stored in your own browser unless you create an account.",
      ],
    },
  ],

  "/trade": [
    {
      h: "Order types, and when each one matters",
      list: [
        "Market order: fills immediately at the shown simulated price. Simple, but in a fast market the price you see is not always the price you get — in real trading this gap is called slippage.",
        "Limit order: only fills at your price or better. It protects the entry price but may never fill at all, which is itself a lesson worth learning on practice capital.",
        "Closing a position: selling what you hold, or buying back a short. The realised result lands in the portfolio history for review.",
      ],
    },
    {
      h: "A practice routine that actually builds skill",
      p: [
        "Trade less than you think you should. A beginner placing thirty trades a day learns nothing except how to click; a beginner placing three trades a week with a written thesis and a written exit learns something from every one of them.",
        "Every session should end with the same three questions written down: did I size this the way I said I would, did I exit where I said I would, and would I take this trade again knowing only what I knew at entry? Answering those honestly over a few months does more for results than any indicator.",
      ],
    },
  ],

  "/markets": [
    {
      h: "Reading a market list without being misled",
      p: [
        "A percentage change tells you almost nothing on its own. A 3% day is unremarkable for a small-cap crypto asset and extraordinary for a major currency pair, because each instrument has its own normal range of movement. Before reacting to a mover, learn what a typical day looks like for that instrument.",
        "Volume matters as much as price. A move on thin volume often reverses; a move on heavy volume more often marks a genuine shift in who wants to own the asset. Neither is a signal to trade — both are context.",
      ],
    },
    {
      h: "Things that trip beginners on a markets screen",
      list: [
        "Chasing the biggest gainer of the day, which is usually the worst risk-reward entry available.",
        "Assuming a low nominal price means an asset is 'cheap' — price per unit says nothing about value.",
        "Treating an ETF as safe because it is diversified; a sector ETF can fall as hard as a single stock.",
        "Ignoring market hours: equities gap overnight, crypto trades continuously, forex has session-driven liquidity.",
      ],
    },
  ],

  "/portfolio": [
    {
      h: "The metrics explained in plain language",
      list: [
        "Unrealised P&L: what an open position is worth right now versus what you paid. It is not money until you close.",
        "Realised P&L: the result of trades you have actually closed. This is the number that measures decisions you finished making.",
        "Win rate: the share of closed trades that made money. Useless without the average size of wins and losses next to it.",
        "Sharpe ratio: a rough measure of return relative to volatility. Higher means smoother, not necessarily larger, returns.",
        "Maximum drawdown: the largest fall from a peak in your equity curve. The single most useful number for judging whether an approach is survivable.",
      ],
    },
    {
      h: "Reviewing the portfolio weekly",
      p: [
        "Set a fixed weekly review. Look at the three worst trades and ask whether each was a bad decision or a good decision with a bad outcome — the two are different, and confusing them is how traders abandon working methods and keep broken ones.",
        "Then look at the largest win with the same suspicion. Outsized winners often come from oversized positions rather than better analysis, and a habit that produces one great week can produce one catastrophic week later.",
      ],
    },
  ],

  "/learn": [
    {
      h: "What a realistic learning timeline looks like",
      p: [
        "Vocabulary and mechanics take a few weeks. Reading a chart without inventing patterns takes a few months. Consistent execution of a written plan under stress takes longer than most people expect, and many never get there — which is itself information worth having before committing money.",
        "Nobody can promise you a timeline to profitability, and anyone who does is selling something. What the material here can do is remove the avoidable mistakes: wrong sizing, no exit plan, no records, and trading instruments you cannot explain.",
      ],
    },
    {
      h: "How to tell good trading education from bad",
      list: [
        "Good material explains mechanics and probability; bad material promises returns.",
        "Good material shows losing examples; bad material only shows winners.",
        "Good material cites exchanges, regulators and primary documents; bad material cites screenshots.",
        "Good material tells you who it is not for; bad material claims to suit everyone.",
        "Good material never asks you to hurry.",
      ],
    },
  ],

  "/learn-trading-guide": [
    {
      h: "The vocabulary you need before anything else",
      list: [
        "Bid and ask: the best price someone will buy at, and the best price someone will sell at. The gap between them is the spread, and it is a cost you pay on every round trip.",
        "Liquidity: how easily you can get in and out without moving the price. Low liquidity magnifies every other mistake.",
        "Volatility: how much an instrument typically moves. It defines what a sensible stop distance and position size look like.",
        "Leverage: borrowing to control a larger position. It multiplies both outcomes and is the most common reason beginners lose accounts quickly.",
        "Expectancy: average win times win rate, minus average loss times loss rate. It is the only honest measure of whether a method has an edge.",
      ],
    },
    {
      h: "A first-month plan",
      list: [
        "Week one: learn the vocabulary and place ten tiny practice trades with no goal other than seeing how orders behave.",
        "Week two: add a written plan to every trade — entry reason, size, invalidation level, target.",
        "Week three: keep the plan and add a journal review at the end of each day.",
        "Week four: stop trading for two days and read your own journal. The pattern in your mistakes is the curriculum for month two.",
      ],
    },
  ],

  "/leaderboard": [
    {
      h: "Why we show it at all",
      p: [
        "Competition is a blunt but effective tool for habit formation. A visible ranking makes people return, and returning is what builds the daily review habit that actually improves results. That is the entire justification for the leaderboard, and it is why the ranking carries no reward.",
        "It also serves as a live demonstration of variance. Watch the top of the board over a few weeks: names change constantly, and the traders who stay near the top are usually not the ones who spiked fastest. That lesson is difficult to teach in a lesson and obvious in a table.",
      ],
    },
    {
      h: "Privacy on the leaderboard",
      list: [
        "Participation is opt-in; nothing is published unless you choose to publish it.",
        "Only your chosen display name and simulated statistics appear — never an email address.",
        "You can stop publishing at any time and the entry is removed.",
      ],
    },
    {
      h: "Frequently asked",
      list: [
        "Do I have to appear here? No. Publishing is opt-in and can be switched off at any time.",
        "Is there a prize? No. There is no money, no entry fee and nothing to win.",
        "Can I see someone's trades? Only the summary statistics they chose to publish, never their journal.",
        "How often does it update? Rankings refresh as published portfolios change; short-term positions move constantly.",
        "Why is the top return so large? Usually concentration and leverage-like sizing, not a repeatable method — check the drawdown column before being impressed.",
      ],
    },
  ],

  "/ai-mentor": [
    {
      h: "Good questions to ask it",
      list: [
        "Explain what happens to a call option's value if the stock does not move for two weeks.",
        "What is the difference between a stop-loss order and a stop-limit order, and when does each fail?",
        "My practice win rate is 60% but I am down overall — what does that imply about my exits?",
        "Why do forex pairs move on interest-rate announcements?",
        "Walk me through how position size is calculated from account risk and stop distance.",
      ],
    },
    {
      h: "How it works and what it costs",
      p: [
        "The mentor runs on large language models through the site's backend, with a fallback chain so an outage at one provider does not take the feature down. It is free to use and there is no message quota for normal use.",
        "Conversations are used to produce your answer and are not sold or used to build an advertising profile. Because language models can be confidently wrong, every substantive answer should be checked against the linked lessons or an authoritative source before you rely on it.",
      ],
    },
    {
      h: "A reminder about limits",
      p: [
        "No assistant, however fluent, can assess whether a trade suits your finances, and none of the answers here are regulated advice. Treat the mentor as a patient tutor for mechanics and vocabulary, and take anything that sounds like a recommendation as a sign the question needs rewording.",
      ],
    },
  ],

  "/daily": [
    {
      h: "What the challenges cover",
      list: [
        "Chart literacy: identifying a described structure on a real chart rather than in a textbook diagram.",
        "Risk arithmetic: calculating a position size from a stop distance and a fixed account risk.",
        "Order mechanics: placing a specific order type and predicting how it will behave.",
        "Review discipline: re-reading one old journal entry and grading the decision, not the outcome.",
        "Knowledge checks: short questions drawn from the glossary and courses.",
      ],
    },
    {
      h: "How the streak is counted",
      p: [
        "A streak advances once per calendar day in your own local time zone, so completing a challenge late one evening and early the next morning still counts as two consecutive days. The counter lives in your browser, which means clearing site data resets it and using a different device starts a separate count unless you have an account.",
        "There is no penalty for missing a day beyond the counter resetting, and there is no reward for a long streak other than the habit itself. Nothing about the challenge involves money, prizes or entry fees.",
      ],
    },
    {
      h: "If you miss a day",
      p: [
        "Nothing bad happens beyond the counter going back to one. The purpose of the streak is to make practice frequent, not to punish a missed evening, and restarting after a gap is the normal experience rather than a failure. Traders who quit after breaking a streak lose far more than the streak itself.",
        "If daily is unrealistic for your schedule, a fixed three-days-a-week rhythm produces most of the benefit. Consistency of review matters more than the raw number of sessions.",
      ],
    },
  ],

  "/reviews": [
    {
      h: "How reviews are handled",
      list: [
        "One review per visitor, enforced so the page cannot be flooded by a single person.",
        "Reviews are checked before publication for spam, abuse, and anything presented as investment advice.",
        "We publish criticism. A page of only five-star reviews would tell you nothing.",
        "Reviews are about the software — usability, content quality, bugs — not about trading returns.",
      ],
    },
    {
      h: "What we would rather you sent us",
      p: [
        "A specific bug report or a specific content correction is worth more to the project than a rating. If a lesson is wrong, if a page renders badly on your phone, or if a term is missing from the glossary, the contact page reaches the maintainer directly and those messages are what actually change the site.",
        "If you are considering whether to use TradeHQ at all: it costs nothing, requires no account for the core features, and holds no money. The only thing at stake is your time.",
      ],
    },
    {
      h: "Reading reviews of any trading product",
      list: [
        "Be sceptical of any review mentioning profits — a simulator cannot produce them, and a real platform showing them proves nothing about you.",
        "Reviews that only appear in a cluster on the same day usually are a cluster from the same source.",
        "The most useful reviews describe a specific task the reviewer tried to complete and whether it worked.",
        "A product with no negative reviews is a product that removes them.",
      ],
    },
    {
      h: "Leaving one",
      p: [
        "Reviews are limited to one per visitor, and you do not need an account to leave one. Say what you were trying to learn, what helped and what did not. Criticism about missing content or confusing pages is genuinely welcome — several sections of the site exist because someone said the previous version was unclear.",
      ],
    },
  ],

  "/challenge": [
    {
      h: "What a duel does and does not prove",
      p: [
        "Thirty days is long enough to expose recklessness and short enough that luck still decides many outcomes. Someone who takes one enormous position and gets it right will beat a disciplined opponent over a month, and would very likely lose to them over a year. Read the result accordingly.",
        "The useful output of a duel is not the winner but the comparison of two journals covering the same market conditions. Two people who traded the same month and disagreed about what to do will each learn more from the other's reasoning than from the scoreboard.",
      ],
    },
    {
      h: "Practical details",
      list: [
        "Both participants start from an identical $100,000 virtual balance on the day the duel begins.",
        "The scoreboard tracks percentage return so different activity levels stay comparable.",
        "The countdown is fixed at 30 days and closes automatically.",
        "There is no fee, no stake, no prize and no real money — running a duel for money would be gambling, and this is not that.",
      ],
    },
    {
      h: "Setting up a duel",
      list: [
        "Create the duel and copy the invite link that appears.",
        "Send it to one person; the duel starts when they join.",
        "Both balances reset to the same starting figure at that moment.",
        "The scoreboard and countdown appear on this page for both participants for the next 30 days.",
        "When the countdown ends the duel closes and neither side can trade into it further.",
      ],
    },
  ],

  "/roadmap": [
    {
      h: "How features get prioritised",
      p: [
        "Requests that come through the contact page are weighted far more heavily than anything else, because a feature nobody asked for is usually a feature nobody uses. After that, the priority is whatever removes a known reason people fail to learn — better review tools beat more instruments, and clearer explanations beat more features.",
        "Dates on this page are targets set by one maintainer working on an independent project, not commitments backed by a team. When something slips, the status changes rather than the date quietly disappearing.",
      ],
    },
    {
      h: "Recently shipped",
      list: [
        "Four structured course tracks with quizzes, cited sources and completion badges.",
        "A full trading glossary with expert-level explanations and related-term navigation.",
        "Localised country guides covering regulators, market access and realistic starting capital.",
        "Optional public trader profiles and a 30-day practice duel against a friend.",
        "Daily challenges with a local-time streak counter, plus journal and portfolio analytics.",
      ],
    },
    {
      h: "In progress",
      list: [
        "Deeper portfolio analytics, including per-strategy expectancy rather than only account-level metrics.",
        "More structured course tracks covering risk management and market microstructure.",
        "Wider glossary coverage, with each entry linked to the lesson where the concept is applied.",
        "Better mobile layouts for the charting and order areas.",
      ],
    },
    {
      h: "How to influence it",
      p: [
        "The contact page is the roadmap's real input. Describe the thing you were trying to learn and where the site failed you — that is far more actionable than a feature name, and it is how most of the items above ended up on the list.",
      ],
    },
  ],

  "/about": [
    {
      h: "Why this site exists",
      p: [
        "Most people meet trading through advertising: a broker campaign, an influencer's screenshot, or an app that makes placing an order feel like a game. Almost none of that explains what an order actually does, what position sizing is, or how quickly leverage removes an account. TradeHQ exists to be the boring middle step between that advertising and someone's savings.",
        "The site is deliberately conservative about claims. It does not tell you that trading is a path to income, it does not publish success stories, and it does not imply that practice results predict real ones. Those omissions are the point.",
      ],
    },
    {
      h: "Editorial standards",
      list: [
        "No price predictions, targets, signals or 'best asset' rankings anywhere on the site.",
        "No invented statistics, testimonials, credentials or performance figures.",
        "Numbers in lessons are worked examples and are labelled as such.",
        "Every page states that the platform is educational and simulated.",
        "Corrections are made promptly when a factual error is reported.",
      ],
    },
    {
      h: "Contacting the maintainer",
      p: [
        "The contact page reaches the person who writes and maintains everything here. Corrections, bug reports and feature requests all go to the same place and are usually answered within two business days.",
      ],
    },
  ],

  "/contact": [
    {
      h: "Support questions we answer most often",
      list: [
        "My portfolio disappeared — this almost always means browser data was cleared, or you are on a different device or browser. Without an account, practice data lives only in the browser that created it.",
        "How do I reset my practice balance? There is a reset control in the portfolio area; it returns the account to $100,000 in virtual cash and clears open positions.",
        "A price looks wrong — quotes refresh periodically and are simulated between refreshes, so they will not match a live broker feed exactly.",
        "Can I use TradeHQ on my phone? Yes, the whole site works on mobile browsers; there is no app to install.",
        "Do you have an affiliate or partnership programme? No.",
      ],
    },
    {
      h: "Reporting a content error",
      p: [
        "Content corrections are the most valuable messages we receive. Send the page URL, quote the sentence you believe is wrong, and where possible link a primary source such as an exchange rule book, a regulator page or a central-bank release. Corrections are applied to the live lesson rather than buried in an errata list.",
      ],
    },
    {
      h: "Response times and expectations",
      p: [
        "TradeHQ is maintained by one person, so replies typically arrive within two business days and occasionally take longer during heavy development weeks. There is no phone line and no live chat. If you have not heard back within a week, sending the message again is reasonable rather than rude.",
      ],
    },
  ],

  "/privacy": [
    {
      h: "Cookies and analytics",
      p: [
        "TradeHQ uses local storage rather than tracking cookies for the practice account itself. Where analytics are used, they are limited to aggregate page-level measurement so we can see which lessons are read and which pages break — not to build profiles of individuals or to follow visitors across other websites.",
      ],
    },
    {
      h: "Data you can send us, and what happens to it",
      list: [
        "Contact messages: kept only as long as needed to answer you.",
        "Reviews: published with your chosen display name, and removable on request.",
        "Accounts: email address plus the practice data you choose to sync; deletable on request.",
        "Public trader profiles and duels: only the display name and simulated statistics you opted to publish.",
      ],
    },
    {
      h: "Children and jurisdiction",
      p: [
        "TradeHQ is not directed at children and asks for no financial information from anyone. Because the service holds no funds and executes no trades, it is not a financial services provider in any jurisdiction; local financial regulation applies to the broker you eventually use, not to this simulator.",
      ],
    },
    {
      h: "Changes and contact",
      p: [
        "If this policy changes materially, the updated text appears on this page. Questions about what is stored, requests for a copy of account data, and deletion requests all go through the contact page and are handled by the person who maintains the site rather than an automated system.",
      ],
    },
  ],

  "/terms": [
    {
      h: "No advisory relationship",
      p: [
        "Using this site creates no advisory, fiduciary or brokerage relationship of any kind. Lessons, glossary entries, comparisons, strategy walkthroughs and AI mentor responses are general educational information published to the public at large, with no knowledge of your circumstances, objectives, tax position or risk tolerance.",
        "Before trading real money, consider seeking advice from a professional licensed in your own jurisdiction. Trading involves the risk of losing more than you invest when leverage is used, and most retail accounts trading leveraged products lose money.",
      ],
    },
    {
      h: "Content, accounts and acceptable use",
      list: [
        "Lessons, guides and glossary entries are original work and remain the property of TradeHQ; short quotations with attribution are fine, wholesale republication is not.",
        "Accounts may be removed for abuse, spam, or attempts to present the simulator as a real trading record to third parties.",
        "Automated scraping that degrades the service for others is not permitted.",
        "These terms may change; material changes are reflected on this page.",
      ],
    },
    {
      h: "Availability and jurisdiction",
      p: [
        "The service is provided as it is, without any guarantee of uptime, and features may change or be withdrawn. Because TradeHQ handles no money and executes no trades, disputes about market outcomes cannot arise from using it; anything relating to a real broker is between you and that broker.",
      ],
    },
  ],
};
