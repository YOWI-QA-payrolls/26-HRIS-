import { test, expect } from '@playwright/test';

test('Login to Dashboard', async ({ page }) => {
  await page.goto('https://www.yahshuahris.com/login');

  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('workian58+9@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('Securepass@223');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByRole('link').filter({ hasText: /^$/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  
});