export class RateLimitUnavailable extends Error {}
export function checkedLimit(data: unknown, error: unknown): boolean {
  if (error || typeof data !== 'boolean') throw new RateLimitUnavailable('Rate-limit service unavailable');
  return data;
}
type Limiter = (subject: string, bucket: string, seconds: number, max: number) => Promise<boolean>;
/** Header-derived IPs are advisory. Shared budgets cannot be bypassed by changing headers. */
export async function marketLimit(subject: string, limit: Limiter): Promise<boolean> {
  for (const [key, bucket, seconds, max] of [
    ['public-market-proxy', 'lmd-global-burst', 10, 100],
    ['public-market-proxy', 'lmd-global-minute', 60, 300],
    ['public-market-proxy', 'lmd-global-day', 86400, 10000],
    [subject, 'lmd-burst', 10, 25],
    [subject, 'lmd-min', 60, 90],
  ] as const) if (!await limit(key, bucket, seconds, max)) return false;
  return true;
}
