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
  /** Concrete capabilities the learner should have at the end of the track. */
  outcomes: string[];
  /** What the learner should already know or have done first. */
  prerequisites: string;
  /** How the lessons build on one another. */
  progression: string;
  /** Honest statement of who this track is not for. */
  notFor: string;
  lessons: CourseLesson[];
}

const DISC =
  "(Educational only — not financial advice. TradeHQ offers $100,000 virtual cash for supported spot instruments. Options contracts, Greeks, futures margin and settlement are conceptual exercises; the simulator does not execute them.)";

const optionsTrack: CourseTrack = {
  slug: "options-trading-fundamentals",
  title: "Options Trading Fundamentals",
  tagline: "Calls, puts, spreads and Greeks — decoded for beginners.",
  description:
    "A structured introduction to listed options — from call contracts and the Greeks to defined-risk spread examples. Work through contract payoffs on paper; TradeHQ's spot simulator does not execute options contracts.",
  hero: optionsHero,
  level: "Intermediate",
  badge: {
    name: "Options Fundamentals Completion",
    description:
      "Awarded after completing every lesson and submitting every quiz in the Options Trading Fundamentals track.",
  },
  outcomes: [
    "Read an option chain and explain what a specific call or put contract obliges each side to do.",
    "Estimate how a position's value changes when price, time or implied volatility moves, using delta, theta and vega rather than intuition.",
    "Build a defined-risk vertical spread and state its maximum loss before placing it.",
    "Recognise why an option can lose money even when the directional call was correct.",
    "Size an options position so that a total loss of premium is a survivable, pre-decided outcome.",
  ],
  prerequisites:
    "You should be comfortable with what a share of stock is, how a market order differs from a limit order, and what a percentage return means. No mathematics beyond arithmetic is required. If you have never placed a simulated trade, spend an hour in the practice terminal first — the options lessons assume you have seen an order ticket.",
  progression:
    "The track moves from object to behaviour to structure. The first lesson defines the contract itself, because almost every later misunderstanding traces back to a fuzzy definition. The Greeks lesson then explains why the contract's price moves the way it does, which is what turns a static definition into something you can reason about. Defined-risk spreads apply that reasoning to combinations where the worst case is known in advance, and the implied-volatility lesson explains the single factor that most often makes a correct directional view unprofitable. The final lesson is risk management, placed last deliberately: rules only make sense once you understand what they are protecting you from.",
  notFor:
    "This is not a track about income strategies, signal services or generating consistent weekly returns. It will not tell you which contracts to buy, and it does not cover selling naked options, which carries loss potential far beyond the premium received. If you are looking for trade recommendations rather than an explanation of how the instrument works, this material will disappoint you.",
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
        "## What you can practise on TradeHQ",
        "TradeHQ supports spot instruments, including shares and ETFs, with $100,000 virtual capital. It does not model option strikes, expirations or premiums. Use this lesson's worked examples to calculate hypothetical contract payoffs on paper; buying an underlying share in the simulator is a different transaction from buying an option on it.",
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
        "## A hypothetical sizing worksheet",
        "For arithmetic practice, suppose a worksheet assigns 1-2% of a hypothetical $100,000 account to a trade's planned loss budget: that is $1,000-$2,000. These percentages are assumptions, not an institutional standard or a recommendation for a real account. Repeated losses reduce equity, and correlated positions can lose together. Costs, execution and assignment can also affect the outcome; the percentage alone does not establish how many trades an account can withstand.",
        "## What can still go wrong",
        "Assignment risk on the short leg near expiration, early exercise on deep-ITM American-style options, and pin risk exactly at strike on expiration Friday. Close spreads a few days before expiration to sidestep all three.",
        DISC,
      ],
      keyTakeaways: [
        "A spread caps both max loss and max gain — you know your worst case before entering.",
        "Bull call spreads are the classic starter directional trade.",
        "Iron condors profit from a stock staying inside a defined range.",
        "State the account balance and chosen risk assumption before calculating a hypothetical loss budget.",
      ],
      sources: [
        { label: "SEC — Options Strategies Bulletin", url: "https://www.sec.gov/investor/pubs/optionsstrategies.pdf" },
        { label: "OCC — Options Industry Council", url: "https://www.optionseducation.org/" },
      ],
      quiz: [
        { question: "Max loss on a bull call spread is:", options: ["Unlimited", "The width of the spread", "The net debit paid", "The strike price"], correctAnswer: 2, explanation: "For a debit spread the max loss is the premium paid." },
        { question: "An iron condor profits most when the stock:", options: ["Rallies sharply", "Crashes sharply", "Stays inside the two short strikes", "Goes to zero"], correctAnswer: 2, explanation: "Iron condors are neutral / range-bound trades." },
        { question: "In the worksheet, 1-2% of a hypothetical $100,000 account equals:", options: ["$50,000", "$25,000", "$1,000-$2,000", "$100"], correctAnswer: 2, explanation: "100,000 × 0.01 to 0.02 = $1,000-$2,000. The percentages are illustrative assumptions, not a universal standard." },
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
        "Implied volatility often rises before earnings and can fall sharply afterwards. A trader can be directionally correct and still lose on a long option if the volatility drop and time decay outweigh the price move.",
        "## A safer earnings play",
        "In a paper worksheet, compare hypothetical long-premium and defined-risk premium-selling structures around earnings to see how direction, implied volatility and the size of the actual move interact. TradeHQ does not price these structures. Avoid treating volatility selling as inherently safer; short premium can carry substantial risk.",
        "## Practice loop",
        "For a historical study, record dated option quotes and implied-volatility observations from an options-data source before and after an earnings announcement. Keep the expiry, strike and data methodology consistent, and record price changes as well as volatility changes. TradeHQ does not supply an options chain or IV-rank data. A small sample can illustrate mechanisms without establishing a reliable trading edge.",
        DISC,
      ],
      keyTakeaways: [
        "IV is the market's forward volatility forecast, not any one trader's prediction.",
        "IV rank contextualises today's IV against the last 12 months.",
        "IV crush after earnings can turn a correct directional bet into a loss.",
        "Elevated implied volatility changes the payoff profile of premium-selling strategies, but higher premiums also reflect higher expected uncertainty and risk.",
      ],
      sources: [
        { label: "CME — Implied Volatility", url: "https://www.cmegroup.com/education/courses/introduction-to-options/measures-of-implied-volatility.html" },
        { label: "Investopedia — IV", url: "https://www.investopedia.com/terms/i/iv.asp" },
      ],
      quiz: [
        { question: "IV rank of 80 means:", options: ["IV is at 80%", "IV is near a 12-month high", "IV is near a 12-month low", "80% of options are profitable"], correctAnswer: 1, explanation: "IV rank normalises IV against the last year on a 0-100 scale." },
        { question: "Why can a long option lose even if the price moves in the expected direction after earnings?", options: ["Because options never follow the underlying", "A drop in implied volatility and time value can offset the directional gain", "Because earnings cancel the contract", "Because all options are illiquid"], correctAnswer: 1, explanation: "Option value depends on more than direction; implied volatility and time value can change sharply after earnings." },
        { question: "What does a high IV rank tell you?", options: ["A premium-selling trade is guaranteed to work", "Current implied volatility is high relative to its own recent range", "The stock must fall", "The next move will be small"], correctAnswer: 1, explanation: "IV rank is context about relative option pricing, not a standalone buy or sell signal." },
        { question: "Implied volatility is:", options: ["Historical vol over 30 days", "An exchange forecast", "The volatility that makes model = market price", "The stock's beta"], correctAnswer: 2, explanation: "IV is the vol input that reconciles a pricing model with the live option price." },
      ],
    },
    {
      slug: "options-risk-management",
      title: "Options Risk Management — Sizing, Rolling & Cutting Losses",
      summary: "Options losses can be amplified by position size, leverage, volatility and time decay. This lesson measures those risks using hypothetical contract examples.",
      readingMinutes: 9,
      body: [
        "## The 1% rule for defined-risk trades",
        "For simulation, choose a small predefined risk budget before entering a position and compare how different limits affect drawdown. For example, 1% of a $100,000 practice account is $1,000. This is an educational parameter, not a universal real-money rule.",
        "## The 3x rule for undefined-risk trades",
        "Naked puts and short strangles can create losses far larger than the premium collected. In a paper worksheet, model adverse moves explicitly and compare the resulting losses with a hypothetical risk budget rather than relying on one fixed multiplier. TradeHQ does not execute these option positions.",
        "## Rolling — extending, not doubling down",
        "Rolling means closing an existing option and opening another with a different expiry and sometimes a different strike. A credit or debit alone does not determine whether the adjustment makes sense; compare the new maximum loss, break-even points, time remaining and total capital at risk in a worked example. Rolling options is not supported by TradeHQ's order engine.",
        "## When to cut a loss",
        "Predefined exits can prevent open-ended decision-making, but no single percentage works for every option structure. In a worksheet with appropriate historical option prices, compare several hypothetical exit rules and record drawdown, average loss and opportunity cost. Account for execution assumptions and costs; TradeHQ's spot simulator cannot perform this options backtest.",
        "## Journaling every trade",
        "For each hypothetical options example, record the thesis, dated volatility inputs, contract size, possible loss, exit assumptions and calculated P&L in a separate worksheet. TradeHQ's journal records supported simulator trades; it does not automatically capture options contracts or IV rank. Reviewing examples may reveal recurring mistakes, but no fixed number of trades establishes a reliable edge.",
        DISC,
      ],
      keyTakeaways: [
        "Use a predefined practice risk budget and record the effect on drawdown.",
        "Model adverse scenarios for structures whose losses can exceed the premium collected.",
        "Evaluate a roll by its full risk profile, not only by whether it creates a credit or debit.",
        "Test predefined exits in simulation rather than treating one threshold as universal.",
      ],
      sources: [
        { label: "FINRA — Options Risk", url: "https://www.finra.org/investors/insights/options" },
        { label: "SEC — Options Trading Alert", url: "https://www.sec.gov/oiea/investor-alerts-bulletins/ia_optionstrading.html" },
      ],
      quiz: [
        { question: "Why define a risk budget before a simulated options trade?", options: ["To guarantee profit", "To control the potential effect of one loss", "To predict volatility", "To avoid all drawdowns"], correctAnswer: 1, explanation: "A predefined risk budget limits how much one trade can affect the practice account; there is no universal percentage that fits every trader or strategy." },
        { question: "What should be compared when evaluating a roll?", options: ["Only whether it creates a credit", "Only the new expiry", "The new risk, break-even points, cost and time remaining", "Nothing — rolling is always better"], correctAnswer: 2, explanation: "A roll changes several dimensions of the position, so the full risk profile matters more than credit versus debit alone." },
        { question: "What is the best way to evaluate an exit rule in TradeHQ?", options: ["Assume one percentage always works", "Test it across a sample and compare drawdown and average loss", "Change the rule after every loss", "Ignore position size"], correctAnswer: 1, explanation: "Testing the same rule across a meaningful sample is more informative than treating one threshold as universally correct." },
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
  badge: { name: "Futures Fundamentals Completion", description: "Awarded after completing every lesson in the Futures & Derivatives track." },
  outcomes: [
    "Explain what a futures contract standardises and who the natural counterparties in a market are.",
    "Calculate the notional value behind a contract and the margin actually required to hold it.",
    "Read a term structure and say whether a market is in contango or backwardation, and what that implies for anyone holding a rolling position.",
    "Describe how a producer or consumer uses futures to hedge a real-world exposure.",
    "Choose an appropriately small contract size when learning, rather than a full-size contract.",
  ],
  prerequisites:
    "Some familiarity with charts and with the idea of buying and selling an asset. The margin lesson involves multiplication and percentages, nothing more. Working through the Trading Psychology track first is recommended, because leverage punishes emotional decisions faster than any other instrument on the site.",
  progression:
    "The sequence starts with contract specifications, then margin and leverage. Term structure follows to explain differences between delivery prices and rolling exposure. Hedging introduces basis risk, and micro contracts illustrate smaller multipliers. No contract size is universally suitable, and losses are not limited to the margin deposit.",
  notFor:
    "This track does not teach day-trading systems, scalping methods or any approach that relies on high leverage to produce results. It does not cover crypto perpetual contracts, which have different funding mechanics. If your interest is in maximising position size on a small account, the honest answer from this material is that the approach has a poor survival rate.",
  lessons: [
    {
      slug: "what-is-a-futures-contract",
      title: "What Is a Futures Contract?",
      summary: "A futures contract is a standardised, exchange-traded agreement to buy or sell a fixed quantity of an asset at a set price on a set future date.",
      readingMinutes: 8,
      body: [
        "## The core definition",
        "A futures contract is a standardised, exchange-traded agreement with a specified underlying asset or reference, contract size and settlement date. Settlement can involve physical delivery or a cash payment under the contract rules. The clearing house acts as central counterparty to cleared trades and uses margin, settlement and default safeguards to manage risk. Clearing reduces counterparty exposure; it does not make default impossible or protect a position from market losses.",
        "## Contract specifications matter",
        "Every futures contract has a spec sheet: contract size, tick size, tick value, trading hours, delivery month, and settlement method (physical or cash). These details determine the exposure and settlement obligations. One E-mini S&P 500 contract represents $50 × the index — with the index at 5,000, a single contract has $250,000 of notional exposure.",
        "## Long and short positions",
        "A participant can open a long futures position by buying or a short position by selling the contract. A short futures position does not require first borrowing the underlying asset as a short stock sale does. Both directions remain subject to margin requirements, broker permissions and applicable exchange rules, including position limits. The contract's settlement obligations still matter; being able to sell first does not mean that trading is unrestricted.",
        "## Speculators and price discovery",
        "Hedgers use futures to offset exposure to price changes in another activity or holding. Speculators accept price exposure in pursuit of a trading profit. For a hypothetical producer, a short futures position may offset some losses from a falling sale price; the hedge can be imperfect if the cash and futures prices move differently. These roles help explain why participants trade. This lesson does not assign a universal percentage of market volume to either group.",
        DISC,
      ],
      keyTakeaways: [
        "A futures contract is a standardised exchange agreement to transact a fixed asset at a future date.",
        "The clearing house manages counterparty risk through safeguards; it does not eliminate all risk.",
        "Both long and short futures positions remain subject to margin, permissions and exchange rules.",
        "Every contract has a spec sheet — always read it.",
      ],
      sources: [
        { label: "CFTC — Futures 101", url: "https://www.cftc.gov/LearnAndProtect/EducationCenter/CFTCBasics/index.htm" },
        { label: "CME — Introduction to Futures", url: "https://www.cmegroup.com/education/courses/introduction-to-futures.html" },
        { label: "CME — Clearing safeguards", url: "https://www.cmegroup.com/solutions/risk-management/financial-safeguards.html" },
        { label: "CME — Position limits overview", url: "https://www.cmegroup.com/education/courses/market-regulation/position-limits/position-limits-overview" },
      ],
      quiz: [
        { question: "The central counterparty on a US futures exchange is:", options: ["The buyer", "The seller", "The exchange's clearing house", "The broker"], correctAnswer: 2, explanation: "The clearing house novates every trade." },
        { question: "Notional value of one E-mini S&P at index 5,000 ≈", options: ["$5,000", "$50,000", "$250,000", "$1,000,000"], correctAnswer: 2, explanation: "$50 × 5,000 = $250,000." },
        { question: "Which statement about opening a short futures position is correct?", options: ["It removes margin requirements", "It is exempt from exchange rules", "It does not require borrowing the underlying asset first", "It guarantees a maximum loss"], correctAnswer: 2, explanation: "Selling a futures contract creates short exposure, subject to margin and applicable trading rules." },
        { question: "A producer uses a short futures position to offset falling sale prices. This is an example of:", options: ["Guaranteed profit", "Eliminating default risk", "Hedging price exposure", "Avoiding all settlement obligations"], correctAnswer: 2, explanation: "The futures position can offset some price exposure, but a hedge need not remove every risk." },
      ],
    },
    {
      slug: "margin-and-leverage-in-futures",
      title: "Margin & Leverage in Futures",
      summary: "Futures margin is a performance bond, not a loan — and it's why one bad trade can wipe out an account overnight.",
      readingMinutes: 8,
      body: [
        "## Margin is not what you think",
        "Stock margin can involve borrowing to purchase shares. Futures margin is collateral, often called a performance bond, rather than a loan to purchase the contract's notional value. It does not cap losses. Exchange requirements vary by contract and market conditions, and brokers can require additional funds. The figures below are a hypothetical worksheet, not current margin requirements.",
        "## Maintenance margin and margin calls",
        "Maintenance margin is the minimum account equity required to maintain a position. It is not a universal percentage of initial margin. A shortfall can require additional funds or a reduction in positions; a broker may liquidate positions under its rules. Requirements can change, and action may occur intraday. Check the contract requirements and broker agreement instead of assuming a fixed deadline or a guaranteed warning.",
        "## Daily mark-to-market",
        "Futures positions are marked to market, with gains and losses settled through variation margin. Daily settlement limits the accumulation of unpaid losses, and clearing arrangements may include intraday settlement. It does not eliminate default or overnight risk: clearing houses also use collateral and other financial safeguards. A hypothetical $2,000 loss reduces the account's funds; the timing of customer-account entries depends on the broker's arrangements.",
        "## Why leverage cuts both ways",
        "For a hypothetical E-mini S&P 500 contract at an index level of 5,000, the $50 multiplier gives $250,000 of notional exposure. A 1% index move is 50 points, or $2,500 per contract before costs. Relative to an assumed $13,000 margin deposit, that is about 19.2%; it is not a percentage of every trader's total account equity. A different index level, contract quantity or account balance changes the calculation.",
        DISC,
      ],
      keyTakeaways: [
        "Futures margin is a performance bond, not a loan.",
        "Accounts are marked-to-market every trading day.",
        "A maintenance shortfall can require more funds, reduced positions or liquidation under broker rules.",
        "Leverage depends on contract exposure and the equity used in the calculation.",
      ],
      sources: [
        { label: "CME — Margin: Know What Is Needed", url: "https://www.cmegroup.com/education/courses/introduction-to-futures/margin-know-what-is-needed" },
        { label: "CME — Financial Safeguards", url: "https://www.cmegroup.com/solutions/risk-management/financial-safeguards.html" },
      ],
      quiz: [
        { question: "Futures margin is best described as:", options: ["A loan", "A performance bond", "A fee", "A tax"], correctAnswer: 1, explanation: "It is collateral supporting the position, not a loan or a cap on losses." },
        { question: "Futures accounts are marked-to-market:", options: ["Yearly", "Monthly", "Every trading day", "Only at expiration"], correctAnswer: 2, explanation: "Daily settlement moves cash in/out." },
        { question: "In the worksheet (index 5,000, $50 multiplier), a 1% move relative to an assumed $13,000 deposit is approximately:", options: ["1%", "5%", "~19%", "50%"], correctAnswer: 2, explanation: "$2,500 on $13,000 ≈ 19%." },
        { question: "A margin call means:", options: ["You made money", "Deposit more or be liquidated", "Exchange closed", "Broker owes interest"], correctAnswer: 1, explanation: "The broker may require additional funds or reduce or liquidate positions under its rules." },
      ],
    },
    {
      slug: "contango-and-backwardation",
      title: "Contango & Backwardation — Term Structure Explained",
      summary: "Compare prices across delivery dates and study carrying costs, supply conditions and the assumptions behind rolling exposure.",
      readingMinutes: 9,
      body: [
        "## Term structure — the futures curve",
        "For any commodity there are typically 6-24 listed futures expirations. Plot each expiration's price on a graph and you get the term structure. When further-dated contracts trade above nearer ones, the curve is in contango. When they trade below, it's in backwardation.",
        "## Why contango happens",
        "Carrying costs such as storage, insurance and financing can contribute to higher prices for later delivery. A simplified example with $4 of carrying costs may illustrate that relationship, but convenience yield, constraints and market conditions also matter; there is no universal $4 premium or default curve.",
        "## Why backwardation happens",
        "Backwardation means later-delivery contracts trade below nearer delivery in the comparison being made. Supply conditions and the value of immediate availability can contribute, but the curve alone does not prove a physical shortage or identify a future price direction.",
        "## The roll yield trap",
        "A fund with futures exposure may replace expiring contracts according to its current published methodology. Rolling can affect performance relative to spot, alongside collateral returns, fees and the price path. A roll is not an automatic cash loss equal to the price gap; inspect the specific fund and observation period.",
        "## Trading implications",
        "The curve records prices for different delivery dates. It is context for an educational comparison, not an automatic top, bottom or squeeze signal and not a direct measurement of commercial hedger positioning.",
        DISC,
      ],
      keyTakeaways: [
        "Contango: later delivery trades above nearer delivery in the comparison; carrying costs can contribute.",
        "Backwardation: later delivery trades below nearer delivery; the curve alone does not establish a shortage.",
        "Futures-fund returns depend on methodology, contract price changes, collateral returns and costs.",
        "The curve shows delivery prices, not the identity or positioning of participants.",
      ],
      sources: [
        { label: "CME — Contango/Backwardation", url: "https://www.cmegroup.com/education/courses/introduction-to-crude-oil/contango-and-backwardation.html" },
        { label: "FRED — WTI", url: "https://fred.stlouisfed.org/series/DCOILWTICO" },
      ],
      quiz: [
        { question: "Further-dated below front month =", options: ["Contango", "Backwardation", "Equilibrium", "Rollover"], correctAnswer: 1, explanation: "Backwardation describes relative delivery prices; it does not by itself prove a shortage." },
        { question: "Which factor can make a futures fund differ from spot performance?", options: ["Guaranteed gains", "Contract selection and rolling methodology", "No costs", "Identical exposure"], correctAnswer: 1, explanation: "Methodology, contract price changes, collateral returns and costs affect fund performance." },
        { question: "Contango is typical for:", options: ["Perishables", "Storable commodities in normal markets", "Only metals", "Only ags"], correctAnswer: 1, explanation: "Storage costs push distant deliveries up." },
        { question: "Which condition can contribute to backwardation, without being proven by the curve alone?", options: ["Quiet market", "Physical shortage", "Delisting", "Low vol"], correctAnswer: 1, explanation: "Hedgers pay for immediate supply." },
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
        "In a hypothetical worksheet, $50 million divided by $250,000 of contract notional gives 200 contracts. That arithmetic assumes one-for-one exposure; actual hedge sizing also depends on portfolio beta, basis risk and contract specifications. It does not guarantee full neutralisation or establish trading volume.",
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
      title: "Micro Futures — Contract Size and Risk",
      summary: "Compare Micro E-mini equity-index contracts with their E-mini counterparts, while checking each product’s specifications and risks.",
      readingMinutes: 7,
      body: [
        "## What micros are",
        "CME's Micro E-mini S&P 500, Nasdaq-100, Dow and Russell 2000 contracts are one-tenth the size of their respective E-mini equity-index contracts. For example, MES has a $5 multiplier per index point, compared with $50 for ES. Do not apply that ratio to every product called micro, including unrelated crypto contracts. Margin requirements must be checked separately with the exchange and broker.",
        "## Smaller contracts still carry risk",
        "A smaller contract allows finer adjustments to notional exposure, but does not establish a trading edge or prevent excessive risk. Ten MES contracts have the same index-point exposure as one ES contract, before differences in costs. Compare the total number of contracts, account equity and potential price movement rather than assuming that a micro label makes a position safe.",
        "## Compare the contract specifications",
        "MES and ES both use a 0.25-index-point minimum price increment. That tick is worth $1.25 for one MES contract and $12.50 for one ES contract. Futures margin and settlement principles apply to both, but fees, liquidity and broker requirements need separate checks. For a hypothetical index level of 5,000, one MES contract represents $25,000 of notional exposure; the margin deposit is not the amount of exposure or a maximum loss.",
        "## On the simulator",
        "TradeHQ's $100,000 practice account supports spot instruments. It does not model futures contracts, initial or maintenance margin, daily settlement, or margin calls. Use a paper worksheet to calculate a hypothetical contract's daily P&L and margin balance; buying a similarly named spot instrument does not reproduce futures mechanics.",
        DISC,
      ],
      keyTakeaways: [
        "The four Micro E-mini equity-index contracts are one-tenth their respective E-mini contract sizes.",
        "Check each contract’s multiplier, tick value, fees, liquidity and margin requirements.",
        "Micros let beginners scale one contract at a time.",
        "TradeHQ offers spot practice; futures margin and settlement remain worksheet exercises.",
      ],
      sources: [
        { label: "CME — Micro E-mini", url: "https://www.cmegroup.com/markets/equities/sp/micro-e-mini-sandp-500.html" },
      ],
      quiz: [
        { question: "A micro E-mini S&P (MES) is what fraction of a standard e-mini?", options: ["1/2", "1/5", "1/10", "1/100"], correctAnswer: 2, explanation: "MES has a $5 multiplier versus $50 for ES; margin requirements are checked separately." },
        { question: "One 0.25-point tick in one MES contract is worth:", options: ["$0.25", "$1.25", "$12.50", "$50"], correctAnswer: 1, explanation: "0.25 points × $5 per point = $1.25 before costs." },
        { question: "Which MES and ES comparison is correct?", options: ["Fees must be identical", "Margin never changes", "MES uses $5 per point; ES uses $50", "MES losses cannot exceed margin"], correctAnswer: 2, explanation: "The multipliers determine index-point exposure; other requirements need separate checks." },
        { question: "At a hypothetical index level of 5,000, one MES contract represents:", options: ["$5,000", "$25,000", "$250,000", "$1,250"], correctAnswer: 1, explanation: "5,000 × $5 = $25,000 of notional exposure, not a margin quote or maximum loss." },
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
  badge: { name: "Macro Reading Completion", description: "Awarded after completing every lesson in the Macro Reading for Traders track." },
  outcomes: [
    "Read a CPI release and identify which component drove the surprise, rather than reacting to the headline number.",
    "Explain how the Fed's policy cycle is set and why the market's expectation matters more than the decision itself.",
    "Interpret the shape of the yield curve and describe what a flattening or inversion has historically signalled.",
    "Connect dollar strength to the behaviour of commodities, emerging markets and large exporters.",
    "Combine several macro signals into one written view instead of trading each release in isolation.",
  ],
  prerequisites:
    "No economics background is assumed. You should know what an interest rate is and be willing to read a data release rather than a summary of it. Each lesson links to the primary source — the statistical agency or the central bank itself — so you can check every figure yourself.",
  progression:
    "Inflation comes first because it is the input that determines policy. The Fed lesson then shows how that input becomes an interest-rate decision, and the yield-curve lesson shows how the bond market prices the entire expected path of those decisions. The dollar lesson adds the international transmission channel, which is where the effect reaches commodities and emerging markets. The final lesson is synthesis: how to hold four signals at once and write a single view you can be wrong about in a measurable way.",
  notFor:
    "This is not a macroeconomic forecasting course and it will not tell you where rates or inflation are going. It does not cover trading around releases with leverage, which is a specialist activity with execution risks that reading cannot prepare you for. If you want a directional call on the economy, no honest course can give you one.",
  lessons: [
    {
      slug: "reading-cpi-and-inflation",
      title: "Reading CPI — The Number That Moves Every Market",
      summary: "CPI is the most-watched macro release on the calendar — the reason every trader sits on the same clock at 8:30 AM ET.",
      readingMinutes: 8,
      body: [
        "## What CPI actually measures",
        "The Consumer Price Index is a monthly Bureau of Labor Statistics survey of prices paid by urban consumers for a basket of goods and services. It has two headline flavours: headline CPI (includes food and energy) and core CPI (excludes them, because they're volatile). Core readings are used to study trends, while the FOMC states its longer-run 2% inflation goal in terms of the annual change in the PCE price index.",
        "## The release mechanics",
        "Check the current BLS release calendar for CPI timing; scheduled releases are generally at 8:30 AM Eastern. Market reactions depend on expectations and other information. No fixed first-minute percentage move or single class of participant is established by this lesson.",
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
        { question: "The Fed's 2% longer-run inflation goal is measured using:", options: ["Headline CPI", "Core CPI", "PCE price index", "PPI"], correctAnswer: 2, explanation: "The FOMC states its 2% longer-run inflation goal in terms of the annual change in the PCE price index." },
        { question: "CPI is released at:", options: ["8:00 AM ET", "8:30 AM ET", "10:00 AM ET", "2:00 PM ET"], correctAnswer: 1, explanation: "8:30 AM Eastern." },
        { question: "Why core over headline?", options: ["Core is higher", "Food/energy too volatile to signal trend", "Headline not reported", "Only economists care"], correctAnswer: 1, explanation: "Stripping volatile components isolates trend." },
        { question: "Initial market impulse to CPI driven by:", options: ["Retail", "Algorithmic reactions to surprise", "Fed statements", "Treasury"], correctAnswer: 1, explanation: "Algos react in microseconds." },
      ],
    },
    {
      slug: "the-fed-and-fomc-cycle",
      title: "The Fed & FOMC Cycle — How Rates Get Set",
      summary: "The FOMC has eight regularly scheduled meetings a year, and its decisions can affect market expectations.",
      readingMinutes: 9,
      body: [
        "## The mandate",
        "The Federal Reserve conducts monetary policy under statutory goals that include maximum employment and stable prices. The FOMC states a 2% longer-run inflation goal measured by the annual change in the PCE price index and considers a wide range of economic information when making decisions.",
        "## The eight-meeting cycle",
        "The Federal Open Market Committee (FOMC) schedules eight regular meetings a year and can hold additional meetings when needed. A policy statement follows each regular meeting, and the Chair holds a press briefing after each meeting. Economic projections are discussed four times a year.",
        "## Market pricing of Fed decisions",
        "The CME FedWatch Tool converts federal-funds futures prices into implied probabilities for possible policy outcomes. Those probabilities describe market pricing, not certainty. Market reactions depend on the decision, accompanying statement, economic outlook and what participants had already expected.",
        "## Reading the statement vs the presser",
        "The policy statement records the Committee's decision and assessment. The post-meeting press conference can add context beyond the statement and projections, so market participants may react to both the written release and the Chair's answers.",
        "## Trading the Fed",
        "For an educational exercise, observe how prices react around the statement and press conference rather than assuming the first move is predictable. Short-term reactions can change as participants process new information.",
        DISC,
      ],
      keyTakeaways: [
        "The Fed pursues its statutory employment and price-stability goals; the FOMC states a 2% longer-run PCE inflation goal.",
        "FOMC schedules 8 regular meetings a year; economic projections are discussed four times a year.",
        "CME FedWatch shows futures-implied probabilities, not certain outcomes.",
        "The press conference can add information beyond the written statement.",
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
      summary: "Yield-curve inversion has historically been associated with elevated US recession risk, but timing varies and the signal is not a standalone forecast.",
      readingMinutes: 8,
      body: [
        "## What the yield curve is",
        "The yield curve plots the yield on US Treasury securities across maturities — from 3 months out to 30 years. In normal times it's upward-sloping: you get paid more for lending longer. When short-term yields exceed long-term yields, the curve is inverted.",
        "## Why inversion signals recession",
        "An inverted curve can reflect expectations for slower growth, lower future policy rates, or changing term premia. Historically, commonly watched Treasury-curve inversions have often preceded US recessions, but the lead time varies and the relationship is not a deterministic forecast.",
        "## The 10Y-2Y vs 10Y-3M",
        "The New York Fed's preferred recession-probability model uses the 10-year minus 3-month spread. The 10Y-2Y is the more commonly quoted spread in financial media. Both have strong historical track records, though they invert at slightly different times.",
        "## Trading around the curve",
        "The curve is a slow-moving macro indicator. Treat it as one piece of economic context rather than as an intraday timing tool or an automatic instruction to change a portfolio.",
        DISC,
      ],
      keyTakeaways: [
        "The yield curve is normally upward-sloping.",
        "Inversions have historically been associated with elevated recession risk, with timing that varies across cycles.",
        "10Y-3M is the NY Fed's preferred spread.",
        "Use the curve as one macro indicator alongside other evidence.",
      ],
      sources: [
        { label: "NY Fed — Yield Curve Recession Probability", url: "https://www.newyorkfed.org/research/capital_markets/ycfaq" },
        { label: "FRED — T10Y2Y", url: "https://fred.stlouisfed.org/series/T10Y2Y" },
      ],
      quiz: [
        { question: "Inverted curve =", options: ["Short < long", "Short > long", "Flat", "Negative yields"], correctAnswer: 1, explanation: "Short-term exceeds long-term." },
        { question: "NY Fed's preferred recession spread:", options: ["10Y-2Y", "10Y-3M", "30Y-5Y", "2Y-Fed Funds"], correctAnswer: 1, explanation: "10Y-3M used in official model." },
        { question: "What is the safest interpretation of a yield-curve inversion?", options: ["It guarantees a recession", "It is one historical recession-risk indicator with uncertain timing", "It predicts the exact market bottom", "It only matters for day traders"], correctAnswer: 1, explanation: "Yield-curve inversion is informative context, but it is not a guaranteed or precisely timed forecast." },
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
        "FRED provides economic time series and links to their sources and releases. Start a practice dashboard by selecting a few series relevant to a specific question, then record each series' units, frequency, observation date and release date. Check revisions and definitions before comparing values. A dashboard is an aid to study; no measured percentage of useful information or advantage over other traders is established here.",
        "## The weekly ritual",
        "Every Sunday, log the week's readings: DXY level, 10Y yield, 10Y-2Y spread, VIX, WTI crude, gold, S&P 500. Note which quadrant we're in. Compare to last week. You'll build regime intuition faster than reading any single article.",
        "## Don't over-trade macro",
        "Macro regimes shift over weeks and months, not minutes. Use the framework for position sizing and asset allocation, not for entry timing.",
        DISC,
      ],
      keyTakeaways: [
        "Growth × inflation defines four macro regimes.",
        "Record the source, units and dates of each economic series; check revisions before comparisons.",
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
        { question: "Which resource is the St. Louis Fed’s economic-data database?", options: ["Bloomberg", "Reuters Eikon", "FRED", "Cap IQ"], correctAnswer: 2, explanation: "St Louis Fed's free database." },
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
  badge: { name: "Trading Psychology Completion", description: "Awarded after completing every lesson in the Trading Psychology Mastery track." },
  outcomes: [
    "Name the specific biases most likely to affect your own decisions, with an example from your own trade log.",
    "Recognise the physical and behavioural signs of tilt early enough to stop trading.",
    "Keep a trade journal that records reasoning before the outcome is known, which is the only version that is useful.",
    "Follow a written pre-market and post-market routine that does not depend on motivation.",
    "Distinguish between a losing trade that followed the plan and a winning trade that broke it.",
  ],
  prerequisites:
    "None. This is the recommended starting track for anyone new, and the most useful one to revisit after a losing streak. Having a handful of practice trades already logged makes the exercises concrete, but you can start with an empty journal.",
  progression:
    "The track begins with biases because you cannot correct a pattern you cannot name. Tilt and revenge trading follow, since those are the acute failures that turn a manageable drawdown into a serious one. The journal lesson then supplies the instrument for observing both, and the final lesson turns those observations into daily rituals — the point where the material stops being knowledge and becomes behaviour.",
  notFor:
    "This track does not address clinical mental health, gambling addiction or financial distress, and it is not a substitute for professional support. If trading is causing you real financial or psychological harm, please speak to a qualified professional rather than reading another lesson on discipline.",
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
      title: "Revenge Trading & Tilt — Recognising Unplanned Decisions",
      summary: "Tilt is the emotional state where a trader tries to recover a loss immediately with larger, unplanned trades.",
      readingMinutes: 8,
      body: [
        "## What tilt actually is",
        "Tilt describes an emotional reaction to recent outcomes that can pull decisions away from a plan. After a loss, a trader may feel pressure to recover it immediately. That is a prompt for reflection, not evidence that the next trade will win or lose. This lesson uses hypothetical situations and does not rank the causes of account losses.",
        "## Notice the urge to change the plan",
        "A useful practice question is whether the next decision follows the original plan or is mainly a response to the last result. Write down any urge to increase size, re-enter immediately or abandon the original rationale. These observations are personal journal notes, not a diagnosis or a reliable prediction of performance.",
        "## The revenge trade pattern",
        "A hypothetical sequence is loss, frustration, an unplanned increase in position size and another loss. The eventual drawdown depends on the positions and price changes; no particular percentage follows automatically from that sequence. In a practice journal, compare the intended position size with the size actually submitted.",
        "## Concrete circuit breakers",
        "A practice plan can include a chosen daily loss threshold and a pause to review decisions. For arithmetic only, 3% of a hypothetical $100,000 starting balance is $3,000; this is not an industry standard. TradeHQ does not enforce a 3% daily-loss lockout. Its desktop and mobile order panels can show a five-second pause when a proposed trade exceeds 10% of the account balance used by the panel within five minutes of a locally recorded loss. After the pause, the user can proceed or cancel. This is a limited prompt, not a guarantee against further losses.",
        "## Recovering from a bad day",
        "For a practice exercise, pause after an unplanned decision and record what changed, why it changed and what you would review before another trade. A plan may specify a break, but no fixed 24-hour interval guarantees emotional recovery or prevents future losses.",
        DISC,
      ],
      keyTakeaways: [
        "Use journal notes to distinguish a planned decision from a reaction to a recent outcome.",
        "An unplanned increase in size changes exposure; this lesson does not rank causes of trading losses.",
        "Any percentage threshold needs explicit assumptions; it cannot guarantee a maximum realised loss.",
        "TradeHQ’s cooldown permits proceeding after five seconds; it is not a daily-loss lockout.",
      ],
      sources: [
        { label: "TradeHQ — Revenge Trading Blocker", url: "/portfolio" },
        { label: "Investopedia — Emotional Investing", url: "https://www.investopedia.com/terms/e/emotional-investing.asp" },
      ],
      quiz: [
        { question: "Tilt is:", options: ["A strategy", "Emotional state driving reckless trades", "A chart pattern", "A fee"], correctAnswer: 1, explanation: "Post-loss unplanned oversized trading." },
        { question: "In the hypothetical worksheet, 3% of $100,000 is:", options: ["$100", "$3,000", "$25,000", "$30,000"], correctAnswer: 1, explanation: "100,000 × 0.03 = $3,000. This is arithmetic, not an industry-standard limit." },
        { question: "What does TradeHQ’s cooldown allow after five seconds?", options: ["Guaranteed recovery", "Proceeding with or cancelling the trade", "Automatic account reset", "A mandatory 24-hour lockout"], correctAnswer: 1, explanation: "The prompt allows a choice after the pause; it does not enforce a daily drawdown limit." },
        { question: "Which journal entry helps review a changed decision?", options: ["Only the final price", "The intended size, actual size and reason for changing it", "A guaranteed profit target", "Another trader’s ranking"], correctAnswer: 1, explanation: "Recording the original plan and the change makes the decision reviewable." },
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
        "Example journal fields: date, ticker, direction, entry, exit, position size, planned loss assumption, reason for the exercise, setup label and emotion at entry. A planned exit does not guarantee a maximum loss. These ten fields are a suggested worksheet structure, not a required count or a timed performance standard.",
        "## The weekly review",
        "During a review, group recorded trades by the rule used and compare realized results after costs. Some groups may have different outcomes, but a small or selected sample can mislead. Record exceptions and unfavorable results before changing the rules; a better recent average does not establish that larger future positions are justified.",
        "## Ghost journaling",
        "TradeHQ records simulated fills in trade history. Your reasoning, assumptions and review notes still need to be entered by you; an automatic fill record does not document why a decision was made.",
        "## Sample size and uncertainty",
        "A larger sample can reduce noise, but there is no universal trade count that proves an edge. Under a simple independent model with a 55% win probability over 100 trades, the chance of at least one 10-loss run is about 1.7%, while a 15-loss run is about 0.03%; real trades may not be independent or identically distributed.",
        DISC,
      ],
      keyTakeaways: [
        "Without a journal you can't compute your edge.",
        "The ten-field journal is an example structure; useful detail depends on the exercise.",
        "Weekly per-setup review reveals real P&L drivers.",
        "There is no universal trade count that establishes a reliable edge.",
      ],
      sources: [
        { label: "TradeHQ — Ghost Journal", url: "/portfolio" },
        { label: "Investopedia — Expectancy", url: "https://www.investopedia.com/terms/e/expectancy.asp" },
      ],
      quiz: [
        { question: "What does a sample of 100 trades establish by itself?", options: ["A guaranteed edge", "Nothing conclusive without considering selection, costs and dependence", "A universal maximum drawdown", "Future profitability"], correctAnswer: 1, explanation: "A trade count alone does not establish reliability; the sample and assumptions matter." },
        { question: "Most useful weekly review action:", options: ["Read news", "Sort by setup + per-setup expectancy", "Add indicators", "Trade more"], correctAnswer: 1, explanation: "Reveals which setups drive P&L." },
        { question: "How many fields are in this lesson's example journal worksheet?", options: ["1 field", "10 fields", "50 fields", "100 fields"], correctAnswer: 1, explanation: "The example uses ten fields; this is a teaching choice, not a universal requirement." },
        { question: "Under an independent 55%-win model over 100 trades, the chance of at least one 15-loss run is closest to:", options: ["0.03%", "3%", "15%", "55%"], correctAnswer: 0, explanation: "The probability is about 0.030% under that specific independent-trade model. Real trading outcomes need not satisfy those assumptions." },
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
        "Win rate and payoff ratio alone do not determine drawdown; position risk and dependence between trades also matter. Under a simple independent 55%-win model over 100 trades, an 8-loss run occurs at least once about 8.4% of the time, while a 15-loss run is about 0.03%. Translate any losing run into drawdown only after stating the risk-per-trade model.",
        "## The size-down protocol",
        "There is no universal drawdown percentage that dictates one correct response. In a simulation, define in advance how position size or participation would change after a drawdown, then evaluate that rule separately instead of presenting a 10%/50% threshold as a law.",
        "## The rulebook lock",
        "Changing a strategy during a drawdown can make it harder to tell whether later results came from the original method or the change. In a simulation, record any change as a separate test so the two periods are not mixed together.",
        "## The physical toll",
        "Drawdown produces measurable cortisol elevation, sleep disruption, and irritability. Take it seriously: exercise, sleep 8 hours, get outside daily.",
        "## The long game",
        "A drawdown should be interpreted using the assumptions of the simulation: position size, sequence of outcomes, costs and dependence between trades all affect the result. No single percentage or personal feeling is a universal position-sizing test.",
        DISC,
      ],
      keyTakeaways: [
        "Win rate and payoff ratio alone do not determine drawdown.",
        "A fixed drawdown threshold does not imply one universally correct size change.",
        "Separate strategy changes from the original test so results remain interpretable.",
        "Position size and outcome dependence must be stated before translating losing runs into drawdown.",
      ],
      sources: [
        { label: "Investopedia — Behavioural Finance", url: "https://www.investopedia.com/terms/b/behavioralfinance.asp" },
        { label: "SEC — Risk Management", url: "https://www.sec.gov/reportspubs/investor-publications/investorpubsinwsmgmthtm.html" },
      ],
      quiz: [
        { question: "Why can't win rate and payoff ratio alone determine drawdown?", options: ["Drawdown is random noise only", "Position size and dependence between trades also matter", "Drawdown only depends on fees", "They always determine it exactly"], correctAnswer: 1, explanation: "Position risk and the sequence/dependence of outcomes affect drawdown." },
        { question: "What should a simulation do with a drawdown rule?", options: ["Treat one percentage as universal", "Define the rule and its assumptions before evaluating it", "Change the rule after every loss", "Ignore position size"], correctAnswer: 1, explanation: "A rule can be tested only when its assumptions are stated consistently." },
        { question: "Why record a strategy change as a separate test?", options: ["To make the chart longer", "To avoid mixing results from different methods", "To guarantee recovery", "To increase the win rate"], correctAnswer: 1, explanation: "Separating tests makes the results easier to interpret." },
        { question: "What must be stated before converting a losing run into drawdown?", options: ["Only the ticker", "The position-risk model and relevant assumptions", "The trader's age", "The screen size"], correctAnswer: 1, explanation: "Drawdown depends on how much is exposed and on the outcome assumptions." },
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
