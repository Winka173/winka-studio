import { defineConfig, globalIgnores } from "eslint/config";
import next from "eslint-config-next/core-web-vitals";
import ts from "eslint-config-next/typescript";
export default defineConfig([
  ...next,
  ...ts,
  globalIgnores([
    "out/**",
    ".next/**",
    ".review/**",
    ".taste-skill/**",
    "public/taste/**",
    "tools/media-kit/**", // Remotion templates: built inside OpenMontage, not this site
  ]),
  {
    rules: { "@next/next/no-img-element": "off" },
  },
]);
