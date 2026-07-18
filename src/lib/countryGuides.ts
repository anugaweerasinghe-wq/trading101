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
    faqs: [
      { q: "Is TradeHQ accessible from Nigeria?", a: "Yes. TradeHQ is a global free website. No signup, no payment, no geo-restriction." },
      { q: "Can I trade NGX-listed stocks here?", a: "Not yet. Current coverage focuses on US and global tickers." },
    ],
  },
];

export function getCountryGuide(slug: string): CountryGuide | undefined {
  return COUNTRY_GUIDES.find((c) => c.slug === slug);
}