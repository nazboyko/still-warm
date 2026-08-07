import type {
  DonatedExhibit,
  ExhibitSubmission,
} from "../../content/donate.ts";
import { reservedExhibit } from "../../content/exhibits.ts";
import { generateSculpture } from "./exhibitSculpture.ts";
import "./ReservedExhibit.css";
import { ReservedScene } from "./ReservedScene.tsx";

interface ReservedExhibitProps {
  draft: ExhibitSubmission;
  donated: DonatedExhibit | null;
}

export function ReservedExhibit({ draft, donated }: ReservedExhibitProps) {
  const shown = donated ?? draft;
  const catalogLine = donated
    ? `CAT. VISITOR-${donated.number} - ${donated.feeling.toUpperCase()}`
    : shown.feeling.trim()
      ? `CAT. ${reservedExhibit.number} - ${shown.feeling.toUpperCase()}`
      : `CAT. ${reservedExhibit.number} - ${reservedExhibit.title.toUpperCase()}`;
  const hasDraftBody = Boolean(
    shown.dish.trim() || shown.memory.trim() || shown.donorName.trim(),
  );

  return (
    <article
      className="reserved"
      data-donated={donated ? "true" : undefined}
      aria-labelledby="reserved-title"
    >
      <div className="reserved-frame">
        <ReservedScene
          revealed={Boolean(donated)}
          spec={donated ? generateSculpture(donated) : null}
        />
      </div>
      <div className="placard reserved-placard" data-surface="plaster">
        <h3 id="reserved-title" className="placard-cat">
          {catalogLine}
        </h3>
        {donated || hasDraftBody ? (
          <>
            {shown.dish.trim() ? (
              <p className="reserved-dish">{shown.dish}</p>
            ) : null}
            {shown.memory.trim() ? (
              <p className="reserved-text">{shown.memory}</p>
            ) : null}
            {donated ? (
              <p className="reserved-donor">Donated by {donated.donorName}.</p>
            ) : shown.donorName.trim() ? (
              <p className="reserved-donor">Donated by {shown.donorName}.</p>
            ) : null}
          </>
        ) : (
          <p className="reserved-text">{reservedExhibit.placard}</p>
        )}
      </div>
    </article>
  );
}
