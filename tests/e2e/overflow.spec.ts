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
