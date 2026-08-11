import { expect, test } from "./fixtures";

/* Printing is an allow-list: the booklet is the exhibition, and anything the
   site adds later stays off the page until someone decides it belongs. */
async function openBooklet(page: import("@playwright/test").Page) {
  await page.emulateMedia({ media: "print" });
  await page.evaluate(() => window.dispatchEvent(new Event("beforeprint")));
}

test("printing opens every label and drops the gallery darkness", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("#cat-001-story")).toHaveCount(0);

  await openBooklet(page);

  for (const id of ["cat-001", "cat-002", "cat-003", "cat-004"]) {
    await expect(page.locator(`#${id}-story`)).toBeVisible();
  }
  const room = await page
    .locator("#cat-002")
    .evaluate((element) => getComputedStyle(element).backgroundColor);
  expect(room).toBe("rgb(255, 255, 255)");

  await page.evaluate(() => window.dispatchEvent(new Event("afterprint")));
  await expect(page.locator("#cat-001-story")).toHaveCount(0);
});

test("the catalogue is the exhibition, and the donation desk is not in it", async ({
  page,
}) => {
  // Asserted on the section itself rather than on the classes inside it: this
  // block has leaked into the booklet twice, both times through markup that no
  // hide list happened to name.
  await page.goto("/");
  await page
    .getByRole("textbox", { name: "What dish feels like home?" })
    .fill("Kasha");
  await page
    .getByRole("textbox", { name: "What feeling does it hold?" })
    .fill("Monday");
  await page
    .getByRole("textbox", { name: "What do you remember?" })
    .fill("A quiet bowl.");
  await page.getByRole("button", { name: "Donate the exhibit" }).click();

  const desk = page.locator("main > section#donate");
  await expect(desk).toBeVisible();

  await openBooklet(page);

  await expect(desk).toBeHidden();
  // Not one descendant of it survives, whatever the rebuild called them.
  const survivors = await desk.evaluate(
    (section) =>
      [...section.querySelectorAll("*")].filter((el) =>
        el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }),
      ).length,
  );
  expect(survivors).toBe(0);
  // Its own words, which is what a reader would actually notice on paper.
  // Counted rather than asserted one by one: each phrase appears in more than
  // one place, and none of those places may be visible.
  for (const words of ["The last frame", "Donate an Exhibit", "Kasha"]) {
    const onPaper = await page
      .getByText(words, { exact: false })
      .filter({ visible: true })
      .count();
    expect(onPaper, words).toBe(0);
  }
});

test("the booklet keeps the wordmark, the rooms and the practical page", async ({
  page,
}) => {
  await page.goto("/");
  await openBooklet(page);

  for (const kept of [
    ".lockup-name",
    "#exhibit-000",
    "#visit",
    ".visit-ticket",
  ]) {
    await expect(page.locator(kept).first()).toBeVisible();
  }
  for (const id of ["cat-001", "cat-002", "cat-003", "cat-004"]) {
    await expect(page.locator(`#${id}`)).toBeVisible();
  }
  // The landing page's own furniture is not catalogue content.
  for (const dropped of [
    "main > section.hero",
    ".site-header nav",
    ".skip-link",
    ".room-guide",
  ]) {
    await expect(page.locator(dropped).first()).toBeHidden();
  }
});

test("no control reaches paper", async ({ page }) => {
  await page.goto("/");
  await openBooklet(page);

  const controls = await page.evaluate(() =>
    [...document.querySelectorAll("button, input, textarea, select")]
      .filter((el) =>
        el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true }),
      )
      .map((el) => el.tagName.toLowerCase()),
  );
  expect(controls).toEqual([]);
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
  // Sticky only where it is cheap: on a phone the two-row header would hold a
  // fifth of the screen, so there it scrolls away with the page.
  const box = (await header.boundingBox())!;
  const width = page.viewportSize()!.width;
  if (width >= 640) {
    expect(box.y).toBe(0);
  } else {
    expect(box.y).toBeLessThan(0);
  }
});
