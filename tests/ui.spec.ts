import { test, expect } from "@playwright/test";

async function gotoApp(page) {
  await page.goto("/");
  await expect(page.getByTestId("login-email")).toBeVisible();
}

test("login succeeds with valid credentials", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("login-email").fill("qa@example.com");
  await page.getByTestId("login-password").fill("Pass123!");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-status")).toHaveText("Logged in");
});

test("login is stable when flaky toggle is off", async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.0;
  });
  await gotoApp(page);

  await expect(page.getByTestId("bug-flaky-login")).not.toBeChecked();
  await page.getByTestId("login-email").fill("qa@example.com");
  await page.getByTestId("login-password").fill("Pass123!");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-status")).toHaveText("Logged in");
});

test("login rejects invalid credentials", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("login-email").fill("qa@example.com");
  await page.getByTestId("login-password").fill("wrong-password");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-status")).toHaveText("Invalid credentials");
});

test("login can show server error", async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.0;
  });
  await gotoApp(page);

  await page.getByTestId("bug-flaky-login").check();
  await page.getByTestId("login-email").fill("qa@example.com");
  await page.getByTestId("login-password").fill("Pass123!");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-status")).toHaveText("Server error, try again");
});

test("search reflects typed text", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("search-input").fill("Laptop");
  await expect(page.getByTestId("search-status")).toHaveText("Typing: Laptop");
});

test("table paginates and enforces page bounds", async ({ page }) => {
  await gotoApp(page);

  await expect(page.getByTestId("page-info")).toHaveText("Page 1 of 3");
  await expect(page.getByTestId("table-body").locator("tr")).toHaveCount(2);

  await page.getByTestId("next-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 2 of 3");

  await page.getByTestId("next-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 3 of 3");

  await page.getByTestId("next-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 3 of 3");

  await page.getByTestId("prev-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 2 of 3");
});

test("table starts with expected rows on page 1", async ({ page }) => {
  await gotoApp(page);

  const rows = page.getByTestId("table-body").locator("tr");
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(0)).toContainText("Hammer");
  await expect(rows.nth(1)).toContainText("Screwdriver");
});

test("prev button does not go below first page", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("prev-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 1 of 3");
});

test("category filter resets to first page", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("next-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 2 of 3");

  await page.getByTestId("category-select").selectOption("device");
  await expect(page.getByTestId("page-info")).toHaveText("Page 1 of 2");
  await expect(page.getByTestId("table-body")).toContainText("Laptop");
  await expect(page.getByTestId("table-body")).toContainText("Phone");
});

test("table recovers after turning off API error toggle", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("bug-table-error").check();
  await page.getByTestId("next-page").click();
  await expect(page.getByTestId("table-body")).toContainText("Server error (500)");

  await page.getByTestId("bug-table-error").uncheck();
  await page.getByTestId("prev-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 1 of 3");
  await expect(page.getByTestId("table-body")).toContainText("Hammer");
});

test("table error toggle shows server error row", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("bug-table-error").check();
  await page.getByTestId("next-page").click();

  await expect(page.getByTestId("table-body")).toContainText("Server error (500)");
  await expect(page.getByTestId("page-info")).toHaveText("");
});

test("slow network toggle shows loader during table update", async ({ page }) => {
  await gotoApp(page);

  const loading = page.getByTestId("table-loading");

  await page.getByTestId("bug-slow-network").check();
  await page.getByTestId("next-page").click();

  await expect(loading).toBeVisible();
  await expect(page.getByTestId("page-info")).toHaveText("Page 2 of 3");
  await expect(loading).toBeHidden();
});

test("bug toggles persist after page reload", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("bug-flaky-login").check();
  await page.getByTestId("bug-slow-network").check();
  await page.reload();

  await expect(page.getByTestId("bug-flaky-login")).toBeChecked();
  await expect(page.getByTestId("bug-slow-network")).toBeChecked();
});

test("modal confirm shows toast and closes modal", async ({ page }) => {
  await gotoApp(page);

  const modal = page.locator("#modal");
  const toast = page.getByTestId("toast");

  await page.getByTestId("open-modal").click();
  await expect(modal).toBeVisible();

  await page.getByTestId("confirm-btn").click();
  await expect(modal).toBeHidden();
  await expect(toast).toContainText("Confirmed");
});

test("modal closes with close button, overlay click, and Escape", async ({ page }) => {
  await gotoApp(page);
  const modal = page.locator("#modal");

  await page.getByTestId("open-modal").click();
  await expect(modal).toBeVisible();
  await page.getByTestId("close-modal").click();
  await expect(modal).toBeHidden();

  await page.getByTestId("open-modal").click();
  await expect(modal).toBeVisible();
  await modal.click();
  await expect(modal).toBeHidden();

  await page.getByTestId("open-modal").click();
  await expect(modal).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(modal).toBeHidden();
});
