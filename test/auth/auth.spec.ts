import test, { expect } from "@playwright/test";
import { LoginPage } from "../../common/pages/login/LoginPage";

test.describe("Sign In Tests", () => {
  test("Successful Login", async ({ page }) => {
    const loginPage = new LoginPage(page);
    await page.goto("/login");

    await loginPage.fillCredentials(
      process.env.TEST_USER!,
      process.env.PASSWORD!
    );
    await loginPage.submitLogin();

    await page.waitForURL("**/dashboard");
    expect(page.url()).toContain("/dashboard");
  });

  test("Failed Login", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto("/login");
    await loginPage.fillCredentials("invalid_email@gmail.com", "password");
    await loginPage.submitLogin();

    await loginPage.verifyAlert("Feil brukernavn / passord");
  });
});
