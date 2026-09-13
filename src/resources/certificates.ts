import type { RequestClient } from "../http/request.js";
import type { HirelyCertificate, HirelyRequestOptions } from "../types.js";

export interface CertificatesResource {
  
  (options?: HirelyRequestOptions): Promise<HirelyCertificate[]>;

  
  getById(id: string, options?: HirelyRequestOptions): Promise<HirelyCertificate>;
}

export function createCertificatesResource(http: RequestClient): CertificatesResource {
  const fn = (options?: HirelyRequestOptions) =>
    http.request<HirelyCertificate[]>("/certificates", options);

  fn.getById = (id: string, options?: HirelyRequestOptions) =>
    http.request<HirelyCertificate>(`/certificates/${id}`, options);

  return fn as CertificatesResource;
}
