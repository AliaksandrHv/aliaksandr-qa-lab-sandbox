import { test, expect } from "@playwright/test";

test("page loads and shows title", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Aliaksandr QA Lab Sandbox/i })).toBeVisible();
});

test("slow network toggle shows loading", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("bug-slow-network").check();
  await page.getByTestId("category-select").selectOption("tool");

  await expect(page.getByTestId("table-loading")).toBeVisible();
  await expect(page.getByTestId("table-loading")).toBeHidden();
});

test("table API error toggle shows 500 message", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("bug-table-error").check();
  await page.getByTestId("category-select").selectOption("device");

  await expect(page.getByText(/Server error \(500\)/)).toBeVisible();
});

test("modal opens and confirm shows toast", async ({ page }) => {
  await page.goto("/");

  await page.getByTestId("open-modal").click();

  // Check modal overlay is visible
  await expect(page.locator("#modal")).toBeVisible();

  await page.getByTestId("confirm-btn").click();

  // Check toast message appears
  await expect(page.getByTestId("toast")).toHaveText(/Confirmed/);
});