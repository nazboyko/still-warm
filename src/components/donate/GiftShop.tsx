import { useState } from "react";
import type { DonatedExhibit } from "../../content/donate.ts";
import { donateStatus, giftShop, postcardCard } from "../../content/donate.ts";
import { Button } from "../ui/Button.tsx";
import "./GiftShop.css";
import { exhibitSvgDataUrl } from "./exhibitImage.ts";
import { generateSculpture } from "./exhibitSculpture.ts";
import type { PostcardLayout } from "./postcardLayout.ts";
import { layoutPostcard } from "./postcardLayout.ts";

/* The visitor's own sculpture, rasterized from the same deterministic spec the
   frame showed them. Inline data URL only, so the canvas stays untainted. */
function loadExhibitImage(
  exhibit: DonatedExhibit,
): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const image = new Image();
    const settle = (loaded: boolean) => {
      clearTimeout(timer);
      resolve(loaded ? image : null);
    };
    const timer = setTimeout(() => settle(false), 1500);
    image.onload = () => settle(true);
    image.onerror = () => settle(false);
    image.src = exhibitSvgDataUrl(generateSculpture(exhibit));
  });
}

function drawPostcard(
  context: CanvasRenderingContext2D,
  layout: PostcardLayout,
  artwork: HTMLImageElement | null,
) {
  context.fillStyle = layout.background;
  context.fillRect(0, 0, layout.width, layout.height);
  if (artwork) {
    const box = layout.artwork;
    context.drawImage(artwork, box.x, box.y, box.width, box.height);
    context.strokeStyle = "#9c8154";
    context.lineWidth = 3;
    context.strokeRect(box.x - 8, box.y - 8, box.width + 16, box.height + 16);
  }
  const { x, y, width, height } = layout.placard;
  context.fillStyle = "#efe6d8";
  context.fillRect(x, y, width, height);
  context.fillStyle = layout.topRule.color;
  context.fillRect(x, y, width, layout.topRule.height);
  for (const line of layout.lines) {
    context.font = `${line.size}px ${line.font}`;
    context.fillStyle = line.color;
    context.textAlign = line.align;
    context.fillText(line.text, line.x, line.y);
  }
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// E1 fallback: if canvas is unavailable, the postcard leaves as plain text.
function downloadTextCard(exhibit: DonatedExhibit) {
  const text = [
    `CAT. ${exhibit.number} - ${exhibit.feeling.toUpperCase()}`,
    exhibit.dish,
    exhibit.memory,
    `Gift of ${exhibit.donorName}. ${postcardCard.collectedPrefix} ${exhibit.collectedOn}.`,
    `${postcardCard.lockupName} - ${postcardCard.lockupSub} - ${postcardCard.url}`,
  ].join("\n");
  downloadBlob(
    new Blob([text], { type: "text/plain" }),
    postcardCard.fileName(exhibit.number).replace(".png", ".txt"),
  );
}

async function renderPostcardBlob(
  exhibit: DonatedExhibit,
): Promise<Blob | null> {
  await (document.fonts?.ready ?? Promise.resolve());
  const canvas = document.createElement("canvas");
  const layout = layoutPostcard(exhibit, (text, font, size) => {
    const context = canvas.getContext("2d");
    if (!context) return 0;
    context.font = `${size}px ${font}`;
    return context.measureText(text).width;
  });
  canvas.width = layout.width;
  canvas.height = layout.height;
  const context = canvas.getContext("2d");
  if (!context) return null;
  // A failed artwork load never blocks the postcard: it ships without the
  // photograph, and the plain-text card still covers a missing canvas.
  const artwork = await loadExhibitImage(exhibit);
  drawPostcard(context, layout, artwork);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

export function GiftShop({ donated }: { donated: DonatedExhibit }) {
  const [status, setStatus] = useState("");

  async function takePostcard() {
    try {
      const blob = await renderPostcardBlob(donated);
      if (blob) {
        downloadBlob(blob, postcardCard.fileName(donated.number));
      } else {
        downloadTextCard(donated);
      }
    } catch {
      downloadTextCard(donated);
    }
    setStatus(donateStatus.postcardReady);
  }

  return (
    <div className="gift-shop">
      <Button onClick={() => void takePostcard()}>
        {giftShop.button(donated.number)}
      </Button>
      <p role="status" className="gift-shop-status">
        {status}
      </p>
    </div>
  );
}
