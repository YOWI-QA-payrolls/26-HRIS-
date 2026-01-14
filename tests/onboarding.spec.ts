import { test, expect } from '@playwright/test';

test.describe('HRIS Onboarding Flow', () => {

  test.setTimeout(180000); // 3 minutes for slow dashboards

  test('User can proceed directly to orient & enroll applicant', async ({ page }) => {
    // ───────────────── LOGIN ─────────────────
    await page.goto('https://s1.yahshuahris.com/');

    await page.getByRole('button', { name: 'Get Started' }).nth(1).click();
    await page.getByRole('link', { name: 'Sign In' }).first().click();

    await page.getByRole('textbox', { name: 'Email' }).fill(
      'paulandrewnerona@gmail.com'
    );
    await page.getByRole('textbox', { name: 'Password' }).fill(
      'AndrewNeronz@13'
    );
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait until dashboard is visible
    await expect(
      page.getByRole('link', { name: 'Onboarding' })
    ).toBeVisible({ timeout: 20000 });

    // ──────────────── ONBOARDING ──────────────
    await page.getByRole('link', { name: 'Onboarding' }).click();
    await page.getByRole('link', { name: 'Hired Applicant/s' }).first().click();

    await expect(
      page.getByRole('heading', { name: 'Onboarding' })
    ).toBeVisible();

    // ───────────── ORIENTATION FLOW ────────────
    const orientBtn = page.getByRole('button', { name: 'Orient' }).first();
    await orientBtn.waitFor({ state: 'visible', timeout: 20000 });
    await orientBtn.click();

    await page.getByRole('button', { name: 'Manual Orientation' }).click();
    await page.getByRole('button', { name: 'YES, I HAVE.' }).click();

    // ───────────── ENROLL & ASSIGN ─────────────
    await page.getByRole('button', { name: 'Enroll' }).click();
    await page.getByRole('button', { name: 'ASSIGN', exact: true }).click();

    // Employment Type
    await page.locator('.select__input-container').first().click();
    await page.getByRole('option', { name: 'Regular' }).click();

    // Location
    await page.getByText('Select a location...').click();
    await page.getByRole('option', { name: 'Main Office' }).click();

    // Department
    await page.getByText('Select a department...').click();
    await page.getByRole('option', { name: 'Human Resources' }).click();

    // Confirm assignment
    await page
      .locator('[role="dialog"]')
      .getByRole('button', { name: 'Assign' })
      .click();

    // ─────────────── ASSERTION ─────────────────
    await expect(page).toHaveURL(/\/orient\/\d+$/); 
  });
});
