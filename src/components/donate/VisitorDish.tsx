import type { SculptureSpec } from "./exhibitSculpture.ts";
import { PLATE_LINE } from "./exhibitSculpture.ts";
import { FoodPiece } from "./food/FoodPiece.tsx";
import { Garnish } from "./food/Garnish.tsx";

/* The visitor's exhibit: plated from real parts, the brightest dish here. */
export function VisitorDish({ spec }: { spec: SculptureSpec }) {
  return (
    <g className="dish-food">
      {/* Painted right to left. The key light is upper left, so every piece
          throws its shadow rightward, and that shadow only shows if the piece
          it falls on was laid down first. */}
      {[...spec.pieces].reverse().map((piece, index) => (
        <g
          key={index}
          transform={`translate(${piece.x} ${PLATE_LINE + piece.y}) rotate(${piece.rotate}) scale(${piece.scale})`}
        >
          <FoodPiece kind={spec.kind} accent={spec.accent} />
        </g>
      ))}
      <Garnish spec={spec} />
    </g>
  );
}
