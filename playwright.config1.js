// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'node:cluster';
import { trace } from 'node:console';
import { permission } from 'node:process';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 2,
  timeout: 60000,
  expect: { timeout: 5000 },
  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: true,
        screenshot:"off",
        trace: "on",
        ...devices['iPhone 12 Pro'],
        // keep trace files
      }
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        trace: "on",
        ignoreHTTPSErrors: true,
        permissions: ["geolocation"],
        video:"retain-on-failure",
        //viewport: { width: 720, height: 720 },
        // keep trace files
      }
    },
  ],


  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */




  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

module.exports = config

