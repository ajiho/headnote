import { defineConfig, globalIgnores } from "eslint/config"
import eslint from "@eslint/js"
import tseslint from "typescript-eslint"
import eslintPluginPrettier from "eslint-plugin-prettier"
import globals from "globals"
import eslintConfigPrettier from "eslint-config-prettier/flat"
import eslintPluginUnicorn from "eslint-plugin-unicorn"

const ignores = [
  "**/dist/**",
  "**/__tests__/**",
  "**/configs/**",
  "**/node_modules/**",
  ".*",
  "scripts/**",
  "**/*.d.ts",
]

export default defineConfig([
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  globalIgnores(ignores),
  // 通用配置
  {
    plugins: {
      prettier: eslintPluginPrettier,
      unicorn: eslintPluginUnicorn,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parser: tseslint.parser,
    },
    rules: {
      // 自定义
      "no-var": "off", //禁止使用var
      "@typescript-eslint/no-unused-vars": "off",

      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": false,
          "ts-check": true,
        },
      ],
    },
  },
  {
    ignores,
    files: ["src/**/*.{ts}"],
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
])
