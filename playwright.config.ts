import path from 'path';
import { defineConfig, devices } from '@playwright/test';

// create a timestamped folder for each run so artifacts don't collide
const runId = new Date().toISOString().replace(/[:.]/g, '-');
const runOutputDir = path.join('test-results', runId);
const htmlReportDir = path.join('playwright-report', runId);

export default defineConfig({
  outputDir: runOutputDir,
  testDir: './tests',
  timeout: 60000,

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [[ 'html', { outputFolder: htmlReportDir } ]],

  use: {
    headless: false,

    launchOptions: {
      slowMo: 1000, // ✅ slow motion
    },

    video: {
      mode: 'on', // 'on' | 'retain-on-failure' | 'on-first-retry'
      size: { width: 800, height: 600 },
    },

    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
