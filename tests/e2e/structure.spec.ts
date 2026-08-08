import { expect, test } from "./fixtures";

test("page exposes the museum landmarks", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("banner")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Museum" })).toBeVisible();
  await expect(page.getByRole("main")).toBeVisible();
  await expect(page.getByRole("contentinfo")).toBeVisible();
});

test("header nav anchors resolve to real sections", async ({ page }) => {
  await page.goto("/");
  for (const id of ["exhibition", "donate", "visit"]) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
  }
});

test("the walk reads in catalog order", async ({ page }) => {
  await page.goto("/");
  const catalogLines = await page.locator(".placard-cat").allTextContents();
  expect(catalogLines.map((line) => line.slice(0, 8))).toEqual([
    "CAT. 000",
    "CAT. 001",
    "CAT. 002",
    "CAT. 003",
    "CAT. 004",
    "CAT. 007",
  ]);
});

test("every story opens by keyboard and reads in full", async ({ page }) => {
  await page.goto("/");
  const triggers = page.getByRole("button", { name: "Read the label" });
  await expect(triggers).toHaveCount(4);
  for (let index = 0; index < 4; index += 1) {
    const trigger = triggers.nth(index);
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    const regionId = await trigger.getAttribute("aria-controls");
    await expect(page.locator(`#${regionId}`)).toBeVisible();
  }
});

test("reserved exhibit is present before the donate form exists", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator(".reserved")).toContainText(
    "This space is held for a memory that has not arrived yet.",
  );
});

test("nothing outside a room waits for an arrival that never comes", async ({
  page,
}) => {
  await page.goto("/");
  // Exhibit 000 and the reserved frame wear the placard class but are not
  // rooms, so a room-scoped reveal must never leave them invisible.
  for (const selector of [".ramp-placard", ".reserved-placard"]) {
    await expect(page.locator(selector)).toBeVisible();
    await expect(page.locator(selector)).toHaveCSS("opacity", "1");
  }
});
