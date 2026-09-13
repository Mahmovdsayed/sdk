import type { RequestClient } from "../http/request.js";
import type { HirelyFaq, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching FAQ entries.
 *
 * ```ts
 * const faqs = await hirely.faqs();
 * const faq  = await hirely.faqs.getById("665...");
 * ```
 */
export interface FaqsResource {
  /**
   * Fetches all FAQ entries, sorted by creation date descending.
   *
   * @param options - Optional per-request options.
   */
  (options?: HirelyRequestOptions): Promise<HirelyFaq[]>;

  /**
   * Fetches a single FAQ entry by its MongoDB ID.
   *
   * @param id - The FAQ entry's `_id` string.
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no FAQ with that ID exists.
   */
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyFaq>;
}

/** @internal */
export function createFaqsResource(http: RequestClient): FaqsResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyFaq[]>("/faq", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyFaq>(`/faq/${id}`, options);

  return fn as FaqsResource;
}
