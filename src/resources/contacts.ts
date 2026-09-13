import type { RequestClient } from "../http/request.js";
import type { HirelyContact, HirelyRequestOptions } from "../types.js";

export type ContactsResource = (options?: HirelyRequestOptions) => Promise<HirelyContact | null>;

export function createContactsResource(http: RequestClient): ContactsResource {
  return (options?: HirelyRequestOptions) =>
    http.request<HirelyContact | null>("/contacts", options);
}
