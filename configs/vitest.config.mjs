import { configDefaults, defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    globals: false,
    cache: false,
    clearMocks: true,
    environment: "node",
    watch: true,
    include: ["__tests__/**/*.test.ts"],
    coverage: {
      include: ["src/**/*.ts"],
      exclude: [
        ...configDefaults.exclude,
        "**/__tests__/**",
        "src/cli.ts",
        "**/interfaces.ts",
        "**/*.d.ts",
      ],
      provider: "v8",
    },
  },
})
