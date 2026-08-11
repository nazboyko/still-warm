import type { SculptureSpec } from "../exhibitSculpture.ts";
import { foodTop, PLATE_LINE } from "../exhibitSculpture.ts";

/* A bowl takes its sauce on the broth. Run down the outside of one it stops
   being a garnish and becomes a spill. */
function BrothSwirl({ spec, tone }: { spec: SculptureSpec; tone: string }) {
  const bowl = spec.pieces[0]!;
  const cx = bowl.x;
  const cy = PLATE_LINE + bowl.y - 26.5 * bowl.scale;
  const reach = 32 * bowl.scale;
  return (
    <g>
      <path
        d={`M ${cx - reach} ${cy + 2} C ${cx - reach * 0.4} ${cy - 6} ${cx + reach * 0.3} ${cy + 6} ${cx + reach} ${cy - 3}`}
        fill="none"
        style={{ stroke: tone }}
        strokeOpacity="0.8"
        strokeWidth={3.4 * bowl.scale}
        strokeLinecap="round"
      />
      <path
        d={`M ${cx - reach * 0.7} ${cy - 0.5} C ${cx - reach * 0.3} ${cy - 5} ${cx + reach * 0.2} ${cy + 3} ${cx + reach * 0.6} ${cy - 2}`}
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.4"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <ellipse
        cx={cx - reach * 0.5}
        cy={cy + 6}
        rx={3.4 * bowl.scale}
        ry={1.6 * bowl.scale}
        style={{ fill: tone }}
        fillOpacity="0.7"
      />
    </g>
  );
}

export function Garnish({ spec }: { spec: SculptureSpec }) {
  const tone = `var(--${spec.accent})`;
  if (spec.garnish === "drizzle") {
    if (spec.kind === "bowl") return <BrothSwirl spec={spec} tone={tone} />;
    // Sauce obeys gravity: over the near face, off the edge, gathered on the
    // plate. Poured across the middle of the frame it reads as a strap.
    const x = 140 + (spec.garnishSpots[0]!.x - 140) * 0.35;
    const from = (foodTop(spec) + PLATE_LINE) / 2;
    return (
      <g>
        <path
          d={`M ${x - 9} ${from} q 4 6 3 12 q -1 7 2 12 q 3 4 6 4`}
          fill="none"
          style={{ stroke: tone }}
          strokeOpacity="0.8"
          strokeWidth="3.4"
          strokeLinecap="round"
        />
        {/* Where it gathered. A syrup pool on a warm plate needs its own depth
            and its own gloss, or the sauce disappears into the ceramic. */}
        <ellipse
          cx={x + 2}
          cy={150.5}
          rx="19"
          ry="5"
          style={{ fill: "var(--ink)" }}
          fillOpacity="0.35"
        />
        <path
          d={`M ${x - 19} 148 q 7 -5 18 -3 q 13 2 19 6 q -6 5 -19 5 q -15 0 -18 -8 z`}
          style={{ fill: tone }}
          fillOpacity="0.88"
        />
        <ellipse
          cx={x + 27}
          cy={150}
          rx="4.6"
          ry="2.2"
          style={{ fill: tone }}
          fillOpacity="0.66"
        />
        <ellipse
          cx={x + 37}
          cy={148.5}
          rx="2.4"
          ry="1.3"
          style={{ fill: tone }}
          fillOpacity="0.55"
        />
        {/* the gloss that tells sauce from a stain */}
        <path
          d={`M ${x - 12} 146.5 q 8 -3 16 -1`}
          fill="none"
          style={{ stroke: "var(--plaster)" }}
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </g>
    );
  }

  if (spec.garnish === "dusting") {
    return (
      <g style={{ fill: "var(--plaster)" }}>
        {spec.garnishSpots.flatMap((spot, index) =>
          [0, 1, 2, 3].map((step) => (
            <ellipse
              key={`${index}-${step}`}
              cx={spot.x + (step - 1.5) * 4.5 + (index % 2 ? 2 : -2)}
              cy={spot.y + (step % 2 ? 3 : -2.5) + index * 1.6}
              rx={0.9 + (step % 3) * 0.55}
              ry={0.7 + ((step + index) % 3) * 0.45}
              fillOpacity={0.5 + (step % 2) * 0.25}
            />
          )),
        )}
      </g>
    );
  }

  const seeds = spec.garnish === "seeds";
  return (
    <g>
      {spec.garnishSpots.map((spot, index) => {
        const rx = (seeds ? spot.r * 0.5 : spot.r) * (index % 2 ? 1.08 : 0.94);
        const ry = (seeds ? spot.r * 0.4 : spot.r) * (index % 3 ? 0.9 : 1.05);
        return (
          <g
            key={index}
            transform={`rotate(${(index % 3) * 14 - 12} ${spot.x} ${spot.y})`}
          >
            {/* what puts it on the food instead of over it */}
            <ellipse
              cx={spot.x + rx * 0.18}
              cy={spot.y + ry * 0.72}
              rx={rx * 0.9}
              ry={ry * 0.42}
              style={{ fill: "var(--ink)" }}
              fillOpacity="0.45"
            />
            <ellipse
              cx={spot.x}
              cy={spot.y}
              rx={rx}
              ry={ry}
              style={{ fill: seeds ? "var(--toast-deep)" : tone }}
            />
            {spec.garnish === "berries" ? (
              <ellipse
                cx={spot.x - rx * 0.32}
                cy={spot.y - ry * 0.36}
                rx={rx * 0.26}
                ry={ry * 0.19}
                style={{ fill: "var(--plaster)" }}
                fillOpacity={index % 2 ? 0.6 : 0.78}
              />
            ) : null}
          </g>
        );
      })}
    </g>
  );
}
