import { expect, test } from "./fixtures";

/* Stable states only, never mid-animation: the entrance is skipped and motion
   is off. Baselines are the CI renderer's, so they only mean anything there. */
test.skip(
  process.platform !== "linux",
  "Baselines are generated on Linux to match CI.",
);
test.use({ contextOptions: { reducedMotion: "reduce" } });

const rooms = ["cat-001", "cat-002", "cat-003", "cat-004"] as const;

test("the hero case holds its look", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".display-case")).toHaveScreenshot("hero-case.png");
});

for (const id of rooms) {
  test(`room ${id} holds its look`, async ({ page }) => {
    await page.goto("/");
    const art = page.locator(`#${id} .room-art`);
    await art.scrollIntoViewIfNeeded();
    await expect(art).toHaveScreenshot(`${id}-art.png`);
  });
}

test("the reserved frame holds its look", async ({ page }) => {
  await page.goto("/");
  const frame = page.locator(".reserved-frame");
  await frame.scrollIntoViewIfNeeded();
  await expect(frame).toHaveScreenshot("reserved-frame.png");
});

test("a donated frame holds its look", async ({ page }) => {
  await page.goto("/");
  await page
    .getByRole("textbox", { name: "What dish feels like home?" })
    .fill("Borscht");
  await page
    .getByRole("textbox", { name: "What feeling does it hold?" })
    .fill("Quiet evenings");
  await page
    .getByRole("textbox", { name: "What do you remember?" })
    .fill("The pot my grandmother never washed the same day.");
  await page
    .getByRole("textbox", { name: "Who is donating it? (optional)" })
    .fill("Marta");
  await page.getByRole("button", { name: "Donate the exhibit" }).click();

  const frame = page.locator(".reserved-frame");
  await expect(frame).toHaveScreenshot("donated-frame.png");
});
