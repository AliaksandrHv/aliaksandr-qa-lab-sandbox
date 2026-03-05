import { test, expect } from "@playwright/test";

async function gotoApp(page) {
  await page.goto("/");
  const loginEmail = page.getByTestId("login-email");

  if ((await loginEmail.count()) === 0) {
    await page.goto("/aliaksandr-qa-lab-sandbox/");
  }

  await expect(loginEmail).toBeVisible();
}

test("login succeeds with valid credentials", async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });
  await gotoApp(page);

  await page.getByTestId("login-email").fill("qa@example.com");
  await page.getByTestId("login-password").fill("Pass123!");
  await page.getByTestId("login-submit").click();

  await expect(page.getByTestId("login-status")).toHaveText("Logged in");
});

test("login rejects invalid credentials", async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });
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

test("category filter resets to first page", async ({ page }) => {
  await gotoApp(page);

  await page.getByTestId("next-page").click();
  await expect(page.getByTestId("page-info")).toHaveText("Page 2 of 3");

  await page.getByTestId("category-select").selectOption("device");
  await expect(page.getByTestId("page-info")).toHaveText("Page 1 of 2");
  await expect(page.getByTestId("table-body")).toContainText("Laptop");
  await expect(page.getByTestId("table-body")).toContainText("Phone");
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
