export interface HirelyConfig {
  /**
   * Your Hirely public API key.
   * Must start with `hk_pub_`.
   * Generate one in your Hirely dashboard.
   */
  apiKey: string;
  /**
   * Request timeout in milliseconds.
   * Defaults to `30_000` (30 seconds). Set to `0` to disable.
   */
  timeout?: number;
  /**
   * Retry attempts for transient errors (5xx, 429, etc.).
   * Defaults to `2`. Set to `0` to disable retries.
   */
  retries?: number;
  /** SDK-side response caching. Disabled by default. */
  cache?: HirelyCacheConfig;
  /**
   * Custom `fetch` implementation.
   * Defaults to the global `fetch`.
   */
  fetch?: typeof fetch;
}

export interface HirelyCacheConfig {
  /** Whether SDK-side caching is enabled. */
  enabled: boolean;
  /** Time-to-live in seconds. Defaults to `300`. */
  ttl?: number;
  /** Custom cache store (e.g. Redis). Defaults to in-memory Map. */
  store?: HirelyCache;
}

/**
 * Interface for a custom cache store.
 *
 * @example
 * ```ts
 * const store: HirelyCache = {
 *   get: (key) => redis.get(key).then(JSON.parse),
 *   set: (key, value, ttl) => redis.set(key, JSON.stringify(value), 'EX', ttl),
 * };
 * ```
 */
export interface HirelyCache {
  /** Retrieve a cached value. Return `undefined` on miss. */
  get<T>(key: string): T | undefined | Promise<T | undefined>;
  /** Store a value with a TTL in seconds. */
  set<T>(key: string, value: T, ttl: number): void | Promise<void>;
  /** Delete a single cached entry. */
  delete?(key: string): void | Promise<void>;
  /** Clear all cached entries. */
  clear?(): void | Promise<void>;
}

/**
 * Per-request options passed to any SDK method.
 *
 * @example
 * ```ts
 * const fresh = await hirely.get({ cache: false });
 * ```
 */
export interface HirelyRequestOptions {
  /** Set to `false` to bypass the SDK cache for this request. */
  cache?: false;
}

/** @internal */
export interface HirelyApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

/**
 * The complete portfolio returned by `hirely.get()`.
 */
export interface HirelyPortfolio {
  userName?: string;
  email?: string;
  role?: string;
  plan?: string;
  profile?: HirelyProfile | null;
  projects: HirelyProject[];
  work: HirelyWork[];
  education: HirelyEducation[];
  certificates: HirelyCertificate[];
  testimonials: HirelyTestimonial[];
  services: HirelyService[];
  skills: HirelySkill[];
  faq: HirelyFaq[];
  contact?: HirelyContact | null;
  cv?: HirelyCV | null;
}

/**
 * Account information returned by `hirely.me()`.
 *
 * Includes account-level fields and the full embedded public profile.
 */
export interface HirelyMe {
  /** MongoDB document ID. */
  _id: string;
  /** The Hirely username. */
  userName?: string;
  /** Account email address. */
  email: string;
  /** Account role: `"freelancer"` or `"client"`. */
  role: string;
  /** Current subscription plan. */
  plan: string;
  /** Full public profile. `null` if not set up yet. */
  profile: HirelyProfile | null;
}

/**
 * Full public profile for a Hirely account.
 */
export interface HirelyProfile {
  /** MongoDB document ID. */
  _id: string;
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
  /** Professional title or position. */
  positionName?: string;
  /** Short professional bio. */
  about?: string;
  /** Date of birth. */
  birthday?: string;
  /** Contact phone number. */
  phone?: string;
  /** Nationality. */
  nationality?: string;
  /** Country of residence. */
  country?: string;
  /** City of residence. */
  city?: string;
  /** Gender. */
  gender?: "male" | "female";
  /** Public avatar image. */
  avatar?: { url?: string; public_id?: string } | null;
  /** Number of portfolio likes. */
  likes?: number;
  /** Profile visibility. */
  visibility?: "public" | "private" | "unlisted";
  /** ISO timestamp of creation. */
  createdAt?: string;
  /** ISO timestamp of last update. */
  updatedAt?: string;
}

