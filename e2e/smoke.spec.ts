import { test, expect } from '@playwright/test';

// Basic smoke tests for the dapp

test('home page renders and shows Connect button', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/fourHundred/i);
  // Navbar Connect button from RainbowKit
  await expect(page.getByRole('button', { name: /connect wallet/i })).toBeVisible();
});

test('mint card shows price and quantity controls', async ({ page }) => {
  await page.goto('/');
  // Price section exists
  await expect(page.getByText(/price/i)).toBeVisible();
  // Quantity controls
  await expect(page.getByRole('button', { name: '-' })).toBeVisible();
  await expect(page.getByRole('button', { name: '+' })).toBeVisible();
});

// API smoke
test('log-wallet API accepts POST', async ({ request }) => {
  const res = await request.post('/api/log-wallet', {
    data: { event: 'connect', address: '0xdeadbeef', connector: 'test', chainId: 11155111, ts: Date.now() },
  });
  expect(res.ok()).toBeTruthy();
});
