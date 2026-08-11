import { Contact, Core } from "./shading.tsx";

const stackTiers = [
  {
    d: "M -43 -8 Q -41 -18 -20 -22 Q 2 -25 22 -21 Q 41 -17 42 -8 Q 40 -1 20 2 Q -2 4 -22 1 Q -41 -1 -43 -8 Z",
    shift: [-2, 0],
    sheen: "M -33 -15 Q -8 -21 15 -19",
    sheenWidth: 2.1,
    /* the browned underside, following this tier's own bottom curve */
    under: "M -40 -4 Q -20 3 0 4 Q 20 5 39 -3",
  },
  {
    d: "M -40 -8 Q -39 -16 -21 -20 Q 0 -23 21 -20 Q 39 -16 40 -7 Q 38 -1 18 1 Q -3 3 -23 1 Q -38 -1 -40 -8 Z",
    shift: [4, -13],
    sheen: "M -30 -14 Q -10 -19 12 -17",
    sheenWidth: 1.6,
    under: "M -37 -4 Q -19 2 0 3 Q 18 4 37 -3",
  },
  {
    d: "M -41 -9 Q -38 -17 -19 -21 Q 3 -24 24 -20 Q 40 -16 41 -8 Q 40 -2 19 1 Q -4 4 -24 1 Q -39 -2 -41 -9 Z",
    shift: [-1, -25],
    sheen: "M -31 -15 Q -6 -21 18 -18",
    sheenWidth: 2.4,
    under: "M -38 -5 Q -19 2 1 3 Q 20 4 38 -4",
  },
];

export function Stack() {
  return (
    <g>
      <Contact rx={40} y={2} />
      {stackTiers.map((tier, index) => (
        <g
          key={index}
          transform={`translate(${tier.shift[0]} ${tier.shift[1]})`}
        >
          {/* what this round drops on the one below it */}
          <ellipse cx="2" cy="4" rx="41" ry="7" fill="url(#vd-contact)" />
          <path d={tier.d} fill="url(#vd-food)" />
          <Core d={tier.d} />
          <path
            d={tier.under}
            fill="none"
            style={{ stroke: "var(--syrup)" }}
            strokeOpacity="0.45"
            strokeWidth={2.4 + index * 0.3}
            strokeLinecap="round"
          />
          <path
            d={tier.sheen}
            fill="none"
            style={{ stroke: "var(--plaster)" }}
            strokeOpacity="0.55"
            strokeWidth={tier.sheenWidth}
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
        fill="url(#vd-sear)"
      />
      <ellipse cx="-17" cy="-33" rx="7" ry="2.6" fill="url(#vd-sear)" />
      <ellipse
        cx="16"
        cy="-38"
        rx="6"
        ry="2.2"
        transform="rotate(6 16 -38)"
        fill="url(#vd-sear)"
      />
    </g>
  );
}
