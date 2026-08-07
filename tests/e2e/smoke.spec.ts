import { expect, test } from "./fixtures";

test("shows the museum heading", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { level: 1, name: "Still Warm" }),
  ).toBeVisible();
});
