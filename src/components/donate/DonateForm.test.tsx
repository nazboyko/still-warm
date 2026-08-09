import { fireEvent, render, screen, within } from "@testing-library/react";
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
  for (const label of [
    "What dish feels like home?",
    "What feeling does it hold?",
    "What do you remember?",
    "Who is donating it? (optional)",
  ]) {
    expect(screen.getByLabelText(label)).toBeInTheDocument();
  }
});

test("typing reports the field and value up", () => {
  const onChange = vi.fn();
  render(<DonateForm draft={empty} onChange={onChange} onDonate={noop} />);
  fireEvent.change(screen.getByLabelText("What dish feels like home?"), {
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
  const dish = screen.getByLabelText("What dish feels like home?");
  expect(dish).toHaveFocus();
  expect(dish).toHaveAttribute("aria-invalid", "true");
  expect(dish.getAttribute("aria-describedby")).toContain("donate-dish-error");
});

test("a repeat failed submit announces the errors again", () => {
  render(<DonateForm draft={empty} onChange={noop} onDonate={noop} />);
  fireEvent.submit(screen.getByRole("form"));
  const firstAlert = screen.getByRole("alert");
  fireEvent.submit(screen.getByRole("form"));
  const secondAlert = screen.getByRole("alert");
  expect(secondAlert).not.toBe(firstAlert);
  expect(secondAlert).toHaveTextContent("This exhibit needs a name.");
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
  const feeling = screen.getByLabelText("What feeling does it hold?");
  expect(feeling).toHaveAttribute("maxlength", "24");
  expect(feeling.getAttribute("aria-describedby")).toContain(
    "donate-feeling-hint",
  );
  expect(screen.getByText("One word, in catalog voice.")).toBeInTheDocument();
  // The examples live in the placeholder now, so the hint can stay short.
  expect(feeling).toHaveAttribute(
    "placeholder",
    "e.g. Homesickness, Sunday, Joy...",
  );
});

test("the idea chips fill the dish field and nothing else", () => {
  const filled: [string, string][] = [];
  render(
    <DonateForm
      draft={empty}
      onChange={(field, value) => filled.push([field, value])}
      onDonate={noop}
    />,
  );
  const ideas = screen.getByRole("group", { name: "Need ideas?" });
  const chips = within(ideas).getAllByRole("button");
  expect(chips).toHaveLength(4);
  fireEvent.click(chips[1]!);
  expect(filled).toEqual([["dish", "Ramen"]]);
});
