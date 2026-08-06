import type { Exhibit, ExhibitId } from "../../content/exhibits.ts";
import "./PlacardWalk.css";

interface PlacardWalkProps {
  from: Exhibit;
  prev?: Exhibit;
  next?: Exhibit;
  onWalk: (id: ExhibitId) => void;
}

export function PlacardWalk({ from, prev, next, onWalk }: PlacardWalkProps) {
  if (!prev && !next) return null;
  return (
    <nav className="placard-walk" aria-label={`Walk from Room ${from.number}`}>
      {prev ? (
        <button
          type="button"
          className="placard-toggle"
          onClick={() => onWalk(prev.id)}
        >
          Previous: CAT. {prev.number} - {prev.emotion.toUpperCase()}
        </button>
      ) : null}
      {next ? (
        <button
          type="button"
          className="placard-toggle placard-walk-next"
          onClick={() => onWalk(next.id)}
        >
          Next: CAT. {next.number} - {next.emotion.toUpperCase()}
        </button>
      ) : null}
    </nav>
  );
}
