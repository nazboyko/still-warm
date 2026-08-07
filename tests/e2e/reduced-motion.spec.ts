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

test("the ink transformation is instant under reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("textbox", { name: "Dish", exact: true }).fill("Kasha");
  await page.getByRole("textbox", { name: "Feeling" }).fill("Monday");
  await page.getByRole("textbox", { name: "Memory" }).fill("A quiet bowl.");
  await page.getByRole("button", { name: "Donate the exhibit" }).click();

  const inkedBody = page.locator(".inked-body");
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-inked",
    "true",
  );
  const styles = await inkedBody.evaluate((element) => {
    const computed = getComputedStyle(element);
    return { opacity: computed.opacity, duration: computed.transitionDuration };
  });
  expect(styles.opacity).toBe("1");
  expect(styles.duration).toBe("0s");
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
