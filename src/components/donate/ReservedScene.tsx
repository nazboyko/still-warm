import { SpotBeam } from "../art/SpotBeam.tsx";
import type { SculptureSpec } from "./exhibitSculpture.ts";
import { ExhibitTableau } from "./ExhibitTableau.tsx";

interface ReservedSceneProps {
  revealed: boolean;
  spec: SculptureSpec | null;
}

/* Reserved: a dotted conservation drawing of a covered dish. Donated: the
   cloche inks in, lifts away, and the visitor's own exhibit is underneath. */
export function ReservedScene({ revealed, spec }: ReservedSceneProps) {
  return (
    <svg viewBox="0 0 280 190" aria-hidden="true" data-revealed={revealed}>
      <defs>
        <linearGradient id="vd-cloche" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--brass)" }} />
          <stop offset="100%" stopColor="#241b13" />
        </linearGradient>
      </defs>

      {/* The same fixture the hero and every room has, so the last frame is
          lit by the same museum. */}
      <SpotBeam
        id="vd-beam"
        x={140}
        top={26}
        bottom={150}
        spread={46}
        opacity={0.12}
      />

      <g className="scene-sketch">
        <g
          fill="none"
          stroke="#efe6d8"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="1 6"
        >
          <ellipse cx="140" cy="142" rx="96" ry="15" />
          <path d="M76 138 A64 66 0 0 1 204 138" />
          <circle cx="140" cy="66" r="4" />
        </g>
        <g stroke="#efe6d8" strokeOpacity="0.25" strokeWidth="1">
          <line x1="140" y1="48" x2="140" y2="56" />
          <line x1="30" y1="142" x2="42" y2="142" />
          <line x1="238" y1="142" x2="250" y2="142" />
        </g>
      </g>

      {revealed && spec ? (
        <g className="scene-dish">
          <ExhibitTableau spec={spec} />
        </g>
      ) : null}

      {revealed ? (
        <g className="scene-cloche">
          <path d="M76 138 A64 66 0 0 1 204 138 Z" fill="url(#vd-cloche)" />
          <path
            d="M76 138 A64 66 0 0 1 204 138"
            fill="none"
            style={{ stroke: "var(--tungsten)" }}
            strokeOpacity="0.55"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle
            cx="140"
            cy="64"
            r="5"
            fill="url(#vd-cloche)"
            style={{ stroke: "var(--tungsten)" }}
            strokeOpacity="0.5"
            strokeWidth="1.5"
          />
        </g>
      ) : null}
    </svg>
  );
}
