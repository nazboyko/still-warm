import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  use: {
    baseURL: "http://localhost:4173",
    trace: "retain-on-failure",
  },
  webServer: {
    command: "npm run build && npm run preview",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "chromium-desktop", use: { ...devices["Desktop Chrome"] } },
    { name: "mobile-chrome", use: { ...devices["Pixel 7"] } },
    // Baselines live on the Chromium family only: WebKit and Firefox render
    // gradients differently enough between runs to make them flaky guards.
    {
      name: "webkit-desktop",
      use: { ...devices["Desktop Safari"] },
      testIgnore: "**/visual.spec.ts",
    },
    {
      name: "mobile-safari",
      use: { ...devices["iPhone 15"] },
      testIgnore: "**/visual.spec.ts",
    },
    {
      name: "firefox-desktop",
      use: { ...devices["Desktop Firefox"] },
      testIgnore: "**/visual.spec.ts",
    },
  ],
});
