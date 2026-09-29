import { defineConfig } from "vitest/config"

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    fileParallelism: false,
    env: { NODE_ENV: "test" },
    server: {
      deps: {
        external: ["ws"],
      },
    },
  },
})
