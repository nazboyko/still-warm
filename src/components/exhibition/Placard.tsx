import type { Exhibit } from "../../content/exhibits.ts";
import "./Placard.css";

export function Placard({ exhibit }: { exhibit: Exhibit }) {
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
            (<span lang={exhibit.dishNative.lang}>
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
      <details className="placard-story">
        <summary>
          <span aria-hidden="true" className="placard-fold-mark" />
          Read the label
        </summary>
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
      </details>
    </div>
  );
}
