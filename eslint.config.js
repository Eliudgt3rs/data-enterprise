import { defineConfig } from "eslint/config";
import nextPlugin from "@eslint/js";

export default [
  {
    ignores: [".next/*", "node_modules/*", "coverage/*", "dist/*"],
  },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "no-unused-vars": "warn",
      "no-console": ["warn", { allow: ["warn", "error"] }]
    }
  }
];
