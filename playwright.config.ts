import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    viewport: { width: 1280, height: 800 },
    headless: true,
    colorScheme: 'light',
    timezoneId: 'UTC',
    locale: 'en-US',
    deviceScaleFactor: 1,
    launchOptions: { args: ['--font-render-hinting=none'] },
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
