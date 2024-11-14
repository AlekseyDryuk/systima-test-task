import { test as baseTest, Page, expect } from "@playwright/test";
import { ContactPage } from "../pages/contacts/ContactPage";
import { BookingPage } from "../pages/booking/BookingPage";
import { LoginPage } from "../pages/login/LoginPage";
import { SuccessToaster } from "../components/SuccessToaster";

type TestFixtures = {
  loggedInPage: Page;
  bookingPage: BookingPage;
  contactPage: ContactPage;
  successToaster: SuccessToaster;
};

const test = baseTest.extend<TestFixtures>({
  loggedInPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await page.goto("/login");

    await loginPage.fillCredentials(
      process.env.TEST_USER!,
      process.env.PASSWORD!
    );
    await loginPage.submitLogin();
    await page.waitForURL("/systimaas7/dashboard");

    await use(page);
  },

  bookingPage: async ({ loggedInPage }, use) => {
    await loggedInPage.goto("/systimaas7/bookkeeping/purchase");
    const bookingPage = new BookingPage(loggedInPage);

    await use(bookingPage);
  },

  contactPage: async ({ loggedInPage }, use) => {
    await loggedInPage.goto("/systimaas7/contacts");
    const contactPage = new ContactPage(loggedInPage);

    await use(contactPage);
  },

  successToaster: async ({ page }, use) => {
    const successMessage = new SuccessToaster(page);
    await use(successMessage);
  },
});

export { test, expect };
