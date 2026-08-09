import { useRef } from "react";
import { useInView } from "../../hooks/useInView.ts";
import { SpotBeam } from "../art/SpotBeam.tsx";
import "../../styles/steam.css";
import "./DisplayCase.css";
import { HeroVarenyky } from "./HeroVarenyky.tsx";

export function DisplayCase() {
  const scene = useRef<HTMLDivElement>(null);
  const visible = useInView(scene);
  return (
    <figure className="display-case">
      <div
        ref={scene}
        className="display-case-scene"
        data-steam={visible ? "live" : "paused"}
      >
        <svg
          viewBox="0 0 260 320"
          role="img"
          aria-label="Golden varenyky under glass in a lit museum display case"
        >
          <defs>
            <linearGradient id="case-wall" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#241b13" />
              <stop offset="100%" stopColor="#191411" />
            </linearGradient>
            <radialGradient id="case-glow" cx="50%" cy="68%" r="60%">
              <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.5" />
              <stop offset="55%" stopColor="#e8a94e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
            </radialGradient>
            {/* Warmer and brighter than the beam it rises through: at plaster
                weight the vapour sat darker than the lit air and read as
                smoke coming off the dish. */}
            <linearGradient id="steam-soft" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#fff8ea" stopOpacity="0" />
              <stop offset="45%" stopColor="#fff8ea" stopOpacity="0.34" />
              <stop offset="100%" stopColor="#fff8ea" stopOpacity="0.66" />
            </linearGradient>
            <linearGradient id="case-cloche" x1="0" y1="0" x2="0.15" y2="1">
              <stop offset="0%" stopColor="#d2ab6b" />
              <stop offset="55%" stopColor="#8a6f45" />
              <stop offset="100%" stopColor="#2b2016" />
            </linearGradient>
            <linearGradient id="case-sheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#efe6d8" stopOpacity="0" />
              <stop offset="50%" stopColor="#efe6d8" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#efe6d8" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="case-glass" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#efe6d8" stopOpacity="0.12" />
              <stop offset="45%" stopColor="#efe6d8" stopOpacity="0.03" />
              <stop offset="100%" stopColor="#efe6d8" stopOpacity="0" />
            </linearGradient>
          </defs>

          <rect
            x="10"
            y="10"
            width="240"
            height="280"
            fill="url(#case-wall)"
            stroke="#9c8154"
            strokeWidth="1.5"
          />
          <g className="case-light">
            <SpotBeam
              id="case-beam"
              x={130}
              top={26}
              bottom={218}
              spread={56}
              opacity={0.12}
            />
            <ellipse
              cx="130"
              cy="212"
              rx="100"
              ry="74"
              fill="url(#case-glow)"
            />
          </g>

          {/* The plinth rises and the dish grows, so the food sits in the
              middle of the pool rather than at the bottom edge of it. */}
          <g transform="translate(130 236) scale(1.16) translate(-130 -236) translate(0 -14)">
            <rect x="50" y="232" width="160" height="16" fill="#0f0c0a" />
            {/* A lit top edge, so the plinth reads as a block with a front
                face rather than a flat shape cut out of the dark. */}
            <rect x="50" y="232" width="160" height="1.2" fill="#8a6f45" />
            <ellipse cx="130" cy="232" rx="76" ry="13" fill="#0f0c0a" />
            <ellipse
              cx="130"
              cy="228"
              rx="70"
              ry="10"
              fill="#120e0b"
              stroke="#e8a94e"
              strokeOpacity="0.3"
              strokeWidth="1"
            />
            <HeroVarenyky />
          </g>

          {/* Between the dish and the lid held above it, which is where the
              steam of an uncovered dish actually goes. */}
          <path
            className="steam-static"
            d="M132 176c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
            fill="none"
            stroke="#fff8ea"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
            transform="translate(0 -20)"
          />
          <g
            fill="none"
            stroke="url(#steam-soft)"
            strokeLinecap="round"
            transform="translate(0 -22)"
          >
            <path
              className="steam-wisp"
              d="M120 192c-6-7-1-12 1-16 2-4 2.4-8-1-13"
              strokeWidth="3.4"
            />
            <path
              className="steam-wisp"
              d="M133 190c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
              strokeWidth="4"
            />
            <path
              className="steam-wisp"
              d="M146 192c5-7 1-12-1-16-2-4-2.2-8 1-13"
              strokeWidth="3.4"
            />
          </g>

          {/* The lid, lifted and held. Static on purpose: the hero shows a dish
              that has been uncovered, and the act of uncovering belongs to the
              donation finale, where it means something. */}
          <g className="case-cloche">
            <path d="M86 136 A44 38 0 0 1 174 136 Z" fill="url(#case-cloche)" />
            <path
              d="M86 136 A44 38 0 0 1 174 136"
              fill="none"
              stroke="#e8a94e"
              strokeOpacity="0.55"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <ellipse
              cx="130"
              cy="136"
              rx="44"
              ry="5.5"
              fill="url(#case-cloche)"
              stroke="#e8a94e"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
            <line
              x1="130"
              y1="99"
              x2="130"
              y2="93"
              stroke="#9c8154"
              strokeWidth="2"
            />
            <circle
              cx="130"
              cy="90"
              r="4"
              fill="url(#case-cloche)"
              stroke="#e8a94e"
              strokeOpacity="0.5"
              strokeWidth="1.4"
            />
          </g>

          <path d="M10 10 L120 10 L40 290 L10 290 Z" fill="url(#case-glass)" />
          {/* One diagonal across the upper corner, so the front reads as glass. */}
          <path
            d="M164 12 L232 12 L112 152 L78 152 Z"
            fill="url(#case-sheen)"
          />

          <rect x="2" y="290" width="256" height="20" fill="#120e0b" />
          <line
            x1="2"
            y1="290"
            x2="258"
            y2="290"
            stroke="#9c8154"
            strokeWidth="1"
          />
        </svg>
      </div>
      <figcaption className="display-case-label">
        CAT. 001 - HOMESICKNESS
      </figcaption>
    </figure>
  );
}
