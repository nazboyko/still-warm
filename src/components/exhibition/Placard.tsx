import { m, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Exhibit, ExhibitId } from "../../content/exhibits.ts";
import "./Placard.css";
import { PlacardWalk } from "./PlacardWalk.tsx";

const foldEase = [0.22, 1, 0.36, 1] as const;

/* What the label says once it is open, shared by the unfolding panel and the
   static one the booklet prints. */
function PlacardStory({
  exhibit,
  prev,
  next,
  onWalk,
}: {
  exhibit: Exhibit;
  prev?: Exhibit;
  next?: Exhibit;
  onWalk: (id: ExhibitId) => void;
}) {
  return (
    <>
      <p>{exhibit.story}</p>
      <p className="placard-sensory">
        {exhibit.sensoryNative ? (
          <span lang={exhibit.sensoryNative.lang}>
            {exhibit.sensoryNative.text}
          </span>
        ) : null}
        <span>{exhibit.sensory}</span>
      </p>
      <PlacardWalk from={exhibit} prev={prev} next={next} onWalk={onWalk} />
    </>
  );
}

interface PlacardProps {
  exhibit: Exhibit;
  isOpen: boolean;
  /* The booklet renders the open label statically; screens animate it. */
  printing?: boolean;
  prev?: Exhibit;
  next?: Exhibit;
  onToggle: () => void;
  onWalk: (id: ExhibitId) => void;
}

export function Placard({
  exhibit,
  isOpen,
  printing = false,
  prev,
  next,
  onToggle,
  onWalk,
}: PlacardProps) {
  const storyId = `${exhibit.id}-story`;
  const reducedMotion = useReducedMotion();
  const placardRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const guardRef = useRef<number | null>(null);
  // Only a direct close (this trigger, Escape) folds out; a spotlight swap unmounts at once.
  const [exiting, setExiting] = useState(false);

  // The panel collapses after focus returns, and the shorter document can slide
  // the trigger under the sticky header. One check is not enough: the collapse
  // runs for a quarter second, and Firefox's scroll anchoring re-adjusts after
  // any single frame we could pick - so stand guard across the whole collapse.
  function keepTriggerInView() {
    // One guard at a time. Left to overlap, consecutive closes each keep their
    // own watch running and correct against each other - the same accumulating
    // correction that has bitten this page three times.
    if (guardRef.current !== null) cancelAnimationFrame(guardRef.current);
    // Whose label this is, decided once before the collapse moves anything: a
    // trigger still on screen, or one holding focus because a panel just handed
    // it back (WCAG 2.4.11). A label the reader has already walked past keeps
    // its distance - scrolling the page back to it is the jump this page bans.
    const start = triggerRef.current?.getBoundingClientRect();
    const watched =
      document.activeElement === triggerRef.current ||
      (start !== undefined && start.bottom > 0 && start.top < innerHeight);
    if (!watched) return;
    const watch = (clear: number, cap: number) => {
      const trigger = triggerRef.current;
      const header = document.querySelector(".site-header-bar");
      let settled = clear;
      if (trigger && header) {
        const headerBottom = header.getBoundingClientRect().bottom;
        if (trigger.getBoundingClientRect().top < headerBottom) {
          trigger.scrollIntoView({ block: "nearest", behavior: "instant" });
          settled = 0;
        } else {
          settled += 1;
        }
      }
      // Stand down once the trigger has been clear across the whole collapse.
      guardRef.current =
        settled < 20 && cap > 0
          ? requestAnimationFrame(() => watch(settled, cap - 1))
          : null;
    };
    guardRef.current = requestAnimationFrame(() => watch(0, 40));
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
    <div
      ref={placardRef}
      className="placard"
      data-surface="plaster"
      data-open={isOpen ? "true" : undefined}
    >
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
        {/* A booklet is not an animation. Motion writes opacity and transform
            inline, and the browser takes its print snapshot as soon as
            beforeprint returns - mid-unfold, which printed the story at 0.57
            opacity and tilted 17 degrees. Printing renders the finished
            state instead, with nothing to catch halfway. */}
        {printing ? (
          <div id={storyId} className="placard-story-region">
            <PlacardStory
              exhibit={exhibit}
              prev={prev}
              next={next}
              onWalk={onWalk}
            />
          </div>
        ) : showRegion ? (
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
            <PlacardStory
              exhibit={exhibit}
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
