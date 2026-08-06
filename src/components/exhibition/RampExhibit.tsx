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
      </Container>
    </article>
  );
}
