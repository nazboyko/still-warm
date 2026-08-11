import type { ExhibitSubmission } from "../../content/donate.ts";

export type FoodKind = "dumpling" | "disc" | "bun" | "stack" | "bowl" | "wedge";
type GarnishKind = "berries" | "dusting" | "drizzle" | "seeds";
export type AccentTone = "beet" | "toast-deep" | "syrup";

interface PlacedFood {
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

/* The line every piece stands on, and how far each shape rises above it and
   spreads across it at scale 1. Steam and garnish are placed from these
   numbers, so neither can end up hanging in the air beside the food. */
export const PLATE_LINE = 138;

const footprints: Record<FoodKind, { top: number; halfWidth: number }> = {
  dumpling: { top: 34, halfWidth: 30 },
  disc: { top: 24, halfWidth: 38 },
  bun: { top: 34, halfWidth: 26 },
  stack: { top: 45, halfWidth: 34 },
  bowl: { top: 27, halfWidth: 36 },
  wedge: { top: 28, halfWidth: 30 },
};

export function foodTop(spec: SculptureSpec): number {
  const { top } = footprints[spec.kind];
  return Math.min(
    ...spec.pieces.map((piece) => PLATE_LINE + piece.y - top * piece.scale),
  );
}

const kinds: FoodKind[] = ["dumpling", "disc", "bun", "stack", "bowl", "wedge"];
const garnishes: GarnishKind[] = ["berries", "dusting", "drizzle", "seeds"];
const accents: AccentTone[] = ["beet", "toast-deep", "syrup"];

/* Plated as one dish would be: a bowl, a stack or a slice stands alone, small
   things come in a few. Two slices side by side just doubles the guessing. */
const singles: FoodKind[] = ["bowl", "stack", "wedge"];

/* What the visitor typed decides the shape when we recognise it. Two passes,
   because one list sorted by length gets "naan bread" wrong: a named dish
   always beats a general word for a shape. Inside each pass the longest
   keyword wins, so "pancakes" is a stack while "pancake" is a disc, and
   "pierogi" is a dumpling rather than a pie. */
const namedDishes: Record<FoodKind, string[]> = {
  bowl: [
    "ramen",
    "ramyeon",
    "pho",
    "borscht",
    "borsch",
    "congee",
    "chowder",
    "laksa",
    "goulash",
    "miso",
    "menudo",
    "борщ",
    "рамен",
  ],
  dumpling: [
    "dumpling",
    "varenyky",
    "varenyk",
    "pierogi",
    "gyoza",
    "momo",
    "empanada",
    "ravioli",
    "pelmeni",
    "samosa",
    "wonton",
    "manti",
    "khinkali",
    "вареник",
    "пельмен",
  ],
  disc: [
    "pancake",
    "crepe",
    "dosa",
    "tortilla",
    "arepa",
    "blini",
    "naan",
    "roti",
    "injera",
    "chapati",
    "galette",
    "flatbread",
    "млинц",
  ],
  stack: [
    "pancakes",
    "waffle",
    "grilled cheese",
    "toastie",
    "sandwich",
    "burger",
    "lasagna",
    "lasagne",
    "panini",
  ],
  bun: [
    "bagel",
    "brioche",
    "challah",
    "biscuit",
    "mantou",
    "bao",
    "пиріж",
    "булочк",
  ],
  wedge: ["pizza", "quiche", "cheesecake", "brownie", "torte", "пиріг"],
};

const formHints: Record<FoodKind, string[]> = {
  bowl: ["soup", "stew", "curry", "noodle", "broth", "суп"],
  dumpling: [],
  disc: [],
  stack: ["toast", "stack"],
  bun: ["bread", "bun", "roll"],
  wedge: ["cake", "pie", "tart", "slice"],
};

function byLongestFirst(dictionary: Record<FoodKind, string[]>) {
  return Object.entries(dictionary)
    .flatMap(([kind, words]) =>
      words.map((word) => [word, kind as FoodKind] as const),
    )
    .sort((a, b) => b[0].length - a[0].length);
}

const passes = [byLongestFirst(namedDishes), byLongestFirst(formHints)];

/* Pure and case-blind: the same dish name always names the same shape. */
export function matchFoodKind(dish: string): FoodKind | null {
  const text = dish.trim().toLowerCase();
  if (!text) return null;
  for (const pass of passes) {
    const hit = pass.find(([word]) => text.includes(word));
    if (hit) return hit[1];
  }
  return null;
}

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

  // Roll the shape either way, so a recognised dish changes the form and
  // nothing else: two people typing "ramen" still get two different bowls.
  const rolled = kinds[Math.floor(random() * kinds.length)]!;
  const kind = matchFoodKind(submission.dish) ?? rolled;
  const count = singles.includes(kind) ? 1 : 1 + Math.floor(random() * 3);
  const spread = count === 3 ? 94 : count === 2 ? 78 : 0;
  const size = count === 3 ? 0.78 : count === 2 ? 0.9 : 1.05;
  const tilt = kind === "dumpling" || kind === "bun" ? 16 : 9;
  const pieces = Array.from({ length: count }, (_, index) => ({
    x: 140 - spread / 2 + (count === 1 ? 0 : spread * (index / (count - 1))),
    y: random() * 5,
    scale: size + random() * 0.18,
    rotate: random() * tilt - tilt / 2,
  }));

  const garnish = garnishes[Math.floor(random() * garnishes.length)]!;
  const { top, halfWidth } = footprints[kind];
  // Berries arrive as one spoonful in one place; powder and seeds scatter.
  // Two berries landing apart on a top surface read as a pair of eyes.
  const clustered = garnish === "berries";
  const anchor = pieces[Math.floor(random() * pieces.length)]!;
  const cluster = random() * 1.2 - 0.6;
  const garnishSpots = Array.from(
    { length: 2 + Math.floor(random() * 3) },
    () => {
      const piece = clustered
        ? anchor
        : pieces[Math.floor(random() * pieces.length)]!;
      const offset = clustered
        ? cluster + (random() * 0.36 - 0.18)
        : random() * 2 - 1;
      // The top of a piece is domed, so anything placed off its centre has to
      // ride down that curve. Placed by the frame instead of by the food, a
      // berry ends up hanging in the air beside the plate.
      const sag = offset * offset * top * piece.scale * 0.3;
      return {
        x: piece.x + offset * halfWidth * piece.scale * 0.62,
        y: PLATE_LINE + piece.y - top * piece.scale + sag + random() * 3,
        r: 3.4 + random() * 2.6,
      };
    },
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
