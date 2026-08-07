import type { SculptureSpec } from "./exhibitSculpture.ts";
import { FoodPiece } from "./foodPrimitives.tsx";

const BASE = 138;

function Garnish({ spec }: { spec: SculptureSpec }) {
  const tone = `var(--${spec.accent})`;
  if (spec.garnish === "drizzle") {
    return (
      <g>
        {/* sauce: an uneven ribbon, gathered in a pool where it started */}
        <ellipse
          cx="97"
          cy="128"
          rx="8"
          ry="3.6"
          style={{ fill: tone }}
          fillOpacity="0.72"
        />
        <g style={{ fill: tone }} fillOpacity="0.68">
          <path d="M 97 126 C 107 119.5 118 117.5 129 121 L 129.6 123.6 C 119 121 108 123 98.6 129.6 Z" />
          <path d="M 136 122.5 C 144 125 152 125.8 159 123.4 L 159.6 125.4 C 152 128 143 127.4 135.4 124.4 Z" />
          <path d="M 166 122.6 C 174 120.6 181 117 187 113 L 188.4 115.8 C 182.6 120 175.6 123.4 167 125.6 Z" />
        </g>
        <g
          fill="none"
          style={{ stroke: "var(--plaster)" }}
          strokeOpacity="0.45"
          strokeWidth="1.2"
          strokeLinecap="round"
        >
          <path d="M 103 124 C 112 119 120 118 127 121" />
          <path d="M 171 121 C 177 118 182 115 186 113" />
          <path d="M 92 127 Q 97 130 102 127" />
        </g>
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
      {/* what the plating left behind */}
      <g style={{ fill: "var(--toast)" }} fillOpacity="0.75">
        <ellipse cx="76" cy="146" rx="2.4" ry="1.5" />
        <ellipse cx="92" cy="150" rx="1.7" ry="1.2" />
        <ellipse cx="200" cy="147" rx="2.1" ry="1.4" />
        <ellipse cx="214" cy="150" rx="1.5" ry="1.1" />
      </g>
    </g>
  );
}
