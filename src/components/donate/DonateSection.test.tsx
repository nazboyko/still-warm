import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { donateIntro, reservedExhibit } from "../../content/exhibits.ts";
import { DonateSection } from "./DonateSection.tsx";

function fillDesk() {
  fireEvent.change(screen.getByLabelText("Dish"), {
    target: { value: "Rice pudding" },
  });
  fireEvent.change(screen.getByLabelText("Feeling"), {
    target: { value: "Quiet evenings" },
  });
  fireEvent.change(screen.getByLabelText("Memory"), {
    target: { value: "Stirred with a wooden spoon, never a recipe in sight." },
  });
}

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
  expect(sketch).toHaveAttribute("data-inked", "false");
});

test("typing renders the visitor's placard live", () => {
  render(<DonateSection />);
  fireEvent.change(screen.getByLabelText("Dish"), {
    target: { value: "Rice pudding" },
  });
  const placard = screen.getByRole("article");
  expect(placard).toHaveTextContent("Rice pudding");
  expect(placard).toHaveAccessibleName("CAT. 007 - RESERVED");

  fireEvent.change(screen.getByLabelText("Feeling"), {
    target: { value: "Quiet evenings" },
  });
  expect(placard).toHaveAccessibleName("CAT. 007 - QUIET EVENINGS");
  expect(screen.queryByText(reservedExhibit.placard)).not.toBeInTheDocument();
});

test("donation inks the frame and announces the exhibit", () => {
  const { container } = render(<DonateSection />);
  fillDesk();
  fireEvent.submit(screen.getByRole("form"));

  const placard = screen.getByRole("article");
  expect(placard).toHaveAccessibleName(/CAT\. VISITOR-\d{3} - QUIET EVENINGS/);
  expect(placard).toHaveTextContent("Donated by a visitor.");
  expect(container.querySelector(".reserved-frame svg")).toHaveAttribute(
    "data-inked",
    "true",
  );
  expect(screen.getByText("Your exhibit is now on display.")).toHaveAttribute(
    "role",
    "status",
  );
  expect(
    screen.getByRole("button", { name: "Take a postcard from the gift shop" }),
  ).toHaveFocus();
});

test("reset returns the frame to the reserved state", () => {
  render(<DonateSection />);
  fillDesk();
  fireEvent.submit(screen.getByRole("form"));
  fireEvent.click(screen.getByRole("button", { name: "Reset the form" }));

  expect(screen.getByRole("article")).toHaveAccessibleName(
    "CAT. 007 - RESERVED",
  );
  expect(screen.getByText(reservedExhibit.placard)).toBeInTheDocument();
  expect(screen.getByLabelText("Dish")).toHaveValue("");
  expect(screen.getByRole("status")).toBeEmptyDOMElement();
  expect(screen.getByLabelText("Dish")).toHaveFocus();
});
