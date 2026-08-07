import type { ExhibitSubmission } from "../../content/donate.ts";

export type FoodKind = "dumpling" | "disc" | "bun" | "stack" | "bowl" | "wedge";
export type GarnishKind = "berries" | "sprig" | "drizzle" | "seeds";
export type AccentTone = "beet" | "toast-deep" | "syrup";

export interface PlacedFood {
  x: number;
  y: number;
  scale: number;
  rotate: number;
}

export interface SculptureSpec {
  kind: FoodKind;
  pieces: PlacedFood[];
  garnish: GarnishKind;
  garnishSpots: { x: number; y: number; r: number }[];
  steam: number;
  accent: AccentTone;
}

const kinds: FoodKind[] = ["dumpling", "disc", "bun", "stack", "bowl", "wedge"];
const garnishes: GarnishKind[] = ["berries", "sprig", "drizzle", "seeds"];
const accents: AccentTone[] = ["beet", "toast-deep", "syrup"];

/* Plated as one dish would be: a bowl or a stack stands alone, small things
   come in a few. */
const singles: FoodKind[] = ["bowl", "stack"];

/* FNV-1a: small, stable, and enough to spread short strings. */
function hash(text: string): number {
  let value = 0x811c9dc5;
  for (let index = 0; index < text.length; index += 1) {
    value ^= text.charCodeAt(index);
    value = Math.imul(value, 0x01000193);
  }
  return value >>> 0;
}

function seeded(seed: number): () => number {
  let state = seed || 1;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), state | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* The same memory always plates the same exhibit; no two plate the same one. */
export function generateSculpture(
  submission: ExhibitSubmission,
): SculptureSpec {
  const source = [
    submission.dish,
    submission.feeling,
    submission.memory,
    submission.donorName,
  ]
    .map((part) => part.trim().toLowerCase())
    .join("|");
  const random = seeded(hash(source));

  const kind = kinds[Math.floor(random() * kinds.length)]!;
  const count = singles.includes(kind) ? 1 : 1 + Math.floor(random() * 3);
  const spread = count === 3 ? 96 : count === 2 ? 62 : 0;
  const size = count === 3 ? 0.84 : count === 2 ? 0.98 : 1.12;
  const tilt = kind === "dumpling" || kind === "bun" ? 16 : 9;
  const pieces = Array.from({ length: count }, (_, index) => ({
    x: 140 - spread / 2 + (count === 1 ? 0 : spread * (index / (count - 1))),
    y: random() * 3,
    scale: size + random() * 0.18,
    rotate: random() * tilt - tilt / 2,
  }));

  const garnish = garnishes[Math.floor(random() * garnishes.length)]!;
  const garnishSpots = Array.from(
    { length: 2 + Math.floor(random() * 3) },
    () => ({
      x: 110 + random() * 60,
      y: 110 + random() * 16,
      r: 3 + random() * 2.5,
    }),
  );

  return {
    kind,
    pieces,
    garnish,
    garnishSpots,
    steam: 2 + Math.floor(random() * 2),
    accent: accents[Math.floor(random() * accents.length)]!,
  };
}
