import { RequestClient } from "./http/request.js";
import { API_KEY_PREFIX, DEFAULT_TIMEOUT_MS, DEFAULT_RETRIES } from "./constants.js";
import { HirelyValidationError } from "./errors.js";

import { createProjectsResource } from "./resources/projects.js";
import { createWorkResource } from "./resources/work.js";
import { createEducationResource } from "./resources/education.js";
import { createSkillsResource } from "./resources/skills.js";
import { createCertificatesResource } from "./resources/certificates.js";
import { createServicesResource } from "./resources/services.js";
import { createTestimonialsResource } from "./resources/testimonials.js";
import { createFaqsResource } from "./resources/faqs.js";
import { createContactsResource } from "./resources/contacts.js";
import { createCvResource } from "./resources/cv.js";

import type {
  HirelyConfig,
  HirelyPortfolio,
  HirelyMe,
  HirelyRequestOptions,
} from "./types.js";

import type { ProjectsResource } from "./resources/projects.js";
import type { WorkResource } from "./resources/work.js";
import type { EducationResource } from "./resources/education.js";
import type { SkillsResource } from "./resources/skills.js";
import type { CertificatesResource } from "./resources/certificates.js";
import type { ServicesResource } from "./resources/services.js";
import type { TestimonialsResource } from "./resources/testimonials.js";
import type { FaqsResource } from "./resources/faqs.js";
import type { ContactsResource } from "./resources/contacts.js";
import type { CvResource } from "./resources/cv.js";

/**
 * The Hirely SDK client.
 *
 * Instantiate once with your public API key and use any method or
 * resource to fetch your portfolio data from the Hirely API.
 *
 * @example Basic usage
 * ```ts
 * import Hirely from "@hirely/sdk";
 *
 * const hirely = new Hirely({
 *   apiKey: process.env.HIRELY_API_KEY!,
 * });
 *
 * const portfolio = await hirely.get();
 * const me        = await hirely.me();
 * const project   = await hirely.projects.getBySlug("my-app");
 * ```
 *
 * @example With caching and retries
 * ```ts
 * const hirely = new Hirely({
 *   apiKey: process.env.HIRELY_API_KEY!,
 *   timeout: 10_000,
 *   retries: 2,
 *   cache: { enabled: true, ttl: 300 },
 * });
 * ```
 */
export default class Hirely {
  /** @internal */
  private readonly http: RequestClient;

  /**
   * Projects resource.
   * - `hirely.projects()` — all public projects
   * - `hirely.projects.getById(id)` — fetch by MongoDB ID
   * - `hirely.projects.getBySlug(slug)` — fetch by URL slug
   */
  readonly projects: ProjectsResource;

  /**
   * Work experience resource.
   * - `hirely.work()` — all work experience entries
   * - `hirely.work.getById(id)` — fetch a single entry
   */
  readonly work: WorkResource;

  /**
   * Education resource.
   * - `hirely.education()` — all education entries
   * - `hirely.education.getById(id)` — fetch a single entry
   */
  readonly education: EducationResource;

  /**
   * Skills resource.
   * - `hirely.skills()` — all skills
   */
  readonly skills: SkillsResource;

  /**
   * Certificates resource.
   * - `hirely.certificates()` — all certificates
   * - `hirely.certificates.getById(id)` — fetch a single certificate
   */
  readonly certificates: CertificatesResource;

  /**
   * Services resource.
   * - `hirely.services()` — all public services
   * - `hirely.services.getById(id)` — fetch a single service
   */
  readonly services: ServicesResource;

  /**
   * Testimonials resource (approved and public only).
   * - `hirely.testimonials()` — all testimonials
   * - `hirely.testimonials.getById(id)` — fetch a single testimonial
   */
  readonly testimonials: TestimonialsResource;

  /**
   * FAQ resource.
   * - `hirely.faqs()` — all FAQ entries
   * - `hirely.faqs.getById(id)` — fetch a single FAQ
   */
  readonly faqs: FaqsResource;

  /**
   * Contacts resource.
   * - `hirely.contacts()` — public social links
   */
  readonly contacts: ContactsResource;

  /**
   * CV resource.
   * - `hirely.cv()` — most recent public CV
   */
  readonly cv: CvResource;

  constructor(config: HirelyConfig) {
    if (!config.apiKey) {
      throw new HirelyValidationError(
        "Hirely API key is required. Pass it as `apiKey` in the constructor.",
        400,
      );
    }

    if (!config.apiKey.startsWith(API_KEY_PREFIX)) {
      throw new HirelyValidationError(
        `Invalid Hirely API key. Keys must start with "${API_KEY_PREFIX}".`,
        400,
      );
    }

    this.http = new RequestClient({
  apiKey: config.apiKey,
  timeout: config.timeout ?? DEFAULT_TIMEOUT_MS,
  retries: config.retries ?? DEFAULT_RETRIES,
  fetchFn: config.fetch ?? globalThis.fetch.bind(globalThis),
  cacheConfig: config.cache,   // ← can be `undefined`
});

    this.projects = createProjectsResource(this.http);
    this.work = createWorkResource(this.http);
    this.education = createEducationResource(this.http);
    this.skills = createSkillsResource(this.http);
    this.certificates = createCertificatesResource(this.http);
    this.services = createServicesResource(this.http);
    this.testimonials = createTestimonialsResource(this.http);
    this.faqs = createFaqsResource(this.http);
    this.contacts = createContactsResource(this.http);
    this.cv = createCvResource(this.http);
  }

  /**
   * Fetches the complete public portfolio in a single request.
   *
   * Returns profile, projects, work, education, skills, certificates,
   * services, testimonials, FAQs, contacts, and CV.
   *
   * @param options - Optional per-request options.
   *
   * @example
   * ```ts
   * const portfolio = await hirely.get();
   * console.log(portfolio.profile?.firstName);
   * console.log(portfolio.projects.length);
   * ```
   *
   * @example Next.js Server Component
   * ```tsx
   * export default async function Page() {
   *   const portfolio = await hirely.get();
   *   return (
   *     <main>
   *       <h1>{portfolio.profile?.firstName} {portfolio.profile?.lastName}</h1>
   *       {portfolio.projects.map((p) => (
   *         <article key={p._id}><h2>{p.title}</h2></article>
   *       ))}
   *     </main>
   *   );
   * }
   * ```
   */
  get(options?: HirelyRequestOptions): Promise<HirelyPortfolio> {
    return this.http.request<HirelyPortfolio>("/all", options);
  }

  /**
   * Fetches account information and the full public profile.
   *
   * Returns account-level data (username, email, role, plan) plus the
   * complete profile (name, bio, avatar, location, birthday, etc.).
   *
   * @param options - Optional per-request options.
   *
   * @example
   * ```ts
   * const me = await hirely.me();
   * console.log(me.userName);              // "mahmoud"
   * console.log(me.plan);                  // "pro"
   * console.log(me.profile?.firstName);    // "Mahmoud"
   * console.log(me.profile?.positionName); // "Full-Stack Developer"
   * console.log(me.profile?.avatar?.url);  // "https://..."
   * ```
   */
  me(options?: HirelyRequestOptions): Promise<HirelyMe> {
    return this.http.request<HirelyMe>("/me", options);
  }
}
