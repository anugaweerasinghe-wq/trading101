import optionsHero from "@/assets/courses/options-hero.jpg";
import futuresHero from "@/assets/courses/futures-hero.jpg";
import macroHero from "@/assets/courses/macro-hero.jpg";
import psychologyHero from "@/assets/courses/psychology-hero.jpg";

export interface CourseQuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface CourseLesson {
  slug: string;
  title: string;
  summary: string;
  readingMinutes: number;
  body: string[];
  keyTakeaways: string[];
  sources: { label: string; url: string }[];
  quiz: CourseQuizQuestion[];
}

export interface CourseTrack {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  hero: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  badge: { name: string; description: string };
  lessons: CourseLesson[];
}

const DISC =
  "(Educational simulation only — not financial advice. Practice everything below with $100,000 virtual cash on TradeHQ.)";

const optionsTrack: CourseTrack = {
  slug: "options-trading-fundamentals",
  title: "Options Trading Fundamentals",
  tagline: "Calls, puts, spreads and Greeks — decoded for beginners.",
  description:
    "A structured, YMYL-compliant introduction to how listed options actually work — from what a call contract is, through the Greeks that drive its price, to defined-risk spread strategies you can safely practice on the simulator.",
  hero: optionsHero,
  level: "Intermediate",
  badge: {
    name: "Options Fundamentals Certified",
    description:
      "Awarded after completing every lesson and passing every quiz in the Options Trading Fundamentals track.",
  },
  lessons: [
    {
      slug: "what-is-an-option",
      title: "What Is an Option? Calls & Puts Explained",
      summary:
        "An option is a contract that gives you the right — but not the obligation — to buy or sell 100 shares at a set price by a set date.",
      readingMinutes: 8,
      body: [
        "## The core definition",
        "An option is a standardised contract, listed on a regulated exchange such as the Cboe, that gives its buyer the right — but not the obligation — to buy (a call) or sell (a put) 100 shares of an underlying stock at a fixed strike price, on or before a specified expiration date. The buyer pays a one-time premium up front for that right. The seller (the writer) collects the premium and takes on the corresponding obligation.",
        "Because one contract controls 100 shares, a call option quoted at $2.50 actually costs $250 to buy. That single number embeds four separate ideas: the direction you expect (up for calls, down for puts), how far you expect the move to go (the strike), how much time you're giving it (the expiration), and how much volatility the market currently prices in.",
        "## Why options exist",
        "Options were originally created as a hedging tool. A pension fund that owned $50 million of an index could buy put options as portfolio insurance — capping downside for a known premium the same way you cap car-accident cost with an insurance policy. Individual traders now use them for the same three reasons: hedging existing positions, generating income by selling premium against shares they own (covered calls), or making a defined-risk directional bet without tying up the full cost of the shares.",
        "## A simple worked example",
        "Imagine Apple trades at $180 and you buy one 30-day $185 call for $3.00 ($300 total). Three things can happen. If Apple closes above $188 on expiration, you're profitable — the intrinsic value of the call exceeds what you paid. If it closes between $185 and $188 you're partially in-the-money but net negative. If it closes at or below $185, the call expires worthless and you lose the full $300 — but nothing more. That capped, known-in-advance loss is the defining feature that makes options different from margin or leverage.",
        "## Sri Lankan student note",
        "US-listed options are the deepest, most liquid derivatives market in the world, but they are geo-restricted for many Sri Lankan brokerage accounts. TradeHQ's simulator lets you practice the exact same contracts — Apple, Tesla, SPY — with $100,000 virtual capital, so you can build the mental model long before you ever face a real premium payment.",
        "> Options are contracts, not shares. You are trading a right that decays with time.",
        DISC,
      ],
      keyTakeaways: [
        "One option contract = 100 shares of the underlying.",
        "Calls profit if the stock rises above strike + premium; puts profit if it falls below strike − premium.",
        "The maximum a long option buyer can lose is the premium paid — nothing more.",
        "Options were originally invented for hedging, not speculation.",
      ],
      sources: [
        { label: "SEC — Investor Bulletin: Options", url: "https://www.sec.gov/investor/alerts/ib_options.pdf" },
        { label: "Cboe Options Institute", url: "https://www.cboe.com/education/" },
      ],
      quiz: [
        { question: "How many shares does one standard US equity option contract control?", options: ["10", "50", "100", "1,000"], correctAnswer: 2, explanation: "US-listed equity options are standardised at 100 shares per contract." },
        { question: "What is the maximum loss for someone who buys (goes long) a single call option?", options: ["Unlimited", "The strike price × 100", "The premium paid", "The stock price × 100"], correctAnswer: 2, explanation: "A long option buyer can only lose the premium paid." },
        { question: "A call option gives the buyer the right to:", options: ["Sell shares at the strike price", "Buy shares at the strike price", "Short the stock", "Receive dividends"], correctAnswer: 1, explanation: "Call = right to buy. Put = right to sell." },
        { question: "Why were listed options originally created?", options: ["Speculation", "Tax shelters", "Hedging existing positions", "High-frequency trading"], correctAnswer: 2, explanation: "Options were invented as a hedging tool, similar to insurance." },
      ],
    },
    {
      slug: "the-greeks-delta-gamma-theta-vega",
      title: "The Greeks — Delta, Gamma, Theta & Vega",
      summary:
        "The four Greeks quantify how an option's price reacts to stock moves, volatility, and the passage of time.",
      readingMinutes: 10,
      body: [
        "## Why Greeks matter",
        "The price of an option changes for four separable reasons: the underlying stock moves (delta), the rate at which delta itself changes (gamma), time passes (theta), and implied volatility shifts (vega). The Greeks are just the partial derivatives of the Black-Scholes pricing formula — but you don't need the calculus to use them. You need to know which Greek dominates your position at each point in time.",
        "## Delta — directional exposure",
        "Delta is the expected change in the option's price for a $1 move in the underlying. An at-the-money call has a delta near 0.50 — meaning if the stock rises $1, the call rises about $0.50. Delta also approximates the probability the option expires in-the-money, which is why traders use 30-delta and 15-delta strikes as shorthand for likelihood.",
        "## Gamma — how fast delta changes",
        "Gamma is highest for at-the-money options close to expiration. It's what makes gamma-squeeze headlines during meme-stock rallies: dealers who sold calls have to hedge more and more aggressively as delta climbs, buying the underlying and pushing price further up.",
        "## Theta — the ticking clock",
        "Theta is time decay, expressed as dollars lost per day. A 30-day at-the-money call might lose $5 per day and $12 per day in its final week. Long options are constantly bleeding theta; short options collect it. This is why option sellers can profit even when the stock barely moves.",
        "## Vega — volatility sensitivity",
        "Vega measures how much the option's price changes for a one-point move in implied volatility. Before an earnings report, IV rips higher and every option — call and put — gets more expensive. After earnings, IV collapses (\"IV crush\") and even a correct directional bet can lose money if you paid for inflated volatility going in.",
        "> Every option position is really four separate bets: on direction, on the speed of that direction, on time, and on volatility.",
        DISC,
      ],
      keyTakeaways: [
        "Delta ≈ how much the option moves per $1 stock move (and roughly = probability of finishing ITM).",
        "Gamma is highest at-the-money and near expiration.",
        "Theta bleeds long options daily; sellers collect it.",
        "Vega spikes before earnings and collapses immediately after (\"IV crush\").",
      ],
      sources: [
        { label: "Investopedia — Option Greeks", url: "https://www.investopedia.com/trading/getting-to-know-the-greeks/" },
        { label: "Cboe — The Greeks", url: "https://www.cboe.com/education/tools/" },
      ],
      quiz: [
        { question: "What does theta measure?", options: ["Directional exposure", "Time decay per day", "Volatility sensitivity", "Interest-rate risk"], correctAnswer: 1, explanation: "Theta is the dollar amount an option loses per day from time decay." },
        { question: "An at-the-money 30-day call option has a delta close to:", options: ["0.10", "0.30", "0.50", "0.90"], correctAnswer: 2, explanation: "ATM options have deltas near 0.50 — a roughly 50/50 chance of finishing ITM." },
        { question: "'IV crush' typically happens:", options: ["Right before earnings", "Right after earnings", "On Fed decision day", "At market open"], correctAnswer: 1, explanation: "IV inflates before earnings and collapses immediately after the release." },
        { question: "Which Greek measures the rate of change of delta?", options: ["Vega", "Theta", "Gamma", "Rho"], correctAnswer: 2, explanation: "Gamma tells you how quickly delta itself changes." },
      ],
    },
    {
      slug: "defined-risk-spreads",
      title: "Defined-Risk Spreads — Verticals & Iron Condors",
      summary:
        "Spreads combine two or more options to cap both loss and gain — the safest way to learn options trading.",
      readingMinutes: 9,
      body: [
        "## Why spreads beat naked options for beginners",
        "Selling a naked call has theoretically unlimited risk. Buying a naked call has capped risk but low probability of profit. Spreads — buying one option and selling another — collapse both problems into a single position with a known maximum loss and a known maximum gain, printed on the ticket before you enter.",
        "## Bull call spread — the starter trade",
        "You buy a lower-strike call and sell a higher-strike call in the same expiration. Example: Apple at $180, buy the $180 call for $4.00 and sell the $185 call for $2.00. Net debit $2.00 ($200). Maximum loss $200. Maximum gain: the $5 spread width minus the $2 paid = $3 ($300). You've turned an unlimited-upside bet into a defined 1.5:1 payoff with a much cheaper entry.",
        "## Iron condor — earning income sideways",
        "An iron condor combines a short call spread above the market and a short put spread below. You collect premium from both and profit if the stock stays inside the two spreads until expiration. It's the go-to trade for a range-bound market and a proven way to learn how theta and vega interact.",
        "## Position sizing rule",
        "For defined-risk spreads, size so a single trade loses no more than 1-2% of your account. On a $100,000 practice account that's $1,000-$2,000 of max loss per trade, which lets you take 50+ trades before catastrophic drawdown. This is the same sizing floor institutional risk desks use.",
        "## What can still go wrong",
        "Assignment risk on the short leg near expiration, early exercise on deep-ITM American-style options, and pin risk exactly at strike on expiration Friday. Close spreads a few days before expiration to sidestep all three.",
        DISC,
      ],
      keyTakeaways: [
        "A spread caps both max loss and max gain — you know your worst case before entering.",
        "Bull call spreads are the classic starter directional trade.",
        "Iron condors profit from a stock staying inside a defined range.",
        "Size so any single spread trade risks no more than 1-2% of the account.",
      ],
      sources: [
        { label: "SEC — Options Strategies Bulletin", url: "https://www.sec.gov/investor/pubs/optionsstrategies.pdf" },
        { label: "OCC — Options Industry Council", url: "https://www.optionseducation.org/" },
      ],
      quiz: [
        { question: "Max loss on a bull call spread is:", options: ["Unlimited", "The width of the spread", "The net debit paid", "The strike price"], correctAnswer: 2, explanation: "For a debit spread the max loss is the premium paid." },
        { question: "An iron condor profits most when the stock:", options: ["Rallies sharply", "Crashes sharply", "Stays inside the two short strikes", "Goes to zero"], correctAnswer: 2, explanation: "Iron condors are neutral / range-bound trades." },
        { question: "Reasonable per-trade risk on a $100,000 practice account is:", options: ["$50,000", "$25,000", "$1,000-$2,000", "$100"], correctAnswer: 2, explanation: "1-2% of account is the standard risk floor." },
        { question: "Why close spreads before expiration?", options: ["To lock in higher gains", "Less commission", "Avoid assignment and pin risk", "Reset the trade"], correctAnswer: 2, explanation: "Assignment, early exercise, and pin risk all spike near expiration." },
      ],
    },
    {
      slug: "implied-volatility-and-earnings",
      title: "Implied Volatility & Trading Around Earnings",
      summary: "IV is the market's forward-looking volatility forecast — and the single biggest driver of option prices.",
      readingMinutes: 8,
      body: [
        "## What implied volatility actually is",
        "Implied volatility (IV) is the volatility figure that, plugged into an option pricing model, would produce the option's current market price. It is not a prediction any single person makes — it emerges from the aggregate bids and offers of every participant. Rising IV means the market collectively expects bigger moves; falling IV means it expects calmer conditions.",
        "## IV rank vs IV percentile",
        "The raw IV number is meaningless without context. IV rank compares today's IV to the highest and lowest reading of the last 12 months on a 0-100 scale. IV percentile tells you what fraction of the last year the stock traded below today's IV. Rule of thumb: sell premium when IV rank > 50, buy premium when IV rank < 30.",
        "## The earnings trap",
        "In the two weeks leading up to earnings, IV on the affected options can double. A trader who buys calls expecting a beat can be right on direction and still lose money as IV crushes overnight. This is the single most common way beginners lose on options.",
        "## A safer earnings play",
        "Instead of buying long options into earnings, professionals often sell short strangles or iron condors that collect the inflated premium and profit from the post-earnings IV collapse — provided the actual move is smaller than the market implied. This flips the earnings edge in the seller's favour.",
        "## Practice loop",
        "On the simulator, pick a highly-watched name (AAPL, NVDA, TSLA) reporting earnings this week. Note IV rank the day before, then compare to IV rank the day after. Do this for 10 earnings cycles and the IV-crush pattern becomes viscerally obvious in a way no textbook can teach.",
        DISC,
      ],
      keyTakeaways: [
        "IV is the market's forward volatility forecast, not any one trader's prediction.",
        "IV rank contextualises today's IV against the last 12 months.",
        "IV crush after earnings can turn a correct directional bet into a loss.",
        "Selling premium into elevated IV is the classic edge for experienced traders.",
      ],
      sources: [
        { label: "CME — Implied Volatility", url: "https://www.cmegroup.com/education/courses/introduction-to-options/measures-of-implied-volatility.html" },
        { label: "Investopedia — IV", url: "https://www.investopedia.com/terms/i/iv.asp" },
      ],
      quiz: [
        { question: "IV rank of 80 means:", options: ["IV is at 80%", "IV is near a 12-month high", "IV is near a 12-month low", "80% of options are profitable"], correctAnswer: 1, explanation: "IV rank normalises IV against the last year on a 0-100 scale." },
        { question: "The most common way beginners lose on earnings plays:", options: ["Wrong strike", "Wrong direction", "Right direction, crushed by IV collapse", "Assignment risk"], correctAnswer: 2, explanation: "IV crush routinely wipes out even correctly-directional long option trades." },
        { question: "A common rule of thumb for selling premium is to sell when:", options: ["IV rank < 30", "IV rank > 50", "IV = 100%", "IV is average"], correctAnswer: 1, explanation: "Selling premium in high-IV environments is a common edge." },
        { question: "Implied volatility is:", options: ["Historical vol over 30 days", "An exchange forecast", "The volatility that makes model = market price", "The stock's beta"], correctAnswer: 2, explanation: "IV is the vol input that reconciles a pricing model with the live option price." },
      ],
    },
    {
      slug: "options-risk-management",
      title: "Options Risk Management — Sizing, Rolling & Cutting Losses",
      summary: "The single reason 90% of retail option traders lose money is size, not strategy. Fix sizing first.",
      readingMinutes: 9,
      body: [
        "## The 1% rule for defined-risk trades",
        "Never risk more than 1-2% of the account on a single defined-risk options position. On the $100,000 TradeHQ practice account that's $1,000-$2,000 max loss per trade. Applied consistently, this lets you take dozens of trades without a single loss threatening the account.",
        "## The 3x rule for undefined-risk trades",
        "Naked puts and short strangles have undefined loss potential. Professional risk desks cap capital at risk on any single underlying at 3x the credit received — meaning if you collect $200, you're prepared to buy back the trade at $600 and take a $400 realised loss.",
        "## Rolling — extending, not doubling down",
        "Rolling is closing an existing option and opening a similar one further out in time (and sometimes at a different strike). It only works when you receive additional credit; rolling for a debit almost always compounds the original mistake. Set a rule: roll only for a credit, and only once per underlying per expiration cycle.",
        "## When to cut a loss",
        "The simplest rule that outperforms most complex ones: exit any defined-risk long option position that loses 50% of its premium. Exit any short premium position that has doubled against you. These two rules alone stop most account-ending drawdowns.",
        "## Journaling every trade",
        "For each trade record: thesis, IV rank at entry, position size in dollars, max loss in dollars, exit reason, actual P&L. After 50 trades you'll see your own edge and your own leaks. TradeHQ's ghost journal does this automatically on every simulated trade.",
        DISC,
      ],
      keyTakeaways: [
        "Cap defined-risk trades at 1-2% of account per position.",
        "Cap undefined-risk trades at 3x credit received.",
        "Only roll for a credit — rolling for a debit compounds mistakes.",
        "Cut long options at 50% loss, buy back shorts at 2x credit.",
      ],
      sources: [
        { label: "FINRA — Options Risk", url: "https://www.finra.org/investors/insights/options" },
        { label: "SEC — Options Trading Alert", url: "https://www.sec.gov/oiea/investor-alerts-bulletins/ia_optionstrading.html" },
      ],
      quiz: [
        { question: "Recommended per-trade risk for defined-risk options:", options: ["10-20%", "5-10%", "1-2%", "0.01%"], correctAnswer: 2, explanation: "1-2% per trade is the standard risk-management floor." },
        { question: "Rolling should generally only be done:", options: ["For a debit", "For a credit", "On expiration day", "Every day"], correctAnswer: 1, explanation: "Rolling for a debit compounds losses." },
        { question: "Common exit rule for a long option is to cut it at:", options: ["10% loss", "50% loss of premium", "90% loss", "Only at expiration"], correctAnswer: 1, explanation: "The 50% rule protects against terminal decay." },
        { question: "Why journal every trade?", options: ["Tax only", "Identify your edge and leaks", "Required by regulators", "Boosts win rate automatically"], correctAnswer: 1, explanation: "Journaling surfaces real edge and recurring mistakes." },
      ],
    },
  ],
};

