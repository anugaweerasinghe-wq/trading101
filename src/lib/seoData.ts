// Programmatic SEO content library — curated, unique copy per page.
// Keeps all content static (no runtime LLM cost) so it ships free + fast.

export interface ComparePair {
  slug: string;        // e.g. "bitcoin-vs-ethereum"
  a: { symbol: string; name: string; tag: string };
  b: { symbol: string; name: string; tag: string };
  intro: string;       // 2-3 sentences, unique per pair
  verdict: string;     // who wins, when
  bullets: string[];   // 4 differentiators
  deepDive: string[];  // 2 long-form paragraphs, unique per pair
  mistakes: string[];  // 3 concrete errors people make with this comparison
}

export const COMPARE_PAIRS: ComparePair[] = [
  {
    slug: "bitcoin-vs-ethereum",
    a: { symbol: "BTC", name: "Bitcoin", tag: "Scarce digital asset" },
    b: { symbol: "ETH", name: "Ethereum", tag: "Smart-contract network" },
    intro: "Bitcoin and Ethereum are both crypto assets, but their networks are designed for different purposes. This comparison focuses on structure, network use and risk rather than declaring one the better investment.",
    verdict: "Bitcoin emphasizes a fixed issuance schedule and monetary use cases; Ethereum emphasizes programmable applications and smart-contract execution. Their market behavior can still be highly correlated, so owning both does not automatically create broad diversification.",
    bullets: [
      "Supply model: Bitcoin has a fixed maximum supply; Ethereum issuance and burn depend on protocol rules and network activity.",
      "Network role: Bitcoin centers on transfer and settlement; Ethereum supports general-purpose smart contracts and applications.",
      "Staking: Ethereum supports protocol staking; Bitcoin does not have native protocol staking.",
      "Risk: both remain volatile crypto assets and can respond to shared liquidity and market-sentiment shocks.",
    ],
    deepDive: [
      "Bitcoin is designed around a deliberately constrained monetary system with a fixed issuance schedule. Ethereum is designed as a programmable execution layer where applications can create transactions, contracts and tokens. That architectural distinction is more durable than short-term price statistics.",
      "For simulation, compare how both react during the same market periods and record correlation, drawdown and volatility. Do not assume that two different crypto networks automatically behave like independent asset classes.",
    ],
    mistakes: [
      "Treating different network purposes as proof that prices will move independently.",
      "Comparing token price per unit instead of supply, network structure and market capitalization.",
      "Treating staking rewards as risk-free yield without considering protocol, validator and token-price risk.",
    ],
  },
  {
    slug: "tesla-vs-nvidia",
    a: { symbol: "TSLA", name: "Tesla", tag: "Automotive, energy and software" },
    b: { symbol: "NVDA", name: "Nvidia", tag: "Semiconductors and accelerated computing" },
    intro: "Tesla and Nvidia are both growth-sensitive companies, but their businesses, customers and revenue drivers are different. The useful comparison is business exposure, not a winner call.",
    verdict: "Tesla is exposed to vehicle demand, manufacturing, energy and software execution. Nvidia is exposed to semiconductor demand, data-center spending, product cycles and customer concentration.",
    bullets: [
      "Customers: Tesla primarily sells products and services into consumer and commercial markets; Nvidia primarily sells computing platforms and chips into enterprise and technology markets.",
      "Capital cycle: vehicle manufacturing and semiconductor/data-center investment have different capacity and demand cycles.",
      "Company-specific risk: both can move sharply around earnings, guidance and execution updates.",
      "Valuation sensitivity: expectations can matter as much as reported growth for either stock.",
    ],
    deepDive: [
      "Tesla's results depend on manufacturing scale, deliveries, pricing, energy products and software execution. Nvidia's results depend on semiconductor product cycles, data-center demand, software ecosystems and customer spending. Those drivers can diverge even when both stocks are grouped under a broad technology or AI narrative.",
      "A simulator can compare the two under identical virtual position-size assumptions and record how company-specific news, market-wide risk moves and earnings periods affected each. That is more useful than assuming one is the superior exposure.",
    ],
    mistakes: [
      "Treating both as the same 'AI trade' without separating their business models.",
      "Using one quarter's growth rate as a permanent forecast.",
      "Assuming large companies cannot experience large drawdowns.",
    ],
  },
  {
    slug: "bitcoin-vs-gold",
    a: { symbol: "BTC", name: "Bitcoin", tag: "Digital asset" },
    b: { symbol: "GLD", name: "Gold", tag: "Gold-market exposure" },
    intro: "Bitcoin and gold are sometimes discussed together because both can be framed around scarcity, but their history, market structure, custody and volatility are very different.",
    verdict: "Gold has a long history as a monetary and portfolio asset with physical custody and established derivatives markets. Bitcoin is digitally native, trades continuously and has a much shorter historical record.",
    bullets: [
      "History: gold has centuries of monetary use; Bitcoin has a much shorter market history.",
      "Custody: gold involves physical or financial custody; Bitcoin involves digital-key or platform custody.",
      "Trading structure: Bitcoin trades continuously; gold exposure trades through several spot, fund and derivatives venues.",
      "Volatility: their realized volatility can differ substantially and changes over time.",
    ],
    deepDive: [
      "Gold and Bitcoin can respond differently to liquidity shocks, currency moves and risk sentiment. Neither should be assumed to provide the same hedge behavior in every period.",
      "For simulation, compare equal-dollar and equal-risk hypothetical allocations and record how the results differ. The exercise is about understanding market structure and volatility, not recommending either asset.",
    ],
    mistakes: [
      "Assuming a scarcity narrative guarantees the same market behavior.",
      "Ignoring custody and product structure when comparing exposure.",
      "Using one historical crisis or inflation period as proof of permanent hedge behavior.",
    ],
  },
  {
    slug: "apple-vs-microsoft",
    a: { symbol: "AAPL", name: "Apple", tag: "Consumer hardware and services" },
    b: { symbol: "MSFT", name: "Microsoft", tag: "Enterprise software and cloud" },
    intro: "Apple and Microsoft are both large technology companies, but their revenue mixes and customer relationships differ. Compare business drivers rather than treating market size as proof that they carry the same risks.",
    verdict: "Apple is more directly tied to consumer devices and its services ecosystem; Microsoft is more directly tied to enterprise software, cloud infrastructure and business subscriptions.",
    bullets: [
      "Customer mix: Apple has large consumer exposure; Microsoft has large enterprise exposure.",
      "Revenue structure: both combine recurring and transactional revenue, but the mix differs.",
      "Capital allocation: both return capital and reinvest, with policies that can change over time.",
      "Regulatory risk: both operate in markets subject to competition, platform and technology regulation.",
    ],
    deepDive: [
      "Apple's economics depend on device demand, installed-base engagement and services. Microsoft's economics depend on enterprise software, cloud consumption and business technology spending. Those differences can cause earnings and guidance to respond to different economic conditions.",
      "A simulation comparison should track the same dates and the same virtual-risk assumption so differences in company behavior are visible without turning the exercise into a recommendation.",
    ],
    mistakes: [
      "Assuming mega-cap size means low volatility.",
      "Comparing only headline valuation multiples without understanding business mix.",
      "Ignoring concentration already present through broad market indexes.",
    ],
  },
  {
    slug: "ethereum-vs-solana",
    a: { symbol: "ETH", name: "Ethereum", tag: "Layer-1 plus rollup ecosystem" },
    b: { symbol: "SOL", name: "Solana", tag: "High-throughput layer-1" },
    intro: "Ethereum and Solana are smart-contract networks with different scaling and execution designs. This comparison focuses on architecture and operational trade-offs rather than price targets.",
    verdict: "Ethereum uses a base layer plus rollups for much of its scaling; Solana emphasizes high throughput on a single integrated chain. Each design creates different trade-offs in fees, infrastructure and application experience.",
    bullets: [
      "Scaling design: Ethereum relies heavily on layer-2 systems; Solana emphasizes integrated layer-1 throughput.",
      "Fees and throughput: both vary with network demand, software upgrades and application activity.",
      "Staking: both use proof-of-stake systems, but reward rates and token issuance can change.",
      "Operational risk: network reliability, validator economics and software complexity matter for both.",
    ],
    deepDive: [
      "Ethereum and Solana make different engineering trade-offs around execution, validator requirements and application scaling. Those differences affect user experience and network economics, but do not directly determine token returns.",
      "In simulation, compare market behavior and volatility separately from network technology. A technically strong period for a network does not guarantee a particular token-price outcome.",
    ],
    mistakes: [
      "Using a single throughput number as a complete measure of network quality.",
      "Comparing nominal staking rates without considering issuance and token-price risk.",
      "Assuming a technology advantage translates mechanically into investment returns.",
    ],
  },
  {
    slug: "stocks-vs-crypto",
    a: { symbol: "SPY", name: "Stocks (S&P 500)", tag: "Equity-market exposure" },
    b: { symbol: "BTC", name: "Crypto (Bitcoin)", tag: "Digital asset" },
    intro: "Broad equity exposure and Bitcoin represent different legal and economic claims. This comparison explains those structural differences without prescribing an allocation.",
    verdict: "Equities represent ownership claims on operating businesses; Bitcoin is a digital asset whose value depends on network use, scarcity, market structure and demand. Their risk and disclosure frameworks are different.",
    bullets: [
      "Economic claim: equities can represent claims on company earnings and assets; Bitcoin does not represent ownership of a company.",
      "Disclosure: public companies operate under securities-disclosure regimes; crypto disclosure and investor protections differ by venue and jurisdiction.",
      "Trading hours: crypto markets operate continuously; equity markets use exchange sessions plus limited extended hours.",
      "Risk: both can experience large drawdowns, but their historical volatility and market structure differ.",
    ],
    deepDive: [
      "A diversified equity index spreads exposure across many companies, while Bitcoin is a single digital asset. That does not make either automatically suitable or unsuitable; it means the sources of return and risk are different.",
      "Use the simulator to compare concentration, volatility and drawdown under multiple hypothetical allocation weights. Do not infer a real-money allocation from a short simulation sample.",
    ],
    mistakes: [
      "Treating a single crypto asset as equivalent to a diversified equity index.",
      "Using one year of returns to decide which structure is 'better'.",
      "Ignoring differences in disclosure, custody, trading hours and market structure.",
    ],
  },
  {
    slug: "nvidia-vs-amd",
    a: { symbol: "NVDA", name: "Nvidia", tag: "Accelerated computing" },
    b: { symbol: "AMD", name: "AMD", tag: "CPUs and accelerators" },
    intro: "Nvidia and AMD compete in overlapping semiconductor markets but differ in software ecosystems, product mix and customer exposure. The comparison should be about business structure rather than which stock will outperform.",
    verdict: "Nvidia has a larger established accelerator software ecosystem; AMD competes across CPUs and accelerators with a different product mix. Market share and pricing can change over time.",
    bullets: [
      "Software: developer ecosystems and tooling affect switching costs as well as hardware performance.",
      "Product mix: both sell computing products, but their revenue exposure across CPUs, GPUs and data-center products differs.",
      "Demand cycle: both are exposed to semiconductor and data-center spending cycles.",
      "Execution risk: product launches, supply, pricing and customer adoption can change quickly.",
    ],
    deepDive: [
      "Semiconductor competition is not decided by one benchmark. Software support, availability, customer contracts, power efficiency, supply and total cost all affect adoption.",
      "For simulation, compare both stocks over the same dates and record how earnings, product announcements and market-wide technology moves affected each without assuming one path will repeat.",
    ],
    mistakes: [
      "Treating a single benchmark as a complete market-share forecast.",
      "Assuming the two stocks hedge each other because they compete.",
      "Extrapolating one quarter's growth indefinitely.",
    ],
  },
  {
    slug: "forex-vs-stocks",
    a: { symbol: "FX", name: "Forex", tag: "Currency markets" },
    b: { symbol: "Stocks", name: "Equities", tag: "Company ownership" },
    intro: "Currencies and equities represent fundamentally different exposures. Currency pairs price one currency relative to another, while shares represent ownership in operating companies.",
    verdict: "Forex analysis often focuses on interest-rate, growth and policy differentials between economies; equity analysis often focuses on company earnings, balance sheets, industry conditions and valuation.",
    bullets: [
      "Economic claim: a currency pair is a relative price; a share is an ownership claim in a company.",
      "Market structure: forex is largely over-the-counter, while listed equities trade through exchanges and related venues.",
      "Leverage: retail leverage rules differ by jurisdiction, broker and product and should not be treated as one global number.",
      "Drivers: macroeconomic policy can dominate currencies, while company-specific results can dominate individual stocks.",
    ],
    deepDive: [
      "A currency pair can move because expectations change for either economy in the quote. An individual stock can move because of company-specific results even when the broader economy is stable. Those differences require different analytical questions.",
      "In simulation, compare volatility, holding-period behavior and sensitivity to scheduled events. Do not use a short practice sample to decide that one market is personally suitable for real-money trading.",
    ],
    mistakes: [
      "Treating broker-offered leverage as a recommended position size.",
      "Assuming every currency pair behaves the same around economic releases.",
      "Expecting company-style long-term earnings compounding from a currency pair.",
    ],
  },
];

