import { Varenyk } from "../art/Varenyk.tsx";
import type { AccentTone, FoodKind } from "./exhibitSculpture.ts";

/* Every primitive sits on y=0, carries the calibrated language - base gradient,
   top light, contact shadow, one hot accent - and is plated by the caller. */

function Contact({ rx }: { rx: number }) {
  return (
    <ellipse
      cx="0"
      cy="1"
      rx={rx}
      ry={rx * 0.11}
      fill="#0f0c0a"
      opacity="0.6"
    />
  );
}

function Dumpling() {
  return (
    <g>
      <Contact rx={32} />
      <g transform="translate(0 -16)">
        <Varenyk id="vd" glossD="M -18 -9 Q -2 -15 12 -11" />
      </g>
    </g>
  );
}

function Disc() {
  return (
    <g>
      <Contact rx={32} />
      <path
        d="M -34 -8 Q -33 -16 -17 -19 Q 0 -21 17 -19 Q 33 -16 34 -8 Q 33 -2 17 0 Q 0 2 -17 0 Q -33 -2 -34 -8 Z"
        fill="url(#vd-food)"
      />
      <ellipse cx="-8" cy="-12" rx="12" ry="4" fill="url(#vd-scorch)" />
      <path
        d="M -26 -14 Q -8 -19 12 -17"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M -28 -3 Q 0 1 28 -3"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </g>
  );
}

function Bun() {
  return (
    <g>
      <Contact rx={23} />
      <path
        d="M -24 0 Q -26 -14 -13 -21 Q 0 -26 13 -21 Q 26 -14 24 0 Q 12 3 0 3 Q -12 3 -24 0 Z"
        fill="url(#vd-food)"
      />
      <ellipse cx="-7" cy="-15" rx="8" ry="3.4" fill="url(#vd-scorch)" />
      <path
        d="M -15 -13 Q -5 -20 7 -19"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.72"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M -13 -5 Q 0 -2 13 -6"
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </g>
  );
}

function Stack() {
  return (
    <g>
      <Contact rx={30} />
      {[0, -11, -21].map((offset, index) => (
        <g
          key={index}
          transform={`translate(${index === 1 ? 2 : -1} ${offset})`}
        >
          <path
            d="M -31 -7 Q -30 -14 -15 -17 Q 0 -19 15 -17 Q 30 -14 31 -7 Q 30 -2 15 0 Q 0 2 -15 0 Q -30 -2 -31 -7 Z"
            fill="url(#vd-food)"
          />
          <path
            d="M -24 -12 Q -6 -16 10 -15"
            fill="none"
            style={{ stroke: "var(--plaster)" }}
            strokeOpacity="0.6"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <path
            d="M -26 -2 Q 0 2 26 -2"
            fill="none"
            style={{ stroke: "var(--syrup)" }}
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
      <ellipse cx="-6" cy="-30" rx="10" ry="3.4" fill="url(#vd-scorch)" />
    </g>
  );
}

function Bowl({ accent }: { accent: AccentTone }) {
  return (
    <g>
      <Contact rx={42} />
      <path
        d="M -46 -22 Q -42 2 0 5 Q 42 2 46 -22 Z"
        style={{ fill: "var(--plaster)" }}
      />
      <path
        d="M -46 -22 Q -42 2 0 5 Q 42 2 46 -22 Z"
        style={{ fill: "var(--syrup)" }}
        fillOpacity="0.22"
      />
      <ellipse cx="0" cy="-22" rx="46" ry="9" fill="url(#vd-food)" />
      <ellipse
        cx="-14"
        cy="-23"
        rx="15"
        ry="3.2"
        style={{ fill: "var(--plaster)" }}
        fillOpacity="0.4"
      />
      <circle cx="12" cy="-21" r="4" style={{ fill: `var(--${accent})` }} />
      <path
        d="M -46 -22 A 46 9 0 0 0 46 -22"
        fill="none"
        style={{ stroke: "var(--tungsten)" }}
        strokeOpacity="0.45"
        strokeWidth="1.6"
      />
    </g>
  );
}

function Wedge({ accent }: { accent: AccentTone }) {
  return (
    <g>
      <Contact rx={30} />
      <path
        d="M -30 0 L 30 0 L 30 -13 Q 0 -18 -30 -13 Z"
        style={{ fill: "var(--plaster)" }}
      />
      <path
        d="M -30 -9 Q 0 -14 30 -9"
        fill="none"
        style={{ stroke: `var(--${accent})` }}
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <path
        d="M -30 -13 Q 0 -18 30 -13 L 30 -22 Q 0 -31 -30 -22 Z"
        fill="url(#vd-food)"
      />
      <path
        d="M -24 -22 Q -4 -28 16 -24"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.7"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <ellipse cx="6" cy="-20" rx="10" ry="3.4" fill="url(#vd-scorch)" />
    </g>
  );
}

export function FoodPiece({
  kind,
  accent,
}: {
  kind: FoodKind;
  accent: AccentTone;
}) {
  if (kind === "dumpling") return <Dumpling />;
  if (kind === "disc") return <Disc />;
  if (kind === "bun") return <Bun />;
  if (kind === "stack") return <Stack />;
  if (kind === "bowl") return <Bowl accent={accent} />;
  return <Wedge accent={accent} />;
}
