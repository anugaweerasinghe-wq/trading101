import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import type { ServerResponse } from "node:http";
import { renderApprovedCourse } from "../src/lib/courseHtml.js";
import type { CourseDocument } from "../supabase/functions/_shared/courseDocument.js";
const url = "https://cbdktpjgczhthflspqjb.supabase.co";
const publicKey = "sb_publishable_lmCNfCn4tsB1tD604M49Xw_n4zum_Nr";
export default async function handler(req: { query: Record<string, string | string[] | undefined> }, res: ServerResponse) {
  const track = req.query.track, lesson = req.query.lesson;
  const valid = (v: unknown) => typeof v === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(v) && v.length <= 80;
  if (!valid(track) || (lesson !== undefined && !valid(lesson))) { res.writeHead(404); res.end("Course not found"); return; }
  const path = "/courses/" + track + (lesson ? "/" + lesson : "");
  const staticPath = join(process.cwd(), "dist", path, "index.html");
  if (existsSync(staticPath)) { res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); res.end(readFileSync(staticPath, "utf8")); return; }
  try {
    const response = await fetch(url + "/rest/v1/published_courses?select=document&slug=eq." + encodeURIComponent(String(track)) + "&limit=1",
      { headers: { apikey: publicKey }, signal: AbortSignal.timeout(6000) });
    if (!response.ok) throw new Error("Course store unavailable");
    const rows = await response.json();
    if (!rows.length) { res.writeHead(404, { "X-Robots-Tag": "noindex", "Cache-Control": "no-store" }); res.end("Course not found"); return; }
    const html = renderApprovedCourse(readFileSync(join(process.cwd(), "dist/app-shell.html"), "utf8"), rows[0].document as CourseDocument, lesson as string | undefined);
    if (!html) { res.writeHead(404, { "X-Robots-Tag": "noindex" }); res.end("Lesson not found"); return; }
    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, s-maxage=60" }); res.end(html);
  } catch {
    res.writeHead(503, { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "Retry-After": "60" });
    res.end("Courses are temporarily unavailable. Please retry.");
  }
}
