import { useState } from "react";
import type { DonatedExhibit } from "../../content/donate.ts";
import { donateStatus, giftShop, postcardCard } from "../../content/donate.ts";
import { Button } from "../ui/Button.tsx";
import "./GiftShop.css";
import type { PostcardLayout } from "./postcardLayout.ts";
import { layoutPostcard } from "./postcardLayout.ts";

function drawPostcard(
  context: CanvasRenderingContext2D,
  layout: PostcardLayout,
) {
  context.fillStyle = layout.background;
  context.fillRect(0, 0, layout.width, layout.height);
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
    `CAT. VISITOR-${exhibit.number} - ${exhibit.feeling.toUpperCase()}`,
    exhibit.dish,
    exhibit.memory,
    `Donated by ${exhibit.donorName}. ${postcardCard.collectedPrefix} ${exhibit.collectedOn}.`,
    `${postcardCard.lockupName} - ${postcardCard.lockupSub} - ${postcardCard.url}`,
  ].join("\n");
  downloadBlob(
    new Blob([text], { type: "text/plain" }),
    postcardCard.fileName.replace(".png", ".txt"),
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
  drawPostcard(context, layout);
  return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
}

export function GiftShop({ donated }: { donated: DonatedExhibit }) {
  const [status, setStatus] = useState("");

  async function takePostcard() {
    try {
      const blob = await renderPostcardBlob(donated);
      if (blob) {
        downloadBlob(blob, postcardCard.fileName);
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
      <Button onClick={() => void takePostcard()}>{giftShop.button}</Button>
      <p role="status" className="gift-shop-status">
        {status}
      </p>
    </div>
  );
}
