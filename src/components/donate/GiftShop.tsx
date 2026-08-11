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

/* Rounded corners, or square ones on an engine too old to have roundRect. The
   postcard degrades a corner rather than failing to render. */
function cardPath(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  context.beginPath();
  if (typeof context.roundRect === "function") {
    context.roundRect(x, y, width, height, radius);
  } else {
    context.rect(x, y, width, height);
  }
}

function drawPostcard(
  context: CanvasRenderingContext2D,
  layout: PostcardLayout,
  artwork: HTMLImageElement | null,
) {
  context.fillStyle = layout.background;
  context.fillRect(0, 0, layout.width, layout.height);

  /* The lamp, before anything it lights. */
  const lamp = context.createRadialGradient(
    layout.glow.x,
    layout.glow.y,
    0,
    layout.glow.x,
    layout.glow.y,
    layout.glow.radius,
  );
  lamp.addColorStop(0, "rgb(232 169 78 / 0.22)");
  lamp.addColorStop(1, "rgb(232 169 78 / 0)");
  context.fillStyle = lamp;
  context.fillRect(0, 0, layout.width, layout.height);

  if (artwork) {
    const box = layout.artwork;
    const { color, inset, width } = layout.frame;
    context.save();
    cardPath(context, box.x, box.y, box.width, box.height, layout.radius);
    context.clip();
    context.drawImage(artwork, box.x, box.y, box.width, box.height);
    context.restore();
    cardPath(
      context,
      box.x - inset,
      box.y - inset,
      box.width + inset * 2,
      box.height + inset * 2,
      layout.radius + inset,
    );
    context.strokeStyle = color;
    context.lineWidth = width;
    context.stroke();
  }

  const { x, y, width, height } = layout.placard;
  cardPath(context, x, y, width, height, layout.radius);
  context.fillStyle = "#efe6d8";
  context.fill();
  /* The label's brass head, clipped so it turns the corner with the card. */
  context.save();
  cardPath(context, x, y, width, height, layout.radius);
  context.clip();
  context.fillStyle = layout.topRule.color;
  context.fillRect(x, y, width, layout.topRule.height);
  context.restore();

  const spaced = "letterSpacing" in context;
  for (const line of layout.lines) {
    context.font = `${line.size}px ${line.font}`;
    context.fillStyle = line.color;
    context.textAlign = line.align;
    if (spaced) context.letterSpacing = `${line.tracking ?? 0}px`;
    context.fillText(line.text, line.x, line.y);
  }
  if (spaced) context.letterSpacing = "0px";
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
      <Button quiet onClick={() => void takePostcard()}>
        {giftShop.button(donated.number)}
      </Button>
      <p role="status" className="gift-shop-status">
        {status}
      </p>
    </div>
  );
}
