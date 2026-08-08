import { Varenyk } from "../art/Varenyk.tsx";
import type { AccentTone, FoodKind } from "./exhibitSculpture.ts";

/* The primitive library. Each piece sits on y=0, fills its share of the plate,
   and carries the calibrated language: base gradient, top light, contact
   shadow, its own identifying texture, and one hot accent. */

function Contact({ rx }: { rx: number }) {
  return (
    <>
      <ellipse
        cx="0"
        cy="1"
        rx={rx}
        ry={rx * 0.12}
        fill="#0f0c0a"
        opacity="0.6"
      />
      <ellipse
        cx="0"
        cy="1"
        rx={rx * 0.7}
        ry={rx * 0.055}
        fill="#000"
        opacity="0.7"
      />
    </>
  );
}

function Spark({ x, y, r = 2.4 }: { x: number; y: number; r?: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      style={{ fill: "var(--plaster)" }}
      fillOpacity="0.85"
    />
  );
}

function Dumpling() {
  return (
    <g>
      <Contact rx={44} />
      <g transform="translate(0 -22) scale(1.34)">
        <Varenyk id="vd" glossD="M -18 -9 Q -2 -15 12 -11" />
      </g>
      <Spark x={-12} y={-30} />
    </g>
  );
}

function Disc() {
  return (
    <g>
      <Contact rx={44} />
      <path
        d="M -46 -11 Q -44 -22 -23 -26 Q 0 -29 23 -26 Q 44 -22 46 -11 Q 44 -2 23 1 Q 0 3 -23 1 Q -44 -2 -46 -11 Z"
        fill="url(#vd-food)"
      />
      {/* the map the pan left: uneven islands, denser toward the rim */}
      <g fill="url(#vd-scorch)">
        <ellipse cx="-30" cy="-14" rx="13" ry="5" />
        <ellipse cx="-12" cy="-19" rx="9" ry="3.4" />
        <ellipse cx="6" cy="-15" rx="11" ry="4.4" />
        <ellipse cx="24" cy="-20" rx="8" ry="3" />
        <ellipse cx="36" cy="-14" rx="9" ry="3.6" />
        <ellipse cx="-2" cy="-22" rx="6" ry="2.4" />
      </g>
      <path
        d="M -34 -19 Q -10 -26 16 -23"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.72"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <g style={{ fill: "var(--toast-deep)" }} fillOpacity="0.35">
        <ellipse cx="-28" cy="-6" rx="4" ry="2.2" />
        <ellipse cx="2" cy="-4" rx="3.2" ry="1.8" />
        <ellipse cx="26" cy="-6" rx="3.6" ry="2" />
      </g>
      <path
        d="M -38 -4 Q 0 2 38 -4"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <Spark x={-24} y={-21} />
    </g>
  );
}

function Bun() {
  return (
    <g>
      <Contact rx={31} />
      <path
        d="M -32 0 Q -35 -18 -18 -29 Q 0 -36 18 -29 Q 35 -18 32 0 Q 16 4 0 4 Q -16 4 -32 0 Z"
        fill="url(#vd-food)"
      />
      <ellipse cx="-6" cy="-22" rx="15" ry="6" fill="url(#vd-scorch)" />
      {/* the split: a dark crease with the dough lifting lit on its far side */}
      <path
        d="M -14 -28 Q -2 -20 4 -8 Q 7 -2 8 2"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.7"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <path
        d="M -10 -29 Q 2 -21 8 -9 Q 10 -4 11 0"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.75"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* a broad rounded crown light, the way a risen loaf catches it */}
      <path
        d="M -22 -20 Q -8 -31 12 -28"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.6"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* flour */}
      <g style={{ fill: "var(--plaster)" }} fillOpacity="0.62">
        <ellipse cx="-15" cy="-25" rx="2.4" ry="1.5" />
        <ellipse cx="3" cy="-30" rx="1.9" ry="1.2" />
        <ellipse cx="18" cy="-22" rx="2.2" ry="1.4" />
        <ellipse cx="-25" cy="-13" rx="1.7" ry="1.1" />
        <ellipse cx="11" cy="-18" rx="2" ry="1.3" />
        <ellipse cx="-6" cy="-14" rx="1.5" ry="1" />
      </g>
      <Spark x={-17} y={-26} r={2.2} />
    </g>
  );
}

function Stack() {
  return (
    <g>
      <Contact rx={40} />
      {[0, -13, -25].map((offset, index) => (
        <g
          key={index}
          transform={`translate(${index === 1 ? 3 : -2} ${offset})`}
        >
          <path
            d="M -42 -9 Q -40 -18 -20 -22 Q 0 -25 20 -22 Q 40 -18 42 -9 Q 40 -2 20 1 Q 0 3 -20 1 Q -40 -2 -42 -9 Z"
            fill="url(#vd-food)"
          />
          <path
            d="M -32 -16 Q -8 -22 14 -20"
            fill="none"
            style={{ stroke: "var(--plaster)" }}
            strokeOpacity="0.6"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g style={{ fill: "var(--toast-deep)" }} fillOpacity="0.32">
            <ellipse cx="-24" cy="-5" rx="3.6" ry="2" />
            <ellipse cx="6" cy="-3" rx="3" ry="1.7" />
            <ellipse cx="28" cy="-5" rx="3.2" ry="1.8" />
          </g>
          <path
            d="M -36 -3 Q 0 3 36 -3"
            fill="none"
            style={{ stroke: "var(--syrup)" }}
            strokeOpacity="0.5"
            strokeWidth="2.6"
            strokeLinecap="round"
          />
        </g>
      ))}
      <ellipse cx="-8" cy="-38" rx="14" ry="4.6" fill="url(#vd-scorch)" />
      <Spark x={-22} y={-41} />
    </g>
  );
}

