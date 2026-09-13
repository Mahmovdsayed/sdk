import type { RequestClient } from "../http/request.js";
import type { HirelyWork, HirelyRequestOptions } from "../types.js";

export interface WorkResource {
  
  (options?: HirelyRequestOptions): Promise<HirelyWork[]>;

  
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyWork>;
}

export function createWorkResource(http: RequestClient): WorkResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyWork[]>("/works", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyWork>(`/works/${id}`, options);

  return fn as WorkResource;
}
