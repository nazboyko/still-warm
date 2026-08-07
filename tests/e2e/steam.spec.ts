import { expect, test } from "./fixtures";

test("steam runs at the case and pauses off-screen", async ({ page }) => {
  await page.goto("/");
  const wisp = page.locator(".steam-wisp").first();
  await page.locator(".display-case").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      wisp.evaluate((element) => getComputedStyle(element).animationPlayState),
    )
    .toBe("running");

  await page.locator("#visit").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      wisp.evaluate((element) => getComputedStyle(element).animationPlayState),
    )
    .toBe("paused");

  await page.locator(".display-case").scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      wisp.evaluate((element) => getComputedStyle(element).animationPlayState),
    )
    .toBe("running");
});

test("steam is static under reduced motion, with presence", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".steam-wisp").first()).toBeHidden();
  const staticWisp = page.locator(".steam-static");
  await expect(staticWisp).toBeVisible();
  expect(
    await staticWisp.evaluate(
      (element) => getComputedStyle(element).strokeOpacity,
    ),
  ).toBe("0.45");
});
