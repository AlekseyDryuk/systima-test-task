import { expect, Locator, Page } from "@playwright/test";

export class BookingPage {
  private contactDropdown: Locator;
  private amountInput: Locator;
  private invoiceDateInput: Locator;
  private dueDateInput: Locator;
  private accountDropdown: Locator;
  public invoiceNumber: Locator;
  private submitButton: Locator;

  constructor(private page: Page) {
    this.contactDropdown = page.getByLabel("Kontakt (valgfri ved kvittering)");
    this.amountInput = page.getByLabel("Totalt beløp inkl. mva. *");
    this.invoiceDateInput = page.getByLabel("Fakturadato *");
    this.dueDateInput = page.getByLabel("Forfallsdato");
    this.accountDropdown = page.locator('label:has-text("Konto *")');
    this.invoiceNumber = page.getByLabel("Fakturanr.");
    this.submitButton = page.getByRole("button", { name: "Bokfør" }).last();
  }

  async selectContact(contactName: string): Promise<this> {
    await this.contactDropdown.click();
    const optionToSelect = this.page.locator(
      `.v-list-item__title:has-text("${contactName}")`
    );
    await optionToSelect.click();

    return this;
  }

  async inputAmount(amount: number): Promise<this> {
    await this.amountInput.fill(amount.toString());
    return this;
  }

  async inputInvoiceDate(invoiceDate: string): Promise<this> {
    await this.invoiceDateInput.fill(invoiceDate);
    return this;
  }

  async inputDueDate(dueDate: string): Promise<this> {
    await this.dueDateInput.fill(dueDate);
    return this;
  }

  async inputInvoiceNumber(invoiceNumber: number): Promise<this> {
    await this.invoiceNumber.fill(invoiceNumber.toString());
    return this;
  }

  async selectAccount(accountNumber: string): Promise<this> {
    await this.accountDropdown.click();
    const optionToSelect = this.page.locator(
      `.v-list-item__title:has-text("${accountNumber}")`
    );
    await optionToSelect.click();
    return this;
  }

  async submitForm(): Promise<void> {
    await this.submitButton.click();
  }

  async verifyInputsState(cleared: boolean): Promise<void> {
    const inputElements = [
      this.amountInput,
      this.invoiceDateInput,
      this.dueDateInput,
      this.invoiceNumber,
    ];

    const dropdownElements = [this.contactDropdown, this.accountDropdown];
    await this.verifyInputs(inputElements, cleared);
    await this.verifyDropdowns(dropdownElements, cleared);
  }

  private async verifyInputs(
    elements: Locator[],
    cleared: boolean
  ): Promise<void> {
    for (const element of elements) {
      let value: string | null = null;

      const inputLocator = element.locator(".. >> input");

      if ((await inputLocator.count()) > 0)
        value = await inputLocator.inputValue();

      if (cleared) expect(value).toBe("");
      else expect(value).not.toBe("");
    }
  }

  private async verifyDropdowns(
    elements: Locator[],
    cleared: boolean
  ): Promise<void> {
    for (const element of elements) {
      let value: string | null = null;

      const selectionLocator = element.locator(
        ".. >> .v-select__selection--comma"
      );

      if ((await selectionLocator.count()) > 0)
        value = await selectionLocator.textContent();

      if (cleared) expect(value).toBe(null);
      else expect(value).not.toBe("");
    }
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
