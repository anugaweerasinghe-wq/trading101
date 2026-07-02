/**
 * Web Push opt-in for TradeHQ.
 *
 * Uses the browser's built-in Notification API for daily-challenge
 * reminders and big-market-move alerts. No third-party server —
 * notifications fire from the client side (page-level, PWA-style).
 *
 * Aggressive prompt UX is intentionally avoided:
 * - Only shown on returning visits (day 2+).
 * - Dismissible; declines are remembered for 14 days.
 * - Silent by default; only fires when the tab is closed / user is idle.
 */
const KEY = "tradehq_push_state";

type State = {
  status: "unknown" | "asked" | "granted" | "denied" | "dismissed";
  updatedAt: string;
};

function readState(): State {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { status: "unknown", updatedAt: new Date(0).toISOString() };
}

function writeState(status: State["status"]) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ status, updatedAt: new Date().toISOString() }));
  } catch {}
}

export function isSupported(): boolean {
  return typeof window !== "undefined" && "Notification" in window;
}

/** Should the subtle opt-in banner be shown right now? */
export function shouldPromptForPush(returning: boolean): boolean {
  if (!isSupported() || !returning) return false;
  if (Notification.permission !== "default") return false;
  const s = readState();
  if (s.status === "granted" || s.status === "denied") return false;
  if (s.status === "dismissed") {
    const days = (Date.now() - new Date(s.updatedAt).getTime()) / 86400000;
    if (days < 14) return false;
  }
  return true;
}

export async function requestPushPermission(): Promise<NotificationPermission> {
  if (!isSupported()) return "denied";
  const perm = await Notification.requestPermission();
  writeState(perm === "granted" ? "granted" : perm === "denied" ? "denied" : "asked");
  if (perm === "granted") {
    try {
      new Notification("TradeHQ notifications on 🎯", {
        body: "We'll send a daily challenge nudge and big-market-move alerts.",
        icon: "/logo.svg",
        badge: "/logo.svg",
      });
    } catch {}
  }
  return perm;
}

export function dismissPushPrompt() {
  writeState("dismissed");
}

/** Fire a client-side notification (only when the tab is hidden). */
export function notify(title: string, body: string, tag = "tradehq") {
  if (!isSupported() || Notification.permission !== "granted") return;
  if (typeof document !== "undefined" && !document.hidden) return;
  try {
    new Notification(title, { body, tag, icon: "/logo.svg", badge: "/logo.svg" });
  } catch {}
}