import { test, expect } from '@playwright/test';

test('sidebar navigation works for key modules', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

  await page.getByRole('link', { name: 'Market Prices' }).click();
  await expect(page.getByRole('heading', { name: 'Market Prices' })).toBeVisible();

  await page.getByRole('link', { name: 'Settlement' }).click();
  await expect(page.getByRole('heading', { name: 'Settlement' })).toBeVisible();
});
