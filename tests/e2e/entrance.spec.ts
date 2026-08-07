import { expect, test } from "@playwright/test";

test("the lights come on and finish within budget", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect
    .poll(
      () =>
        page.evaluate(() =>
          document.documentElement.hasAttribute("data-entrance"),
        ),
      { timeout: 2000 },
    )
    .toBe(false);
  await expect(page.locator(".entrance-overlay")).toHaveCount(0);
  await expect(page.locator(".hero-title")).toHaveCSS("opacity", "1");
  const played = await page.evaluate(() =>
    sessionStorage.getItem("still-warm-entrance"),
  );
  expect(played).toBe("done");
});

test("a keypress skips to the lit state", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.keyboard.press("Escape");
  await expect(page.locator(".entrance-overlay")).toHaveCount(0);
  await expect(page.locator(".hero-title")).toHaveCSS("opacity", "1");
});

test("scroll skips to the lit state", async ({ page, isMobile }) => {
  test.skip(isMobile, "wheel input is a desktop gesture");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await page.mouse.wheel(0, 120);
  await expect(page.locator(".entrance-overlay")).toHaveCount(0);
});

test("the entrance plays once per session", async ({ page }) => {
  await page.goto("/");
  await expect
    .poll(() =>
      page.evaluate(() => sessionStorage.getItem("still-warm-entrance")),
    )
    .toBe("done");
  await page.reload({ waitUntil: "domcontentloaded" });
  await expect(page.locator(".entrance-overlay")).toHaveCount(0);
  expect(
    await page.evaluate(() =>
      document.documentElement.hasAttribute("data-entrance"),
    ),
  ).toBe(false);
});

test("the entrance shifts no layout", async ({ page, browserName }) => {
  test.skip(browserName !== "chromium", "layout-shift entries are chromium");
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const shift = await page.evaluate(
    () =>
      new Promise<number>((resolve) => {
        let total = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            total += (entry as unknown as { value: number }).value;
          }
        }).observe({ type: "layout-shift", buffered: true });
        setTimeout(() => resolve(total), 1800);
      }),
  );
  // Linux font rasterization leaves a sub-pixel residue (measured 0.00006 in
  // CI); the entrance is opacity-only. A real shift measures 0.01 or more.
  expect(shift).toBeLessThan(0.0005);
});

test("reduced motion opens the museum lit", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await expect(page.locator(".entrance-overlay")).toHaveCount(0);
  expect(
    await page.evaluate(() =>
      document.documentElement.hasAttribute("data-entrance"),
    ),
  ).toBe(false);
  await expect(page.locator(".hero-title")).toHaveCSS("opacity", "1");
});
