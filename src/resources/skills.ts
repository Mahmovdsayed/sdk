import type { RequestClient } from "../http/request.js";
import type { HirelySkill, HirelyRequestOptions } from "../types.js";

export interface SkillsResource {
  
  (options?: HirelyRequestOptions): Promise<HirelySkill[]>;
}

export function createSkillsResource(http: RequestClient): SkillsResource {
  return (options?: HirelyRequestOptions) =>
    http.request<HirelySkill[]>("/skills", options);
}
