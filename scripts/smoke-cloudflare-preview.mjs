/**
 * Read-only HTTP smoke checks for a Cloudflare Pages staging URL.
 * No authentication, mutations, trades, account data, or secrets.
 *
 * Usage: TRADEHQ_CF_PREVIEW_URL=https://...pages.dev node scripts/smoke-cloudflare-preview.mjs
 */
const raw = process.env.TRADEHQ_CF_PREVIEW_URL;
if (!raw) throw new Error("Set TRADEHQ_CF_PREVIEW_URL to the exact staging pages.dev URL.");
const base = new URL(raw);
if (base.protocol !== "https:" || !base.hostname.endsWith(".pages.dev")
    || base.username || base.password || base.port || base.pathname !== "/") {
  throw new Error("A root HTTPS Cloudflare pages.dev URL is required.");
}
const paths = [
  ["/", 200, true],
  ["/leaderboard", 200, true],
  ["/auth", 200, true],
  ["/admin", 200, true],
  ["/courses/cryptocurrency-price-feeds-and-valuation", 200, true],
  ["/courses/cryptocurrency-price-feeds-and-valuation/exchange-tickers-and-price-aggregation", 200, true],
  ["/robots.txt", 200, false],
  ["/sitemap.xml", 200, false],
  ["/ads.txt", 200, false],
  ["/course-sitemap.xml", 200, false],
];
let failures = 0;
for (const [path, expected, html] of paths) {
  const url = new URL(path, base);
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(15000),
      headers: { "User-Agent": "TradeHQ-Cloudflare-ReadOnly-Smoke/1.0" },
    });
    const mime = response.headers.get("content-type") || "";
    const robots = response.headers.get("x-robots-tag") || "";
    const statusOK = response.status === expected;
    const typeOK = html ? mime.includes("text/html") : !mime.includes("text/html");
    // pages.dev *must never* be indexable, even after live-domain cutover.
    const robotsOK = !html || /noindex/i.test(robots);
    const pass = statusOK && typeOK && robotsOK;
    if (!pass) failures++;
    console.log((pass ? "PASS" : "FAIL") + " " + path
      + " HTTP=" + response.status + " mime=" + mime
      + " robots=" + (robots || "<missing>"));
  } catch (error) {
    failures++;
    console.error("FAIL " + path + ": " + String(error));
  }
}
if (failures) {
  console.error("Staging checks failed: " + failures);
  process.exitCode = 1;
} else {
  console.log("All staging smoke checks passed. This does not verify logged-in functionality.");
}
