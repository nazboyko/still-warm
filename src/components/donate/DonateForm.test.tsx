import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import type { ExhibitSubmission } from "../../content/donate.ts";
import { DonateForm } from "./DonateForm.tsx";

const empty: ExhibitSubmission = {
  dish: "",
  feeling: "",
  memory: "",
  donorName: "",
};

const complete: ExhibitSubmission = {
  dish: "Rice pudding",
  feeling: "Quiet evenings",
  memory: "Stirred with a wooden spoon, never a recipe in sight.",
  donorName: "Marta",
};

const noop = vi.fn();

test("every field has a wired label", () => {
  render(<DonateForm draft={empty} onChange={noop} onDonate={noop} />);
  for (const label of ["Dish", "Feeling", "Memory", "Donated by (optional)"]) {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  }
});

test("typing reports the field and value up", () => {
  const onChange = vi.fn();
  render(<DonateForm draft={empty} onChange={onChange} onDonate={noop} />);
  fireEvent.change(screen.getByLabelText("Dish"), {
    target: { value: "Rice pudding" },
  });
  expect(onChange).toHaveBeenCalledWith("dish", "Rice pudding");
});

test("empty submit announces errors and focuses the first invalid field", () => {
  const onDonate = vi.fn();
  render(<DonateForm draft={empty} onChange={noop} onDonate={onDonate} />);
  fireEvent.submit(screen.getByRole("form"));
  expect(onDonate).not.toHaveBeenCalled();
  expect(screen.getByRole("alert")).toHaveTextContent(
    "This exhibit needs a name. This exhibit needs a feeling. Every exhibit needs its memory.",
  );
  const dish = screen.getByLabelText("Dish");
  expect(dish).toHaveFocus();
  expect(dish).toHaveAttribute("aria-invalid", "true");
  expect(dish.getAttribute("aria-describedby")).toContain("donate-dish-error");
});

test("a complete submission donates without complaint", () => {
  const onDonate = vi.fn();
  render(<DonateForm draft={complete} onChange={noop} onDonate={onDonate} />);
  fireEvent.submit(screen.getByRole("form"));
  expect(onDonate).toHaveBeenCalledOnce();
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});

test("the feeling hint teaches the register", () => {
  render(<DonateForm draft={empty} onChange={noop} onDonate={noop} />);
  const feeling = screen.getByLabelText("Feeling");
  expect(feeling).toHaveAttribute("maxlength", "24");
  expect(feeling.getAttribute("aria-describedby")).toContain(
    "donate-feeling-hint",
  );
  expect(
    screen.getByText("In catalog voice: HOMESICKNESS, JOY, SUNDAY..."),
  ).toBeInTheDocument();
});
