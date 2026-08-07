import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { exhibits } from "../../content/exhibits.ts";
import { roomGuide } from "../../content/guide.ts";
import { RoomGuide } from "./RoomGuide.tsx";

test("every answer points at a real room", () => {
  const ids = exhibits.map((exhibit) => exhibit.id);
  expect(roomGuide.answers).toHaveLength(4);
  for (const answer of roomGuide.answers) {
    expect(ids).toContain(answer.target);
  }
});

test("the guide is a named group with four real buttons", () => {
  render(<RoomGuide onChoose={vi.fn()} />);
  expect(
    screen.getByRole("group", { name: "How does tonight feel?" }),
  ).toBeInTheDocument();
  expect(screen.getAllByRole("button")).toHaveLength(4);
});

test("choosing celebrates walks to room 003 and answers in voice", () => {
  const onChoose = vi.fn();
  render(<RoomGuide onChoose={onChoose} />);
  fireEvent.click(screen.getByRole("button", { name: "Celebrating" }));
  expect(onChoose).toHaveBeenCalledWith("cat-003");
  expect(screen.getByText("Then you belong in Room 003.")).toBeInTheDocument();
});

test("no response line before a choice", () => {
  render(<RoomGuide onChoose={vi.fn()} />);
  expect(screen.queryByText(/Then you belong/)).toBeNull();
});
