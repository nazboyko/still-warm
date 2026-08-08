import { VarenykDefs } from "../art/Varenyk.tsx";
import type { SculptureSpec } from "./exhibitSculpture.ts";
import { VisitorDish } from "./VisitorDish.tsx";

/* The exhibit as a catalogue photograph: glow, plate, dish, steam. One tableau,
   two homes - the reserved frame on the page and the postcard canvas. */
export function ExhibitTableau({ spec }: { spec: SculptureSpec }) {
  return (
    <>
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
        <path d="M122 84c-7-8-1-14 1-19 3-5 3-9-1-15" />
        <path d="M154 80c7-8 1-14-1-19-3-5-3-9 1-15" />
        {spec.steam > 2 ? (
          <path d="M138 74c-6-7-1-12 1-16 2-4 2-8-1-13" />
        ) : null}
      </g>
    </>
  );
}
