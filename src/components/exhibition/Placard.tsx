import { motion, useReducedMotion } from "motion/react";
import type { KeyboardEvent } from "react";
import { useRef, useState } from "react";
import type { Exhibit } from "../../content/exhibits.ts";
import "./Placard.css";

const foldEase = [0.22, 1, 0.36, 1] as const;

interface PlacardProps {
  exhibit: Exhibit;
  isOpen: boolean;
  onToggle: () => void;
}

export function Placard({ exhibit, isOpen, onToggle }: PlacardProps) {
  const storyId = `${exhibit.id}-story`;
  const reducedMotion = useReducedMotion();
  const triggerRef = useRef<HTMLButtonElement>(null);
  // Only a direct close (this trigger, Escape) folds out; a spotlight swap unmounts at once.
  const [exiting, setExiting] = useState(false);

  function handleToggle() {
    if (isOpen && !reducedMotion) setExiting(true);
    onToggle();
  }

  function restoreTriggerFocus() {
    triggerRef.current?.focus();
  }

  function handleStoryKeyDown(event: KeyboardEvent) {
    if (event.key === "Escape" && isOpen) {
      restoreTriggerFocus();
      handleToggle();
    }
  }

  const showRegion = isOpen || exiting;

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
      <div className="placard-story" onKeyDown={handleStoryKeyDown}>
        <button
          ref={triggerRef}
          type="button"
          className="placard-toggle"
          aria-expanded={isOpen}
          aria-controls={isOpen ? storyId : undefined}
          onClick={handleToggle}
        >
          <span aria-hidden="true" className="placard-fold-mark" />
          Read the label
        </button>
        {showRegion ? (
          <motion.div
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
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
