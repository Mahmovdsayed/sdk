import type { RequestClient } from "../http/request.js";
import type { HirelySkill, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching skills.
 *
 * ```ts
 * const skills = await hirely.skills();
 * ```
 */
export interface SkillsResource {
  /**
   * Fetches all skills, sorted by creation date descending.
   *
   * @param options - Optional per-request options.
   *
   * @example
   * ```ts
   * const skills = await hirely.skills();
   * const frontend = skills.filter(s => s.category === "Frontend");
   * ```
   */
  (options?: HirelyRequestOptions): Promise<HirelySkill[]>;
}

/** @internal */
export function createSkillsResource(http: RequestClient): SkillsResource {
  return (options?: HirelyRequestOptions) =>
    http.request<HirelySkill[]>("/skills", options);
}
