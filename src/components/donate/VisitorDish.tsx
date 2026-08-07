import type { SculptureSpec } from "./exhibitSculpture.ts";
import { FoodPiece } from "./foodPrimitives.tsx";

const BASE = 138;

function Garnish({ spec }: { spec: SculptureSpec }) {
  const tone = `var(--${spec.accent})`;
  if (spec.garnish === "drizzle") {
    return (
      <g
        fill="none"
        style={{ stroke: tone }}
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M 96 122 Q 122 112 146 122 Q 168 132 188 120" />
        <path
          d="M 104 128 Q 128 120 150 128"
          strokeOpacity="0.6"
          strokeWidth="1.8"
        />
      </g>
    );
  }
  if (spec.garnish === "sprig") {
    return (
      <g style={{ stroke: "var(--brass)" }} fill="none" strokeLinecap="round">
        <path d="M 150 124 Q 158 112 172 106" strokeWidth="1.8" />
        <path d="M 156 116 Q 160 108 154 104" strokeWidth="1.4" />
        <path d="M 162 111 Q 168 104 176 104" strokeWidth="1.4" />
        <path d="M 158 120 Q 166 118 172 112" strokeWidth="1.2" />
      </g>
    );
  }
  return (
    <g>
      {spec.garnishSpots.map((spot, index) => (
        <g key={index}>
          <circle
            cx={spot.x}
            cy={spot.y}
            r={spec.garnish === "seeds" ? spot.r * 0.45 : spot.r}
            style={{
              fill: spec.garnish === "seeds" ? "var(--toast-deep)" : tone,
            }}
          />
          {spec.garnish === "berries" ? (
            <circle
              cx={spot.x - spot.r * 0.34}
              cy={spot.y - spot.r * 0.4}
              r={spot.r * 0.24}
              style={{ fill: "var(--plaster)" }}
              fillOpacity="0.85"
            />
          ) : null}
        </g>
      ))}
    </g>
  );
}

/* The visitor's exhibit: plated from real parts, the brightest dish here. */
export function VisitorDish({ spec }: { spec: SculptureSpec }) {
  return (
    <g className="dish-food">
      {spec.pieces.map((piece, index) => (
        <g
          key={index}
          transform={`translate(${piece.x} ${BASE + piece.y}) rotate(${piece.rotate}) scale(${piece.scale})`}
        >
          <FoodPiece kind={spec.kind} accent={spec.accent} />
        </g>
      ))}
      <Garnish spec={spec} />
    </g>
  );
}
