<div align="center">
  <h1>@hirely/sdk</h1>
  <p>Official JavaScript & TypeScript SDK for <a href="https://hirely.cc">Hirely</a></p>
  <p>
    <a href="https://www.npmjs.com/package/@hirely/sdk"><img src="https://img.shields.io/npm/v/@hirely/sdk.svg" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@hirely/sdk"><img src="https://img.shields.io/npm/dm/@hirely/sdk.svg" alt="downloads" /></a>
    <img src="https://img.shields.io/badge/TypeScript-ready-blue" alt="TypeScript" />
    <img src="https://img.shields.io/badge/license-MIT-green" alt="MIT license" />
  </p>
</div>

---

## What is Hirely?

[Hirely](https://hirely.cc) is an **AI-powered career accelerator and professional portfolio platform** built for developers and freelancers. It combines intelligent content management, semantic job discovery, and a conversational AI career coach — all in one platform.

### The platform at a glance

**AI-First career management**
Hirely's AI doesn't just store your data — it actively coaches you. It analyzes your skill matrix, identifies knowledge gaps, generates tailored CVs for specific job descriptions, scores your resume against ATS systems, and synthesizes your experience into compelling recruiter-ready biographies. An integrated conversational AI agent lets you build and update your entire profile through natural chat.

**Semantic professional discovery**
Hirely moves beyond keyword matching. Using Google Gemini vector embeddings, the platform understands the true intent behind searches — matching freelancers to clients based on deep contextual similarity, not just exact keyword overlap.

**Third-party integrations**
Connect GitHub to auto-import projects from public repositories (AI-generated descriptions, skill extraction, verified developer badge). Connect Spotify to display a live "Now Playing" widget on your public portfolio. LinkedIn, Discord, Figma, and Notion integrations are on the roadmap.

**Enterprise-grade infrastructure**
Built for scale: Redis SWR caching, background job queues, real-time AI quota management, cryptographic webhook verification, and GDPR/CCPA/EU AI Act compliance — including permanent Right to be Forgotten workflows and data portability exports.

### How the SDK fits in

Hirely manages all your professional content — projects, work history, education, skills, certificates, testimonials, services, and more — through a rich dashboard. The `@hirely/sdk` is the bridge that lets you pull that content into **any website or app you build**, with full TypeScript types, caching, and error handling included.

```
Hirely dashboard (content management + AI tools)
  ↓  your public portfolio data
@hirely/sdk (this package)
  ↓  typed, cached, ready to render
Your website / app (Next.js, Astro, Remix, plain HTML — your choice)
```

**You own the presentation layer completely.** Use your own framework, your own design, your own domain. The SDK handles authentication, data fetching, retries, caching, and TypeScript types — so you can focus on building a great frontend.

---

## Installation

```bash
# Bun (recommended)
bun add @hirely/sdk

# npm
npm install @hirely/sdk

# pnpm
pnpm add @hirely/sdk
```

---

## Quick start

```ts
import Hirely from "@hirely/sdk";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
});

const portfolio = await hirely.get();

console.log(portfolio.profile?.firstName);
console.log(portfolio.projects.length);
```

---

## API key setup

Generate a public API key from your [Hirely dashboard](https://hirely.cc/dashboard/settings/api-keys).

```env
HIRELY_API_KEY=hk_pub_xxxxxxxxxxxxxxxxxxxxxxxxx
```

> **Note:** Your API key starts with `hk_pub_`. It is scoped to your account and provides **read-only** access to your public portfolio data. It cannot access or modify any other user's data.

---

## Usage

### Full portfolio

The most efficient way to power a portfolio website — fetch everything in a single request:

```ts
const portfolio = await hirely.get();

portfolio.profile       // → HirelyProfile
portfolio.projects      // → HirelyProject[]
portfolio.work          // → HirelyWork[]
portfolio.education     // → HirelyEducation[]
portfolio.skills        // → HirelySkill[]
portfolio.certificates  // → HirelyCertificate[]
portfolio.services      // → HirelyService[]
portfolio.testimonials  // → HirelyTestimonial[]
portfolio.faqs          // → HirelyFaq[]
portfolio.contact       // → HirelyContact | null
portfolio.cv            // → HirelyCV | null
```

### Account info

```ts
const me = await hirely.me();

me.userName  // → "mahmoud"
me.email     // → "hello@example.com"
me.plan      // → "pro"
```

### Projects

```ts
// All public projects
const projects = await hirely.projects();

// By MongoDB ID
const project = await hirely.projects.getById("665f1a2b3c4d5e6f7a8b9c0d");

// By slug (ideal for dynamic routes)
const project = await hirely.projects.getBySlug("my-awesome-app");

project.title           // → "My Awesome App"
project.slug            // → "my-awesome-app"
project.description     // → "..."
project.technologies    // → ["React", "TypeScript", "Node.js"]
project.demoUrl         // → "https://example.com"
project.repositoryUrl   // → "https://github.com/..."
project.featured        // → true
```

### Work experience

```ts
const jobs = await hirely.work();
const job  = await hirely.work.getById("665...");

job.companyName    // → "Acme Corp"
job.position       // → "Senior Engineer"
job.isCurrent      // → true
job.achievements   // → ["Led migration to microservices", ...]
```

### Education

```ts
const education = await hirely.education();
const entry     = await hirely.education.getById("665...");

entry.institution  // → "Cairo University"
entry.degree       // → "Bachelor's"
entry.fieldOfStudy // → "Computer Science"
```

### Skills

```ts
const skills = await hirely.skills();

// Group by category
const byCategory = skills.reduce((acc, skill) => {
  const cat = skill.category ?? "Other";
  acc[cat] = [...(acc[cat] ?? []), skill.name ?? ""];
  return acc;
}, {} as Record<string, string[]>);
```

### Certificates

```ts
const certs = await hirely.certificates();
const cert  = await hirely.certificates.getById("665...");

cert.name             // → "AWS Solutions Architect"
cert.issuer           // → "Amazon Web Services"
cert.credentialUrl    // → "https://credly.com/..."
```

### Services

```ts
const services = await hirely.services();
const service  = await hirely.services.getById("665...");

service.title          // → "Full-Stack Development"
service.pricing?.type  // → "fixed"
service.packages       // → [{ name: "Basic", price: 500, ... }]
```

### Testimonials

```ts
const testimonials = await hirely.testimonials();
const testimonial  = await hirely.testimonials.getById("665...");

testimonial.client?.firstName  // → "John"
testimonial.rating             // → 5
testimonial.review             // → "Exceptional work..."
```

### FAQ

```ts
const faqs = await hirely.faqs();
const faq  = await hirely.faqs.getById("665...");

faq.question  // → "What is your availability?"
faq.answer    // → "I'm available for..."
```

### Contacts & social links

```ts
const contact = await hirely.contacts();

contact?.socialLinks?.forEach(link => {
  console.log(link.platform, link.url);
  // → "github", "https://github.com/..."
  // → "linkedIn", "https://linkedin.com/..."
});
```

### CV

```ts
const cv = await hirely.cv();

cv?.pdfUrl   // → "https://cdn.hirely.cc/cvs/my-cv.pdf"
cv?.docxUrl  // → "https://cdn.hirely.cc/cvs/my-cv.docx"
```

### Site info & settings

```ts
const info = await hirely.info();

info?.isActive           // → true
info?.showSkills         // → true
info?.siteSettings?.bgColor  // → "#0f0f0f"
```

---

## Caching

Enable optional in-memory response caching to reduce API calls:

```ts
const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
  cache: {
    enabled: true,
    ttl: 300, // seconds — cache responses for 5 minutes
  },
});

// Normal call — uses cache
const projects = await hirely.projects();

// Bypass cache for a fresh request
const freshProjects = await hirely.projects({ cache: false });
```

### Custom cache store

Bring your own cache backend (Redis, Upstash, etc.):

```ts
import type { HirelyCache } from "@hirely/sdk";

const redisStore: HirelyCache = {
  get: async (key) => {
    const raw = await redis.get(key);
    return raw ? JSON.parse(raw) : undefined;
  },
  set: async (key, value, ttl) => {
    await redis.set(key, JSON.stringify(value), "EX", ttl);
  },
};

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
  cache: { enabled: true, ttl: 300, store: redisStore },
});
```

---

## Retries & timeouts

```ts
const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!,
  timeout: 10_000, // 10s timeout per request
  retries: 2,      // retry up to 2 times on transient errors (5xx, 429)
});
```

The SDK automatically retries on `500`, `502`, `503`, `504`, `408`, `425`, and `429` with exponential backoff. It does **not** retry on `400`, `401`, `403`, `404`, or `422`.

---

## Error handling

```ts
import Hirely, {
  HirelyError,
  HirelyAuthenticationError,
  HirelyNotFoundError,
  HirelyRateLimitError,
  HirelyTimeoutError,
  HirelyServerError,
} from "@hirely/sdk";

try {
  const project = await hirely.projects.getBySlug("my-project");
} catch (error) {
  if (error instanceof HirelyAuthenticationError) {
    // 401/403 — invalid or missing API key
  } else if (error instanceof HirelyNotFoundError) {
    // 404 — resource does not exist
  } else if (error instanceof HirelyRateLimitError) {
    console.log(`Retry in ${error.retryAfter}s`);
  } else if (error instanceof HirelyTimeoutError) {
    // Request exceeded the configured timeout
  } else if (error instanceof HirelyServerError) {
    // 5xx server error
  } else if (error instanceof HirelyError) {
    // Any other SDK error
    console.error(error.status, error.code, error.message);
  }
}
```

---

## Framework examples

### Next.js (App Router)

```tsx
// app/page.tsx
import Hirely from "@hirely/sdk";

const hirely = new Hirely({
  apiKey: process.env.HIRELY_API_KEY!, // server-only env var
  cache: { enabled: true, ttl: 300 },
});

export default async function Page() {
  const portfolio = await hirely.get();

  return (
    <main>
      <h1>
        {portfolio.profile?.firstName} {portfolio.profile?.lastName}
      </h1>
      <p>{portfolio.profile?.about}</p>

      <section>
        <h2>Projects</h2>
        {portfolio.projects.map((project) => (
          <article key={project._id}>
            <h3>{project.title}</h3>
            <p>{project.shortDescription}</p>
            <ul>
              {project.technologies?.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
            {project.demoUrl && (
              <a href={project.demoUrl}>Live Demo →</a>
            )}
          </article>
        ))}
      </section>
    </main>
  );
}
```

### Next.js dynamic project page

```tsx
// app/projects/[slug]/page.tsx
import Hirely, { HirelyNotFoundError } from "@hirely/sdk";
import { notFound } from "next/navigation";

const hirely = new Hirely({ apiKey: process.env.HIRELY_API_KEY! });

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const project = await hirely.projects.getBySlug(params.slug);

    return (
      <article>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
      </article>
    );
  } catch (error) {
    if (error instanceof HirelyNotFoundError) notFound();
    throw error;
  }
}
```

### Astro

```astro
---
// src/pages/index.astro
import Hirely from "@hirely/sdk";

const hirely = new Hirely({ apiKey: import.meta.env.HIRELY_API_KEY });
const portfolio = await hirely.get();
---

<main>
  <h1>{portfolio.profile?.firstName} {portfolio.profile?.lastName}</h1>
  {portfolio.projects.map((p) => (
    <article>
      <h2>{p.title}</h2>
      <p>{p.shortDescription}</p>
    </article>
  ))}
</main>
```

### Remix

```tsx
// app/routes/_index.tsx
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Hirely from "@hirely/sdk";

const hirely = new Hirely({ apiKey: process.env.HIRELY_API_KEY! });

export async function loader() {
  const portfolio = await hirely.get();
  return json({ portfolio });
}

export default function Index() {
  const { portfolio } = useLoaderData<typeof loader>();
  return <h1>{portfolio.profile?.firstName}</h1>;
}
```

---

## Security

### API key model

- Keys are generated in your Hirely dashboard
- Each key is scoped to **one Hirely account** — one key cannot access another user's data
- SDK access is **read-only** — the SDK cannot create, update, or delete any data
- Keys use the format `hk_pub_xxx` and are safe to use in server-side environments

### Public vs. server environments

| Environment | Safe to use API key? |
|---|---|
| Next.js Server Components | ✅ Yes — runs on server |
| Astro SSR / SSG | ✅ Yes — runs on server |
| Node.js / Bun scripts | ✅ Yes |
| Remix loaders | ✅ Yes — runs on server |
| Browser (client-side) | ⚠️ Only if your use case explicitly requires it |

Because `hk_pub_` keys are read-only and scoped to your portfolio, exposing them in client-side code does not grant write access. However, it does expose your key to anyone who inspects your bundle. Use your judgement based on your application.

---

## Configuration reference

```ts
interface HirelyConfig {
  apiKey: string;        // Required. Must start with hk_pub_
  timeout?: number;      // Request timeout in ms. Default: 30_000
  retries?: number;      // Retry attempts for transient errors. Default: 2
  cache?: {
    enabled: boolean;    // Enable SDK-side caching
    ttl?: number;        // Cache TTL in seconds. Default: 300
    store?: HirelyCache; // Custom cache store (Redis, etc.)
  };
  fetch?: typeof fetch;  // Custom fetch implementation
}
```

---

## Works with

| Runtime | Supported |
|---|---|
| Node.js 18+ | ✅ |
| Bun | ✅ |
| Deno | ✅ |
| Browser (modern) | ✅ |
| Next.js | ✅ |
| Astro | ✅ |
| Remix | ✅ |
| React (SSR/SSG) | ✅ |
| Vue / Nuxt | ✅ |
| Svelte / SvelteKit | ✅ |

No dependencies required. Uses the native `fetch` API available in all modern environments.

---

## License

MIT © [Hirely](https://hirely.cc)
