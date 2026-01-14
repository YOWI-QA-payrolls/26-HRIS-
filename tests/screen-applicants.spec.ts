import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.yahshuahris.com/login');
  await page.getByRole('textbox', { name: 'Email' })
    .fill('ezeypagapong@gmail.com');
  await page.getByRole('textbox', { name: 'Password' })
    .fill('Securepass@212');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByRole('link', { name: 'Screen Applicants' }).click();
  await page.getByRole('link', { name: 'New Applicant/s' }).click();
});

test('test', async ({ page }) => {
  await page.locator('#from-datepicker-datepicker-button').click();
  await page.getByRole('button', { name: 'Previous Month' }).click();
  await page.getByRole('option', { name: /December 7/ }).click();
  await page.locator('#to-datepicker-datepicker-button').click();
  await page.getByRole('button', { name: 'Previous Month' }).click();
  await page.getByRole('option', { name: /December 16/ }).click();

  await page.getByRole('button', { name: 'Search by date range' }).click();
  await page.locator('#to-datepicker').fill('');
  await page.locator('#from-datepicker').fill('');
  await page.getByRole('button', { name: 'Search by date range' }).click();
  await page.getByRole('button', { name: 'Add Stage' }).click();
  await page.getByRole('listitem')
    .filter({ hasText: 'Press enter to saveApplicants' })
    .getByRole('textbox')
    .fill('added stage');
  await page.getByRole('button', { name: 'Stage options' }).nth(2).click();
  await page.getByRole('button', { name: 'Remove Stage', exact: true }).click();
  await page.getByRole('button', { name: 'YES' }).click();
});


test('Checklist', async ({ page }) => {
  // FIRST APPLICANT
  await page.getByRole('button', { name: 'Recommended Applicants' }).getByTestId('elipsis-btn').click();
  await page.getByRole('button', { name: 'Checklist', exact: true }).click();
  await page.getByRole('checkbox', { name: '1' }).check();
  await page.getByRole('checkbox', { name: '2' }).check();
  await page.getByRole('checkbox', { name: '3' }).check();
  await page.getByRole('radio', { name: 'Passed' }).check();
  await page.getByRole('textbox', { name: /Add your notes/i }).fill('next stage');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Successfully moved applicant')).toBeVisible();


  // MANAGER INTERVIEW APPLICANT
  await page.getByRole('button', { name: 'Mangaer Interview Applicants' }).getByTestId('elipsis-btn').click();
 await page.getByRole('button', { name: 'Checklist', exact: true }).click();
  await page.getByRole('checkbox', { name: '1' }).check();
  await page.getByRole('checkbox', { name: '2' }).check();
  await page.getByRole('checkbox', { name: '3' }).check();
  await page.getByRole('radio', { name: 'Passed' }).check();

  await page.getByRole('textbox', { name: /Add your notes/i }).fill('passed');
  await page.getByRole('button', { name: 'Update' }).click();
  await expect(page.getByText('Successfully moved applicant')).toBeVisible();
});

test('Onboard Applicant', async ({ page }) => {
  
 await page.getByTestId('elipsis-btn').first().click();
  await page.getByRole('button', { name: 'Checklist', exact: true }).click();
  await page.getByRole('checkbox', { name: '1' }).check();
  await page.getByRole('checkbox', { name: '2' }).check();
  await page.getByRole('checkbox', { name: '3' }).check();
  await page.getByRole('radio', { name: 'Hired' }).check();
await page.getByRole('textbox', { name: /Add your notes/i }).fill('congratulations');
await page.getByRole('button', { name: 'Update' }).click();
await expect(page.getByText('Successfully moved applicant')).toBeVisible();
await page.getByRole('button', { name: 'GO TO ONBOARDING' }).click();
});
