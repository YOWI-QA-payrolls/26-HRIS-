    import { test, expect } from '@playwright/test';
    
    test.beforeEach('Login', async ({ page }) => {
        await page.goto('https://s1.yahshuahris.com/login');
        await page.locator('#email').fill('yahshuabba.ecptzo@gmail.com');
        await page.locator('#password').fill('Sercurepass@223');
        await page.locator('#login-button').click();
        await page.waitForURL('https://s1.yahshuahris.com/dashboard');
    });
    
 test('Create A Job', async ({ page }) =>{

  await page.getByRole('link', { name: 'Post a Job' }).click();
  await page.getByRole('button', { name: 'Create a Job' }).click();
  await page.getByRole('textbox', { name: 'Job Title*' }).click();
  await page.getByRole('textbox', { name: 'Job Title*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Job Title*' }).fill('S');
  await page.getByRole('textbox', { name: 'Job Title*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Job Title*' }).fill('System ');
  await page.getByRole('textbox', { name: 'Job Title*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Job Title*' }).fill('System A');
  await page.getByRole('textbox', { name: 'Job Title*' }).press('CapsLock');
  await page.getByRole('textbox', { name: 'Job Title*' }).fill('System Analyst');
  await page.locator('.select__input-container').first().click();
  await page.getByRole('option', { name: 'grounds-security' }).click();
  await page.locator('.select__value-container.select__value-container--is-multi > .select__input-container').click();
  await page.getByRole('option', { name: 'Metro Manila' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: '+ Full Time' }).click();
  await page.getByRole('button', { name: '+ On-site' }).click();
  await page.getByRole('button', { name: '+ Flexible' }).click();
  await page.getByRole('textbox', { name: 'mm/dd/yyyy' }).click();
  await page.getByRole('option', { name: 'Choose Thursday, October 2nd,' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'NO DON\'T ADD THEM.' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('div').filter({ hasText: /^Screening questions\(2 configured\)Edit$/ }).getByRole('button').click();
  await page.getByRole('button', { name: '+ Urgent Hiring Need' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('radio', { name: 'Default' }).check();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('checkbox', { name: 'LinkedIn' }).check();
  await page.getByRole('checkbox', { name: 'Facebook' }).check();
  await page.getByRole('button', { name: 'Share' }).click();
});

josoh ppaggapong