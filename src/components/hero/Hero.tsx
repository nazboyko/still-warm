import type { ExhibitId } from "../../content/exhibits.ts";
import { Container } from "../layout/Container.tsx";
import "../ui/Button.css";
import { DisplayCase } from "./DisplayCase.tsx";
import "./Hero.css";
import { RoomGuide } from "./RoomGuide.tsx";

export function Hero({
  onGuideChoose,
}: {
  onGuideChoose: (id: ExhibitId) => void;
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-grid">
          <div className="hero-copy">
            <p className="hero-eyebrow">The Museum of Comfort</p>
            <h1 id="hero-title" className="hero-title">
              Still Warm
            </h1>
            <p className="hero-thesis">
              An exhibition of dishes that taste like home.
            </p>
            <a className="button hero-cta" href="#exhibition">
              Enter the exhibition
            </a>
            <RoomGuide onChoose={onGuideChoose} />
          </div>
          <DisplayCase />
        </div>
      </Container>
    </section>
  );
}
