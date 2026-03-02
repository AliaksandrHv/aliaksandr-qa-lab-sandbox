import { test, expect } from "@playwright/test";

test("example.com loads", async ({ page }) => {
  await page.goto("https://example.com/");
  await expect(page).toHaveURL(/example\.com/);
  await expect(page.getByRole("heading", { name: "Example Domain" })).toBeVisible();
});

test("page has at least one paragraph", async ({ page }) => {
  await page.goto("https://example.com/");
  await expect(page.locator("p")).toHaveCount(2); // stable: example.com has 2 <p> blocks
});