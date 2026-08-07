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

test("the donation desk stays clean in all three states", async ({ page }) => {
  await page.goto("/");
  const scan = async () => {
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
