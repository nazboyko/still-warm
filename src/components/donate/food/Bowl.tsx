import type { AccentTone } from "../exhibitSculpture.ts";
import { Contact, Core } from "./shading.tsx";

const BODY = "M -62 -30 Q -57 3 0 6 Q 57 3 62 -30 Z";

/* Half in, half out. The waterline is what makes a chunk sit in the broth
   instead of on top of it like a stone. */
const chunks = [
  {
    d: "M 6 -31 q 8 -6 15 -1 q 5 5 -2 8 q -9 4 -14 -2 z",
    water: { cx: 13, cy: -25.6, rx: 9.5, ry: 2.4 },
    gloss: { cx: 11, cy: -29.4, rx: 4.2, ry: 1.6, r: -18 },
  },
  {
    d: "M 27 -33 q 7 -4 11 1 q 3 4 -3 5 q -8 2 -9 -3 z",
    water: { cx: 32, cy: -28.2, rx: 6.5, ry: 1.8 },
    gloss: { cx: 30, cy: -31.2, rx: 2.8, ry: 1.1, r: -12 },
  },
  {
    d: "M -13 -25 q 8 -5 14 0 q 4 4 -2 6 q -9 3 -12 -3 z",
    water: { cx: -6, cy: -19.6, rx: 8.5, ry: 2.2 },
    gloss: { cx: -8, cy: -23.2, rx: 3.6, ry: 1.4, r: -20 },
  },
];

export function Bowl({ accent }: { accent: AccentTone }) {
  return (
    <g>
      <Contact rx={56} y={6} />
      <path d={BODY} style={{ fill: "var(--plaster)" }} />
      <path d={BODY} style={{ fill: "var(--syrup)" }} fillOpacity="0.2" />
      <Core d={BODY} />
      {/* the rim has thickness, then the wall falls away into shadow */}
      <ellipse
        cx="0"
        cy="-30"
        rx="62"
        ry="12"
        style={{ fill: "var(--plaster)" }}
      />
      <ellipse
        cx="0"
        cy="-29"
        rx="55"
        ry="10"
        style={{ fill: "var(--syrup)" }}
      />
      <ellipse cx="0" cy="-26.5" rx="51" ry="9" fill="url(#vd-broth)" />
      {/* where the broth climbs the near wall */}
      <path
        d="M -46 -24 Q -22 -17 4 -17 Q 28 -17 46 -23"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.32"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      {/* whatever was cooked long enough to come apart and float */}
      <g
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeLinecap="round"
      >
        <path
          d="M -34 -30 q 10 4 20 1 q 7 -2 12 -5"
          strokeOpacity="0.38"
          strokeWidth="1.6"
        />
        <path
          d="M -26 -23 q 12 3 22 -2"
          strokeOpacity="0.3"
          strokeWidth="1.3"
        />
        <path d="M -38 -25 q 8 3 15 2" strokeOpacity="0.26" strokeWidth="1.2" />
      </g>
      {chunks.map((chunk, index) => (
        <g key={index}>
          <path d={chunk.d} style={{ fill: `var(--${accent})` }} />
          {/* A wet highlight is a spot. Drawn as a curved line inside a round
              chunk it becomes a smile, and three of them become a face. */}
          <ellipse
            cx={chunk.gloss.cx}
            cy={chunk.gloss.cy}
            rx={chunk.gloss.rx}
            ry={chunk.gloss.ry}
            transform={`rotate(${chunk.gloss.r} ${chunk.gloss.cx} ${chunk.gloss.cy})`}
            style={{ fill: "var(--plaster)" }}
            fillOpacity="0.42"
          />
          <ellipse
            cx={chunk.water.cx}
            cy={chunk.water.cy}
            rx={chunk.water.rx}
            ry={chunk.water.ry}
            fill="url(#vd-broth)"
            fillOpacity="0.75"
          />
        </g>
      ))}
      {/* the far rim takes the fixture, the near one only a little of it */}
      <path
        d="M -62 -30 A 62 12 0 0 1 62 -30"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.6"
        strokeWidth="2"
      />
      <path
        d="M -62 -30 A 62 12 0 0 0 62 -30"
        fill="none"
        style={{ stroke: "var(--tungsten)" }}
        strokeOpacity="0.45"
        strokeWidth="1.6"
      />
    </g>
  );
}
