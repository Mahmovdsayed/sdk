/** @internal Base URL for the Hirely public API. Not configurable by consumers. */
export const BASE_URL = "https://hirely.cc/api/v1/sdk" as const;

/** @internal Required prefix for all Hirely public API keys. */
export const API_KEY_PREFIX = "hk_pub_" as const;

/** Default request timeout in milliseconds. */
export const DEFAULT_TIMEOUT_MS = 30_000;

/** Default number of retry attempts for transient errors. */
export const DEFAULT_RETRIES = 2;

/** HTTP status codes that trigger a retry. */
export const RETRYABLE_STATUS_CODES = new Set([408, 425, 429, 500, 502, 503, 504]);

/** Maximum backoff delay between retries in milliseconds. */
export const MAX_BACKOFF_MS = 30_000;
