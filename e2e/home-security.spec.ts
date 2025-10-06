// import { expect } from '@playwright/test';
// import { test } from './fixtures/authenticated';
// npx playwright test e2e/page3-security.spec.ts

import { test as base, expect, Page } from '@playwright/test';

// With no user | admin | guest creds, accessing any valid /** should transition to the /login view

const roles = ['user', 'guest', 'admin'];

for (const role of roles) {
  base.describe(`${role} has no login creds`, () => {
    base(`should redirect to /login for ${role}`, async ({ page }) => {
      await page.goto('http://localhost:4200/home', { timeout: 60000 });
      await expect(page.locator('body')).toContainText(/Login/i);
    });
  });
};
