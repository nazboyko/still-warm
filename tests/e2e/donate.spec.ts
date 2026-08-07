import { expect, test } from "@playwright/test";
import type { Page } from "@playwright/test";

const field = (page: Page, name: string) =>
  page.getByRole("textbox", { name, exact: true });

async function fillDesk(page: Page, donor = "") {
  await field(page, "Dish").fill("Rice pudding");
  await field(page, "Feeling").fill("Quiet evenings");
  await field(page, "Memory").fill(
    "My grandmother stirred it with a wooden spoon and never once looked at a recipe.",
  );
  if (donor) {
    await field(page, "Donated by (optional)").fill(donor);
  }
}

test("typing renders the placard before any submit", async ({ page }) => {
  await page.goto("/");
  await field(page, "Dish").fill("Rice pudding");
  const reserved = page.locator(".reserved");
  await expect(reserved).toContainText("Rice pudding");
  await expect(reserved).toContainText("CAT. 007 - RESERVED");
  await field(page, "Feeling").fill("Quiet evenings");
  await expect(reserved).toContainText("CAT. 007 - QUIET EVENINGS");
});

test("the full donation loop, keyboard only", async ({ page }) => {
  await page.goto("/");
  await fillDesk(page, "Marta");
  await field(page, "Donated by (optional)").press("Enter");

  const reserved = page.locator(".reserved");
  await expect(reserved).toContainText(/CAT\. VISITOR-\d{3} - QUIET EVENINGS/);
  await expect(reserved).toContainText("Donated by Marta.");
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-inked",
    "true",
  );
  await expect(page.getByText("Your exhibit is now on display.")).toBeVisible();

  const postcardButton = page.getByRole("button", {
    name: "Take a postcard from the gift shop",
  });
  await expect(postcardButton).toBeFocused();
  const downloadPromise = page.waitForEvent("download");
  await page.keyboard.press("Enter");
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("still-warm-postcard.png");
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
  await expect(field(page, "Dish")).toBeFocused();
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-inked",
    "false",
  );
});

test("reset returns the reserved frame", async ({ page }) => {
  await page.goto("/");
  await fillDesk(page);
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await page.getByRole("button", { name: "Reset the form" }).click();

  await expect(page.locator(".reserved")).toContainText("CAT. 007 - RESERVED");
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-inked",
    "false",
  );
  await expect(field(page, "Dish")).toHaveValue("");
  await expect(field(page, "Dish")).toBeFocused();
});

test("the default donor is a visitor", async ({ page }) => {
  await page.goto("/");
  await fillDesk(page);
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.locator(".reserved")).toContainText(
    "Donated by a visitor.",
  );
});

test("maxed-out fields keep the page inside the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto("/");
  await field(page, "Dish").fill("M".repeat(40));
  await field(page, "Feeling").fill("Q".repeat(24));
  await field(page, "Memory").fill("word ".repeat(28).trim());
  await field(page, "Donated by (optional)").fill("W".repeat(40));
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.locator(".reserved-frame svg")).toHaveAttribute(
    "data-inked",
    "true",
  );
  const overflow = await page.evaluate(
    () =>
      document.documentElement.scrollWidth -
      document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
});
