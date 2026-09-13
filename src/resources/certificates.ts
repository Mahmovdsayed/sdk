import type { RequestClient } from "../http/request.js";
import type { HirelyCertificate, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching certificates and credentials.
 *
 * ```ts
 * const certs = await hirely.certificates();
 * const cert  = await hirely.certificates.getById("665...");
 * ```
 */
export interface CertificatesResource {
  /**
   * Fetches all certificates, sorted by issue date descending.
   *
   * @param options - Optional per-request options.
   */
  (options?: HirelyRequestOptions): Promise<HirelyCertificate[]>;

  /**
   * Fetches a single certificate by its MongoDB ID.
   *
   * @param id - The certificate's `_id` string.
   * @param options - Optional per-request options.
   * @throws {HirelyNotFoundError} If no certificate with that ID exists.
   */
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyCertificate>;
}

/** @internal */
export function createCertificatesResource(http: RequestClient): CertificatesResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyCertificate[]>("/certificates", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyCertificate>(`/certificates/${id}`, options);

  return fn as CertificatesResource;
}
