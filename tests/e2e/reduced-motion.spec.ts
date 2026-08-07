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

test("the reveal is instant under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("textbox", { name: "Dish", exact: true }).fill("Kasha");
  await page.getByRole("textbox", { name: "Feeling" }).fill("Monday");
  await page.getByRole("textbox", { name: "Memory" }).fill("A quiet bowl.");
  await page.getByRole("button", { name: "Donate the exhibit" }).click();

  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-revealed",
    "true",
  );
  const food = await page.locator(".dish-food").evaluate((element) => {
    const computed = getComputedStyle(element);
    return { opacity: computed.opacity, animation: computed.animationName };
  });
  expect(food.opacity).toBe("1");
  expect(food.animation).toBe("none");

  // The cover never plays its lift; the exhibit is simply already uncovered.
  const cloche = await page.locator(".scene-cloche").evaluate((element) => {
    const computed = getComputedStyle(element);
    return { opacity: computed.opacity, animation: computed.animationName };
  });
  expect(cloche.opacity).toBe("0");
  expect(cloche.animation).toBe("none");
});

test("room lighting is static under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.evaluate(() => {
    const room = document.getElementById("cat-003")!;
    const top = room.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight + 60);
  });
  await expect
    .poll(() =>
      page
        .locator("#cat-003")
        .evaluate((room) => getComputedStyle(room).backgroundColor),
    )
    .toBe("rgb(32, 24, 16)");
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

test("serving details do not play under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Read the label" }).first().click();
  const sheen = await page
    .locator("#cat-001 .serve-sheen")
    .evaluate((element) => getComputedStyle(element).animationName);
  expect(sheen).toBe("none");

  // The ambient steam is a static wisp, not a loop.
  const wisp = await page
    .locator("#cat-001 .steam-wisp")
    .first()
    .evaluate((element) => getComputedStyle(element).display);
  expect(wisp).toBe("none");
});
