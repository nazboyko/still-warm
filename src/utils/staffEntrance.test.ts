import { beforeEach, expect, test, vi } from "vitest";
import { staffEntrance } from "../content/staffEntrance.ts";

/* The once-guard lives in module scope, so each test gets a fresh module. */
const freshEntrance = async () => {
  vi.resetModules();
  const module = await import("./staffEntrance.ts");
  return module.openStaffEntrance;
};

beforeEach(() => {
  vi.resetModules();
});

test("the staff entrance opens once and never again", async () => {
  const openStaffEntrance = await freshEntrance();
  const log = vi.fn();
  openStaffEntrance(log);
  openStaffEntrance(log);
  expect(log).toHaveBeenCalledOnce();
});

test("it carries the greeting, three true facts, and the repo", async () => {
  const openStaffEntrance = await freshEntrance();
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
