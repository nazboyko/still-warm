import { expect, test } from "./fixtures";
import type { Page } from "@playwright/test";

/* Our CLS numbers all measured load and scroll; none of them typed. The frame
   used to shrink on the first keystroke, in the section that matters most. */
async function shiftWhileTyping(page: Page): Promise<number> {
  await page.goto("/");
  await page.locator("#donate").scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);

  await page.evaluate(() => {
    const store = { total: 0 };
    (window as unknown as { __shift: typeof store }).__shift = store;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const shift = entry as PerformanceEntry & {
          value: number;
          hadRecentInput: boolean;
        };
        // Typing is input, so hadRecentInput is true throughout: count it all.
        store.total += shift.value;
      }
    }).observe({ type: "layout-shift", buffered: false });
  });

  const fields: [string, string][] = [
    ["Dish", "Borscht"],
    ["Feeling", "Quiet evenings"],
    ["Memory", "The pot my grandmother never washed the same day."],
    ["Donated by (optional)", "Marta"],
  ];
  for (const [label, value] of fields) {
    await page.getByRole("textbox", { name: label, exact: true }).click();
    await page.keyboard.type(value, { delay: 8 });
  }
  await page.waitForTimeout(300);

  return page.evaluate(
    () => (window as unknown as { __shift: { total: number } }).__shift.total,
  );
}

test("typing into the desk never moves the exhibit", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "layout-shift entries are Chromium-only",
  );
  expect(await shiftWhileTyping(page)).toBeLessThan(0.01);
});

test("typing never moves the exhibit on a phone", async ({
  page,
  browserName,
}) => {
  test.skip(
    browserName !== "chromium",
    "layout-shift entries are Chromium-only",
  );
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await shiftWhileTyping(page)).toBeLessThan(0.01);
});
