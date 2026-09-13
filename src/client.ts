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
  HirelyContact,
  HirelyCV,
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

export default class Hirely {
  private readonly http: RequestClient;

  

  
  readonly projects: ProjectsResource;

  
  readonly work: WorkResource;

  
  readonly education: EducationResource;

  
  readonly skills: SkillsResource;

  
  readonly certificates: CertificatesResource;

  
  readonly services: ServicesResource;

  
  readonly testimonials: TestimonialsResource;

  
  readonly faqs: FaqsResource;

  
  readonly contacts: ContactsResource;

  
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
      cacheConfig: config.cache,
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

  

  
  get(options?: HirelyRequestOptions): Promise<HirelyPortfolio> {
    return this.http.request<HirelyPortfolio>("/all", options);
  }

  
  me(options?: HirelyRequestOptions): Promise<HirelyMe> {
    return this.http.request<HirelyMe>("/me", options);
  }
}
