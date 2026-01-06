import { test, expect } from '@playwright/test';
import { login } from '../pages/login-josh';

test('Create Job – Full Flow', async ({ page }) => {
    test.setTimeout(120000);


  await login(page);

  
  await page.getByRole('link', { name: 'Post a Job' }).click();
  await page.getByRole('link', { name: 'Job Posting History' }).click();


  await page.getByText('Active', { exact: true }).click();
  await expect(page.getByText('Active', { exact: true })).toHaveClass(/text-green-600/);

  await page.getByText('Inactive').click();
  await expect(page.getByText('Inactive')).toHaveClass(/text-red-600/);

   await page.getByText('All Jobs').click();
  await expect(page.getByText('All Jobs')).toHaveClass(/text-sky-600/);


await page.locator('#from-datepicker-datepicker-button').click();
await page.getByRole('option', { name: 'Choose Thursday, January 1st,' }).click();
await page.locator('#to-datepicker-datepicker-button').click();
await page.getByRole('option', { name: 'Choose Friday, January 2nd,' }).click();
await page.getByRole('button').nth(3).click();
await expect(page.locator('#from-datepicker')).not.toHaveValue('');
await expect(page.locator('#to-datepicker')).not.toHaveValue('');

for (const id of ['#from-datepicker', '#to-datepicker']) {
  await page.locator(id).click();
  await page.locator(id).press('ControlOrMeta+a');
  await page.locator(id).fill('');
}

const searchBox = page.getByRole('textbox', { name: 'Search' });
await searchBox.click();
await searchBox.fill('Dev');
// ASSERT SEARCH RESULTS
await expect(page.getByText(/Dev/i).first()).toBeVisible();
await page.getByRole('button').nth(4).click();


// ... (your previous steps: edit job, change title to 'Web Developer Hey', save)

await page.getByRole('button').filter({ hasText: /^$/ }).nth(3).click();  // Edit icon
await page.getByRole('textbox', { name: 'Job Title*' }).fill('Web Developer now');

await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByRole('button', { name: 'NO DON\'T ADD THEM.' }).click();
await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByRole('button', { name: 'Next', exact: true }).click();
await page.getByRole('button', { name: 'Save' }).click();

await expect(page.getByRole('cell', { name: 'Web Developer now' })).toBeVisible();


await page.getByRole('button').filter({ hasText: /^$/ }).nth(4).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.getByRole('button').filter({ hasText: /^$/ }).nth(5).click();
  await page.getByRole('button', { name: 'Yes' }).click();
  await page.locator('.relative.more-menu-container > .flex').first().click();
  await page.getByRole('listitem').filter({ hasText: 'Set as Inactive' }).click();
  await page.getByText('Inactive', { exact: true }).click();

});

