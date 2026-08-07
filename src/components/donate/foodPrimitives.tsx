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
      <g fill="url(#vd-scorch)">
        <ellipse cx="-20" cy="-16" rx="16" ry="5.4" />
        <ellipse cx="10" cy="-19" rx="12" ry="4.2" />
        <ellipse cx="30" cy="-13" rx="9" ry="3.4" />
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
      <ellipse cx="-9" cy="-21" rx="11" ry="4.6" fill="url(#vd-scorch)" />
      {/* the split seam, with its lit lip */}
      <path
        d="M -20 -9 Q 0 -3 20 -10"
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeOpacity="0.6"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M -19 -12 Q 0 -6 19 -13"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M -20 -18 Q -6 -27 10 -26"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.72"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {/* flour */}
      <g style={{ fill: "var(--plaster)" }} fillOpacity="0.4">
        <circle cx="-14" cy="-24" r="1.4" />
        <circle cx="4" cy="-29" r="1.1" />
        <circle cx="17" cy="-21" r="1.3" />
        <circle cx="-24" cy="-14" r="1" />
        <circle cx="10" cy="-17" r="1.2" />
      </g>
      <Spark x={-16} y={-25} r={2.2} />
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
      <g style={{ fill: `var(--${accent})` }}>
        <circle cx="16" cy="-24" r="5" />
        <circle cx="30" cy="-27" r="3.4" />
      </g>
      <Spark x={22} y={-27} r={1.8} />
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
      <g style={{ fill: "var(--toast)" }} fillOpacity="0.3">
        <ellipse cx="-30" cy="-6" rx="5" ry="2.8" />
        <ellipse cx="-12" cy="-11" rx="3.6" ry="2.2" />
        <ellipse cx="8" cy="-5" rx="4.4" ry="2.6" />
        <ellipse cx="26" cy="-12" rx="3.4" ry="2" />
        <ellipse cx="34" cy="-4" rx="3" ry="1.8" />
        <ellipse cx="-2" cy="-15" rx="3.2" ry="1.9" />
      </g>
      {/* the filling seam, uneven as a real layer */}
      <path
        d="M -42 -12 Q -20 -17 0 -15 Q 22 -13 42 -17 L 42 -12 Q 22 -8 0 -10 Q -20 -12 -42 -8 Z"
        style={{ fill: `var(--${accent})` }}
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
