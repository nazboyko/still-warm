import { expect, test } from "./fixtures";

test("document has a non-empty title", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/\S/);
});

test("html declares english language", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});

test("page has exactly one h1", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("h1")).toHaveCount(1);
});

test("headings never skip a level", async ({ page }) => {
  await page.goto("/");
  const levels = await page
    .locator("h1, h2, h3, h4, h5, h6")
    .evaluateAll((headings) =>
      headings.map((heading) => Number(heading.tagName.charAt(1))),
    );
  expect(levels[0]).toBe(1);
  levels.forEach((level, index) => {
    const previous = levels[index - 1];
    if (previous !== undefined) {
      expect(level).toBeLessThanOrEqual(previous + 1);
    }
  });
});
