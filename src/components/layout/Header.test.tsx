import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Header } from "./Header.tsx";

test("skip link is the first link and targets main", () => {
  render(<Header />);
  const [first] = screen.getAllByRole("link");
  expect(first).toHaveTextContent("Skip to content");
  expect(first).toHaveAttribute("href", "#main");
});

test("nav lists the three destinations", () => {
  render(<Header />);
  const nav = screen.getByRole("navigation", { name: "Museum" });
  const links = ["Exhibition", "Plan Your Visit", "Donate an Exhibit"];
  for (const name of links) {
    expect(screen.getByRole("link", { name })).toBeInTheDocument();
  }
  expect(nav).toBeInTheDocument();
});

test("lockup is a link, not a heading", () => {
  render(<Header />);
  expect(screen.queryByRole("heading")).toBeNull();
});
