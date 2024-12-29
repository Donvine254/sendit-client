import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { defineConfig } from "eslint-define-config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default defineConfig({
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      parserOptions: {
        project: "./tsconfig.json",
      },
      plugins: ["@typescript-eslint"],
      extends: [...compat.extends("next/core-web-vitals", "next/typescript")],
      rules: {
        "@typescript-eslint/no-explicit-any": "error",
      },
    },
  ],
});
