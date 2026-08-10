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
          className="placard-walk-step"
          /* The row shows the destination; the name still says the direction,
             and the visible text stays inside it (WCAG label in name). */
          aria-label={`Previous: CAT. ${prev.number} - ${prev.emotion.toUpperCase()}`}
          onClick={() => onWalk(prev.id)}
        >
          <span aria-hidden="true" className="placard-walk-arrow">
            &lt;-
          </span>
          <span className="placard-walk-label">
            <span>CAT. {prev.number}</span>
            <span className="placard-walk-room">
              {prev.emotion.toUpperCase()}
            </span>
          </span>
        </button>
      ) : null}
      {next ? (
        <button
          type="button"
          className="placard-walk-step placard-walk-next"
          aria-label={`Next: CAT. ${next.number} - ${next.emotion.toUpperCase()}`}
          onClick={() => onWalk(next.id)}
        >
          <span className="placard-walk-label">
            <span>CAT. {next.number}</span>
            <span className="placard-walk-room">
              {next.emotion.toUpperCase()}
            </span>
          </span>
          <span aria-hidden="true" className="placard-walk-arrow">
            -&gt;
          </span>
        </button>
      ) : null}
    </nav>
  );
}
