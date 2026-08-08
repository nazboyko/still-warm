import { createElement } from "react";
import { flushSync } from "react-dom";
import { createRoot } from "react-dom/client";
import type { SculptureSpec } from "./exhibitSculpture.ts";
import { ExhibitTableau } from "./ExhibitTableau.tsx";

/* The tableau leans on the page's custom properties; a data-URL SVG rasterizes
   in its own document and inherits none of them, so the tokens ride inside.
   The literals mirror tokens.css for environments with no computed styles. */
const tokenFallback: Record<string, string> = {
  plaster: "#efe6d8",
  tungsten: "#e8a94e",
  beet: "#7a2e35",
  brass: "#9c8154",
  "gold-light": "#f2d9a8",
  toast: "#c08238",
  "toast-deep": "#8a6230",
  syrup: "#7a4a26",
};

function inlineTokens(): string {
  const computed =
    typeof getComputedStyle === "function"
      ? getComputedStyle(document.documentElement)
      : null;
  return Object.entries(tokenFallback)
    .map(([name, fallback]) => {
      const live = computed?.getPropertyValue(`--${name}`).trim();
      return `--${name}: ${live || fallback}`;
    })
    .join("; ");
}

export function exhibitSvgDataUrl(spec: SculptureSpec): string {
  // Rendered synchronously into a detached root: the client renderer is
  // already in the bundle, where the server serializer would cost 59KB gzip.
  const host = document.createElement("div");
  const root = createRoot(host);
  flushSync(() => {
    root.render(
      createElement(
        "svg",
        { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 280 190" },
        createElement("style", null, `svg { ${inlineTokens()} }`),
        createElement(ExhibitTableau, { spec }),
      ),
    );
  });
  const markup = host.innerHTML;
  root.unmount();
  return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(markup)))}`;
}
