import { test, expect } from '@playwright/test';

test("Hero section visual regression test", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 720 }); // Set a fixed viewport size
  await page.goto("/realty");
  await page.waitForSelector("main"); // Wait for the main content to load
  await expect(page).toHaveScreenshot("hero-baseline.png", { fullPage: true });
});
