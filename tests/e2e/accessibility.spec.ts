import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

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
