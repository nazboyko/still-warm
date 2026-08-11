import { Contact, Core } from "./shading.tsx";

/* risen a little sideways, the way loaves lean in the oven */
const BODY =
  "M -30 2 Q -35 -14 -22 -27 Q -8 -38 9 -35 Q 27 -31 32 -14 Q 35 -3 30 2 Q 0 6 -30 2 Z";

/* Two cuts crossing off the crown's centre, each one an opening with crumb in
   it rather than a line drawn on top. A single slit reads as a closed eye, and
   two buns on a plate then read as a face rather than as bread. */
const scores = [
  {
    open: "M -18 -15 Q -5 -27 17 -19 Q -3 -20 -18 -15 Z",
    lip: "M -18 -15 Q -5 -27 17 -19",
    width: 1.7,
  },
  {
    open: "M -9 -31 Q 0 -19 3 -7 Q -4 -19 -9 -31 Z",
    lip: "M -9 -31 Q 0 -19 3 -7",
    width: 1.2,
  },
];

export function Bun() {
  return (
    <g>
      <Contact rx={31} y={3} />
      <path d={BODY} fill="url(#vd-food)" />
      <ellipse
        cx="-9"
        cy="-22"
        rx="14"
        ry="6"
        transform="rotate(-7 -9 -22)"
        fill="url(#vd-sear)"
      />
      <Core d={BODY} />
      {/* where the loaf sits down into its own shadow: a tall dome puts the
          base gradient's dark end off the bottom of the shape entirely */}
      <path
        d="M -27 -1 Q -11 4 8 3 Q 22 2 29 -3"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.5"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
      {/* crown light on the risen side only */}
      <path
        d="M -21 -20 Q -11 -30 4 -31"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.5"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      {scores.map((score, index) => (
        <g key={index}>
          <path
            d={score.open}
            style={{ fill: "var(--syrup)" }}
            fillOpacity="0.6"
          />
          {/* the crumb that tore open along the light-facing lip */}
          <path
            d={score.lip}
            fill="none"
            style={{ stroke: "var(--gold-light)" }}
            strokeOpacity="0.78"
            strokeWidth={score.width}
            strokeLinecap="round"
          />
        </g>
      ))}
      {/* flour, gathered near the score, no two specks alike */}
      <g style={{ fill: "var(--plaster)" }}>
        <ellipse
          cx="-20"
          cy="-19"
          rx="2.7"
          ry="1.5"
          fillOpacity="0.7"
          transform="rotate(-14 -20 -19)"
        />
        <ellipse
          cx="-2"
          cy="-27"
          rx="2"
          ry="1.2"
          fillOpacity="0.62"
          transform="rotate(8 -2 -27)"
        />
        <ellipse
          cx="16"
          cy="-17"
          rx="2.3"
          ry="1.3"
          fillOpacity="0.55"
          transform="rotate(-5 16 -17)"
        />
        <ellipse cx="8" cy="-23" rx="1.5" ry="0.9" fillOpacity="0.5" />
      </g>
    </g>
  );
}
