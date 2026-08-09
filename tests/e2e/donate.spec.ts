import { expect, test } from "./fixtures";
import type { Page } from "@playwright/test";

const field = (page: Page, name: string) =>
  page.getByRole("textbox", { name, exact: true });

async function fillDesk(page: Page, donor = "") {
  await field(page, "What dish feels like home?").fill("Rice pudding");
  await field(page, "What feeling does it hold?").fill("Quiet evenings");
  await field(page, "What do you remember?").fill(
    "My grandmother stirred it with a wooden spoon and never once looked at a recipe.",
  );
  if (donor) {
    await field(page, "Who is donating it? (optional)").fill(donor);
  }
}

test("typing renders the placard before any submit", async ({ page }) => {
  await page.goto("/");
  await field(page, "What dish feels like home?").fill("Rice pudding");
  const reserved = page.locator(".reserved-placard");
  await expect(reserved).toContainText("Rice pudding");
  await expect(reserved).toContainText("CAT. 007 - RESERVED");
  await field(page, "What feeling does it hold?").fill("Quiet evenings");
  await expect(reserved).toContainText("CAT. 007 - QUIET EVENINGS");
});

test("the full donation loop, keyboard only", async ({ page }) => {
  await page.goto("/");
  await fillDesk(page, "Marta");
  await field(page, "Who is donating it? (optional)").press("Enter");

  const reserved = page.locator(".reserved-placard");
  await expect(reserved).toContainText(/CAT\. V-\d{4} - QUIET EVENINGS/);
  await expect(reserved).toContainText("Gift of Marta.");
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-revealed",
    "true",
  );
  await expect(page.getByText("Your exhibit is now on display.")).toBeVisible();

  const postcardButton = page.getByRole("button", {
    name: /Take CAT\. V-\d{4} home/,
  });
  await expect(postcardButton).toBeFocused();
  const downloadPromise = page.waitForEvent("download");
  await page.keyboard.press("Enter");
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/^still-warm-V-\d{4}\.png$/);
  // The card now carries the exhibit photograph: a real file, not an empty blob.
  const file = await download.path();
  const { size } = await import("node:fs").then((fs) => fs.statSync(file));
  expect(size).toBeGreaterThan(10000);
  await expect(
    page.getByText("Your postcard is ready - downloading."),
  ).toBeVisible();
});

test("empty submit announces errors and focuses the first field", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.getByRole("alert")).toHaveText(
    "This exhibit needs a name. This exhibit needs a feeling. Every exhibit needs its memory.",
  );
  await expect(field(page, "What dish feels like home?")).toBeFocused();
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-revealed",
    "false",
  );
});

test("reset returns the reserved frame", async ({ page }) => {
  await page.goto("/");
  await fillDesk(page);
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await page.getByRole("button", { name: "Reset the form" }).click();

  await expect(page.locator(".reserved-placard")).toContainText(
    "CAT. 007 - RESERVED",
  );
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-revealed",
    "false",
  );
  await expect(field(page, "What dish feels like home?")).toHaveValue("");
  await expect(field(page, "What dish feels like home?")).toBeFocused();
});

test("the default donor is a visitor", async ({ page }) => {
  await page.goto("/");
  await fillDesk(page);
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.locator(".reserved-placard")).toContainText(
    "Gift of a visitor.",
  );
});

test("maxed-out fields keep the page inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await field(page, "What dish feels like home?").fill("M".repeat(40));
  await field(page, "What feeling does it hold?").fill("Q".repeat(24));
  await field(page, "What do you remember?").fill("word ".repeat(28).trim());
  await field(page, "Who is donating it? (optional)").fill("W".repeat(40));
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-revealed",
    "true",
  );
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});

test("the footer mirrors the closing line once the visitor joins", async ({
  page,
}) => {
  await page.goto("/");
  const line = page.locator(".site-footer-line");
  await expect(line).toHaveText("The exhibits are still warm.");

  await field(page, "What dish feels like home?").fill("Kasha");
  await field(page, "What feeling does it hold?").fill("Monday");
  await field(page, "What do you remember?").fill("A quiet bowl.");
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(line).toHaveText("Yours is still warm.");

  await page.getByRole("button", { name: "Reset the form" }).click();
  await expect(line).toHaveText("The exhibits are still warm.");
});

test("the exhibit does not move when it is revealed", async ({ page }) => {
  // The climax has to happen where the visitor was already looking. If the
  // frame relocates at the same moment, the uncovering is invisible and the
  // object they were watching is not the object they are given.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  const frame = page.locator(".reserved-frame");
  const where = () =>
    page.evaluate(() => {
      const box = document
        .querySelector(".reserved-frame")!
        .getBoundingClientRect();
      const panel = document
        .querySelector(".donate-panel")!
        .getBoundingClientRect();
      return {
        x: Math.round(box.left - panel.left),
        y: Math.round(box.top - panel.top),
        w: Math.round(box.width),
        h: Math.round(box.height),
      };
    });
  await fillDesk(page);
  await expect(frame).toBeVisible();
  const before = await where();
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-revealed",
    "true",
  );
  await expect.poll(where).toEqual(before);
});
