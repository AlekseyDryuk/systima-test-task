import { expect, Locator, Page } from "@playwright/test";

export class NewContactModal {
  public nameField: Locator;
  private createContactButton: Locator;

  constructor(private page: Page) {
    this.nameField = page.getByLabel("Navn *");
    this.createContactButton = page.getByText("Opprett kontakt");
  }

  async fillName(name: string): Promise<this> {
    await this.nameField.fill(name);
    return this;
  }

  async createContact(): Promise<void> {
    // Need this wait, as the button sometimes does not respond to the action,
    // possibly due to the form being filled out too quickly.
    await this.page.waitForTimeout(500);
    await this.createContactButton.click();
  }

  async validateErrorForField(
    field: Locator,
    expectedError: string
  ): Promise<void> {
    const errorMessage = field.locator(".. >> .. >> ..");
    await expect(errorMessage).toContainText(expectedError);
    await expect(errorMessage).toHaveCSS("color", "rgb(255, 82, 82)");
  }
}
