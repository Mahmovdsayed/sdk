export const BASE_URL = "https://api.hirely.cc/api/v1/sdk" as const;
export const API_KEY_PREFIX = "hk_pub_" as const;
export const DEFAULT_TIMEOUT_MS = 30_000;
export const DEFAULT_RETRIES = 2;
export const RETRYABLE_STATUS_CODES = new Set([
  408, 425, 429, 500, 502, 503, 504,
]);

export const MAX_BACKOFF_MS = 30_000;