/**
 * A single portfolio project.
 */
export interface HirelyProject {
  /** MongoDB document ID. */
  _id: string;
  /** Project title. */
  title?: string;
  /** Short summary (max 300 characters). */
  shortDescription?: string;
  /** Full project description. */
  description?: string;
  /** Project category (e.g. "Web Development"). */
  category?: string;
  /** Project status (e.g. "Completed"). */
  status?: string;
  /** Human-readable project duration. */
  duration?: string;
  /** Featured image. */
  featuredImage?: { url?: string } | null;
  /** Additional media gallery. */
  media?: HirelyProjectMedia[];
  /** Industry this project belongs to. */
  industry?: string;
  /** URL-friendly slug for deep linking. */
  slug?: string;
  /** Whether this project is featured/pinned. */
  featured?: boolean;
  /** Technologies used. */
  technologies?: string[];
  /** Tools used. */
  tools?: string[];
  /** Target platforms. */
  platforms?: string[];
  /** Live demo URL. */
  demoUrl?: string;
  /** Source code repository URL. */
  repositoryUrl?: string;
  /** Case study URL. */
  caseStudyUrl?: string;
  /** Key achievements. */
  achievements?: string[];
  /** Challenges faced. */
  challenges?: string[];
  /** Key learnings. */
  learnings?: string[];
  /** Notable features. */
  features?: string[];
  /** Quantitative project metrics. */
  metrics?: Array<{ name: string; value: string }>;
  /** Tags for filtering. */
  tags?: string[];
  /** Total view count. */
  views?: number;
  /** Total like count. */
  likes?: number;
  /** Project start date. */
  startDate?: string;
  /** Project end date. */
  endDate?: string;
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/** A media item within a project gallery. */
export interface HirelyProjectMedia {
  type?: "image";
  url?: string;
  caption?: string;
  thumbnail?: string;
  order?: number;
}

/**
 * A work experience entry.
 */
export interface HirelyWork {
  /** MongoDB document ID. */
  _id: string;
  /** Company logo. */
  companyImage?: { url?: string } | null;
  /** Company or organisation name. */
  companyName?: string;
  /** Job title / position held. */
  position?: string;
  /** Employment start date. */
  startDate?: string;
  /** Employment end date. `null` if `isCurrent` is `true`. */
  endDate?: string | null;
  /** Role description. */
  description?: string;
  /** Whether this is the current position. */
  isCurrent?: boolean;
  /** Employment type (e.g. "Full-time", "Contract"). */
  employmentType?: string;
  /** Work location or "Remote". */
  location?: string;
  /** Key achievements. */
  achievements?: string[];
  /** Key responsibilities. */
  responsibilities?: string[];
  /** Skills used in this role. */
  skills?: string[];
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/**
 * An education history entry.
 */
export interface HirelyEducation {
  /** MongoDB document ID. */
  _id: string;
  /** Name of the institution. */
  institution?: string;
  /** Degree type (e.g. "Bachelor's", "Master's"). */
  degree?: string;
  /** Field or major of study. */
  fieldOfStudy?: string;
  /** Start date. */
  startDate?: string;
  /** End date. `null` if `isCurrent` is `true`. */
  endDate?: string | null;
  /** Letter grade (e.g. "A+"). */
  grade?: string;
  /** Grade point average. */
  gpa?: number;
  /** Additional description or notes. */
  description?: string;
  /** Institution logo. */
  institutionImage?: { url?: string } | null;
  /** Whether currently enrolled. */
  isCurrent?: boolean;
  /** Institution location. */
  location?: string;
  /** Extracurricular activities. */
  activities?: string[];
  /** Notable achievements during study. */
  achievements?: string[];
  /** Relevant coursework. */
  coursework?: string[];
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/**
 * A certificate or credential.
 */
export interface HirelyCertificate {
  /** MongoDB document ID. */
  _id: string;
  /** Certificate name. */
  name?: string;
  /** Description of the certificate. */
  description?: string;
  /** Issue date. */
  issueDate?: string;
  /** Issuing organisation. */
  issuer?: string;
  /** Type of certificate. */
  certificateType?: "course" | "certification" | "license" | "achievement" | "other";
  /** Course-specific details (only for course certificates). */
  courseDetails?: {
    courseName?: string;
    courseProvider?: string;
    instructor?: string;
    duration?: string;
    courseUrl?: string;
    courseLevel?: "beginner" | "intermediate" | "advanced" | "expert";
  };
  /** Skills demonstrated. */
  skills?: string[];
  /** Verifiable credential ID. */
  credentialId?: string;
  /** URL to verify the credential. */
  credentialUrl?: string;
  /** Completion status. */
  completionStatus?: "completed" | "in-progress" | "expired";
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/**
 * A service offered by the portfolio owner.
 */
export interface HirelyService {
  /** MongoDB document ID. */
  _id: string;
  /** Service title. */
  title?: string;
  /** Full service description. */
  description?: string;
  /** Short summary. */
  shortDescription?: string;
  /** Service category. */
  category?: string;
  /** Service subcategory. */
  subcategory?: string;
  /** Pricing model. */
  pricing?: {
    type?: "fixed" | "hourly" | "package";
    amount?: number;
    currency?: string;
  };
  /** Available packages. */
  packages?: Array<{
    name?: string;
    description?: string;
    price?: number;
    deliveryTime?: number;
    features?: string[];
  }>;
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/**
 * A professional skill.
 */
export interface HirelySkill {
  /** MongoDB document ID. */
  _id: string;
  /** Skill name. */
  name?: string;
  /** Skill category (e.g. "Frontend", "Design"). */
  category?: string;
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/**
 * A client testimonial (approved and public only).
 */
export interface HirelyTestimonial {
  /** MongoDB document ID. */
  _id: string;
  /** Client who wrote the testimonial. */
  client?: HirelyTestimonialClient | null;
  /** Overall rating (1–5). */
  rating?: number;
  /** Short testimonial title. */
  title?: string;
  /** Full testimonial text. */
  review?: string;
  /** Category-specific ratings. */
  detailedRatings?: {
    communication?: number;
    quality?: number;
    professionalism?: number;
    deadlineAdherence?: number;
    value?: number;
  };
  /** Whether this testimonial is featured. */
  isFeatured?: boolean;
  /** Whether the client has been verified. */
  isVerified?: boolean;
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/** The client who authored a testimonial. */
export interface HirelyTestimonialClient {
  _id: string;
  firstName?: string;
  lastName?: string;
  avatar?: { url?: string } | null;
  positionName?: string;
}

/**
 * A frequently asked question.
 */
export interface HirelyFaq {
  /** MongoDB document ID. */
  _id: string;
  /** The question. */
  question?: string;
  /** The answer. */
  answer?: string;
  /** ISO timestamp of creation. */
  createdAt?: string;
}

/**
 * Public contact information (social links).
 */
export interface HirelyContact {
  /** MongoDB document ID. */
  _id: string;
  /** List of social/contact links. */
  socialLinks?: HirelySocialLink[];
}

/** A single social or contact link. */
export interface HirelySocialLink {
  /** Social platform name (e.g. "github", "linkedIn"). */
  platform: string;
  /** The profile URL. */
  url: string;
}

/**
 * The most recent public CV (résumé) file.
 */
export interface HirelyCV {
  /** MongoDB document ID. */
  _id: string;
  /** CV document title. */
  title?: string;
  /** Direct URL to the PDF version. */
  pdfUrl?: string;
  /** Direct URL to the DOCX version. */
  docxUrl?: string;
  /** How the CV was created. */
  type?: "generated" | "uploaded";
  /** Visibility setting. */
  visibility?: "public" | "private";
  /** ISO timestamp of creation. */
  createdAt?: string;
}
