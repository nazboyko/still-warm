import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Button } from "./Button.tsx";

test("renders a button with its label", () => {
  render(<Button>Enter the exhibition</Button>);
  expect(
    screen.getByRole("button", { name: "Enter the exhibition" }),
  ).toBeInTheDocument();
});

test("defaults to type button", () => {
  render(<Button>Read the label</Button>);
  expect(screen.getByRole("button")).toHaveAttribute("type", "button");
});

test("calls onClick when clicked", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Read the label</Button>);
  await user.click(screen.getByRole("button"));
  expect(onClick).toHaveBeenCalledOnce();
});

test("activates with Enter and Space", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Read the label</Button>);
  await user.tab();
  expect(screen.getByRole("button")).toHaveFocus();
  await user.keyboard("{Enter}");
  await user.keyboard(" ");
  expect(onClick).toHaveBeenCalledTimes(2);
});

test("does not fire when disabled", async () => {
  const user = userEvent.setup();
  const onClick = vi.fn();
  render(
    <Button onClick={onClick} disabled>
      Read the label
    </Button>,
  );
  await user.click(screen.getByRole("button"));
  expect(onClick).not.toHaveBeenCalled();
});
