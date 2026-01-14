async function setupStage(page) {
  await page.getByRole('button', { name: 'Stage options' }).nth(stageIndex).click();

  // click dropdown item only
  await page.getByRole('menuitem', { name: 'Set-up Stage Requirements' }).click();

  await page.getByText(/Stage Requirements/i).waitFor();

  const reqInput = page.locator('textarea, input[role="textbox"], [contenteditable="true"]').first();
  await reqInput.waitFor({ state: 'visible' });

  for (const r of ['1', '2', '3']) {
    await reqInput.fill(r);
    await page.getByRole('button', { name: 'ADD' }).click();
  }

  await page.getByRole('button', { name: 'Save' }).click();
}
