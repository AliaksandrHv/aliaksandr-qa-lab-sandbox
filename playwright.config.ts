import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  use: {
    // If you test a public site, set BASE_URL in GitHub Actions secrets/vars,
    // or just use full URLs directly in your tests.
    baseURL: process.env.BASE_URL,
    trace: 'on-first-retry',
  },

  reporter: [['html', { open: 'never' }]],
});