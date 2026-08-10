import { expect, test } from "./fixtures";
import type { Page } from "@playwright/test";

/* The four measurements the consistency pass fixed. Each one drifted silently
   before: nothing threw, the page just stopped lining up. */

const boxes = (page: Page, selector: string) =>
  page.evaluate(
    (sel) =>
      Array.from(document.querySelectorAll(sel)).map((el) => {
        const r = el.getBoundingClientRect();
        return { width: r.width, right: r.right, bottom: r.bottom };
      }),
    selector,
  );

test("every room's label is the same width", async ({ page }) => {
  // Below the two-column stage the cards used to size to their own longest
  // line, so each room's label was a different width.
  for (const width of [768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const widths = await boxes(page, ".room .placard");
    expect(widths).toHaveLength(4);
    const first = widths[0]!.width;
    for (const card of widths) expect(card.width).toBeCloseTo(first, 1);
  }
});

test("a curator note never runs past its own card", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const overhang = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".room")).map((room) => {
      const card = room.querySelector(".placard")!.getBoundingClientRect();
      const note = room.querySelector(".curator-note")!.getBoundingClientRect();
      return note.right - card.right;
    }),
  );
  for (const past of overhang) expect(past).toBeLessThanOrEqual(0.5);
});

test("the header keeps its height when it compacts", async ({ page }) => {
  // A sticky bar is still in flow: one that shrinks on scroll moves the whole
  // page up under the reader, and only Chromium hides that behind anchoring.
  for (const width of [390, 1280]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const header = page.locator(".site-header");
    const read = () =>
      page.evaluate(() => {
        const bar = document.querySelector(".site-header")!;
        const main = document.querySelector("#main")!;
        return {
          header: bar.getBoundingClientRect().height,
          mainTop: main.getBoundingClientRect().top + window.scrollY,
        };
      });

    const atTop = await read();
    await page.evaluate(() =>
      window.scrollBy({ top: 300, behavior: "instant" }),
    );
    await expect(header).toHaveAttribute("data-compact", "true");
    const scrolled = await read();

    expect(scrolled.header).toBeCloseTo(atTop.header, 1);
    expect(scrolled.mainTop).toBeCloseTo(atTop.mainTop, 1);
  }
});

test("the header's own line never animates the layout", async ({ page }) => {
  // The subtitle used to grow its height over 200ms. The bar is a fixed height
  // now, but a layout property mid-flight is the shape of every drift bug this
  // project has shipped, so only opacity is allowed to move.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const animated = await page
    .locator(".lockup-sub")
    .evaluate((el) => getComputedStyle(el).transitionProperty);
  expect(animated).toBe("opacity");
});

test("the ideas belong to the field they fill", async ({ page }) => {
  // Spaced like another field, the ideas read as a control of their own rather
  // than as a way into the dish field above them.
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  const gaps = await page.evaluate(() => {
    const between = (a: string, b: string) =>
      document.querySelector(b)!.getBoundingClientRect().top -
      document.querySelector(a)!.getBoundingClientRect().bottom;
    return {
      toIdeas: between(".desk-group .desk-field", ".desk-ideas"),
      betweenFields: between(".desk-ideas", ".desk-group + .desk-field"),
    };
  });
  expect(gaps.toIdeas).toBeLessThan(gaps.betweenFields);
});

test("a ticket label sits on the first line of its value", async ({ page }) => {
  // The label used to centre against the whole value, so a value that wrapped
  // pushed its own label as much as 54px away from the line it names.
  for (const width of [320, 390]) {
    await page.setViewportSize({ width, height: 844 });
    await page.goto("/");
    const drift = await page.evaluate(() => {
      const middleOfFirstLine = (el: Element) => {
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        let node = walker.nextNode();
        while (node && !node.textContent?.trim()) node = walker.nextNode();
        if (!node) return null;
        const range = document.createRange();
        range.selectNode(node);
        const line = range.getClientRects()[0];
        return line ? line.top + line.height / 2 : null;
      };
      return Array.from(document.querySelectorAll(".visit-facts > div")).map(
        (row) => {
          const label = middleOfFirstLine(row.querySelector("dt")!);
          const value = middleOfFirstLine(row.querySelector("dd")!);
          return label !== null && value !== null ? label - value : 999;
        },
      );
    });
    expect(drift).toHaveLength(4);
    for (const off of drift) expect(Math.abs(off)).toBeLessThanOrEqual(1);
  }
});

test("the donated frame fills the column beside it", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await page
    .getByRole("textbox", { name: "What dish feels like home?" })
    .fill("Buckwheat with butter");
  await page
    .getByRole("textbox", { name: "What feeling does it hold?" })
    .fill("Quiet mornings");
  await page
    .getByRole("textbox", { name: "What do you remember?" })
    .fill(
      "My grandmother made it in a heavy pot and the kitchen smelled of it all morning, and nobody hurried.",
    );
  // The preview reads the same draft the validator does, so once the memory is
  // on the label the state behind the submit is the state we just typed.
  await expect(page.locator(".reserved-placard")).toContainText("heavy pot");
  await page.getByRole("button", { name: "Donate the exhibit" }).click();
  await expect(page.locator(".reserved-frame")).toHaveAttribute(
    "data-donated",
    "true",
  );

  // Both edges in one measurement: read separately, a font swapping in between
  // the two reads compares a frame from one layout against a column from the
  // next, which is a 10px disagreement that no layout ever had.
  const gap = () =>
    page.evaluate(() => {
      const frame = document.querySelector(".reserved-frame")!;
      const column = document.querySelector(".donate-column")!;
      return (
        column.getBoundingClientRect().bottom -
        frame.getBoundingClientRect().bottom
      );
    });
  // The void this closed was 216px. One-directional on purpose: no empty
  // plaster under the exhibit, while a frame that has to stay taller than a
  // short label keeps its artwork's room. The slack is the grid's rounding.
  await expect.poll(gap).toBeLessThanOrEqual(1.5);
});
