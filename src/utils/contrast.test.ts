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
