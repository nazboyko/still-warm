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
  number: "V-0846",
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

  test("breaks a run that has no space to break on", () => {
    // 140 characters of one word is inside what the desk accepts, and used to
    // print straight off the right edge of the postcard.
    const run = "asdfasdfpvyuxkcjhvj".repeat(8);
    const lines = wrapText(run, 900, (line) => line.length * 18.7);
    expect(lines.length).toBeGreaterThan(1);
    for (const line of lines) {
      expect(line.length * 18.7).toBeLessThanOrEqual(900);
    }
    expect(lines.join("")).toBe(run);
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
    expect(layout.placard).toEqual({
      x: 72,
      y: 344,
      width: 1056,
      height: 244,
    });
  });

  test("catalog line carries number and feeling in catalog voice", () => {
    const layout = layoutPostcard(donated, measure);
    // Found by its voice, not its index: the composition has moved twice and
    // an index made this test fail for reasons that were never about the copy.
    const catalog = layout.lines.find((line) => line.text.startsWith("CAT. "));
    expect(catalog?.text).toBe("CAT. V-0846 - QUIET EVENINGS");
  });

  test("provenance line reads donor and collection date", () => {
    const layout = layoutPostcard(donated, measure);
    const provenance = layout.lines.at(-2)!;
    expect(provenance.text).toBe("Gift of Marta. COLLECTED 06 AUG 2026.");
  });

  test("memory never exceeds three lines, even maxed out", () => {
    const layout = layoutPostcard(maxed, measure);
    const memoryLines = layout.lines.filter(
      (line) => line.font === postcardFonts.body,
    );
    expect(memoryLines.length).toBeLessThanOrEqual(3);
    // Derived from the label, not pinned to a number: the composition has moved
    // and a hard-coded column width made this fail for the wrong reason.
    const inset = memoryLines[0]!.x - layout.placard.x;
    const column = layout.placard.width - inset * 2;
    for (const line of memoryLines) {
      expect(measure(line.text, line.font, line.size)).toBeLessThanOrEqual(
        column,
      );
      expect(line.y).toBeLessThan(560);
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

describe("the catalogue composition", () => {
  test("the artwork area stays clear of the lockup and the placard", () => {
    for (const exhibit of [donated, maxed]) {
      const layout = layoutPostcard(exhibit, measure);
      const art = layout.artwork;
      expect(art.y).toBeGreaterThan(56);
      expect(art.y + art.height).toBeLessThan(layout.placard.y);
      expect(art.x).toBeGreaterThan(0);
      expect(art.x + art.width).toBeLessThan(layout.width);
      // the tableau's own 280:190 aspect, kept so nothing squashes
      expect(art.width / art.height).toBeCloseTo(280 / 190, 1);
    }
  });

  test("maxed fields keep every placard line inside the placard", () => {
    const layout = layoutPostcard(maxed, measure);
    const placardLines = layout.lines.filter(
      (line) => line.color === "#191411" || line.color === "#7a2e35",
    );
    for (const line of placardLines) {
      expect(line.y).toBeGreaterThan(layout.placard.y);
      expect(line.y).toBeLessThan(layout.placard.y + layout.placard.height);
    }
  });

  test("the card ends with the domain and starts with the lockup", () => {
    const layout = layoutPostcard(donated, measure);
    expect(layout.lines[0]?.text).toContain("STILL WARM");
    expect(layout.lines.at(-1)?.text).toBe(
      "still-warm.boyko-nazar.workers.dev",
    );
    expect(layout.lines.at(-1)!.y).toBeLessThan(layout.height);
  });
});
