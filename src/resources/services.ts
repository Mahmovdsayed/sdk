import type { RequestClient } from "../http/request.js";
import type { HirelyService, HirelyRequestOptions } from "../types.js";

export interface ServicesResource {
  
  (options?: HirelyRequestOptions): Promise<HirelyService[]>;

  
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyService>;
}

export function createServicesResource(http: RequestClient): ServicesResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyService[]>("/services", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyService>(`/services/${id}`, options);

  return fn as ServicesResource;
}
