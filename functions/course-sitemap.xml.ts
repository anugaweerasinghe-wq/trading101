/**
 * Cloudflare Pages counterpart of the Vercel dynamic course-sitemap API.
 * Returns publicly approved courses only.
 */
import { escapeCourseHtml } from "../src/lib/courseHtml.js";

const SUPABASE_URL = "https://cbdktpjgczhthflspqjb.supabase.co";
const PUBLIC_KEY = "sb_publishable_lmCNfCn4tsB1tD604M49Xw_n4zum_Nr";
type Course = { slug: string; lessons: { slug: string }[]; editorial?: { reviewedAt: string } };

export async function onRequestGet(): Promise<Response> {
  try {
    const response = await fetch(SUPABASE_URL + "/rest/v1/rpc/get_published_course_catalog", {
      method: "POST",
      headers: { apikey: PUBLIC_KEY, "Content-Type": "application/json" },
      body: "{}",
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error("Published course catalog unavailable");
    const courses = await response.json() as Course[];
    if (!Array.isArray(courses)) throw new Error("Unexpected catalog");
    const entries = courses.flatMap((c) =>
      ["/courses/" + c.slug, ...(Array.isArray(c.lessons) ? c.lessons : []).map((l) =>
        "/courses/" + c.slug + "/" + l.slug)].map((path) =>
        "<url><loc>" + escapeCourseHtml("https://www.thetradehq.com" + path) + "</loc>"
        + (c.editorial?.reviewedAt ? "<lastmod>" + escapeCourseHtml(c.editorial.reviewedAt.slice(0, 10)) + "</lastmod>" : "")
        + "</url>")).join("");
    return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' + entries + "</urlset>", {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=0, s-maxage=60",
      },
    });
  } catch {
    return new Response("Course sitemap temporarily unavailable", {
      status: 503, headers: { "Cache-Control": "no-store", "Retry-After": "60" },
    });
  }
}
