import type { RequestClient } from "../http/request.js";
import type { HirelyTestimonial, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching client testimonials.
 * Only approved, public testimonials are returned.
 *
 * ```ts
 * const testimonials = await hirely.testimonials();
 * const testimonial  = await hirely.testimonials.getById("665...");
 * ```
 */
export interface TestimonialsResource {
  /**
   * Fetches all approved public testimonials, sorted by creation date descending.
   *
   * @param options - Optional per-request options.
   */
  (options?: HirelyRequestOptions): Promise<HirelyTestimonial[]>;

  /**
   * Fetches a single testimonial by its MongoDB ID.
   *
   * @param id - The testimonial's `_id` string.
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no testimonial with that ID exists.
   */
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyTestimonial>;
}

/** @internal */
export function createTestimonialsResource(http: RequestClient): TestimonialsResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyTestimonial[]>("/testimonials", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyTestimonial>(`/testimonials/${id}`, options);

  return fn as TestimonialsResource;
}
