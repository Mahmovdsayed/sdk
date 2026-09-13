# Changelog

All notable changes to `@hirely/sdk` are documented here.

## [0.1.0] - 2024-09-13

### Added

- Initial public release of `@hirely/sdk`
- `Hirely` client class with `apiKey` validation
- `hirely.get()` — fetch complete portfolio in one request
- `hirely.me()` — fetch account info + full profile
- Resource helpers: `projects`, `work`, `education`, `skills`, `certificates`, `services`, `testimonials`, `faqs`, `contacts`, `cv`
- Per-resource lookup methods: `.getById()` and `.getBySlug()` (projects only)
- Typed error hierarchy: `HirelyError`, `HirelyAuthenticationError`, `HirelyNotFoundError`, `HirelyValidationError`, `HirelyRateLimitError`, `HirelyTimeoutError`, `HirelyServerError`
- SDK-side in-memory caching with configurable TTL
- Custom cache store interface (`HirelyCache`) for Redis or any external store
- Per-request cache bypass via `{ cache: false }`
- Exponential backoff retry logic for transient errors
- `AbortController`-based request timeout
- Zero runtime dependencies — uses native `fetch` API
- Full TypeScript support with declaration maps
- ESM-only output targeting ES2022
