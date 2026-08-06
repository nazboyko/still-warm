import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { RampExhibit } from "./RampExhibit.tsx";

test("the ramp is exhibit 000 and linkable", () => {
  render(<RampExhibit />);
  const article = screen.getByRole("article");
  expect(article).toHaveAttribute("id", "exhibit-000");
  expect(article).toHaveAccessibleName("The Ramp");
  expect(screen.getByText(/CAT\. 000/)).toBeInTheDocument();
});

test("every claim on the placard is a verifiable one", () => {
  render(<RampExhibit />);
  const body = screen.getByText(/Every museum needs a ramp/);
  expect(body).toHaveTextContent("keyboard routes through every room");
  expect(body).toHaveTextContent("motion quiets on request");
  expect(body).toHaveTextContent("the contrast holds AA in every room");
  expect(body).toHaveTextContent("read aloud by a screen reader");
});
