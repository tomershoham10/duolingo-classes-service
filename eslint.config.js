// eslint.config.js
import { ESLint } from "eslint";

const config = new ESLint({
  baseConfig: {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      'plugin:prettier/recommended',
      "airbnb-base",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: ["@typescript-eslint"],
    rules: {
      // Add custom rules if needed
    },
  },
  overrideConfigFile: true,
});

export default config;
