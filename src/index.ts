/**
 * @hirely/sdk — Official JavaScript & TypeScript SDK for Hirely.
 *
 * @example
 * ```ts
 * import Hirely from "@hirely/sdk";
 *
 * const hirely = new Hirely({ apiKey: process.env.HIRELY_API_KEY! });
 *
 * const portfolio = await hirely.get();
 * const me        = await hirely.me();
 * const project   = await hirely.projects.getBySlug("my-app");
 * ```
 *
 * @module
 */

export { default, default as Hirely } from "./client.js";

export {
  HirelyError,
  HirelyAuthenticationError,
  HirelyNotFoundError,
  HirelyValidationError,
  HirelyRateLimitError,
  HirelyTimeoutError,
  HirelyServerError,
} from "./errors.js";

export type {
  HirelyConfig,
  HirelyCacheConfig,
  HirelyCache,
  HirelyRequestOptions,
  HirelyPortfolio,
  HirelyMe,
  HirelyProfile,
  HirelyProject,
  HirelyProjectMedia,
  HirelyWork,
  HirelyEducation,
  HirelySkill,
  HirelyCertificate,
  HirelyService,
  HirelyTestimonial,
  HirelyTestimonialClient,
  HirelyFaq,
  HirelyContact,
  HirelySocialLink,
  HirelyCV,
} from "./types.js";

export type { ProjectsResource } from "./resources/projects.js";
export type { WorkResource } from "./resources/work.js";
export type { EducationResource } from "./resources/education.js";
export type { SkillsResource } from "./resources/skills.js";
export type { CertificatesResource } from "./resources/certificates.js";
export type { ServicesResource } from "./resources/services.js";
export type { TestimonialsResource } from "./resources/testimonials.js";
export type { FaqsResource } from "./resources/faqs.js";
export type { ContactsResource } from "./resources/contacts.js";
export type { CvResource } from "./resources/cv.js";
