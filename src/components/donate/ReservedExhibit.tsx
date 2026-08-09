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

/* The exhibit hangs on one side of the panel and everything written about it on
   the other, so the two are separate pieces rather than one stacked block. */
export function ExhibitFrame({ donated }: { donated: DonatedExhibit | null }) {
  return (
    <div className="reserved-frame" data-donated={donated ? "true" : undefined}>
      <ReservedScene
        revealed={Boolean(donated)}
        spec={donated ? generateSculpture(donated) : null}
      />
    </div>
  );
}

export function ExhibitPlacard({ draft, donated }: ReservedExhibitProps) {
  const shown = donated ?? draft;
  // Mid-word the catalog line would read "CAT. 007 - D"; the label waits for a
  // word before it claims one, and the donated line always shows what was given.
  const previewFeeling = shown.feeling.trim();
  const catalogLine = donated
    ? `CAT. ${donated.number} - ${donated.feeling.toUpperCase()}`
    : previewFeeling.length >= 3
      ? `CAT. ${reservedExhibit.number} - ${previewFeeling.toUpperCase()}`
      : `CAT. ${reservedExhibit.number} - ${reservedExhibit.title.toUpperCase()}`;
  const hasDraftBody = Boolean(
    shown.dish.trim() || shown.memory.trim() || shown.donorName.trim(),
  );

  return (
    <article
      className="placard reserved-placard"
      data-surface="plaster"
      data-donated={donated ? "true" : undefined}
      aria-labelledby="reserved-title"
    >
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
            <p className="reserved-donor">Gift of {donated.donorName}.</p>
          ) : shown.donorName.trim() ? (
            <p className="reserved-donor">Gift of {shown.donorName}.</p>
          ) : null}
        </>
      ) : (
        <p className="reserved-text">{reservedExhibit.placard}</p>
      )}
    </article>
  );
}
