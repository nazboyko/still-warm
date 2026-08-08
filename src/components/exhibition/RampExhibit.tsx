import { ramp } from "../../content/ramp.ts";
import { Container } from "../layout/Container.tsx";
import "./RampExhibit.css";

export function RampExhibit() {
  return (
    <article
      id="exhibit-000"
      className="ramp-exhibit"
      aria-labelledby="ramp-title"
    >
      <Container>
        <div className="ramp-placard-wrap">
          {/* Arriving from the footer link, the exhibit says "here" once. */}
          <span className="arrive-marker" aria-hidden="true" />
          <div className="placard ramp-placard" data-surface="plaster">
            <p className="placard-cat">
              CAT. {ramp.number} - {ramp.title.toUpperCase()}
            </p>
            <h3 id="ramp-title" className="placard-dish">
              {ramp.title}
            </h3>
            <p className="ramp-subtitle">{ramp.subtitle}</p>
            <p className="ramp-body">{ramp.body}</p>
          </div>
        </div>
      </Container>
    </article>
  );
}