// ============================================================================
// "How to trade X" pages — beginner long-tail intent
// ============================================================================
export interface HowToAsset {
  symbol: string;       // lowercase slug, e.g. "btc"
  name: string;
  fullName: string;
  type: "crypto" | "stock" | "etf" | "forex" | "commodity";
  whyTrade: string;
  steps: string[];      // 5 steps
  beginnerTip: string;
  risk: string;
  studentNote: string;  // localized for SL audience
  drivers: string[];        // what actually moves this asset
  firstTrade: string;       // a concrete first practice trade with sizing
  timing: string;           // sessions / liquidity / when to avoid
  mistakes: string[];       // instrument-specific beginner mistakes
  review: string;           // how to review the trade afterwards
}

export const HOWTO_ASSETS: HowToAsset[] = [
  {
    symbol: "btc",
    name: "BTC",
    fullName: "Bitcoin",
    type: "crypto",
    whyTrade: "Bitcoin trades 24/7, has the deepest crypto liquidity, and reacts strongly to macro liquidity shifts — perfect for learning volatility on a practice account.",
    steps: [
      "Open TradeHQ's free $100K practice account — no signup required.",
      "Navigate to /trade/btc to see the live BTC chart and order panel.",
      "Start with a small simulated position (1-2% of practice capital) to learn order flow.",
      "If you use an exit rule in simulation, define it before entry and record how it affects drawdown and average loss.",
      "Journal every entry, exit and reason — the Ghost Journal does this automatically.",
    ],
    beginnerTip: "Use the 1-hour chart with RSI(14) and the 20/50 EMA. Most rookies blow accounts by trading 1-minute candles.",
    risk: "BTC can move 5-10% in a day. On real money that obliterates undersized accounts. Practice sizing here first.",
    studentNote: "For Sri Lankan students: even when LKR is volatile, treat BTC as an educational asset, not a savings plan. Master discipline first, capital second.",
    drivers: [
      "Global liquidity and real interest rates. Bitcoin has behaved like a long-duration risk asset since 2020: when rate-cut expectations rise, it tends to firm; when yields spike, it tends to lead the sell-off.",
      "Spot ETF and large-holder flow. Sustained creations or redemptions in the listed spot products change the marginal buyer, which is why price can drift on days with no crypto-specific news.",
      "Leverage in the derivatives market. Funding rates and open interest tell you how crowded one side is; the fastest moves are usually liquidation cascades rather than fresh conviction.",
      "The halving supply schedule, which matters over years rather than weeks — treat it as context, not as a trade trigger.",
    ],
    firstTrade:
      "A sane first practice trade: risk 1% of the $100,000 practice account, which is $1,000. Mark the most recent clear swing low on the 4-hour chart, place your stop just under it, and measure the distance from your intended entry to that stop as a percentage. If the stop is 4% away, your position is $1,000 / 0.04 = $25,000 of BTC — not the $50,000 that 'half the account' feels like. Doing this arithmetic before every entry is the single habit that separates traders who survive from traders who reload.",
    timing:
      "Bitcoin trades continuously, but liquidity is not constant. The deepest books are during US equity hours, and the thinnest are weekend nights, when a modest order can move price further than it would on a Tuesday afternoon. Beginners who trade the weekend often conclude they are bad at analysis when they are actually being punished by spread and slippage. Note also that BTC now reacts to scheduled US macro releases — CPI and FOMC days produce equity-like spikes in a market that never closes.",
    mistakes: [
      "Sizing in dollars rather than in risk. A $10,000 BTC position and a $10,000 bond-ETF position are not comparable exposures.",
      "Using round numbers as stops. $100,000 and similar levels are where the most stops sit, which is exactly why price is drawn through them before reversing.",
      "Trading the 1-minute chart. Bitcoin's noise on that timeframe exceeds most beginners' edge, and fees plus spread compound the damage.",
      "Treating a drawdown as an opportunity to average down without a predefined maximum position size.",
    ],
    review:
      "After the position closes, open the portfolio analytics and answer three questions in writing: was the entry the one you planned or one you chased, did you honour the stop you set before entering, and would the outcome have been the same with half the size. Over twenty logged trades those answers form a pattern that no article can give you, and the Ghost Journal records the entries automatically so the record is honest rather than remembered.",
  },
  {
    symbol: "eth",
    name: "ETH",
    fullName: "Ethereum",
    type: "crypto",
    whyTrade: "Ethereum captures DeFi, L2 and staking narratives. It's the second-deepest crypto market and a cleaner trade for tech-driven setups than alt-coins.",
    steps: [
      "Launch your free TradeHQ practice account.",
      "Open /trade/eth and study the 4-hour chart for clean structure.",
      "Watch ETH/BTC ratio — if rising, ETH is leading; if falling, BTC is dominant.",
      "Place a simulated buy at a higher-low; set stop below the low and target the prior swing high.",
      "Review the trade in your portfolio analytics — was the R-multiple worth it?",
    ],
    beginnerTip: "ETH trades cleaner technicals than most alts. Stick with horizontal support/resistance before chasing indicators.",
    risk: "Smart-contract narratives can flip overnight (exploits, regulation). Size positions assuming a 30% gap is possible.",
    studentNote: "Use ETH practice trades to compare entry, exit and sizing rules. Market timing is difficult to evaluate reliably from a small sample, so focus on process and review rather than prediction.",
    drivers: [
      "The ETH/BTC ratio, which tells you whether capital is rotating into the wider crypto complex or consolidating into Bitcoin. Most ETH-specific edge lives in this ratio rather than in the dollar price.",
      "Network activity and fee revenue, including how much settlement has migrated to layer-2 chains, which changes how much value accrues to the base layer.",
      "Staking flows and the size of the queue to enter or exit, which affects the freely tradable float.",
      "Regulatory headlines about staking and token classification, which have historically produced single-day gaps.",
    ],
    firstTrade:
      "Practice a ratio-aware entry rather than a naked directional bet. On the 4-hour chart, wait for ETH to make a higher low while ETH/BTC is also holding its own higher low. Risk 1% ($1,000) with the stop under that ETH low, and set the first target at the previous swing high so the reward-to-risk is at least 2:1 before you commit. If the two charts disagree — ETH rising while the ratio falls — you are simply long crypto beta and should size as if you were trading Bitcoin.",
    timing:
      "Ethereum's cleanest structure appears on the 4-hour and daily timeframes; intraday it inherits Bitcoin's direction most of the time, so short-term ETH trades are often BTC trades with worse liquidity. Avoid entering immediately before major protocol upgrades: implied volatility is elevated, the outcome is binary, and the post-event move frequently runs opposite to the headline.",
    mistakes: [
      "Assuming ETH always outperforms BTC in a rally. It leads in some regimes and lags badly in others; check the ratio instead of assuming.",
      "Ignoring the gap risk from exploits and regulatory rulings when choosing position size.",
      "Confusing an upgrade narrative with a price catalyst. Upgrades are usually priced in weeks before they ship.",
    ],
    review:
      "Log every ETH practice trade alongside what BTC did in the same window. If your ETH results simply track Bitcoin's, you do not yet have an Ethereum thesis — you have crypto exposure, and you should size it accordingly. Reviewing pairs of outcomes like this is the fastest way to find out whether your edge is real or borrowed.",
  },
  {
    symbol: "tsla",
    name: "TSLA",
    fullName: "Tesla",
    type: "stock",
    whyTrade: "TSLA is one of the most-traded retail stocks on the planet, with huge options volume and earnings volatility — ideal for practising event-driven setups.",
    steps: [
      "Open the TradeHQ practice account.",
      "Go to /trade/tsla and pull the daily + 1-hour timeframes side by side.",
      "Identify the trend on daily; trade pullbacks on 1-hour in that direction only.",
      "Use a 1.5-2x ATR stop; size the position so a stop-out loses ≤1% of practice equity.",
      "After earnings, journal whether the move respected your invalidation level.",
    ],
    beginnerTip: "Avoid trading TSLA into earnings unless you understand options-implied moves. Sit out the event, trade the reaction.",
    risk: "TSLA can gap 8-12% on earnings. A 10x leveraged FX-style mindset will be liquidated here.",
    studentNote: "Sri Lankan students: US market hours are late evening local time — practise during weekends to build the habit without sleep loss.",
    drivers: [
      "Quarterly delivery numbers and margin commentary, which move the stock more reliably than the earnings-per-share headline.",
      "Price cuts and demand signals in China and Europe, which arrive as news between reporting dates.",
      "The energy and autonomy narrative, which changes the multiple investors are willing to pay far more than near-term cash flow does.",
      "Positioning: Tesla carries some of the heaviest retail options volume of any listed stock, so dealer hedging can amplify moves around large open-interest strikes.",
    ],
    firstTrade:
      "Trade the reaction, not the event. Wait for an earnings release to pass, let the first thirty minutes of the next session set a high and a low, then take a position only if price breaks and holds beyond one of those extremes. Risk 1% of practice capital, place the stop on the other side of the opening range, and size from the distance — with a 3% stop that is roughly $33,000 of stock on the $100,000 practice account. This gives you the volatility without the coin-flip of holding through the print.",
    timing:
      "Tesla is a US-hours instrument. Liquidity is best in the first and last hour of the regular session; the pre-market and after-hours prints that look dramatic often trade on thin volume and reverse at the open. If you are learning from a timezone where the US open is late at night, use the daily chart and place your orders in advance rather than trying to trade tired.",
    mistakes: [
      "Holding through an earnings print with a position sized for a normal day. An 8-12% gap can jump straight past a stop.",
      "Reading founder headlines as tradable information. By the time the story is on your feed, the move has usually happened.",
      "Anchoring to a past all-time high as if it were a target. Prices do not owe anyone a return trip.",
    ],
    review:
      "For each Tesla practice trade, note whether your loss (or gain) came from the direction call or from the size. Most beginner damage on this stock is a sizing error wearing the costume of a bad call, and the analytics page will show that pattern within a dozen trades.",
  },
  {
    symbol: "nvda",
    name: "NVDA",
    fullName: "Nvidia",
    type: "stock",
    whyTrade: "NVDA is the cleanest pure-play on AI compute demand. It trends hard in cycles and rewards patient trend-followers more than fast scalpers.",
    steps: [
      "Spin up your free TradeHQ practice account.",
      "Open /trade/nvda. Mark the 50-day and 200-day moving averages on the daily chart.",
      "Wait for a pullback to the 50-day in a confirmed uptrend.",
      "Buy small, stop below the 200-day or the last swing low.",
      "Trail your stop under each new higher-low — let winners run.",
    ],
    beginnerTip: "NVDA respects trend more than most names. Don't shortcut it with reversal trades.",
    risk: "AI capex cycles can pause without warning (hyperscaler guidance cuts). Always know your exit.",
    studentNote: "Practise compounding here — a 2% R-trade weekly on NVDA, over 50 weeks, teaches more than chasing 10x crypto setups.",
    drivers: [
      "Data-centre capital expenditure guidance from the largest cloud operators, which is the demand signal that ultimately funds Nvidia's revenue.",
      "Supply and packaging constraints, which determine how much of that demand can actually be shipped in a quarter.",
      "Export-control policy, which can remove an entire geography from the forecast with a single announcement.",
      "Index and momentum flows: as one of the largest index weights, Nvidia is bought and sold mechanically by funds that have no view on it at all.",
    ],
    firstTrade:
      "Practice a trend-following entry instead of a reversal. On the daily chart, confirm price is above a rising 50-day average, then wait for a pullback that touches or nears it. Enter on the first day that closes back up, risk 1% with the stop under the pullback low, and then do the harder part: trail the stop under each subsequent higher low rather than taking the first small profit. The purpose of the exercise is to feel how uncomfortable it is to hold a winner.",
    timing:
      "The stock trends for weeks and chops violently intraday, which is why the daily timeframe suits learners better than the five-minute. The two dates that matter most are the company's own results and the results of its largest customers; both can reprice the entire semiconductor complex overnight.",
    mistakes: [
      "Shorting strength because the valuation looks high. Expensive is not a timing signal and momentum names stay expensive for long stretches.",
      "Taking profits at the first green day and then re-entering higher, which converts a good trend trade into a series of poor ones.",
      "Assuming the whole chip sector moves together. Correlations break exactly when the news is company-specific.",
    ],
    review:
      "Compare your realised result against simply buying and holding for the same period. If the buy-and-hold line beats your activity — which it often will on a strong trend — that is genuine information about whether trading this name adds anything for you, and it costs nothing to learn here.",
  },
  {
    symbol: "spy",
    name: "SPY",
    fullName: "S&P 500 ETF",
    type: "etf",
    whyTrade: "SPY is the global benchmark. Learning to read its trend teaches you risk-on/off conditions for every other asset you'll ever trade.",
    steps: [
      "Open the TradeHQ practice account.",
      "Navigate to /trade/spy.",
      "Use the daily chart with VWAP and the 20-day EMA.",
      "Trade only in the direction of the daily trend on intraday timeframes.",
      "Track P&L vs. simply holding SPY — does your activity actually add alpha?",
    ],
    beginnerTip: "Most retail traders underperform a simple SPY DCA. Practising here will show you why — and how to beat it.",
    risk: "SPY rarely moves >2% in a day, but leverage products on it can wipe accounts during gaps.",
    studentNote: "For long-term Sri Lankan investors: SPY practice teaches that boring, consistent exposure beats most trading attempts.",
    drivers: [
      "Interest-rate expectations, which set the discount rate for every company in the index and therefore drive most multi-week moves.",
      "Aggregate earnings revisions across the five hundred constituents rather than any single company's results.",
      "Index concentration: a handful of mega-cap names now carry an outsized weight, so the 'broad market' can be dragged by a few tickers.",
      "Scheduled macro releases — CPI, payrolls and FOMC decisions — which produce the majority of the index's largest single-day moves.",
    ],
    firstTrade:
      "Use the index to learn benchmarking rather than to chase moves. Buy a practice position equal to 25% of the account and leave it untouched for thirty days as a control. Trade whatever else you like alongside it, then compare the two lines. Risking 1% per active trade while a passive quarter of the account simply sits there is the clearest possible demonstration of whether your activity is adding value or subtracting it.",
    timing:
      "The index is most liquid at the US open and into the closing auction, and it is thinnest in the middle of the session. Macro release days at 8:30am US Eastern routinely produce more movement in ten minutes than the previous three sessions combined, so if you are learning execution, avoid placing your first orders into that window.",
    mistakes: [
      "Using leveraged index products to make a slow instrument feel exciting; the daily-reset mechanics erode value in choppy markets.",
      "Confusing the index with the economy. It can rise through weak data when rate expectations fall.",
      "Overtrading a 1%-a-day instrument, where costs and spread consume a meaningful share of any edge.",
    ],
    review:
      "At the end of the thirty days, put your active trading return and the untouched index position side by side in the analytics view. Whichever way it comes out, you now have a personal, evidence-based answer to the question most beginners argue about online.",
  },
  {
    symbol: "sol",
    name: "SOL",
    fullName: "Solana",
    type: "crypto",
    whyTrade: "SOL has tighter spreads than most alts, hot consumer narratives (memecoins, payments) and trends harder than ETH in risk-on regimes.",
    steps: [
      "Open your TradeHQ practice account.",
      "Open /trade/sol and check SOL/BTC ratio for relative strength.",
      "Identify a higher-timeframe range; only buy near the bottom of that range.",
      "Set invalidation just below the range low.",
      "In simulation, compare fixed exits with partial exits and record how each approach changes average win, average loss and drawdown.",
    ],
    beginnerTip: "SOL trends explosively but reverses just as fast. Lock in partials — perfection is the enemy of profit.",
    risk: "Network outages have happened. Don't be max-leveraged through low-liquidity weekends.",
    studentNote: "Use SOL practice to learn position-sizing on a fast-moving asset — the lesson transfers to every other market.",
    drivers: [
      "Risk appetite across the wider crypto market. Solana is a high-beta expression of the same trade as Bitcoin, so it rises further in rallies and falls further in liquidations.",
      "On-chain consumer activity — trading apps, payments and token launches — which drives fee revenue and the attention cycle around the chain.",
      "Network reliability. Historic outages taught the market to discount the chain during periods of extreme load, and any recurrence reprices it quickly.",
      "Unlock schedules for previously locked supply, which add sellers on known dates.",
    ],
    firstTrade:
      "Because Solana can move twice as far as Bitcoin in a session, halve the position you would otherwise take. Risking 1% of the $100,000 practice account with a stop 8% below entry gives a position of roughly $12,500 — a number that feels far too small until the first fast reversal, at which point it feels exactly right. Take partial profit at the middle of the prior range and move the stop to break-even on the remainder.",
    timing:
      "Solana's largest moves cluster around US hours and around token launches, while weekend liquidity is thin enough that stop orders can fill several percent away from their trigger. If you are practising execution rather than direction, trade it midweek during US hours and leave the weekend to observation.",
    mistakes: [
      "Copying a Bitcoin position size onto a Solana trade, which quietly doubles or triples the risk taken.",
      "Chasing a launch narrative after it has already trended for days, when the reward-to-risk has inverted.",
      "Treating a fast recovery as proof that no stop was needed. Survivorship in one trade is not a method.",
    ],
    review:
      "Record the maximum adverse excursion — how far the trade went against you before it worked — on every Solana practice position. If that number is routinely close to your stop, your entries are early rather than wrong, and tightening entry timing will improve results more than changing indicators.",
  },
];

