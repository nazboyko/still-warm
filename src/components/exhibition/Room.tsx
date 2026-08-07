import { useRef } from "react";
import type { Exhibit, ExhibitId } from "../../content/exhibits.ts";
import { useInView } from "../../hooks/useInView.ts";
import "../../styles/steam.css";
import { Container } from "../layout/Container.tsx";
import { ExhibitArt } from "./art/ExhibitArt.tsx";
import { Placard } from "./Placard.tsx";
import "./Room.css";

interface RoomProps {
  exhibit: Exhibit;
  flip: boolean;
  isOpen: boolean;
  prev?: Exhibit;
  next?: Exhibit;
  onToggle: () => void;
  onWalk: (id: ExhibitId) => void;
}

export function Room({
  exhibit,
  flip,
  isOpen,
  prev,
  next,
  onToggle,
  onWalk,
}: RoomProps) {
  const room = useRef<HTMLElement>(null);
  const inView = useInView(room);
  return (
    <article
      ref={room}
      id={exhibit.id}
      className={`room room-${exhibit.number}${flip ? " room-flip" : ""}`}
      aria-labelledby={`${exhibit.id}-dish`}
    >
      <Container>
        <div className="room-grid">
          <ExhibitArt id={exhibit.id} lit={isOpen} steaming={inView} />
          <div className="room-text">
            <Placard
              exhibit={exhibit}
              isOpen={isOpen}
              prev={prev}
              next={next}
              onToggle={onToggle}
              onWalk={onWalk}
            />
            <p className="curator-note">{exhibit.curatorNote}</p>
          </div>
        </div>
      </Container>
    </article>
  );
}
