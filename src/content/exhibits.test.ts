import { describe, expect, test } from "vitest";
import { exhibits, reservedExhibit } from "./exhibits.ts";

const sentenceCount = (text: string) =>
  (text.match(/[.?!](\s|$)/g) ?? []).length;

describe("exhibition content", () => {
  test("four rooms in catalog order", () => {
    expect(exhibits.map((exhibit) => exhibit.number)).toEqual([
      "001",
      "002",
      "003",
      "004",
    ]);
  });

  test("every story is 3 to 4 sentences", () => {
    for (const exhibit of exhibits) {
      const count = sentenceCount(exhibit.story);
      expect(count, exhibit.id).toBeGreaterThanOrEqual(3);
      expect(count, exhibit.id).toBeLessThanOrEqual(4);
    }
  });

  test("curator notes are distinct and present", () => {
    const notes = exhibits.map((exhibit) => exhibit.curatorNote);
    expect(notes.every((note) => note.length > 0)).toBe(true);
    expect(new Set(notes).size).toBe(notes.length);
  });

  test("room 001 carries the ukrainian thread", () => {
    const [room001] = exhibits;
    expect(room001?.dishNative).toEqual({ lang: "uk", text: "вареники" });
    expect(room001?.sensoryNative?.lang).toBe("uk");
  });

  test("reserved placard never reads as empty state", () => {
    expect(reservedExhibit.placard).toBe(
      "This space is held for a memory that has not arrived yet. Donations accepted below.",
    );
  });
});
