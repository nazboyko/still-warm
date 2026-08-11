import type { AccentTone } from "../exhibitSculpture.ts";
import { Contact, Spark } from "./shading.tsx";

const crumbPores: [string, number, number][] = [
  ["M -29 -6 q 5 -5 10 -1 q -4 5 -10 1 z", 0.5, 0.9],
  ["M -12 -12 q 3 -3 7 -1 q -2 5 -7 1 z", 0.6, 0.7],
  ["M 4 -5 q 7 -4 11 1 q -5 4 -11 -1 z", 0.5, 1.1],
  ["M 23 -10 q 3 -4 7 -1 q -3 4 -7 1 z", 0.55, 0.8],
  ["M 31 -4 q 3 -2 5 1 q -2 3 -5 -1 z", 0.45, 0.6],
  ["M -25 -22 q 4 -2 6 1 q -3 3 -6 -1 z", 0.6, 0.8],
  ["M -3 -26 q 5 -3 8 0 q -3 4 -8 0 z", 0.5, 1],
  ["M 17 -23 q 3 -3 6 -1 q -2 4 -6 1 z", 0.55, 0.7],
];

const CUT_FACE =
  "M -37 1 Q -18 3 1 2 Q 21 1 38 2 Q 41 -12 36 -28 Q 20 -32 -1 -33 Q -22 -32 -34 -27 Q -40 -13 -37 1 Z";

export function Wedge({ accent }: { accent: AccentTone }) {
  return (
    <g>
      <Contact rx={40} />
      {/* the cut face: hand-cut, so nothing is straight and no side matches */}
      <path d={CUT_FACE} style={{ fill: "var(--gold-light)" }} />
      <path
        d={CUT_FACE}
        style={{ fill: "var(--plaster)" }}
        fillOpacity="0.42"
      />
      {/* crumb pockets, no two alike, none mirrored */}
      <g>
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
              strokeOpacity="0.65"
              strokeWidth={weight}
            />
          </g>
        ))}
      </g>
      {/* the filling: a seam that wanders, thick then thin, parallel to nothing */}
      <path
        d="M -35 -15 Q -27 -21 -16 -18 Q -4 -14 6 -18 Q 18 -23 28 -19 Q 34 -17 37 -20 L 38 -10 Q 30 -6 20 -9 Q 8 -13 -3 -8 Q -15 -4 -25 -9 Q -32 -12 -35 -8 Z"
        style={{ fill: `var(--${accent})` }}
      />
      <path
        d="M -33 -9 Q -24 -6 -14 -8 Q -2 -11 9 -9"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.5"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M -29 -17 Q -19 -20 -8 -17"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.38"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* the crust: crest off-centre, overhang heavier on the right */}
      <path
        d="M -35 -27 Q -18 -33 -2 -34 Q 18 -34 37 -29 Q 40 -33 39 -38 Q 22 -45 -4 -44 Q -26 -42 -37 -35 Q -38 -30 -35 -27 Z"
        fill="url(#vd-food)"
      />
      <path
        d="M -28 -35 Q -12 -41 8 -40"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.7"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M 18 -40 Q 28 -38 34 -35"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.4"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <ellipse cx="10" cy="-39" rx="13" ry="3.8" fill="url(#vd-scorch)" />
      <ellipse cx="-20" cy="-37" rx="7" ry="2.4" fill="url(#vd-scorch)" />
      <Spark x={-27} y={-38} />
    </g>
  );
}
