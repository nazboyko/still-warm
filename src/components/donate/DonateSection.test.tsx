import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { donateIntro, reservedExhibit } from "../../content/exhibits.ts";
import { DonateSection } from "./DonateSection.tsx";

test("donate section is named and holds the intro", () => {
  render(<DonateSection />);
  expect(
    screen.getByRole("region", { name: "Donate an Exhibit" }),
  ).toBeInTheDocument();
  expect(screen.getByText(donateIntro)).toBeInTheDocument();
});

test("reserved exhibit shows the full placard, never a blank", () => {
  render(<DonateSection />);
  const reserved = screen.getByRole("article");
  expect(reserved).toHaveAccessibleName("CAT. 007 - RESERVED");
  expect(screen.getByText(reservedExhibit.placard)).toBeInTheDocument();
});

test("the sketch is decorative and dotted, not an image that failed", () => {
  const { container } = render(<DonateSection />);
  const sketch = container.querySelector(".reserved-frame svg");
  expect(sketch).toHaveAttribute("aria-hidden", "true");
});
