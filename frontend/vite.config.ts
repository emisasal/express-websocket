/// <reference types="vitest/config" />
import path from "node:path"
import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(import.meta.dirname, ".."), "")
  const backendOrigin =
    env.BACKEND_ORIGIN ||
    process.env.BACKEND_ORIGIN ||
    `http://127.0.0.1:${env.PORT || process.env.PORT || "8080"}`

  return {
    plugins: [react(), tailwindcss()],
    server: {
      proxy: {
        "/api": { target: backendOrigin, changeOrigin: true },
        "/ws": { target: backendOrigin, ws: true },
      },
    },
    test: {
      environment: "jsdom",
      include: ["src/**/*.test.ts", "src/**/*.test.tsx"],
    },
  }
})
