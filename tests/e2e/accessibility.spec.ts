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
    // on a line that is still fading, so let every FINITE animation finish.
    // Steam loops forever by design - waiting for it to stop never ends, and
    // whether a room's steam is in view here depends on font metrics per OS.
    await expect
      .poll(() =>
        page.evaluate(() =>
          document.getAnimations().every((animation) => {
            if (animation.playState !== "running") return true;
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

  await page.getByRole("textbox", { name: "Dish", exact: true }).fill("Kasha");
  await page.getByRole("textbox", { name: "Feeling" }).fill("Monday");
  await page.getByRole("textbox", { name: "Memory" }).fill("A quiet bowl.");
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
