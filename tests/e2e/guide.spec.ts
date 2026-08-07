import { expect, test } from "./fixtures";

test("the guide walks a visitor into their room", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Celebrating" }).click();

  const trigger = page
    .getByRole("article", { name: "Empanadas" })
    .getByRole("button", { name: "Read the label" });
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(trigger).toBeFocused();
  await expect(page.getByText("Then you belong in Room 003.")).toBeAttached();
  const viewport = page.viewportSize()!;
  await expect(async () => {
    const box = await page.locator("#cat-003 .placard").boundingBox();
    expect(box!.y).toBeGreaterThanOrEqual(0);
    expect(box!.y).toBeLessThan(viewport.height * 0.6);
  }).toPass();
});

test("the guide route is instant under reduced motion", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Missing someone" }).click();

  const trigger = page
    .getByRole("article", { name: /Varenyky/ })
    .getByRole("button", { name: "Read the label" });
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  await expect(trigger).toBeFocused();
  const box = await page.locator("#cat-001 .placard").boundingBox();
  expect(box!.y).toBeGreaterThanOrEqual(0);
});
