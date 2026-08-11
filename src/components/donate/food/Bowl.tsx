import type { AccentTone } from "../exhibitSculpture.ts";
import { Contact, Core, Spark } from "./shading.tsx";

const BODY = "M -62 -28 Q -56 4 0 7 Q 56 4 62 -28 Z";

export function Bowl({ accent }: { accent: AccentTone }) {
  return (
    <g>
      <Contact rx={58} y={7} />
      <path d={BODY} style={{ fill: "var(--plaster)" }} />
      <path d={BODY} style={{ fill: "var(--syrup)" }} fillOpacity="0.24" />
      <Core d={BODY} />
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
