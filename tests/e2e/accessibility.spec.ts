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
