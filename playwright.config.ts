import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Folder test
  testDir: './Project/test',

  // Timeout tiap test
  timeout: 30 * 1000,

  // Timeout assertion
  expect: {
    timeout: 10 * 1000,
  },

  // Jalankan test secara parallel
  fullyParallel: true,

  // Cegah test.only ketika CI
  forbidOnly: !!process.env.CI,

  // Retry ketika CI
  retries: process.env.CI ? 2 : 0,

  // Worker
  workers: process.env.CI ? 1 : undefined,

  // Report
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],

  use: {
    // URL aplikasi
    baseURL: 'http://localhost:3000',

    // Headless saat CI
    headless: !!process.env.CI,

    // Screenshot jika gagal
    screenshot: 'only-on-failure',

    // Video jika gagal
    video: 'retain-on-failure',

    // Trace otomatis jika gagal
    trace: 'retain-on-failure',

    // Ignore HTTPS
    ignoreHTTPSErrors: true,

    // Viewport
    viewport: {
      width: 1366,
      height: 768,
    },

    // Action timeout
    actionTimeout: 15000,

    // Navigation timeout
    navigationTimeout: 30000,
  },

  // Browser
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    /*
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
      },
    },
    */
  ],

  // Menjalankan Next.js otomatis
  webServer: {
    command: 'npm run dev',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});