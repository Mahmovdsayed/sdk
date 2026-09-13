#!/usr/bin/env bun

import * as mod from "../dist/index.js";

const required = [
  "Hirely",
  "default",
  "HirelyError",
  "HirelyAuthenticationError",
  "HirelyNotFoundError",
  "HirelyValidationError",
  "HirelyRateLimitError",
  "HirelyTimeoutError",
  "HirelyServerError",
] as const;

const missing = required.filter((k) => !(k in mod));

if (missing.length) {
  console.error("✗ missing exports:", missing.join(", "));
  console.error("  actual exports:", Object.keys(mod).sort().join(", "));
  process.exit(1);
}

console.log(`✓ all ${required.length} exports present`);
