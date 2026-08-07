import { render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Hero } from "./Hero.tsx";

const noop = vi.fn();

test("renders the lockup as the page h1", () => {
  render(<Hero onGuideChoose={noop} />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Still Warm" }),
  ).toBeInTheDocument();
});

test("eyebrow is plain text, not a heading", () => {
  render(<Hero onGuideChoose={noop} />);
  expect(screen.getByText("The Museum of Comfort")).toBeInTheDocument();
  expect(
    screen.queryByRole("heading", { name: "The Museum of Comfort" }),
  ).toBeNull();
});

test("cta is a link into the exhibition", () => {
  render(<Hero onGuideChoose={noop} />);
  expect(
    screen.getByRole("link", { name: "Enter the exhibition" }),
  ).toHaveAttribute("href", "#exhibition");
});

test("display case is labeled imagery with its catalog line", () => {
  render(<Hero onGuideChoose={noop} />);
  expect(
    screen.getByRole("img", {
      name: "A dish in silhouette inside a lit museum display case",
    }),
  ).toBeInTheDocument();
  expect(screen.getByText("CAT. 001 - HOMESICKNESS")).toBeInTheDocument();
});
