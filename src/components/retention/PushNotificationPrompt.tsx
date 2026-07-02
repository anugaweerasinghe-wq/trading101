import { useEffect, useState } from "react";
import { Bell, X } from "lucide-react";
import {
  dismissPushPrompt,
  requestPushPermission,
  shouldPromptForPush,
} from "@/lib/pushNotifications";
import { isReturningUser } from "@/lib/lastVisit";

/**
 * Subtle, dismissible push-notification opt-in.
 * Only shown to day-2+ returning visitors, once, then remembered for 14 days.
 */
export function PushNotificationPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Delay a beat so it doesn't compete with LCP.
    const t = setTimeout(() => {
      if (shouldPromptForPush(isReturningUser())) setShow(true);
    }, 3500);
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <div
      role="dialog"
      aria-label="Enable notifications"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-40 max-w-sm rounded-2xl border border-primary/25 bg-background/95 backdrop-blur-xl p-4 shadow-2xl"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Bell className="w-4 h-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-foreground">Daily nudge + market alerts?</div>
          <p className="text-xs text-muted-foreground mt-0.5">
            Get a subtle reminder for the daily challenge and big moves on your watchlist. Fully optional.
          </p>
          <div className="flex items-center gap-2 mt-3">
            <button
              onClick={async () => {
                await requestPushPermission();
                setShow(false);
              }}
              className="inline-flex items-center px-3 h-8 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 active:scale-[0.97] transition"
            >
              Enable
            </button>
            <button
              onClick={() => {
                dismissPushPrompt();
                setShow(false);
              }}
              className="inline-flex items-center px-3 h-8 rounded-lg text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.05]"
            >
              Not now
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Close"
          onClick={() => {
            dismissPushPrompt();
            setShow(false);
          }}
          className="p-1 rounded hover:bg-white/[0.05]"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}