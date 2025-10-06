// e2e/fixtures/authenticated.ts
import { test as base, expect, Page } from '@playwright/test';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();

    // Replace with your actual login flow
    await page.goto('http://localhost:4200/login');
    await page.fill('input[formcontrolname="username"]', 'user');
    await page.fill('input[formcontrolname="password"]', 'user');
    await page.click('button[type="submit"]');

    // Wait for navigation or token storage
    await page.waitForURL('**/home');

    await use(page);

    await context.close();
  },
});
