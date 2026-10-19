import { test, expect } from '@playwright/test'

test('dashboard loads and displays title', async ({ page }) => {
  await page.goto('/')
  
  // Check that the heading is visible
  const heading = page.locator('h1', { hasText: 'DataFactor Enterprise Analytics' })
  await expect(heading).toBeVisible()
})
