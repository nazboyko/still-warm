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
          window.removeEventListener("scroll", restart);
          resolve();
        };
        const restart = () => {
          window.clearTimeout(timer);
          timer = window.setTimeout(finish, 200);
        };
        window.addEventListener("scroll", restart, { passive: true });
        timer = window.setTimeout(finish, 200);
      }),
  );
}

test("five open and close cycles leave every dish where it started", async ({
  page,
}) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  // Walking between rooms is the test's own business, and a smooth scroll still
  // in flight swallows the next one and lands the room somewhere unintended.
  // The corrections under test scroll instantly whatever this says, so it
  // changes how the test moves around and not what it measures.
  await page.addStyleTag({
    content: "html { scroll-behavior: auto !important; }",
  });

  for (const id of rooms) {
    const room = page.locator(`#${id}`);
    const trigger = room.getByRole("button", { name: "Read the label" });
    // The room just left behind may still be folding out, which keeps changing
    // the height of everything above this one. Wait for the page to stop
    // resizing before deciding where this room sits.
    await expect
      .poll(async () => {
        const first = await page.evaluate(
          () => document.documentElement.scrollHeight,
        );
        await page.waitForTimeout(120);
        const second = await page.evaluate(
          () => document.documentElement.scrollHeight,
        );
        return first === second;
      })
      .toBe(true);
    // Park the trigger mid-screen, not merely on the viewport edge: from the
    // edge the first click scrolls to reach it comfortably, and that move is
    // the test's own, not a drift a visitor would see. Instant, and repeated
    // until it lands, because the page scrolls smoothly and a smooth scroll
    // still in flight swallows the next one.
    await expect(async () => {
      await page.evaluate((roomId) => {
        const box = document
          .querySelector(`#${roomId} .placard-toggle`)!
          .getBoundingClientRect();
        window.scrollBy({
          top: box.top - window.innerHeight / 2,
          behavior: "instant",
        });
      }, id);
      await expect(trigger).toBeInViewport({ timeout: 1000 });
    }).toPass();
    await pageAtRest(page);
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    const place = () =>
      page.evaluate((roomId) => {
        const box = document
          .querySelector(`#${roomId} .room-art`)!
          .getBoundingClientRect();
        const wall = document
          .querySelector(`#${roomId}`)!
          .getBoundingClientRect();
        return {
          onScreen: { x: box.left, y: box.top },
          inRoom: { x: box.left - wall.left, y: box.top - wall.top },
        };
      }, id);

    // The starting point has to be a resting position too, or a page still
    // settling under load hands the whole test a baseline nobody ever saw.
    let start = await place();
    await expect(async () => {
      const now = await place();
      await page.waitForTimeout(150);
      expect(await place()).toEqual(now);
      start = now;
    }).toPass();

    for (let cycle = 1; cycle <= 5; cycle += 1) {
      // Dispatched rather than clicked: a real click scrolls the button into a
      // comfortable position first, and that scroll is the test's, not the
      // product's. Dispatching leaves every scroll here the page's own doing.
      await trigger.dispatchEvent("click");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await trigger.dispatchEvent("click");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      // aria-expanded flips before the panel has finished folding out, so wait
      // for the dish to come to rest and only then ask where it came to rest.
      // Both in one retry, because a drift never settles anywhere but wrong.
      await expect(async () => {
        const now = await place();
        await page.waitForTimeout(150);
        expect(await place()).toEqual(now);
        const drift = {
          screenX: Math.abs(now.onScreen.x - start.onScreen.x),
          screenY: Math.abs(now.onScreen.y - start.onScreen.y),
          roomX: Math.abs(now.inRoom.x - start.inRoom.x),
          roomY: Math.abs(now.inRoom.y - start.inRoom.y),
        };
        expect(
          Math.max(...Object.values(drift)),
          `${id} drifted after ${cycle} open/close cycles: ${JSON.stringify(drift)}`,
        ).toBeLessThanOrEqual(1);
      }).toPass();
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
