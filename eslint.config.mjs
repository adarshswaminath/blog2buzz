import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Cover images come from each source's own CDN (already resized),
      // so we use plain <img> instead of paying for Next image optimization.
      "@next/next/no-img-element": "off",
    },
  },
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts", ".agents/**", ".claude/**", "agent/**"]),
]);
