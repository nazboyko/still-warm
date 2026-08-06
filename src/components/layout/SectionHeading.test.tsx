import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { SectionHeading } from "./SectionHeading.tsx";

test("renders the title as an h2", () => {
  render(<SectionHeading title="Current exhibition" />);
  expect(
    screen.getByRole("heading", { level: 2, name: "Current exhibition" }),
  ).toBeInTheDocument();
});

test("renders the eyebrow as plain text, not a heading", () => {
  render(<SectionHeading eyebrow="CAT. 001" title="Homesickness" />);
  expect(screen.getByText("CAT. 001")).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /CAT. 001/ })).toBeNull();
});
