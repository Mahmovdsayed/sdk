export { default } from "./client.js";
export { default as Hirely } from "./client.js";

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
  HirелySocialLink,
  HirelyCV,
  HirelyApiResponse,
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
