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

  test("every exhibit stays inside the frame", () => {
    for (let index = 0; index < 200; index += 1) {
      const spec = generateSculpture(submission({ memory: `memory ${index}` }));
      expect(spec.mounds.length).toBeGreaterThanOrEqual(2);
      expect(spec.mounds.length).toBeLessThanOrEqual(4);
      expect(spec.steam).toBeGreaterThanOrEqual(2);
      expect(spec.steam).toBeLessThanOrEqual(3);
      expect(spec.garnish.length).toBeLessThanOrEqual(3);
      for (const mound of spec.mounds) {
        expect(mound.x - mound.rx).toBeGreaterThan(44);
        expect(mound.x + mound.rx).toBeLessThan(236);
        expect(mound.ry).toBeGreaterThan(17);
        expect(mound.ry).toBeLessThan(33);
      }
      for (const piece of spec.garnish) {
        expect(piece.x).toBeGreaterThan(90);
        expect(piece.x).toBeLessThan(190);
        expect(piece.r).toBeLessThan(6.5);
      }
    }
  });
});
