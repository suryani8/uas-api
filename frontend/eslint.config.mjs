import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import reactPlugin from "eslint-plugin-react";
import hooksPlugin from "eslint-plugin-react-hooks";
import typescriptParser from "@typescript-eslint/parser";
import globals from "globals";

export default [
  // 1. Abaikan folder yang tidak perlu di-lint
  {
    ignores: [".next/**", "node_modules/**", "dist/**"],
  },
  
  // 2. Konfigurasi Dasar
  js.configs.recommended,
  
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: {
      "@next/next": nextPlugin,
      "react": reactPlugin,
      "react-hooks": hooksPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      globals:{
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...reactPlugin.configs.recommended.rules,
      ...hooksPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-img-element": "off",
      "react/react-in-jsx-scope": "off", // Tidak perlu di Next.js
      "react/prop-types": "off",         // Karena pakai TypeScript
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];