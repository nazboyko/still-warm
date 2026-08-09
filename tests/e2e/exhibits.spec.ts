import { expect, test } from "./fixtures";
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

test("escape with focus elsewhere leaves the page alone", async ({ page }) => {
  await page.goto("/");
  await triggers(page).first().click();
  await expect(triggers(page).first()).toHaveAttribute("aria-expanded", "true");
  const footerLink = page.getByRole("link", { name: "Source on GitHub" });
  await footerLink.focus();
  await page.keyboard.press("Escape");
  await expect(triggers(page).first()).toHaveAttribute("aria-expanded", "true");
  await expect(footerLink).toBeFocused();
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
  // Engines finish the collapse above at different speeds, so assert where the
  // label comes to rest - it must return to where the visitor clicked it.
  await expect(async () => {
    const after = (await thirdTrigger.boundingBox())!.y;
    expect(Math.abs(after - before)).toBeLessThanOrEqual(8);
  }).toPass({ timeout: 3000 });
});

test("opening a label does not move the dish", async ({ page }) => {
  await page.goto("/");
  const room = page.locator("#cat-001");
  await room.scrollIntoViewIfNeeded();
  // Measured against the room itself, not the page: the anchor hold scrolls to
  // keep the clicked label under the eye, and late fonts move every section
  // above this one. What must hold is that the dish hangs in the same place in
  // its room whether the panel is folded or open.
  const offsetInRoom = () =>
    page.evaluate(() => {
      const room = document.querySelector("#cat-001")!.getBoundingClientRect();
      const art = document
        .querySelector("#cat-001 .room-art")!
        .getBoundingClientRect();
      return {
        top: Math.round(art.top - room.top),
        left: Math.round(art.left - room.left),
      };
    });
  const before = await offsetInRoom();
  await room.getByRole("button", { name: "Read the label" }).click();
  await expect(page.locator("#cat-001-story")).toHaveCSS("opacity", "1");
  await expect.poll(offsetInRoom).toEqual(before);
});

test("the spot warms as the label opens and settles back", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const cone = page.locator("#cat-001 .art-cone");
  const pool = page.locator("#cat-001 .art-pool");
  const trigger = page
    .locator("#cat-001")
    .getByRole("button", { name: "Read the label" });
  const dim = await cone.evaluate(
    (element) => getComputedStyle(element).opacity,
  );

  await trigger.click();
  await expect(cone).toHaveCSS("opacity", "0.16");
  // The pool on the plate opens up with the beam.
  await expect
    .poll(() => pool.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe("none");

  await trigger.click();
  await expect(cone).toHaveCSS("opacity", dim);
  await expect
    .poll(() => pool.evaluate((element) => getComputedStyle(element).transform))
    .toBe("none");
});

test("an open beam stops drifting once the room leaves the screen", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page
    .locator("#cat-001")
    .getByRole("button", { name: "Read the label" })
    .click();
  const haze = page.locator("#cat-001 .art-haze");
  const playState = () =>
    haze.evaluate((element) => getComputedStyle(element).animationPlayState);
  await expect.poll(playState).toBe("running");
  // Opening the label leaves the anchor hold correcting the scroll for a few
  // frames, and under load it is still doing that here - so keep the page at
  // the top rather than scrolling once and racing it.
  await expect(async () => {
    await page.evaluate(() => window.scrollTo(0, 0));
    expect(await playState()).toBe("paused");
  }).toPass();
});

test("opening a label plays one serving detail, then the dish is still", async ({
  page,
}) => {
  await page.goto("/");
  await triggers(page).first().click();
  const sheen = page.locator("#cat-001 .serve-sheen");
  const animation = await sheen.evaluate((element) => {
    const computed = getComputedStyle(element);
    return {
      name: computed.animationName,
      count: computed.animationIterationCount,
      fill: computed.animationFillMode,
    };
  });
  expect(animation.name).toBe("serve-sheen");
  expect(animation.count).toBe("1");
  expect(animation.fill).toBe("forwards");
});

test("the room light warms when a visitor reaches the room", async ({
  page,
}) => {
  await page.goto("/");
  const glow = page.locator("#cat-002 .art-glow-lit");
  expect(await glow.evaluate((el) => getComputedStyle(el).opacity)).toBe("0");
  await page
    .locator("#cat-002")
    .getByRole("button", { name: "Read the label" })
    .focus();
  await expect
    .poll(() => glow.evaluate((el) => getComputedStyle(el).opacity))
    .toBe("0.45");
});

test("dish steam runs in view and pauses off screen", async ({ page }) => {
  await page.goto("/");
  const art = page.locator("#cat-001 .room-art");
  await page.locator("#cat-001").scrollIntoViewIfNeeded();
  await expect(art).toHaveAttribute("data-steam", "live");
  await page.evaluate(() => window.scrollTo(0, 0));
  await expect(art).toHaveAttribute("data-steam", "paused");
});

test("the restored trigger is never left under the header", async ({
  page,
  browserName,
}) => {
  await page.goto("/");
  // WCAG 2.2 SC 2.4.11: Escape returns focus to the trigger, and the panel
  // collapsing behind it must not slide that trigger under the sticky header.
  for (const room of ["cat-001", "cat-002", "cat-003", "cat-004"]) {
    const trigger = page
      .locator(`#${room}`)
      .getByRole("button", { name: "Read the label" });
    // Drive it as a keyboard visitor would: a WebKit click leaves focus on
    // body, and WebKit tabs past controls without the Option modifier.
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
    await page.keyboard.press("Escape");
    await expect(trigger).toBeFocused();
    await expect(async () => {
      const clear = await page.evaluate(() => {
        const el = document.activeElement!.getBoundingClientRect();
        const bar = document
          .querySelector(".site-header-bar")!
          .getBoundingClientRect();
        return el.top - bar.bottom;
      });
      expect(clear).toBeGreaterThanOrEqual(0);
    }).toPass();
  }
});
