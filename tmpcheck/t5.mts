import { uniqueRoutes } from "../scripts/routes";
const r = uniqueRoutes();
console.log("niche routes", r.filter(x=>x.path.startsWith("/niche/")).length, "noindexed", r.filter(x=>x.path.startsWith("/niche/")&&x.noindex).length);
