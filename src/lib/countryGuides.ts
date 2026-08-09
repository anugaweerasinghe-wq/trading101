export interface CountryGuide {
  slug: string;
  country: string;
  flag: string;
  currency: string;
  localExchange: string;
  intro: string;
  whyPractice: string;
  regulator: { name: string; url: string };
  brokers: string[];
  taxNote: string;
  studentAngle: string;
  /** How residents actually get access to markets, in practical terms. */
  marketAccess: string;
  /** Realistic starting capital framed in local currency. */
  startingCapital: string;
  /** Assets that are locally relevant to follow while learning. */
  localAssets: string[];
  /** A concrete practice plan for the first three months. */
  practicePlan: string;
  faqs: { q: string; a: string }[];
}

export const COUNTRY_GUIDES: CountryGuide[] = [
  {
    slug: "sri-lanka",
    country: "Sri Lanka",
    flag: "🇱🇰",
    currency: "LKR",
    localExchange: "Colombo Stock Exchange (CSE)",
    intro:
      "TradeHQ is used by thousands of Sri Lankan students learning how global markets work before they ever risk a single rupee. This guide explains how paper trading fits into a Sri Lankan learning journey — what to study, which local rules apply, and how to keep your practice consistent even on a slow connection.",
    whyPractice:
      "In Sri Lanka, the barrier to entry for real trading is high — international brokers require USD funding, and local CSE accounts require KYC and a minimum deposit. TradeHQ lets you build 6–12 months of documented practice with $100,000 virtual cash before deciding whether real markets are for you.",
    regulator: {
      name: "Securities and Exchange Commission of Sri Lanka (SEC)",
      url: "https://www.sec.gov.lk/",
    },
    brokers: ["CSE-licensed stockbrokers (list at sec.gov.lk)", "International brokers require overseas USD funding"],
    taxNote:
      "Sri Lankan residents may owe income tax on realised trading gains from foreign brokers. Consult a licensed local accountant — TradeHQ is not tax advice.",
    studentAngle:
      "Perfect fit for A/L Economics and university finance students. Use the free courses to build a portfolio of documented paper-trade case studies for your CV.",
    marketAccess:
      "There are two practical routes from Sri Lanka. The first is a CDS account opened through a CSE-licensed stockbroker, which gives you access to locally listed shares in rupees and is the only route regulated end-to-end by the SEC. The second is an international broker, which requires outward remittance and therefore depends on the exchange-control rules in force at the time — those rules have changed several times in recent years, so verify the current position with your bank rather than with a forum post. Neither route is necessary to complete anything on this site; every lesson and every simulated trade here works without an account of any kind.",
    startingCapital:
      "Local brokers have historically set low minimums, and it is possible to open a CDS account with an amount in the tens of thousands of rupees. That does not make it advisable to start there. A more defensible sequence is to spend three to six months on simulated trades, keep a written log, and only then commit an amount you could lose entirely without changing how you live that month. Please confirm current minimums directly with a licensed broker, as they change.",
    localAssets: [
      "The All Share Price Index and the S&P SL20 as a daily read on local sentiment",
      "USD/LKR, because it silently determines the rupee value of any foreign asset you hold",
      "Brent crude and global rice and wheat prices, which feed directly into local inflation",
      "US large-cap technology, which is what most locally available international platforms actually offer",
    ],
    practicePlan:
      "A workable first quarter: in month one, complete the Trading Psychology track and place no more than three simulated trades a week, writing down the reason for each before you know the result. In month two, add the Macro Reading track and start following the CBSL policy announcements alongside US CPI releases, noting how USD/LKR reacts. In month three, run a single strategy consistently for thirty days and review the drawdown rather than the return. Because US market hours fall late in the Sri Lankan evening, use daily charts and pre-placed orders instead of trying to trade live after midnight.",
    faqs: [
      { q: "Is TradeHQ legal to use in Sri Lanka?", a: "Yes. TradeHQ is a free educational simulator with no real money or brokerage relationship, so it is not regulated as a financial service. Only real-money trading falls under SEC Sri Lanka." },
      { q: "Can I convert my paper gains to real money?", a: "No. Paper trades are simulated only. To trade real markets from Sri Lanka you must open an account with a SEC-licensed CSE broker or a compliant international broker." },
      { q: "Do prices show in LKR?", a: "No. Prices are shown in USD to match global exchanges. To estimate LKR exposure, multiply by the current USD/LKR rate." },
    ],
  },
  {
    slug: "india",
    country: "India",
    flag: "🇮🇳",
    currency: "INR",
    localExchange: "NSE and BSE",
    intro:
      "India has one of the world's fastest-growing retail trading populations — and one of the highest failure rates among new traders. TradeHQ gives Indian students and working professionals a way to build real market understanding before touching a Demat account.",
    whyPractice:
      "SEBI's 2023 study found ~90% of active Indian equity F&O traders lose money in their first year. Paper trading first is not optional if you value your capital.",
    regulator: { name: "Securities and Exchange Board of India (SEBI)", url: "https://www.sebi.gov.in/" },
    brokers: ["Zerodha, Groww, Upstox, Angel One and other SEBI-registered brokers"],
    taxNote:
      "Indian residents owe short-term or long-term capital gains tax on real trades, plus STT and applicable GST. TradeHQ is not tax advice — speak to a chartered accountant.",
    studentAngle:
      "Ideal for CA, CFA and MBA candidates. Complete the Trading Psychology and Macro Reading tracks first — they are the two topics Indian colleges rarely teach.",
    marketAccess:
      "Real access runs through a SEBI-registered broker with a linked Demat and trading account, opened with PAN and Aadhaar-based KYC. Access to US-listed shares is available through the Liberalised Remittance Scheme via brokers that offer international investing, subject to the annual remittance limit and applicable collection at source. The rules around remittance and taxation of foreign assets have changed repeatedly, so treat any figure you read online — including a figure written here — as something to confirm with a chartered accountant before acting on it.",
    startingCapital:
      "Discount brokers have made account opening effectively free, and a beginner can technically start with a few thousand rupees. The constraint that matters is not the minimum but the position size: SEBI's own research into equity derivatives found the large majority of individual traders lost money, and the losses were concentrated among those trading with capital they could not afford to lose. Practise here first, and if you later fund a real account, treat the first amount as tuition rather than investment.",
    localAssets: [
      "Nifty 50 and Bank Nifty as the reference indices for Indian equity sentiment",
      "USD/INR, which affects the rupee return on any foreign holding",
      "Gold, which remains the default household asset and behaves differently in rupees than in dollars",
      "US technology large-caps, widely followed by Indian retail investors through international platforms",
    ],
    practicePlan:
      "Suggested first quarter: month one on Trading Psychology, since the failure mode documented in Indian retail data is behavioural rather than analytical. Month two on Macro Reading, paying attention to how RBI policy and US rate expectations jointly move the rupee. Month three on a single documented strategy with a fixed 1% risk per simulated trade, reviewed at the end against a simple index hold. Indian market hours overlap comfortably with the working day, so the discipline challenge is usually overtrading rather than sleep.",
    faqs: [
      { q: "Is TradeHQ SEBI-registered?", a: "No. TradeHQ is not a broker, investment advisor or research analyst. It is a free educational simulator. SEBI registration is only required for real-money financial services." },
      { q: "Can I paper trade Indian stocks like Reliance or TCS?", a: "The current TradeHQ catalogue focuses on US and global tickers. Indian-listed tickers are planned but not yet live." },
      { q: "Does the app work offline?", a: "The interface loads and stays usable on slow connections, but live price ticks require an internet connection." },
    ],
  },
  {
    slug: "philippines",
    country: "Philippines",
    flag: "🇵🇭",
    currency: "PHP",
    localExchange: "Philippine Stock Exchange (PSE)",
    intro:
      "Filipino students and OFWs use TradeHQ to learn how US and global markets work — practice safely, then decide whether local PSE trading or a compliant international broker is the right next step.",
    whyPractice:
      "Real PSE accounts require KYC, a Philippine bank account and a minimum deposit. TradeHQ lets you learn the mechanics for free while building a track record you can point to before funding anything.",
    regulator: { name: "Securities and Exchange Commission (SEC Philippines)", url: "https://www.sec.gov.ph/" },
    brokers: ["COL Financial, First Metro Securities, BPI Trade and other SEC-PH registered brokers"],
    taxNote:
      "Real trading gains are subject to Philippine tax rules including stock transaction tax. TradeHQ is educational — consult a local accountant.",
    studentAngle:
      "Great for senior high and college finance students. Use the Macro Reading track to understand how Fed decisions ripple into the PHP exchange rate and OFW remittances.",
    marketAccess:
      "Local access is through a broker registered with SEC Philippines, which requires a Philippine bank account and standard KYC documents. Several brokers offer online onboarding, and a number of newer platforms provide fractional access to US shares for Philippine residents; check that any such platform is registered before funding it, because unregistered offshore apps marketed on social media are a recurring problem locally. Nothing on TradeHQ requires any of this.",
    startingCapital:
      "Some local brokers advertise minimums in the low thousands of pesos, which is genuinely accessible. The risk that accessibility creates is starting real trading before the habits are formed. A sensible benchmark is that your simulated log should show thirty trades with consistent position sizing before you consider funding anything, and the first funded amount should be small enough that losing it changes nothing about your month.",
    localAssets: [
      "The PSEi as the headline measure of local equity sentiment",
      "USD/PHP, which matters to any household receiving remittances",
      "Regional bank and property names, which dominate local index weight",
      "US large-caps, the most common first international exposure for Filipino investors",
    ],
    practicePlan:
      "First quarter: month one on Trading Psychology and a simple journal habit. Month two on Macro Reading, tracking how Fed decisions move USD/PHP and therefore the peso value of remittances and imported goods. Month three on consistency — the same setup, the same 1% risk, thirty simulated trades, then a written review. With the US session opening late at night in Manila, the daily timeframe is the realistic choice for anyone with school or work in the morning.",
    faqs: [
      { q: "Do I need to register with SEC Philippines to use TradeHQ?", a: "No. TradeHQ is a free educational simulator with no real money. Registration is only required for real broker accounts." },
      { q: "Can Filipino students under 18 use TradeHQ?", a: "Yes. TradeHQ has no age gate because there is no real money. Real broker accounts typically require 18+." },
    ],
  },
  {
    slug: "pakistan",
    country: "Pakistan",
    flag: "🇵🇰",
    currency: "PKR",
    localExchange: "Pakistan Stock Exchange (PSX)",
    intro:
      "Pakistani students and young professionals use TradeHQ to learn global market mechanics without needing a USD account or a PSX Demat. Study, practice, and then decide.",
    whyPractice:
      "Access to real international markets from Pakistan is limited by capital controls. Paper trading is often the only realistic way to learn how global assets behave.",
    regulator: {
      name: "Securities and Exchange Commission of Pakistan (SECP)",
      url: "https://www.secp.gov.pk/",
    },
    brokers: ["SECP-registered PSX brokers such as AKD, JS Global, Arif Habib"],
    taxNote:
      "Trading gains are taxable under Pakistani tax law. TradeHQ is educational only — consult a licensed tax advisor.",
    studentAngle:
      "Recommended for university finance students. Start with Trading Psychology, then Options Fundamentals — options remain a rare skill in the Pakistani job market.",
    marketAccess:
      "The practical local route is an account with a SECP-registered PSX broker, which requires CNIC-based KYC and a local bank account. Access to international markets from Pakistan is constrained by exchange-control rules on outward remittance, and offers that promise easy access to foreign markets should be treated with real caution — verify the entity's registration with the SECP before sending money anywhere. Simulated practice on this site requires no account, no payment and no remittance.",
    startingCapital:
      "PSX brokers can open accounts with modest minimums, but the amount is less important than the sequence. Build a documented record of simulated trades first; that record costs nothing and is worth more in a job interview than a small live account with no process behind it. If you do fund an account later, treat the first tranche as the price of learning execution, and confirm all current requirements with the broker directly.",
    localAssets: [
      "The KSE-100 as the headline domestic index",
      "USD/PKR, which drives imported inflation and the local value of foreign holdings",
      "Energy, cement and banking sector names, which lead local index moves",
      "Global oil prices, given their outsized effect on the Pakistani import bill",
    ],
    practicePlan:
      "First quarter: begin with Trading Psychology, then move to Macro Reading with attention to how SBP policy decisions and oil prices interact with the rupee. In month three, run thirty simulated trades on one setup with fixed risk and review the largest drawdown rather than the best trade. Because international sessions run late locally, plan trades in advance on the daily chart rather than watching intraday.",
    faqs: [
      { q: "Can I use TradeHQ without a Pakistani bank account?", a: "Yes. TradeHQ never asks for any payment or bank details — it is 100% free and simulated." },
      { q: "Do you cover PSX-listed shares?", a: "Not yet. The current catalogue focuses on US and global tickers. Local coverage is on the roadmap." },
    ],
  },
  {
    slug: "nigeria",
    country: "Nigeria",
    flag: "🇳🇬",
    currency: "NGN",
    localExchange: "Nigerian Exchange (NGX)",
    intro:
      "Nigerian students and young professionals use TradeHQ to build practical understanding of US and global markets — a critical skill as more Nigerians access global assets through compliant apps.",
    whyPractice:
      "FX access constraints and high spreads on real Nigerian broker platforms make experimentation expensive. TradeHQ lets you experiment freely with $100,000 virtual cash before committing NGN.",
    regulator: {
      name: "Securities and Exchange Commission of Nigeria (SEC Nigeria)",
      url: "https://sec.gov.ng/",
    },
    brokers: ["SEC-Nigeria-registered brokers, plus compliant global apps that support Nigerian residents"],
    taxNote:
      "Nigerian residents may owe capital gains tax on real trading profits. TradeHQ is educational only — speak with a licensed accountant.",
    studentAngle:
      "Ideal for finance, accounting and economics students. Use the Macro Reading track to understand how oil prices and USD/NGN shifts affect the entire economy.",
    marketAccess:
      "Domestic access runs through brokers registered with SEC Nigeria and dealing members of the NGX, using BVN-based KYC. Several licensed platforms now provide fractional access to US shares for Nigerian residents, though naira funding and FX availability affect both pricing and withdrawal timelines. Because unregistered investment schemes are a persistent problem, check any platform against the SEC Nigeria register before funding it. TradeHQ itself never asks for money or bank details.",
    startingCapital:
      "Entry minimums on local platforms are low enough that capital is rarely the barrier; FX access and spreads usually are. That makes simulation unusually valuable here, because experimenting with a real naira-funded account is expensive before you have any process. Build the record first, then fund an amount whose total loss would be irritating rather than damaging, and verify current fees and FX terms with the platform itself.",
    localAssets: [
      "The NGX All-Share Index as the domestic benchmark",
      "USD/NGN, which shapes almost every price in the economy",
      "Brent crude, given the weight of oil in national revenue",
      "US large-cap equities, the most common international exposure available locally",
    ],
    practicePlan:
      "First quarter: month one on Trading Psychology with a written journal. Month two on Macro Reading, following how oil prices and CBN policy feed into the naira and into local inflation. Month three on repetition — one strategy, fixed 1% risk, thirty simulated trades, then an honest review of the worst stretch rather than the best week. The US session opens in the Nigerian afternoon, which makes live practice more feasible here than in most of the other guides.",
    faqs: [
      { q: "Is TradeHQ accessible from Nigeria?", a: "Yes. TradeHQ is a global free website. No signup, no payment, no geo-restriction." },
      { q: "Can I trade NGX-listed stocks here?", a: "Not yet. Current coverage focuses on US and global tickers." },
    ],
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((c) => c.slug === slug);
}