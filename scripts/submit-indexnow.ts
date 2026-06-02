/**
 * IndexNow submission — pings Bing/Yandex/Seznam with all sitemap URLs.
 * Free, no auth. Run after deploy: `npx tsx scripts/submit-indexnow.ts`
 *
 * Setup once:
 *   1. Generate a 32-char hex key (e.g. node -e "console.log(crypto.randomBytes(16).toString('hex'))")
 *   2. Save it as public/<KEY>.txt with the key as the only content
 *   3. Set INDEXNOW_KEY env var or paste it below
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const KEY = process.env.INDEXNOW_KEY || "REPLACE_WITH_YOUR_KEY";
const HOST = process.env.INDEXNOW_HOST || "tradinghq.vercel.app";
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function main() {
  if (KEY === "REPLACE_WITH_YOUR_KEY") {
    console.error("Set INDEXNOW_KEY env var first. See header comment.");
    process.exit(1);
  }
  const xml = fs.readFileSync(path.resolve(__dirname, "../public/sitemap.xml"), "utf-8");
  const urlList = (xml.match(/<loc>([^<]+)<\/loc>/g) || []).map(m => m.replace(/<\/?loc>/g, ""));
  console.log(`Submitting ${urlList.length} URLs to IndexNow (host: ${HOST})...`);

  // Chunk to be safe (IndexNow accepts up to 10k; we chunk at 1k for resilience)
  const chunkSize = 1000;
  for (let i = 0; i < urlList.length; i += chunkSize) {
    const chunk = urlList.slice(i, i + chunkSize);
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: chunk }),
    });
    console.log(`Chunk ${i / chunkSize + 1}: ${res.status} ${res.statusText} (${chunk.length} URLs)`);
    if (!res.ok) console.log(await res.text());
  }
}
main().catch(e => { console.error(e); process.exit(1); });
