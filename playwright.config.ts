import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    baseURL: "http://127.0.0.1:3000",
  },

  webServer: {
    // serve current repo root (where index.html is)
    command: "npx http-server . -p 3000 -c-1",
    url: "http://127.0.0.1:3000",
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});