/// <reference types="node" />
import { readFileSync } from "node:fs";
import { describe, expect, test } from "vitest";
import { contrastRatio } from "./contrast.ts";

const tokensCss = readFileSync("src/styles/tokens.css", "utf8");

function token(name: string): string {
  const match = tokensCss.match(new RegExp(`--${name}: (#[0-9a-f]{6});`));
  if (!match?.[1]) throw new Error(`Token --${name} not found`);
  return match[1];
}

test("computes known ratios", () => {
  expect(contrastRatio("#ffffff", "#000000")).toBeCloseTo(21, 5);
  expect(contrastRatio("#ffffff", "#ffffff")).toBeCloseTo(1, 5);
});

describe("token pairs hold WCAG AA", () => {
  test.each([
    ["plaster", "ink"],
    ["ink", "plaster"],
    ["beet", "plaster"],
    ["brass", "ink"],
    ["plaster", "room-homesickness"],
    ["plaster", "room-rainy"],
    ["plaster", "room-celebration"],
    ["plaster", "room-sunday"],
  ])("text: %s on %s is at least 4.5", (fg, bg) => {
    expect(contrastRatio(token(fg), token(bg))).toBeGreaterThanOrEqual(4.5);
  });

  test.each([
    ["tungsten", "ink"],
    ["beet", "plaster"],
  ])("focus ring: %s on %s is at least 3", (ring, surface) => {
    expect(contrastRatio(token(ring), token(surface))).toBeGreaterThanOrEqual(
      3,
    );
  });
});

/* The card is plaster left slightly open, so the surface a reader actually sees
   is plaster composited over whatever room it hangs in - and that is what AA
   has to hold, not the token on its own. */
function plasterOver(background: string): string {
  const match = tokensCss.match(
    /--plaster-open: rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)/,
  );
  if (!match) throw new Error("Token --plaster-open not found");
  const [, ...parts] = match;
  const alpha = Number(parts[3]);
  const channels = [0, 1, 2].map((index) => {
    const front = Number(parts[index]);
    const back = parseInt(background.slice(1 + index * 2, 3 + index * 2), 16);
    return Math.round(front * alpha + back * (1 - alpha));
  });
  return `#${channels.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

describe("the open card holds AA in every room it hangs in", () => {
  // Ink covers Exhibit 000 and the reserved frame, which hang on the page
  // itself, and the dark end of the room's scroll-driven light.
  test.each([
    ["room-homesickness"],
    ["room-rainy"],
    ["room-celebration"],
    ["room-sunday"],
    ["ink"],
  ])("over %s, story and catalog text stay readable", (room) => {
    const card = plasterOver(token(room));
    expect(contrastRatio(token("ink"), card)).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio(token("beet"), card)).toBeGreaterThanOrEqual(4.5);
  });
});
