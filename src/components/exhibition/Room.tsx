import type { Exhibit } from "../../content/exhibits.ts";
import { Container } from "../layout/Container.tsx";
import { ExhibitArt } from "./art/ExhibitArt.tsx";
import { Placard } from "./Placard.tsx";
import "./Room.css";

interface RoomProps {
  exhibit: Exhibit;
  flip: boolean;
  isOpen: boolean;
  onToggle: () => void;
}

export function Room({ exhibit, flip, isOpen, onToggle }: RoomProps) {
  return (
    <article
      id={exhibit.id}
      className={`room room-${exhibit.number}${flip ? " room-flip" : ""}`}
      aria-labelledby={`${exhibit.id}-dish`}
    >
      <Container>
        <div className="room-grid">
          <ExhibitArt id={exhibit.id} lit={isOpen} />
          <div className="room-text">
            <Placard exhibit={exhibit} isOpen={isOpen} onToggle={onToggle} />
            <p className="curator-note">{exhibit.curatorNote}</p>
          </div>
        </div>
      </Container>
    </article>
  );
}
