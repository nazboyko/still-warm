import { Contact, Spark } from "./shading.tsx";

export function Bun() {
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
