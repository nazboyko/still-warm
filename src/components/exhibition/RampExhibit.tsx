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
      {/* The fixture that lights the entrance panel. Its own element, never a
          background on anything that holds text: axe cannot resolve a gradient
          behind a line and reports the contrast as undecided. */}
      <span className="ramp-light" aria-hidden="true" />
      <Container>
        <div className="ramp-wall">
          {/* Arriving from the footer link, the exhibit says "here" once. */}
          <span className="arrive-marker" aria-hidden="true" />
          <p className="placard-cat">
            CAT. {ramp.number} - {ramp.title.toUpperCase()}
          </p>
          <h3 id="ramp-title" className="ramp-title">
            {ramp.title}
          </h3>
          <p className="ramp-subtitle">{ramp.subtitle}</p>
          <p className="ramp-body">{ramp.body}</p>
        </div>
      </Container>
    </article>
  );
}
