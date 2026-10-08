import { useEffect, useState } from "react";

type ConsentData = { gdprApplies?: boolean; listenerId?: number };
type TcfApi = (
  command: "addEventListener" | "removeEventListener",
  version: number,
  callback: (data: ConsentData, success: boolean) => void,
  listenerId?: number,
) => void;
type GooglePrivacyWindow = Window & {
  googlefc?: {
    callbackQueue?: { push: (callback: { CONSENT_API_READY: () => void }) => unknown };
    showRevocationMessage?: () => void;
  };
  __tcfapi?: TcfApi;
};

/** Google CMP owns the advertising decision; Amplitude consent never changes it. */
export function AdvertisingPrivacyChoices({ className }: { className?: string }) {
  const [applicable, setApplicable] = useState(false);

  useEffect(() => {
    const privacyWindow = window as GooglePrivacyWindow;
    const googlefc = privacyWindow.googlefc = privacyWindow.googlefc || {};
    googlefc.callbackQueue = googlefc.callbackQueue || [];
    let active = true;
    let listenerId: number | undefined;

    googlefc.callbackQueue.push({
      CONSENT_API_READY: () => {
        if (!active) return;
        // Version 0 asks Google's CMP to use the current supported TCF version.
        privacyWindow.__tcfapi?.("addEventListener", 0, (data, success) => {
          if (!active) return;
          listenerId = data?.listenerId;
          setApplicable(success && data?.gdprApplies === true);
        });
      },
    });

    return () => {
      active = false;
      if (listenerId !== undefined) {
        privacyWindow.__tcfapi?.("removeEventListener", 0, () => {}, listenerId);
      }
    };
  }, []);

  if (!applicable) return null;

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        const googlefc = (window as GooglePrivacyWindow).googlefc;
        googlefc?.callbackQueue?.push({
          CONSENT_API_READY: () => googlefc.showRevocationMessage?.(),
        });
      }}
    >
      Advertising privacy choices
    </button>
  );
}
