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
        <Varenyk id="vd" glossD="M -18 -9 Q -2 -15 12 -11" fine />
        {/* fuse the pleats into one ridge of the same dough, then shade the
            valleys so each fold reads as a fold */}
        <path
          d="M -28 -7 Q -18 -14 -6 -17 Q 6 -19 16 -15 Q 26 -11 29 -4"
          fill="none"
          style={{ stroke: "var(--tungsten)" }}
          strokeOpacity="0.4"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <path
          d="M -26 -5 Q -16 -12 -5 -15 Q 7 -17 16 -13 Q 24 -9 27 -3"
          fill="none"
          style={{ stroke: "var(--gold-light)" }}
          strokeOpacity="0.5"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <g
          style={{ stroke: "var(--toast-deep)" }}
          strokeLinecap="round"
          fill="none"
        >
          <path
            d="M -22 -6 q 2 -3 5 -4"
            strokeOpacity="0.4"
            strokeWidth="1.1"
          />
          <path
            d="M -12 -11 q 2 -3 5 -3"
            strokeOpacity="0.5"
            strokeWidth="1.2"
          />
          <path
            d="M 0 -14 q 3 -2 6 -2"
            strokeOpacity="0.42"
            strokeWidth="1.1"
          />
          <path d="M 12 -12 q 3 -1 5 1" strokeOpacity="0.5" strokeWidth="1.2" />
          <path d="M 21 -8 q 3 0 4 3" strokeOpacity="0.4" strokeWidth="1.1" />
        </g>
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
      {/* the pan's map: broad and centred on the top face, satellites beside */}
      <ellipse cx="2" cy="-16" rx="24" ry="6.5" fill="url(#vd-scorch)" />
      <ellipse cx="-24" cy="-13" rx="9" ry="3.2" fill="url(#vd-scorch)" />
      <ellipse cx="28" cy="-18" rx="8" ry="2.8" fill="url(#vd-scorch)" />
      {/* the pale rim where the top face turns into the side */}
      <path
        d="M -42 -9 Q -20 -3 2 -2 Q 24 -3 43 -9"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
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
      {/* the split: a leaf-shaped gape on the crown, pale dough inside,
          shadow under its lower edge, a lit lip above */}
      <path
        d="M -16 -17 Q -2 -24 14 -13 Q -2 -8 -16 -17 Z"
        style={{ fill: "var(--gold-light)" }}
      />
      <path
        d="M -13 -16 Q -2 -21 11 -13"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.85"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M -14 -15 Q -2 -10 12 -12"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.55"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* flour, gathered where the baker scored */}
      <g style={{ fill: "var(--plaster)" }} fillOpacity="0.68">
        <ellipse cx="-20" cy="-19" rx="2.6" ry="1.6" />
        <ellipse cx="-4" cy="-26" rx="2.1" ry="1.3" />
        <ellipse cx="16" cy="-18" rx="2.4" ry="1.5" />
        <ellipse cx="6" cy="-21" rx="1.7" ry="1.1" />
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
      {/* the pan's map on the top round: broad, centred, warm */}
      <ellipse cx="0" cy="-36" rx="22" ry="6" fill="url(#vd-scorch)" />
      <ellipse cx="-16" cy="-33" rx="8" ry="2.8" fill="url(#vd-scorch)" />
      <ellipse cx="15" cy="-38" rx="7" ry="2.6" fill="url(#vd-scorch)" />
      {/* browned tier ends, where the pan met the edge */}
      <g
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeLinecap="round"
      >
        <path
          d="M -40 -14 Q -43 -9 -40 -5"
          strokeOpacity="0.5"
          strokeWidth="2.4"
        />
        <path
          d="M 41 -26 Q 44 -21 41 -17"
          strokeOpacity="0.42"
          strokeWidth="2.2"
        />
        <path
          d="M -41 -38 Q -44 -33 -41 -29"
          strokeOpacity="0.45"
          strokeWidth="2.2"
        />
      </g>
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
      {/* the surface answers the chunk that breaks it */}
      <ellipse
        cx="1"
        cy="-19"
        rx="13"
        ry="3"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.4"
        strokeWidth="1.2"
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
      {/* the cut face: golden sponge, hand-cut sides tapering slightly */}
      <path
        d="M -40 0 L 40 0 L 37 -30 Q 0 -34 -36 -30 Z"
        style={{ fill: "var(--gold-light)" }}
      />
      <path
        d="M -40 0 L 40 0 L 37 -30 Q 0 -34 -36 -30 Z"
        style={{ fill: "var(--plaster)" }}
        fillOpacity="0.45"
      />
      {/* crumb pockets, warm and lit on their upper rims */}
      <g>
        {[
          "M -30 -6 q 5 -4 9 0 q -3 5 -9 0 z",
          "M -14 -11 q 4 -3 7 0 q -2 4 -7 0 z",
          "M 2 -5 q 6 -4 10 0 q -4 5 -10 0 z",
          "M 20 -9 q 4 -3 7 0 q -2 4 -7 0 z",
          "M 30 -4 q 4 -3 6 0 q -2 4 -6 0 z",
          "M -24 -24 q 4 -3 7 0 q -2 4 -7 0 z",
          "M -4 -27 q 4 -3 7 0 q -2 4 -7 0 z",
          "M 16 -25 q 4 -3 6 0 q -2 4 -6 0 z",
        ].map((pore, index) => (
          <g key={index}>
            <path
              d={pore}
              style={{ fill: "var(--toast)" }}
              fillOpacity="0.55"
            />
            <path
              d={pore}
              fill="none"
              style={{ stroke: "var(--plaster)" }}
              strokeOpacity="0.7"
              strokeWidth="0.9"
            />
          </g>
        ))}
      </g>
      {/* the filling: a settled stratum with a slight sag and a shadow under it */}
      <path
        d="M -37 -19 Q -18 -22 0 -20 Q 18 -18 38 -21 L 38 -13 Q 18 -10 0 -12 Q -18 -14 -37 -11 Z"
        style={{ fill: `var(--${accent})` }}
      />
      <path
        d="M -36 -11 Q -18 -14 0 -12 Q 18 -10 38 -13"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M -30 -19 Q -16 -21 -4 -19.5"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.4"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      {/* top crust, lipping just over the cut */}
      <path
        d="M -38 -30 Q 0 -36 39 -30 L 40 -37 Q 0 -46 -39 -37 Z"
        fill="url(#vd-food)"
      />
      <path
        d="M -30 -36 Q -4 -42 20 -38"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <ellipse cx="8" cy="-35" rx="12" ry="3.6" fill="url(#vd-scorch)" />
      <Spark x={-24} y={-38} />
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
