import { Contact, Core, Spark } from "./shading.tsx";

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

export function Stack() {
  return (
    <g>
      <Contact rx={40} />
      {stackTiers.map((tier, index) => (
        <g
          key={index}
          transform={`translate(${tier.shift[0]} ${tier.shift[1]})`}
        >
          <path d={tier.d} fill="url(#vd-food)" />
          <Core d={tier.d} />
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
