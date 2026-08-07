import { expect, test } from "./fixtures";

test("printing opens every label and drops the gallery darkness", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#cat-001-story")).toHaveCount(0);

  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));

  for (const id of ["cat-001", "cat-002", "cat-003", "cat-004"]) {
    await expect(page.locator(`#${id}-story`)).toHaveCount(1);
  }
  const room = await page
    .locator("#cat-002")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(room).toBe("rgb(255, 255, 255)");
  await expect(page.locator(".site-header")).toBeHidden();

  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await expect(page.locator("#cat-001-story")).toHaveCount(0);
});

test("the header compacts once the visitor leaves the top", async ({
  page,
}) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  await expect(header).not.toHaveAttribute("data-compact", "true");

  await page.evaluate(() => window.scrollTo(0, 400));
  await expect(header).toHaveAttribute("data-compact", "true");
  // Every control survives the compaction.
  for (const name of ["Exhibition", "Plan Your Visit", "Donate an Exhibit"]) {
    await expect(page.getByRole("link", { name, exact: true })).toBeVisible();
  }
  const box = (await header.boundingBox())!;
  expect(box.y).toBe(0);
});
