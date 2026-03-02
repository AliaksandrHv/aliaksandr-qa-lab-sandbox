import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "http://127.0.0.1:3000",
    trace: "on-first-retry"
  },
  webServer: {
    command: "npx http-server app -p 3000 -c-1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI
  }
});