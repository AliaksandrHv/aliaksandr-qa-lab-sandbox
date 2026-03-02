# Aliaksandr QA Lab Sandbox

A small QA playground web app built to practice UI test automation with Playwright.
🔗 Live Demo: https://aliaksandrhvozd.github.io/aliaksandr-qa-lab-sandbox/

## Features
## Automated Tests

Playwright end-to-end tests cover:

• Page load verification
• Bug toggle behaviors
• Loading indicator handling
• Server error simulation
• Modal dialog interaction
• Toast notifications

## Project structure
- `app/` - the sandbox website (static HTML/CSS/JS)
- `tests/` - Playwright tests
- `playwright.config.ts` - runs a local static server and executes tests

- ## Tech Stack

• HTML / CSS / Vanilla JS
• Playwright Test (TypeScript)
• GitHub Pages (deployment)
• GitHub Actions (CI)

## Run locally
```bash
npm install
npx playwright install
npm test
