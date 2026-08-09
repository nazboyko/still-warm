import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PlanYourVisit } from "./PlanYourVisit.tsx";

test("visit section lists the four museum facts", () => {
  const { container } = render(<PlanYourVisit />);
  // The field numbers are stationery, so read past them to the labels.
  const labels = [...container.querySelectorAll("dt")].map((term) =>
    [...term.childNodes]
      .filter(
        (node) =>
          !(node instanceof Element && node.hasAttribute("aria-hidden")),
      )
      .map((node) => node.textContent)
      .join(""),
  );
  expect(labels).toEqual(["Admission", "Hours", "Location", "Access"]);
});

test("the ticket numbers its fields without saying so out loud", () => {
  const { container } = render(<PlanYourVisit />);
  const numbers = [...container.querySelectorAll(".visit-field-no")];
  expect(numbers.map((node) => node.textContent)).toEqual([
    "01",
    "02",
    "03",
    "04",
  ]);
  for (const node of numbers) {
    expect(node).toHaveAttribute("aria-hidden", "true");
  }
});

test("the section says why it exists before it lists anything", () => {
  const { container } = render(<PlanYourVisit />);
  const note = container.querySelector(".visit-note");
  expect(note).toHaveTextContent("no admission desk");
  // The explanation comes before the plate, not after it.
  expect(
    note?.compareDocumentPosition(container.querySelector(".visit-ticket")!),
  ).toBe(Node.DOCUMENT_POSITION_FOLLOWING);
});

test("access points to the ramp", () => {
  render(<PlanYourVisit />);
  expect(
    screen.getByRole("link", { name: "See Exhibit 000." }),
  ).toHaveAttribute("href", "#exhibit-000");
});
