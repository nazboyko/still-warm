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

test("every row is marked, and the marks say nothing out loud", () => {
  const { container } = render(<PlanYourVisit />);
  const marks = [...container.querySelectorAll(".visit-mark")];
  expect(marks).toHaveLength(4);
  for (const mark of marks) {
    expect(mark).toHaveAttribute("aria-hidden", "true");
    expect(mark.textContent).toBe("");
  }
});

test("the ticket's marks stay in the ticket", () => {
  const { container } = render(<PlanYourVisit />);
  // The rest of the site speaks in mono labels and brass rules. If these ever
  // appear outside the ticket, the vocabulary has leaked.
  for (const mark of container.querySelectorAll(".visit-mark")) {
    expect(mark.closest(".visit-ticket")).not.toBeNull();
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
