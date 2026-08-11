import { Contact, Core, Spark } from "./shading.tsx";

const BODY =
  "M -47 -10 Q -46 -21 -27 -26 Q -4 -30 20 -27 Q 42 -23 46 -12 Q 47 -3 28 0 Q 2 4 -22 1 Q -44 -1 -47 -10 Z";

export function Disc() {
  return (
    <g>
      <Contact rx={44} />
      <path d={BODY} fill="url(#vd-food)" />
      {/* the pan's map: broad, a little off-centre, satellites unalike */}
      <ellipse
        cx="6"
        cy="-17"
        rx="23"
        ry="6"
        transform="rotate(-4 6 -17)"
        fill="url(#vd-sear)"
      />
      <ellipse
        cx="-26"
        cy="-12"
        rx="8"
        ry="3.4"
        transform="rotate(7 -26 -12)"
        fill="url(#vd-sear)"
      />
      <ellipse cx="31" cy="-19" rx="6" ry="2.4" fill="url(#vd-sear)" />
      <Core d={BODY} />
      {/* the pale turn from face to side, wavering */}
      <path
        d="M -43 -8 Q -28 -2 -8 -1 Q 14 0 28 -2 Q 38 -4 44 -10"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.55"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M -36 -21 Q -16 -27 8 -25"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.7"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <g style={{ fill: "var(--toast-deep)" }}>
        <ellipse
          cx="-30"
          cy="-4"
          rx="4.2"
          ry="2"
          fillOpacity="0.36"
          transform="rotate(-11 -30 -4)"
        />
        <ellipse cx="0" cy="-2" rx="3" ry="1.7" fillOpacity="0.3" />
        <ellipse
          cx="27"
          cy="-5"
          rx="3.8"
          ry="1.8"
          fillOpacity="0.4"
          transform="rotate(9 27 -5)"
        />
      </g>
      <path
        d="M -39 -3 Q 0 3 39 -4"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <Spark x={-22} y={-22} />
    </g>
  );
}
