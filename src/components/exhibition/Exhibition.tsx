import { domAnimation, LazyMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { ExhibitId } from "../../content/exhibits.ts";
import { exhibits } from "../../content/exhibits.ts";
import { usePrintExpanded } from "../../hooks/usePrintExpanded.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import "./Exhibition.css";
import { RampExhibit } from "./RampExhibit.tsx";
import { Room } from "./Room.tsx";

export function Exhibition({
  registerWalk,
}: {
  registerWalk?: (walk: (id: ExhibitId) => void) => void;
}) {
  const [openRoomId, setOpenRoomId] = useState<ExhibitId | null>(null);
  const printing = usePrintExpanded();
  const anchor = useRef<{ id: ExhibitId; top: number } | null>(null);
  const pendingWalk = useRef<ExhibitId | null>(null);

  function roomToggle(id: ExhibitId) {
    return document.querySelector(`#${id} .placard-story > .placard-toggle`);
  }

  function toggleRoom(id: ExhibitId) {
    // Keep the clicked label under the visitor's eye. Engines disagree about
    // scroll anchoring - every one of them claims overflow-anchor support and
    // Firefox still does not anchor this swap - so measure and restore instead.
    const trigger = roomToggle(id);
    anchor.current = trigger
      ? { id, top: trigger.getBoundingClientRect().top }
      : null;
    setOpenRoomId(openRoomId === id ? null : id);
  }

  function landOnRoom(id: ExhibitId) {
    const placard = document.querySelector(`#${id} .placard`);
    if (!placard) return;
    const trigger = placard.querySelector<HTMLButtonElement>(".placard-toggle");
    const instant = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const clearance =
      parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) ||
      0;

    // Engines disagree about smooth scrollIntoView and late fonts can move the
    // label after the scroll starts, so keep nudging until it is really there.
    let tries = 0;
    const settle = () => {
      const drift = placard.getBoundingClientRect().top - clearance;
      if (Math.abs(drift) <= 4 || tries >= 4) return;
      tries += 1;
      window.scrollBy({
        top: drift,
        behavior: tries === 1 && !instant ? "smooth" : "auto",
      });
      window.setTimeout(settle, instant ? 0 : 240);
    };
    settle();
    trigger?.focus({ preventScroll: true });
  }

  function walkToRoom(id: ExhibitId) {
    anchor.current = null;
    // Walking to the already-open room (the guide allows it) still lands there.
    if (id === openRoomId) {
      landOnRoom(id);
      return;
    }
    pendingWalk.current = id;
    setOpenRoomId(id);
  }

  // The guide in the hero walks through the same mechanic.
  useEffect(() => {
    registerWalk?.(walkToRoom);
  });

  // Hold the clicked label still when a taller room collapses above it; after
  // a walk, land the opened label in view and focus its trigger instead.
  useLayoutEffect(() => {
    if (anchor.current) {
      const trigger = roomToggle(anchor.current.id);
      if (trigger) {
        const drift = trigger.getBoundingClientRect().top - anchor.current.top;
        if (Math.abs(drift) > 1) window.scrollBy(0, drift);
      }
      anchor.current = null;
    }
    if (pendingWalk.current) {
      landOnRoom(pendingWalk.current);
      pendingWalk.current = null;
    }
  }, [openRoomId]);

  return (
    <LazyMotion features={domAnimation} strict>
      <section
        id="exhibition"
        className="exhibition"
        aria-labelledby="exhibition-title"
      >
        <Container>
          <SectionHeading
            id="exhibition-title"
            eyebrow="On view"
            title="Current Exhibition"
          />
        </Container>
        <RampExhibit />
        {exhibits.map((exhibit, index) => (
          <Room
            key={exhibit.id}
            exhibit={exhibit}
            flip={index % 2 === 1}
            isOpen={printing || openRoomId === exhibit.id}
            prev={exhibits[index - 1]}
            next={exhibits[index + 1]}
            onToggle={() => toggleRoom(exhibit.id)}
            onWalk={walkToRoom}
          />
        ))}
      </section>
    </LazyMotion>
  );
}
