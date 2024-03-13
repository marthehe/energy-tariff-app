import { test, expect } from "@playwright/test";

test("user-login-logout", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await page.getByRole("link", { name: "Login" }).click();
  await page.getByPlaceholder("Username...").click();
  await page.getByPlaceholder("Username...").fill("akow2");
  await page.getByLabel("Password").click();
  await page.getByLabel("Password").fill("eloelo520");
  await page.getByRole("button", { name: "Sign in with Username and" }).click();
  await page.getByRole("link", { name: "Logout" }).click();
  await page.getByRole("button", { name: "Sign out" }).click();
});
