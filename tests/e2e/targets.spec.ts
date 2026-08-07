import { expect, test } from "./fixtures";

/* The house bar is 44x44 for anything a thumb aims at. Inline links inside a
   sentence are exempt (WCAG 2.5.8) - their size is set by the prose. */
const inline = [
  "See Exhibit 000.",
  "DEV Frontend Challenge",
  "Source on GitHub",
  "Exhibit 000",
];

test("every aimed-at control meets the house target size", async ({ page }) => {
  await page.goto("/");
  const controls = page.locator(
    "header a, nav a, button, .room-guide-answers button",
  );
  const count = await controls.count();
  expect(count).toBeGreaterThan(8);

  const small: string[] = [];
  for (let index = 0; index < count; index += 1) {
    const control = controls.nth(index);
    const label = ((await control.textContent()) ?? "").trim();
    if (inline.includes(label)) continue;
    const box = await control.boundingBox();
    if (!box) continue;
    // Firefox lays this out at 43.9997px; a real miss (the 42px header link
    // this test was written for) is nowhere near half a pixel.
    if (box.height < 43.5)
      small.push(`${label || "(unnamed)"} ${box.height}px`);
  }
  expect(small).toEqual([]);
});