const futuresTrack: CourseTrack = {
  slug: "futures-and-derivatives",
  title: "Futures & Derivatives",
  tagline: "Contracts, margin, contango and hedging — the trader's toolkit.",
  description:
    "A ground-up guide to exchange-listed futures — how contracts are specified, how margin actually works, why term-structure matters, and how hedgers and speculators interact on the CME.",
  hero: futuresHero,
  level: "Intermediate",
  badge: { name: "Futures Fundamentals Certified", description: "Awarded after completing every lesson in the Futures & Derivatives track." },
  lessons: [
    {
      slug: "what-is-a-futures-contract",
      title: "What Is a Futures Contract?",
      summary: "A futures contract is a standardised, exchange-traded agreement to buy or sell a fixed quantity of an asset at a set price on a set future date.",
      readingMinutes: 8,
      body: [
        "## The core definition",
        "A futures contract is a legally binding, exchange-listed agreement between a buyer and a seller to exchange a fixed quantity of a specific asset — crude oil, corn, S&P 500 e-mini index, US Treasury bonds — at a pre-agreed price on a pre-agreed future date. Because the exchange (CME, ICE) stands between every buyer and seller as the central counterparty, credit risk is essentially eliminated and contracts are perfectly fungible.",
        "## Contract specifications matter",
        "Every futures contract has a spec sheet: contract size, tick size, tick value, trading hours, delivery month, and settlement method (physical or cash). Ignoring the spec is the fastest way to blow up. One E-mini S&P 500 contract represents $50 × the index — with the index at 5,000, a single contract has $250,000 of notional exposure.",
        "## Long vs short — perfect symmetry",
        "Unlike stocks, going short a futures contract is exactly as easy as going long. There's no borrow fee, no uptick rule, no restriction. This symmetry makes futures the preferred vehicle for hedgers who need to lock in a future selling price (farmers, oil producers) or a future buying price (airlines, industrial users).",
        "## Speculators and price discovery",
        "Roughly two-thirds of futures volume comes from speculators — traders with no intention of ever taking delivery. They provide the liquidity that lets commercial hedgers enter and exit efficiently. It's a symbiotic system that has been running continuously since the Chicago Board of Trade opened in 1848.",
        DISC,
      ],
      keyTakeaways: [
        "A futures contract is a standardised exchange agreement to transact a fixed asset at a future date.",
        "The exchange is the central counterparty — no credit risk between buyer and seller.",
        "Short-selling is perfectly symmetric with going long.",
        "Every contract has a spec sheet — always read it.",
      ],
      sources: [
        { label: "CFTC — Futures 101", url: "https://www.cftc.gov/LearnAndProtect/EducationCenter/CFTCBasics/index.htm" },
        { label: "CME — Introduction to Futures", url: "https://www.cmegroup.com/education/courses/introduction-to-futures.html" },
      ],
      quiz: [
        { question: "The central counterparty on a US futures exchange is:", options: ["The buyer", "The seller", "The exchange's clearing house", "The broker"], correctAnswer: 2, explanation: "The clearing house novates every trade." },
        { question: "Notional value of one E-mini S&P at index 5,000 ≈", options: ["$5,000", "$50,000", "$250,000", "$1,000,000"], correctAnswer: 2, explanation: "$50 × 5,000 = $250,000." },
        { question: "Compared to shorting stocks, shorting futures is:", options: ["Harder", "Impossible", "Perfectly symmetric", "Institutions only"], correctAnswer: 2, explanation: "No borrow fee or uptick rule." },
        { question: "Roughly what share of futures volume is speculative?", options: ["10%", "One-third", "Two-thirds", "100%"], correctAnswer: 2, explanation: "Speculators supply liquidity for hedgers." },
      ],
    },
    {
      slug: "margin-and-leverage-in-futures",
      title: "Margin & Leverage in Futures",
      summary: "Futures margin is a performance bond, not a loan — and it's why one bad trade can wipe out an account overnight.",
      readingMinutes: 8,
      body: [
        "## Margin is not what you think",
        "In stocks, margin is money you borrow to buy more shares. In futures, margin is a performance bond you post to guarantee you'll pay any losses. There is no loan and no interest. Typical initial margin on the E-mini S&P is ~$13,000 — for $250,000 of notional exposure. That's roughly 20x leverage.",
        "## Maintenance margin and margin calls",
        "Once positioned, your margin must stay above a maintenance level (usually 90% of initial). If it drops below, you receive a margin call — deposit more cash or the broker liquidates automatically. This can happen intraday and there is no grace period.",
        "## Daily mark-to-market",
        "Every futures account settles P&L in cash every single trading day. If you lose $2,000 today, that cash leaves your account tonight. If you gain $2,000, it's deposited. This continuous settlement is why futures never have overnight credit risk between counterparties.",
        "## Why leverage cuts both ways",
        "A 1% move on the S&P 500 is $2,500 per E-mini contract. On $13,000 of margin, that's a ~19% swing on your capital per 1% market move. This is why professionals use micro contracts (1/10th the size) or trade with much larger accounts than the minimum margin suggests.",
        DISC,
      ],
      keyTakeaways: [
        "Futures margin is a performance bond, not a loan.",
        "Accounts are marked-to-market every trading day.",
        "Maintenance breaches trigger immediate margin calls.",
        "Effective leverage is typically 15-25x.",
      ],
      sources: [
        { label: "CFTC — Margin", url: "https://www.cftc.gov/IndustryOversight/Intermediaries/index.htm" },
        { label: "NFA — Trading with Leverage", url: "https://www.nfa.futures.org/investors/investor-resources/index.HTML" },
      ],
      quiz: [
        { question: "Futures margin is best described as:", options: ["A loan", "A performance bond", "A fee", "A tax"], correctAnswer: 1, explanation: "It guarantees you'll cover losses — no borrowing." },
        { question: "Futures accounts are marked-to-market:", options: ["Yearly", "Monthly", "Every trading day", "Only at expiration"], correctAnswer: 2, explanation: "Daily settlement moves cash in/out." },
        { question: "1% S&P move on $13K margin ≈", options: ["1%", "5%", "~19%", "50%"], correctAnswer: 2, explanation: "$2,500 on $13,000 ≈ 19%." },
        { question: "A margin call means:", options: ["You made money", "Deposit more or be liquidated", "Exchange closed", "Broker owes interest"], correctAnswer: 1, explanation: "Immediate top-up or force-close." },
      ],
    },
    {
      slug: "contango-and-backwardation",
      title: "Contango & Backwardation — Term Structure Explained",
      summary: "The shape of the futures curve tells you what commercial hedgers actually expect — the single most important concept for commodity traders.",
      readingMinutes: 9,
      body: [
        "## Term structure — the futures curve",
        "For any commodity there are typically 6-24 listed futures expirations. Plot each expiration's price on a graph and you get the term structure. When further-dated contracts trade above nearer ones, the curve is in contango. When they trade below, it's in backwardation.",
        "## Why contango happens",
        "Contango is the default state for storable commodities. The further-dated contract prices in storage costs, insurance, and financing over the holding period. If a barrel of oil sitting in a tank for 12 months costs $4 to store and finance, the 12-month future should trade $4 above spot in a healthy market.",
        "## Why backwardation happens",
        "Backwardation signals a physical shortage right now. Commercial users are willing to pay a premium for immediate delivery rather than wait. Crude oil famously flipped into deep backwardation during the 2022 supply-shock rally.",
        "## The roll yield trap",
        "Retail commodity ETFs like USO must continuously roll expiring contracts into new ones. In contango, they systematically sell cheaper front-month and buy more-expensive back-month, bleeding value on every roll. This is why USO has vastly underperformed spot WTI over the past decade.",
        "## Trading implications",
        "Steep contango often precedes a top in the commodity. Deep backwardation often precedes a bottom or a squeeze. The curve is not a prediction — it's the aggregate positioning of commercial hedgers who move the actual physical.",
        DISC,
      ],
      keyTakeaways: [
        "Contango: futures above spot — storage costs dominate.",
        "Backwardation: futures below spot — physical shortage.",
        "Commodity ETFs bleed value rolling in contango.",
        "The curve reveals hedger positioning.",
      ],
      sources: [
        { label: "CME — Contango/Backwardation", url: "https://www.cmegroup.com/education/courses/introduction-to-crude-oil/contango-and-backwardation.html" },
        { label: "FRED — WTI", url: "https://fred.stlouisfed.org/series/DCOILWTICO" },
      ],
      quiz: [
        { question: "Further-dated below front month =", options: ["Contango", "Backwardation", "Equilibrium", "Rollover"], correctAnswer: 1, explanation: "Backwardation = shortage signal." },
        { question: "Why do ETFs bleed value in contango?", options: ["Fees", "Roll from cheap to expensive contract", "FX", "Tax"], correctAnswer: 1, explanation: "Systematic roll drag." },
        { question: "Contango is typical for:", options: ["Perishables", "Storable commodities in normal markets", "Only metals", "Only ags"], correctAnswer: 1, explanation: "Storage costs push distant deliveries up." },
        { question: "Deep backwardation often signals:", options: ["Quiet market", "Physical shortage", "Delisting", "Low vol"], correctAnswer: 1, explanation: "Hedgers pay for immediate supply." },
      ],
    },
    {
      slug: "hedging-with-futures",
      title: "Hedging with Futures — The Original Use Case",
      summary: "Hedging is why futures exist. Airlines hedge fuel; farmers hedge harvests; funds hedge equity beta.",
      readingMinutes: 8,
      body: [
        "## The airline case study",
        "An airline burning 200 million gallons of jet fuel a year has a huge exposure to crude oil prices. By buying crude oil futures for delivery over the next 12 months, it can effectively lock in today's price. If oil rips higher, the futures profit offsets the higher physical fuel cost.",
        "## The farmer case study",
        "A corn farmer plants in May and won't harvest until September. By selling corn futures for September delivery in May, the farmer locks in the price today. If corn falls between May and September, the futures gain offsets the lower cash sale.",
        "## Portfolio hedging with equity index futures",
        "A fund manager who owns $50 million of large-cap stocks can hedge that exposure by shorting E-mini S&P 500 futures. With the index at 5,000 and each contract at $250,000 notional, they'd short 200 contracts to fully neutralise. This is why S&P futures see billions in daily volume during equity drawdowns.",
        "## The hedge is never perfect",
        "Basis risk (difference between futures and physical price) always exists. Jet fuel is not crude oil. A specific corn variety is not the generic contract. Portfolio betas drift. Hedges reduce risk — they never eliminate it.",
        DISC,
      ],
      keyTakeaways: [
        "Hedging is the original purpose of futures.",
        "Producers sell; consumers buy.",
        "Equity funds hedge beta by shorting index futures.",
        "Basis risk means hedges reduce — never eliminate — risk.",
      ],
      sources: [
        { label: "CME — Hedging", url: "https://www.cmegroup.com/education/courses/hedging-with-futures.html" },
        { label: "USDA — Farm Risk", url: "https://www.usda.gov/topics/farming/risk-management" },
      ],
      quiz: [
        { question: "A wheat farmer worried about price drop should:", options: ["Buy wheat futures", "Sell wheat futures", "Buy corn futures", "Buy S&P"], correctAnswer: 1, explanation: "Sell to lock in today's price." },
        { question: "Airline hedging vs crude rally should:", options: ["Sell crude futures", "Buy crude futures", "Buy S&P", "Do nothing"], correctAnswer: 1, explanation: "Buying futures profits if crude rises." },
        { question: "Basis risk is:", options: ["Exchange default", "Futures vs physical don't move perfectly together", "Rate risk", "FX risk"], correctAnswer: 1, explanation: "Basis fluctuates." },
        { question: "Hedge $50M with $250K notional contracts →", options: ["20", "200", "500", "1,000"], correctAnswer: 1, explanation: "$50M / $250K = 200." },
      ],
    },
    {
      slug: "micro-futures-for-beginners",
      title: "Micro Futures — The Right Way to Start",
      summary: "Micro contracts are 1/10th the size of standard e-minis, making futures accessible without abandoning leverage discipline.",
      readingMinutes: 7,
      body: [
        "## What micros are",
        "CME launched micro E-mini S&P (MES), Nasdaq (MNQ), Dow (MYM), Russell (M2K) and micro crypto contracts starting in 2019. They're literally 1/10th the size of the standard e-mini: MES has a $5 multiplier vs the E-mini's $50. Margin is 1/10th too — roughly $1,300 vs $13,000.",
        "## Why micros make you a better trader",
        "The biggest reason retail futures accounts blow up is over-sizing. Micros solve that at the contract level. You can scale into a position 1 contract at a time, take real P&L, and only step up to full-size E-minis once your journal shows a consistent edge over hundreds of trades.",
        "## The math is identical",
        "Everything about micros — margin, mark-to-market, contango, hedging — works exactly the same as full-size futures. You're not learning a lesser instrument; you're learning the same instrument at 1/10th the risk-per-tick.",
        "## On the simulator",
        "TradeHQ's practice environment mirrors futures margin behaviour so you can experience daily mark-to-market with $100,000 in virtual capital and zero real dollars at risk.",
        DISC,
      ],
      keyTakeaways: [
        "Micros are 1/10th of standard e-minis in notional and margin.",
        "Everything else is identical.",
        "Micros let beginners scale one contract at a time.",
        "Simulator practice adds another safety layer.",
      ],
      sources: [
        { label: "CME — Micro E-mini", url: "https://www.cmegroup.com/markets/equities/sp/micro-e-mini-sandp-500.html" },
      ],
      quiz: [
        { question: "A micro E-mini S&P (MES) is what fraction of a standard e-mini?", options: ["1/2", "1/5", "1/10", "1/100"], correctAnswer: 2, explanation: "One-tenth the size and margin." },
        { question: "Main advantage of micros for beginners:", options: ["Lower fees", "1/10th risk per tick", "Different tax", "24-hour trading"], correctAnswer: 1, explanation: "Same instrument, one-tenth the risk." },
        { question: "Compared to standard e-minis, micros have:", options: ["Different margin rules", "Different mark-to-market", "Identical mechanics at 1/10 scale", "Weekly settlement"], correctAnswer: 2, explanation: "Mechanics identical — only size differs." },
        { question: "Primary reason retail futures accounts blow up:", options: ["Bad brokers", "Over-sizing", "Poor internet", "High commissions"], correctAnswer: 1, explanation: "Over-sizing is the dominant failure mode." },
      ],
    },
  ],
};

