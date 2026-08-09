import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { PlanYourVisit } from "./PlanYourVisit.tsx";

test("visit section lists the four museum facts", () => {
  const { container } = render(<PlanYourVisit />);
  const labels = [...container.querySelectorAll("dt")].map(
    (term) => term.textContent,
  );
  expect(labels).toEqual(["Admission", "Hours", "Location", "Access"]);
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
