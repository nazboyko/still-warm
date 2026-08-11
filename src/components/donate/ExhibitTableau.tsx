import type { SculptureSpec } from "./exhibitSculpture.ts";
import { foodTop } from "./exhibitSculpture.ts";
import { FoodMaterials } from "./food/materials.tsx";
import { VisitorDish } from "./VisitorDish.tsx";

/* Three wisps rising from wherever the food ends. None is the twin of another
   and none starts on the same line, or they read as a decoration. */
const wisps = [
  { x: -17, y: 0, d: "c -4 -10 3 -14 4 -20 1 -7 -3 -11 -5 -16" },
  { x: 15, y: -7, d: "c 5 -11 -1 -16 -3 -21 -2 -6 1 -10 4 -14" },
  { x: -1, y: -3, d: "c -3 -9 2 -13 3 -18 1 -6 -2 -9 -4 -12" },
];

/* The exhibit as a catalogue photograph: glow, plate, dish, steam. One tableau,
   two homes - the reserved frame on the page and the postcard canvas. */
export function ExhibitTableau({ spec }: { spec: SculptureSpec }) {
  const top = foodTop(spec);
  return (
    <>
      <FoodMaterials />
      <ellipse
        className="dish-glow"
        cx="140"
        cy="128"
        rx="118"
        ry="54"
        fill="url(#reserved-glow)"
      />
      <g className="dish-plate">
        <ellipse cx="140" cy="150" rx="104" ry="17" fill="url(#vd-contact)" />
        <ellipse cx="140" cy="143" rx="90" ry="13.5" fill="url(#vd-plate)" />
        <path
          d="M50 143 A90 13.5 0 0 1 230 143"
          fill="none"
          style={{ stroke: "var(--tungsten)" }}
          strokeOpacity="0.42"
          strokeWidth="1.4"
        />
        {/* Light wraps the near rim too, but only just. */}
        <path
          d="M50 143 A90 13.5 0 0 0 230 143"
          fill="none"
          style={{ stroke: "var(--tungsten)" }}
          strokeOpacity="0.2"
          strokeWidth="1"
        />
      </g>
      <VisitorDish spec={spec} />
      {/* Two passes per wisp, wide and faint under thin and bright: steam has
          no edge, and a blur filter would cost the postcard its raster. */}
      <g
        className="dish-steam"
        fill="none"
        stroke="url(#vd-steam)"
        strokeLinecap="round"
      >
        {wisps.slice(0, spec.steam).map((wisp, index) => {
          const d = `M ${140 + wisp.x} ${top - 5 + wisp.y} ${wisp.d}`;
          return (
            <g key={index}>
              <path d={d} strokeWidth="6" strokeOpacity="0.3" />
              <path d={d} strokeWidth="1.2" />
            </g>
          );
        })}
      </g>
    </>
  );
}
