import {
  HirelyError,
  HirelyAuthenticationError,
  HirelyNotFoundError,
  HirelyValidationError,
  HirelyRateLimitError,
  HirelyTimeoutError,
  HirelyServerError,
} from "../errors.js";
import type {
  HirelyApiResponse,
  HirelyCache,
  HirelyCacheConfig,
  HirelyRequestOptions,
} from "../types.js";
import { MemoryCache } from "../cache/memory-cache.js";
import {
  BASE_URL,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_RETRIES,
  RETRYABLE_STATUS_CODES,
  MAX_BACKOFF_MS,
} from "../constants.js";

export interface RequestClientConfig {
  apiKey: string;
  timeout: number;
  retries: number;
  fetchFn: typeof fetch;
  cacheConfig?: HirelyCacheConfig;
}

export class RequestClient {
  private readonly apiKey: string;
  private readonly timeout: number;
  private readonly retries: number;
  private readonly fetchFn: typeof fetch;
  private readonly cache: HirelyCache | null = null;
  private readonly cacheTtl: number;

  constructor(config: RequestClientConfig) {
    this.apiKey = config.apiKey;
    this.timeout = config.timeout;
    this.retries = config.retries;
    this.fetchFn = config.fetchFn;
    this.cacheTtl = config.cacheConfig?.ttl ?? 300;

    if (config.cacheConfig?.enabled) {
      this.cache = config.cacheConfig.store ?? new MemoryCache();
    }
  }

  private buildCacheKey(endpoint: string): string {
    
    
    const keyScope = this.apiKey.slice(-8);
    return `${keyScope}:${BASE_URL}${endpoint}`;
  }

  private async fetchWithTimeout(
    url: string,
    init: RequestInit,
  ): Promise<Response> {
    if (this.timeout === 0) {
      return this.fetchFn(url, init);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      return await this.fetchFn(url, { ...init, signal: controller.signal });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new HirelyTimeoutError(
          `Request timed out after ${this.timeout}ms`,
        );
      }
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  private throwForStatus(
    status: number,
    message: string,
    requestId?: string,
  ): never {
    switch (true) {
      case status === 401 || status === 403:
        throw new HirelyAuthenticationError(message, status, requestId);
      case status === 404:
        throw new HirelyNotFoundError(message, requestId);
      case status === 400 || status === 422:
        throw new HirelyValidationError(message, status, requestId);
      case status === 429:
        throw new HirelyRateLimitError(message, undefined, requestId);
      case status >= 500:
        throw new HirelyServerError(message, status, requestId);
      default:
        throw new HirelyError(message, status, "REQUEST_FAILED", requestId);
    }
  }

  private getRetryAfter(headers: Headers): number | undefined {
    const value = headers.get("retry-after");
    if (!value) return undefined;
    const seconds = Number(value);
    return Number.isFinite(seconds) ? seconds : undefined;
  }

  private computeBackoff(attempt: number, retryAfterSeconds?: number): number {
    if (retryAfterSeconds != null) {
      return Math.min(retryAfterSeconds * 1000, MAX_BACKOFF_MS);
    }
    return Math.min(1000 * Math.pow(2, attempt), MAX_BACKOFF_MS);
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async request<T>(
    endpoint: string,
    options?: HirelyRequestOptions,
  ): Promise<T> {
    const bypassCache = options?.cache === false;
    const cacheKey = this.buildCacheKey(endpoint);

    
    if (this.cache && !bypassCache) {
      const cached = await this.cache.get<T>(cacheKey);
      if (cached !== undefined) return cached;
    }

    const url = `${BASE_URL}${endpoint}`;
    const headers: Record<string, string> = {
      Authorization: `Bearer ${this.apiKey}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let lastError: unknown;

    for (let attempt = 0; attempt <= this.retries; attempt++) {
      let response: Response;

      try {
        response = await this.fetchWithTimeout(url, { method: "GET", headers });
      } catch (error) {
        
        if (error instanceof HirelyTimeoutError) throw error;

        
        lastError = error;
        if (attempt < this.retries) {
          await this.sleep(this.computeBackoff(attempt));
          continue;
        }
        throw new HirelyError(
          error instanceof Error ? error.message : "Network request failed",
          0,
          "NETWORK_ERROR",
        );
      }

      const requestId = response.headers.get("x-request-id") ?? undefined;

      
      if (response.status === 429 && attempt < this.retries) {
        const retryAfter = this.getRetryAfter(response.headers);
        await this.sleep(this.computeBackoff(attempt, retryAfter));
        continue;
      }

      
      if (
        RETRYABLE_STATUS_CODES.has(response.status) &&
        response.status !== 429 &&
        attempt < this.retries
      ) {
        await this.sleep(this.computeBackoff(attempt));
        continue;
      }

      
      let body: HirelyApiResponse<T> | undefined;
      try {
        body = (await response.json()) as HirelyApiResponse<T>;
      } catch {
        
        
        
        if (!response.ok) {
          this.throwForStatus(response.status, "Request failed", requestId);
        }
        throw new HirelyError(
          "Invalid response from Hirely API",
          response.status,
          "PARSE_ERROR",
          requestId,
        );
      }

      
      if (!response.ok || !body.success) {
        this.throwForStatus(
          response.status,
          body?.message ?? "Request failed",
          requestId,
        );
      }

      const data = body.data;

      
      if (this.cache && !bypassCache) {
        await this.cache.set(cacheKey, data, this.cacheTtl);
      }

      return data;
    }

    
    throw (
      lastError ??
      new HirelyError("Request failed after retries", 0, "REQUEST_FAILED")
    );
  }
}
