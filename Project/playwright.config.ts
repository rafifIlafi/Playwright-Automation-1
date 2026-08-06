import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './test',

  /* Maximum time one test can run */
  timeout: 30 * 1000,

  /* Timeout for assertions */
  expect: {
    timeout: 10 * 1000,
  },

  /* Run test in parallel */
  fullyParallel: true,

  /* Prevent accidentally committing test.only */
  forbidOnly: !!process.env.CI,

  /* Retry on CI */
  retries: process.env.CI ? 2 : 0,

  /* Limit workers on CI */
  workers: process.env.CI ? 1 : undefined,
  
  /* HTML Report */
  reporter: 'html',

  /* Shared settings */
use: {
  /* Base URL */
  baseURL: 'http://localhost:3000',

  /* Browser normal */
  headless: false,

  /* Screenshot setiap test */
  screenshot: 'on',

  /* Video setiap test */
  video: 'on',

  /* Trace setiap test */
  trace: 'off',

  /* Ignore HTTPS */
  ignoreHTTPSErrors: true,

  /* Ukuran browser */
  viewport: {
    width: 1366,
    height: 768,
  },
},

  /* Browser yang digunakan */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    /*
    // Mobile Chrome
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 7'],
      },
    },

    // Mobile Safari
    {
      name: 'Mobile Safari',
      use: {
        ...devices['iPhone 14'],
      },
    },
    */
  ],

  /* Jalankan Next.js otomatis sebelum testing */
   webServer: {
     command: 'npm run dev',
     url: 'http://localhost:3000',
     reuseExistingServer: !process.env.CI,
   },
});