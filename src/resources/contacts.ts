import type { RequestClient } from "../http/request.js";
import type { HirelyContact, HirelyRequestOptions } from "../types.js";

/**
 * A callable resource for fetching public contact information (social links).
 *
 * @returns The contact entry, or `null` if none has been set up.
 *
 * @example
 * ```ts
 * const contact = await hirely.contacts();
 * contact?.socialLinks?.forEach(link => {
 *   console.log(link.platform, link.url);
 * });
 * ```
 */
export type ContactsResource = (options?: HirelyRequestOptions) => Promise<HirelyContact | null>;

/** @internal */
export function createContactsResource(http: RequestClient): ContactsResource {
  return (options?: HirelyRequestOptions) =>
    http.request<HirelyContact | null>("/contacts", options);
}
