import { test, expect } from '@playwright/test';
import { login } from '../pages/login-josh';

test('Create Job – Full Flow', async ({ page }) => {
    test.setTimeout(120000);

  // LOGIN
  await login(page);


  await page.getByRole('link', { name: 'Post a Job' }).click();
  await page.getByRole('button', { name: 'Create a Job' }).click();


  await expect(page.getByText('Country*')).toBeVisible();
  await page.getByLabel('Country*').selectOption('Philippines');
  await page.getByLabel('Language*').selectOption('English');

  await page.getByRole('textbox', { name: 'Job Title*' }).fill('Web Developer');


  await page.locator('.select__input-container').first().click();
  await page.getByRole('option', { name: 'HR Manager' }).click();

  
  await page.locator('.select__control').nth(1).click();
  await page.getByRole('option', { name: 'Metro Manila' }).click();

  await page.getByRole('button', { name: 'Next' }).click();


  await expect(page.getByText('What is the job type?*')).toBeVisible();

  await page.getByRole('button', { name: '+ Project-based' }).click();
  await page.getByRole('button', { name: '+ Work from Home' }).click();
  await page.getByRole('button', { name: '+ Flexible' }).click();

  
  const hireInput = page.getByRole('spinbutton', { name: /How many people/i });
  await hireInput.fill('5');


  await page.getByRole('textbox', { name: 'mm/dd/yyyy' }).click();
  await page.getByRole('option', { name: /January 2/i }).click();

  await page.getByRole('button', { name: 'Next' }).click();


  await page.getByRole('button', { name: "NO DON'T ADD THEM." }).click();


  await expect(page.getByText('Job Description*')).toBeVisible();

  const descriptionRole = page.locator('.ql-editor').first();
  await descriptionRole.fill(
    'Ensuring the website is functional and user-friendly.' +
    ' Collaborating with designers to create website layouts.' +
    ' Writing clean, efficient code using HTML, CSS, JavaScript, and other programming languages.' +
    ' Testing and debugging websites to ensure optimal performance.' +
    ' Staying up-to-date with the latest web development trends and technologies.'
  );


  
  const descriptionQualifications = page.locator('.mt-2.h-32 .ql-editor').first();
  await descriptionQualifications.fill(
    'Must have at least 2 years of experience in accounting.\n' +
    'Any graduate of business course.\n' +
    'Must have attention to details and be a good communicator.'
  );


  await page.locator('.mt-2.h-32 .ql-editor').fill('Bel');

  await page.getByRole('button', { name: 'Next' }).click();


  await expect(page.getByRole('heading', { name: 'Job settings' })).toBeVisible();
  await page.getByRole('button', { name: 'Edit' }).first().click();
  await page.getByRole('button', { name: '+ Drug Test' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  
  await expect(page.getByText('Post as*')).toBeVisible();
  await page.getByRole('radio', { name: 'Default' }).check();
  await page.getByRole('button', { name: 'Next' }).click();

  
  await expect(page.getByRole('heading', { name: 'Job Details' })).toBeVisible();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('checkbox', { name: 'LinkedIn' }).check();
  await page.getByRole('button', { name: 'Share' }).click();
  await page.getByRole('button', { name: 'No' }).click();
});
