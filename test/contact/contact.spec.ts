import { test } from "../../common/fixtures/fixtures";
import { NewContactModal } from "../../common/pages/contacts/NewContactModal";

test.describe("Contact Creation Tests", () => {
  let contactModal: NewContactModal;

  test.beforeEach(async ({ contactPage }) => {
    contactModal = await contactPage.clickNewContactButton();
  });

  test("Validation of new contact form", async () => {
    await contactModal.createContact();
    await contactModal.validateErrorForField(
      contactModal.nameField,
      "Vennligst skriv inn navn"
    );
  });

  test("Successful Contact Creation", async ({ successToaster }) => {
    await contactModal
      .fillName("Test")
      .then(() => contactModal.createContact());

    await successToaster.verifySuccessMessage("Ny kontakt lagret.");
  });
});
