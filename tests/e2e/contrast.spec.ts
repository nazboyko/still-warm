import { expect, test } from "./fixtures";
import type { Locator, Page } from "@playwright/test";

/* Contrast measured from the pixels the browser actually painted.
   axe reads an element's declared background, so anything drawn on top of the
   surface - a shadow, a glow, a cone of light - is invisible to it. A foot
   shadow on the placard once took "Read the label" to 3.9:1 with axe and
   Lighthouse both reporting green, which is exactly the gap this spec closes.

   The method: photograph the page, photograph it again with every glyph
   transparent, and read the background out of the second frame. */

async function paintedContrast(page: Page, target: Locator) {
  await target.scrollIntoViewIfNeeded();
  // The room lights on scroll, so measure only once it has settled.
  await page.waitForTimeout(500);

  const run = await target.evaluate((element) => {
    const text = [...element.childNodes].find(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
    );
    const range = document.createRange();
    range.selectNodeContents(text ?? element);
    const rect = range.getBoundingClientRect();
    const style = getComputedStyle(element as Element);
    return {
      x: rect.x,
      y: rect.y,
      width: rect.width,
      height: rect.height,
      color: style.color,
      fontSize: parseFloat(style.fontSize),
      fontWeight: Number(style.fontWeight),
    };
  });

  const hidden = await page.addStyleTag({
    content: `*, *::before, *::after {
      color: transparent !important;
      -webkit-text-fill-color: transparent !important;
      text-shadow: none !important;
    }`,
  });
  const frame = (await page.screenshot()).toString("base64");
  await hidden.evaluate((node: Element) => node.remove());

  return page.evaluate(
    async ([shot, run]) => {
      const image = new Image();
      image.src = `data:image/png;base64,${shot}`;
      await image.decode();
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true })!;
      context.drawImage(image, 0, 0);

      const scale = image.naturalWidth / window.innerWidth;
      const pixels = context.getImageData(
        Math.round(run.x * scale),
        Math.round(run.y * scale),
        Math.max(1, Math.round(run.width * scale)),
        Math.max(1, Math.round(run.height * scale)),
      ).data;

      const channel = (value: number) => {
        const part = value / 255;
        return part <= 0.04045
          ? part / 12.92
          : Math.pow((part + 0.055) / 1.055, 2.4);
      };
      const luminance = (red: number, green: number, blue: number) =>
        0.2126 * channel(red) +
        0.7152 * channel(green) +
        0.0722 * channel(blue);

      const parts = (run.color.match(/[\d.]+/g) ?? []).map(Number);
      const ink = luminance(parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0);
      let worst = Infinity;
      for (let i = 0; i < pixels.length; i += 4) {
        const behind = luminance(
          pixels[i] ?? 0,
          pixels[i + 1] ?? 0,
          pixels[i + 2] ?? 0,
        );
        const ratio =
          (Math.max(ink, behind) + 0.05) / (Math.min(ink, behind) + 0.05);
        worst = Math.min(worst, ratio);
      }

      const large =
        run.fontSize >= 24 || (run.fontSize >= 18.66 && run.fontWeight >= 700);
      return { ratio: worst, required: large ? 3 : 4.5 };
    },
    [frame, run] as const,
  );
}

test("every label trigger clears AA against the pixels behind it", async ({
  page,
}) => {
  await page.goto("/");
  const triggers = page.getByRole("button", { name: "Read the label" });
  const count = await triggers.count();
  expect(count).toBe(4);

  for (let index = 0; index < count; index++) {
    const { ratio, required } = await paintedContrast(
      page,
      triggers.nth(index),
    );
    expect(
      ratio,
      `label trigger ${index + 1} measured ${ratio.toFixed(2)}:1 in paint`,
    ).toBeGreaterThanOrEqual(required);
  }
});

test("the trigger still clears AA once its label is open", async ({ page }) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Read the label" }).first();
  await trigger.click();
  await expect(page.locator("#cat-001-story")).toBeVisible();

  const { ratio, required } = await paintedContrast(page, trigger);
  expect(
    ratio,
    `an open label's trigger measured ${ratio.toFixed(2)}:1 in paint`,
  ).toBeGreaterThanOrEqual(required);
});

test("the catalog line on a placard clears AA against the pixels behind it", async ({
  page,
}) => {
  await page.goto("/");
  const { ratio, required } = await paintedContrast(
    page,
    page.locator(".placard-cat").first(),
  );
  expect(
    ratio,
    `the catalog line measured ${ratio.toFixed(2)}:1 in paint`,
  ).toBeGreaterThanOrEqual(required);
});
