import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Exhibition } from "./Exhibition.tsx";

const triggers = () =>
  screen.getAllByRole("button", { name: "Read the label" });

test("one room is lit at a time", () => {
  render(<Exhibition />);
  fireEvent.click(triggers()[0]!);
  expect(triggers()[0]).toHaveAttribute("aria-expanded", "true");

  fireEvent.click(triggers()[1]!);
  expect(triggers()[0]).toHaveAttribute("aria-expanded", "false");
  expect(triggers()[1]).toHaveAttribute("aria-expanded", "true");
});

test("the open room closes from its own trigger", () => {
  render(<Exhibition />);
  fireEvent.click(triggers()[2]!);
  fireEvent.click(triggers()[2]!);
  expect(triggers()[2]).toHaveAttribute("aria-expanded", "false");
});

test("the walk opens the next room and moves focus", () => {
  render(<Exhibition />);
  fireEvent.click(triggers()[0]!);
  fireEvent.click(screen.getByRole("button", { name: /Next: CAT\. 002/ }));
  expect(triggers()[0]).toHaveAttribute("aria-expanded", "false");
  expect(triggers()[1]).toHaveAttribute("aria-expanded", "true");
  expect(triggers()[1]).toHaveFocus();
});

test("the first room walks only forward, the last only back", () => {
  render(<Exhibition />);
  fireEvent.click(triggers()[0]!);
  expect(screen.queryByRole("button", { name: /Previous:/ })).toBeNull();
  fireEvent.click(triggers()[3]!);
  expect(screen.queryByRole("button", { name: /Next:/ })).toBeNull();
  expect(
    screen.getByRole("button", { name: /Previous: CAT\. 003/ }),
  ).toBeInTheDocument();
});
