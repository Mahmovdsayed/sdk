import type { RequestClient } from "../http/request.js";
import type { HirelyService, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching services offered by the portfolio owner.
 *
 * ```ts
 * const services = await hirely.services();
 * const service  = await hirely.services.getById("665...");
 * ```
 */
export interface ServicesResource {
  /**
   * Fetches all public services, sorted by creation date descending.
   *
   * @param options - Optional per-request options.
   */
  (options?: HirelyRequestOptions): Promise<HirelyService[]>;

  /**
   * Fetches a single service by its MongoDB ID.
   *
   * @param id - The service's `_id` string.
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no service with that ID exists.
   */
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyService>;
}

/** @internal */
export function createServicesResource(http: RequestClient): ServicesResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyService[]>("/services", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyService>(`/services/${id}`, options);

  return fn as ServicesResource;
}
