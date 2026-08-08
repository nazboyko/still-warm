import type { SculptureSpec } from "./exhibitSculpture.ts";
import { FoodPiece } from "./foodPrimitives.tsx";

const BASE = 138;

function Garnish({ spec }: { spec: SculptureSpec }) {
  const tone = `var(--${spec.accent})`;
  if (spec.garnish === "drizzle") {
    return (
      <g>
        {/* where the spoon started and the sauce gathered */}
        <path
          d="M 88 128 q 9 -6 17 -2 q 5 4 -1 8 q -11 4 -16 -2 z"
          style={{ fill: tone }}
          fillOpacity="0.75"
        />
        <g style={{ fill: tone }} fillOpacity="0.7">
          {/* one gesture: thick, thinning, thickening again as it slows */}
          <path d="M 102 125 C 112 117 123 116 133 121 C 139 124 145 125.5 151 125 L 151.4 127 C 145 127.8 138 126.4 131 123 C 122 119 113 120 104 129 Z" />
          <path d="M 151 125 C 158 124.4 165 122 172 118.5 C 178 115.5 184 112.5 189 110 L 191 114.5 C 185 117.5 179 120.8 173 124 C 166 127.4 158 128.6 151.4 127 Z" />
        </g>
        <g
          fill="none"
          style={{ stroke: "var(--plaster)" }}
          strokeLinecap="round"
        >
          <path
            d="M 109 122 C 118 117 126 117 132 120"
            strokeOpacity="0.6"
            strokeWidth="1.6"
          />
          <path
            d="M 174 122 C 180 119 184 116 188 114"
            strokeOpacity="0.55"
            strokeWidth="1.3"
          />
          <path
            d="M 92 126 q 6 -3 11 0"
            strokeOpacity="0.5"
            strokeWidth="1.4"
          />
        </g>
      </g>
    );
  }

  if (spec.garnish === "dusting") {
    return (
      <g style={{ fill: "var(--plaster)" }}>
        {spec.garnishSpots.flatMap((spot, index) =>
          [0, 1, 2, 3].map((step) => (
            <circle
              key={`${index}-${step}`}
              cx={spot.x + (step - 1.5) * 7 + (index % 2 ? 3 : -3)}
              cy={spot.y + (step % 2 ? 5 : -4) + index * 3}
              r={0.9 + (step % 3) * 0.5}
              fillOpacity={0.5 + (step % 2) * 0.25}
            />
          )),
        )}
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
              cx={spot.x + spot.r * (index % 2 ? 0.3 : -0.34)}
              cy={spot.y - spot.r * (0.28 + (index % 3) * 0.14)}
              r={spot.r * (0.16 + (index % 3) * 0.07)}
              style={{ fill: "var(--plaster)" }}
              fillOpacity={index % 2 ? 0.7 : 0.9}
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
