// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config=({
  testDir: './tests',
  timeout:60000,
  expect:{timeout:5000},
  reporter:"html",
  
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

use: {
  browserName: "chromium",
  headless: false,
  trace: "on",
  // keep trace files
},

 

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

module.exports= config

