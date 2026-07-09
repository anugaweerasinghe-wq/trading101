/**
 * Single source of truth for user-facing product constants.
 * Any copy that mentions the starting virtual balance MUST import from here.
 */
export { INITIAL_CASH as STARTING_BALANCE } from "./assets";

export const STARTING_BALANCE_LABEL = "$100,000";
export const STARTING_BALANCE_SHORT = "$100K";

/** Canonical production domain — used by SEO, sitemap, prerender, OG tags. */
export const SITE_DOMAIN = "https://tradinghq.vercel.app";