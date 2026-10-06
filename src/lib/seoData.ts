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
    a: { symbol: "BTC", name: "Bitcoin", tag: "Digital gold" },
    b: { symbol: "ETH", name: "Ethereum", tag: "Smart-contract platform" },
    intro: "Bitcoin is the original cryptocurrency built as a scarce digital store of value. Ethereum is a programmable settlement layer powering DeFi, NFTs and most of Web3. Picking between them is a question of conviction: hard-money savings vs. an internet-native economy.",
    verdict: "Practice comparison: contrast Bitcoin supply rules and settlement design with Ethereum execution, issuance and staking mechanics. Neither profile establishes the better investment, an assured hedge or future upside.",
    bullets: [
      "Supply: compare Bitcoin issuance rules with Ethereum issuance and fee burning; Ethereum supply changes with network conditions.",
      "Staking: Ethereum rewards, fees, withdrawal arrangements and risks vary; TradeHQ does not model staking returns.",
      "Use case: compare settlement and programmability using each network’s current documentation.",
      "Volatility: compare percentage changes over the same stated sample rather than use a fixed ETH/BTC volatility multiple.",
    ],
    deepDive: [
      "The two assets answer different questions. Bitcoin's design goal is credible scarcity: a fixed issuance schedule, a deliberately simple scripting language, and a network whose main job is to never change in ways holders did not agree to. Ethereum's design goal is expressiveness: a general-purpose virtual machine where anyone can deploy code that settles value. That difference shows up in how each network's value is argued for. Bitcoin's case is monetary and rests on adoption as a savings asset; Ethereum's case is closer to an economy, where fees paid by applications and the burn mechanism tie network usage to the supply of the token.",
      "For a practice comparison, measure BTC and ETH returns over the same observation period. Correlation depends on that sample and can change; two token names do not by themselves establish independent exposures. Record the market-data source, interval and method before interpreting a relationship. Network activity, fees and issuance are additional variables to investigate rather than guaranteed leading indicators. A BTC/ETH split changes weights but does not prove diversification or prescribe a suitable total crypto allocation.",
    ],
    mistakes: [
      "Treating a BTC and ETH split as diversified. They fall together in almost every stress event; the combined position is what needs sizing.",
      "Assuming staking yield is free money. Staking rewards come with lock-up periods, validator risk and, through liquid staking tokens, an extra layer of smart-contract exposure.",
      "Comparing prices per unit. One ETH costing less than one BTC says nothing about value — only market capitalisation and issuance are comparable.",
    ],
  },
  {
    slug: "tesla-vs-nvidia",
    a: { symbol: "TSLA", name: "Tesla", tag: "EV + energy + AI" },
    b: { symbol: "NVDA", name: "Nvidia", tag: "Compute products + software" },
    intro: "Tesla blends auto, energy storage and an emerging humanoid/robotaxi narrative. Nvidia is the picks-and-shovels supplier of the entire AI buildout. Both are high-beta names, but the drivers behind them are completely different.",
    verdict: "Practice comparison: contrast Tesla automotive and energy assumptions with NVIDIA compute demand and customer concentration. Neither business narrative establishes a superior investment or predictable price response.",
    bullets: [
      "Business mix: compare automotive and energy reporting with compute products and supporting software.",
      "Margins: use comparable periods and segment definitions from current company filings rather than fixed percentages.",
      "Risk: compare demand, spending, competition and execution assumptions with alternative outcomes.",
      "Beta: a beta estimate depends on the benchmark, interval and period; it is not a permanent risk score.",
    ],
    deepDive: [
      "Nvidia's revenue is concentrated in a small number of very large buyers building data centres, which makes its results a fairly direct read on hyperscaler capital expenditure. When those budgets expand, orders and margins expand with them; when a single large customer defers a build-out, the effect is visible in one quarter. Tesla's revenue comes from millions of individual consumers making financed purchase decisions, so it responds to interest rates, incentives and regional demand rather than to enterprise budgets. Two very different demand signals sit behind two stocks that retail traders often lump together as 'AI names'.",
      "That difference matters for how each is analysed. For Nvidia, the numbers that move the story are data-centre revenue growth, gross margin and customer concentration. For Tesla, they are deliveries, automotive gross margin excluding regulatory credits, and progress on the autonomy and energy segments that carry the long-duration part of the valuation. Both trade at multiples that assume years of execution, which is why both can fall sharply on results that would be considered good for an average company — the bar is set by expectations, not by absolute performance.",
    ],
    mistakes: [
      "Buying both as one 'AI trade'. Their demand drivers are unrelated, and holding both simply doubles exposure to high-multiple growth without adding an independent thesis.",
      "Treating a beta estimate or a familiar ticker as a guaranteed risk classification. Compare the same benchmark and sample, and consider hypothetical price shocks without prescribing leverage or a fixed drawdown.",
      "Reading a headline earnings beat as a bullish signal. In high-expectation stocks the reaction is driven by guidance and margins, not by the beat itself.",
    ],
  },
  {
    slug: "bitcoin-vs-gold",
    a: { symbol: "BTC", name: "Bitcoin", tag: "Digital store of value" },
    b: { symbol: "GLD", name: "Gold", tag: "Physical hedge" },
    intro: "Both are non-yielding scarce assets, but they trade very differently in stress. Gold is the 5,000-year hedge with central-bank demand. Bitcoin is the 16-year-old digital alternative with a fixed supply schedule and rising sovereign adoption.",
    verdict: "Practice comparison: contrast physical gold exposure, costs and custody with Bitcoin network and custody risks. Neither is assured currency-crisis insurance or a guarantee of asymmetric upside.",
    bullets: [
      "Volatility: compare a specified gold exposure and BTC over the same period and calculation method.",
      "Correlation: a relationship with equities depends on the period examined and is not a permanent hedge.",
      "Costs: physical custody, fund expenses and crypto key-management arrangements are different and require product-specific checks.",
      "Access: trading hours and settlement depend on the instrument, venue and provider; a gold fund is not physical gold.",
    ],
    deepDive: [
      "Gold exposure can mean physical holdings, an exchange-traded fund or a derivative, each with different ownership, custody and cost arrangements. Gold has industrial and reserve uses, but a historical role does not guarantee preservation of purchasing power or gains during market stress. Bitcoin uses a digital network with distinct supply and settlement rules. A comparison should identify the exact exposures and the observation period before describing volatility, demand or correlations; the length of a narrative is not evidence of a reliable hedge.",
      "In a hypothetical stress exercise, compare several possible price changes for gold and Bitcoin rather than assume one rises whenever stocks fall. Use equal starting values and record the resulting portfolio contribution, costs and custody assumptions. A recent favourable response does not establish a permanent safe-haven relationship. Different custody methods introduce different operational risks, and neither a price chart nor a simulated return certifies real-money suitability. TradeHQ can illustrate price and portfolio arithmetic without reproducing physical delivery or key custody.",
    ],
    mistakes: [
      "Sizing them equally in dollars. Matching risk, not capital, means a much smaller bitcoin position for the same contribution to portfolio volatility.",
      "Calling bitcoin an inflation hedge based on 2020-2021. It behaved like a high-beta risk asset through the 2022 inflation peak, which is the opposite of a hedge.",
      "Ignoring custody. Vault fees for gold and key management for bitcoin are real, ongoing costs that a price chart never shows.",
    ],
  },
  {
    slug: "apple-vs-microsoft",
    a: { symbol: "AAPL", name: "Apple", tag: "Consumer hardware + services" },
    b: { symbol: "MSFT", name: "Microsoft", tag: "Enterprise software + cloud" },
    intro: "Apple and Microsoft are both large technology companies, but their business mixes differ. Apple combines consumer hardware with services and capital returns, while Microsoft combines enterprise software, cloud infrastructure and AI-related products. A useful comparison starts with those business models rather than a short-term price forecast.",
    verdict: "Practice comparison: examine Apple's hardware, services and capital-return model alongside Microsoft's enterprise software, cloud and AI-infrastructure model. Neither profile is automatically the better investment; the relevant risks and valuation assumptions differ.",
    bullets: [
      "Revenue mix: compare Apple's hardware and services contribution with Microsoft's productivity, cloud and other enterprise businesses.",
      "AI exposure: compare how each company describes AI-related products, infrastructure spending and monetisation in its current filings.",
      "Capital return: both companies return cash to shareholders; check current dividends, repurchases and share-count changes in their latest reports.",
      "Regulation: both operate under changing competition, platform, privacy and technology rules, so use current filings rather than a permanent regulatory label.",
    ],
    deepDive: [
      "Apple's economics combine device sales with recurring services tied to its installed base. When analysing the business, useful questions include how hardware demand changes, how services contribute to revenue and margins, and how dividends or share repurchases affect per-share results. Those figures should be taken from the latest Apple filings because they change over time.",
      "Microsoft's economics are heavily connected to enterprise software, subscriptions and cloud infrastructure. Its current reporting also discusses substantial investment in capacity for cloud and AI workloads. When comparing it with Apple, separate revenue growth from the cost of supporting that growth and use the latest Microsoft filings for current rates, spending and segment definitions. Use comparable reporting periods when comparing growth, margins and cash returns.",
    ],
    mistakes: [
      "Treating a mega-cap company as low risk simply because it is large. Large companies can still experience substantial drawdowns and business-model changes.",
      "Comparing headline per-share metrics without checking share-count changes, capital spending and cash returns. Those factors can alter what per-share growth means.",
      "Assuming an index position gives the same exposure for every investor. If you are comparing a single stock with an index fund, check the fund's current holdings and weights first.",
    ],
  },
  {
    slug: "ethereum-vs-solana",
    a: { symbol: "ETH", name: "Ethereum", tag: "L1 + L2 ecosystem" },
    b: { symbol: "SOL", name: "Solana", tag: "Monolithic high-throughput chain" },
    intro: "Ethereum scales through rollups (L2s) and prioritises decentralisation. Solana scales by running a single fast chain with parallel execution. Both lead in DeFi and tokenization but make opposite architectural bets.",
    verdict: "Practice comparison: contrast network design, execution, reliability and supply assumptions using current Ethereum and Solana documentation. Throughput or a fee comparison does not establish token-price upside.",
    bullets: [
      "Throughput: define transaction type, observation period and inclusion of votes or rollup activity before comparing counts.",
      "Fees: actual fees vary with transaction type and network conditions; no fixed cost range is established here.",
      "Reliability: compare documented incidents and their dates rather than claim that a network has never halted.",
      "Staking: rewards, issuance, fees and operational risks differ; advertised yield is not a guaranteed real return.",
    ],
    deepDive: [
      "The architectural bet is the whole story. Ethereum decided that the base layer should stay small enough for ordinary hardware to verify, pushing throughput to rollups that post proofs back to the main chain. That preserves decentralisation and creates a modular ecosystem, at the cost of a fragmented user experience across many L2s. Solana decided that hardware improves faster than coordination does, so it runs one chain with parallel execution and higher validator requirements. That produces a single, fast, cheap environment, at the cost of a smaller validator set and a history of network halts.",
      "Network activity and token returns are different measures. A comparison can examine where fees are charged, how supply changes and which security assumptions apply without presuming that greater activity raises price. Staking rewards are denominated in the token and can be affected by costs, issuance, protocol rules and market-price losses. Comparing nominal reward percentages alone does not establish an inflation-adjusted investment return. Document the source and period and separate the network’s design from a forecast of its token’s value.",
    ],
    mistakes: [
      "Choosing on transactions per second alone. Sustained throughput under real load, and what happens when the chain is congested, matter far more than a benchmark figure.",
      "Reading a nominal staking yield as a real return. Subtract issuance before comparing anything.",
      "Assuming an outage is priced in permanently. Reliability events tend to affect institutional adoption timelines, which is a slow variable, not a one-day price move.",
    ],
  },
  {
    slug: "stocks-vs-crypto",
    a: { symbol: "SPY", name: "Stocks (S&P 500)", tag: "Equity index" },
    b: { symbol: "BTC", name: "Crypto (Bitcoin)", tag: "Digital asset" },
    intro: "Equities and crypto represent very different kinds of exposure: equities are ownership claims on businesses, while crypto assets depend on network use, market structure and investor demand. This comparison focuses on those structural differences rather than prescribing an allocation.",
    verdict: "Broad equity indexes and crypto have very different risk profiles. Use the comparison to understand those differences rather than treating either allocation as a universal recommendation.",
    bullets: [
      "Historical return: specify dates, reinvestment, inflation and costs rather than use a universal index or Bitcoin annual return.",
      "Drawdown: calculate peak-to-trough change in a defined price or total-return series; no universal maximum is established here.",
      "Cash flows: companies may distribute dividends or repurchase shares; a particular crypto asset has different rights and risks.",
      "Practice access: TradeHQ uses virtual funds and simplified fills, separate from actual venue hours, eligibility and execution.",
    ],
    deepDive: [
      "Equities and crypto are not competing versions of the same thing. A share is a legal claim on a company's future cash flows, protected by securities law, with audited accounts and a regulator that can act on fraud. A crypto token is a unit of a protocol whose value comes from what its network is used for and what people will pay for it; the disclosure regime is thinner and the investor protections are largely whatever the exchange chooses to offer. That is not an argument that one is good and one is bad — it is a description of what you own and what recourse exists when something goes wrong.",
      "For a virtual comparison, use equal starting values, matching dates and a stated calculation method. A price-only series and an index with reinvested dividends answer different questions. Measure drawdowns and variability from the same sample rather than repeat a permanent return or maximum-loss percentage. Position weights determine each contribution to a hypothetical loss, but no beginner core/satellite split is universally appropriate. A simulator’s simplified data and fills do not establish that either exposure is suitable for real-money savings.",
    ],
    mistakes: [
      "Sizing a crypto allocation as if its drawdown profile resembled an index. It does not; assume a 75% fall is possible and set the position accordingly.",
      "Judging either over a single year. Both need a multi-year horizon before returns say anything about the strategy.",
      "Using leverage on 24/7 markets. Crypto liquidations happen while you sleep, and there is no closing bell to stop the move.",
    ],
  },
  {
    slug: "nvidia-vs-amd",
    a: { symbol: "NVDA", name: "Nvidia", tag: "AI accelerator leader" },
    b: { symbol: "AMD", name: "AMD", tag: "Challenger + CPU strength" },
    intro: "Nvidia is the incumbent in AI training silicon with the CUDA software moat. AMD has the strongest credible alternative roadmap (MI300/MI400) and dominates server CPUs via EPYC. The trade is incumbency vs. catch-up.",
    verdict: "Practice comparison: examine product mix, software support, customer demand and reported costs. Neither incumbency nor a challenger narrative establishes compounding dominance or greater share-price upside.",
    bullets: [
      "Software: compare current product documentation and compatibility rather than presume permanent developer lock-in.",
      "Margins: use current company filings with matching periods and segment definitions.",
      "Valuation: calculate a stated valuation measure from dated inputs; it is not a permanent premium.",
      "Demand: compare reported compute spending and competing outcomes; share gains do not guarantee a stock re-rating.",
    ],
    deepDive: [
      "The competitive question is not whether AMD can build a capable accelerator — it can — but whether the surrounding software is good enough that a large customer will accept the migration cost. Nvidia's CUDA ecosystem has more than fifteen years of libraries, tooling and trained engineers behind it, and that accumulated familiarity is the real moat. AMD's ROCm has improved substantially and the largest buyers have strong commercial reasons to fund a credible second source, which is why AMD's share gains, when they come, tend to arrive through a handful of very large design wins rather than through gradual market drift.",
      "A market-share hypothesis and a stock-price response are different propositions. Compare what was known before an announcement with alternative expectations and reported results. Customer spending, supply, competition, software compatibility and costs can affect both companies, but that does not establish a predictable asymmetric reaction. A price already reflects changing expectations, and a positive business development need not produce a gain. Use matched reporting periods and dated inputs when comparing valuation or profitability.",
    ],
    mistakes: [
      "Assuming benchmark performance decides market share. Software maturity, supply allocation and existing contracts usually decide it first.",
      "Pairing them as a long/short hedge without accounting for beta. Both move with the same capex cycle, but not with the same amplitude.",
      "Extrapolating one quarter's growth rate. Semiconductor demand is cyclical, and order patterns are lumpy by nature.",
    ],
  },
  {
    slug: "forex-vs-stocks",
    a: { symbol: "FX", name: "Forex", tag: "24/5 currency markets" },
    b: { symbol: "Stocks", name: "Equities", tag: "Company ownership" },
    intro: "Forex is the largest, most liquid market in the world but trades macroeconomic differentials, not company fundamentals. Stocks are slower-moving but tied to durable cash flow and innovation. They reward completely different skill sets.",
    verdict: "Practice comparison: distinguish relative currency prices from company ownership and cash flows. Neither instrument category guarantees wealth compounding or suits every short-term trader.",
    bullets: [
      "Turnover: any comparison needs a dated survey and matching definitions; no permanent daily dollar total is asserted here.",
      "Leverage: permitted leverage depends on jurisdiction, product and provider, and does not establish appropriate exposure.",
      "Hours: currency and equity venue schedules, holidays and extended-hours arrangements differ.",
      "Analysis: macroeconomic and company information can inform hypotheses without establishing a dependable trading edge.",
    ],
    deepDive: [
      "Currency prices are relative: every quote is one economy priced against another, so a EUR/USD move can come from Europe, from the United States, or from a global risk event that affects both differently. The dominant drivers are interest-rate differentials, growth expectations and central-bank policy, which is why professional FX participants spend their time on macroeconomic releases rather than on company analysis. There is no equivalent of earnings, no dividend, and no long-term upward drift — a currency pair is a mean-reverting relationship punctuated by policy-driven trends, which is a fundamentally different game from owning productive assets.",
      "Leverage increases gains and losses relative to the funds committed, and requirements depend on the product, jurisdiction and provider. A quoted price’s usual daily range does not establish a safe leverage level or explain a universal share of account losses. For a learning exercise, compare hypothetical unleveraged exposures and record how a price shock changes account value. TradeHQ uses simplified spot practice, so it does not reproduce a margin agreement, forced liquidation or every currency execution condition.",
    ],
    mistakes: [
      "Using the leverage the broker offers. Available leverage is a marketing number, not a recommendation; position size should be set from the stop distance and account risk.",
      "Trading FX around scheduled data without a plan. Spreads widen and slippage during a rate decision can exceed a normal day's range.",
      "Expecting long-term appreciation from a currency pair. There is no equivalent of retained earnings compounding in your favour.",
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
    "symbol": "btc",
    "name": "BTC",
    "fullName": "Bitcoin",
    "type": "crypto",
    "whyTrade": "Bitcoin is a digital asset with a protocol-defined issuance schedule. Its market price is separate from that schedule and can change without a protocol change.",
    "steps": [
      "Open the free virtual practice terminal for BTC; no real-money account is created.",
      "Visit /trade/btc and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Compare the recorded fills and fee-inclusive result with the original assumptions. Add your own explanation to the journal; it is not written automatically."
    ],
    "beginnerTip": "Use BTC as a worksheet for describing price observations and position arithmetic. An indicator or chart pattern is not a verified entry signal. This terminal does not offer every indicator mentioned in the glossary.",
    "risk": "A BTC practice loss depends on quantity, price change and costs. Real execution can involve gaps, slippage and liquidity limits that this simulator does not reproduce. Virtual results do not establish a tolerable real-money risk level.",
    "studentNote": "For learners in Sri Lanka or elsewhere, BTC is an educational catalogue example, not a savings plan or an access recommendation. Local eligibility, funding and tax questions require current official information outside this simulator.",
    "drivers": [
      "Compare the protocol supply schedule, exchange trading activity and news claims as separate sources of information. A halving event does not by itself determine the direction or timing of a price change.",
      "Compare a dated primary description of Bitcoin with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "A hypothetical $25,000 BTC holding loses $1,000 before costs if its price falls 4%. This arithmetic uses chosen inputs, not a recommended allocation or an executable stop. A 0.1% simulator purchase fee on $25,000 is $25. Review both upward and downward cases using the same quantity. Actual simulator results also include selling fees. A manual exit assumption can be crossed by a price move; it is not a guaranteed maximum loss.",
    "timing": "Venue hours, available liquidity and actual data timestamps are separate from the time you open TradeHQ. The BTC chart may use provider history or synthetic candles. Consult the displayed status before treating a practice observation as a current-market event; no session or timeframe is presented as the best time to trade.",
    "mistakes": [
      "Treating the displayed BTC practice price as a guaranteed executable real-market quote.",
      "Confusing position value with maximum loss, or excluding the fees applied on both buys and sells.",
      "Assuming an intended manual exit is a pending stop order, or that selling can create a short position.",
      "Drawing a general performance conclusion from a short, selected or synthetic price sample."
    ],
    "review": "For a BTC worksheet, compare planned quantity, filled quantity, fee and resulting cash. Explain any changed assumption and include unfavorable outcomes. Compare alternative rules over the same data window rather than changing both the method and the observation period. Trade history records fills; your written rationale remains your responsibility."
  },
  {
    "symbol": "eth",
    "name": "ETH",
    "fullName": "Ethereum",
    "type": "crypto",
    "whyTrade": "Ethereum is a network for running applications and smart contracts; ether, or ETH, is its native currency. People use ETH to pay network fees, transfer value and participate in staking. Trading ETH means exchanging that currency at a market price. TradeHQ lets you practise the price and quantity calculations with virtual funds; it does not send coins to a wallet or stake them.",
    "steps": [
      "Open the free virtual practice terminal for ETH; no real-money account is created.",
      "Visit /trade/eth and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Compare the recorded fills and fee-inclusive result with the original assumptions. Add your own explanation to the journal; it is not written automatically."
    ],
    "beginnerTip": "Separate the network from the currency: Ethereum is the system, while ETH is the unit whose price you see. A lower price per coin than BTC does not by itself mean ETH is cheaper in valuation terms.",
    "risk": "An ETH practice loss depends on quantity, price change and costs. Real execution can involve gaps, slippage and liquidity limits that this simulator does not reproduce. Virtual results do not establish a tolerable real-money risk level.",
    "studentNote": "For learners in Sri Lanka or elsewhere, ETH is an educational catalogue example, not a savings plan or an access recommendation. Local eligibility, funding and tax questions require current official information outside this simulator.",
    "drivers": [
      "Network use and ETH price measure different things. Gas is the unit used to measure transaction work; the network fee is paid in ETH. A busy network can change fees without producing a matching percentage change in the exchange price.",
      "Staking helps secure Ethereum, while layer-two networks handle activity with a different fee structure. These concepts explain how the network works; a TradeHQ price chart does not measure staking rewards, network demand or the effect of a particular headline."
    ],
    "firstTrade": "For a hypothetical $20,000 ETH holding, a 5% price decline is a $1,000 gross loss. The purchase also incurs a $20 simulator fee at 0.1%. These selected values illustrate exposure, not a safe percentage or a suggested trade. Review both upward and downward cases using the same quantity. Actual simulator results also include selling fees. A manual exit assumption can be crossed by a price move; it is not a guaranteed maximum loss.",
    "timing": "Venue hours, available liquidity and actual data timestamps are separate from the time you open TradeHQ. The ETH chart may use provider history or synthetic candles. Consult the displayed status before treating a practice observation as a current-market event; no session or timeframe is presented as the best time to trade.",
    "mistakes": [
      "Treating the displayed ETH practice price as a guaranteed executable real-market quote.",
      "Confusing position value with maximum loss, or excluding the fees applied on both buys and sells.",
      "Assuming an intended manual exit is a pending stop order, or that selling can create a short position.",
      "Drawing a general performance conclusion from a short, selected or synthetic price sample."
    ],
    "review": "After a practice trade, explain the result in units before judging it in dollars. If you hold 2 ETH and the price falls by $100 per ETH, the gross position loss is $200. Then include the buy and sell fees. Compare that calculation with the recorded fills, and note whether the chart used provider history or simulated candles. This makes the review about what happened in the exercise rather than whether a prediction sounded convincing."
  },
  {
    "symbol": "tsla",
    "name": "TSLA",
    "fullName": "Tesla",
    "type": "stock",
    "whyTrade": "Tesla is a listed company. A simulated TSLA holding represents a stock-price exercise and does not provide options exposure, voting rights or actual share ownership. Company results and delivery reports are different information sets.",
    "steps": [
      "Open the free virtual practice terminal for TSLA; no real-money account is created.",
      "Visit /trade/tsla and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Compare the recorded fills and fee-inclusive result with the original assumptions. Add your own explanation to the journal; it is not written automatically."
    ],
    "beginnerTip": "Use TSLA as a worksheet for describing price observations and position arithmetic. An indicator or chart pattern is not a verified entry signal. This terminal does not offer every indicator mentioned in the glossary.",
    "risk": "A TSLA practice loss depends on quantity, price change and costs. Real execution can involve gaps, slippage and liquidity limits that this simulator does not reproduce. Virtual results do not establish a tolerable real-money risk level.",
    "studentNote": "For learners in Sri Lanka or elsewhere, TSLA is an educational catalogue example, not a savings plan or an access recommendation. Local eligibility, funding and tax questions require current official information outside this simulator.",
    "drivers": [
      "Distinguish reported deliveries, revenue, margins and management statements. Their relationship with the share price is uncertain and can change; no single announcement guarantees a direction or magnitude.",
      "Compare a dated primary description of Tesla with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "A hypothetical $30,000 TSLA holding has a $900 gross change for a 3% price move, before fees. A 0.1% purchase fee is $30. The example does not recommend a $30,000 position or imply an exit will fill after a gap. Review both upward and downward cases using the same quantity. Actual simulator results also include selling fees. A manual exit assumption can be crossed by a price move; it is not a guaranteed maximum loss.",
    "timing": "Venue hours, available liquidity and actual data timestamps are separate from the time you open TradeHQ. The TSLA chart may use provider history or synthetic candles. Consult the displayed status before treating a practice observation as a current-market event; no session or timeframe is presented as the best time to trade.",
    "mistakes": [
      "Treating the displayed TSLA practice price as a guaranteed executable real-market quote.",
      "Confusing position value with maximum loss, or excluding the fees applied on both buys and sells.",
      "Assuming an intended manual exit is a pending stop order, or that selling can create a short position.",
      "Drawing a general performance conclusion from a short, selected or synthetic price sample."
    ],
    "review": "For a TSLA worksheet, compare planned quantity, filled quantity, fee and resulting cash. Explain any changed assumption and include unfavorable outcomes. Compare alternative rules over the same data window rather than changing both the method and the observation period. Trade history records fills; your written rationale remains your responsibility."
  },
  {
    "symbol": "nvda",
    "name": "NVDA",
    "fullName": "Nvidia",
    "type": "stock",
    "whyTrade": "Nvidia supplies computing products and services. Its share price and its operating business are different objects: a change in sales does not translate mechanically into the same percentage stock return.",
    "steps": [
      "Open the free virtual practice terminal for NVDA; no real-money account is created.",
      "Visit /trade/nvda and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Compare the recorded fills and fee-inclusive result with the original assumptions. Add your own explanation to the journal; it is not written automatically."
    ],
    "beginnerTip": "Use NVDA as a worksheet for describing price observations and position arithmetic. An indicator or chart pattern is not a verified entry signal. This terminal does not offer every indicator mentioned in the glossary.",
    "risk": "A NVDA practice loss depends on quantity, price change and costs. Real execution can involve gaps, slippage and liquidity limits that this simulator does not reproduce. Virtual results do not establish a tolerable real-money risk level.",
    "studentNote": "For learners in Sri Lanka or elsewhere, NVDA is an educational catalogue example, not a savings plan or an access recommendation. Local eligibility, funding and tax questions require current official information outside this simulator.",
    "drivers": [
      "Company results, customer spending statements, supply constraints and export rules can provide business context. Verify any current figures from dated primary reports; none of these topics establishes that a trend-following strategy will outperform.",
      "Compare a dated primary description of Nvidia with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "A hypothetical $10,000 NVDA holding rises $200 before costs after a 2% price increase. The simulator purchase fee is $10 at 0.1%. A subsequent decline can exceed an earlier gain; this example is not a weekly-return assumption or target. Review both upward and downward cases using the same quantity. Actual simulator results also include selling fees. A manual exit assumption can be crossed by a price move; it is not a guaranteed maximum loss.",
    "timing": "Venue hours, available liquidity and actual data timestamps are separate from the time you open TradeHQ. The NVDA chart may use provider history or synthetic candles. Consult the displayed status before treating a practice observation as a current-market event; no session or timeframe is presented as the best time to trade.",
    "mistakes": [
      "Treating the displayed NVDA practice price as a guaranteed executable real-market quote.",
      "Confusing position value with maximum loss, or excluding the fees applied on both buys and sells.",
      "Assuming an intended manual exit is a pending stop order, or that selling can create a short position.",
      "Drawing a general performance conclusion from a short, selected or synthetic price sample."
    ],
    "review": "For an NVDA worksheet, compare planned quantity, filled quantity, fee and resulting cash. Explain any changed assumption and include unfavorable outcomes. Compare alternative rules over the same data window rather than changing both the method and the observation period. Trade history records fills; your written rationale remains your responsibility."
  },
  {
    "symbol": "spy",
    "name": "SPY",
    "fullName": "S&P 500 ETF",
    "type": "etf",
    "whyTrade": "SPY is an exchange-traded fund designed to track the S&P 500. An index methodology, a fund holding and a country economy are different things; broad coverage does not remove market losses or concentration.",
    "steps": [
      "Open the free virtual practice terminal for SPY; no real-money account is created.",
      "Visit /trade/spy and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Compare the recorded fills and fee-inclusive result with the original assumptions. Add your own explanation to the journal; it is not written automatically."
    ],
    "beginnerTip": "Use SPY as a worksheet for describing price observations and position arithmetic. An indicator or chart pattern is not a verified entry signal. This terminal does not offer every indicator mentioned in the glossary.",
    "risk": "A SPY practice loss depends on quantity, price change and costs. Real execution can involve gaps, slippage and liquidity limits that this simulator does not reproduce. Virtual results do not establish a tolerable real-money risk level.",
    "studentNote": "For learners in Sri Lanka or elsewhere, SPY is an educational catalogue example, not a savings plan or an access recommendation. Local eligibility, funding and tax questions require current official information outside this simulator.",
    "drivers": [
      "Fund holdings, index methodology, distributions and expenses describe the instrument. Consult current fund documents for those details. An index comparison can be a benchmark, but a short practice sample cannot prove an investing strategy is better.",
      "Compare a dated primary description of S&P 500 ETF with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "A hypothetical $25,000 SPY position falls $500 before costs after a 2% decline. The purchase fee is $25 at 0.1%. The allocation and change are selected arithmetic inputs, not a recommendation to hold a quarter of an account. Review both upward and downward cases using the same quantity. Actual simulator results also include selling fees. A manual exit assumption can be crossed by a price move; it is not a guaranteed maximum loss.",
    "timing": "Venue hours, available liquidity and actual data timestamps are separate from the time you open TradeHQ. The SPY chart may use provider history or synthetic candles. Consult the displayed status before treating a practice observation as a current-market event; no session or timeframe is presented as the best time to trade.",
    "mistakes": [
      "Treating the displayed SPY practice price as a guaranteed executable real-market quote.",
      "Confusing position value with maximum loss, or excluding the fees applied on both buys and sells.",
      "Assuming an intended manual exit is a pending stop order, or that selling can create a short position.",
      "Drawing a general performance conclusion from a short, selected or synthetic price sample."
    ],
    "review": "For a SPY worksheet, compare planned quantity, filled quantity, fee and resulting cash. Explain any changed assumption and include unfavorable outcomes. Compare alternative rules over the same data window rather than changing both the method and the observation period. Trade history records fills; your written rationale remains your responsibility."
  },
  {
    "symbol": "sol",
    "name": "SOL",
    "fullName": "Solana",
    "type": "crypto",
    "whyTrade": "Solana is a blockchain network and SOL is its native token. A TradeHQ holding is a simulated token-price exposure; it does not validate transactions or reproduce staking, network outages or token custody.",
    "steps": [
      "Open the free virtual practice terminal for SOL; no real-money account is created.",
      "Visit /trade/sol and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Compare the recorded fills and fee-inclusive result with the original assumptions. Add your own explanation to the journal; it is not written automatically."
    ],
    "beginnerTip": "Use SOL as a worksheet for describing price observations and position arithmetic. An indicator or chart pattern is not a verified entry signal. This terminal does not offer every indicator mentioned in the glossary.",
    "risk": "A SOL practice loss depends on quantity, price change and costs. Real execution can involve gaps, slippage and liquidity limits that this simulator does not reproduce. Virtual results do not establish a tolerable real-money risk level.",
    "studentNote": "For learners in Sri Lanka or elsewhere, SOL is an educational catalogue example, not a savings plan or an access recommendation. Local eligibility, funding and tax questions require current official information outside this simulator.",
    "drivers": [
      "Network activity, reported reliability incidents and published supply schedules describe different aspects of the ecosystem. Their effect on an exchange price is uncertain. Verify dated claims instead of inferring a predictable price response.",
      "Compare a dated primary description of Solana with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "A hypothetical $12,500 SOL holding declines $1,000 before costs after an 8% price fall. The purchase fee is $12.50 at 0.1%. This chosen example does not say SOL moves twice as far as BTC or establish a safe position size. Review both upward and downward cases using the same quantity. Actual simulator results also include selling fees. A manual exit assumption can be crossed by a price move; it is not a guaranteed maximum loss.",
    "timing": "Venue hours, available liquidity and actual data timestamps are separate from the time you open TradeHQ. The SOL chart may use provider history or synthetic candles. Consult the displayed status before treating a practice observation as a current-market event; no session or timeframe is presented as the best time to trade.",
    "mistakes": [
      "Treating the displayed SOL practice price as a guaranteed executable real-market quote.",
      "Confusing position value with maximum loss, or excluding the fees applied on both buys and sells.",
      "Assuming an intended manual exit is a pending stop order, or that selling can create a short position.",
      "Drawing a general performance conclusion from a short, selected or synthetic price sample."
    ],
    "review": "For a SOL worksheet, compare planned quantity, filled quantity, fee and resulting cash. Explain any changed assumption and include unfavorable outcomes. Compare alternative rules over the same data window rather than changing both the method and the observation period. Trade history records fills; your written rationale remains your responsibility."
  }
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
    example: "Hypothetical worksheet, not an observed trade: Long BTC at $95,120 with stop $95,080, target $95,210 — risking $40 to make $90.",
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
        "Hypothetical arithmetic, not observed performance: fixed realized 57% wins at 1.5R and 43% losses at 1R give 0.57×1.5−0.43=0.425R per trade. An assumed 0.25% of $100,000 is $250, giving $106.25 gross expectancy per trade. Twenty trades imply $2,125 gross expectancy; twenty $3 round trips cost $60, about 2.82% of that amount. Actual gains, fills and costs can differ.",
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
    example: "Hypothetical worksheet, not an observed trade: Bought NVDA at $145 after a pullback, stop $138, target $165 — risked $7 to make $20.",
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
        "Hypothetical arithmetic: fixed realized 47% wins at 2R and 53% losses at 1R give 0.41R gross expectancy per trade. With an arbitrary $1,000 practice loss amount, that is $410 before costs. These assumed inputs do not establish performance. Losing-run probabilities require a sample length and independence assumption; no particular run is guaranteed or universally normal.",
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
    example: "Hypothetical worksheet, not an observed trade: Long SPY at VWAP reclaim, stop below VWAP, target the day's prior high.",
    successRate: "There is no dependable universal win-rate range. Evaluate the method by expectancy, drawdown, costs and consistency across a larger sample.",
    depth: {
      context:
        "Day trading concentrates a whole trading career into single sessions. Because everything is closed by the bell there is no overnight gap risk, but there is also no time for a thesis to recover — the market either agrees with you within hours or it does not. Most of the day's directional movement happens in the opening 90 minutes and the final hour, which is why disciplined day traders trade those windows and stay flat through the low-volume midday drift.",
      regime:
        "Good days have a clear opening drive, expanding range and volume above the recent average. Bad days are narrow, overlapping and volume-starved — typically the sessions before a major holiday or the day before a central-bank decision, when institutions stand aside. Learning to recognise a no-trade day is worth more than any additional indicator.",
      mistakes: [
        "Trading the midday lull out of boredom. Range contracts, stops get hit by noise, and the day's profit from the open is handed back.",
        "Using a fixed dollar stop instead of a structural one. The stop should sit where the idea is wrong — below VWAP, below the opening range — not at an arbitrary loss you find comfortable.",
        "Ignoring the daily loss limit. Two full stops in a session is a signal to close the platform; a third is almost always emotional rather than analytical.",
      ],
      math:
        "Hypothetical arithmetic: fixed realized 52% wins at 1.5R and 48% losses at 1R give 0.30R gross expectancy. An arbitrary 0.5% of $100,000 is $500, so expectancy is $150 per trade and $750 across five trades before costs. This is an input-based worksheet, not observed returns or a slippage estimate.",
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
    example: "Hypothetical schedule: $100 contributed to a selected practice asset each Friday. Record purchase dates, prices and units; no outperformance percentage is established.",
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
        "Hypothetical calculation: $500 deposited at each month end for twenty years with an assumed nominal annual rate of 8%, compounded monthly, gives $500×((1+0.08/12)^240−1)/(0.08/12), about $294,510. Contributions total $120,000. The rate is an arbitrary positive-growth assumption rather than a forecast; fees, taxes, varying returns and contribution timing change the result.",
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
    example: "Hypothetical worksheet, not an observed trade: BTC RSI dips to 26 at $92K with a bullish engulfing — buy, stop $91K, target $94K.",
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
        "Hypothetical comparison: fixed realized 57% wins at 1.2R and 43% losses at 1R give 0.254R gross expectancy. Changing only the assumed win rate to 32% gives 0.32×1.2−0.68=−0.296R. These chosen inputs do not establish the observed profitability of ranging or trending markets; costs and actual fills must also be considered.",
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
    example: "Hypothetical worksheet, not an observed trade: NVDA MACD crosses up at $130 with stop $124 — held for 6 weeks to $165.",
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
        "Hypothetical arithmetic: fixed realized 43% wins at 2.5R and 57% losses at 1R give 0.505R gross expectancy before costs. A planned reward-to-risk ratio is not the realized payoff. Losing-run probabilities depend on sample length, independence and the assumed win rate; a six-to-eight-loss run is not a universally expected outcome.",
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
