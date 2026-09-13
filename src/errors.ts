/**
 * Base class for all Hirely SDK errors.
 *
 * @example
 * ```ts
 * import { HirelyError } from "@hirely/sdk";
 *
 * try {
 *   await hirely.get();
 * } catch (error) {
 *   if (error instanceof HirelyError) {
 *     console.error(error.status, error.message);
 *   }
 * }
 * ```
 */
export class HirelyError extends Error {
  /** HTTP status code (0 for network/timeout errors). */
  readonly status: number;
  /** Machine-readable error code. */
  readonly code: string;
  /** The request ID from the server, if available. */
  readonly requestId?: string;

  constructor(message: string, status: number, code = "HIRELY_ERROR", requestId?: string) {
    super(message);
    this.name = "HirelyError";
    this.status = status;
    this.code = code;
    this.requestId = requestId;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

/**
 * Thrown when the API key is missing, invalid, or revoked (HTTP 401/403).
 *
 * @example
 * ```ts
 * import { HirelyAuthenticationError } from "@hirely/sdk";
 *
 * try {
 *   await hirely.get();
 * } catch (error) {
 *   if (error instanceof HirelyAuthenticationError) {
 *     console.error("Check your HIRELY_API_KEY.");
 *   }
 * }
 * ```
 */
export class HirelyAuthenticationError extends HirelyError {
  constructor(message = "Invalid or missing API key", status = 401, requestId?: string) {
    super(message, status, "AUTHENTICATION_ERROR", requestId);
    this.name = "HirelyAuthenticationError";
  }
}

/**
 * Thrown when a requested resource does not exist (HTTP 404).
 *
 * @example
 * ```ts
 * import { HirelyNotFoundError } from "@hirely/sdk";
 *
 * try {
 *   const project = await hirely.projects.getBySlug("nonexistent");
 * } catch (error) {
 *   if (error instanceof HirelyNotFoundError) {
 *     console.log("Project not found");
 *   }
 * }
 * ```
 */
export class HirelyNotFoundError extends HirelyError {
  constructor(message = "Resource not found", requestId?: string) {
    super(message, 404, "NOT_FOUND", requestId);
    this.name = "HirelyNotFoundError";
  }
}

/**
 * Thrown when a request fails validation (HTTP 400/422).
 */
export class HirelyValidationError extends HirelyError {
  constructor(message = "Validation error", status = 422, requestId?: string) {
    super(message, status, "VALIDATION_ERROR", requestId);
    this.name = "HirelyValidationError";
  }
}

/**
 * Thrown when the API rate limit has been exceeded (HTTP 429).
 *
 * @example
 * ```ts
 * import { HirelyRateLimitError } from "@hirely/sdk";
 *
 * try {
 *   await hirely.get();
 * } catch (error) {
 *   if (error instanceof HirelyRateLimitError) {
 *     console.log(`Retry after ${error.retryAfter}s`);
 *   }
 * }
 * ```
 */
export class HirelyRateLimitError extends HirelyError {
  /** Seconds until the rate limit resets (from `Retry-After` header). */
  readonly retryAfter?: number;

  constructor(message = "Rate limit exceeded", retryAfter?: number, requestId?: string) {
    super(message, 429, "RATE_LIMIT_EXCEEDED", requestId);
    this.name = "HirelyRateLimitError";
    this.retryAfter = retryAfter;
  }
}

/**
 * Thrown when a request exceeds the configured timeout.
 *
 * @example
 * ```ts
 * const hirely = new Hirely({ apiKey, timeout: 5000 });
 *
 * try {
 *   await hirely.get();
 * } catch (error) {
 *   if (error instanceof HirelyTimeoutError) {
 *     console.error("Request timed out after 5s");
 *   }
 * }
 * ```
 */
export class HirelyTimeoutError extends HirelyError {
  constructor(message = "Request timed out") {
    super(message, 0, "TIMEOUT");
    this.name = "HirelyTimeoutError";
  }
}

/**
 * Thrown when the Hirely API returns a server-side error (HTTP 5xx).
 */
export class HirelyServerError extends HirelyError {
  constructor(message = "Internal server error", status = 500, requestId?: string) {
    super(message, status, "SERVER_ERROR", requestId);
    this.name = "HirelyServerError";
  }
}
