# Aliaksandr QA Lab Sandbox

A small QA playground web app built to practice UI test automation with Playwright.
Live Demo  
https://aliaksandrhvozd.github.io/aliaksandr-qa-lab-sandbox/

## Features
- Login (optional flaky backend via toggle)
- Search (optional case-sensitivity bug)
- Products table + pagination (optional off-by-one bug)
- Loading indicator (optional slow network delay)
- Modal dialog + toast notification
- Bug toggles persist across refresh (localStorage)

## Project structure
- `app/` - the sandbox website (static HTML/CSS/JS)
- `tests/` - Playwright tests
- `playwright.config.ts` - runs a local static server and executes tests

## Run locally
```bash
npm install
npx playwright install
npm test
