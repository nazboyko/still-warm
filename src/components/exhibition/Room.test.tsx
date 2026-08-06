import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { exhibits } from "../../content/exhibits.ts";
import { Room } from "./Room.tsx";

const room003 = exhibits[2]!;

test("room is an article named by its dish", () => {
  render(<Room exhibit={room003} flip={false} />);
  const article = screen.getByRole("article");
  expect(article).toHaveAccessibleName(room003.dish);
  expect(article).toHaveAttribute("id", room003.id);
});

test("curator note hangs beside the placard", () => {
  render(<Room exhibit={room003} flip={false} />);
  expect(screen.getByText(room003.curatorNote)).toBeInTheDocument();
});

test("artwork is decorative", () => {
  const { container } = render(<Room exhibit={room003} flip={false} />);
  expect(container.querySelector("svg")).toHaveAttribute(
    "aria-hidden",
    "true",
  );
});
