import { test, expect } from '@playwright/test';

// ==================== RANDOM DATA ====================
const firstNames = ['Andrew', 'Conan', 'Brynn', 'Quinn', 'Lavinia'];
const middleNames = ['Christopher', 'Benjamin', 'Alexander', 'Dominic', 'Elizabeth'];
const lastNames = ['Johnson', 'Witt', 'Adkins', 'Melton', 'Nerona'];

const locations = ['Main Office', 'Branch Office', 'Remote Site'];
const positions = ['HR Manager', 'Software Engineer', 'Sales Representative'];
const departments = ['Human Resources', 'Engineering', 'Sales'];
const employmentStatuses = ['Regular', 'Probation', 'Intern'];

const randomFrom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomNum = (len) => Math.floor(Math.random() * Math.pow(10, len));

function buildEmployee() {
  const first = randomFrom(firstNames);
  const middle = randomFrom(middleNames);
  const last = randomFrom(lastNames);

  return {
    first,
    middle,
    last,
    email: `${first}.${last}${randomNum(2)}@example.com`.toLowerCase(),
    mobile: `09${randomNum(9)}`,
    address: `${randomNum(3)} Sample Street`,
    nationality: 'Filipino',
    religion: 'None',
    gender: 'Male',
    location: randomFrom(locations),
    position: randomFrom(positions),
    department: randomFrom(departments),
    status: randomFrom(employmentStatuses),
  };
}

// ==================== CREATE EMPLOYEE ====================
async function createEmployee(page) {
  const emp = buildEmployee();

  // 👉 OPEN MODAL
  await page.getByRole('button', { name: /^create$/i }).click();

  const modalTitle = page.getByRole('heading', {
    name: 'Add Employee',
    exact: true,
  });

  // ✅ WAIT FOR MODAL TO OPEN
  await expect(modalTitle).toBeVisible({ timeout: 15000 });

  // ==================== DATE FIRST (FIXED) ====================
  const dateButton = page.locator(
    '#employee-date-hired-datepicker-datepicker-button'
  );
  await dateButton.waitFor({ state: 'visible' });
  await dateButton.click();

  await page.getByRole('option', { name: /December 19th, 2025/i }).click();

  // ==================== FORM FIELDS ====================
  await page.locator('#firstname').fill(emp.first);
  await page.locator('#middlename').fill(emp.middle);
  await page.locator('#lastname').fill(emp.last);

  await page.getByRole('textbox', { name: /email/i }).fill(emp.email);
  await page.locator('#mobile').fill(emp.mobile);
  await page.locator('#address').fill(emp.address);
  await page.locator('#nationality').fill(emp.nationality);
  await page.locator('#religion').fill(emp.religion);

  // ==================== DROPDOWNS ====================
  await page.getByLabel('Gender*').selectOption({ label: emp.gender });
  await page.getByLabel('Location*').selectOption({ label: emp.location });
  await page.getByLabel('Position*').selectOption({ label: emp.position });
  await page.getByLabel('Department*').selectOption({ label: emp.department });
  await page.getByLabel('Employment Status*').selectOption({ label: emp.status });

  // ==================== SAVE ====================
  await page.getByRole('button', { name: 'Save' }).click();

  // ✅ WAIT FOR MODAL TO CLOSE (THIS IS THE KEY FIX)
  await expect(modalTitle).toBeHidden({ timeout: 15000 });
}

// ==================== TEST ====================
test('Create 5 Random Employees', async ({ page }) => {
  test.setTimeout(120000); // allow enough time

  // LOGIN
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

  // NAVIGATION
  await page.getByRole('link', { name: 'Manage' }).click();
  await page.getByRole('link', { name: 'Employee List' }).click();

  // ==================== LOOP ====================
  for (let i = 1; i <= 5; i++) {
    console.log(`Creating employee ${i}`);
    await createEmployee(page);
  }

});




