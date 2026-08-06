import { reservedExhibit } from "../../content/exhibits.ts";
import "./ReservedExhibit.css";

export function ReservedExhibit() {
  return (
    <article className="reserved" aria-labelledby="reserved-title">
      <div className="reserved-frame">
        <svg viewBox="0 0 280 190" aria-hidden="true">
          <g
            fill="none"
            stroke="#efe6d8"
            strokeOpacity="0.4"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="1 6"
          >
            <ellipse cx="140" cy="142" rx="96" ry="15" />
            <path d="M76 138 A64 66 0 0 1 204 138" />
            <circle cx="140" cy="66" r="4" />
          </g>
          <g stroke="#efe6d8" strokeOpacity="0.25" strokeWidth="1">
            <line x1="140" y1="48" x2="140" y2="56" />
            <line x1="30" y1="142" x2="42" y2="142" />
            <line x1="238" y1="142" x2="250" y2="142" />
          </g>
        </svg>
      </div>
      <div className="placard reserved-placard" data-surface="plaster">
        <h3 id="reserved-title" className="placard-cat">
          CAT. {reservedExhibit.number} - {reservedExhibit.title.toUpperCase()}
        </h3>
        <p className="reserved-text">{reservedExhibit.placard}</p>
      </div>
    </article>
  );
}
