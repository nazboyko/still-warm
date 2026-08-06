import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Footer } from "./Footer.tsx";

test("closes with the museum line", () => {
  render(<Footer />);
  expect(screen.getByRole("contentinfo")).toHaveTextContent(
    "The exhibits are still warm.",
  );
});

test("links the challenge, the source, and the ramp", () => {
  render(<Footer />);
  expect(
    screen.getByRole("link", { name: "DEV Frontend Challenge" }),
  ).toHaveAttribute("href", "https://dev.to/challenges");
  expect(
    screen.getByRole("link", { name: "Source on GitHub" }),
  ).toHaveAttribute("href", "https://github.com/nazboyko/still-warm");
  expect(screen.getByRole("link", { name: "Exhibit 000" })).toHaveAttribute(
    "href",
    "#exhibit-000",
  );
});
