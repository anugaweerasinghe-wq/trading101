/**
 * Crawler-visible copy for pages whose content is interactive (tools,
 * hubs, legal). Every paragraph here must be true of the live app —
 * this text is what Google and AdSense read before JavaScript runs.
 */

import type { PageContent } from "./content";

const D = "Educational simulation only — not financial advice.";

export const STATIC_COPY: Record<string, PageContent> = {
  "/": {
    sections: [
      {
        h: "What TradeHQ actually is",
        p: [
          "TradeHQ is a free paper-trading simulator for people learning how markets work. Every account starts with $100,000 in virtual cash. Nothing on the site touches real money: there is no brokerage account, no deposit, no withdrawal and no order ever reaches an exchange. Prices shown in the simulator are sourced from public market data and, between refreshes, moved by a small simulation layer so charts behave realistically during practice sessions.",
          "The point of a simulator is to let you make the expensive mistakes for free. Most beginners lose money not because they picked the wrong stock but because they sized positions badly, moved a stop, doubled down after a loss, or traded an instrument they did not understand. All of those habits are visible in a practice account, and all of them are cheaper to unlearn there.",
        ],
      },
      {
        h: "What you can do here",
        list: [
          "Paper trade 150+ instruments across stocks, crypto, ETFs, forex and commodities with market and limit orders.",
          "Track a full practice portfolio — open positions, realised and unrealised P&L, win rate, Sharpe ratio and maximum drawdown.",
          "Work through four structured courses (options, futures, macro reading and trading psychology) with quizzes and completion badges.",
          "Read a 49-term trading glossary written in plain language, each entry with an expert explanation and a worked example.",
          "Follow step-by-step guides for individual assets, side-by-side asset comparisons, and named strategy walkthroughs.",
          "Keep a trading journal, build daily streaks with the daily challenge, and run a 30-day practice duel against a friend.",
        ],
      },
      {
        h: "Who it is for, and who it is not for",
        p: [
          "TradeHQ is built for complete beginners and for self-taught traders who want a place to rehearse a process before risking capital. It is particularly used by students, who often have time to learn but very little capital to lose.",
          "It is not for you if you want signals, copy-trading, portfolio management, or someone to tell you what to buy. We do not publish price targets, we do not run a Discord with calls, and we do not accept payment for coverage of any asset. If you are looking for a recommendation, this is the wrong site.",
        ],
      },
      {
        h: "How to start in five minutes",
        list: [
          "Open the markets page and pick one instrument you already recognise.",
          "Read its guide page so you know what actually moves it before you trade it.",
          "Place a small practice position — 1-2% of the $100,000 balance, not 50%.",
          "Write down, before you enter, where you would exit if you are wrong.",
          "Come back the next day, review the trade in the journal, and repeat.",
        ],
      },
    ],
    links: [
      { href: "/markets", label: "Browse all markets" },
      { href: "/courses", label: "Structured trading courses" },
      { href: "/learn-trading-guide", label: "Complete beginner guide" },
      { href: "/wiki", label: "Trading glossary" },
      { href: "/how-to-trade", label: "Asset-by-asset guides" },
      { href: "/about", label: "About TradeHQ" },
    ],
  },

  "/trade": {
    sections: [
      {
        h: "How the practice trading desk works",
        p: [
          "The trading desk is where simulated orders are placed. You choose an instrument, choose a side, choose a size, and the order is filled against the simulator's current price. The fill, the position and the resulting profit or loss are all recorded in your practice portfolio, which is stored in your own browser rather than on a server.",
          "Two order types are supported today: market orders, which fill immediately at the shown price, and limit orders, which rest until the simulated price reaches your level. Position sizing is entirely up to you, which is deliberate — learning to size a position is one of the few skills a simulator can teach almost as well as a live account.",
        ],
      },
      {
        h: "What to practise on the desk",
        list: [
          "Fixed-fraction sizing: risk the same small percentage of the balance on every trade and see how the equity curve smooths out.",
          "Stop discipline: decide the exit before entering, then check in the journal whether you actually honoured it.",
          "Order-type behaviour: compare how a market order and a limit order behave on a fast-moving instrument.",
          "Concentration: run a week with five positions and a week with one, and compare the drawdown.",
        ],
      },
      {
        h: "Limits of any simulator",
        p: [
          "A simulator cannot reproduce slippage on illiquid instruments, brokerage fees, overnight financing, tax, or the specific emotional weight of losing money you actually need. Treat practice results as evidence about your process, not as a forecast of live returns. Past simulated performance does not predict future real-world performance.",
        ],
      },
    ],
    links: [
      { href: "/markets", label: "Choose an instrument" },
      { href: "/portfolio", label: "Your practice portfolio" },
      { href: "/how-to-trade", label: "How-to guides per asset" },
      { href: "/strategy", label: "Strategy walkthroughs" },
    ],
  },

  "/markets": {
    sections: [
      {
        h: "What is on the markets page",
        p: [
          "The markets page lists every instrument available in the simulator, grouped by asset class: US equities, cryptocurrencies, exchange-traded funds, major and minor forex pairs, and commodities. Each row shows the current simulated price and the day's change, and links to a dedicated page for that instrument.",
          "Prices come from public market-data sources and refresh on a schedule; between refreshes a small simulation layer keeps charts moving so the practice experience is continuous. This is a learning environment, not a market-data terminal — do not use these quotes for any real decision.",
        ],
      },
      {
        h: "How to choose what to practise first",
        list: [
          "Start with something you already understand as a customer or user — a retailer, an index ETF, or a currency you have actually spent.",
          "Prefer liquid, well-covered instruments. Thin instruments punish beginners with wide spreads and erratic prices.",
          "Trade one instrument for a month before adding a second. Depth beats breadth when you are learning.",
          "Read the instrument's guide page before the first practice order so you know what typically moves it.",
        ],
      },
      {
        h: "Asset classes explained briefly",
        list: [
          "Stocks: fractional ownership of a listed company; move on earnings, guidance, sector rotation and rates.",
          "ETFs: baskets that track an index or theme; usually less volatile than any single holding inside them.",
          "Crypto: 24/7 markets with no closing bell, high volatility and a strong link to overall market liquidity.",
          "Forex: relative pricing of two currencies; driven by rate differentials, inflation prints and risk appetite.",
          "Commodities: physical goods with supply-and-demand and seasonality effects that equities do not have.",
        ],
      },
    ],
    links: [
      { href: "/trade", label: "Open the trading desk" },
      { href: "/wiki", label: "Glossary of market terms" },
      { href: "/courses", label: "Structured courses" },
      { href: "/compare", label: "Asset comparisons" },
    ],
  },

  "/portfolio": {
    sections: [
      {
        h: "What the practice portfolio tracks",
        p: [
          "The portfolio page is the scoreboard for your simulated account. It shows every open position with its entry price, current simulated price and unrealised profit or loss, plus a full history of closed trades with realised results. Your data lives in your browser's local storage, so clearing site data resets the account.",
          "Beyond raw P&L, the page calculates the metrics that actually describe a process rather than an outcome: win rate, average win versus average loss, Sharpe ratio as a rough risk-adjusted measure, and maximum drawdown — the deepest peak-to-trough fall your equity curve has taken.",
        ],
      },
      {
        h: "How to read your own numbers honestly",
        list: [
          "A high win rate with a terrible average loss is a losing system. Compare average win to average loss before celebrating.",
          "Maximum drawdown is the number that decides whether you could have stuck with the approach in real life.",
          "Fewer than about thirty trades is not a sample. Do not draw conclusions from a good week.",
          "If one position drives most of the return, you learned about that position, not about your method.",
        ],
      },
      {
        h: "Why results here do not transfer one-to-one",
        p: [
          "Simulated fills are optimistic, there are no commissions or financing costs, and no simulator can replicate the discomfort of a real drawdown. Use the portfolio to judge consistency and discipline, and assume live results will be meaningfully worse than practice results.",
        ],
      },
    ],
    links: [
      { href: "/trade", label: "Place a practice trade" },
      { href: "/learn-trading-guide", label: "Risk management guide" },
      { href: "/wiki/drawdown", label: "What drawdown means" },
    ],
  },

  "/learn": {
    sections: [
      {
        h: "Two different ways to learn here",
        p: [
          "TradeHQ separates learning into two formats on purpose. Full courses are structured multi-lesson tracks with quizzes, cited sources and a completion badge — use them when you want to actually learn a subject end to end. Quick reads are standalone articles that answer one question well; use them when you have a specific gap to fill.",
          "Both formats point back at the same free practice account, because reading about position sizing and actually sizing a position are different skills, and only the second one shows up in your results.",
        ],
      },
      {
        h: "A suggested order for complete beginners",
        list: [
          "Read the complete beginner guide end to end so the vocabulary stops being a barrier.",
          "Work through the trading psychology course — most beginner losses are behavioural, not analytical.",
          "Add the macro reading course so market-wide moves stop looking random.",
          "Only then take options or futures, which are leveraged and unforgiving of gaps in the basics.",
          "Keep the glossary open in a second tab and look up every unfamiliar term as it appears.",
        ],
      },
      {
        h: "How this material is written and reviewed",
        p: [
          "Lessons are written in plain English, cite primary sources such as exchange and regulator documentation where a factual claim is made, and avoid predictions entirely. Where a lesson uses numbers, they are worked examples, not forecasts. Nothing here is personalised advice, and no lesson tells you what to buy.",
        ],
      },
    ],
    links: [
      { href: "/courses", label: "Structured courses" },
      { href: "/learn-trading-guide", label: "Complete beginner guide" },
      { href: "/wiki", label: "Trading glossary" },
      { href: "/learn/country", label: "Country guides" },
    ],
  },

  "/learn-trading-guide": {
    sections: [
      {
        h: "What this guide covers",
        p: [
          "This is the single long-form starting point on TradeHQ. It walks a complete beginner from not knowing what a bid-ask spread is through to placing a first practice trade with a written plan. It is deliberately sequential: markets and participants, instruments, order types, chart reading, risk sizing, journaling, and then the psychology that decides whether any of it survives contact with a losing streak.",
        ],
      },
      {
        h: "The parts most beginners skip",
        list: [
          "Position sizing: how much of the account a single idea is allowed to cost you if you are wrong.",
          "Exit planning: where the trade is invalidated, decided before entry rather than during a loss.",
          "Record keeping: a journal entry per trade, because memory rewrites losing trades into bad luck.",
          "Sample size: judging a method over dozens of trades instead of the last three.",
        ],
      },
      {
        h: "How to use it with the simulator",
        p: [
          "Read one section, then immediately do the matching thing in the practice account with $100,000 in virtual cash. Reading about a limit order teaches you the definition; placing twenty of them teaches you how they behave when price moves against you. The guide is written so every section has a corresponding action you can take in the simulator the same day.",
        ],
      },
    ],
    links: [
      { href: "/courses", label: "Structured courses" },
      { href: "/wiki", label: "Glossary" },
      { href: "/strategy", label: "Strategy guides" },
      { href: "/trade", label: "Practice desk" },
    ],
  },

  "/leaderboard": {
    sections: [
      {
        h: "What the leaderboard shows",
        p: [
          "The leaderboard ranks practice traders who have chosen to publish their results. Publishing is optional and off by default; if you never opt in, nothing about your account is shared. Ranked figures are simulated: percentage return on a $100,000 virtual starting balance, win rate, and number of trades.",
          "There is no prize, no fee and no real money involved. The leaderboard exists because a visible scoreboard makes people practise more often, and frequency is what builds skill.",
        ],
      },
      {
        h: "How to read a ranking without fooling yourself",
        list: [
          "A large return over a handful of trades usually means one oversized position, not skill.",
          "Compare drawdown alongside return — a 60% gain that survived a 40% drawdown is a fragile method.",
          "Short measurement windows favour risk-takers; over months, the ranking composition changes.",
          "Nobody's practice ranking is a recommendation to copy their trades.",
        ],
      },
    ],
    links: [
      { href: "/challenge", label: "Challenge a friend" },
      { href: "/portfolio", label: "Your own metrics" },
      { href: "/trade", label: "Practice desk" },
    ],
  },

  "/ai-mentor": {
    sections: [
      {
        h: "What the AI mentor does",
        p: [
          "The mentor is a chat assistant that explains trading concepts, indicators, order types and strategies in plain language, and comments on the practice trades in your simulated journal. It is a study aid: it explains why a moving-average crossover is a lagging signal, or what your win-rate and average-loss numbers imply about your sizing.",
        ],
      },
      {
        h: "What it will not do",
        list: [
          "It does not give buy or sell recommendations, price targets or personalised financial advice.",
          "It does not know your real financial circumstances and cannot assess suitability.",
          "It can be wrong. Language models make confident factual errors; verify anything that matters against a primary source.",
          "It is not a substitute for a licensed professional in your own jurisdiction.",
        ],
      },
      {
        h: "Getting useful answers",
        p: [
          "Ask about mechanics rather than outcomes. 'What does implied volatility do to an option's price into earnings?' is a good question. 'Should I buy this?' is not, and the mentor will decline it. Pair every answer with a practice trade so the concept becomes procedural rather than theoretical.",
        ],
      },
    ],
    links: [
      { href: "/courses", label: "Structured courses" },
      { href: "/wiki", label: "Glossary" },
      { href: "/learn-trading-guide", label: "Beginner guide" },
    ],
  },

  "/daily": {
    sections: [
      {
        h: "How the daily challenge works",
        p: [
          "Every day the simulator sets one small task — identify a pattern, place a correctly sized practice trade, review a journal entry, or answer a short knowledge question. Completing it advances a streak counter stored in your browser and measured against your own local calendar day, so a genuine daily habit is never reset by time-zone drift.",
        ],
      },
      {
        h: "Why streaks matter more than strategy at the start",
        list: [
          "Skill in trading comes from repetition and review, and both need frequency.",
          "A small daily task is easier to sustain than a weekly marathon session.",
          "Streaks make the boring parts — journaling, reviewing, sizing — habitual.",
          "Missing a day is not failure; abandoning the habit is.",
        ],
      },
    ],
    links: [
      { href: "/trade", label: "Practice desk" },
      { href: "/wiki", label: "Glossary" },
      { href: "/challenge", label: "Challenge a friend" },
    ],
  },

  "/reviews": {
    sections: [
      {
        h: "Community reviews",
        p: [
          "This page collects reviews submitted by people who have used the practice simulator. Submission is limited to one review per visitor, and reviews are moderated before publication to remove spam, abuse and anything presenting itself as investment advice. Reviews describe the product; they are not testimonials about profits, and no review claims anyone earned money.",
        ],
      },
      {
        h: "What we do not do",
        list: [
          "We do not pay for reviews or offer anything in exchange for one.",
          "We do not delete negative reviews that are honest about the product.",
          "We do not publish performance claims or income claims.",
        ],
      },
    ],
    links: [
      { href: "/about", label: "About TradeHQ" },
      { href: "/contact", label: "Contact us" },
    ],
  },

  "/challenge": {
    sections: [
      {
        h: "How a practice duel works",
        p: [
          "Create an invite link and send it to a friend. Both of you start a 30-day duel from the same $100,000 virtual balance, and a shared scoreboard tracks percentage return for the duration. When the countdown ends, the duel closes and the final standings are recorded.",
          "Nothing is wagered and nothing is won. There is no entry fee, no prize pool and no real money at any point — this is a study device that uses mild competition to make daily practice stick.",
        ],
      },
      {
        h: "Rules that make a duel actually useful",
        list: [
          "Agree a maximum position size in advance so the duel does not become a coin-flip on leverage.",
          "Both traders journal every entry and exit; compare journals at the end, not just returns.",
          "Judge the winner on drawdown as well as return.",
          "Run a second duel afterwards with the losing habits explicitly banned.",
        ],
      },
    ],
    links: [
      { href: "/leaderboard", label: "Leaderboard" },
      { href: "/trade", label: "Practice desk" },
      { href: "/portfolio", label: "Track your results" },
    ],
  },

  "/roadmap": {
    sections: [
      {
        h: "What this page is",
        p: [
          "The roadmap lists what has already shipped on TradeHQ and what is being worked on next, with honest status labels. Shipped means the feature is live and usable right now. Planned means it is intended but not built, and the date is a target rather than a promise.",
        ],
      },
      {
        h: "What TradeHQ will never add",
        list: [
          "Real-money trading or any brokerage function.",
          "Trade signals, price targets or copy-trading.",
          "Paid tips, sponsored asset coverage or affiliate broker rankings.",
          "Anything that implies simulated performance predicts real returns.",
        ],
      },
    ],
    links: [
      { href: "/about", label: "About TradeHQ" },
      { href: "/contact", label: "Suggest a feature" },
    ],
  },

  "/about": {
    sections: [
      {
        h: "Who builds TradeHQ",
        p: [
          "TradeHQ is built and maintained by Anuga Weerasinghe as an independent educational project. It began as a way to let students in markets with limited access to brokerage accounts learn how trading actually works before risking money they cannot afford to lose.",
          "TradeHQ is not a brokerage, not a registered investment adviser, and not affiliated with any exchange or broker. It holds no client money because it never handles money at all.",
        ],
      },
      {
        h: "How the content is produced",
        list: [
          "Lessons and guides are written for TradeHQ, not syndicated from elsewhere.",
          "Factual claims about market mechanics cite exchange, regulator or central-bank documentation where possible.",
          "Nothing on the site forecasts prices, and no page recommends an instrument.",
          "Errors are corrected when reported; the contact page is the fastest route.",
        ],
      },
      {
        h: "How the project is funded",
        p: [
          "TradeHQ is free to use with no subscription and no paid tier. It is not funded by broker referrals or by payment for asset coverage, and no company pays to appear in a lesson, comparison or guide.",
        ],
      },
    ],
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
      { href: "/roadmap", label: "Roadmap" },
    ],
  },

  "/contact": {
    sections: [
      {
        h: "Getting in touch",
        p: [
          "Use the contact form on this page to reach the person who builds TradeHQ. Messages are usually answered within two business days. There is no call centre and no support queue — replies come from the maintainer.",
        ],
      },
      {
        h: "What to include so we can help quickly",
        list: [
          "The exact page URL where the problem happened.",
          "What you expected to happen, and what happened instead.",
          "Your browser and whether you are on desktop or mobile.",
          "For content corrections: the sentence you believe is wrong and, ideally, a source.",
        ],
      },
      {
        h: "What we cannot answer",
        list: [
          "Requests for investment advice, trade ideas or price opinions — we do not provide them at any price.",
          "Account or money questions for real brokers; TradeHQ holds no funds and has no brokerage relationship.",
          "Requests to promote an asset, product or course on the site.",
        ],
      },
    ],
    links: [
      { href: "/about", label: "About TradeHQ" },
      { href: "/privacy", label: "Privacy policy" },
      { href: "/terms", label: "Terms of service" },
    ],
  },

  "/privacy": {
    sections: [
      {
        h: "Summary of what we store",
        p: [
          "Your practice portfolio, trade history, journal entries, watchlist, course progress and streaks are stored in your own browser's local storage. Clearing site data deletes them permanently, and we cannot restore them because we never held them.",
          "If you choose to create an account, publish a public trader profile, submit a review or join a duel, the data needed for that specific feature is stored on our backend. Everything else stays local.",
        ],
      },
      {
        h: "What we do not do",
        list: [
          "We do not sell personal data.",
          "We do not run behavioural advertising profiles.",
          "We do not ask for financial account details, because there is nothing to fund.",
        ],
      },
      {
        h: "Your choices",
        p: [
          "You can use nearly all of TradeHQ without an account. Where an account exists, you can request deletion through the contact page. The full policy text, including cookies and third-party processors, is on this page below.",
        ],
      },
    ],
    links: [
      { href: "/terms", label: "Terms of service" },
      { href: "/contact", label: "Contact us" },
    ],
  },

  "/terms": {
    sections: [
      {
        h: "The short version",
        p: [
          "TradeHQ is a free educational simulator. It does not execute real trades, does not hold money, and is not a broker, exchange or investment adviser. Nothing on the site is investment, financial, legal or tax advice, and no content is personalised to your circumstances.",
        ],
      },
      {
        h: "Your responsibilities",
        list: [
          "Use the simulator for learning, not as a source of trading recommendations.",
          "Do not present simulated results as real trading performance to anyone.",
          "Do not scrape, resell or republish the site's lessons and guides without permission.",
          "Follow the laws that apply where you live before trading with real money anywhere.",
        ],
      },
      {
        h: "Liability and accuracy",
        p: [
          "Market data may be delayed, incomplete or simulated between refreshes, and lessons may contain errors. We make no warranty of accuracy and accept no liability for decisions made using this site. Past simulated performance does not predict future real-world performance.",
        ],
      },
    ],
    links: [
      { href: "/privacy", label: "Privacy policy" },
      { href: "/about", label: "About TradeHQ" },
      { href: "/contact", label: "Contact us" },
    ],
  },
};

export const DISCLAIMER = D;
