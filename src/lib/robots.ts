import noindexPaths from '@/generated/noindex-paths.json';
const excluded = new Set(noindexPaths);
/** Shared build policy remains effective after client-side navigation. */
export function robotsForPath(path = typeof location !== 'undefined' ? location.pathname : '/') {
  const normalized = path.replace(/\/$/, '') || '/';
  return excluded.has(normalized) || /^\/(admin|auth|reset-password|trader|challenge|sectors)(\/|$)/.test(normalized) || /^\/learn\/\d+$/.test(normalized)
    ? 'noindex, follow'
    : 'index, follow, max-image-preview:large, max-snippet:-1';
}
