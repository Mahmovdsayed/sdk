import type { RequestClient } from "../http/request.js";
import type { HirelyCV, HirelyRequestOptions } from "../types.js";

export type CvResource = (options?: HirelyRequestOptions) => Promise<HirelyCV | null>;

export function createCvResource(http: RequestClient): CvResource {
  return (options?: HirelyRequestOptions) =>
    http.request<HirelyCV | null>("/cv", options);
}
