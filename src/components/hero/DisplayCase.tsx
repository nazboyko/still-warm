import { useRef } from "react";
import { useInView } from "../../hooks/useInView.ts";
import "./DisplayCase.css";

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
            <linearGradient id="case-cone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.11" />
              <stop offset="70%" stopColor="#e8a94e" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#e8a94e" stopOpacity="0.01" />
            </linearGradient>
            <linearGradient id="case-dough" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
              <stop offset="55%" style={{ stopColor: "var(--tungsten)" }} />
              <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
            </linearGradient>
            <radialGradient id="case-dough-light" cx="50%" cy="40%" r="60%">
              <stop
                offset="0%"
                style={{ stopColor: "var(--gold-light)" }}
                stopOpacity="0.9"
              />
              <stop
                offset="100%"
                style={{ stopColor: "var(--gold-light)" }}
                stopOpacity="0"
              />
            </radialGradient>
            <radialGradient id="case-dish-shadow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
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
            <path
              d="M130 12 C110 90 88 160 74 218 H186 C172 160 150 90 130 12 Z"
              fill="url(#case-cone)"
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

          <ellipse
            cx="130"
            cy="227"
            rx="66"
            ry="9"
            fill="url(#case-dish-shadow)"
          />
          <g fill="url(#case-dough)">
            <path d="M72 224 A26 26 0 0 1 124 224 Q98 232 72 224 Z" />
            <path d="M106 222 A30 30 0 0 1 166 222 Q136 231 106 222 Z" />
            <path d="M152 225 A22 22 0 0 1 196 225 Q174 232 152 225 Z" />
          </g>
          <g fill="url(#case-dough-light)">
            <ellipse cx="101" cy="208" rx="15" ry="8" />
            <ellipse cx="134" cy="201" rx="18" ry="9" />
            <ellipse cx="171" cy="212" rx="12" ry="7" />
          </g>
          <g
            fill="none"
            style={{ stroke: "var(--toast-deep)" }}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeOpacity="0.85"
          >
            <path d="M77 217 a8 8 0 0 1 8 -9 a8 8 0 0 1 11 -4 a8 8 0 0 1 11 3 a8 8 0 0 1 8 9" />
            <path d="M110 215 a9 9 0 0 1 7 -11 a9 9 0 0 1 12 -6 a9 9 0 0 1 12 2 a9 9 0 0 1 10 7 a9 9 0 0 1 6 9" />
            <path d="M157 217 a7 7 0 0 1 7 -8 a7 7 0 0 1 10 -3 a7 7 0 0 1 10 3 a7 7 0 0 1 7 8" />
          </g>
          <g
            fill="none"
            style={{ stroke: "var(--gold-light)" }}
            strokeOpacity="0.8"
            strokeWidth="1.6"
            strokeLinecap="round"
          >
            <path d="M88 206 A26 26 0 0 1 106 200" />
            <path d="M122 198 A30 30 0 0 1 142 194" />
            <path d="M162 210 A22 22 0 0 1 176 206" />
          </g>

          <path
            className="steam-static"
            d="M132 188c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
            fill="none"
            stroke="#efe6d8"
            strokeOpacity="0.3"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g fill="none" stroke="url(#steam-soft)" strokeLinecap="round">
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
