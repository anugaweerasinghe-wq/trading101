import type { ServerResponse } from "node:http";
import { escapeCourseHtml } from "../src/lib/courseHtml";
export default async function handler(_req: unknown, res: ServerResponse) {
  try {
    const response = await fetch("https://cbdktpjgczhthflspqjb.supabase.co/rest/v1/rpc/get_published_course_catalog", {
      method: "POST", headers: { apikey: "sb_publishable_lmCNfCn4tsB1tD604M49Xw_n4zum_Nr", "Content-Type": "application/json" }, body: "{}",
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw new Error("Course store unavailable");
    const courses = await response.json();
    const entries = courses.flatMap((c: { slug: string; lessons: { slug: string }[]; editorial?: { reviewedAt: string } }) => [
      "/courses/" + c.slug, ...c.lessons.map(l => "/courses/" + c.slug + "/" + l.slug),
    ].map(path => "<url><loc>" + escapeCourseHtml("https://www.thetradehq.com" + path) + "</loc>"
      + (c.editorial ? "<lastmod>" + escapeCourseHtml(c.editorial.reviewedAt.slice(0, 10)) + "</lastmod>" : "") + "</url>"));
    res.writeHead(200, { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=60" });
    res.end('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries.join("") + "</urlset>");
  } catch { res.writeHead(503, { "Cache-Control": "no-store", "Retry-After": "60" }); res.end("Course sitemap temporarily unavailable"); }
}
