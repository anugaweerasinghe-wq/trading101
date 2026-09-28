import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

async function sha256Hex(value: string): Promise<string> {
  const bytes = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for") ?? "";
  return forwarded.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

export function getBearerToken(req: Request): string | null {
  const header = req.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  return match?.[1] ?? null;
}

export function decodeJwtSubject(token: string): string | null {
  try {
    const payload = token.split(".")[1];
    if (!payload) return null;
    const base64 = payload.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(payload.length / 4) * 4, "=");
    const parsed = JSON.parse(atob(base64));
    return typeof parsed?.sub === "string" && parsed.sub ? parsed.sub : null;
  } catch {
    return null;
  }
}

export async function consumeRateLimit(
  scope: string,
  rawSubject: string,
  limit: number,
  windowSeconds: number,
): Promise<RateLimitResult> {
  const url = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !serviceKey) throw new Error("Rate-limit backend is not configured");

  const salt = Deno.env.get("RATE_LIMIT_SALT") || serviceKey.slice(-32);
  const subjectHash = await sha256Hex(`${salt}:${rawSubject}`);

  const admin = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  const { data, error } = await admin.rpc("consume_api_rate_limit", {
    p_scope: scope,
    p_subject_hash: subjectHash,
    p_window_seconds: windowSeconds,
    p_limit: limit,
  });

  if (error) throw new Error(`Rate-limit check failed: ${error.message}`);

  const row = Array.isArray(data) ? data[0] : data;
  if (!row) throw new Error("Rate-limit check returned no result");

  return {
    allowed: Boolean(row.is_allowed),
    remaining: Number(row.remaining_requests ?? 0),
    retryAfterSeconds: Math.max(1, Number(row.retry_after_seconds ?? windowSeconds)),
  };
}
