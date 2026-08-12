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
  const holdRef = useRef<number | null>(null);

  // Anchor on the room, never on the label inside it. The placard rises 10px
  // on arrival, and holding the label still through that would turn its
  // entrance into a 10px scroll of the whole page - the correction fighting an
  // animation instead of the reflow it exists to cancel. The room block is not
  // animated, and the label is rigid inside it, so keeping the room still
  // keeps the label still without touching the arrival.
  function roomBlock(id: ExhibitId) {
    return document.getElementById(id);
  }

  function toggleRoom(id: ExhibitId) {
    const closing = openRoomId === id;
    // Only a swap collapses another room, which can drag this one up the page.
    // Keep the clicked label under the visitor's eye there, because engines
    // disagree about scroll anchoring - every one claims overflow-anchor
    // support and Firefox still does not anchor that swap.
    // Opening or closing a single room changes nothing above its own trigger,
    // so there is nothing to correct, and correcting anyway meant every press
    // scrolled the page by whatever a sub-pixel reflow happened to measure -
    // a few pixels an engine at a time, adding up with every toggle.
    const swapping = openRoomId !== null && !closing;
    const block = swapping ? roomBlock(id) : null;
    anchor.current = block
      ? { id, top: block.getBoundingClientRect().top }
      : null;
    setOpenRoomId(closing ? null : id);
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
      const held = anchor.current;
      // Correct until the layout has actually come to rest, not for a fixed
      // count of frames: on a slow machine the closing room is still shrinking
      // when any fixed budget runs out, and whatever collapses after the last
      // correction is drift the visitor keeps. Rest means six quiet frames in
      // a row; the cap only exists so nothing runs forever.
      const hold = (quiet: number, cap: number) => {
        const block = roomBlock(held.id);
        let settled = quiet;
        if (block) {
          const drift = block.getBoundingClientRect().top - held.top;
          // Instant, never smooth: the page's smooth scrolling would animate
          // this into exactly the drift it exists to cancel.
          if (Math.abs(drift) > 1) {
            window.scrollBy({ top: drift, behavior: "instant" });
            settled = 0;
          } else {
            settled += 1;
          }
        }
        holdRef.current =
          settled < 6 && cap > 0
            ? requestAnimationFrame(() => hold(settled, cap - 1))
            : null;
      };
      // One hold at a time: left to overlap, a second toggle's correction runs
      // against the first and the two chase each other for as long as both
      // live, which is scrolling that never comes to rest.
      if (holdRef.current !== null) cancelAnimationFrame(holdRef.current);
      holdRef.current = requestAnimationFrame(() => hold(0, 90));
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
            printing={printing}
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
