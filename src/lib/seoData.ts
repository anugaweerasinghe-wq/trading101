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
  worksheet: string;   // a pair-specific exercise, not a trading recommendation
  sources: { label: string; href: string }[];
}

export const COMPARE_PAIRS: ComparePair[] = [
  {
    slug: "bitcoin-vs-ethereum",
    a: { symbol: "BTC", name: "Bitcoin", tag: "Digital gold" },
    b: { symbol: "ETH", name: "Ethereum", tag: "Smart-contract platform" },
    intro: "Bitcoin and Ethereum are digital networks with different transaction and application designs. Compare their supply rules, uses and costs without treating either token as a savings plan or predicting its price.",
    verdict: "Practice comparison: contrast Bitcoin supply rules and settlement design with Ethereum execution, issuance and staking mechanics. Neither profile establishes the better investment, an assured hedge or future upside.",
    bullets: [
      "Supply: compare Bitcoin issuance rules with Ethereum issuance and fee burning; Ethereum supply changes with network conditions.",
      "Staking: Ethereum rewards, fees, withdrawal arrangements and risks vary; TradeHQ does not model staking returns.",
      "Use case: compare settlement and programmability using each network’s current documentation.",
      "Volatility: compare percentage changes over the same stated sample rather than use a fixed ETH/BTC volatility multiple.",
    ],
    deepDive: [
      "Bitcoin transactions transfer value under rules verified by network participants. Ethereum also supports applications through smart contracts. Those mechanisms raise different research questions: how transactions are validated, what users pay to transact, how protocol changes are adopted and how application execution works. Neither design guarantees demand for its token. Use the network documentation to distinguish technical rules from a claim about savings, purchasing power or future market price.",
      "For a practice comparison, measure BTC and ETH returns over the same observation period. Correlation depends on that sample and can change; two token names do not by themselves establish independent exposures. Record the market-data source, interval and method before interpreting a relationship. Network activity, fees and issuance are additional variables to investigate rather than guaranteed leading indicators. A BTC/ETH split changes weights but does not prove diversification or prescribe a suitable total crypto allocation.",
    ],
    mistakes: [
      "Treating two token names as proof of diversification. Measure correlation over a stated sample and compare combined exposure under different price shocks.",
      "Assuming staking rewards are a guaranteed return. Withdrawal arrangements, validator penalties, service-provider costs and smart-contract risks vary with the method; token-price losses are separate.",
      "Treating a lower unit price as proof of cheaper valuation. Units, circulating supply, issuance and the rights associated with an asset are different measures.",
    ],
    worksheet: "Create separate BTC and ETH columns for transaction validation, network fees, supply changes and custody assumptions. Cite a dated network source for each fact. In a second table, apply the same hypothetical percentage rise and fall to equal starting values, including practice fees. Keep that arithmetic separate from staking income, which TradeHQ does not pay, and from any claim that two tokens provide independent exposures. Add a row distinguishing the simulator transaction fee from a network transaction charge: the former changes virtual cash, while the latter belongs to an external network example. Check whether a quoted network cost uses native units or dollars before comparing it with another network's fee.",
    sources: [
      { label: "Bitcoin: how transactions work", href: "https://bitcoin.org/en/how-it-works" },
      { label: "Ethereum: staking methods and risks", href: "https://ethereum.org/staking/" },
    ],
  },
  {
    slug: "tesla-vs-nvidia",
    a: { symbol: "TSLA", name: "Tesla", tag: "EV + energy + AI" },
    b: { symbol: "NVDA", name: "Nvidia", tag: "Compute products + software" },
    intro: "Tesla reports automotive and energy businesses; NVIDIA sells compute products and supporting software. Compare their business models and current filings rather than treating an AI narrative or a historical beta estimate as a permanent risk label.",
    verdict: "Practice comparison: contrast Tesla automotive and energy assumptions with NVIDIA compute demand and customer concentration. Neither business narrative establishes a superior investment or predictable price response.",
    bullets: [
      "Business mix: compare automotive and energy reporting with compute products and supporting software.",
      "Margins: use comparable periods and segment definitions from current company filings rather than fixed percentages.",
      "Risk: compare demand, spending, competition and execution assumptions with alternative outcomes.",
      "Beta: a beta estimate depends on the benchmark, interval and period; it is not a permanent risk score.",
    ],
    deepDive: [
      "NVIDIA reporting separates compute and networking from graphics and discusses customer concentration. Tesla reporting separates automotive from energy generation and storage. Those categories suggest different questions: how customers fund compute capacity, how consumers and businesses buy vehicles, and how energy demand affects storage orders. Use current filings to measure those contributions instead of assuming a budget change produces an immediate margin or price response.",
      "A useful reporting worksheet separates revenue, margin, capital spending and forward-looking statements. Record how each company defines its segments and whether a margin excludes particular items before comparing numbers. An earnings headline does not reveal all those inputs or establish how the share price will react. Compare reported results with clearly stated prior assumptions; avoid describing a valuation multiple or a market reaction without its date and source.",
    ],
    mistakes: [
      "Treating both companies as one AI exposure. Compare business mix, customer demand and shared market factors rather than assuming their drivers are unrelated.",
      "Treating a beta estimate or a familiar ticker as a guaranteed risk classification. Compare the same benchmark and sample, and consider hypothetical price shocks without prescribing leverage or a fixed drawdown.",
      "Treating a headline earnings beat as a price forecast. Guidance, margins, expectations and wider market conditions can all matter; a positive result does not guarantee a gain.",
    ],
    worksheet: "Choose matching reporting periods from Tesla and NVIDIA. Record each company's segment revenue, the definition of a selected margin and one disclosed demand risk, with page references. Write one alternative outcome for each assumption. Keep delivery counts and compute revenue in their own units; neither is a directly comparable volume measure or a simulated earnings-trading signal. Identify whether each selected figure comes from a quarterly report, annual report or presentation. A quarter and a fiscal year cannot be compared as if they cover the same duration. Preserve the original units and any stated exclusions so that another reader can reconstruct the comparison.",
    sources: [
      { label: "Tesla: quarterly disclosures and filings", href: "https://ir.tesla.com/" },
      { label: "NVIDIA: financial reports", href: "https://investor.nvidia.com/financial-info/financial-reports/default.aspx" },
    ],
  },
  {
    slug: "bitcoin-vs-gold",
    a: { symbol: "BTC", name: "Bitcoin", tag: "Digital store of value" },
    b: { symbol: "GLD", name: "Gold (GLD fund)", tag: "Gold fund exposure" },
    intro: "Gold and Bitcoin have different ownership, custody and market arrangements. A gold fund also differs from physical gold. Compare specified exposures over matching dates; neither a long history nor a digital supply rule guarantees a hedge.",
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
      "Assuming equal dollar positions have equal risk. Compare variability and portfolio contributions under stated data and assumptions; no relative position size is prescribed.",
      "Calling an asset an inflation hedge from one favorable period. Define the inflation measure, dates and specific exposure before evaluating a relationship; it may change in another sample.",
      "Treating a gold fund as physical delivery. Fund expenses, physical storage and Bitcoin custody involve different arrangements and product-specific costs.",
    ],
    worksheet: "Label the gold column GLD fund exposure, not a bar in a vault. Read the fund's expense and custody descriptions alongside Bitcoin's transaction and wallet documentation. Compare equal hypothetical starting values under both rising and falling price scenarios, with a separate column for costs excluded by the simulator. Do not label either result an inflation hedge without matching dated market and inflation data.",
    sources: [
      { label: "SPDR Gold Shares: fund information", href: "https://www.spdrgoldshares.com/usa/" },
      { label: "Bitcoin: transactions and wallets", href: "https://bitcoin.org/en/how-it-works" },
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
    worksheet: "Use Apple and Microsoft filings from comparable reporting periods. Record hardware/services and enterprise/cloud segment definitions, capital spending and share-count changes. Mark any metric that cannot be compared directly. Explain how a share-count change could affect a per-share measure without changing the total business result; do not convert that explanation into a share-price prediction.",
    sources: [
      { label: "Apple: investor reports", href: "https://investor.apple.com/investor-relations/default.aspx" },
      { label: "Microsoft: investor reports", href: "https://www.microsoft.com/en-us/investor/default" },
    ],
  },
  {
    slug: "ethereum-vs-solana",
    a: { symbol: "ETH", name: "Ethereum", tag: "L1 + L2 ecosystem" },
    b: { symbol: "SOL", name: "Solana", tag: "Monolithic high-throughput chain" },
    intro: "Ethereum and Solana use different designs for processing transactions and supporting applications. Compare current network documentation, transaction definitions and fee measurements rather than assigning permanent leadership or token-price upside.",
    verdict: "Practice comparison: contrast network design, execution, reliability and supply assumptions using current Ethereum and Solana documentation. Throughput or a fee comparison does not establish token-price upside.",
    bullets: [
      "Throughput: define transaction type, observation period and inclusion of votes or rollup activity before comparing counts.",
      "Fees: actual fees vary with transaction type and network conditions; no fixed cost range is established here.",
      "Reliability: compare documented incidents and their dates rather than claim that a network has never halted.",
      "Staking: rewards, issuance, fees and operational risks differ; advertised yield is not a guaranteed real return.",
    ],
    deepDive: [
      "A network comparison should identify where execution happens and how results are verified. Ethereum's scaling documentation discusses layer-2 rollups with different security models; a mainnet transaction and a rollup transaction should not be counted interchangeably. Solana's documentation describes its own account and transaction model. Compare a specific operation, confirmation criterion and observation window before quoting throughput or fees. Network requirements, validator participation and reliability need dated evidence rather than permanent rankings.",
      "Network activity and token returns are different measures. A comparison can examine where fees are charged, how supply changes and which security assumptions apply without presuming that greater activity raises price. Staking rewards are denominated in the token and can be affected by costs, issuance, protocol rules and market-price losses. Comparing nominal reward percentages alone does not establish an inflation-adjusted investment return. Document the source and period and separate the network’s design from a forecast of its token’s value.",
    ],
    mistakes: [
      "Choosing on transactions per second alone. Sustained throughput under real load, and what happens when the chain is congested, matter far more than a benchmark figure.",
      "Reading a token reward percentage as a cash return. State the period, token-price change, fees, penalties and supply assumptions; subtracting issuance alone does not calculate an investor's return.",
      "Predicting a token-price response from an outage. Record the incident's date, duration and affected services separately from any claim about adoption or price.",
    ],
    worksheet: "Choose the same type of application operation on Ethereum and Solana. Record whether Ethereum activity is on mainnet or a named layer 2, what each transaction count includes, how confirmation is defined and when fees were measured. Put reliability incidents in a separate dated log. Leave token-price forecasts out of the table: neither a faster operation nor a lower fee establishes investment performance.",
    sources: [
      { label: "Ethereum: scaling and rollup security models", href: "https://ethereum.org/developers/docs/scaling/" },
      { label: "Solana: accounts and transactions", href: "https://solana.com/docs" },
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
      "Identify the instrument before comparing ownership or disclosures. A company share represents equity ownership; an equity fund holds a specified portfolio under its own terms. Bitcoin is a network asset rather than a share in a company. Other crypto products can have different structures, so Bitcoin cannot stand in for every token. Check the actual product documents, custody arrangement and applicable jurisdiction; a category label does not establish voting rights, distributions, legal protection or recovery after a loss.",
      "For a virtual comparison, use equal starting values, matching dates and a stated calculation method. A price-only series and an index with reinvested dividends answer different questions. Measure drawdowns and variability from the same sample rather than repeat a permanent return or maximum-loss percentage. Position weights determine each contribution to a hypothetical loss, but no beginner core/satellite split is universally appropriate. A simulator’s simplified data and fills do not establish that either exposure is suitable for real-money savings.",
    ],
    mistakes: [
      "Treating an index and a token as equivalent exposures. Compare several hypothetical declines and their portfolio contributions without turning one loss percentage into a position-sizing rule.",
      "Generalizing from one observation window. Report the selected dates and compare other samples rather than assume any holding period makes a strategy reliable.",
      "Assuming virtual spot practice reproduces leveraged trading. TradeHQ does not model borrowing agreements, margin calls or forced liquidations.",
    ],
    worksheet: "Use SPY and BTC as named examples, not complete representations of stocks and crypto. Specify whether the equity series includes reinvested distributions, then compare it with a BTC price series over matching dates. Write down holdings, custody and distribution rights from the relevant documents. For hypothetical account arithmetic, show both asset return and total-account return with cash included; do not prescribe an allocation.",
    sources: [
      { label: "Investor.gov: stock ownership and risks", href: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks" },
      { label: "Bitcoin: network transactions", href: "https://bitcoin.org/en/how-it-works" },
    ],
  },
  {
    slug: "nvidia-vs-amd",
    a: { symbol: "NVDA", name: "Nvidia", tag: "Compute hardware + CUDA" },
    b: { symbol: "AMD", name: "AMD", tag: "Compute hardware + ROCm" },
    intro: "NVIDIA and AMD sell compute products with different hardware and software ecosystems. Compare reported product mix, demand and costs using matching periods instead of treating a roadmap or a competitive narrative as an investment conclusion.",
    verdict: "Practice comparison: examine product mix, software support, customer demand and reported costs. Neither incumbency nor a challenger narrative establishes compounding dominance or greater share-price upside.",
    bullets: [
      "Software: compare current product documentation and compatibility rather than presume permanent developer lock-in.",
      "Margins: use current company filings with matching periods and segment definitions.",
      "Valuation: calculate a stated valuation measure from dated inputs; it is not a permanent premium.",
      "Demand: compare reported compute spending and competing outcomes; share gains do not guarantee a stock re-rating.",
    ],
    deepDive: [
      "Hardware and software should be examined together. For a stated workload, check supported models, libraries, numerical precision, memory and deployment requirements in each vendor's documentation. Then separate those compatibility findings from company-level revenue, costs and customer risks in the filings. A benchmark result describes its test setup; it does not establish purchasing decisions, a permanent software advantage or future market share. Version and date the comparison because supported products and tools change.",
      "A market-share hypothesis and a stock-price response are different propositions. Compare what was known before an announcement with alternative expectations and reported results. Customer spending, supply, competition, software compatibility and costs can affect both companies, but that does not establish a predictable asymmetric reaction. A price already reflects changing expectations, and a positive business development need not produce a gain. Use matched reporting periods and dated inputs when comparing valuation or profitability.",
    ],
    mistakes: [
      "Treating one benchmark as proof of market share. Check the workload, software version, availability and disclosed customer arrangements separately.",
      "Calling two compute stocks a guaranteed hedge. Shared demand factors do not establish equal or opposite price responses; TradeHQ does not open short positions.",
      "Extrapolating one quarter's growth indefinitely. Compare several dated reports and distinguish reported results from a forecast.",
    ],
    worksheet: "Select one workload and record the supported hardware and software versions for NVIDIA and AMD before comparing a benchmark. In a separate filings table, record segment definitions, costs and disclosed customer risks for matching periods. Mark missing data explicitly. A software compatibility result and a revenue figure answer different questions; neither is a forecast of market share or the next share-price move. For a performance result, record the test author, precision, batch size and hardware configuration. Distinguish a vendor demonstration from an independently reproduced measurement. If those details are unavailable, leave the comparison unresolved rather than infer a winner from a headline, and explain which missing input prevents a fair comparison.",
    sources: [
      { label: "NVIDIA: financial reports", href: "https://investor.nvidia.com/financial-info/financial-reports/default.aspx" },
      { label: "AMD: SEC filings", href: "https://ir.amd.com/financial-information/sec-filings" },
      { label: "NVIDIA: CUDA documentation", href: "https://docs.nvidia.com/cuda/" },
      { label: "AMD: ROCm documentation", href: "https://rocm.docs.amd.com/en/latest/" },
    ],
  },
  {
    slug: "forex-vs-stocks",
    a: { symbol: "FX", name: "Forex", tag: "24/5 currency markets" },
    b: { symbol: "Stocks", name: "Equities", tag: "Company ownership" },
    intro: "A currency pair quotes one currency relative to another; a share represents company ownership. Their trading arrangements and information differ. Neither category has a universally slower price path or rewards a particular skill set reliably.",
    verdict: "Practice comparison: distinguish relative currency prices from company ownership and cash flows. Neither instrument category guarantees wealth compounding or suits every short-term trader.",
    bullets: [
      "Turnover: any comparison needs a dated survey and matching definitions; no permanent daily dollar total is asserted here.",
      "Leverage: permitted leverage depends on jurisdiction, product and provider, and does not establish appropriate exposure.",
      "Hours: currency and equity venue schedules, holidays and extended-hours arrangements differ.",
      "Analysis: macroeconomic and company information can inform hypotheses without establishing a dependable trading edge.",
    ],
    deepDive: [
      "A EUR/USD quote expresses dollars per euro; a stock price expresses currency per share. Neither unit should be confused with the whole account's return. Currency research can examine dated policy and economic information, while stock research can examine company reports, but neither approach guarantees a dependable price response. A pair can trend or fluctuate over a selected period; it has no obligation to return to a chosen average. Identify the instrument and calculation units before comparing outcomes.",
      "Leverage increases gains and losses relative to the funds committed, and requirements depend on the product, jurisdiction and provider. A quoted price’s usual daily range does not establish a safe leverage level or explain a universal share of account losses. For a learning exercise, compare hypothetical unleveraged exposures and record how a price shock changes account value. TradeHQ uses simplified spot practice, so it does not reproduce a margin agreement, forced liquidation or every currency execution condition.",
    ],
    mistakes: [
      "Treating available leverage or a stop distance as proof of safety. A stop trigger does not guarantee execution at a chosen price; TradeHQ does not place resting stops or model margin contracts.",
      "Inferring a real news reaction from a simulated chart. A scheduled release needs dated external observations and venue conditions to support an event study.",
      "Confusing quote units with company ownership. Currency appreciation and retained company earnings describe different mechanisms; neither guarantees an account gain.",
    ],
    worksheet: "Choose a named pair such as EUR/USD and a named equity such as AAPL from the practice terminal. Write dollars per euro and dollars per share next to their hypothetical prices, then calculate quantity times price using those units. Apply positive and negative price changes without leverage. Keep company distributions, currency conversion costs and real venue execution in separate fields when they are excluded from the exercise.",
    sources: [
      { label: "TradeHQ: order mechanics and execution limits", href: "/learn/market-orders-vs-limit-orders" },
      { label: "Investor.gov: stocks and ownership", href: "https://www.investor.gov/introduction-investing/investing-basics/investment-products/stocks" },
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
      "Compare the coin’s percentage change with whole-account return using cash and holding values.",
      "Visit /trade/btc and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Write the position’s percentage move, dollar change and whole-account return on separate lines. Recompute allocation using the new total. Then reconcile fees and inspect observation age. This review prevents a profitable asset move from being mistaken for an equally large account return, and preserves unfavorable as well as favorable cases."
    ],
    "beginnerTip": "Begin with the difference between coin return and account return. A hypothetical 10% BTC rise applied to a $10,000 holding adds $1,000 before costs, while an otherwise cash-only $100,000 account rises only 1%. The same headline percentage can therefore describe a much larger asset move than portfolio move.",
    "risk": "BTC price risk and quote-data risk are distinct. A correctly identified asset can still have an older provider observation; a recent page fetch does not make that observation current. A small BTC weight can limit its contribution to one assumed account move, but it cannot prevent the holding from losing value. Real execution is not reproduced by a paper mark.",
    "studentNote": "A short BTC study session can focus on one unit conversion: coin quantity × dollars per coin. Keep virtual accounting separate from questions about real wallets, local access or funding. The practice account holds no real coins and makes no on-chain transfer; current eligibility and tax questions belong to official local information.",
    "drivers": [
      "Compare the protocol supply schedule, exchange trading activity and news claims as separate sources of information. A halving event does not by itself determine the direction or timing of a price change.",
      "Compare a dated primary description of Bitcoin with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "Use a hypothetical $100,000 account with $90,000 cash and a $10,000 BTC holding before fees. A selected 10% BTC rise takes the holding to $11,000 and total value to $101,000, before excluded costs. The asset return is 10%; account return is 1%. The current holding weight is $11,000 ÷ $101,000 = about 10.89%, not 11% of the original balance. If the $10,000 purchase incurred the simulator’s 0.1% fee, cash would instead be $89,990 and total marked equity $100,990. These inputs teach accounting rather than recommend exposure.",
    "timing": "Compare BTC’s provider observation timestamp with the chart’s source label. A periodically refreshed reference can differ from a venue’s last trade or a different-minute quote without proving either is fraudulent. Save the observation time used in your worksheet so that a later account change can be reconstructed. Opening the page is not an exchange fill.",
    "mistakes": [
      "Reporting the BTC return as the entire account return despite a large cash balance.",
      "Calculating new allocation with the original account denominator.",
      "Calling an aggregate provider mark a reserved exchange fill.",
      "Ignoring both buy and sell fees in the result."
    ],
    "review": "Write the position’s percentage move, dollar change and whole-account return on separate lines. Recompute allocation using the new total. Then reconcile fees and inspect observation age. This review prevents a profitable asset move from being mistaken for an equally large account return, and preserves unfavorable as well as favorable cases."
  },
  {
    "symbol": "eth",
    "name": "ETH",
    "fullName": "Ethereum",
    "type": "crypto",
    "whyTrade": "Ethereum is a network for running applications and smart contracts; ether, or ETH, is its native currency. People use ETH to pay network fees, transfer value and participate in staking. Trading ETH means exchanging that currency at a market price. TradeHQ lets you practise the price and quantity calculations with virtual funds; it does not send coins to a wallet or stake them.",
    "steps": [
      "Keep ETH quantity, simulator transaction fees and conceptual network charges in separate ledger fields.",
      "Visit /trade/eth and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "After the exercise, reconcile ETH units, notional cost, simulator fee and cash separately. If the quote moves $100 per ETH and you own 2 ETH, the gross marked change is $200. A gas-charge discussion belongs in a separate network worksheet. Check that neither staking income nor a wallet transfer was invented in the virtual ledger."
    ],
    "beginnerTip": "Separate the network from the currency: Ethereum is the system, while ETH is the unit whose price you see. A lower price per coin than BTC does not by itself mean ETH is cheaper in valuation terms.",
    "risk": "Network fees, staking mechanics and ETH market-price exposure are different risks and activities. TradeHQ illustrates only the supported virtual spot accounting; it does not stake ETH, transfer coins or pay staking rewards. A correct network explanation cannot establish which direction the market price will move. Include the actual simulator fees when assessing a paper outcome.",
    "studentNote": "Use this guide to learn the difference between Ethereum as a network and ETH as a unit. A classroom example can compare exchange fees and hypothetical network charges without funding a wallet. Local real-asset access, eligibility and taxes require current official sources; a simulator lesson is not permission to transact.",
    "drivers": [
      "Network use and ETH price measure different things. Gas is the unit used to measure transaction work; the network fee is paid in ETH. A busy network can change fees without producing a matching percentage change in the exchange price.",
      "Staking helps secure Ethereum, while layer-two networks handle activity with a different fee structure. These concepts explain how the network works; a TradeHQ price chart does not measure staking rewards, network demand or the effect of a particular headline."
    ],
    "firstTrade": "For a hypothetical buy of 2 ETH at $2,500 per ETH, notional is $5,000 and the simulator’s 0.1% purchase fee is $5. The cash debit is $5,005. If the later quote is $2,400, the marked holding is $4,800, giving a $200 price loss and $205 equity reduction after the purchase fee. A sale at that quote would add a $4.80 exit fee. A separately quoted blockchain gas fee is not a simulator cost: this paper buy did not create a network transaction or send ETH to a wallet.",
    "timing": "A provider can aggregate ETH market observations while a blockchain explorer describes network activity. Match the question to the source: exchange-price timestamps for paper valuation, network records for transaction mechanics. Do not use a synthetic practice candle as evidence that a gas-fee change caused a real price reaction.",
    "mistakes": [
      "Adding a real blockchain gas charge to a paper buy that sent no coins.",
      "Describing virtual ETH as staked funds earning rewards.",
      "Comparing whole-coin prices as if they establish relative business valuation.",
      "Mixing dollar loss with loss per ETH unit."
    ],
    "review": "After the exercise, reconcile ETH units, notional cost, simulator fee and cash separately. If the quote moves $100 per ETH and you own 2 ETH, the gross marked change is $200. A gas-charge discussion belongs in a separate network worksheet. Check that neither staking income nor a wallet transfer was invented in the virtual ledger."
  },
  {
    "symbol": "tsla",
    "name": "TSLA",
    "fullName": "Tesla",
    "type": "stock",
    "whyTrade": "Tesla is a listed company. A simulated TSLA holding represents a stock-price exercise and does not provide options exposure, voting rights or actual share ownership. Company results and delivery reports are different information sets.",
    "steps": [
      "Write the report metric you intend to investigate and a separate hypothetical gap case before viewing the outcome.",
      "Visit /trade/tsla and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Compare the original thesis with the information actually available before the exercise. Did you mean delivery volume, revenue or margins? Reconstruct shares, assumed entry, observed mark and fees. Keep the gap case even if it contradicts the intended exit, and do not rewrite a winning trade’s reason after seeing its result."
    ],
    "beginnerTip": "Read deliveries, revenue and profit margins as separate measurements. A hypothetical rise in units delivered does not imply the same rise in revenue, because prices and product mix can change. A stock-price reaction also depends on expectations that a short headline may omit.",
    "risk": "An event-sensitive stock worksheet should distinguish a chosen exit threshold from the next observed price. A gap can cross the threshold, and a journal note is not an automated order. Delivery growth alone cannot validate a price target. The simulator does not reproduce real opening-auction fills, shareholder rights or options exposure.",
    "studentNote": "A TSLA study task can separate an observable report metric from an interpretation: “deliveries rose” is different from “profit must rise” or “the stock must rally.” Use a dated primary company record when investigating those claims. Virtual shares do not establish real ownership, market access or local eligibility.",
    "drivers": [
      "Distinguish reported deliveries, revenue, margins and management statements. Their relationship with the share price is uncertain and can change; no single announcement guarantees a direction or magnitude.",
      "Compare a dated primary description of Tesla with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "Suppose a conceptual TSLA worksheet holds 20 shares at $200, a $4,000 notional. The 0.1% simulator buy fee is $4. For a selected gap to $180, the mark becomes $3,600 and the gross price loss is $400. A note saying “exit at $190” would not guarantee a $200 loss: TradeHQ has no resting stop order, and the worksheet’s $180 observation has already crossed that intended threshold. Record the $200 planned threshold loss and $400 stressed price loss as different assumptions, then include fees when reviewing net equity.",
    "timing": "Attach a date and reporting period to any delivery or earnings evidence. Then note whether the chart represents provider history or synthetic practice candles. A company report and a quote fetched afterward can be associated in time without establishing a single proven cause for the movement. Preserve the original hypothesis before reading the outcome.",
    "mistakes": [
      "Treating delivery volume as interchangeable with revenue or profit.",
      "Calling a journal exit threshold an executed stop order.",
      "Deleting a gap case because it exceeded the chosen worksheet loss.",
      "Inventing a report-based reason after seeing the stock movement."
    ],
    "review": "Compare the original thesis with the information actually available before the exercise. Did you mean delivery volume, revenue or margins? Reconstruct shares, assumed entry, observed mark and fees. Keep the gap case even if it contradicts the intended exit, and do not rewrite a winning trade’s reason after seeing its result."
  },
  {
    "symbol": "nvda",
    "name": "NVDA",
    "fullName": "Nvidia",
    "type": "stock",
    "whyTrade": "Nvidia supplies computing products and services. Its share price and its operating business are different objects: a change in sales does not translate mechanically into the same percentage stock return.",
    "steps": [
      "List direct company exposure and any assumed fund overlap before computing the combined account weight.",
      "Visit /trade/nvda and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Review both the direct holding and any assumed fund overlap. Record whether fund weights were actual dated inputs or deliberately hypothetical. Recompute the account denominator after price changes, and separate operating metrics from share-price results. The goal is a reproducible exposure explanation, not a claim that two technology labels imply diversification."
    ],
    "beginnerTip": "Separate company operating measures from the share-price return. A hypothetical 20% sales increase and a 5% stock decline can coexist when expectations, costs or guidance differ. The price observation alone does not tell you which explanation is correct.",
    "risk": "Direct NVDA shares can overlap a technology or broad-market fund you also hold. Row count is therefore an incomplete diversification measure. Inspect actual fund weights and their dates before computing look-through exposure. Company sales growth and diversification labels do not guarantee protection from losses or a positive share-price response.",
    "studentNote": "A useful NVDA learning task can be done without a directional bet: compare the meaning of sales, earnings and market capitalization, then calculate a small hypothetical holding. Real share access and local obligations are separate questions. A virtual price gain does not verify an ability to assess a company’s fair value.",
    "drivers": [
      "Company results, customer spending statements, supply constraints and export rules can provide business context. Verify any current figures from dated primary reports; none of these topics establishes that a trend-following strategy will outperform.",
      "Compare a dated primary description of Nvidia with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "Imagine a $10,000 worksheet with $2,000 held directly in NVDA and $8,000 in a fund. Assume, only for this exercise, that the fund has a 10% NVDA weight. The indirect exposure is $800, so combined NVDA exposure is $2,800, or 28% of total value. Counting two account rows misses this overlap. A selected 10% NVDA fall contributes $280 of loss through the two exposures if other holdings stay unchanged and weights are fixed. Real fund weights need a dated holdings source; the assumed 10% is not a current portfolio fact.",
    "timing": "Distinguish a dated financial statement, guidance and an intraday price quote. They answer different questions and update on different schedules. A synthetic chart cannot validate a claim about customer demand. In a report exercise, write what the market was expected to learn as well as what the company announced.",
    "mistakes": [
      "Counting a fund and direct shares as wholly independent exposures.",
      "Using an undated assumed fund weight as a current fact.",
      "Assuming a sales-growth percentage dictates the stock-return percentage.",
      "Inferring fair value from the nominal price of one share."
    ],
    "review": "Review both the direct holding and any assumed fund overlap. Record whether fund weights were actual dated inputs or deliberately hypothetical. Recompute the account denominator after price changes, and separate operating metrics from share-price results. The goal is a reproducible exposure explanation, not a claim that two technology labels imply diversification."
  },
  {
    "symbol": "spy",
    "name": "SPY",
    "fullName": "S&P 500 ETF",
    "type": "etf",
    "whyTrade": "SPY is an exchange-traded fund designed to track the S&P 500. An index methodology, a fund holding and a country economy are different things; broad coverage does not remove market losses or concentration.",
    "steps": [
      "Identify fund units and current account weight; label any distribution or fund-expense concepts not simulated.",
      "Visit /trade/spy and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Review units, the marked price and whole-account exposure separately. Explain how the $100 holding loss becomes a much smaller account percentage because most of this worksheet is cash. Include fees and note any distribution or expense mechanics excluded from the simulator rather than silently inventing cash entries."
    ],
    "beginnerTip": "An ETF unit represents fund exposure; it is not a direct account row for each constituent company. Nominal share price also differs from the dollars you hold. Twenty $50 units and two $500 units both make $1,000 positions before fees.",
    "risk": "A broad fund can reduce exposure to one company while remaining exposed to market losses and overlap with direct stocks. Diversification is not immunity. Actual fund constituents and weights require dated disclosures, and a fixed index name does not establish that every constituent contributes equally to your result.",
    "studentNote": "SPY can teach the distinction between an index, a fund and a virtual holding. A learner can inspect a dated fund description and calculate a hypothetical exposure without acquiring real units. The worksheet is not a claim about local fund eligibility, investment suitability or tax treatment.",
    "drivers": [
      "Fund holdings, index methodology, distributions and expenses describe the instrument. Consult current fund documents for those details. An index comparison can be a benchmark, but a short practice sample cannot prove an investing strategy is better.",
      "Compare a dated primary description of S&P 500 ETF with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "A hypothetical SPY worksheet holds ten units at $500, or $5,000, while the account has $95,000 cash before purchase fees. A selected 2% price decline changes the holding to $4,900: a $100 price loss, or 0.1% of the original $100,000 account. The simulator purchase fee on $5,000 is $5. If marked at the lower quote after that fee, equity would be $99,895. Fund-level holdings, distributions and expenses are separate concepts; this simple paper mark does not reproduce a complete fund accounting statement.",
    "timing": "A recently fetched fund quote can still refer to an earlier market observation, particularly outside the relevant session. Read the source and observation time rather than calling a weekend page refresh a new trade. The simulator’s chart status also determines whether candles are provider history or synthetic practice inputs.",
    "mistakes": [
      "Describing fund units as direct ownership of every index constituent.",
      "Treating a broad-market fund as unable to lose value.",
      "Ignoring overlap between the fund and separately held company shares.",
      "Inventing a cash distribution that the simulator did not record."
    ],
    "review": "Review units, the marked price and whole-account exposure separately. Explain how the $100 holding loss becomes a much smaller account percentage because most of this worksheet is cash. Include fees and note any distribution or expense mechanics excluded from the simulator rather than silently inventing cash entries."
  },
  {
    "symbol": "sol",
    "name": "SOL",
    "fullName": "Solana",
    "type": "crypto",
    "whyTrade": "Solana is a blockchain network and SOL is its native token. A TradeHQ holding is a simulated token-price exposure; it does not validate transactions or reproduce staking, network outages or token custody.",
    "steps": [
      "Verify the provider asset identifier, source and observation timestamp; do not turn missing data into zero.",
      "Visit /trade/sol and read the quote and chart data-status labels; they may have different provenance.",
      "Choose hypothetical quantity and price assumptions, then calculate position value and the 0.1% practice fee before submitting a market order.",
      "Record the reason for the exercise and any intended manual exit. TradeHQ does not place resting limit or stop orders or open short positions.",
      "Reconstruct quantity, asset identifier, price source and observation time before interpreting gains or losses. If there was a timeout or fallback, state what was known and what remained unavailable. Include fees only for actual recorded virtual transactions; quote refreshes do not buy or sell your SOL units."
    ],
    "beginnerTip": "Check the explicit provider asset identifier rather than trusting a ticker match. A short symbol can be reused by unrelated projects. The correct arithmetic with another project’s price still produces a wrong portfolio value.",
    "risk": "Project identity, market price and network operation are different inputs. An unavailable price request does not establish a network outage, and a network incident does not guarantee a particular rebound. A provider observation can also be stale even when successfully fetched. Preserve these distinctions when describing a paper result.",
    "studentNote": "Use SOL as a case for distinguishing data availability from asset performance. A practice portfolio update needs a valid mapped observation; it is not a blockchain transfer and does not create a real wallet balance. Local access and legal questions should be checked with current official information outside the worksheet.",
    "drivers": [
      "Network activity, reported reliability incidents and published supply schedules describe different aspects of the ecosystem. Their effect on an exchange price is uncertain. Verify dated claims instead of inferring a predictable price response.",
      "Compare a dated primary description of Solana with the practice chart. A simulated movement is not evidence that a particular news item changed the real market price."
    ],
    "firstTrade": "Take a hypothetical holding of 25 SOL units. A valid provider observation of $100 gives a $2,500 mark. If a later request times out, it supplies no new price; converting the empty response to zero would fabricate a $2,500 loss. Retain the last valid observation with its age and failure label until usable data arrives. If the supported mapping instead uses a fixed simulator fallback, label that fixed input plainly. Neither case means the real market stopped moving. This worksheet is about data handling, not a claim about present network availability.",
    "timing": "Compare the provider observation time, page fetch time and any separate network-status evidence. Do not substitute one timestamp for another. The chart may use provider history or synthetic candles, so use its label before connecting a displayed movement with a real network event or application-usage claim.",
    "mistakes": [
      "Matching a reused ticker without checking the provider identifier.",
      "Treating a timeout as a zero quote.",
      "Labelling a fixed fallback as a fresh real-market observation.",
      "Calling a price-request error evidence of a blockchain incident."
    ],
    "review": "Reconstruct quantity, asset identifier, price source and observation time before interpreting gains or losses. If there was a timeout or fallback, state what was known and what remained unavailable. Include fees only for actual recorded virtual transactions; quote refreshes do not buy or sell your SOL units."
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
      "Choose and document a hypothetical risk amount for the worksheet; no percentage is universally suitable.",
      "Compare chosen exit distances with a stated volatility calculation; a 1.5x ATR setting is an example, not a validated default.",
      "Test fixed exits, partial exits and trailing exits separately so you can compare how each rule behaves in simulation.",
    ],
    example: "Hypothetical worksheet, not an observed trade: Bought NVDA at $145 after a pullback, stop $138, target $165 — risked $7 to make $20.",
    successRate: "Performance depends on market regime, entry/exit rules, costs and sample size. Use the simulator to measure your own distribution of outcomes.",
    depth: {
      context:
        "Swing trading sits between day trading and investing: positions are held long enough for a thesis to play out, short enough that a single position is never a life decision. A scheduled review can fit some learners’ routines, but holdings remain exposed between observations and suitability cannot be inferred from employment status. The trade-off is overnight risk — earnings, macro prints and weekend headlines all move price while your stop cannot protect you at the exact level you set.",
      regime:
        "It performs when a market is trending on the daily chart with regular pullbacks: think large-cap tech in an uptrend, or a major FX pair in a sustained rate-differential move. It performs badly in tight, headline-driven chop where every pullback becomes a reversal, and around earnings, where a single gap can exceed several planned stops.",
      mistakes: [
        "Treating a round-number exit or a volatility multiple as guaranteed protection. Compare alternative distances and include gaps and costs.",
        "Holding through earnings on a full-size position because 'it should beat'. Compare several explicitly hypothetical exposures and gap outcomes before reviewing the original thesis.",
        "Adding to a losing swing. Averaging down converts a defined-risk trade into an undefined one, and can increase exposure while the original thesis weakens.",
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
    worstFor: "Learners whose schedule cannot support the chosen observation window.",
    steps: [
      "Define a session window for the worksheet and compare its actual volume, spreads and events with other windows.",
      "Use the 5-min chart with VWAP.",
      "Use a deliberately small and consistent simulated risk budget, and set a session limit that you can evaluate afterwards.",
      "Close everything before the close — no overnight exposure.",
      "End every day with a journal entry: what worked, what didn't, what to cut tomorrow.",
    ],
    example: "Hypothetical worksheet, not an observed trade: Long SPY at VWAP reclaim, stop below VWAP, target the day's prior high.",
    successRate: "There is no dependable universal win-rate range. Evaluate the method by expectancy, drawdown, costs and consistency across a larger sample.",
    depth: {
      context:
        "Day trading concentrates a whole trading career into single sessions. Because everything is closed by the bell there is no overnight gap risk, but there is also no time for a thesis to recover — the market either agrees with you within hours or it does not. Activity and execution conditions vary across assets, sessions and events. Compare a dated sample instead of assuming that one universally best hour establishes an edge.",
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
        "Dollar-cost averaging removes the hardest variable in investing: timing. By committing a fixed amount on a fixed schedule you automatically buy more units when prices are low and fewer when they are high, and you never have to form a view about the next three months. A comparison with a lump sum depends on when funds become available, the market path, costs and dates. A fixed schedule does not guarantee better returns or continued participation during a drawdown.",
      regime:
        "It is designed for broad, diversified, long-lived assets — a total-market or S&P 500 index fund, and for those who accept the volatility, a small allocation to a major crypto asset. It is not designed for single stocks, leveraged products, or anything that can go to zero, because averaging into a permanently impaired asset just buys more of a losing position.",
      mistakes: [
        "Pausing contributions during a crash. That is precisely when the schedule is buying the cheapest units; stopping converts a mechanical plan into market timing.",
        "DCA-ing into a single speculative name and calling it investing. Repeated purchases do not establish that an asset will recover. Diversified indexes can also decline over an observation period.",
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
        "MACD subtracts a 26-period exponential moving average from a 12-period average and compares the result with a 9-period signal line. These historical inputs create lag. A crossover can persist or reverse; the calculation does not establish a win rate, profitability or how many false starts a rule filters.",
      regime:
        "It performs in markets that trend persistently on the daily chart — index ETFs, mega-cap equities, major commodities in a supply cycle. It performs badly in range-bound conditions, where the signal line crosses back and forth and each whipsaw costs a full stop. A rule restricting long crosses to prices above a 200-day average is another hypothesis to compare, not a verified improvement.",
      mistakes: [
        "Trading every cross. The outcome depends on the sample, costs and exit rules; no location accounts for the bulk of losses in every backtest.",
        "Exiting winners at a fixed target. A fixed target changes realized payoff sizes. Compare that rule with another exit under the same data and costs instead of assuming an edge.",
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
