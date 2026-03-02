import { test, expect } from "@playwright/test";

test("site loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/^https:\/\/aliaksandrhv\.github\.io\/?$/);
  await expect(page.locator("body")).toBeVisible();
});

test("page has main content", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).toBeVisible();
});