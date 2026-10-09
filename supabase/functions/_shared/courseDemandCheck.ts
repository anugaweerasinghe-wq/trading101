import { googleSearchDemand } from "./courseGenerator.ts";

export async function checkCourseDemand(credentials: Record<string, string>, property: string, fetcher = fetch) {
  let tokenHttpStatus: number | null = null, queryHttpStatus: number | null = null, accessToken = "";
  const tracked: typeof fetch = async (url, init) => {
    const response = await fetcher(url, init);
    if (String(url) === "https://oauth2.googleapis.com/token") {
      tokenHttpStatus = response.status;
      if (response.ok) accessToken = (await response.clone().json()).access_token ?? "";
    } else queryHttpStatus = response.status;
    return response;
  };
  try {
    const rows = await googleSearchDemand(credentials, property, tracked);
    return { ok: true, matchingQueries: rows.length, tokenHttpStatus, queryHttpStatus, error: null, availableProperties: [] };
  } catch {
    const availableProperties: string[] = [];
    if (accessToken && queryHttpStatus === 403) {
      try {
        const response = await fetcher("https://www.googleapis.com/webmasters/v3/sites", {
          headers: { Authorization: "Bearer " + accessToken }, signal: AbortSignal.timeout(8000),
        });
        if (response.ok) for (const site of (await response.json()).siteEntry ?? []) {
          // Return only this site's property identifiers, never credentials or other sites.
          if (["sc-domain:thetradehq.com", "https://www.thetradehq.com/", "https://thetradehq.com/"].includes(site.siteUrl)) availableProperties.push(site.siteUrl);
        }
      } catch { /* Keep a bounded, credential-free result even on network failure. */ }
    }
    return { ok: false, matchingQueries: null, tokenHttpStatus, queryHttpStatus,
      error: tokenHttpStatus !== 200 ? "authentication_failed" : queryHttpStatus === 403 ? "property_access_denied" : "query_failed",
      availableProperties };
  }
}
