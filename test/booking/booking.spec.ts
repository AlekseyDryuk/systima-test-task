import { test } from "../../common/fixtures/fixtures";
import { Booking } from "../../common/interface/Booking";

test.describe("Booking Tests", () => {
  const bookingDto: Booking = {
    contact: "Systima AS",
    amount: 100,
    invoiceDate: "01.01.2024",
    douDate: "15.01.2024",
    account: "1000 Utvikling, ervervet",
    invoiceNumber: 1,
  };

  test("Create a new purchase", async ({ bookingPage, successToaster }) => {
    await bookingPage
      .selectContact(bookingDto.contact)
      .then(() => bookingPage.inputAmount(bookingDto.amount))
      .then(() => bookingPage.inputInvoiceDate(bookingDto.invoiceDate))
      .then(() => bookingPage.inputDueDate(bookingDto.douDate))
      .then(() => bookingPage.selectAccount(bookingDto.account))
      .then(() => bookingPage.submitForm());

    // Cannot find a way to get ID of purchase
    await successToaster.verifySuccessMessage("Bilag opprettet med bilagsnr.");
    await bookingPage.verifyInputsState(true);
  });

  test("Create Duplicate Purchase", async ({ bookingPage }) => {
    await bookingPage
      .selectContact(bookingDto.contact)
      .then(() => bookingPage.inputAmount(bookingDto.amount))
      .then(() => bookingPage.inputInvoiceDate(bookingDto.invoiceDate))
      .then(() => bookingPage.inputDueDate(bookingDto.douDate))
      .then(() => bookingPage.inputInvoiceNumber(bookingDto.invoiceNumber))
      .then(() => bookingPage.selectAccount(bookingDto.account))
      .then(() => bookingPage.submitForm());

    await bookingPage.verifyInputsState(false);
    await bookingPage.validateErrorForField(
      bookingPage.invoiceNumber,
      "Fakturanr. Fakturanr. er allerede bokført"
    );
  });
});
