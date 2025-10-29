import { test, expect } from '@playwright/test';

test('Hero section visual regression', async ({ page }) => {
  // Use absolute URL with fallback for CI environments without dev server
  const BASE = process.env.PLAYWRIGHT_TEST_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';
  await page.goto(`${BASE}/realty`, { waitUntil: 'load' });

  // Wait for all fonts to load
  await page.evaluate(async () => {
    if (document.fonts && document.fonts.ready) await document.fonts.ready;
  });

  // Disable animations/transitions to stabilize rendering
  await page.addStyleTag({ content: `
    *,*::before,*::after {
      animation: none !important;
      transition: none !important;
    }
    html { scroll-behavior: auto !important; }
  `});

  // Capture only the hero section
  const hero = page.locator('[data-testid="hero"], main, section:first-of-type');
  await expect(hero.first()).toBeVisible();

  await expect(hero.first()).toHaveScreenshot('hero-baseline.png', {
    animations: 'disabled',
    maxDiffPixelRatio: 0.01,
  });
});
