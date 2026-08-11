import { Contact, Spark } from "./shading.tsx";

export function Dumpling() {
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
