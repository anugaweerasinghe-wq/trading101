import { loadSiteData } from "../scripts/loadData";
const d: any = await loadSiteData();
const l = d.courseTracks[0].lessons[0];
console.log("body paras", l.body.length, "takeaways", l.keyTakeaways.length, "sources", l.sources.length, "quiz", l.quiz.length);
console.log(JSON.stringify(d.COMPARE_PAIRS[0]).slice(0,400));
console.log(JSON.stringify(d.LEARN_ARTICLES[0]).slice(0,300));
console.log(JSON.stringify(d.COUNTRY_GUIDES[0]).slice(0,300));
console.log(JSON.stringify(d.HOWTO_ASSETS[0]).slice(0,300));
