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
  // A late webfont reflows the placard, so a baseline taken before the fonts
  // land blames the toggle for the swap that follows.
  await page.evaluate(() => document.fonts.ready);
  await triggers(page).first().click();
  await expect(page.locator("#cat-001-story")).toHaveCSS("opacity", "1");
  const thirdTrigger = triggers(page).nth(2);
  await thirdTrigger.scrollIntoViewIfNeeded();
  // Measure the starting point only once the label itself has stopped moving.
  // Waiting on the scroll alone is not enough: the room's placard rises 10px
  // as it arrives, so a baseline taken mid-arrival is a spot the visitor never
  // actually saw, and the test then blames the toggle for the entrance.
  await expect
    .poll(async () => {
      const first = (await thirdTrigger.boundingBox())!.y;
      await page.waitForTimeout(120);
      return (await thirdTrigger.boundingBox())!.y === first;
    })
    .toBe(true);
  const before = (await thirdTrigger.boundingBox())!.y;
  await thirdTrigger.click();
  // Engines finish the collapse above at different speeds, so assert where the
  // label comes to rest: it must return to where the visitor clicked it. With
  // the hold anchored on the room rather than the arriving placard, the worst
  // measured resting drift is 0.88px on mobile-safari and under 0.5px
  // everywhere else, so 8 is a guard against a thrown page, not a fitted bound.
  await expect(async () => {
    const after = (await thirdTrigger.boundingBox())!.y;
    expect(Math.abs(after - before)).toBeLessThanOrEqual(8);
  }).toPass({ timeout: 3000 });
});

/* Toggling has to be idempotent, not merely correct once. Three drift bugs in a
   week came from a correction applied relative to the current state, so each
   press added to the last and a single toggle looked clean. Five cycles per
   room, and both frames that can drift: where the dish sits on screen, which
   catches scroll leaking out of the correction, and where it sits in its room,
   which catches the layout following the panel's height. */
const rooms = ["cat-001", "cat-002", "cat-003", "cat-004"] as const;

/* Every reading here is a scroll position, and the page scrolls smoothly and
   corrects itself for a few frames afterwards. Measured mid-flight the numbers
   are meaningless, so wait until nothing has scrolled for a moment. A leak
   still shows: it changes where the page comes to rest. */
async function pageAtRest(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let timer = 0;
        const finish = () => {
          window.clearTimeout(ceiling);
          window.removeEventListener("scroll", restart);
          resolve();
        };
        const restart = () => {
          window.clearTimeout(timer);
          timer = window.setTimeout(finish, 200);
        };
        // A ceiling, so a page that never stops scrolling fails on the
        // assertion that follows rather than on a bare 30s timeout.
        const ceiling = window.setTimeout(finish, 4000);
        window.addEventListener("scroll", restart, { passive: true });
        timer = window.setTimeout(finish, 200);
      }),
  );
}

test("the dish does not ride the panel's height", async ({ page }) => {
  // The plainest statement of the rule, and the one that caught the original
  // bug: with the artwork centred in its row it moved 211px when the panel
  // grew, and came back when the panel shut - so anything that measures only
  // the resting state is blind to it.
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  for (const id of rooms) {
    const room = page.locator(`#${id}`);
    await room.scrollIntoViewIfNeeded();
    const inRoom = () =>
      page.evaluate((roomId) => {
        const wall = document
          .querySelector(`#${roomId}`)!
          .getBoundingClientRect();
        const art = document
          .querySelector(`#${roomId} .room-art`)!
          .getBoundingClientRect();
        return Math.round(art.top - wall.top);
      }, id);
    // Read the closed position once the room has come to rest: on a slow
    // engine the art is still being laid out on the frame after scrolling.
    await expect.poll(inRoom).toBe(await inRoom());
    const closed = await inRoom();
    const trigger = room.getByRole("button", { name: "Read the label" });
    await trigger.dispatchEvent("click");
    await expect(page.locator(`#${id}-story`)).toBeVisible();
    await expect
      .poll(inRoom, { message: `${id} rides the panel's height` })
      .toBe(closed);
    // Shut it before moving on: an open panel here means the next room's scroll
    // arrives while the spotlight is still swapping, and nothing is ever stable.
    await trigger.dispatchEvent("click");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
  }
});

test("five open and close cycles leave every dish where it started", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);

  for (const id of rooms) {
    const room = page.locator(`#${id}`);
    const trigger = room.getByRole("button", { name: "Read the label" });
    await room.scrollIntoViewIfNeeded();
    await pageAtRest(page);

    // Two readings, no viewport coordinates: where the page rests, and where
    // the dish hangs inside its room. A leaked correction moves the first; a
    // layout following the panel's height moves the second. Parking the
    // trigger and measuring against the screen only measured the test's own
    // scrolling, which is what made this fragile rather than strict.
    const state = () =>
      page.evaluate((roomId) => {
        const wall = document
          .querySelector(`#${roomId}`)!
          .getBoundingClientRect();
        const art = document
          .querySelector(`#${roomId} .room-art`)!
          .getBoundingClientRect();
        return {
          scroll: Math.round(window.scrollY),
          inRoom: Math.round(art.top - wall.top),
        };
      }, id);

    // One cycle first, then measure. The first close can legitimately reposition
    // the page once - the header guard pulls the trigger clear if the collapse
    // left it underneath - and that correction is absolute, not cumulative.
    await trigger.dispatchEvent("click");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await pageAtRest(page);
    await trigger.dispatchEvent("click");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await pageAtRest(page);
    const closed = await state();

    for (let cycle = 1; cycle <= 5; cycle += 1) {
      await trigger.dispatchEvent("click");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await trigger.dispatchEvent("click");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await pageAtRest(page);
      // Where the page rests must not creep: this is the drift a visitor sees
      // as the dish walking down the screen, one press at a time.
      const now = await state();
      expect(
        Math.abs(now.scroll - closed.scroll),
        `${id} leaked scroll after ${cycle} cycles`,
      ).toBeLessThanOrEqual(1);
      expect(
        now.inRoom,
        `${id} drifted in its room after ${cycle} cycles`,
      ).toBe(closed.inRoom);
    }
  }
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
