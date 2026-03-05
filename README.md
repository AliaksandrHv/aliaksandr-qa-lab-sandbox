![Playwright Tests](https://github.com/AliaksandrHv/aliaksandr-qa-lab-sandbox/actions/workflows/playwright.yml/badge.svg)

# Aliaksandr QA Lab Sandbox

A small QA sandbox using **Playwright** + **GitHub Actions**.

## What this project includes
- End-to-end Playwright tests running locally and in CI
- CI installs Playwright browsers
- HTML report and test artifacts uploaded from CI runs

## Live site
https://aliaksandrhv.github.io/aliaksandr-qa-lab-sandbox/

## Test coverage
- Login with valid credentials returns `Logged in`
- Login with invalid credentials returns `Invalid credentials`
- Login server-error path returns `Server error, try again`
- Search input updates status text (`Typing: ...`)
- Product table pagination updates page state and enforces bounds
- Category filter resets paging and shows expected rows
- Modal confirm closes modal and shows toast

## Stability notes
- `app.js` uses `Math.random()` in the login flow to simulate occasional server errors.
- Playwright tests override `Math.random` in browser context so login tests stay deterministic.
- Tests handle both root (`/`) and GitHub Pages subpath (`/aliaksandr-qa-lab-sandbox/`).

## Run locally (Windows / PowerShell)
1) Install dependencies:
   - `npm ci`

2) Install Playwright browsers:
   - `npx playwright install`

3) Run tests:
   - `npx playwright test`

4) Open HTML report:
   - `npx playwright show-report`

## CI
Workflow: `.github/workflows/playwright.yml`

On every push to `main`, CI runs the Playwright suite and uploads:
- `playwright-report/` (HTML report)
- `test-results/` (screenshots/traces on failure)
