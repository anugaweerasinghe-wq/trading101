import { loadSiteData } from "../scripts/loadData";
const d = await loadSiteData();
console.log("glossary", d.tradingGlossary.length, "tracks", d.courseTracks.length, "compare", d.COMPARE_PAIRS.length, "howto", d.HOWTO_ASSETS.length, "strat", d.STRATEGIES.length, "countries", d.COUNTRY_GUIDES.length, "articles", d.LEARN_ARTICLES.length, "assets", d.ASSETS.length, "assetContent", Object.keys(d.ASSET_CONTENT).length);
console.log(JSON.stringify(d.STRATEGIES[0]).slice(0,700));
console.log(JSON.stringify(d.ASSET_CONTENT["btc"]).slice(0,700));
