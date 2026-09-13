import type { RequestClient } from "../http/request.js";
import type { HirelyWork, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching work experience.
 *
 * ```ts
 * const work = await hirely.work();
 * const job  = await hirely.work.getById("665...");
 * ```
 */
export interface WorkResource {
  /**
   * Fetches all work experience entries, sorted by start date descending.
   *
   * @param options - Optional per-request options.
   *
   * @example
   * ```ts
   * const jobs = await hirely.work();
   * jobs.forEach(j => console.log(j.companyName, j.position));
   * ```
   */
  (options?: HirelyRequestOptions): Promise<HirelyWork[]>;

  /**
   * Fetches a single work experience entry by its MongoDB ID.
   *
   * @param id - The work entry's `_id` string.
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no entry with that ID exists.
   */
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyWork>;
}

/** @internal */
export function createWorkResource(http: RequestClient): WorkResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyWork[]>("/works", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyWork>(`/works/${id}`, options);

  return fn as WorkResource;
}
