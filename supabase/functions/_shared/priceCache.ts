// Writes provider-sourced quotes to the shared price cache used to value
// stored practice portfolios. Simulated fallback prices are never cached.
import { createClient } from "npm:@supabase/supabase-js@2.75.1";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

export async function cachePrice(assetId: string, price: number, source: string, observedAt: string | null, status = "provider"): Promise<boolean> {
  if (!Number.isFinite(price) || price <= 0 || price >= 1e9) return false;
  try {
    const { data, error } = await admin.rpc("store_practice_quote", {
      p_asset: assetId, p_price: price, p_source: source, p_observed: observedAt, p_status: status,
    });
    if (error) console.warn("price cache write failed");
    return !error && data === true;
  } catch (e) {
    console.warn("price cache failure");
    return false;
  }
}
