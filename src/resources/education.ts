import type { RequestClient } from "../http/request.js";
import type { HirelyEducation, HirelyRequestOptions } from "../types.js";

export interface EducationResource {
  
  (options?: HirelyRequestOptions): Promise<HirelyEducation[]>;

  
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyEducation>;
}

export function createEducationResource(http: RequestClient): EducationResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyEducation[]>("/educations", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyEducation>(`/educations/${id}`, options);

  return fn as EducationResource;
}
