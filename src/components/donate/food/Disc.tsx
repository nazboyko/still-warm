import { Contact, Core } from "./shading.tsx";

/* Two parts, because a pancake is a thin thing and a thin thing has to show its
   edge: the skirt you see under the rim, then the face laid on top of it. */
const SKIRT =
  "M -46 -8 Q -46 2 -23 5 Q 0 7 24 4 Q 46 2 46 -9 Q 45 -18 23 -21 Q -1 -23 -23 -20 Q -45 -18 -46 -8 Z";
const FACE =
  "M -43 -14 Q -43 -22 -21 -25 Q 2 -27 23 -24 Q 43 -21 43 -13 Q 41 -5 21 -3 Q -2 -1 -23 -4 Q -42 -7 -43 -14 Z";

export function Disc() {
  return (
    <g>
      <Contact rx={44} y={4} />
      <path d={SKIRT} style={{ fill: "var(--toast)" }} />
      {/* the browned edge, heavier where the pan held it longest */}
      <path
        d="M -44 -3 Q -26 4 0 6 Q 22 7 40 2"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.55"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path d={FACE} fill="url(#vd-food)" />
      {/* the pan's map: broad, a little off-centre, satellites unalike */}
      <ellipse
        cx="4"
        cy="-16"
        rx="24"
        ry="6.5"
        transform="rotate(-4 4 -16)"
        fill="url(#vd-sear)"
      />
      <ellipse
        cx="-25"
        cy="-11"
        rx="9"
        ry="3.6"
        transform="rotate(7 -25 -11)"
        fill="url(#vd-sear)"
      />
      <ellipse cx="29" cy="-19" rx="7" ry="2.6" fill="url(#vd-sear)" />
      <Core d={FACE} />
      {/* where the face turns over into the edge, wavering */}
      <path
        d="M -40 -10 Q -22 -4 0 -3 Q 20 -2 34 -6"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.5"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M -34 -20 Q -15 -25 8 -23"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.65"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      {/* bubbles that opened while it cooked */}
      <g style={{ fill: "var(--toast-deep)" }}>
        <ellipse
          cx="-28"
          cy="-16"
          rx="3.6"
          ry="1.8"
          fillOpacity="0.4"
          transform="rotate(-11 -28 -16)"
        />
        <ellipse cx="-6" cy="-9" rx="2.6" ry="1.5" fillOpacity="0.32" />
        <ellipse
          cx="24"
          cy="-13"
          rx="3.2"
          ry="1.6"
          fillOpacity="0.44"
          transform="rotate(9 24 -13)"
        />
      </g>
    </g>
  );
}
