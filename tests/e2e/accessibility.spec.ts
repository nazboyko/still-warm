import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "./fixtures";

type AxeResults = Awaited<ReturnType<AxeBuilder["analyze"]>>;

const reportable = (results: AxeResults["violations"]) =>
  results.map((result) => ({
    id: result.id,
    impact: result.impact,
    help: result.help,
    targets: result.nodes.map((node) => node.target.join(" ")),
  }));

test("homepage has no axe violations", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(reportable(results.violations)).toEqual([]);
});

// Incompletes are checks axe could not decide; resolve each by hand instead of ignoring them.
test("homepage has no unresolved axe incompletes", async ({ page }) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(reportable(results.incomplete)).toEqual([]);
});

// The reserved label used to fade its lines in, which made the scan above a
// race: on a slower engine axe caught a line mid-fade and reported it as a
// contrast failure. A line a visitor cannot read yet is a real defect, so the
// settle moves text rather than fading it.
test("the label's settle moves its text instead of fading it", async ({
  page,
}) => {
  await page.goto("/");
  const fadingFrames = await page.evaluate(() => {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRule[];
      try {
        rules = Array.from(sheet.cssRules);
      } catch {
        continue;
      }
      for (const rule of rules) {
        if (
          rule instanceof CSSKeyframesRule &&
          rule.name === "placard-settle"
        ) {
          return Array.from(rule.cssRules)
            .map((frame) => (frame as CSSKeyframeRule).style.opacity)
            .filter(Boolean);
        }
      }
    }
    return null;
  });
  expect(fadingFrames).toEqual([]);
});

test("the donation desk stays clean in all three states", async ({ page }) => {
  await page.goto("/");
  const scan = async () => {
    // The placard settles its lines as fields fill; axe cannot judge contrast
    // on a line that is still fading, so let every TIME-DRIVEN finite animation
    // finish. Two kinds never end and neither is a line mid-fade: steam loops
    // forever by design, and a room's scroll-driven light is held at whatever
    // the scroll position says - park the page inside a room's range and that
    // animation stays "running" for as long as the page sits there. Waiting on
    // either one only ever times out.
    await expect
      .poll(() =>
        page.evaluate(() =>
          document.getAnimations().every((animation) => {
            if (animation.playState !== "running") return true;
            if (animation.timeline !== document.timeline) return true;
            const timing = animation.effect?.getTiming();
            return timing?.iterations === Infinity;
          }),
        ),
      )
      .toBe(true);
    const results = await new AxeBuilder({ page }).analyze();
    expect(reportable(results.violations)).toEqual([]);
    expect(reportable(results.incomplete)).toEqual([]);
  };

  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  // The click scrolls, the header compacts, and its subtitle fades: scan the
  // settled page, not a frame where that line is halfway to transparent.
  await expect
    .poll(() =>
      page
        .locator(".lockup-sub")
        .evaluate((element) => getComputedStyle(element).opacity),
    )
    .toMatch(/^(0|1)$/);
  await scan();

  await page
    .getByRole("textbox", { name: "What dish feels like home?" })
    .fill("Kasha");
  await page
    .getByRole("textbox", { name: "What feeling does it hold?" })
    .fill("Monday");
  await page
    .getByRole("textbox", { name: "What do you remember?" })
    .fill("A quiet bowl.");
  await scan();

  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-revealed",
    "true",
  );
  // Scan the settled exhibit, not the middle of the uncover: mid-lift the
  // cover overlaps the frame and axe cannot resolve what is behind it.
  await expect
    .poll(() =>
      page
        .locator(".scene-cloche")
        .evaluate((element) => getComputedStyle(element).opacity),
    )
    .toBe("0");
  await scan();
});

// The scan above waits for animations to settle. Parked inside a room's range
// the scroll-driven light never settles, so a wait that does not know the
// difference hangs until it times out - which is how a placard height change
// turned this into a CI-only WebKit failure.
test("a room caught mid-light is still scannable", async ({ page }) => {
  await page.goto("/");
  // Firefox takes the static per-room fallback, so it has no mid-light to
  // catch. A feature check, not a browser name: WebKit drives these too.
  const scrollDriven = await page.evaluate(() =>
    CSS.supports("animation-timeline", "view()"),
  );
  test.skip(!scrollDriven, "scroll-driven timeline engines only");
  await page.evaluate(() => {
    const room = document.getElementById("cat-003")!;
    const top = room.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({
      top: top - window.innerHeight + 80,
      behavior: "instant",
    });
  });
  await expect
    .poll(() =>
      page.evaluate(() =>
        document
          .getAnimations()
          .some(
            (animation) =>
              animation.playState === "running" &&
              animation.timeline !== document.timeline,
          ),
      ),
    )
    .toBe(true);
  const results = await new AxeBuilder({ page }).analyze();
  expect(reportable(results.violations)).toEqual([]);
  expect(reportable(results.incomplete)).toEqual([]);
});

test("each expanded room stays clean", async ({ page }) => {
  await page.goto("/");
  const triggers = page.getByRole("button", { name: "Read the label" });
  const count = await triggers.count();
  for (let index = 0; index < count; index += 1) {
    await triggers.nth(index).click();
    await expect(triggers.nth(index)).toHaveAttribute("aria-expanded", "true");
    const regionId = await triggers.nth(index).getAttribute("aria-controls");
    // Let the fold settle: axe measures contrast mid-fade otherwise.
    await expect(page.locator(`#${regionId}`)).toHaveCSS("opacity", "1");
    const results = await new AxeBuilder({ page }).analyze();
    expect(reportable(results.violations)).toEqual([]);
    expect(reportable(results.incomplete)).toEqual([]);
  }
});
