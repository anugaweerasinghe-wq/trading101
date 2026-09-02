import { loadSiteData } from "../scripts/loadData";
const d: any = await loadSiteData();
console.log(JSON.stringify(d.ASSET_CONTENT["btc"], null, 1).slice(0,3000));
console.log("FAQS keys", Object.keys(d.ASSET_FAQS).slice(0,5), JSON.stringify(d.ASSET_FAQS[Object.keys(d.ASSET_FAQS)[0]]).slice(0,500));
console.log("INTROS", Object.keys(d.CATEGORY_INTROS), JSON.stringify(d.CATEGORY_INTROS[Object.keys(d.CATEGORY_INTROS)[0]]).slice(0,400));
console.log("asset0", JSON.stringify(d.ASSETS[0]));
console.log("track lesson", JSON.stringify(d.courseTracks[0].lessons[0]).slice(0,900));
