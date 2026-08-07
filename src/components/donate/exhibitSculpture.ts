import type { ExhibitSubmission } from "../../content/donate.ts";

export interface SculptureMound {
  x: number;
  ry: number;
  rx: number;
}

export interface SculptureSpec {
  mounds: SculptureMound[];
  garnish: { x: number; y: number; r: number }[];
  steam: number;
  accent: "beet" | "toast-deep" | "syrup";
}

const accents = ["beet", "toast-deep", "syrup"] as const;

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

/* The same memory always builds the same exhibit; no two build the same one. */
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

  const moundCount = 2 + Math.floor(random() * 3);
  const spread = 108 / (moundCount + 1);
  const mounds = Array.from({ length: moundCount }, (_, index) => ({
    x: 86 + spread * (index + 1) + (random() * 12 - 6),
    rx: 26 + random() * 20,
    ry: 18 + random() * 14,
  }));

  const garnishCount = Math.floor(random() * 4);
  const garnish = Array.from({ length: garnishCount }, () => ({
    x: 96 + random() * 88,
    y: 112 + random() * 14,
    r: 3 + random() * 3,
  }));

  return {
    mounds,
    garnish,
    steam: 2 + Math.floor(random() * 2),
    accent: accents[Math.floor(random() * accents.length)]!,
  };
}
