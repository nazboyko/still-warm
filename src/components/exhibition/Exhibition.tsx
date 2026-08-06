import { useLayoutEffect, useRef, useState } from "react";
import type { ExhibitId } from "../../content/exhibits.ts";
import { exhibits } from "../../content/exhibits.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import "./Exhibition.css";
import { RampExhibit } from "./RampExhibit.tsx";
import { Room } from "./Room.tsx";

export function Exhibition() {
  const [openRoomId, setOpenRoomId] = useState<ExhibitId | null>(null);
  const scrollCompensation = useRef(0);
  const pendingWalk = useRef<ExhibitId | null>(null);

  function toggleRoom(id: ExhibitId) {
    const next = openRoomId === id ? null : id;
    if (openRoomId && next) {
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

  function walkToRoom(id: ExhibitId) {
    pendingWalk.current = id;
    setOpenRoomId(id);
  }

  // Keep the clicked room visually still when a taller room collapses above it;
  // after a walk, land the opened label comfortably in view and focus its trigger.
  useLayoutEffect(() => {
    if (scrollCompensation.current) {
      window.scrollBy(0, -scrollCompensation.current);
      scrollCompensation.current = 0;
    }
    if (pendingWalk.current) {
      const placard = document.querySelector(
        `#${pendingWalk.current} .placard`,
      );
      const trigger =
        placard?.querySelector<HTMLButtonElement>(".placard-toggle");
      const instantScroll = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      placard?.scrollIntoView({
        behavior: instantScroll ? "auto" : "smooth",
        block: "start",
      });
      trigger?.focus({ preventScroll: true });
      pendingWalk.current = null;
    }
  }, [openRoomId]);

  return (
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
          isOpen={openRoomId === exhibit.id}
          prev={exhibits[index - 1]}
          next={exhibits[index + 1]}
          onToggle={() => toggleRoom(exhibit.id)}
          onWalk={walkToRoom}
        />
      ))}
    </section>
  );
}
