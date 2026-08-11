import type { DonatedExhibit } from "../../content/donate.ts";
import { postcardCard } from "../../content/donate.ts";

export type MeasureText = (text: string, font: string, size: number) => number;

export interface PostcardLine {
  text: string;
  font: string;
  size: number;
  x: number;
  y: number;
  color: string;
  align: "left" | "right" | "center";
  /* Extra letterspacing, for the lines set in the museum's label voice. */
  tracking?: number;
}

export interface PostcardLayout {
  width: number;
  height: number;
  background: string;
  /* The lamp over the exhibit. Without it the card is a dark rectangle with a
     picture on it; with it, it is a room. */
  glow: { x: number; y: number; radius: number };
  /* The catalogue photograph: the exhibit under its light, framed in brass. */
  artwork: { x: number; y: number; width: number; height: number };
  frame: { color: string; inset: number; width: number };
  placard: { x: number; y: number; width: number; height: number };
  /* The same corner every card on the site now carries, scaled to the print. */
  radius: number;
  topRule: { color: string; height: number };
  lines: PostcardLine[];
}

export const postcardFonts = {
  display: '"Young Serif", georgia, serif',
  body: '"Familjen Grotesk", system-ui, sans-serif',
  utility: '"IBM Plex Mono", ui-monospace, monospace',
};

const CARD = { width: 1200, height: 630 };
/* Wordmark above, the exhibit under its lamp in the middle, the label beneath,
   with one margin (72) holding all four edges. The artwork keeps the tableau's
   own 280:190 aspect so nothing squashes. */
const MARGIN = 72;
const ARTWORK = { x: 452, y: 114, width: 295, height: 200 };
const PLACARD = { x: MARGIN, y: 344, width: 1056, height: 244 };
const TEXT_X = PLACARD.x + 44;
const TEXT_WIDTH = PLACARD.width - 88;

/* A run with no space in it cannot be wrapped between words, and a visitor is
   allowed to type 140 of those characters. Broken by character it stays on the
   card; left alone it runs off the edge of the picture. */
function breakRun(
  run: string,
  maxWidth: number,
  measure: (line: string) => number,
): string[] {
  const parts: string[] = [];
  let chunk = "";
  for (const character of run) {
    const candidate = chunk + character;
    if (chunk && measure(candidate) > maxWidth) {
      parts.push(chunk);
      chunk = character;
    } else {
      chunk = candidate;
    }
  }
  if (chunk) parts.push(chunk);
  return parts;
}

export function wrapText(
  text: string,
  maxWidth: number,
  measure: (line: string) => number,
): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (line && measure(candidate) > maxWidth) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
    if (measure(line) > maxWidth) {
      const parts = breakRun(line, maxWidth, measure);
      lines.push(...parts.slice(0, -1));
      line = parts.at(-1) ?? "";
    }
  }
  if (line) lines.push(line);
  return lines;
}

export function fitFontSize(
  text: string,
  font: string,
  startSize: number,
  minSize: number,
  maxWidth: number,
  measure: MeasureText,
): number {
  let size = startSize;
  while (size > minSize && measure(text, font, size) > maxWidth) {
    size -= 2;
  }
  return size;
}

export function layoutPostcard(
  exhibit: DonatedExhibit,
  measure: MeasureText,
): PostcardLayout {
  const catalogLine = `CAT. ${exhibit.number} - ${exhibit.feeling.toUpperCase()}`;
  const dishSize = fitFontSize(
    exhibit.dish,
    postcardFonts.display,
    42,
    30,
    TEXT_WIDTH,
    measure,
  );
  const memoryLines = wrapText(exhibit.memory, TEXT_WIDTH, (line) =>
    measure(line, postcardFonts.body, 25),
  );
  const provenanceLine = `Gift of ${exhibit.donorName}. ${postcardCard.collectedPrefix} ${exhibit.collectedOn}.`;

  const lines: PostcardLine[] = [
    {
      text: postcardCard.lockupName,
      font: postcardFonts.display,
      size: 38,
      x: CARD.width / 2,
      y: 56,
      color: "#efe6d8",
      align: "center",
    },
    {
      text: postcardCard.lockupSub,
      font: postcardFonts.utility,
      size: 18,
      x: CARD.width / 2,
      y: 86,
      color: "#9c8154",
      align: "center",
      tracking: 4,
    },
    {
      text: catalogLine,
      font: postcardFonts.utility,
      size: 22,
      x: TEXT_X,
      y: 396,
      color: "#7a2e35",
      align: "left",
      tracking: 2,
    },
    {
      text: exhibit.dish,
      font: postcardFonts.display,
      size: dishSize,
      x: TEXT_X,
      y: 448,
      color: "#191411",
      align: "left",
    },
    ...memoryLines.slice(0, 3).map((text, index) => ({
      text,
      font: postcardFonts.body,
      size: 25,
      x: TEXT_X,
      y: 486 + index * 32,
      color: "#191411",
      align: "left" as const,
    })),
    {
      text: provenanceLine,
      font: postcardFonts.utility,
      size: 19,
      x: TEXT_X,
      y: 578,
      color: "#7a2e35",
      align: "left",
    },
    {
      text: postcardCard.url,
      font: postcardFonts.utility,
      size: 18,
      x: CARD.width - MARGIN,
      y: 616,
      color: "#9c8154",
      align: "right",
      tracking: 2,
    },
  ];

  return {
    width: CARD.width,
    height: CARD.height,
    background: "#191411",
    glow: {
      x: CARD.width / 2,
      y: ARTWORK.y + ARTWORK.height * 0.62,
      radius: 330,
    },
    artwork: ARTWORK,
    frame: { color: "#9c8154", inset: 10, width: 3 },
    placard: PLACARD,
    radius: 18,
    topRule: { color: "#9c8154", height: 3 },
    lines,
  };
}
