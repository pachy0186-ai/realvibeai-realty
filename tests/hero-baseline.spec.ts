import { test, expect } from '@playwright/test';

test("Hero section visual regression test", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 }); // Set a fixed viewport size
  await page.goto("/realty", { waitUntil: 'networkidle' });
  await page.waitForSelector("main"); // Wait for the main content to load
  
  // Wait for fonts to load to ensure consistent rendering
  await page.evaluate(() => document.fonts.ready);
  
  // Additional small delay to ensure all animations/transitions complete
  await page.waitForTimeout(500);
  
  await expect(page).toHaveScreenshot("hero-baseline.png", { fullPage: true });
});

