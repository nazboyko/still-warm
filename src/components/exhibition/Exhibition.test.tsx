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
