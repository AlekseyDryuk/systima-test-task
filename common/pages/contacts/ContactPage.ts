import { Locator, Page } from "@playwright/test";
import { NewContactModal } from "./NewContactModal";

export class ContactPage {
  private newContactButton: Locator;

  constructor(private page: Page) {
    this.newContactButton = page.locator("#contacts-create-contact-button");
  }

  async clickNewContactButton(): Promise<NewContactModal> {
    await this.newContactButton.click();
    return new NewContactModal(this.page);
  }
}
