/**
 * Single entry point that re-exports every content data module the
 * prerender needs. Bundled by scripts/loadData.ts with esbuild so the
 * "@/..." aliases and image imports resolve outside of Vite.
 */

export { tradingGlossary } from "../src/lib/tradingGlossary";
export { courseTracks } from "../src/lib/coursesData";
export { COMPARE_PAIRS, HOWTO_ASSETS, STRATEGIES } from "../src/lib/seoData";
export { COUNTRY_GUIDES } from "../src/lib/countryGuides";
export { LEARN_ARTICLES } from "../src/lib/learnArticles";
export { ASSET_CONTENT, ASSET_FAQS, CATEGORY_INTROS } from "../src/lib/assetContent";
export { ASSETS } from "../src/lib/assets";
