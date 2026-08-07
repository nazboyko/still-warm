import type { SculptureSpec } from "./exhibitSculpture.ts";

const BASE = 138;

/* The visitor's exhibit, built from their own words - the brightest dish here. */
export function VisitorDish({ spec }: { spec: SculptureSpec }) {
  return (
    <g className="dish-food">
      {spec.mounds.map((mound, index) => (
        <g key={index}>
          <ellipse
            cx={mound.x}
            cy={BASE + 1}
            rx={mound.rx * 0.95}
            ry={4}
            fill="#0f0c0a"
            opacity="0.55"
          />
          <path
            d={`M ${mound.x - mound.rx} ${BASE} A ${mound.rx} ${mound.ry} 0 0 1 ${mound.x + mound.rx} ${BASE} Q ${mound.x} ${BASE + 5} ${mound.x - mound.rx} ${BASE} Z`}
            fill="url(#vd-food)"
          />
          <path
            d={`M ${mound.x - mound.rx * 0.72} ${BASE - mound.ry * 0.5} A ${mound.rx * 0.8} ${mound.ry * 0.8} 0 0 1 ${mound.x + mound.rx * 0.1} ${BASE - mound.ry * 0.92}`}
            fill="none"
            style={{ stroke: "var(--plaster)" }}
            strokeOpacity="0.7"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d={`M ${mound.x - mound.rx * 0.8} ${BASE - 1} Q ${mound.x} ${BASE + 3} ${mound.x + mound.rx * 0.8} ${BASE - 1}`}
            fill="none"
            style={{ stroke: "var(--syrup)" }}
            strokeOpacity="0.45"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
        </g>
      ))}
      {spec.garnish.map((piece, index) => (
        <g key={index}>
          <circle
            cx={piece.x}
            cy={piece.y}
            r={piece.r}
            style={{ fill: `var(--${spec.accent})` }}
          />
          <circle
            cx={piece.x - piece.r * 0.34}
            cy={piece.y - piece.r * 0.4}
            r={piece.r * 0.22}
            style={{ fill: "var(--plaster)" }}
            fillOpacity="0.8"
          />
        </g>
      ))}
    </g>
  );
}
