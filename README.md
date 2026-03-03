![Playwright Tests](https://github.com/AliaksandrHv/aliaksandr-qa-lab-sandbox/actions/workflows/playwright.yml/badge.svg)

# Aliaksandr QA Lab Sandbox

Small QA portfolio sandbox using **Playwright** + **GitHub Actions**.

## What this repo shows
- Playwright tests running locally and in CI
- CI installs Playwright browsers
- HTML report and test artifacts uploaded from CI runs

## Live site (GitHub Pages)
https://aliaksandrhv.github.io/

## Run locally (Windows / PowerShell)
1) Install dependencies:
   - `npm ci`

2) Install Playwright browsers:
   - `npx playwright install`

3) Run tests:
   - `npx playwright test`

4) Open HTML report:
   - `npx playwright show-report`

## CI (GitHub Actions)
Workflow: `.github/workflows/playwright.yml`

Artifacts uploaded on every run:
- `playwright-report/` (HTML report)
- `test-results/` (screenshots/traces on failure)