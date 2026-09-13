import type { RequestClient } from "../http/request.js";
import type { HirelyFaq, HirelyRequestOptions } from "../types.js";

export interface FaqsResource {
  
  (options?: HirelyRequestOptions): Promise<HirelyFaq[]>;

  
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyFaq>;
}

export function createFaqsResource(http: RequestClient): FaqsResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyFaq[]>("/faq", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyFaq>(`/faq/${id}`, options);

  return fn as FaqsResource;
}