// ============================================================================
// Strategy pages — /strategy/:slug
// ============================================================================
export interface Strategy {
  slug: string;
  name: string;
  oneLiner: string;
  bestFor: string;
  worstFor: string;
  steps: string[];
  example: string;
  successRate: string;
  depth: StrategyDepth;
}

/** Long-form, page-specific depth added to each strategy page. */
export interface StrategyDepth {
  context: string;      // where the method came from / why it works
  regime: string;       // market conditions that help or hurt it
  mistakes: string[];   // 3 concrete failure modes
  math: string;         // expectancy / sizing worked in numbers
}

export const STRATEGIES: Strategy[] = [
  {
    slug: "scalping",
    name: "Scalping",
    oneLiner: "Capturing small price moves on the 1-5 minute timeframe.",
    bestFor: "Traders with fast execution, low latency and tight spreads. Liquid markets like SPY, BTC, ES futures.",
    worstFor: "Beginners, anyone on slow internet, or anyone trading wide-spread alts.",
    steps: [
      "Pick one liquid instrument and trade only that for 30 days.",
      "Use 1-min + 5-min charts; ignore higher timeframes for entries.",
      "Choose a small predefined practice risk budget and keep it consistent while you collect enough trades to review the results.",
      "Use a predefined session stop in the simulator if repeated losses are affecting decision quality, and review the session before continuing.",
      "Review every trade nightly — most edge comes from cutting bad setups, not adding new ones.",
    ],
    example: "Long BTC at $95,120 with stop $95,080, target $95,210 — risking $40 to make $90.",
    successRate: "No universal win rate applies. Track your own simulated win rate, payoff ratio, costs and drawdown over a sufficiently large sample.",
    depth: {
      context:
        "Scalping exists because order books are noisy. Market makers quote a bid and an ask, and between those two prices there is a constant tug-of-war as large orders get worked into the book. A scalper is not predicting where an asset will be next month — they are trying to be on the right side of the next few hundred ticks and get out before the noise reverses. That makes execution quality, not analysis, the main variable: a 2-tick worse fill on a 10-tick target destroys a third of the trade's expected value.",
      regime:
        "Scalping works best when the spread is one tick wide and volume is heavy — US equity index products in the first hour, BTC and ETH during US/Europe overlap, EUR/USD around the London open. It fails in thin overnight sessions, in low-volume altcoins where the spread can be 0.3% (three times a typical target), and around scheduled events such as CPI or FOMC where the book empties out seconds before the print.",
      mistakes: [
        "Trading a wide-spread instrument. If the spread is 0.2% and your target is 0.15%, the position is negative-expectancy before you click.",
        "Increasing size after a losing streak to 'get it back'. Scalping produces long strings of small losses by design; size changes turn a normal drawdown into a blow-up.",
        "Holding a scalp that goes against you and calling it a swing trade. That is a different plan with a different stop, and switching mid-trade means you have no plan at all.",
      ],
      math:
        "Illustrative arithmetic only: if a hypothetical sample had a 57% win rate and 1:1.5 payoff ratio, expectancy would be about +0.425R per trade. At a hypothetical $250 risk budget that equals about $106.25 before costs. Those inputs are assumptions, not a claimed strategy result; changing win rate, payoff, fees or slippage changes the answer.",
    },
  },
  {
    slug: "swing-trading",
    name: "Swing Trading",
    oneLiner: "Holding positions 2-10 days to capture intermediate moves.",
    bestFor: "People with day jobs. Patient traders who can check charts twice a day.",
    worstFor: "Anyone who panics during overnight gaps.",
    steps: [
      "Use the daily chart to find the trend.",
      "Use the 4-hour chart for entries on pullbacks.",
      "Risk 0.5-1% per trade.",
      "Set stops outside daily noise (1.5x ATR is a good default).",
      "Test fixed exits, partial exits and trailing exits separately so you can compare how each rule behaves in simulation.",
    ],
    example: "Bought NVDA at $145 after a pullback, stop $138, target $165 — risked $7 to make $20.",
    successRate: "Performance depends on market regime, entry/exit rules, costs and sample size. Use the simulator to measure your own distribution of outcomes.",
    depth: {
      context:
        "Swing trading sits between day trading and investing: positions are held long enough for a thesis to play out, short enough that a single position is never a life decision. It suits anyone with a job because the analysis happens once, usually in the evening, and the market does the work while you are away. The trade-off is overnight risk — earnings, macro prints and weekend headlines all move price while your stop cannot protect you at the exact level you set.",
      regime:
        "It performs when a market is trending on the daily chart with regular pullbacks: think large-cap tech in an uptrend, or a major FX pair in a sustained rate-differential move. It performs badly in tight, headline-driven chop where every pullback becomes a reversal, and around earnings, where a single gap can exceed several planned stops.",
      mistakes: [
        "Placing the stop at a round number rather than outside the market's normal noise. Use a volatility measure such as 1.5x the 14-day ATR so ordinary movement does not close the trade.",
        "Holding through earnings on a full-size position because 'it should beat'. Either halve the size or close before the print — that event has nothing to do with your entry signal.",
        "Adding to a losing swing. Averaging down converts a defined-risk trade into an undefined one, which is the single most common way practice accounts hit zero.",
      ],
      math:
        "Illustrative arithmetic only: a hypothetical 47% win rate with average wins of 2R and average losses of 1R gives +0.41R expectancy before costs. Any dollar conversion depends on the chosen virtual risk budget. The example does not establish a minimum sample size, expected losing streak or real strategy performance.",
    },
  },
  {
    slug: "day-trading",
    name: "Day Trading",
    oneLiner: "Opening and closing all positions within a single session.",
    bestFor: "Full-time traders. Anyone who has at least 3 hours of focused screen time.",
    worstFor: "Part-time hobbyists — fatigue + emotion = death.",
    steps: [
      "Trade only the first 90 minutes and the last 60 minutes of the session.",
      "Use the 5-min chart with VWAP.",
      "Use a deliberately small and consistent simulated risk budget, and set a session limit that you can evaluate afterwards.",
      "Close everything before the close — no overnight exposure.",
      "End every day with a journal entry: what worked, what didn't, what to cut tomorrow.",
    ],
    example: "Long SPY at VWAP reclaim, stop below VWAP, target the day's prior high.",
    successRate: "There is no dependable universal win-rate range. Evaluate the method by expectancy, drawdown, costs and consistency across a larger sample.",
    depth: {
      context:
        "Day trading concentrates a whole trading career into single sessions. Because everything is closed by the bell there is no overnight gap risk, but there is also no time for a thesis to recover — the market either agrees with you within hours or it does not. Most of the day's directional movement happens in the opening 90 minutes and the final hour, which is why disciplined day traders trade those windows and stay flat through the low-volume midday drift.",
      regime:
        "Good days have a clear opening drive, expanding range and volume above the recent average. Bad days are narrow, overlapping and volume-starved — typically the sessions before a major holiday or the day before a central-bank decision, when institutions stand aside. Learning to recognise a no-trade day is worth more than any additional indicator.",
      mistakes: [
        "Trading the midday lull out of boredom. Range contracts, stops get hit by noise, and the day's profit from the open is handed back.",
        "Using a fixed dollar stop instead of a structural one. The stop should sit where the idea is wrong — below VWAP, below the opening range — not at an arbitrary loss you find comfortable.",
        "Changing risk limits after losses without a predefined rule. In a simulation, choose a daily-loss threshold as an experiment parameter and document what happens when it is reached; no fixed number of stopped trades proves an emotional state.",
      ],
      math:
        "Illustrative arithmetic only: a hypothetical 52% win rate with a 1:1.5 payoff ratio gives +0.30R expectancy per trade. On a $100,000 practice balance, 0.5% equals a $500 virtual risk budget, so five hypothetical trades at those exact assumptions would imply $750 before costs. This is math on assumed inputs, not an estimate of real day-trading performance.",
    },
  },
  {
    slug: "dca-dollar-cost-averaging",
    name: "Dollar-Cost Averaging (DCA)",
    oneLiner: "Buying a fixed amount on a fixed schedule, regardless of price.",
    bestFor: "Long-term investors, beginners, anyone who can't predict the market (i.e. everyone).",
    worstFor: "Active traders who think they can time bottoms.",
    steps: [
      "Pick one or two long-term assets (e.g. SPY, BTC).",
      "Decide an amount you can commit weekly or monthly.",
      "Buy it on the same day every period — no exceptions.",
      "Never sell on red days; rebalance once a year at most.",
      "Track total return on TradeHQ's portfolio analytics to see compounding in action.",
    ],
    example: "$100 into SPY every Friday for 10 years has historically outperformed 80% of active retail traders.",
    successRate: "Execution can be measured separately from investment performance: track whether the scheduled contribution was made as planned, without treating adherence as a guarantee of returns.",
    depth: {
      context:
        "Dollar-cost averaging removes the hardest variable in investing: timing. By committing a fixed amount on a fixed schedule you automatically buy more units when prices are low and fewer when they are high, and you never have to form a view about the next three months. Academic work generally finds lump-sum investing beats DCA on average expected return simply because markets rise more often than they fall — but DCA wins on behaviour, and behaviour is what determines whether someone is still invested after a 30% drawdown.",
      regime:
        "It is designed for broad, diversified, long-lived assets — a total-market or S&P 500 index fund, and for those who accept the volatility, a small allocation to a major crypto asset. It is not designed for single stocks, leveraged products, or anything that can go to zero, because averaging into a permanently impaired asset just buys more of a losing position.",
      mistakes: [
        "Pausing contributions during a crash. That is precisely when the schedule is buying the cheapest units; stopping converts a mechanical plan into market timing.",
        "DCA-ing into a single speculative name and calling it investing. The method assumes the underlying asset recovers over long horizons — that assumption holds for a diversified index, not for one company.",
        "Checking the balance daily. The plan works on a horizon of years; daily monitoring only increases the chance of abandoning it.",
      ],
      math:
        "Illustrative compounding example: $500 contributed monthly for 20 years at an assumed constant 8% annual return ends near $295,000 before taxes and fees, versus $120,000 of contributions. The 8% return is an input to the calculator, not a forecast or promised outcome.",
    },
  },
  {
    slug: "rsi-strategy",
    name: "RSI Mean-Reversion",
    oneLiner: "Buying oversold dips and selling overbought spikes using RSI(14).",
    bestFor: "Range-bound markets, large-cap stocks, and major crypto pairs.",
    worstFor: "Strong trends — RSI stays overbought/oversold for weeks and you'll get run over.",
    steps: [
      "Add RSI(14) to your chart.",
      "Wait for RSI < 30 (oversold) or > 70 (overbought).",
      "Confirm with a candlestick reversal pattern on the same bar.",
      "Enter, stop just beyond the reversal candle, target the 20 EMA.",
      "Skip the trade in obvious strong-trend regimes — check the 50/200 EMA first.",
    ],
    example: "BTC RSI dips to 26 at $92K with a bullish engulfing — buy, stop $91K, target $94K.",
    successRate: "RSI-based results can vary sharply by market regime and rule set. Test the same rules in ranging and trending periods rather than relying on a fixed win-rate claim.",
    depth: {
      context:
        "RSI, published by J. Welles Wilder in 1978, measures the ratio of average gains to average losses over a lookback window, normally 14 periods, and scales it from 0 to 100. Mean-reversion traders use it as a stretch gauge: a reading under 30 says recent selling has been unusually one-sided, which in a range-bound market often precedes a bounce. Crucially, RSI says nothing about direction — it describes how price got here, not where it goes next.",
      regime:
        "The method only makes sense in a market that is oscillating around a value area: a large-cap stock consolidating after a run, a major FX pair inside a monthly range, BTC chopping between well-defined levels. In a strong trend RSI can hold above 70 for weeks, and every 'overbought' short is a loss. Check the 50 and 200 EMA relationship first: if they are widely separated and sloping, this is a trend regime and mean reversion should be skipped.",
      mistakes: [
        "Taking the signal without confirmation. RSI under 30 alone is not an entry; wait for the reversal candle or a reclaim of a prior level so there is a defined place to be wrong.",
        "Shorting an overbought reading in an uptrend. This is the single most expensive misuse of the indicator, and it feels most compelling exactly when it is most dangerous.",
        "Tuning the lookback until history looks profitable. An RSI(9) that backtests beautifully on one asset and one year is usually curve-fitting, not an edge.",
      ],
      math:
        "Illustrative arithmetic only: if one hypothetical sample had a 57% win rate with a 1.2R average win, expectancy would be about +0.254R; at 32% with the same payoff assumption it would be about -0.296R. The purpose is to show sensitivity to assumptions, not to claim those win rates occur in particular market regimes.",
    },
  },
  {
    slug: "macd-strategy",
    name: "MACD Crossover",
    oneLiner: "Trading the signal-line cross on the MACD indicator.",
    bestFor: "Trend-following on the daily timeframe.",
    worstFor: "Choppy markets — you'll whipsaw and bleed.",
    steps: [
      "Add MACD (12, 26, 9) to the daily chart.",
      "Wait for the MACD line to cross above the signal line above the zero line for longs (below for shorts).",
      "Enter on the next day's open.",
      "Stop below the last swing low.",
      "Exit when MACD crosses back.",
    ],
    example: "NVDA MACD crosses up at $130 with stop $124 — held for 6 weeks to $165.",
    successRate: "MACD results vary by timeframe, market and exit rule. Track payoff distribution and drawdown instead of assuming a fixed win-rate range.",
    depth: {
      context:
        "MACD is the difference between a 12-period and a 26-period exponential moving average, plotted against a 9-period signal line. Because it is built from averages, it always confirms a move after it has begun — it is a trend-following tool, not a predictive one. That lag is the price paid for filtering out most false starts, and it is why MACD systems typically lose more trades than they win while still making money: the winners run far longer than the losers.",
      regime:
        "It performs in markets that trend persistently on the daily chart — index ETFs, mega-cap equities, major commodities in a supply cycle. It performs badly in range-bound conditions, where the signal line crosses back and forth and each whipsaw costs a full stop. A simple filter that removes most of the damage: only take long crosses while price is above the 200-day moving average.",
      mistakes: [
        "Trading every cross. Crosses below the zero line in a downtrend, or inside a tight range, produce the bulk of the losing trades in any MACD backtest.",
        "Exiting winners at a fixed target. The method's entire expectancy depends on a handful of large trends; capping them at 1R while taking full 1R losses inverts the edge.",
        "Reading histogram divergence as a reversal signal. Divergence is common and frequently resolves by the trend simply continuing after a pause.",
      ],
      math:
        "Illustrative arithmetic only: a hypothetical 43% win rate with 2.5R average wins and 1R average losses gives about +0.505R expectancy before costs. That calculation does not establish an expected losing-streak length, a required position size or the profitability of a real MACD strategy.",
    },
  },
];

export const COUNTRY_PAGES = [
  { slug: "sri-lanka", country: "Sri Lanka", currency: "LKR", note: "Practise in USD with $100K virtual cash — no LKR conversion or capital-control friction." },
  { slug: "india", country: "India", currency: "INR", note: "Learn US-market mechanics before opening a real GIFT-City or LRS-routed account." },
  { slug: "philippines", country: "Philippines", currency: "PHP", note: "Build a track record on practice equity before committing pesos to a live broker." },
  { slug: "nigeria", country: "Nigeria", currency: "NGN", note: "Master order flow without FX friction — the lessons transfer to any naira-denominated broker later." },
  { slug: "pakistan", country: "Pakistan", currency: "PKR", note: "Educational practice only — perfect for students before PSX or international broker accounts." },
];

export { SITE_DOMAIN } from "./constants";
