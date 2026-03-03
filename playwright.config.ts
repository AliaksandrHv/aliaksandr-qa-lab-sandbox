import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // CI stability
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Artifacts + debugging
  reporter: [["html", { open: "never" }]],
  use: {
    baseURL: "https://aliaksandrhv.github.io/",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
});