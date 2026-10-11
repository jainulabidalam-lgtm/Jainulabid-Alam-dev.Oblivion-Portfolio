// Offline verification build (used when the npm registry is unreachable).
// Bundles the real source with esbuild into dist-check/ so it can be opened
// in a browser. The normal build on your machine is `npm run build` (Vite).
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";

const require = createRequire("/opt/npm-tools/");
const esbuild = require("esbuild");

rmSync("dist-check", { recursive: true, force: true });
mkdirSync("dist-check", { recursive: true });

const result = await esbuild.build({
  entryPoints: ["src/main.tsx"],
  bundle: true,
  outdir: "dist-check/assets",
  format: "esm",
  jsx: "automatic",
  minify: true,
  sourcemap: false,
  target: "es2022",
  nodePaths: ["/home/claude/.npm-global/lib/node_modules"],
  define: { "process.env.NODE_ENV": '"production"' },
  logLevel: "info",
});

if (result.errors.length) process.exit(1);

writeFileSync(
  "dist-check/index.html",
  `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Portfolio</title><link rel="stylesheet" href="./assets/main.css"/></head><body><div id="root"></div><script type="module" src="./assets/main.js"></script></body></html>`,
);
console.log("dist-check ready");
