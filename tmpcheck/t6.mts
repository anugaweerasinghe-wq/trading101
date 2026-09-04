import { buildContentMap } from "../scripts/content";
import { uniqueRoutes } from "../scripts/routes";
const m = await buildContentMap();
const routes = uniqueRoutes().filter(r=>!r.noindex);
const missing = routes.filter(r=>!m.has(r.path)).map(r=>r.path);
console.log("content entries", m.size, "missing", missing.length, missing.slice(0,20));
const wc = (p:string)=>{const c=m.get(p)!; if(!c) return 0; return (c.sections.map(s=>[(s.p||[]).join(" "),(s.list||[]).join(" ")].join(" ")).join(" ")).split(/\s+/).filter(Boolean).length;};
const thin = routes.filter(r=>m.has(r.path)&&wc(r.path)<430).map(r=>`${r.path}:${wc(r.path)}`);
console.log("thin", thin.length, thin.slice(0,25));
