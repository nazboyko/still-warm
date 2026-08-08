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
      {/* hand-folded: the belly bulges left, the chord sags, no half mirrors */}
      <path
        d="M -45 8 Q -46 -9 -33 -20 Q -18 -30 1 -29 Q 22 -27 36 -16 Q 44 -8 43 6 Q 42 12 33 13 Q 2 19 -30 15 Q -43 13 -45 8 Z"
        fill="url(#vd-dough)"
      />
      <g fill="url(#vd-bake)">
        <ellipse cx="-16" cy="-6" rx="17" ry="7" />
        <ellipse cx="16" cy="1" rx="11" ry="5" transform="rotate(-9 16 1)" />
      </g>
      {/* one fused pleat ridge, folds of different sizes, valleys shaded */}
      <path
        d="M -37 -13 Q -24 -24 -8 -27 Q 10 -28 24 -21 Q 34 -15 39 -6"
        fill="none"
        style={{ stroke: "var(--tungsten)" }}
        strokeOpacity="0.42"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M -34 -12 Q -22 -21 -7 -24 Q 9 -25 22 -19 Q 31 -14 36 -6"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.55"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <g
        style={{ stroke: "var(--toast-deep)" }}
        strokeLinecap="round"
        fill="none"
      >
        <path
          d="M -30 -11 q 2 -4 6 -5"
          strokeOpacity="0.42"
          strokeWidth="1.3"
        />
        <path
          d="M -18 -18 q 3 -4 6 -4"
          strokeOpacity="0.52"
          strokeWidth="1.5"
        />
        <path d="M -4 -23 q 4 -2 7 -2" strokeOpacity="0.4" strokeWidth="1.1" />
        <path d="M 10 -21 q 4 -1 6 1" strokeOpacity="0.5" strokeWidth="1.4" />
        <path d="M 22 -16 q 4 0 5 3" strokeOpacity="0.38" strokeWidth="1" />
        <path d="M 31 -10 q 3 1 4 4" strokeOpacity="0.46" strokeWidth="1.2" />
      </g>
      <path
        d="M -26 -8 Q -10 -16 8 -14"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.8"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <Spark x={-14} y={-18} />
    </g>
  );
}

