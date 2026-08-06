import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { exhibits } from "../../content/exhibits.ts";
import { Room } from "./Room.tsx";

const room003 = exhibits[2]!;
const noop = vi.fn();

test("room is an article named by its dish", () => {
  render(
    <Room exhibit={room003} flip={false} isOpen={false} onToggle={noop} />,
  );
  const article = screen.getByRole("article");
  expect(article).toHaveAccessibleName(room003.dish);
  expect(article).toHaveAttribute("id", room003.id);
});

test("curator note hangs beside the placard", () => {
  render(
    <Room exhibit={room003} flip={false} isOpen={false} onToggle={noop} />,
  );
  expect(screen.getByText(room003.curatorNote)).toBeInTheDocument();
});

test("artwork is decorative", () => {
  const { container } = render(
    <Room exhibit={room003} flip={false} isOpen={false} onToggle={noop} />,
  );
  expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
});

test("the trigger reports up", () => {
  const onToggle = vi.fn();
  render(
    <Room exhibit={room003} flip={false} isOpen={false} onToggle={onToggle} />,
  );
  fireEvent.click(screen.getByRole("button", { name: "Read the label" }));
  expect(onToggle).toHaveBeenCalledOnce();
});
