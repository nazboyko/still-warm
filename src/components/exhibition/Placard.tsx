import type { Exhibit } from "../../content/exhibits.ts";
import "./Placard.css";

interface PlacardProps {
  exhibit: Exhibit;
  isOpen: boolean;
  onToggle: () => void;
}

export function Placard({ exhibit, isOpen, onToggle }: PlacardProps) {
  const storyId = `${exhibit.id}-story`;
  return (
    <div className="placard" data-surface="plaster">
      <p className="placard-cat">
        CAT. {exhibit.number} - {exhibit.emotion.toUpperCase()}
      </p>
      <h3 id={`${exhibit.id}-dish`} className="placard-dish">
        {exhibit.dish}
        {exhibit.dishNative ? (
          <>
            {" "}
            (
            <span lang={exhibit.dishNative.lang}>
              {exhibit.dishNative.text}
            </span>
            )
          </>
        ) : null}
      </h3>
      <dl className="placard-fields">
        <div>
          <dt>Medium</dt>
          <dd>{exhibit.medium}</dd>
        </div>
        <div>
          <dt>Provenance</dt>
          <dd>{exhibit.provenance}</dd>
        </div>
      </dl>
      <div className="placard-story">
        <button
          type="button"
          className="placard-toggle"
          aria-expanded={isOpen}
          aria-controls={isOpen ? storyId : undefined}
          onClick={onToggle}
        >
          <span aria-hidden="true" className="placard-fold-mark" />
          Read the label
        </button>
        {isOpen ? (
          <div id={storyId} className="placard-story-region">
            <p>{exhibit.story}</p>
            <p className="placard-sensory">
              {exhibit.sensoryNative ? (
                <>
                  <span lang={exhibit.sensoryNative.lang}>
                    {exhibit.sensoryNative.text}
                  </span>{" "}
                  /{" "}
                </>
              ) : null}
              {exhibit.sensory}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
