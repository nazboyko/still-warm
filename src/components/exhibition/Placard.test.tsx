import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { exhibits } from "../../content/exhibits.ts";
import { Placard } from "./Placard.tsx";

const room001 = exhibits[0]!;
const room002 = exhibits[1]!;

test("heading names the dish", () => {
  render(<Placard exhibit={room002} />);
  expect(
    screen.getByRole("heading", { level: 3, name: /grilled cheese/i }),
  ).toBeInTheDocument();
});

test("story is collapsed behind Read the label", () => {
  const { container } = render(<Placard exhibit={room002} />);
  const details = container.querySelector("details");
  expect(details).not.toHaveAttribute("open");
  expect(screen.getByText("Read the label")).toBeInTheDocument();
  expect(details).toHaveTextContent(room002.story);
});

test("catalog fields use description semantics", () => {
  const { container } = render(<Placard exhibit={room002} />);
  const terms = [...container.querySelectorAll("dl dt")].map(
    (term) => term.textContent,
  );
  expect(terms).toEqual(["Medium", "Provenance"]);
});

test("room 001 marks ukrainian text with lang", () => {
  const { container } = render(<Placard exhibit={room001} />);
  const ukrainian = container.querySelectorAll('[lang="uk"]');
  expect(ukrainian).toHaveLength(2);
  expect(ukrainian[0]).toHaveTextContent("вареники");
});

test("fold mark is hidden from assistive tech", () => {
  const { container } = render(<Placard exhibit={room002} />);
  const mark = container.querySelector(".placard-fold-mark");
  expect(mark).toHaveAttribute("aria-hidden", "true");
});
