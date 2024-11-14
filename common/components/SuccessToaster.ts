import { expect, Locator, Page } from "@playwright/test";

export class SuccessToaster {
  private successMessageElement: Locator;

  constructor(page: Page) {
    this.successMessageElement = page.locator(".v-snack__content");
  }

  async verifySuccessMessage(expectedMessage: string): Promise<void> {
    await expect(this.successMessageElement).toContainText(expectedMessage);
  }
}
