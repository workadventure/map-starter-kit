import { test, expect } from '@playwright/test';

test('Starter Kit is started', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  await expect(page).toHaveTitle(/WorkAdventure Starter Kit/);
});
