import { expect, test } from "@playwright/test";

test("unfold becomes a crossfade under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Read the label" }).first();
  await trigger.click();
  const region = page.locator("#cat-001-story");
  await expect(region).toBeVisible();
  const transform = await region.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(transform);
});

test("reduced motion loses no content", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Read the label" }).first().click();
  const fullMotionText = await page
    .locator("#cat-001-story")
    .innerText({ timeout: 5000 });

  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page.getByRole("button", { name: "Read the label" }).first().click();
  const reducedText = await page.locator("#cat-001-story").innerText();

  expect(reducedText).toBe(fullMotionText);
  expect(reducedText).toContain("У повітрі пахне");
});
