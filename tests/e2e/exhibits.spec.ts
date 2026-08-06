import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const triggers = (page: Page) =>
  page.getByRole("button", { name: "Read the label" });

test("label opens and closes by mouse", async ({ page }) => {
  await page.goto("/");
  const trigger = triggers(page).first();
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#cat-001-story")).toContainText(
    "hands that made them",
  );
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(page.locator("#cat-001-story")).toHaveCount(0);
});

test("label opens with Enter and with Space", async ({ page }) => {
  await page.goto("/");
  const trigger = triggers(page).first();
  await trigger.focus();
  await page.keyboard.press("Enter");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Space");
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
});

test("escape closes and returns focus to the trigger", async ({ page }) => {
  await page.goto("/");
  const trigger = triggers(page).nth(1);
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});

test("closed stories are not in the tab order", async ({
  page,
  browserName,
}) => {
  await page.goto("/");
  await triggers(page).first().focus();
  // WebKit tabs past controls unless the Option modifier is held.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  await expect(triggers(page).nth(1)).toBeFocused();
});

test("the spotlight moves: a second room closes the first", async ({
  page,
}) => {
  await page.goto("/");
  await triggers(page).first().click();
  await triggers(page).nth(1).click();
  await expect(triggers(page).first()).toHaveAttribute(
    "aria-expanded",
    "false",
  );
  await expect(triggers(page).nth(1)).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#cat-001-story")).toHaveCount(0);
});

test("the walk continues to the next room", async ({ page }) => {
  await page.goto("/");
  await triggers(page).first().click();
  await page.getByRole("button", { name: /Next: CAT\. 002/ }).click();
  const secondTrigger = triggers(page).nth(1);
  await expect(secondTrigger).toHaveAttribute("aria-expanded", "true");
  await expect(secondTrigger).toBeFocused();
  const viewport = page.viewportSize()!;
  await expect(async () => {
    const box = await page.locator("#cat-002 .placard").boundingBox();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeLessThan(viewport.height * 0.6);
  }).toPass();
});

test("opening a lower room while one is open does not jump", async ({
  page,
}) => {
  await page.goto("/");
  await triggers(page).first().click();
  await expect(page.locator("#cat-001-story")).toHaveCSS("opacity", "1");
  const thirdTrigger = triggers(page).nth(2);
  await thirdTrigger.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  const before = (await thirdTrigger.boundingBox())!.y;
  await thirdTrigger.click();
  await page.waitForTimeout(100);
  const after = (await thirdTrigger.boundingBox())!.y;
  // Sub-pixel anchoring rounding is fine; a real jump is the region height (~390px).
  expect(Math.abs(after - before)).toBeLessThanOrEqual(8);
});
