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
  align: "left" | "right";
}

export interface PostcardLayout {
  width: number;
  height: number;
  background: string;
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
const PLACARD = { x: 90, y: 90, width: 1020, height: 450 };
const TEXT_X = 150;
const TEXT_WIDTH = 900;

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
    64,
    40,
    TEXT_WIDTH,
    measure,
  );
  const memoryLines = wrapText(exhibit.memory, TEXT_WIDTH, (line) =>
    measure(line, postcardFonts.body, 34),
  );
  const provenanceLine = `Gift of ${exhibit.donorName}. ${postcardCard.collectedPrefix} ${exhibit.collectedOn}.`;
  const lockupLine = `${postcardCard.lockupName} - ${postcardCard.lockupSub} - ${postcardCard.url}`;

  const lines: PostcardLine[] = [
    {
      text: catalogLine,
      font: postcardFonts.utility,
      size: 30,
      x: TEXT_X,
      y: 190,
      color: "#7a2e35",
      align: "left",
    },
    {
      text: exhibit.dish,
      font: postcardFonts.display,
      size: dishSize,
      x: TEXT_X,
      y: 272,
      color: "#191411",
      align: "left",
    },
    ...memoryLines.slice(0, 3).map((text, index) => ({
      text,
      font: postcardFonts.body,
      size: 34,
      x: TEXT_X,
      y: 340 + index * 48,
      color: "#191411",
      align: "left" as const,
    })),
    {
      text: provenanceLine,
      font: postcardFonts.utility,
      size: 24,
      x: TEXT_X,
      y: 498,
      color: "#7a2e35",
      align: "left",
    },
    {
      text: lockupLine,
      font: postcardFonts.utility,
      size: 22,
      x: CARD.width - PLACARD.x,
      y: 588,
      color: "#9c8154",
      align: "right",
    },
  ];

  return {
    width: CARD.width,
    height: CARD.height,
    background: "#191411",
    placard: PLACARD,
    topRule: { color: "#9c8154", height: 4 },
    lines,
  };
}