const macroTrack: CourseTrack = {
  slug: "macro-reading-for-traders",
  title: "Macro Reading for Traders",
  tagline: "CPI, the Fed, the yield curve and the dollar — how the pieces connect.",
  description:
    "A trader-focused tour of the macro variables that move markets — inflation prints, central-bank policy, the yield curve, and the dollar index — with a concrete playbook for reading them together.",
  hero: macroHero,
  level: "Intermediate",
  badge: { name: "Macro Reading Certified", description: "Awarded after completing every lesson in the Macro Reading for Traders track." },
  lessons: [
    {
      slug: "reading-cpi-and-inflation",
      title: "Reading CPI — The Number That Moves Every Market",
      summary: "CPI is the most-watched macro release on the calendar — the reason every trader sits on the same clock at 8:30 AM ET.",
      readingMinutes: 8,
      body: [
        "## What CPI actually measures",
        "The Consumer Price Index is a monthly Bureau of Labor Statistics survey of prices paid by urban consumers for a basket of goods and services. It has two headline flavours: headline CPI (includes food and energy) and core CPI (excludes them, because they're volatile). Traders watch both, but the Federal Reserve targets core PCE — a separate but closely related measure.",
        "## The release mechanics",
        "CPI drops at 8:30 AM Eastern on a set day mid-month. In the 60 seconds after release, S&P 500 futures, 10-year Treasury yields, and the dollar index can move 0.5-1.5% on a meaningful surprise. This initial impulse is driven by algorithmic reactions to the print vs consensus.",
        "## Consensus, surprise and market reaction",
        "Every economist submits a forecast. The median is consensus. If actual > consensus, it's a hot print — bond yields typically rise, dollar strengthens, equities can either sell off (rate fear dominant) or rally (growth optimism dominant). Which reaction dominates depends on the regime — this is why context matters more than the number itself.",
        "## The three-layer read",
        "A pro macro trader reads a CPI print in three passes. Layer 1: headline vs consensus. Layer 2: core vs consensus (Fed cares about core). Layer 3: the underlying components — shelter, services ex-shelter, goods — because a hot headline driven by used cars is very different from a hot headline driven by services inflation.",
        DISC,
      ],
      keyTakeaways: [
        "CPI drops 8:30 AM ET on a set mid-month day.",
        "Core CPI matters more to the Fed.",
        "Surprise vs consensus drives the reaction.",
        "Read the underlying components.",
      ],
      sources: [
        { label: "BLS — CPI", url: "https://www.bls.gov/cpi/" },
        { label: "FRED — CPI-U", url: "https://fred.stlouisfed.org/series/CPIAUCSL" },
      ],
      quiz: [
        { question: "Fed's preferred inflation measure:", options: ["Headline CPI", "Core CPI", "Core PCE", "PPI"], correctAnswer: 2, explanation: "Fed targets 2% core PCE." },
        { question: "CPI is released at:", options: ["8:00 AM ET", "8:30 AM ET", "10:00 AM ET", "2:00 PM ET"], correctAnswer: 1, explanation: "8:30 AM Eastern." },
        { question: "Why core over headline?", options: ["Core is higher", "Food/energy too volatile to signal trend", "Headline not reported", "Only economists care"], correctAnswer: 1, explanation: "Stripping volatile components isolates trend." },
        { question: "Initial market impulse to CPI driven by:", options: ["Retail", "Algorithmic reactions to surprise", "Fed statements", "Treasury"], correctAnswer: 1, explanation: "Algos react in microseconds." },
      ],
    },
    {
      slug: "the-fed-and-fomc-cycle",
      title: "The Fed & FOMC Cycle — How Rates Get Set",
      summary: "The FOMC meets eight times a year and every trader adjusts positioning around it.",
      readingMinutes: 9,
      body: [
        "## The mandate",
        "The Federal Reserve has a dual mandate from Congress: maximum employment and price stability (defined as 2% average inflation). Every rate decision, statement, and dot-plot is filtered through those two variables.",
        "## The eight-meeting cycle",
        "The Federal Open Market Committee (FOMC) meets eight times a year. At every meeting they publish a statement at 2:00 PM ET and Chair Powell holds a 30-minute press conference at 2:30 PM. Four of the eight meetings also release the Summary of Economic Projections (SEP) — the famous 'dot plot'.",
        "## Market pricing of Fed decisions",
        "The CME FedWatch Tool converts Fed funds futures into implied probabilities of each possible rate decision. When markets price 90% probability of a 25 bp cut and the Fed delivers 25 bp, there's minimal reaction. When markets price 90% probability of a hold and the Fed cuts, everything moves — a policy surprise.",
        "## Reading the statement vs the presser",
        "The statement is written by committee and every word is deliberate. Traders compare it line-by-line against the previous statement. The press conference is where nuance, tone, and Powell's off-script answers move markets — sometimes more than the decision itself.",
        "## Trading the Fed",
        "The safest approach for a learning trader: watch, don't trade, the initial 5-minute reaction. Volatility can spike, spreads widen, and directional moves reverse minutes later on presser tone changes.",
        DISC,
      ],
      keyTakeaways: [
        "Dual mandate: employment + 2% inflation.",
        "FOMC meets 8 times a year; 4 release the dot plot.",
        "CME FedWatch shows priced-in probabilities.",
        "Presser often moves markets more than the decision.",
      ],
      sources: [
        { label: "Federal Reserve — FOMC", url: "https://www.federalreserve.gov/monetarypolicy/fomc.htm" },
        { label: "CME — FedWatch", url: "https://www.cmegroup.com/markets/interest-rates/cme-fedwatch-tool.html" },
      ],
      quiz: [
        { question: "How many FOMC meetings per year?", options: ["4", "6", "8", "12"], correctAnswer: 2, explanation: "Eight scheduled." },
        { question: "Fed's dual mandate:", options: ["Low rates + growth", "Max employment + price stability", "Full employment + stock gains", "Low inflation + strong dollar"], correctAnswer: 1, explanation: "Set by Congress." },
        { question: "The 'dot plot' shows:", options: ["Historical rates", "Each FOMC member's rate forecast", "Balance sheet", "Sentiment"], correctAnswer: 1, explanation: "Anonymised member forecasts." },
        { question: "FedWatch derives probabilities from:", options: ["Analyst surveys", "Fed funds futures pricing", "Twitter", "Reuters polls"], correctAnswer: 1, explanation: "Fed funds futures embed implied rate probabilities." },
      ],
    },
    {
      slug: "the-yield-curve-and-recession",
      title: "The Yield Curve — The Bond Market's Recession Alarm",
      summary: "An inverted yield curve has preceded every US recession in the last 60 years. It is the single most reliable macro signal.",
      readingMinutes: 8,
      body: [
        "## What the yield curve is",
        "The yield curve plots the yield on US Treasury securities across maturities — from 3 months out to 30 years. In normal times it's upward-sloping: you get paid more for lending longer. When short-term yields exceed long-term yields, the curve is inverted.",
        "## Why inversion signals recession",
        "Inversion means the market expects the Fed to cut rates sharply in the future — which the Fed only does when the economy is weakening. Every US recession since 1960 has been preceded by an inversion of the 10-year minus 2-year (or 10-year minus 3-month) spread, typically 6-18 months in advance.",
        "## The 10Y-2Y vs 10Y-3M",
        "The New York Fed's preferred recession-probability model uses the 10-year minus 3-month spread. The 10Y-2Y is the more commonly quoted spread in financial media. Both have strong historical track records, though they invert at slightly different times.",
        "## Trading around the curve",
        "The curve is a slow-moving macro variable. It's most useful for positioning — going more defensive as inversion deepens — rather than for intraday timing.",
        DISC,
      ],
      keyTakeaways: [
        "The yield curve is normally upward-sloping.",
        "Inversion has preceded every US recession since 1960.",
        "10Y-3M is the NY Fed's preferred spread.",
        "Use the curve for regime positioning.",
      ],
      sources: [
        { label: "NY Fed — Yield Curve Recession Probability", url: "https://www.newyorkfed.org/research/capital_markets/ycfaq" },
        { label: "FRED — T10Y2Y", url: "https://fred.stlouisfed.org/series/T10Y2Y" },
      ],
      quiz: [
        { question: "Inverted curve =", options: ["Short < long", "Short > long", "Flat", "Negative yields"], correctAnswer: 1, explanation: "Short-term exceeds long-term." },
        { question: "NY Fed's preferred recession spread:", options: ["10Y-2Y", "10Y-3M", "30Y-5Y", "2Y-Fed Funds"], correctAnswer: 1, explanation: "10Y-3M used in official model." },
        { question: "Since 1960, inverted 10Y-3M has preceded:", options: ["Some recessions", "Every US recession", "None", "Only 2008"], correctAnswer: 1, explanation: "Perfect signal in modern era." },
        { question: "Curve is best used for:", options: ["Intraday timing", "Regime positioning", "Options pricing", "FX"], correctAnswer: 1, explanation: "Moves slowly — regime indicator." },
      ],
    },
    {
      slug: "the-dollar-index-dxy",
      title: "The Dollar Index (DXY) — The One Chart Every Trader Watches",
      summary: "The DXY drives everything from emerging-market equities to commodity prices to gold.",
      readingMinutes: 7,
      body: [
        "## Composition",
        "The US Dollar Index (DXY) measures the dollar against a basket of six currencies: euro (57.6%), Japanese yen (13.6%), British pound (11.9%), Canadian dollar (9.1%), Swedish krona (4.2%), and Swiss franc (3.6%). The euro dominates by design.",
        "## Why DXY matters for stock traders",
        "US large-caps in the S&P 500 earn roughly 40% of revenue outside the US. A strong dollar mechanically compresses those foreign-earned dollars when translated back at higher rates. Every 5% DXY rally is roughly a 2% headwind to S&P 500 EPS.",
        "## Why DXY matters for commodities",
        "Global commodities (oil, gold, copper) are priced in dollars. A stronger dollar makes them more expensive in local currency for the rest of the world, softening demand. This is why gold and DXY typically move inversely — though the correlation breaks in crisis periods when both rally as safe havens.",
        "## Why DXY matters for emerging markets",
        "Emerging economies often borrow in dollars. A rising DXY inflates their debt-service costs, tightens local financial conditions, and pressures EM equities.",
        "## The single-chart heuristic",
        "If you can only look at one macro chart before a trading session, look at DXY. Its short-term trend correlates with risk-on/risk-off across every major asset class.",
        DISC,
      ],
      keyTakeaways: [
        "DXY is a basket weighted 57.6% to the euro.",
        "Rising dollar is a headwind for US large-cap EPS.",
        "Gold and DXY typically move inversely.",
        "EM equities are exceptionally DXY-sensitive.",
      ],
      sources: [
        { label: "ICE — DXY", url: "https://www.ice.com/products/194/US-Dollar-Index-Futures" },
        { label: "FRED — Trade Weighted USD", url: "https://fred.stlouisfed.org/series/DTWEXBGS" },
      ],
      quiz: [
        { question: "Largest DXY weight:", options: ["Yen", "Pound", "Euro (~57.6%)", "Yuan"], correctAnswer: 2, explanation: "Euro dominates the basket." },
        { question: "Rising DXY is a headwind for:", options: ["Small caps only", "US large-cap EPS", "US Treasuries", "US inflation"], correctAnswer: 1, explanation: "Foreign revenue translation." },
        { question: "Gold vs DXY correlation is generally:", options: ["Strongly positive", "Zero", "Inverse (breaks in crisis)", "Random"], correctAnswer: 2, explanation: "Inverse in normal regimes; both rally in acute risk-off." },
        { question: "EM equities tend to underperform when:", options: ["DXY falls", "DXY rises sharply", "DXY stable", "US rates fall"], correctAnswer: 1, explanation: "Dollar strength tightens EM conditions." },
      ],
    },
    {
      slug: "putting-macro-signals-together",
      title: "Putting It Together — A Macro Dashboard for Traders",
      summary: "Individual macro variables are noisy. Together they form regimes — and regimes are what actually matter for positioning.",
      readingMinutes: 8,
      body: [
        "## The four-quadrant regime framework",
        "Bridgewater's classic framework splits macro into four regimes based on the intersection of growth (rising/falling) and inflation (rising/falling). Rising growth + rising inflation favours commodities and equities. Falling growth + rising inflation (stagflation) favours gold and cash. Rising growth + falling inflation is the goldilocks regime — best for equities. Falling growth + falling inflation favours long-duration bonds.",
        "## Building a personal dashboard",
        "You don't need a Bloomberg terminal. Free sources cover 95% of what matters: FRED (macro data), CME FedWatch (rate expectations), TradingView (yield curve, DXY), and the BLS website (CPI, jobs). A 15-minute daily read of these puts you ahead of most retail traders.",
        "## The weekly ritual",
        "Every Sunday, log the week's readings: DXY level, 10Y yield, 10Y-2Y spread, VIX, WTI crude, gold, S&P 500. Note which quadrant we're in. Compare to last week. You'll build regime intuition faster than reading any single article.",
        "## Don't over-trade macro",
        "Macro regimes shift over weeks and months, not minutes. Use the framework for position sizing and asset allocation, not for entry timing.",
        DISC,
      ],
      keyTakeaways: [
        "Growth × inflation defines four macro regimes.",
        "Free sources cover 95% of what matters.",
        "A weekly log builds intuition fast.",
        "Use macro for allocation, not intraday timing.",
      ],
      sources: [
        { label: "FRED", url: "https://fred.stlouisfed.org/" },
        { label: "BEA — GDP", url: "https://www.bea.gov/data/gdp/gross-domestic-product" },
      ],
      quiz: [
        { question: "Bridgewater framework splits by:", options: ["Rates + unemployment", "Growth × inflation direction", "GDP + CPI levels", "Stocks + bonds"], correctAnswer: 1, explanation: "Four quadrants." },
        { question: "Stagflation =", options: ["Growth up + inflation up", "Growth up + inflation down", "Growth down + inflation up", "Growth down + inflation down"], correctAnswer: 2, explanation: "Weak growth + high inflation." },
        { question: "Macro regimes best used for:", options: ["Scalping", "Sizing + allocation", "Option strikes", "Backtesting"], correctAnswer: 1, explanation: "Slow-moving." },
        { question: "Free source covering 95% of macro:", options: ["Bloomberg", "Reuters Eikon", "FRED", "Cap IQ"], correctAnswer: 2, explanation: "St Louis Fed's free database." },
      ],
    },
  ],
};

