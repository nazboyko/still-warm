import type { AccentTone } from "../exhibitSculpture.ts";
import { Contact, Core } from "./shading.tsx";

/* A slice, not a brick. Two knife edges converging on a point at the near left,
   the crust standing at the far right, and the base sitting flat on the plate.
   Drawn without that taper it read as a block of nougat; drawn with both edges
   bowing outward it read as a boat. */
const TOP =
  "M -46 -6 Q -24 -22 2 -29 Q 26 -34 40 -31 Q 48 -28 46 -21 Q 22 -16 -6 -12 Q -30 -8 -46 -6 Z";
const CUT =
  "M -46 -6 Q -30 -8 -6 -12 Q 22 -16 46 -21 L 47 -9 Q 22 -5 -4 -2 Q -28 0 -45 -1 Z";
const CRUST =
  "M 40 -31 Q 49 -29 51 -22 Q 52 -14 47 -9 Q 42 -8 40 -12 Q 46 -17 45 -23 Q 44 -28 40 -31 Z";

/* crumb pockets on the cut face, no two alike, none mirrored */
const crumbPores: [string, number, number][] = [
  ["M -38 -4 q 4 -3 8 -1 q -4 4 -8 1 z", 0.42, 0.8],
  ["M -22 -6 q 4 -3 7 -1 q -3 4 -7 1 z", 0.5, 0.7],
  ["M -4 -8 q 5 -3 9 0 q -4 4 -9 0 z", 0.44, 1],
  ["M 16 -12 q 4 -3 7 -1 q -3 4 -7 1 z", 0.5, 0.7],
  ["M 32 -16 q 3 -2 5 0 q -2 3 -5 0 z", 0.4, 0.6],
  ["M -30 -9 q 4 -2 6 0 q -3 3 -6 0 z", 0.46, 0.7],
  ["M 6 -14 q 4 -3 7 0 q -3 3 -7 0 z", 0.4, 0.8],
];

export function Wedge({ accent }: { accent: AccentTone }) {
  return (
    <g>
      {/* Raised to meet the base, which climbs to the right as the slice goes
          back: a shadow left on the plate line reads as a hovering slice. */}
      <Contact rx={42} y={-4} />
      <path d={CUT} style={{ fill: "var(--gold-light)" }} />
      <path d={CUT} style={{ fill: "var(--plaster)" }} fillOpacity="0.34" />
      {crumbPores.map(([pore, opacity, weight], index) => (
        <g key={index}>
          <path
            d={pore}
            style={{ fill: "var(--toast)" }}
            fillOpacity={opacity}
          />
          <path
            d={pore}
            fill="none"
            style={{ stroke: "var(--plaster)" }}
            strokeOpacity="0.6"
            strokeWidth={weight}
          />
        </g>
      ))}
      {/* the filling: a seam that wanders, thick then thin, parallel to nothing */}
      <path
        d="M -43 -4 Q -28 -6 -6 -9 Q 18 -13 44 -18 L 45 -13 Q 20 -8 -4 -5 Q -27 -2 -44 -1 Z"
        style={{ fill: `var(--${accent})` }}
      />
      <path
        d="M -39 -4 Q -24 -6 -4 -9 Q 16 -12 34 -15"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <Core d={CUT} />
      <path d={TOP} fill="url(#vd-food)" />
      {/* what the oven left on the surface, drifting toward the crust */}
      <ellipse
        cx="16"
        cy="-25"
        rx="20"
        ry="5"
        transform="rotate(-9 16 -25)"
        fill="url(#vd-sear)"
      />
      <ellipse cx="-16" cy="-14" rx="9" ry="3" fill="url(#vd-sear)" />
      <Core d={TOP} />
      <path
        d="M -30 -13 Q -8 -21 16 -26"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.5"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path d={CRUST} fill="url(#vd-food)" />
      <ellipse
        cx="47"
        cy="-21"
        rx="4"
        ry="8"
        transform="rotate(6 47 -21)"
        fill="url(#vd-sear)"
      />
      <path
        d="M 43 -28 Q 48 -24 48 -17"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <Core d={CRUST} />
    </g>
  );
}
