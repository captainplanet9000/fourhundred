import { test, expect } from '@playwright/test';

test('homepage loads correctly', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check that the page title is correct
  await expect(page).toHaveTitle('fourHundred — Gilded Age Dogs');

  // Check that the main heading is visible
  const mainHeading = page.locator('h1');
  await expect(mainHeading).toBeVisible();

  // Check that the gallery loads
  const gallery = page.locator('[data-testid="gallery"]');
  await expect(gallery).toBeVisible();

  // Check that at least one token is visible
  const token = page.locator('[data-testid="token-card"]').first();
  await expect(token).toBeVisible();

  // Take a screenshot for visual regression testing
  await page.screenshot({ path: 'homepage.png', fullPage: true });
});

test('can navigate to token detail page', async ({ page }) => {
  // Start on the homepage
  await page.goto('/');

  // Wait for tokens to load
  await page.waitForSelector('[data-testid="token-card"]');

  // Click on the first token
  await page.locator('[data-testid="token-card"]').first().click();

  // Check that we've navigated to a token detail page
  await expect(page).toHaveURL(/\/token\/\d+/);

  // Check that the token detail content is visible
  const tokenDetail = page.locator('[data-testid="token-detail"]');
  await expect(tokenDetail).toBeVisible();

  // Take a screenshot for visual regression testing
  await page.screenshot({ path: 'token-detail.png', fullPage: true });
});

test('can connect wallet', async ({ page }) => {
  // Start on the homepage
  await page.goto('/');

  // Click on the connect wallet button
  await page.locator('[data-testid="connect-button"]').click();

  // Check that the wallet connection modal is visible
  const walletModal = page.locator('[data-testid="wallet-modal"]');
  await expect(walletModal).toBeVisible();

  // Take a screenshot for visual regression testing
  await page.screenshot({ path: 'wallet-connect.png' });
});