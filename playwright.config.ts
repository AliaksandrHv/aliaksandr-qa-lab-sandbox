import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://aliaksandrhv.github.io/',
  },
  reporter: [['html', { open: 'never' }]],
});