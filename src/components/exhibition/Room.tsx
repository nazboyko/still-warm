import type { Exhibit } from "../../content/exhibits.ts";
import { Container } from "../layout/Container.tsx";
import { ExhibitArt } from "./art/ExhibitArt.tsx";
import { Placard } from "./Placard.tsx";
import "./Room.css";

export function Room({ exhibit, flip }: { exhibit: Exhibit; flip: boolean }) {
  return (
    <article
      id={exhibit.id}
      className={`room room-${exhibit.number}${flip ? " room-flip" : ""}`}
      aria-labelledby={`${exhibit.id}-dish`}
    >
      <Container>
        <div className="room-grid">
          <ExhibitArt id={exhibit.id} />
          <div className="room-text">
            <Placard exhibit={exhibit} />
            <p className="curator-note">{exhibit.curatorNote}</p>
          </div>
        </div>
      </Container>
    </article>
  );
}
