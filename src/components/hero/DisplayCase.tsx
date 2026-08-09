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
            <linearGradient id="steam-soft" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="#efe6d8" stopOpacity="0" />
              <stop offset="45%" stopColor="#efe6d8" stopOpacity="0.5" />
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

          <rect x="50" y="232" width="160" height="16" fill="#0f0c0a" />
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

          <path
            className="steam-static"
            d="M132 176c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
            fill="none"
            stroke="#efe6d8"
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g
            fill="none"
            stroke="url(#steam-soft)"
            strokeLinecap="round"
            transform="translate(0 -14)"
          >
            <path
              className="steam-wisp"
              d="M120 192c-6-7-1-12 1-16 2-4 2.4-8-1-13"
              strokeWidth="5"
            />
            <path
              className="steam-wisp"
              d="M133 190c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
              strokeWidth="6"
            />
            <path
              className="steam-wisp"
              d="M146 192c5-7 1-12-1-16-2-4-2.2-8 1-13"
              strokeWidth="5"
            />
          </g>

          <path d="M10 10 L120 10 L40 290 L10 290 Z" fill="url(#case-glass)" />

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
