// e2e/setup/save-auth-state.ts
// npm run auth:setup << ignore >>
// npx tsx e2e/setup/save-auth-state.ts

import { chromium } from '@playwright/test';

// after login success saveAuth
export async function saveAuth(role: string, username: string, password: string) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('http://localhost:4200/login');
  await page.fill('input[formcontrolname="username"]', username);
  await page.fill('input[formcontrolname="password"]', password);
  await page.click('button[type="submit"]');
  if (username === 'admin') {
    await page.waitForURL('**/adminhome', {timeout: 120000});
  } else {
    await page.waitForURL('**/home', {timeout: 120000});
  }

  await context.storageState({ path: `playwright/.auth/${role}.json` });
  await browser.close();
}

saveAuth('user', 'user', 'user');
saveAuth('admin', 'admin', 'admin');
saveAuth('guest', 'guest', 'guest');
