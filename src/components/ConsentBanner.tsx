import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type ConsentChoice = "accepted" | "rejected";
const STORAGE_KEY = "tradehq_consent_v1";
const ADSENSE_CLIENT = "[CONFIRM_ADSENSE_PUBLISHER_ID]";
const AMPLITUDE_API_KEY = "44108a3c4bd34ff14004fa66198d9f20";

function appendScript(id: string, src: string, onload?: () => void) {
  if (document.getElementById(id)) {
    onload?.();
    return;
  }
  const script = document.createElement("script");
  script.id = id;
  script.src = src;
  script.async = true;
  if (onload) script.onload = onload;
  document.head.appendChild(script);
}

function loadConsentedServices() {
  appendScript(
    "tradehq-amplitude",
    `https://cdn.amplitude.com/script/${AMPLITUDE_API_KEY}.js`,
    () => {
      appendScript(
        "tradehq-amplitude-engagement",
        `https://cdn.amplitude.com/script/${AMPLITUDE_API_KEY}.engagement.js`,
        () => {
          const w = window as any;
          if (!w.amplitude || w.__tradehqAmplitudeStarted) return;
          w.__tradehqAmplitudeStarted = true;
          if (w.engagement?.plugin) w.amplitude.add(w.engagement.plugin());
          if (w.sessionReplay?.plugin) w.amplitude.add(w.sessionReplay.plugin({ sampleRate: 1 }));
          w.amplitude.init(AMPLITUDE_API_KEY, { fetchRemoteConfig: true, autocapture: true });
        },
      );
    },
  );

  // Keep AdSense disabled until the real publisher ID and a Google-certified
  // CMP configuration are confirmed. Never replace this placeholder by guesswork.
  if (!ADSENSE_CLIENT.startsWith("ca-pub-")) return;
  appendScript(
    "tradehq-adsense",
    `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(ADSENSE_CLIENT)}`,
  );
}

export function ConsentBanner() {
  const [choice, setChoice] = useState<ConsentChoice | null>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : null;
  });

  useEffect(() => {
    if (choice === "accepted") loadConsentedServices();
  }, [choice]);

  useEffect(() => {
    const reopen = () => setChoice(null);
    window.addEventListener("tradehq:open-consent", reopen);
    return () => window.removeEventListener("tradehq:open-consent", reopen);
  }, []);

  const save = (next: ConsentChoice) => {
    const previous = window.localStorage.getItem(STORAGE_KEY);
    window.localStorage.setItem(STORAGE_KEY, next);
    setChoice(next);
    // An already initialized SDK keeps running when its script tag is removed.
    // Reload with the stored rejection so no optional SDK is initialized again.
    if (next === "rejected" && previous === "accepted") {
      (window as any).amplitude?.setOptOut?.(true);
      window.location.reload();
    }
  };

  if (choice) return null;

  return (
    <div
      role="dialog"
      aria-label="Privacy choices"
      className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 p-5 shadow-2xl backdrop-blur-xl md:bottom-5"
    >
      <p className="text-sm font-semibold text-foreground">Privacy choices</p>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        TradeHQ uses essential browser storage for the simulator. Optional analytics and advertising
        services are blocked until you accept them. You can reject them and still use the core site.
        See the <Link to="/privacy" className="text-primary hover:underline">privacy policy</Link>.
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => save("rejected")}
          className="rounded-lg border border-border px-4 py-2 text-xs font-semibold text-foreground hover:bg-muted"
        >
          Reject optional
        </button>
        <button
          type="button"
          onClick={() => save("accepted")}
          className="rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
        >
          Accept optional
        </button>
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-muted-foreground">
        AdSense remains disabled until a Google-certified CMP and the confirmed publisher ID are configured.
      </p>
    </div>
  );
}
