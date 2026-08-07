import { expect, test } from "./fixtures";

const grounds: Record<string, string> = {
  "cat-001": "rgb(24, 20, 23)",
  "cat-002": "rgb(19, 21, 25)",
  "cat-003": "rgb(32, 24, 16)",
  "cat-004": "rgb(51, 42, 29)",
};

test("every room is fully lit before its label reaches the thumb zone", async ({
  page,
}) => {
  await page.goto("/");
  for (const [id, ground] of Object.entries(grounds)) {
    await page.evaluate(
      ({ roomId }) => {
        const trigger = document.querySelector(`#${roomId} .placard-toggle`)!;
        const target =
          trigger.getBoundingClientRect().top +
          window.scrollY -
          window.innerHeight * 0.55;
        window.scrollTo(0, target);
      },
      { roomId: id },
    );
    await expect
      .poll(() =>
        page
          .locator(`#${id}`)
          .evaluate((room) => getComputedStyle(room).backgroundColor),
      )
      .toBe(ground);
  }
});

test("a room at the threshold is still dim where light moves on scroll", async ({
  page,
  browserName,
}) => {
  test.skip(browserName !== "chromium", "scroll-driven timeline engines only");
  await page.goto("/");
  await page.evaluate(() => {
    const room = document.getElementById("cat-003")!;
    const top = room.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight + 60);
  });
  await expect
    .poll(() =>
      page
        .locator("#cat-003")
        .evaluate((room) => getComputedStyle(room).backgroundColor),
    )
    .not.toBe(grounds["cat-003"]);
});
