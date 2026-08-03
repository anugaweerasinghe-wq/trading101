import { SITE_DOMAIN } from "@/lib/constants";

/**
 * Canonical origin used for auth email links and OAuth callbacks.
 *
 * Auth emails must always send people to the production domain
 * (https://www.thetradehq.com) — never to an internal *.lovable.app host.
 * Local dev and the editor preview keep their own origin so sign-in still
 * works there.
 */
export function authOrigin(): string {
  if (typeof window === "undefined") return SITE_DOMAIN;
  const { hostname, origin } = window.location;

  const isLocal =
    hostname === "localhost" ||
    hostname === "127.0.0.1" ||
    hostname.endsWith(".local");

  // Editor / sandbox previews need their own origin to complete the flow.
  const isPreview =
    hostname.includes("-preview--") ||
    hostname.includes("lovableproject.com") ||
    hostname.includes("sandbox");

  if (isLocal || isPreview) return origin;

  // Any published lovable.app mirror should still hand users the real domain.
  if (hostname.endsWith("lovable.app")) return SITE_DOMAIN;

  return origin;
}

/** Absolute URL on the canonical auth origin, e.g. authUrl("/reset-password"). */
export function authUrl(path = "/"): string {
  return `${authOrigin()}${path.startsWith("/") ? path : `/${path}`}`;
}
