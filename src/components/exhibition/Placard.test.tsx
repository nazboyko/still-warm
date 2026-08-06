import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { exhibits } from "../../content/exhibits.ts";
import { Placard } from "./Placard.tsx";

const room001 = exhibits[0]!;
const room002 = exhibits[1]!;
const noop = vi.fn();

test("heading names the dish", () => {
  render(
    <Placard exhibit={room002} isOpen={false} onToggle={noop} onWalk={noop} />,
  );
  expect(
    screen.getByRole("heading", { level: 3, name: /grilled cheese/i }),
  ).toBeInTheDocument();
});

test("story stays out of the tree until opened", () => {
  render(
    <Placard exhibit={room002} isOpen={false} onToggle={noop} onWalk={noop} />,
  );
  const trigger = screen.getByRole("button", { name: "Read the label" });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  expect(screen.queryByText(room002.story)).not.toBeInTheDocument();
});

test("open placard wires the region to the trigger", () => {
  render(
    <Placard exhibit={room002} isOpen={true} onToggle={noop} onWalk={noop} />,
  );
  const trigger = screen.getByRole("button", { name: "Read the label" });
  expect(trigger).toHaveAttribute("aria-expanded", "true");
  const regionId = trigger.getAttribute("aria-controls");
  expect(regionId).toBe(`${room002.id}-story`);
  const region = document.getElementById(regionId!);
  expect(region).toHaveTextContent(room002.story);
  expect(region).toHaveTextContent(room002.sensory);
});

test("catalog fields use description semantics", () => {
  const { container } = render(
    <Placard exhibit={room002} isOpen={false} onToggle={noop} onWalk={noop} />,
  );
  const terms = [...container.querySelectorAll("dl dt")].map(
    (term) => term.textContent,
  );
  expect(terms).toEqual(["Medium", "Provenance"]);
});

test("room 001 marks ukrainian text with lang", () => {
  const { container } = render(
    <Placard exhibit={room001} isOpen={true} onToggle={noop} onWalk={noop} />,
  );
  const ukrainian = container.querySelectorAll('[lang="uk"]');
  expect(ukrainian).toHaveLength(2);
  expect(ukrainian[0]).toHaveTextContent("вареники");
});

test("escape closes and returns focus to the trigger", () => {
  const onToggle = vi.fn();
  const { container } = render(
    <Placard
      exhibit={room002}
      isOpen={true}
      onToggle={onToggle}
      onWalk={noop}
    />,
  );
  const region = container.querySelector(".placard-story-region")!;
  fireEvent.keyDown(region, { key: "Escape" });
  expect(onToggle).toHaveBeenCalledOnce();
  expect(screen.getByRole("button", { name: "Read the label" })).toHaveFocus();
});

test("escape with focus in another control is not a close", () => {
  const onToggle = vi.fn();
  render(
    <>
      <Placard
        exhibit={room002}
        isOpen={true}
        onToggle={onToggle}
        onWalk={noop}
      />
      <button type="button">Elsewhere</button>
    </>,
  );
  const elsewhere = screen.getByRole("button", { name: "Elsewhere" });
  elsewhere.focus();
  fireEvent.keyDown(elsewhere, { key: "Escape" });
  expect(onToggle).not.toHaveBeenCalled();
  expect(elsewhere).toHaveFocus();
});

test("fold mark is hidden from assistive tech", () => {
  const { container } = render(
    <Placard exhibit={room002} isOpen={false} onToggle={noop} onWalk={noop} />,
  );
  const mark = container.querySelector(".placard-fold-mark");
  expect(mark).toHaveAttribute("aria-hidden", "true");
});
