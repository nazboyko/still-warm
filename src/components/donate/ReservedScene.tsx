import { VarenykDefs } from "../art/Varenyk.tsx";
import type { SculptureSpec } from "./exhibitSculpture.ts";
import { VisitorDish } from "./VisitorDish.tsx";

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
        <radialGradient id="reserved-glow" cx="50%" cy="68%" r="60%">
          <stop offset="0%" stopColor="#f2d9a8" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#e8a94e" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="vd-food" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="30%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="75%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <linearGradient id="vd-cloche" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--brass)" }} />
          <stop offset="100%" stopColor="#241b13" />
        </linearGradient>
        <radialGradient id="vd-scorch" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0.55"
          />
          <stop
            offset="60%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0.24"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0"
          />
        </radialGradient>
        <VarenykDefs id="vd" />
      </defs>

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
          <ellipse
            className="dish-glow"
            cx="140"
            cy="128"
            rx="118"
            ry="54"
            fill="url(#reserved-glow)"
          />
          <g className="dish-plate">
            <ellipse cx="140" cy="143" rx="88" ry="13" fill="#0f0c0a" />
            <path
              d="M52 142 A88 12 0 0 1 228 142"
              fill="none"
              stroke="#e8a94e"
              strokeOpacity="0.34"
              strokeWidth="1.5"
            />
            <ellipse cx="140" cy="142" rx="74" ry="8.5" fill="#181209" />
          </g>
          <VisitorDish spec={spec} />
          <g
            className="dish-steam"
            fill="none"
            stroke="#efe6d8"
            strokeOpacity="0.26"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M124 104c-6-7-1-12 1-16 2-4 2.4-8-1-13" />
            <path d="M152 100c6-7 1-12-1-16-2-4-2.2-8 1-13" />
            {spec.steam > 2 ? (
              <path d="M138 96c-5-6-1-10 1-13 2-3 2-7-1-11" />
            ) : null}
          </g>
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
