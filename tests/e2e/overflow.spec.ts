import { expect, test } from "./fixtures";
import type { Page } from "@playwright/test";

const horizontalOverflow = (page: Page) =>
  page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );

test("no horizontal overflow at project viewport", async ({ page }) => {
  await page.goto("/");
  expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
});

test("no horizontal overflow at 320px", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  expect(await horizontalOverflow(page)).toBeLessThanOrEqual(0);
});

test("200% text zoom still fits the phone", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  await expect.poll(() => horizontalOverflow(page)).toBeLessThanOrEqual(0);
});

test("200% text zoom still fits the narrowest phone", async ({ page }) => {
  // The hard case: at 320 the display type's own floor made STILL WARM wider
  // than the column it sits in, and the whole document grew to hold the word.
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%";
  });
  await expect.poll(() => horizontalOverflow(page)).toBeLessThanOrEqual(0);
});
