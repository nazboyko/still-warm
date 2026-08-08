import { describe, expect, test } from "vitest";
import type { ExhibitSubmission } from "../../content/donate.ts";
import { generateSculpture } from "./exhibitSculpture.ts";

const submission = (
  over: Partial<ExhibitSubmission> = {},
): ExhibitSubmission => ({
  dish: "Borscht",
  feeling: "Quiet evenings",
  memory: "The pot my grandmother never washed the same day.",
  donorName: "Marta",
  ...over,
});

describe("the generated exhibit", () => {
  test("the same memory always builds the same exhibit", () => {
    expect(generateSculpture(submission())).toEqual(
      generateSculpture(submission()),
    );
  });

  test("whitespace and case do not change the exhibit", () => {
    expect(generateSculpture(submission({ dish: "  BORSCHT " }))).toEqual(
      generateSculpture(submission()),
    );
  });

  test("a different memory builds a different exhibit", () => {
    const first = generateSculpture(submission());
    const others = [
      generateSculpture(submission({ dish: "Pierogi" })),
      generateSculpture(submission({ feeling: "Homesickness" })),
      generateSculpture(submission({ memory: "A different kitchen." })),
      generateSculpture(submission({ donorName: "Ivan" })),
    ];
    for (const other of others) {
      expect(other).not.toEqual(first);
    }
  });

  test("every exhibit is plated from real parts, inside the frame", () => {
    const kinds = new Set<string>();
    for (let index = 0; index < 300; index += 1) {
      const spec = generateSculpture(submission({ memory: `memory ${index}` }));
      kinds.add(spec.kind);
      expect(["dumpling", "disc", "bun", "stack", "bowl", "wedge"]).toContain(
        spec.kind,
      );
      expect(["berries", "dusting", "drizzle", "seeds"]).toContain(
        spec.garnish,
      );
      expect(["beet", "toast-deep", "syrup"]).toContain(spec.accent);
      expect(spec.steam).toBeGreaterThanOrEqual(2);
      expect(spec.steam).toBeLessThanOrEqual(3);
      expect(spec.pieces.length).toBeGreaterThanOrEqual(1);
      expect(spec.pieces.length).toBeLessThanOrEqual(3);
      for (const piece of spec.pieces) {
        expect(piece.x).toBeGreaterThanOrEqual(93);
        expect(piece.x).toBeLessThanOrEqual(187);
        expect(piece.scale).toBeGreaterThanOrEqual(0.78);
        expect(piece.scale).toBeLessThan(1.24);
        expect(Math.abs(piece.rotate)).toBeLessThanOrEqual(8);
        expect(piece.y).toBeGreaterThanOrEqual(0);
        expect(piece.y).toBeLessThan(5);
      }
      for (const spot of spec.garnishSpots) {
        expect(spot.x).toBeGreaterThan(108);
        expect(spot.x).toBeLessThan(172);
        expect(spot.r).toBeLessThan(6.1);
      }
    }
    expect(kinds.size).toBe(6);
  });

  test("a bowl or a stack is plated alone", () => {
    for (let index = 0; index < 300; index += 1) {
      const spec = generateSculpture(submission({ memory: `plate ${index}` }));
      if (spec.kind === "bowl" || spec.kind === "stack") {
        expect(spec.pieces).toHaveLength(1);
        expect(spec.pieces[0]!.x).toBe(140);
      }
    }
  });
});
