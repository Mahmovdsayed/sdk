import type { RequestClient } from "../http/request.js";
import type { HirelyTestimonial, HirelyRequestOptions } from "../types.js";

export interface TestimonialsResource {
  
  (options?: HirelyRequestOptions): Promise<HirelyTestimonial[]>;

  
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyTestimonial>;
}

export function createTestimonialsResource(http: RequestClient): TestimonialsResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyTestimonial[]>("/testimonials", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyTestimonial>(`/testimonials/${id}`, options);

  return fn as TestimonialsResource;
}
