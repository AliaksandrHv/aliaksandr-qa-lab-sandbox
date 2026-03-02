import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: process.env.BASE_URL || 'http://127.0.0.1:3000',
  },

  webServer: {
    command: 'npm run dev -- --host 0.0.0.0 --port 3000',
    url: 'http://127.0.0.1:3000',
    timeout: 120 * 1000,          // increase from 60s to 120s
    reuseExistingServer: !process.env.CI,
  },
});