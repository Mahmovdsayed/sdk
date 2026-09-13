import type { RequestClient } from "../http/request.js";
import type { HirelyCV, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching the most recent public CV (résumé).
 *
 * @returns The CV with download URLs, or `null` if no public CV exists.
 *
 * @example
 * ```ts
 * const cv = await hirely.cv();
 * if (cv?.pdfUrl) {
 *   console.log("Download PDF:", cv.pdfUrl);
 * }
 * ```
 */
export type CvResource = (options?: HirelyRequestOptions) => Promise<HirelyCV | null>;

/** @internal */
export function createCvResource(http: RequestClient): CvResource {
  return (options?: HirelyRequestOptions) =>
    http.request<HirelyCV | null>("/cv", options);
}
