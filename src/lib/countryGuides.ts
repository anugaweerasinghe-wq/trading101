export interface CountryGuide {
  slug: string;
  country: string;
  flag: string;
  currency: string;
  localExchange: string;
  intro: string;
  whyPractice: string;
  regulator: { name: string; url: string };
  reviewedAt: string;
  regulatorySources: { label: string; url: string }[];
  brokers: string[];
  taxNote: string;
  studentAngle: string;
  /** How residents actually get access to markets, in practical terms. */
  marketAccess: string;
  /** Real-money access/cost note; this field does not prescribe an amount. */
  startingCapital: string;
  /** Assets that are locally relevant to follow while learning. */
  localAssets: string[];
  /** Simulation-only study ideas; not a fixed schedule or suitability recommendation. */
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
      "This guide explains how TradeHQ's virtual-money practice tools relate to Sri Lanka's local market context. It does not estimate how many Sri Lankan users TradeHQ has and does not replace current regulator, bank, broker or tax guidance.",
    whyPractice:
      "Paper trading can be used to learn order mechanics and record a process without using real money. Opening or funding a real account is a separate decision with identity, broker and payment requirements that vary by provider and current rules.",
    regulator: {
      name: "Securities and Exchange Commission of Sri Lanka (SEC)",
      url: "https://www.sec.gov.lk/",
    },
    reviewedAt: "September 27, 2026",
    regulatorySources: [
      { label: "SEC Sri Lanka — stockbroker list", url: "https://www.sec.gov.lk/stockbrokers-list/" },
      { label: "SEC Sri Lanka — main site", url: "https://www.sec.gov.lk/" },
    ],
    brokers: ["Use the SEC Sri Lanka/CSE directories to verify a current licensed market intermediary before relying on a provider name."],
    taxNote:
      "This guide does not state a Sri Lankan tax rate or universal tax treatment. Tax treatment can depend on the instrument and circumstances; verify the current position with the relevant authority or a qualified local professional.",
    studentAngle:
      "A/L Economics and university finance students can use the simulator to document market-mechanics case studies. The guide does not claim the activity improves employability or is a perfect fit for every student.",
    marketAccess:
      "For locally listed securities, verify current CSE/SEC Sri Lanka account-opening and intermediary requirements with a licensed stockbroker. Access to foreign securities and outward payments can involve separate banking and foreign-exchange rules, so verify the current position with an authorised bank and relevant authorities before acting. TradeHQ itself is only a simulator and requires no brokerage account.",
    startingCapital:
      "There is no single Sri Lanka-wide starting-capital figure stated here. Broker minimums, fees and account requirements can differ and change; check the current licensed provider's published terms rather than treating an old minimum as universal.",
    localAssets: [
      "The All Share Price Index and the S&P SL20 as a daily read on local sentiment",
      "USD/LKR, because it silently determines the rupee value of any foreign asset you hold",
      "Brent crude and global rice and wheat prices, which feed directly into local inflation",
      "US large-cap technology, which is what most locally available international platforms actually offer",
    ],
    practicePlan:
      "A simulation-only study plan can compare psychology, macro releases and a documented hypothetical setup over several weeks. Record the assumptions before viewing outcomes, compare both gains and drawdowns, and choose observation times that fit your schedule rather than treating a fixed trade count, timeframe or session as correct.",
    faqs: [
      { q: "What should Sri Lankan users know about regulation?", a: "TradeHQ is an educational simulator and does not execute real-money trades. Financial-market rules can change, so for questions about investing, brokerage access or local regulation, check current guidance from the Securities and Exchange Commission of Sri Lanka and other relevant authorities." },
      { q: "Can I convert my paper gains to real money?", a: "No. TradeHQ paper gains are simulated only. Any real-money investing uses a separate provider and is subject to that provider's current requirements and the applicable Sri Lankan rules." },
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
      "This guide focuses on Indian market-learning context without ranking India's retail market against other countries or inventing a generic 'new trader failure rate'. TradeHQ is a virtual-money simulator, not a broker or advisory service.",
    whyPractice:
      "SEBI has published research showing high loss rates among individual traders in equity derivatives. Paper trading can be one way to learn market mechanics before considering any real-money activity, but it does not guarantee better live results.",
    regulator: { name: "Securities and Exchange Board of India (SEBI)", url: "https://www.sebi.gov.in/" },
    reviewedAt: "September 27, 2026",
    regulatorySources: [
      { label: "SEBI — individual equity F&O study (FY22–FY24)", url: "https://www.sebi.gov.in/media-and-notifications/press-releases/sep-2024/updated-sebi-study-reveals-93-of-individual-traders-incurred-losses-in-equity-fando-between-fy22-and-fy24-aggregate-losses-exceed-1-8-lakh-crores-over-three-years_86906.html" },
      { label: "SEBI — main site", url: "https://www.sebi.gov.in/" },
    ],
    brokers: ["Verify a broker or intermediary against current SEBI/exchange records rather than relying on a static list on this page."],
    taxNote:
      "Tax treatment depends on the instrument and current Indian rules. TradeHQ does not state a tax rate; verify current official guidance or use a qualified tax professional.",
    studentAngle:
      "CA, CFA and MBA candidates can use the simulator as an optional supplement for market-mechanics practice. This guide does not rank TradeHQ topics against Indian curricula or prescribe a course order.",
    marketAccess:
      "Indian securities access uses regulated intermediaries and applicable KYC/account requirements. Requirements vary by product and provider, and international investing/remittance adds separate RBI, tax and provider rules. Verify the current official requirements before treating any document list or remittance figure as universal.",
    startingCapital:
      "This page does not prescribe a real-money starting amount. Provider charges and product minimums vary. SEBI's published study found that 93% of individual traders in equity F&O incurred losses over FY22–FY24; that result applies to the studied derivatives population and period, not to every new investor or every market.",
    localAssets: [
      "Nifty 50 and Bank Nifty as the reference indices for Indian equity sentiment",
      "USD/INR, which affects the rupee return on any foreign holding",
      "Gold, which remains the default household asset and behaves differently in rupees than in dollars",
      "US technology large-caps, widely followed by Indian retail investors through international platforms",
    ],
    practicePlan:
      "A simulation-only study plan can compare psychology, macro concepts and a documented strategy without assigning a universal risk percentage. Record the assumptions you choose, compare outcomes with a simple benchmark, and review both gains and drawdowns rather than treating simulated results as evidence of real-world profitability.",
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
      "This guide gives Filipino learners local regulatory context for a virtual-money simulator. It does not estimate TradeHQ usage in the Philippines or recommend a particular real-money provider.",
    whyPractice:
      "Paper trading can be used to learn mechanics without depositing money. Real brokerage onboarding, banking requirements and minimum investments vary by trading participant and should be checked with the current provider.",
    regulator: { name: "Securities and Exchange Commission (SEC Philippines)", url: "https://www.sec.gov.ph/" },
    reviewedAt: "September 27, 2026",
    regulatorySources: [
      { label: "PSE — trading participants directory", url: "https://www.pse.com.ph/directory/" },
      { label: "SEC Philippines — investor advisories", url: "https://www.sec.gov.ph/investors-education-and-information/advisories" },
    ],
    brokers: ["Use the current PSE trading-participant directory and SEC Philippines records to verify a provider."],
    taxNote:
      "This page does not state a Philippine tax rate. Tax treatment changes and can depend on the transaction; verify current official guidance or consult a qualified local professional.",
    studentAngle:
      "Senior high and college finance students can use the Macro Reading material to compare monetary-policy news with USD/PHP observations. A policy announcement does not mechanically determine the exchange rate or remittance value.",
    marketAccess:
      "For PSE-listed securities, consult current PSE/SEC Philippines records and the chosen trading participant's onboarding requirements. Be cautious with platforms or investment solicitations whose authorization cannot be verified. TradeHQ does not require a brokerage account because it does not execute real-money trades.",
    startingCapital:
      "There is no universal PSE broker minimum: the current PSE directory lists active participants with minimum investments ranging from zero upward. Check the chosen participant's current terms instead of relying on a single generic minimum.",
    localAssets: [
      "The PSEi as the headline measure of local equity sentiment",
      "USD/PHP, which matters to any household receiving remittances",
      "Regional bank and property names, which dominate local index weight",
      "US large-caps, the most common first international exposure for Filipino investors",
    ],
    practicePlan:
      "A simulation-only study plan can compare psychology notes, macro releases and a repeated hypothetical setup without assigning a universal risk percentage or minimum trade count. Because global market hours differ from local schedules, choose a timeframe and review routine that can be followed consistently.",
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
      "Paper trading can be used to study global-market mechanics without making an outward remittance. Real international investment is a separate activity governed by the current foreign-exchange framework and provider eligibility; this guide does not characterize simulation as the only available route.",
    regulator: {
      name: "Securities and Exchange Commission of Pakistan (SECP)",
      url: "https://www.secp.gov.pk/",
    },
    reviewedAt: "September 27, 2026",
    regulatorySources: [
      { label: "SECP — securities brokers licensing", url: "https://www.secp.gov.pk/licensing/capital-markets/agents-and-brokers/" },
      { label: "SBP — Foreign Exchange Manual", url: "https://www.sbp.org.pk/laws-regulations/foreign-exchange-manual" },
    ],
    brokers: ["Verify a securities broker's current SECP licence and PSX status using official records."],
    taxNote:
      "This guide does not state a Pakistani tax rate or universal treatment. Verify current tax rules with the relevant authority or a qualified local professional.",
    studentAngle:
      "University finance students can use the simulator to compare market mechanics, psychology and macro concepts. The guide makes no claim about options skills or current Pakistani hiring demand.",
    marketAccess:
      "The practical local route is an account with a SECP-registered PSX broker, which requires CNIC-based KYC and a local bank account. Access to international markets from Pakistan is constrained by exchange-control rules on outward remittance, and offers that promise easy access to foreign markets should be treated with real caution — verify the entity's registration with the SECP before sending money anywhere. Simulated practice on this site requires no account, no payment and no remittance.",
    startingCapital:
      "Broker minimums, fees and account types can vary. This page does not prescribe a real-money starting amount; verify current requirements directly with a licensed broker and the relevant official sources.",
    localAssets: [
      "The KSE-100 as the headline domestic index",
      "USD/PKR, which drives imported inflation and the local value of foreign holdings",
      "Energy, cement and banking sector names, which lead local index moves",
      "Global oil prices, given their outsized effect on the Pakistani import bill",
    ],
    practicePlan:
      "A simulation-only study plan can compare psychology, SBP policy news, oil-price observations and a documented hypothetical setup. Record the rule and sample before reviewing results, and choose a timeframe that fits the learner's schedule rather than prescribing a fixed number of trades or a daily-chart routine.",
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
      "This guide gives Nigerian learners local regulatory context for TradeHQ's virtual-money simulator without estimating how many Nigerians use the service or recommending a real-money platform.",
    whyPractice:
      "Simulation lets users study order and portfolio mechanics without depositing naira. Real-market access, fees, FX conversion and product availability depend on the chosen provider and current rules.",
    regulator: {
      name: "Securities and Exchange Commission of Nigeria (SEC Nigeria)",
      url: "https://sec.gov.ng/",
    },
    reviewedAt: "September 27, 2026",
    regulatorySources: [
      { label: "SEC Nigeria — registered operator directory", url: "https://sec.gov.ng/for-investors/find-a-registered-operator/" },
      { label: "SEC Nigeria — 2026 warning on unregistered online investment schemes", url: "https://sec.gov.ng/for-investors/keep-track-of-circulars/public-notice-unregistered-online-investment-schemes/" },
    ],
    brokers: ["Verify any capital-market operator or investment platform against current SEC Nigeria records before relying on its regulatory claims."],
    taxNote:
      "Nigeria's tax framework changed materially for 2026. This guide therefore does not state a capital-gains rate or universal treatment; verify current official guidance or consult a qualified local professional.",
    studentAngle:
      "Finance, accounting and economics students can use the Macro Reading track to compare oil-price and USD/NGN movements with Nigerian macroeconomic data. Those relationships can change and should not be described as determining the entire economy.",
    marketAccess:
      "For real-money services, verify the operator and the specific activity it is authorized to perform using SEC Nigeria's current register. The SEC has continued to warn about unregistered online investment schemes in 2026. This page does not generalize that every app offering foreign shares, fractional shares or FX access has the same legal status.",
    startingCapital:
      "Minimums, fees, spreads and FX terms are provider-specific. This page does not prescribe a real-money starting amount; verify the current terms of a registered/authorized provider and applicable rules.",
    localAssets: [
      "The NGX All-Share Index as the domestic benchmark",
      "USD/NGN, which shapes almost every price in the economy",
      "Brent crude, given the weight of oil in national revenue",
      "US large-cap equities, the most common international exposure available locally",
    ],
    practicePlan:
      "A simulation-only study plan can compare trading psychology, macro concepts and a repeated hypothetical setup without prescribing a universal risk percentage. Record the assumptions used and review both favorable and unfavorable simulated periods.",
    faqs: [
      { q: "Is TradeHQ accessible from Nigeria?", a: "Yes. TradeHQ is a global free website. No signup, no payment, no geo-restriction." },
      { q: "Can I trade NGX-listed stocks here?", a: "Not yet. Current coverage focuses on US and global tickers." },
    ],
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((c) => c.slug === slug);
}