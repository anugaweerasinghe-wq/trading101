/**
 * Remembers where a signed-out visitor wanted to go (e.g. a duel invite) so we
 * can return them there once a session exists. Never used as the OAuth
 * redirect_uri — that must stay a plain same-origin public URL.
 */
const KEY = "tradehq_pending_path";

/** Only same-origin app paths are ever stored or returned. */
function sanitize(path: string): string | null {
  if (!path.startsWith("/") || path.startsWith("//")) return null;
  if (path.startsWith("/auth") || path.startsWith("/reset-password")) return null;
  return path;
}

export function setPendingPath(path: string) {
  const clean = sanitize(path);
  if (!clean) return;
  try {
    sessionStorage.setItem(KEY, clean);
  } catch {
    /* storage unavailable */
  }
}

export function takePendingPath(): string | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    sessionStorage.removeItem(KEY);
    return raw ? sanitize(raw) : null;
  } catch {
    return null;
  }
}
