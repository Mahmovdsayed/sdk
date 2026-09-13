import type { RequestClient } from "../http/request.js";
import type { HirelyProject, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching projects.
 *
 * ```ts
 * const projects = await hirely.projects();
 * const project  = await hirely.projects.getById("665...");
 * const project  = await hirely.projects.getBySlug("my-app");
 * ```
 */
export interface ProjectsResource {
  /**
   * Fetches all public projects, sorted by featured then by creation date.
   *
   * @param options - Optional per-request options.
   *
   * @example
   * ```ts
   * const projects = await hirely.projects();
   * console.log(projects[0].title);
   * ```
   */
  (options?: HirelyRequestOptions): Promise<HirelyProject[]>;

  /**
   * Fetches a single project by its MongoDB ID.
   *
   * @param id - The project's `_id` string.
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no project with that ID exists.
   *
   * @example
   * ```ts
   * const project = await hirely.projects.getById("665f1a2b3c4d5e6f7a8b9c0d");
   * ```
   */
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyProject>;

  /**
   * Fetches a single project by its URL slug.
   *
   * @param slug - The project's slug (e.g. `"my-awesome-app"`).
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no project with that slug exists.
   *
   * @example
   * ```ts
   * const project = await hirely.projects.getBySlug("my-awesome-app");
   * console.log(project.technologies);
   * ```
   */
  getBySlug(slug: string, options?: HirelyRequestOptions): Promise<HirelyProject>;
}

/** @internal */
export function createProjectsResource(http: RequestClient): ProjectsResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyProject[]>("/projects", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyProject>(`/projects/${id}`, options);

  fn.getBySlug = (slug: string, options?: HirelyRequestOptions) =>
    http.request<HirelyProject>(`/projects/slug/${slug}`, options);

  return fn as ProjectsResource;
}