function Disc() {
  return (
    <g>
      <Contact rx={44} />
      <path
        d="M -47 -10 Q -46 -21 -27 -26 Q -4 -30 20 -27 Q 42 -23 46 -12 Q 47 -3 28 0 Q 2 4 -22 1 Q -44 -1 -47 -10 Z"
        fill="url(#vd-food)"
      />
      {/* the pan's map: broad, a little off-centre, satellites unalike */}
      <ellipse
        cx="6"
        cy="-17"
        rx="23"
        ry="6"
        transform="rotate(-4 6 -17)"
        fill="url(#vd-scorch)"
      />
      <ellipse
        cx="-26"
        cy="-12"
        rx="8"
        ry="3.4"
        transform="rotate(7 -26 -12)"
        fill="url(#vd-scorch)"
      />
      <ellipse cx="31" cy="-19" rx="6" ry="2.4" fill="url(#vd-scorch)" />
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

function Bun() {
  return (
    <g>
      <Contact rx={31} />
      {/* risen a little sideways, the way loaves lean in the oven */}
      <path
        d="M -31 1 Q -35 -16 -20 -27 Q -4 -36 14 -30 Q 33 -22 33 -3 Q 32 3 22 3 Q 0 6 -22 3 Q -30 3 -31 1 Z"
        fill="url(#vd-food)"
      />
      <ellipse
        cx="-11"
        cy="-20"
        rx="12"
        ry="5"
        transform="rotate(-7 -11 -20)"
        fill="url(#vd-scorch)"
      />
      {/* the split: leaf-shaped, off the crown's centre */}
      <path
        d="M -18 -16 Q -3 -24 12 -12 Q -3 -8 -18 -16 Z"
        style={{ fill: "var(--gold-light)" }}
      />
      <path
        d="M -15 -15 Q -3 -21 9 -12"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.85"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M -16 -14 Q -3 -9 10 -11"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.55"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      {/* crown light on the risen side only */}
      <path
        d="M -22 -19 Q -12 -28 2 -29"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.55"
        strokeWidth="4.2"
        strokeLinecap="round"
      />
      {/* flour, gathered near the score, no two specks alike */}
      <g style={{ fill: "var(--plaster)" }}>
        <ellipse
          cx="-22"
          cy="-17"
          rx="2.7"
          ry="1.5"
          fillOpacity="0.7"
          transform="rotate(-14 -22 -17)"
        />
        <ellipse
          cx="-4"
          cy="-25"
          rx="2"
          ry="1.2"
          fillOpacity="0.62"
          transform="rotate(8 -4 -25)"
        />
        <ellipse
          cx="15"
          cy="-16"
          rx="2.3"
          ry="1.3"
          fillOpacity="0.68"
          transform="rotate(-5 15 -16)"
        />
        <ellipse cx="6" cy="-20" rx="1.5" ry="0.9" fillOpacity="0.55" />
      </g>
      <Spark x={-14} y={-24} r={2} />
    </g>
  );
}

const stackTiers = [
  {
    d: "M -43 -8 Q -41 -18 -20 -22 Q 2 -25 22 -21 Q 41 -17 42 -8 Q 40 -1 20 2 Q -2 4 -22 1 Q -41 -1 -43 -8 Z",
    shift: [-2, 0],
    sheen: "M -33 -15 Q -8 -21 15 -19",
    sheenWidth: 2.1,
  },
  {
    d: "M -40 -8 Q -39 -16 -21 -20 Q 0 -23 21 -20 Q 39 -16 40 -7 Q 38 -1 18 1 Q -3 3 -23 1 Q -38 -1 -40 -8 Z",
    shift: [4, -13],
    sheen: "M -30 -14 Q -10 -19 12 -17",
    sheenWidth: 1.6,
  },
  {
    d: "M -41 -9 Q -38 -17 -19 -21 Q 3 -24 24 -20 Q 40 -16 41 -8 Q 40 -2 19 1 Q -4 4 -24 1 Q -39 -2 -41 -9 Z",
    shift: [-1, -25],
    sheen: "M -31 -15 Q -6 -21 18 -18",
    sheenWidth: 2.4,
  },
];

function Stack() {
  return (
    <g>
      <Contact rx={40} />
      {stackTiers.map((tier, index) => (
        <g
          key={index}
          transform={`translate(${tier.shift[0]} ${tier.shift[1]})`}
        >
          <path d={tier.d} fill="url(#vd-food)" />
          <path
            d={tier.sheen}
            fill="none"
            style={{ stroke: "var(--plaster)" }}
            strokeOpacity="0.6"
            strokeWidth={tier.sheenWidth}
            strokeLinecap="round"
          />
          <path
            d="M -36 -3 Q 0 3 36 -4"
            fill="none"
            style={{ stroke: "var(--syrup)" }}
            strokeOpacity="0.5"
            strokeWidth={2 + index * 0.4}
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* the pan's map on the top round: broad, centred, warm */}
      <ellipse
        cx="1"
        cy="-36"
        rx="21"
        ry="5.8"
        transform="rotate(-3 1 -36)"
        fill="url(#vd-scorch)"
      />
      <ellipse cx="-17" cy="-33" rx="7" ry="2.6" fill="url(#vd-scorch)" />
      <ellipse
        cx="16"
        cy="-38"
        rx="6"
        ry="2.2"
        transform="rotate(6 16 -38)"
        fill="url(#vd-scorch)"
      />
      {/* browned tier ends, no two alike */}
      <g
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeLinecap="round"
      >
        <path
          d="M -41 -14 Q -44 -9 -40 -5"
          strokeOpacity="0.5"
          strokeWidth="2.6"
        />
        <path
          d="M 42 -25 Q 46 -20 42 -17"
          strokeOpacity="0.5"
          strokeWidth="2.3"
        />
        <path
          d="M 39 -11 Q 42 -7 39 -3"
          strokeOpacity="0.4"
          strokeWidth="1.8"
        />
        <path
          d="M -42 -37 Q -45 -33 -41 -30"
          strokeOpacity="0.44"
          strokeWidth="2"
        />
      </g>
      <Spark x={-20} y={-40} />
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
      <path
        d="M -34 -27 Q -24 -31 -10 -30 Q 2 -29 4 -26 Q -6 -23 -20 -24 Q -31 -24 -34 -27 Z"
        style={{ fill: "var(--plaster)" }}
        fillOpacity="0.45"
      />
      <path
        d="M 18 -31 Q 30 -32 38 -29"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.3"
        strokeWidth="2.2"
        strokeLinecap="round"
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
      {/* the cut face: hand-cut, so nothing is straight and no side matches */}
      <path
        d="M -37 1 Q -18 3 1 2 Q 21 1 38 2 Q 41 -12 36 -28 Q 20 -32 -1 -33 Q -22 -32 -34 -27 Q -40 -13 -37 1 Z"
        style={{ fill: "var(--gold-light)" }}
      />
      <path
        d="M -37 1 Q -18 3 1 2 Q 21 1 38 2 Q 41 -12 36 -28 Q 20 -32 -1 -33 Q -22 -32 -34 -27 Q -40 -13 -37 1 Z"
        style={{ fill: "var(--plaster)" }}
        fillOpacity="0.42"
      />
      {/* crumb pockets, no two alike, none mirrored */}
      <g>
        {[
          ["M -29 -6 q 5 -5 10 -1 q -4 5 -10 1 z", 0.5, 0.9],
          ["M -12 -12 q 3 -3 7 -1 q -2 5 -7 1 z", 0.6, 0.7],
          ["M 4 -5 q 7 -4 11 1 q -5 4 -11 -1 z", 0.5, 1.1],
          ["M 23 -10 q 3 -4 7 -1 q -3 4 -7 1 z", 0.55, 0.8],
          ["M 31 -4 q 3 -2 5 1 q -2 3 -5 -1 z", 0.45, 0.6],
          ["M -25 -22 q 4 -2 6 1 q -3 3 -6 -1 z", 0.6, 0.8],
          ["M -3 -26 q 5 -3 8 0 q -3 4 -8 0 z", 0.5, 1],
          ["M 17 -23 q 3 -3 6 -1 q -2 4 -6 1 z", 0.55, 0.7],
        ].map(([pore, opacity, weight], index) => (
          <g key={index}>
            <path
              d={pore as string}
              style={{ fill: "var(--toast)" }}
              fillOpacity={opacity as number}
            />
            <path
              d={pore as string}
              fill="none"
              style={{ stroke: "var(--plaster)" }}
              strokeOpacity="0.65"
              strokeWidth={weight as number}
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
