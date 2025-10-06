// import { expect } from '@playwright/test';
// import { test } from './fixtures/authenticated';
import { test as base, expect, Page } from '@playwright/test';

// With login-success should transition to /adminhome or /home

const roles = ['user', 'guest', 'admin'];

for (const role of roles) {
  base.describe(`${role} home access`, () => {
    base.use({ storageState: `playwright/.auth/${role}.json` });

    base(`should show home page for ${role}`, async ({ page }) => {
      if (role === 'admin') {
        await page.goto('http://localhost:4200/adminhome');
        await expect(page.locator('body')).toContainText(/ADMIN access/i);
      } else {
        await page.goto('http://localhost:4200/home');
        await expect(page.locator('body')).toContainText(/Page 1/i);
      }
    });
  });
}

