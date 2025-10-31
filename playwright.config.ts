import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env.PLAYWRIGHT_TEST_BASE_URL || process.env.BASE_URL || 'http://localhost:3000';

export default defineConfig({
  testDir: './tests',
  use: {
    baseURL,
    viewport: { width: 1280, height: 800 },
    headless: true,
    colorScheme: 'light',
    timezoneId: 'UTC',
    locale: 'en-US',
    deviceScaleFactor: 1,
    screenshot: 'off',
    video: 'off',
    trace: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
});
