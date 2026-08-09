import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Exhibit, ExhibitId } from "../../content/exhibits.ts";
import "./Placard.css";
import { PlacardWalk } from "./PlacardWalk.tsx";

const foldEase = [0.22, 1, 0.36, 1] as const;

interface PlacardProps {
  exhibit: Exhibit;
  isOpen: boolean;
  prev?: Exhibit;
  next?: Exhibit;
  onToggle: () => void;
  onWalk: (id: ExhibitId) => void;
}

export function Placard({
  exhibit,
  isOpen,
  prev,
  next,
  onToggle,
  onWalk,
}: PlacardProps) {
  const storyId = `${exhibit.id}-story`;
  const reducedMotion = useReducedMotion();
  const placardRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Only a direct close (this trigger, Escape) folds out; a spotlight swap unmounts at once.
  const [exiting, setExiting] = useState(false);

  // The panel collapses after focus returns, and the shorter document can slide
  // the trigger under the sticky header. One check is not enough: the collapse
  // runs for a quarter second, and Firefox's scroll anchoring re-adjusts after
  // any single frame we could pick - so stand guard across the whole collapse.
  function keepTriggerInView() {
    const watch = (remaining: number) => {
      const trigger = triggerRef.current;
      const header = document.querySelector(".site-header-bar");
      if (trigger && header) {
        const headerBottom = header.getBoundingClientRect().bottom;
        if (trigger.getBoundingClientRect().top < headerBottom) {
          trigger.scrollIntoView({ block: "nearest", behavior: "instant" });
        }
      }
      if (remaining > 0) requestAnimationFrame(() => watch(remaining - 1));
    };
    requestAnimationFrame(() => watch(30));
  }

  function handleToggle() {
    if (isOpen && !reducedMotion) setExiting(true);
    onToggle();
  }

  // Window-level so Escape works even where a click does not focus the button (WebKit
  // leaves focus on body). Escape belongs to the reader's context: with focus in some
  // other control it must neither close the room nor steal focus or scroll.
  useEffect(() => {
    if (!isOpen) return;
    function closeOnEscape(event: WindowEventMap["keydown"]) {
      if (event.key !== "Escape") return;
      const active = document.activeElement;
      const inPlacard = Boolean(placardRef.current?.contains(active));
      if (!inPlacard && active !== document.body && active !== null) return;
      triggerRef.current?.focus({ preventScroll: true });
      handleToggle();
      keepTriggerInView();
    }
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  });

  const showRegion = isOpen || exiting;

  return (
    <div ref={placardRef} className="placard" data-surface="plaster">
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
          ref={triggerRef}
          type="button"
          className="placard-toggle"
          aria-describedby={`${exhibit.id}-dish`}
          aria-expanded={isOpen}
          aria-controls={isOpen ? storyId : undefined}
          onClick={() => {
            handleToggle();
            if (isOpen) keepTriggerInView();
          }}
        >
          <span aria-hidden="true" className="placard-fold-mark" />
          Read the label
        </button>
        {showRegion ? (
          <m.div
            id={storyId}
            className="placard-story-region"
            inert={!isOpen || undefined}
            style={
              reducedMotion
                ? undefined
                : { transformOrigin: "top", transformPerspective: 800 }
            }
            initial={
              reducedMotion ? { opacity: 0 } : { opacity: 0, rotateX: -72 }
            }
            animate={
              isOpen
                ? reducedMotion
                  ? { opacity: 1 }
                  : { opacity: 1, rotateX: 0 }
                : { opacity: 0, rotateX: -40 }
            }
            transition={
              reducedMotion
                ? { duration: 0.2 }
                : isOpen
                  ? {
                      duration: 0.48,
                      ease: foldEase,
                      opacity: { duration: 0.29, ease: "easeOut" },
                    }
                  : { duration: 0.24, ease: "easeOut" }
            }
            onAnimationComplete={() => setExiting(false)}
          >
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
            <PlacardWalk
              from={exhibit}
              prev={prev}
              next={next}
              onWalk={onWalk}
            />
          </m.div>
        ) : null}
      </div>
    </div>
  );
}
