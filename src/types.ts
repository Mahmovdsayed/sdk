export interface HirelyConfig {
  
  apiKey: string;

  
  timeout?: number;

  
  retries?: number;

  
  cache?: HirelyCacheConfig;

  
  fetch?: typeof fetch;
}

export interface HirelyCacheConfig {
  
  enabled: boolean;

  
  ttl?: number;

  
  store?: HirelyCache;
}

export interface HirelyCache {
  
  get<T>(key: string): T | undefined | Promise<T | undefined>;
  
  set<T>(key: string, value: T, ttl: number): void | Promise<void>;
  
  delete?(key: string): void | Promise<void>;
  
  clear?(): void | Promise<void>;
}

export interface HirelyRequestOptions {
  
  cache?: false;
}

export interface HirelyApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

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

export interface HirelyMe {
  
  _id: string;
  
  userName?: string;
  
  email: string;
  
  role: string;
  
  plan: string;
  
  profile: HirelyProfile | null;
}

export interface HirelyProfile {
  
  _id: string;
  
  firstName?: string;
  
  lastName?: string;
  
  positionName?: string;
  
  about?: string;
  
  birthday?: string;
  
  phone?: string;
  
  nationality?: string;
  
  country?: string;
  
  city?: string;
  
  gender?: "male" | "female";
  
  avatar?: { url?: string; public_id?: string } | null;
  
  likes?: number;
  
  visibility?: "public" | "private" | "unlisted";
  
  createdAt?: string;
  
  updatedAt?: string;
}

export interface HirelyProject {
  _id: string;
  title?: string;
  shortDescription?: string;
  description?: string;
  category?: string;
  status?: string;
  duration?: string;
  featuredImage?: { url?: string } | null;
  media?: HirelyProjectMedia[];
  industry?: string;
  slug?: string;
  featured?: boolean;
  technologies?: string[];
  tools?: string[];
  platforms?: string[];
  demoUrl?: string;
  repositoryUrl?: string;
  caseStudyUrl?: string;
  achievements?: string[];
  challenges?: string[];
  learnings?: string[];
  features?: string[];
  metrics?: Array<{ name: string; value: string }>;
  tags?: string[];
  views?: number;
  likes?: number;
  startDate?: string;
  endDate?: string;
  createdAt?: string;
}

export interface HirelyProjectMedia {
  type?: "image";
  url?: string;
  caption?: string;
  thumbnail?: string;
  order?: number;
}

export interface HirelyWork {
  _id: string;
  companyImage?: { url?: string } | null;
  companyName?: string;
  position?: string;
  startDate?: string;
  endDate?: string | null;
  description?: string;
  isCurrent?: boolean;
  employmentType?: string;
  location?: string;
  achievements?: string[];
  responsibilities?: string[];
  skills?: string[];
  createdAt?: string;
}

export interface HirelyEducation {
  _id: string;
  institution?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string | null;
  grade?: string;
  gpa?: number;
  description?: string;
  institutionImage?: { url?: string } | null;
  isCurrent?: boolean;
  location?: string;
  activities?: string[];
  achievements?: string[];
  coursework?: string[];
  createdAt?: string;
}

export interface HirelyCertificate {
  _id: string;
  name?: string;
  description?: string;
  issueDate?: string;
  issuer?: string;
  certificateType?: "course" | "certification" | "license" | "achievement" | "other";
  courseDetails?: {
    courseName?: string;
    courseProvider?: string;
    instructor?: string;
    duration?: string;
    courseUrl?: string;
    courseLevel?: "beginner" | "intermediate" | "advanced" | "expert";
  };
  skills?: string[];
  credentialId?: string;
  credentialUrl?: string;
  completionStatus?: "completed" | "in-progress" | "expired";
  createdAt?: string;
}

export interface HirelyService {
  _id: string;
  title?: string;
  description?: string;
  shortDescription?: string;
  category?: string;
  subcategory?: string;
  pricing?: {
    type?: "fixed" | "hourly" | "package";
    amount?: number;
    currency?: string;
  };
  packages?: Array<{
    name?: string;
    description?: string;
    price?: number;
    deliveryTime?: number;
    features?: string[];
  }>;
  createdAt?: string;
}

export interface HirelySkill {
  _id: string;
  name?: string;
  category?: string;
  createdAt?: string;
}

export interface HirelyTestimonial {
  _id: string;
  client?: HirelyTestimonialClient | null;
  rating?: number;
  title?: string;
  review?: string;
  detailedRatings?: {
    communication?: number;
    quality?: number;
    professionalism?: number;
    deadlineAdherence?: number;
    value?: number;
  };
  isFeatured?: boolean;
  isVerified?: boolean;
  createdAt?: string;
}

export interface HirelyTestimonialClient {
  _id: string;
  firstName?: string;
  lastName?: string;
  avatar?: { url?: string } | null;
  positionName?: string;
}

export interface HirelyFaq {
  _id: string;
  question?: string;
  answer?: string;
  createdAt?: string;
}

export interface HirelyContact {
  _id: string;
  socialLinks?: HirелySocialLink[];
}

export interface HirелySocialLink {
  platform: string;
  url: string;
}

export interface HirelyCV {
  _id: string;
  title?: string;
  pdfUrl?: string;
  docxUrl?: string;
  type?: "generated" | "uploaded";
  visibility?: "public" | "private";
  createdAt?: string;
}
