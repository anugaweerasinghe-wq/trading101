/**
 * Cloud persistence for signed-in users' practice portfolios.
 *
 * Reconciliation (deterministic, never silently discards data):
 *  - No cloud portfolio yet → upload this browser's portfolio (guest → account migration).
 *  - Browser portfolio already belongs to this account → newest copy wins.
 *  - Browser holds guest data or another account's data while a cloud portfolio
 *    exists → keep the cloud portfolio, back up the browser copy locally.
 *
 * Educational simulation only — not financial advice.
 */
import { supabase } from "@/integrations/supabase/client";
import { ASSETS, INITIAL_CASH } from "./assets";
import { getPortfolio, savePortfolio, setPortfolioSaveListener, getLocalUpdatedAt } from "./portfolio";
import type { Asset, AssetType, Portfolio, Position } from "./types";

const OWNER_KEY = "tradehq:portfolio-owner";
const GUEST_BACKUP_KEY = "tradehq_portfolio_backup";
const ASSET_TYPES: AssetType[] = ["stock", "etf", "crypto", "commodity", "forex"];

export type ReconcileOutcome = "uploaded" | "restored" | "kept-local" | "kept-cloud-backed-up" | "unchanged";

let activeUser: string | null = null;
let pushTimer: ReturnType<typeof setTimeout> | null = null;
let reconciling = false;

function ownerOfLocal(): string | null {
  try { return localStorage.getItem(OWNER_KEY); } catch { return null; }
}
function setOwner(uid: string) {
  try { localStorage.setItem(OWNER_KEY, uid); } catch { /* ignore */ }
}

function hasActivity(p: Portfolio) {
  return p.trades.length > 0 || p.positions.length > 0 || Math.abs(p.cash - INITIAL_CASH) > 0.01;
}

export async function pushPortfolio(userId: string, p: Portfolio = getPortfolio()): Promise<void> {
  const cash = Math.max(0, Math.round(p.cash * 100) / 100);
  const { data: existing } = await supabase
    .from("practice_portfolios").select("trades_count").eq("user_id", userId).maybeSingle();
  // Trade history is browser-held; never lower the stored count from a restored device.
  const trades_count = Math.max(p.trades.length, existing?.trades_count ?? 0);
  const { error: pErr } = await supabase
    .from("practice_portfolios")
    .upsert({ user_id: userId, cash, trades_count }, { onConflict: "user_id" });
  if (pErr) throw pErr;

  const valid = p.positions.filter(
    (x) => x.quantity > 0 && x.avgPrice > 0 && /^[a-z0-9-]{1,20}$/.test(x.asset.id) && ASSET_TYPES.includes(x.asset.type),
  );
  const keep = valid.map((x) => x.asset.id);
  let del = supabase.from("practice_positions").delete().eq("user_id", userId);
  if (keep.length) del = del.not("asset_id", "in", `(${keep.join(",")})`);
  const { error: dErr } = await del;
  if (dErr) throw dErr;

  if (valid.length) {
    const { error: uErr } = await supabase.from("practice_positions").upsert(
      valid.map((x) => ({
        user_id: userId,
        asset_id: x.asset.id,
        symbol: x.asset.symbol.slice(0, 20),
        asset_type: x.asset.type,
        quantity: x.quantity,
        avg_price: x.avgPrice,
        last_price: x.asset.price > 0 ? x.asset.price : x.avgPrice,
      })),
      { onConflict: "user_id,asset_id" },
    );
    if (uErr) throw uErr;
  }
}

function toLocal(cash: number, rows: { asset_id: string; symbol: string; asset_type: string; quantity: number; avg_price: number; last_price: number }[]): Portfolio {
  const positions: Position[] = rows.map((r) => {
    const known = ASSETS.find((a) => a.id === r.asset_id);
    const asset: Asset = known
      ? { ...known, price: Number(r.last_price) }
      : { id: r.asset_id, symbol: r.symbol, name: r.symbol, type: r.asset_type as AssetType, price: Number(r.last_price), change: 0, changePercent: 0 };
    const qty = Number(r.quantity);
    const avg = Number(r.avg_price);
    const currentValue = asset.price * qty;
    const cost = avg * qty;
    return { asset, quantity: qty, avgPrice: avg, currentValue, profitLoss: currentValue - cost, profitLossPercent: cost ? ((currentValue - cost) / cost) * 100 : 0 };
  });
  return { cash: Number(cash), totalValue: Number(cash) + positions.reduce((s, x) => s + x.currentValue, 0), positions, trades: [] };
}

export async function reconcilePortfolio(userId: string): Promise<ReconcileOutcome> {
  const local = getPortfolio();
  const { data: cloud, error } = await supabase
    .from("practice_portfolios").select("cash, updated_at").eq("user_id", userId).maybeSingle();
  if (error) throw error;

  if (!cloud) {
    await pushPortfolio(userId, local);
    setOwner(userId);
    return "uploaded";
  }

  const owner = ownerOfLocal();
  const cloudTime = new Date(cloud.updated_at).getTime();

  if (owner === userId && getLocalUpdatedAt() > cloudTime) {
    await pushPortfolio(userId, local);
    return "kept-local";
  }

  const { data: rows, error: rErr } = await supabase
    .from("practice_positions")
    .select("asset_id, symbol, asset_type, quantity, avg_price, last_price")
    .eq("user_id", userId);
  if (rErr) throw rErr;

  if (owner !== userId && hasActivity(local)) {
    try { localStorage.setItem(GUEST_BACKUP_KEY, JSON.stringify({ savedAt: new Date().toISOString(), portfolio: local })); } catch { /* ignore */ }
  }
  const restored = toLocal(Number(cloud.cash), rows ?? []);
  // Keep this browser's trade history when it belongs to the same account.
  if (owner === userId) restored.trades = local.trades;
  savePortfolio(restored, { silent: true });
  setOwner(userId);
  return owner !== userId && hasActivity(local) ? "kept-cloud-backed-up" : owner === userId ? "unchanged" : "restored";
}

/** Called by the auth provider whenever the signed-in user changes. */
export async function startCloudSync(userId: string | null): Promise<ReconcileOutcome | null> {
  activeUser = userId;
  if (!userId) return null;
  reconciling = true;
  try {
    return await reconcilePortfolio(userId);
  } catch (e) {
    console.warn("Practice portfolio sync failed", e);
    return null;
  } finally {
    reconciling = false;
  }
}

setPortfolioSaveListener((p) => {
  const uid = activeUser;
  if (!uid || reconciling) return;
  if (pushTimer) clearTimeout(pushTimer);
  pushTimer = setTimeout(() => {
    pushPortfolio(uid, p).then(() => setOwner(uid)).catch((e) => console.warn("Practice portfolio upload failed", e));
  }, 800);
});
