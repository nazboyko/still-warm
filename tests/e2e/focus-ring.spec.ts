import { expect, test } from "@playwright/test";

test("keyboard focus shows the tungsten ring on the dark ground", async ({
  page,
  browserName,
}) => {
  await page.goto("/");
  // WebKit tabs past links unless the Option modifier is held.
  await page.keyboard.press(browserName === "webkit" ? "Alt+Tab" : "Tab");
  const skipLink = page.getByRole("link", { name: "Skip to content" });
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveCSS("outline-color", "rgb(232, 169, 78)");
});

test("focus ring token flips to beet inside a plaster surface", async ({
  page,
}) => {
  await page.goto("/");
  const rings = await page.evaluate(() => {
    const probe = (surface?: string) => {
      const wrap = document.createElement("div");
      if (surface) wrap.dataset.surface = surface;
      const button = document.createElement("button");
      wrap.append(button);
      document.body.append(wrap);
      const ring = getComputedStyle(button).getPropertyValue("--focus-ring");
      wrap.remove();
      return ring.trim();
    };
    return { ink: probe(), plaster: probe("plaster") };
  });
  expect(rings.ink).toMatch(/#e8a94e|rgb\(232, 169, 78\)/i);
  expect(rings.plaster).toMatch(/#7a2e35|rgb\(122, 46, 53\)/i);
});
