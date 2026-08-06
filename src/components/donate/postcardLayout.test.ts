import { describe, expect, test } from "vitest";
import type { DonatedExhibit } from "../../content/donate.ts";
import {
  fitFontSize,
  layoutPostcard,
  postcardFonts,
  wrapText,
} from "./postcardLayout.ts";

// Predictable stand-in for canvas measureText: width tracks length and size.
const measure = (text: string, _font: string, size: number) =>
  text.length * size * 0.55;

const donated: DonatedExhibit = {
  dish: "Rice pudding",
  feeling: "Quiet evenings",
  memory: "Stirred with a wooden spoon, never a recipe in sight.",
  donorName: "Marta",
  number: "846",
  collectedOn: "06 AUG 2026",
};

const maxed: DonatedExhibit = {
  ...donated,
  dish: "M".repeat(40),
  feeling: "Q".repeat(24),
  memory: "word ".repeat(28).trim(),
};

describe("wrapText", () => {
  test("keeps short text on one line", () => {
    expect(wrapText("warm plate", 900, (line) => line.length * 10)).toEqual([
      "warm plate",
    ]);
  });

  test("never exceeds the maximum width", () => {
    const lines = wrapText(maxed.memory, 900, (line) => line.length * 18.7);
    for (const line of lines) {
      expect(line.length * 18.7).toBeLessThanOrEqual(900);
    }
    expect(lines.join(" ")).toBe(maxed.memory);
  });
});

describe("fitFontSize", () => {
  test("keeps the start size when it fits", () => {
    expect(
      fitFontSize("Varenyky", postcardFonts.display, 64, 40, 900, measure),
    ).toBe(64);
  });

  test("shrinks a 40-character dish until it fits", () => {
    const size = fitFontSize(
      maxed.dish,
      postcardFonts.display,
      64,
      40,
      900,
      measure,
    );
    expect(size).toBeLessThan(64);
    expect(
      measure(maxed.dish, postcardFonts.display, size),
    ).toBeLessThanOrEqual(900);
  });
});

describe("layoutPostcard", () => {
  test("card and placard hold the spec dimensions", () => {
    const layout = layoutPostcard(donated, measure);
    expect(layout.width).toBe(1200);
    expect(layout.height).toBe(630);
    expect(layout.placard).toEqual({ x: 90, y: 90, width: 1020, height: 450 });
  });

  test("catalog line carries number and feeling in catalog voice", () => {
    const layout = layoutPostcard(donated, measure);
    expect(layout.lines[0]!.text).toBe("CAT. VISITOR-846 - QUIET EVENINGS");
  });

  test("provenance line reads donor and collection date", () => {
    const layout = layoutPostcard(donated, measure);
    const provenance = layout.lines.at(-2)!;
    expect(provenance.text).toBe("Donated by Marta. COLLECTED 06 AUG 2026.");
  });

  test("memory never exceeds three lines, even maxed out", () => {
    const layout = layoutPostcard(maxed, measure);
    const memoryLines = layout.lines.filter(
      (line) => line.font === postcardFonts.body,
    );
    expect(memoryLines.length).toBeLessThanOrEqual(3);
    for (const line of memoryLines) {
      expect(measure(line.text, line.font, line.size)).toBeLessThanOrEqual(900);
      expect(line.y).toBeLessThan(498);
    }
  });

  test("every left-aligned line stays inside the placard", () => {
    const layout = layoutPostcard(maxed, measure);
    for (const line of layout.lines.filter((l) => l.align === "left")) {
      expect(line.x).toBeGreaterThanOrEqual(layout.placard.x);
      expect(line.y).toBeLessThanOrEqual(
        layout.placard.y + layout.placard.height,
      );
    }
  });
});
