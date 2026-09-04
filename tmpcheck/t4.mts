import { uniqueRoutes } from "../scripts/routes";
const r = uniqueRoutes();
console.log("total", r.length, "noindex", r.filter(x=>x.noindex).length);
console.log(r.filter(x=>x.path.startsWith("/trade/") && !x.noindex).length, "indexable trade pages");
