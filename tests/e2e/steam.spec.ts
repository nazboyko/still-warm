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
  const staticWisp = page.locator(".steam-static").first();
  await expect(staticWisp).toBeVisible();
  expect(
    await staticWisp.evaluate(
      (element) => getComputedStyle(element).strokeOpacity,
    ),
  ).toBe("0.45");
});

test("the hero's lid is already lifted and never lifts", async ({ page }) => {
  await page.goto("/");
  // The hero shows a dish that has been uncovered; the act of uncovering is
  // the donation finale's, and it must not be spent twice.
  const lid = page.locator(".display-case .case-cloche");
  await expect(lid).toBeVisible();
  const motion = await lid.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      animation: computed.animationName,
      transition: computed.transitionProperty,
      opacity: computed.opacity,
    };
  });
  expect(motion.animation).toBe("none");
  expect(motion.transition).toBe("all");
  expect(motion.opacity).toBe("1");
});
