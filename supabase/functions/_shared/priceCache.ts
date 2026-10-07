// Writes provider-sourced quotes to the shared price cache used to value
// stored practice portfolios. Simulated fallback prices are never cached.
import { createClient } from "npm:@supabase/supabase-js@2";

const admin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } },
);

export async function cachePrice(assetId: string, price: number, source: string, observedAt: string | null): Promise<void> {
  if (!Number.isFinite(price) || price <= 0 || price >= 1e9) return;
  try {
    const { error } = await admin.from("market_prices").upsert(
      { asset_id: assetId, price, source, observed_at: observedAt, updated_at: new Date().toISOString() },
      { onConflict: "asset_id" },
    );
    if (error) console.warn("price cache error", error.message);
  } catch (e) {
    console.warn("price cache failure", (e as Error).message);
  }
}
