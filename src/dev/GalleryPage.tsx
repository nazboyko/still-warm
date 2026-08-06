import { useState } from "react";
import { Button } from "../components/ui/Button.tsx";
import { SectionHeading } from "../components/layout/SectionHeading.tsx";
import { Container } from "../components/layout/Container.tsx";
import { contrastRatio } from "../utils/contrast.ts";
import "./GalleryPage.css";

const PAIRS = [
  ["plaster", "ink", "body text"],
  ["ink", "plaster", "placard text"],
  ["beet", "plaster", "light-surface focus ring"],
  ["brass", "ink", "eyebrows and metadata"],
  ["tungsten", "ink", "dark-surface focus ring"],
] as const;

function readToken(name: string): string {
  return getComputedStyle(document.documentElement)
    .getPropertyValue(`--${name}`)
    .trim();
}

function usePalette() {
  const [tokens] = useState<Record<string, string>>(() => {
    const names = ["ink", "plaster", "tungsten", "beet", "brass"];
    return Object.fromEntries(names.map((n) => [n, readToken(n)]));
  });
  return tokens;
}

export function GalleryPage() {
  const palette = usePalette();
  const ratio = (fg: string, bg: string) => {
    const [a, b] = [palette[fg], palette[bg]];
    return a && b ? `${contrastRatio(a, b).toFixed(2)}:1` : "n/a";
  };

  return (
    <main className="gallery">
      <Container>
        <h1>Design gallery</h1>
        <p className="gallery-note">
          Dev-only reference for the After Hours foundation. Not shipped.
        </p>

        <section>
          <SectionHeading eyebrow="Tokens" title="Palette" />
          <ul className="gallery-swatches">
            {Object.entries(palette).map(([name, hex]) => (
              <li key={name}>
                <span className="gallery-chip" style={{ background: hex }} />
                <code>
                  {name} {hex}
                </code>
              </li>
            ))}
          </ul>
          <ul className="gallery-ratios">
            {PAIRS.map(([fg, bg, role]) => (
              <li key={`${fg}-${bg}-${role}`}>
                <code>
                  {fg} on {bg}
                </code>{" "}
                {ratio(fg, bg)} ({role})
              </li>
            ))}
          </ul>
        </section>

        <section>
          <SectionHeading eyebrow="Type" title="Scale" />
          <p className="gallery-display">Still Warm</p>
          <p className="gallery-h2">Current exhibition</p>
          <p className="gallery-body">
            Flour, potato, and a kitchen that no longer exists. The body face
            carries placard stories at a comfortable measure.
          </p>
          <p className="gallery-utility">CAT. 001 - HOMESICKNESS</p>
        </section>

        <section>
          <SectionHeading eyebrow="Surfaces" title="Focus rings" />
          <p className="gallery-note">
            Tab through: tungsten ring on ink, beet ring on plaster.
          </p>
          <div className="gallery-surfaces">
            <div className="gallery-surface-ink">
              <Button>On ink</Button>
            </div>
            <div className="gallery-surface-plaster" data-surface="plaster">
              <Button>On plaster</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
