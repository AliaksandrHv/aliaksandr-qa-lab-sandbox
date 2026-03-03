import { test, expect } from "@playwright/test";

test("site loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/^https:\/\/aliaksandrhv\.github\.io\/?$/);
});

test("page has a title", async ({ page }) => {
  await page.goto("/");
  const title = await page.title();
  expect(title.length).toBeGreaterThan(0);
});

test("body is visible", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();
});

test("page has at least one link", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("a");
  await expect(links.first()).toBeVisible();
});