function Bowl({ accent }: { accent: AccentTone }) {
  return (
    <g>
      <Contact rx={58} />
      <path
        d="M -62 -28 Q -56 4 0 7 Q 56 4 62 -28 Z"
        style={{ fill: "var(--plaster)" }}
      />
      <path
        d="M -62 -28 Q -56 4 0 7 Q 56 4 62 -28 Z"
        style={{ fill: "var(--syrup)" }}
        fillOpacity="0.24"
      />
      {/* the inner wall, then the liquid sitting below the rim */}
      <ellipse
        cx="0"
        cy="-28"
        rx="62"
        ry="12"
        style={{ fill: "var(--syrup)" }}
      />
      <ellipse cx="0" cy="-25" rx="55" ry="10" fill="url(#vd-food)" />
      <ellipse
        cx="-18"
        cy="-27"
        rx="20"
        ry="4"
        style={{ fill: "var(--plaster)" }}
        fillOpacity="0.45"
      />
      {/* chunks with their own light; the near one sits proud of the liquid */}
      <g style={{ fill: `var(--${accent})` }}>
        <path d="M 8 -28 q 7 -5 13 -1 q 4 4 -1 7 q -8 3 -12 -2 z" />
        <path d="M 26 -30 q 6 -3 9 1 q 2 3 -3 4 q -6 1 -7 -3 z" />
        <path d="M -6 -21 q 6 -4 11 0 q 3 3 -2 5 q -7 2 -9 -2 z" />
      </g>
      <g
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.55"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M 11 -27 q 5 -3 9 -1" />
        <path d="M 28 -29 q 4 -2 6 0" />
      </g>
      <path
        d="M -9 -19 q 8 3 17 0"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M -62 -28 A 62 12 0 0 0 62 -28"
        fill="none"
        style={{ stroke: "var(--tungsten)" }}
        strokeOpacity="0.5"
        strokeWidth="2"
      />
      <Spark x={-44} y={-22} />
    </g>
  );
}

function Wedge({ accent }: { accent: AccentTone }) {
  return (
    <g>
      <Contact rx={40} />
      {/* the cut face: crumb, not a flat band */}
      <path
        d="M -42 0 L 42 0 L 42 -18 Q 0 -25 -42 -18 Z"
        style={{ fill: "var(--plaster)" }}
      />
      {/* crumb: torn pockets of uneven size, each with a lit upper rim */}
      <g>
        {[
          "M -34 -5 q 5 -4 9 0 q -3 5 -9 0 z",
          "M -20 -12 q 4 -3 7 0 q -2 4 -7 0 z",
          "M -8 -4 q 6 -4 10 0 q -4 5 -10 0 z",
          "M 6 -13 q 4 -3 7 0 q -2 4 -7 0 z",
          "M 18 -6 q 5 -4 9 0 q -3 5 -9 0 z",
          "M 30 -12 q 4 -3 6 0 q -2 4 -6 0 z",
          "M 34 -4 q 3 -2 5 0 q -2 3 -5 0 z",
          "M -26 -15 q 3 -2 5 0 q -2 3 -5 0 z",
        ].map((pore, index) => (
          <g key={index}>
            <path d={pore} style={{ fill: "var(--toast)" }} fillOpacity="0.4" />
            <path
              d={pore}
              fill="none"
              style={{ stroke: "var(--plaster)" }}
              strokeOpacity="0.5"
              strokeWidth="0.8"
            />
          </g>
        ))}
      </g>
      {/* the filling seam, uneven as a real layer */}
      {/* filling settles unevenly and bulges where it was cut */}
      <path
        d="M -42 -13 Q -30 -19 -18 -15 Q -6 -11 4 -16 Q 18 -21 30 -16 Q 37 -13 42 -17 L 42 -9 Q 32 -5 22 -8 Q 10 -12 0 -7 Q -12 -2 -24 -7 Q -34 -11 -42 -6 Z"
        style={{ fill: `var(--${accent})` }}
      />
      <path
        d="M -34 -12 Q -22 -16 -12 -13"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.35"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M -42 -18 Q 0 -25 42 -18 L 42 -29 Q 0 -39 -42 -29 Z"
        fill="url(#vd-food)"
      />
      <path
        d="M -34 -29 Q -6 -36 22 -31"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.7"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <ellipse cx="8" cy="-27" rx="13" ry="4.4" fill="url(#vd-scorch)" />
      <Spark x={-26} y={-30} />
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
