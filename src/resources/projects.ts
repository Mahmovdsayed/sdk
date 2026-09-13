import type { RequestClient } from "../http/request.js";
import type { HirelyProject, HirelyRequestOptions } from "../types.js";

export interface ProjectsResource {
  
  (options?: HirelyRequestOptions): Promise<HirelyProject[]>;

  
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyProject>;

  
  getBySlug(slug: string, options?: HirelyRequestOptions): Promise<HirelyProject>;
}

export function createProjectsResource(http: RequestClient): ProjectsResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyProject[]>("/projects", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyProject>(`/projects/${id}`, options);

  fn.getBySlug = (slug: string, options?: HirelyRequestOptions) =>
    http.request<HirelyProject>(`/projects/slug/${slug}`, options);

  return fn as ProjectsResource;
}
