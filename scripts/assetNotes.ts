/**
 * Hand-written, instrument-specific practice notes for every indexable
 * /trade/:id page. These replace asset-class boilerplate so no two
 * instrument pages share the same paragraphs or checklist lines.
 * Facts are general and verifiable; nothing here is a forecast.
 */
export interface AssetNote {
  why: string;
  watch: string;
  gap: string;
  checklist: string[];
}

export const ASSET_NOTES: Record<string, AssetNote> = {
  btc: {
    why: "Bitcoin is usually the first crypto asset beginners open, which makes it a useful baseline: most other coins are quoted against it, and when it moves sharply the rest of the market tends to follow. Learning to read its rhythm first makes every altcoin chart easier to interpret.",
    watch: "Its supply schedule is fixed in code and the issuance rate halves roughly every four years, so long-term narratives often revolve around those halving dates. In the short term, spot ETF flows, US dollar strength and broad risk appetite are the forces commentators cite most often.",
    gap: "A practice fill on Bitcoin is instant and free. On a real exchange you pay trading fees, sometimes network fees to move coins, and you take on custody risk. Practise as if each round trip costs you something, because in reality it does.",
    checklist: [
      "Mark the previous week's high and low before you look at today's candles.",
      "Decide whether you are reacting to a weekend move — Bitcoin trades 24/7 and weekend volume is often thinner.",
      "Write down what a 15% drop would do to your practice balance before you size the order.",
    ],
  },
  eth: {
    why: "Ethereum is a programmable network, so its price reflects both speculation and demand for block space used by applications. Practising on it teaches you how a platform asset differs from a pure store-of-value narrative.",
    watch: "Network upgrades, staking participation and fee activity are recurring themes in Ethereum news. Its price also frequently tracks Bitcoin's direction with a larger percentage swing, which is worth noticing before you assume a move is Ethereum-specific.",
    gap: "Real Ethereum transactions require gas fees that vary with network congestion, and staking locks capital in ways a simulator cannot represent. Treat practice results as evidence about your decision process, not your expected returns.",
    checklist: [
      "Compare the day's ETH move with BTC's before deciding the cause is Ethereum news.",
      "Note any scheduled network upgrade dates in your journal.",
      "Use a smaller size than you would for Bitcoin; percentage swings are usually larger.",
    ],
  },
  sol: {
    why: "Solana is a younger, higher-throughput blockchain, and its token tends to move faster than the two largest coins in both directions. It is a good instrument for learning how much smaller position sizes need to be when volatility rises.",
    watch: "Ecosystem activity, network reliability and broader appetite for speculative crypto assets are the themes most often discussed. Past network outages are part of its history and are a reminder that technical risk exists alongside price risk.",
    gap: "Smaller-cap crypto assets can have thinner order books on some venues, so a real market order may fill noticeably worse than the quoted price. The simulator fills at the displayed price; real life often does not.",
    checklist: [
      "Halve the size you would use on Bitcoin and see whether the swing still feels comfortable.",
      "Check whether the whole crypto market moved or only SOL.",
      "Set your exit before entry — fast assets punish decisions made mid-move.",
    ],
  },
  xrp: {
    why: "XRP is closely associated with cross-border payments and has a long history of price reactions to legal and regulatory headlines. Practising on it shows how news-driven an asset can be compared with one driven mainly by flows.",
    watch: "Regulatory developments, particularly in the United States, have historically produced some of XRP's sharpest moves. Large holder activity and exchange listings are other topics that appear frequently in coverage.",
    gap: "Headline-driven gaps are hard to simulate honestly — in a real market a stop can be skipped entirely during a news spike. Assume your practice stops are more reliable than a live one would be.",
    checklist: [
      "Look up whether any legal or regulatory event is scheduled this week.",
      "Avoid entering in the first minutes after a headline; note what happens instead.",
      "Record why you expect the move to continue, in one sentence.",
    ],
  },
  bnb: {
    why: "BNB is tied to a single large exchange ecosystem and its own chain, which makes it an instructive example of how company-specific developments can move a crypto asset.",
    watch: "Exchange-related news, token burn announcements and activity on BNB Chain are the recurring talking points. Because its fortunes are linked to one organisation, concentration risk is part of the learning point.",
    gap: "Depending on where you live, access to the associated exchange may be restricted, and fees differ between venues. The simulator ignores jurisdiction; real trading does not.",
    checklist: [
      "Write down which organisation-level risk could affect the price before entering.",
      "Compare its weekly move against BTC to see how independent it really is.",
      "Keep this position small relative to your broader practice portfolio.",
    ],
  },
  nvda: {
    why: "NVIDIA's chips sit at the centre of AI and data-centre demand, so its share price has become a bellwether for the whole AI theme. That makes it a useful case study in how expectations, not just results, drive a stock.",
    watch: "Quarterly earnings and forward guidance produce its largest scheduled moves. Large technology customers' capital-spending plans and export restrictions on advanced chips are other frequently cited drivers.",
    gap: "Real earnings-night gaps can open far beyond a stop. In practice, try holding through one report at a deliberately tiny size to experience how far the open can move from the previous close.",
    checklist: [
      "Find the next earnings date and decide whether you will hold through it.",
      "Note how far the stock has moved over the last month before chasing it.",
      "Size so that a 10% gap would cost no more than you have pre-decided.",
    ],
  },
  aapl: {
    why: "Apple is one of the largest companies in the world and among the most widely held stocks, so it tends to move more steadily than smaller tech names. It is a good place to practise patience rather than speed.",
    watch: "Product cycles, services revenue and results from its largest markets, including China, are the themes most coverage returns to. Its annual autumn product event and quarterly reports are predictable calendar dates.",
    gap: "Because Apple is so liquid, real fills are usually close to quoted prices — the bigger gap between practice and reality here is emotional: holding a large position in a household name can feel safer than it is.",
    checklist: [
      "Mark the date of the next product event and earnings report.",
      "Compare its move to the broader Nasdaq before attributing it to Apple news.",
      "Decide on a review date, not just a price target.",
    ],
  },
  tsla: {
    why: "Tesla is one of the most debated stocks on any market, with unusually large daily swings for a company of its size. Practising here teaches you how sentiment and narrative can dominate fundamentals over short periods.",
    watch: "Quarterly delivery figures, earnings, margins and public statements from its chief executive all tend to move the price. Competition in electric vehicles and progress on autonomy are recurring debates.",
    gap: "Tesla's volatility makes real stops prone to slippage, and social-media sentiment can make holding a losing position harder than it looks on a practice screen.",
    checklist: [
      "Check the date of the next quarterly delivery report.",
      "Use a smaller size than you would for Apple or Microsoft.",
      "Write down whether your idea is based on a headline or on the chart.",
    ],
  },
  amzn: {
    why: "Amazon combines retail, advertising and the AWS cloud business, so the share price reflects several very different businesses at once. Learning which segment the market is focused on is the core skill here.",
    watch: "AWS growth rates, retail margins and advertising revenue are the segments analysts discuss most in each quarterly report. Consumer spending trends around major shopping seasons also attract attention.",
    gap: "A practice account makes holding through earnings painless; in reality, a large gap after a cloud-growth miss can be stressful. Treat earnings as a separate decision from the trade itself.",
    checklist: [
      "Identify which business segment today's news is about.",
      "Look at how the stock reacted to its last two earnings reports.",
      "Set an exit rule before the report, not after.",
    ],
  },
  msft: {
    why: "Microsoft is a diversified software and cloud company with recurring enterprise revenue, which historically has made it one of the steadier large-cap technology stocks. It is useful for practising longer holding periods.",
    watch: "Azure cloud growth, enterprise software subscriptions and its investments in AI are the recurring themes in its results. Because it is heavily weighted in major indices, index flows also influence it.",
    gap: "Steadier stocks can tempt learners into oversized positions. In real accounts, concentration in one name is a risk even when that company is large and profitable.",
    checklist: [
      "Compare MSFT's monthly move with the S&P 500 to see how much is market-wide.",
      "Note the date of its next quarterly report.",
      "Try a longer review cycle here — weekly rather than hourly.",
    ],
  },
  googl: {
    why: "Alphabet earns most of its revenue from search and YouTube advertising, with a growing cloud business alongside. It shows how a company's main revenue engine shapes how the market reacts to news.",
    watch: "Advertising growth, cloud profitability, regulatory cases and competition in AI-assisted search are the topics most coverage focuses on. Alphabet also has two share classes, GOOGL and GOOG, which differ mainly in voting rights.",
    gap: "Regulatory headlines can arrive without warning in the real market. A simulator cannot reproduce the uncertainty of waiting on a court decision.",
    checklist: [
      "Note which share class you are practising with and why.",
      "Check whether advertising-sector peers moved the same way today.",
      "Record any pending regulatory dates in your journal.",
    ],
  },
  meta: {
    why: "Meta owns Facebook, Instagram and WhatsApp and is primarily an advertising business, with large spending on AI and virtual-reality projects. Its history includes both steep declines and strong recoveries, which makes it instructive for studying drawdowns.",
    watch: "User engagement, advertising pricing, capital-expenditure plans and spending on its Reality Labs division are the recurring themes in its reports.",
    gap: "Holding a real position through a large drawdown is far harder than watching one in practice. Use this chart's history to ask honestly whether you would have held.",
    checklist: [
      "Look at the stock's largest drawdown in the past few years and note how long recovery took.",
      "Check the next earnings date and any spending guidance updates.",
      "Decide your maximum tolerable drawdown before entry.",
    ],
  },
  spy: {
    why: "SPY tracks the S&P 500, which covers roughly 500 large US companies. Practising on it teaches you how the broad market behaves without the noise of a single company's news.",
    watch: "Interest-rate decisions, inflation data, employment reports and the earnings of its largest holdings move the index most. Because large technology companies carry heavy weights, a few names can drive a big share of daily moves.",
    gap: "Index funds charge a small annual expense ratio and real trading involves a bid-ask spread, both of which a simulator ignores. Over long holding periods, costs matter.",
    checklist: [
      "Check the economic calendar for inflation or interest-rate announcements.",
      "Compare SPY's move with QQQ to see whether technology led the day.",
      "Try a dollar-cost averaging plan here instead of a single entry.",
    ],
  },
  qqq: {
    why: "QQQ tracks the Nasdaq-100, a technology-heavy index of large non-financial companies. Comparing it with SPY shows how much of the market's movement comes from technology.",
    watch: "Interest-rate expectations matter a great deal here because growth companies are sensitive to discount rates. The earnings of its biggest holdings also have an outsized effect.",
    gap: "Its concentration in a few large technology stocks means it can fall faster than broader indices. Holding through such a period in real money tests patience in ways practice cannot.",
    checklist: [
      "List the top five holdings and check whether any report earnings this week.",
      "Compare its percentage move with SPY over the past month.",
      "Decide whether you are expressing a view on technology or on the market as a whole.",
    ],
  },
  gold: {
    why: "Gold has been used as a store of value for thousands of years and is often discussed as a hedge during uncertainty. Practising here shows how an asset can respond to fear and interest rates rather than earnings.",
    watch: "Real interest rates, the US dollar, central-bank purchases and geopolitical tension are the drivers most commonly cited. Gold produces no income, so higher rates raise the opportunity cost of holding it.",
    gap: "Owning physical gold involves storage, insurance and dealer spreads; gold funds and futures carry their own costs. A simulator shows only the price.",
    checklist: [
      "Check the direction of the US dollar before entering.",
      "Note any upcoming interest-rate decision.",
      "Write down whether you are hedging another practice position or speculating.",
    ],
  },
  oil: {
    why: "Crude oil is a global commodity whose price affects inflation, transport costs and the profits of entire sectors. It is a good market for learning how supply news drives price.",
    watch: "OPEC+ production decisions, weekly inventory reports, geopolitical events in producing regions and global demand forecasts are the drivers covered most often.",
    gap: "Most real oil trading uses futures contracts that expire and must be rolled, and those contracts carry leverage. The simulator's simple price hides that complexity.",
    checklist: [
      "Check the date of the next OPEC+ meeting.",
      "Note whether a weekly inventory report is due during your holding period.",
      "Use a wider stop and smaller size than you would for a large-cap stock.",
    ],
  },
  eurusd: {
    why: "EUR/USD is the most traded currency pair in the world, pairing the euro against the US dollar. Practising here teaches you how interest-rate differences between two central banks drive exchange rates.",
    watch: "Decisions and statements from the European Central Bank and the US Federal Reserve, along with inflation and employment data from both regions, are the main drivers.",
    gap: "Retail forex is commonly traded with high leverage, which can magnify losses quickly. Practise at low leverage and express risk in money, not pips.",
    checklist: [
      "Check whether an ECB or Fed announcement falls within your window.",
      "Note whether you are trading during the London–New York overlap.",
      "Calculate what a 100-pip move means in account currency before entry.",
    ],
  },
  gbpusd: {
    why: "GBP/USD, often called 'cable', pairs the British pound against the US dollar. It tends to move more than EUR/USD, which makes it a good next step once the euro pair feels familiar.",
    watch: "Bank of England decisions, UK inflation data and political developments in the UK are frequent drivers, alongside US data and Federal Reserve policy.",
    gap: "UK political or economic surprises can cause sharp gaps. Leverage and spreads in real accounts make those moves more costly than they appear in practice.",
    checklist: [
      "Check the Bank of England calendar before entering.",
      "Compare today's move with EUR/USD to see whether the dollar or the pound is driving it.",
      "Use a smaller size than on EUR/USD to account for the larger range.",
    ],
  },
};
