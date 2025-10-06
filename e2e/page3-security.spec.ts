// import { expect } from '@playwright/test';
// import { test } from './fixtures/authenticated';
// npx playwright test e2e/page3-security.spec.ts

import { test as base, expect, Page } from '@playwright/test';

// With admin or user creds should transition to **/page3/**
// With guest creds should not transition to **/page3/**

const roles = ['user', 'guest', 'admin'];

for (const role of roles) {
  if (role === 'guest') {
    base.describe(`${role} /page3 security`, () => {
      base.use({ storageState: `playwright/.auth/${role}.json` });
      base(`should not show Page 3 link for ${role}`, async ({ page }) => {
        await page.goto('http://localhost:4200/home/page2', { timeout: 60000 });
        await expect(page.locator('body'), 'expect body not to contain Page 3').not.toContainText(/Page 3/i);
        // if the guest user manually tries to access page3, it should redirect to login
        await page.goto('http://localhost:4200/home/page3', { timeout: 60000 }  );
        await expect(page.locator('body'), 'expect to be redirected to Login').toContainText(/Login/i);
      });
    });
  } else {
      base.describe(`${role} /page3 security`, () => {
      base.use({ storageState: `playwright/.auth/${role}.json` });
      base(`should show Page 3 link for ${role}`, async ({ page }) => {
        await page.goto('http://localhost:4200/home/page2', { timeout: 60000 }  );
        await expect(page.locator('body')).toContainText(/Page 3/i);

        await page.goto('http://localhost:4200/home/page3', { timeout: 60000 }  );
        await expect(page.locator('body')).toContainText(/Page 4/i);

        await page.goto('http://localhost:4200/home/page3/page4', { timeout: 60000 }  );
        await expect(page.locator('body')).toContainText(/Page 4/i);

        await page.goto('http://localhost:4200/home/page3/page5', { timeout: 60000 }  );
        await expect(page.locator('body')).toContainText(/Page 5/i);        
      });
    });
  }

};
