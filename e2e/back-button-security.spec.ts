// import { expect } from '@playwright/test';
// import { test } from './fixtures/authenticated';
// npx playwright test e2e/page3-security.spec.ts

import { test as base, expect, Page } from '@playwright/test';

// With user signed out, clicking browser back button should not transition to the previous view

const roles = ['user', 'guest', 'admin'];

for (const role of roles) {
  base.describe(`${role} - after signout cannot access browser back button`, () => {

    base.use({ storageState: `playwright/.auth/${role}.json` });
    base(`With some nav history, upon signout, should stay in /login when ${role} clicks browser back button`, async ({ page }) => {
      // add some browser nav hitory
      await page.goto('http://localhost:4200/', { timeout: 60000 });
      await page.goto('http://localhost:4200/signout', { timeout: 60000 });
      await expect(page.locator('body')).toContainText(/Login/i);


      // Simulate browser back button
      await page.goBack();

      // Assert we're back on page1
      await expect(page).toHaveURL('http://localhost:4200/login');

    });  

  });
}
