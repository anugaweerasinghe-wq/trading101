// Shared abuse protection: HMAC-pseudonymised subject + fixed-window counter in the DB.
// Plain IPs are never stored. Fails open on DB errors so legitimate users are not blocked by outages.
import { createClient } from "npm:@supabase/supabase-js@2";

const url = Deno.env.get("SUPABASE_URL")!;
const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const pepper = Deno.env.get("ADMIN_MASTER_KEY") ?? serviceKey;
const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

export function clientIp(req: Request): string {
  return (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim()
    || req.headers.get("cf-connecting-ip") || "unknown";
}

async function hmac(value: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(pepper), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(sig)).slice(0, 16).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Returns true when the request is allowed. */
export async function allow(subjectRaw: string, bucket: string, windowSeconds: number, max: number): Promise<boolean> {
  try {
    const subject = await hmac(subjectRaw);
    const { data, error } = await admin.rpc("hit_rate_limit", { _subject: subject, _bucket: bucket, _window_seconds: windowSeconds, _max: max });
    if (error) { console.warn("rate limit rpc error", error.message); return true; }
    return data !== false;
  } catch (e) {
    console.warn("rate limit failure", (e as Error).message);
    return true;
  }
}

export async function userIdFromAuth(req: Request): Promise<string | null> {
  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Bearer ")) return null;
  try {
    const { data } = await admin.auth.getUser(auth.slice(7));
    return data.user?.id ?? null;
  } catch { return null; }
}
