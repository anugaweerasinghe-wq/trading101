// Shared abuse protection: HMAC-pseudonymised subject + fixed-window counter in the DB.
// Plain IPs are never stored. Counter errors fail closed before any provider call.
import { checkedLimit, RateLimitUnavailable } from "./rateLimitPolicy.ts";
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
    return checkedLimit(data, error);
  } catch (e) {
    console.warn("rate limit failure", (e as Error).message);
    throw new RateLimitUnavailable("Rate-limit service unavailable");
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
