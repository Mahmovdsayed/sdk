import type { RequestClient } from "../http/request.js";
import type { HirelyEducation, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching education history.
 *
 * ```ts
 * const education = await hirely.education();
 * const entry     = await hirely.education.getById("665...");
 * ```
 */
export interface EducationResource {
  /**
   * Fetches all education entries, sorted by start date descending.
   *
   * @param options - Optional per-request options.
   */
  (options?: HirelyRequestOptions): Promise<HirelyEducation[]>;

  /**
   * Fetches a single education entry by its MongoDB ID.
   *
   * @param id - The education entry's `_id` string.
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no entry with that ID exists.
   */
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyEducation>;
}

/** @internal */
export function createEducationResource(http: RequestClient): EducationResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyEducation[]>("/educations", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyEducation>(`/educations/${id}`, options);

  return fn as EducationResource;
}
