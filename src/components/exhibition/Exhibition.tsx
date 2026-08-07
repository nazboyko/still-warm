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
  const scrollCompensation = useRef(0);
  const pendingWalk = useRef<ExhibitId | null>(null);

  function toggleRoom(id: ExhibitId) {
    const next = openRoomId === id ? null : id;
    // Engines with scroll anchoring keep the clicked room still on their own.
    const browserAnchors = CSS.supports("overflow-anchor", "auto");
    if (openRoomId && next && !browserAnchors) {
      const closingStory = document.getElementById(`${openRoomId}-story`);
      const closingRoom = document.getElementById(openRoomId);
      const openingRoom = document.getElementById(next);
      const closesAbove =
        closingRoom &&
        openingRoom &&
        closingRoom.getBoundingClientRect().top <
          openingRoom.getBoundingClientRect().top;
      if (closingStory && closesAbove) {
        scrollCompensation.current = closingStory.offsetHeight;
      }
    }
    setOpenRoomId(next);
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

  // Keep the clicked room visually still when a taller room collapses above it;
  // after a walk, land the opened label comfortably in view and focus its trigger.
  useLayoutEffect(() => {
    if (scrollCompensation.current) {
      window.scrollBy(0, -scrollCompensation.current);
      scrollCompensation.current = 0;
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
