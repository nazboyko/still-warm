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
}

export interface PostcardLayout {
  width: number;
  height: number;
  background: string;
  /* The catalogue photograph: the exhibit under its light, framed in brass. */
  artwork: { x: number; y: number; width: number; height: number };
  placard: { x: number; y: number; width: number; height: number };
  topRule: { color: string; height: number };
  lines: PostcardLine[];
}

export const postcardFonts = {
  display: '"Young Serif", georgia, serif',
  body: '"Familjen Grotesk", system-ui, sans-serif',
  utility: '"IBM Plex Mono", ui-monospace, monospace',
};

const CARD = { width: 1200, height: 630 };
/* Lockup above, the exhibit photograph in the middle, the placard beneath. The
   artwork keeps the tableau's own 280:190 aspect. */
const ARTWORK = { x: 411, y: 76, width: 378, height: 256 };
const PLACARD = { x: 90, y: 360, width: 1020, height: 228 };
const TEXT_X = 138;
const TEXT_WIDTH = 924;

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
    measure(line, postcardFonts.body, 27),
  );
  const provenanceLine = `Gift of ${exhibit.donorName}. ${postcardCard.collectedPrefix} ${exhibit.collectedOn}.`;

  const lines: PostcardLine[] = [
    {
      text: `${postcardCard.lockupName} - ${postcardCard.lockupSub}`,
      font: postcardFonts.utility,
      size: 24,
      x: CARD.width / 2,
      y: 48,
      color: "#9c8154",
      align: "center",
    },
    {
      text: catalogLine,
      font: postcardFonts.utility,
      size: 25,
      x: TEXT_X,
      y: 404,
      color: "#7a2e35",
      align: "left",
    },
    {
      text: exhibit.dish,
      font: postcardFonts.display,
      size: dishSize,
      x: TEXT_X,
      y: 452,
      color: "#191411",
      align: "left",
    },
    ...memoryLines.slice(0, 3).map((text, index) => ({
      text,
      font: postcardFonts.body,
      size: 27,
      x: TEXT_X,
      y: 488 + index * 34,
      color: "#191411",
      align: "left" as const,
    })),
    {
      text: provenanceLine,
      font: postcardFonts.utility,
      size: 20,
      x: TEXT_X,
      y: memoryLines.length > 2 ? 578 : 566,
      color: "#7a2e35",
      align: "left",
    },
    {
      text: postcardCard.url,
      font: postcardFonts.utility,
      size: 20,
      x: CARD.width - PLACARD.x,
      y: 616,
      color: "#9c8154",
      align: "right",
    },
  ];

  return {
    width: CARD.width,
    height: CARD.height,
    background: "#191411",
    artwork: ARTWORK,
    placard: PLACARD,
    topRule: { color: "#9c8154", height: 4 },
    lines,
  };
}
