import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: "./tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: "http://localhost:5173",

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    // screenshot: "on",
    // video: "on",
    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 },
        storageState: {
          cookies: [],
          origins: [
            {
              origin: "http://localhost:5173",
              localStorage: [
                {
                  name: "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token",
                  value: JSON.stringify({
                    access_token:
                      "BQBGuxGClOybhE-vG8anNClZE2UlXdHJ0ZEVzBAlGNuz36Gd9dC_XTxyzoHj_4cLzlWDxgyivmoSwduKE2h5kZoUc9LW_ep1iR5EI-1n6ifUxb5oY_rJV9VguMLZVHZvTEZB62mlya0bDyjg5SID0ZEFteikUdmVdCVZ1iex-R4_iFie0YABZi8lvxejPSGBzld12s3WsjlTJ252tG-YfTSr2OFRrKm4ePoIsCTaEyu1vCV6WWCJoWw9inFKUtRxM3IySAIMZmEaXuUgJtSx",
                    token_type: "Bearer",
                    expires_in: 3600,
                    refresh_token:
                      "AQBLPU0lnQ1ZKMCOo5pEQn2ZGa1dKhIF5dCkBw5gQyfak0hAxV3PNPxdEfdasB-KWBeu4uzL_sQsQ9677wfDdEGgRu2uGfdKWaTg8uZXXYLnBUaS0a48R6xXZWEL4iMYy0M",
                    scope:
                      "playlist-read-private user-library-read playlist-modify-private playlist-modify-public user-read-email user-read-private user-top-read",
                    expires: 1702560094173,
                  }),
                },
              ],
            },
          ],
        },
      },
    },
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
        storageState: {
          cookies: [],
          origins: [
            {
              origin: "http://localhost:5173",
              localStorage: [
                {
                  name: "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token",
                  value: JSON.stringify({
                    access_token:
                      "BQBGuxGClOybhE-vG8anNClZE2UlXdHJ0ZEVzBAlGNuz36Gd9dC_XTxyzoHj_4cLzlWDxgyivmoSwduKE2h5kZoUc9LW_ep1iR5EI-1n6ifUxb5oY_rJV9VguMLZVHZvTEZB62mlya0bDyjg5SID0ZEFteikUdmVdCVZ1iex-R4_iFie0YABZi8lvxejPSGBzld12s3WsjlTJ252tG-YfTSr2OFRrKm4ePoIsCTaEyu1vCV6WWCJoWw9inFKUtRxM3IySAIMZmEaXuUgJtSx",
                    token_type: "Bearer",
                    expires_in: 3600,
                    refresh_token:
                      "AQBLPU0lnQ1ZKMCOo5pEQn2ZGa1dKhIF5dCkBw5gQyfak0hAxV3PNPxdEfdasB-KWBeu4uzL_sQsQ9677wfDdEGgRu2uGfdKWaTg8uZXXYLnBUaS0a48R6xXZWEL4iMYy0M",
                    scope:
                      "playlist-read-private user-library-read playlist-modify-private playlist-modify-public user-read-email user-read-private user-top-read",
                    expires: 1702560094173,
                  }),
                },
              ],
            },
          ],
        },
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
        storageState: {
          cookies: [],
          origins: [
            {
              origin: "http://localhost:5173",
              localStorage: [
                {
                  name: "spotify-sdk:AuthorizationCodeWithPKCEStrategy:token",
                  value: JSON.stringify({
                    access_token:
                      "BQBGuxGClOybhE-vG8anNClZE2UlXdHJ0ZEVzBAlGNuz36Gd9dC_XTxyzoHj_4cLzlWDxgyivmoSwduKE2h5kZoUc9LW_ep1iR5EI-1n6ifUxb5oY_rJV9VguMLZVHZvTEZB62mlya0bDyjg5SID0ZEFteikUdmVdCVZ1iex-R4_iFie0YABZi8lvxejPSGBzld12s3WsjlTJ252tG-YfTSr2OFRrKm4ePoIsCTaEyu1vCV6WWCJoWw9inFKUtRxM3IySAIMZmEaXuUgJtSx",
                    token_type: "Bearer",
                    expires_in: 3600,
                    refresh_token:
                      "AQBLPU0lnQ1ZKMCOo5pEQn2ZGa1dKhIF5dCkBw5gQyfak0hAxV3PNPxdEfdasB-KWBeu4uzL_sQsQ9677wfDdEGgRu2uGfdKWaTg8uZXXYLnBUaS0a48R6xXZWEL4iMYy0M",
                    scope:
                      "playlist-read-private user-library-read playlist-modify-private playlist-modify-public user-read-email user-read-private user-top-read",
                    expires: 1702560094173,
                  }),
                },
              ],
            },
          ],
        },
      },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});
