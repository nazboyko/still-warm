import { expect, test, vi } from "vitest";
import { staffEntrance } from "../content/staffEntrance.ts";
import { openStaffEntrance } from "./staffEntrance.ts";

test("the staff entrance opens once and never again", () => {
  const log = vi.fn();
  openStaffEntrance(log);
  openStaffEntrance(log);
  expect(log).toHaveBeenCalledOnce();
});

test("it carries the greeting, three true facts, and the repo", () => {
  const log = vi.fn();
  openStaffEntrance(log);
  const printed = log.mock.calls[0]?.[0] ?? "";
  expect(printed).toContain(staffEntrance.greeting);
  expect(staffEntrance.facts).toHaveLength(3);
  for (const fact of staffEntrance.facts) {
    expect(printed).toContain(fact);
  }
  expect(printed).toContain(staffEntrance.repo);
});
