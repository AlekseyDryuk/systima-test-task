import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  private emailField: Locator;
  private passwordField: Locator;
  private loginButton: Locator;
  private alertBox: Locator;

  constructor(private page: Page) {
    this.emailField = page.locator('input[name="email"]');
    this.passwordField = page.locator('input[name="password"]');
    this.loginButton = page.getByRole("button", { name: "Logg inn" });
    this.alertBox = page.getByRole("alert");
  }

  async fillCredentials(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
  }

  async submitLogin() {
    await this.loginButton.click();
  }

  async verifyAlert(expectedText: string) {
    await expect(this.alertBox).toHaveText(expectedText);
  }
}
