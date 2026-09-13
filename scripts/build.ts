import { $ } from "bun";
import { rmSync, mkdirSync } from "node:fs";

const start = performance.now();

rmSync("dist", { recursive: true, force: true });
mkdirSync("dist", { recursive: true });

const js = await Bun.build({
  entrypoints: ["src/index.ts"],
  outdir: "dist",
  target: "node",
  format: "esm",
  minify: {
    identifiers: false,
    syntax: true,
    whitespace: true,
  },
  splitting: false,
  sourcemap: "none",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
});

if (!js.success) {
  for (const log of js.logs) console.error(log);
  process.exit(1);
}

await $`tsc -p tsconfig.build.json`;

const elapsed = (performance.now() - start).toFixed(0);
const outSize = js.outputs[0]?.size ?? 0;

console.log(`\n✅  dist/index.js   ${(outSize / 1024).toFixed(1)} kB`);
console.log(`✅  dist/**/*.d.ts  generated`);
console.log(`⚡  total: ${elapsed}ms\n`);