const psychologyTrack: CourseTrack = {
  slug: "trading-psychology-mastery",
  title: "Trading Psychology Mastery",
  tagline: "Biases, tilt, discipline — the mental game that decides the P&L game.",
  description:
    "The most sophisticated system in the world fails if the trader running it is emotionally compromised. This track teaches the cognitive biases, emotional dysregulation patterns, and concrete rituals professional traders use to stay in the game.",
  hero: psychologyHero,
  level: "Beginner",
  badge: { name: "Psychology Mastery Certified", description: "Awarded after completing every lesson in the Trading Psychology Mastery track." },
  lessons: [
    {
      slug: "cognitive-biases-in-trading",
      title: "Cognitive Biases Every Trader Must Know",
      summary: "Confirmation bias, anchoring, loss aversion — the mental shortcuts that quietly destroy trading edge.",
      readingMinutes: 9,
      body: [
        "## Why biases matter more than intelligence",
        "Decades of behavioural finance research — starting with Kahneman and Tversky's Nobel-winning work — show that human decision-making is systematically biased in predictable ways. Trading is one of the most bias-hostile environments a human can enter, because the feedback loops are noisy, delayed, and easily misattributed.",
        "## Confirmation bias",
        "Once you're long a stock, you unconsciously seek out news that confirms your thesis and dismiss news that contradicts it. Counter it by writing down your invalidation criteria before entering: 'I will exit if X happens.' The pre-commitment forces you to look for disconfirming evidence.",
        "## Anchoring",
        "The price you paid becomes psychologically sticky. If you bought at $100 and it drops to $90, you often refuse to sell because it 'has to' get back to $100. Markets don't care about your entry price. Ask instead: 'If I had no position, would I buy this at $90 today?' If the answer is no, close the trade.",
        "## Loss aversion",
        "Kahneman showed that losses hurt roughly twice as much as equivalent gains feel good. This drives the classic beginner pattern: cutting winners too early and letting losers run — the opposite of what edge requires. The fix is mechanical: define stop losses and profit targets before entry, then execute regardless of emotion.",
        "## Recency bias",
        "You over-weight your last 5 trades and under-weight your last 500. After 3 losing days you're tempted to abandon a strategy that has 20 years of backtested edge. Journaling with 30-trade rolling win rate suppresses this bias.",
        DISC,
      ],
      keyTakeaways: [
        "Confirmation bias: seek disconfirming evidence deliberately.",
        "Anchoring: your entry price is irrelevant to the market.",
        "Loss aversion: losses hurt 2x as much as gains feel good.",
        "Recency bias: judge strategies over hundreds of trades.",
      ],
      sources: [
        { label: "Investopedia — Behavioural Finance", url: "https://www.investopedia.com/terms/b/behavioralfinance.asp" },
        { label: "SEC — Investor Alerts", url: "https://www.sec.gov/investor/alerts" },
      ],
      quiz: [
        { question: "Loss aversion means:", options: ["Hate all losses equally", "Losses hurt ~2x as much as gains feel good", "Prefer losses to gains", "Avoid all trades"], correctAnswer: 1, explanation: "Kahneman's ~2x asymmetry." },
        { question: "Anchoring shows up as:", options: ["Refusing to sell below entry", "Buying too much", "Over-diversifying", "Ignoring chart"], correctAnswer: 0, explanation: "Anchored to entry price." },
        { question: "Best defense against confirmation bias:", options: ["Follow experts", "Write invalidation criteria before entering", "Trade smaller", "Trade more"], correctAnswer: 1, explanation: "Pre-commitment forces looking for disconfirming evidence." },
        { question: "Recency bias makes traders:", options: ["Trust old data", "Over-weight last few trades", "Ignore news", "Follow forecasts"], correctAnswer: 1, explanation: "Small recent sample dominates the larger historical one." },
      ],
    },
    {
      slug: "revenge-trading-and-tilt",
      title: "Revenge Trading & Tilt — The #1 Account Killer",
      summary: "Tilt is the emotional state where a trader tries to recover a loss immediately with larger, unplanned trades.",
      readingMinutes: 8,
      body: [
        "## What tilt actually is",
        "Tilt is a poker term borrowed by traders. It describes the state where recent losses trigger an emotional need to 'get it back' — right now, in the next trade. This is the state in which almost every account-ending disaster happens.",
        "## The physiological signal",
        "Tilt has a body signal: elevated heart rate, shallow breathing, tension in the shoulders. Elite traders (and poker players) are trained to notice this signal within seconds. When you feel it, the correct action is always the same: stop trading for the day.",
        "## The revenge trade pattern",
        "Loss → frustration → immediate re-entry at 2-3x normal size → additional loss → panic-sized trade → catastrophic loss. This is the pattern that turns a manageable 2% drawdown into a 40% account wipe over an afternoon.",
        "## Concrete circuit breakers",
        "Professional prop firms enforce daily loss limits that automatically lock a trader out of the platform after a set drawdown. You can replicate this: hard cap of 3% account loss per day; if hit, close the platform. TradeHQ's revenge-trading blocker enforces exactly this pattern on the simulator so you build the habit before real capital is at stake.",
        "## Recovering from a bad day",
        "The rule that saves accounts: no trading for 24 hours after a red day that exceeded your daily loss limit.",
        DISC,
      ],
      keyTakeaways: [
        "Tilt has a physiological signal — learn to recognise it.",
        "Revenge-trading is the #1 way accounts blow up.",
        "Hard daily loss limits save accounts.",
        "24 hours off after a tilted red day.",
      ],
      sources: [
        { label: "TradeHQ — Revenge Trading Blocker", url: "/portfolio" },
        { label: "Investopedia — Emotional Investing", url: "https://www.investopedia.com/terms/e/emotional-investing.asp" },
      ],
      quiz: [
        { question: "Tilt is:", options: ["A strategy", "Emotional state driving reckless trades", "A chart pattern", "A fee"], correctAnswer: 1, explanation: "Post-loss unplanned oversized trading." },
        { question: "Reasonable daily loss limit on $100K:", options: ["$100", "$3,000 (3%)", "$25,000", "None"], correctAnswer: 1, explanation: "2-3% is the industry standard." },
        { question: "After tilted red day, safest action:", options: ["Trade smaller immediately", "Take at least 24 hours off", "Double size", "Switch to options"], correctAnswer: 1, explanation: "24 hours breaks the emotional cycle." },
        { question: "Physiological signals of tilt:", options: ["Calm breathing", "Elevated HR + tension", "Improved focus", "Lower temp"], correctAnswer: 1, explanation: "Sympathetic nervous system activation." },
      ],
    },
    {
      slug: "the-trading-journal",
      title: "The Trading Journal — Turning Data Into Edge",
      summary: "The journal is the single highest-leverage tool a trader has.",
      readingMinutes: 8,
      body: [
        "## Why the journal is non-negotiable",
        "Trading is a game of statistical edge over many trades. Without a journal, you cannot compute your win rate, average winner, average loser, expectancy, or the sub-conditions under which your strategy actually works. You are literally trading blind.",
        "## What to log for every trade",
        "Minimum viable fields: date, ticker, direction, entry, exit, size in dollars, dollar risk (max loss defined at entry), thesis (1 sentence), setup type (e.g. breakout, pullback), and emotion at entry (1-5 scale). Ten fields, 90 seconds per trade.",
        "## The weekly review",
        "Every Sunday, sort trades by setup type. Calculate win rate and expectancy per setup. You'll discover — usually to your shock — that your P&L comes from 2 of your 5 setups, and the other 3 net-lose money. Kill the losing setups. Size up on the winners.",
        "## Ghost journaling",
        "TradeHQ ghost-journals every simulated trade automatically — no discipline required. You get the review value without the friction of manual entry.",
        "## The 100-trade rule",
        "Don't judge a strategy on fewer than 100 trades. Statistical noise dominates below that. A strategy with 55% win rate and 1.5:1 payoff can easily have a 15-trade losing streak without any degradation in edge.",
        DISC,
      ],
      keyTakeaways: [
        "Without a journal you can't compute your edge.",
        "Ten fields, 90 seconds per trade is enough.",
        "Weekly per-setup review reveals real P&L drivers.",
        "Don't judge a strategy on fewer than 100 trades.",
      ],
      sources: [
        { label: "TradeHQ — Ghost Journal", url: "/portfolio" },
        { label: "Investopedia — Expectancy", url: "https://www.investopedia.com/terms/e/expectancy.asp" },
      ],
      quiz: [
        { question: "Minimum sample size for judging a strategy:", options: ["10", "30", "100", "1,000"], correctAnswer: 2, explanation: "Below ~100, noise dominates." },
        { question: "Most useful weekly review action:", options: ["Read news", "Sort by setup + per-setup expectancy", "Add indicators", "Trade more"], correctAnswer: 1, explanation: "Reveals which setups drive P&L." },
        { question: "Minimum viable journal entry has ~", options: ["1 field", "10 fields", "50 fields", "100 fields"], correctAnswer: 1, explanation: "About ten fields hit the sweet spot." },
        { question: "How many consecutive losses can a 55% strategy have without indicating broken edge?", options: ["1-2", "3-5", "10-15", "Never should lose"], correctAnswer: 2, explanation: "15-trade losing streaks are statistically unremarkable." },
      ],
    },
    {
      slug: "discipline-and-daily-rituals",
      title: "Discipline & Daily Rituals — The Professional's Routine",
      summary: "Consistent P&L comes from consistent process.",
      readingMinutes: 8,
      body: [
        "## The pre-market ritual",
        "Professional traders don't wing it. A tight 30-minute pre-market routine typically includes: check overnight news, mark key levels on the day's watchlist (3-5 tickers max), review the economic calendar for the day's macro releases, and set the day's risk budget (dollar max loss).",
        "## The mid-session discipline check",
        "Every hour, one 60-second gut check: Am I following my plan? Have I taken any trade outside my rulebook today? Am I within my risk budget? If all three are green, keep trading. If any is red, close the platform for the day.",
        "## The post-close review",
        "Twenty minutes at the end of each session: log every trade in the journal, tag the setup, note the emotion, and screenshot the chart at entry. Fast enough to sustain daily; deep enough to compound insight weekly.",
        "## The weekly ritual",
        "Every Friday close, calculate the week's per-setup expectancy, note the biggest emotional violation (there always is one), and set the next week's single behavioural goal (e.g. 'no trades in the first 15 minutes').",
        "## Streaks are edge",
        "Every day you follow the process is a rep. TradeHQ's daily challenge and streak system exists specifically to convert intention into habit.",
        DISC,
      ],
      keyTakeaways: [
        "Pre-market: news, levels, calendar, risk budget — 30 minutes.",
        "Hourly 60-second plan/rules/risk check.",
        "Post-close: 20-minute journal + tag + screenshot.",
        "Weekly: per-setup expectancy + one behavioural goal.",
      ],
      sources: [
        { label: "TradeHQ — Daily Challenge", url: "/daily" },
        { label: "Investopedia — Trading Discipline", url: "https://www.investopedia.com/articles/trading/04/031604.asp" },
      ],
      quiz: [
        { question: "Tight pre-market routine typically takes:", options: ["5 min", "30 min", "2 hr", "The whole morning"], correctAnswer: 1, explanation: "About 30 minutes." },
        { question: "Hourly discipline check ~", options: ["10 min", "60 sec", "30 min", "5 min"], correctAnswer: 1, explanation: "60-second gut check." },
        { question: "Most important part of post-close review:", options: ["Watching news", "Logging + tagging + screenshotting each trade", "After-hours trading", "Reading books"], correctAnswer: 1, explanation: "The journal loop compounds insight." },
        { question: "Weekly goals should focus on:", options: ["Profit targets", "One behavioural improvement", "New indicators", "New brokers"], correctAnswer: 1, explanation: "One behavioural goal per week." },
      ],
    },
    {
      slug: "handling-drawdowns",
      title: "Handling Drawdowns — How Pros Stay Sane When It's Ugly",
      summary: "Every trader experiences drawdown. Pros don't self-destruct during it.",
      readingMinutes: 8,
      body: [
        "## Drawdown is math, not failure",
        "A 55% win-rate, 1.5:1 payoff strategy — objectively excellent — will still have 8-15 trade losing streaks that produce 10-15% drawdowns. This is not a broken strategy. It is a mathematically expected feature of trading a positive-expectancy system with variance.",
        "## The size-down protocol",
        "The pro response to a 10% drawdown is not to trade harder. It is to cut position size by 50% until the account recovers by half the drawdown, then step back to normal size. This 'de-leverage' rule single-handedly saves careers.",
        "## The rulebook lock",
        "During drawdown, do NOT introduce new strategies, new indicators, new markets, or new position types. Every one of those changes adds noise to already-noisy P&L. Trade exactly the rulebook you had at the peak, at reduced size, until you climb out.",
        "## The physical toll",
        "Drawdown produces measurable cortisol elevation, sleep disruption, and irritability. Take it seriously: exercise, sleep 8 hours, get outside daily.",
        "## The long game",
        "Careers are measured in decades, not months. Trade sizes that let you recover from any single drawdown. If you can't sleep with the position on, the position is too big.",
        DISC,
      ],
      keyTakeaways: [
        "10-15% drawdowns are mathematically normal on excellent strategies.",
        "Cut size 50% during drawdown; restore only after recovering half.",
        "Never introduce new strategies mid-drawdown.",
        "If you can't sleep with the position on, it's too big.",
      ],
      sources: [
        { label: "Investopedia — Behavioural Finance", url: "https://www.investopedia.com/terms/b/behavioralfinance.asp" },
        { label: "SEC — Risk Management", url: "https://www.sec.gov/reportspubs/investor-publications/investorpubsinwsmgmthtm.html" },
      ],
      quiz: [
        { question: "Excellent strategy (55% WR, 1.5:1) typically experiences:", options: ["No drawdowns", "10-15% as normal variance", "50% as normal", "Only wins"], correctAnswer: 1, explanation: "Mathematically expected." },
        { question: "Correct response to 10% drawdown:", options: ["Trade larger", "Cut size 50% until half-recovered", "Switch strategies", "Add leverage"], correctAnswer: 1, explanation: "De-leverage rule." },
        { question: "Worst thing during drawdown:", options: ["Journal more", "Introduce new strategies", "Take a walk", "Sleep more"], correctAnswer: 1, explanation: "Adds noise, deepens drawdown." },
        { question: "Correct position-sizing test:", options: ["Can I brag?", "Can I sleep with it on?", "Does it fit margin?", "Broker OK with it?"], correctAnswer: 1, explanation: "Sleep is the honest test." },
      ],
    },
  ],
};

export const courseTracks: CourseTrack[] = [optionsTrack, futuresTrack, macroTrack, psychologyTrack];

export function getTrack(slug: string): CourseTrack | undefined {
  return courseTracks.find((t) => t.slug === slug);
}

export function getLesson(
  trackSlug: string,
  lessonSlug: string,
): { track: CourseTrack; lesson: CourseLesson; index: number } | undefined {
  const track = getTrack(trackSlug);
  if (!track) return undefined;
  const index = track.lessons.findIndex((l) => l.slug === lessonSlug);
  if (index < 0) return undefined;
  return { track, lesson: track.lessons[index], index };
}
