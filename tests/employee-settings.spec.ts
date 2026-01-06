import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// ================== COPY VIDEO AFTER EACH TEST ==================
test.afterEach(async ({}, testInfo) => {
  const video = testInfo.attachments.find(a => a.name === 'video');
  if (!video?.path) return;

  fs.mkdirSync('videos', { recursive: true });

  const target = path.join(
    'videos',
    `${testInfo.title.replace(/\s+/g, '_')}.webm`
  );

  fs.copyFileSync(video.path, target);
});

// ================== TEST CREDENTIALS ==================
const EMAIL = 'paulandrewnerona@gmail.com';
const PASSWORD = 'AndrewNeronz@13';
const OTP = '498511';
// =====================================================

// ---------- LOGIN + OTP ----------
async function loginAndOtp(page) {
  await page.goto('https://s1.yahshuahris.com/');

  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(EMAIL);
  await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Sign in' }).click();

  try {
    await page.waitForURL(/dashboard/, { timeout: 8000 });
    return;
  } catch (e) {}

  const otpBoxes = page.getByRole('textbox');
  await expect(otpBoxes.first()).toBeVisible({ timeout: 10000 });

  const digits = OTP.split('');
  for (let i = 0; i < digits.length; i++) {
    await otpBoxes.nth(i).fill(digits[i]);
  }

  await page.getByRole('button', { name: 'Verify Code' }).click();
  await page.waitForURL(/dashboard/, { timeout: 15000 });
}

// ---------- CREATE ITEM ----------
async function createItem(page, name) {
  await page.getByRole('button', { name: 'CREATE' }).click();

  const nameField = page.getByRole('textbox', { name: 'Name *' });
  await expect(nameField).toBeVisible({ timeout: 10000 });

  await nameField.fill(name);

  const saveBtn = page.getByRole('button', { name: 'Save' });
  await expect(saveBtn).toBeEnabled({ timeout: 10000 });

  await saveBtn.click({ force: true });
  await expect(nameField).toBeHidden({ timeout: 15000 });
}

// ---------- SWITCH TAB ----------
async function switchTab(page, tabName) {
  const tab = page.locator('div.cursor-pointer', { hasText: tabName });
  await tab.first().click();

  await expect(tab.first()).toHaveClass(/bg-white|border-savoy-blue/);
  await expect(page.getByRole('button', { name: 'CREATE' })).toBeVisible();
}

// ================== MAIN TEST ==================
test('Act 1. Employee Settings – Completed Automation', async ({ page }) => {
  await loginAndOtp(page);

  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByRole('link', { name: 'General Settings' }).click();
  await page.getByRole('link', { name: 'Employees' }).click();
  await expect(page).toHaveURL(/employees/);

  await createItem(page, 'Main Office');
  await createItem(page, 'Remote Site');
  await createItem(page, 'Branch Office');

  await switchTab(page, 'Department');
  await createItem(page, 'Engineering');
  await createItem(page, 'Human Resources');
  await createItem(page, 'Sales');

  await switchTab(page, 'Position');
  await createItem(page, 'Software Engineer');
  await createItem(page, 'HR Manager');
  await createItem(page, 'Sales Representative');

  await switchTab(page, 'Employee Status');
  await createItem(page, 'Regular');
  await createItem(page, 'Intern');
  await createItem(page, 'Probation');
});
