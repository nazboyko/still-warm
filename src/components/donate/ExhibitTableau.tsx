import { VarenykDefs } from "../art/Varenyk.tsx";
import type { SculptureSpec } from "./exhibitSculpture.ts";
import { foodTop } from "./exhibitSculpture.ts";
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
      <defs>
        <radialGradient id="reserved-glow" cx="50%" cy="68%" r="60%">
          <stop offset="0%" stopColor="#f2d9a8" stopOpacity="0.6" />
          <stop offset="45%" stopColor="#e8a94e" stopOpacity="0.32" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        {/* The lit surface of anything baked, carried all the way down into
            syrup: without that last stop the food has no dark and reads as
            soap rather than as something out of a pan. */}
        <linearGradient id="vd-food" x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="22%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="56%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="82%" style={{ stopColor: "var(--toast)" }} />
          <stop offset="100%" style={{ stopColor: "var(--syrup)" }} />
        </linearGradient>
        {/* Browning is warm. Laid over a pale base, toast-deep alone turns
            olive and the food looks spoiled instead of cooked. */}
        <radialGradient id="vd-sear" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--syrup)" }}
            stopOpacity="0.6"
          />
          <stop
            offset="55%"
            style={{ stopColor: "var(--toast)" }}
            stopOpacity="0.32"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--toast)" }}
            stopOpacity="0"
          />
        </radialGradient>
        {/* Broth: lit where it meets the far wall, deep against the near one. */}
        <linearGradient id="vd-broth" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="35%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--syrup)" }} />
        </linearGradient>
        <linearGradient id="vd-core" x1="0.12" y1="0" x2="0.72" y2="1">
          <stop
            offset="0%"
            style={{ stopColor: "var(--ink)" }}
            stopOpacity="0"
          />
          <stop
            offset="42%"
            style={{ stopColor: "var(--ink)" }}
            stopOpacity="0.05"
          />
          <stop
            offset="76%"
            style={{ stopColor: "var(--ink)" }}
            stopOpacity="0.26"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--ink)" }}
            stopOpacity="0.5"
          />
        </linearGradient>
        <radialGradient id="vd-contact" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--ink)" }}
            stopOpacity="0.8"
          />
          <stop
            offset="62%"
            style={{ stopColor: "var(--ink)" }}
            stopOpacity="0.42"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--ink)" }}
            stopOpacity="0"
          />
        </radialGradient>
        {/* Dark in the well, warm where the fixture catches the rim, and rolled
            back down at the very edge. Dark ceramic, not a hole in the table. */}
        <radialGradient id="vd-plate" cx="50%" cy="50%" r="50%">
          <stop offset="0%" style={{ stopColor: "var(--ink)" }} />
          <stop offset="38%" style={{ stopColor: "var(--syrup)" }} />
          <stop offset="88%" style={{ stopColor: "var(--toast-deep)" }} />
          <stop offset="100%" style={{ stopColor: "var(--syrup)" }} />
        </radialGradient>
        {/* Warm where it leaves the food, gone by the top. */}
        <linearGradient id="vd-steam" x1="0" y1="1" x2="0" y2="0">
          <stop
            offset="0%"
            style={{ stopColor: "var(--gold-light)" }}
            stopOpacity="0.32"
          />
          <stop
            offset="55%"
            style={{ stopColor: "var(--plaster)" }}
            stopOpacity="0.14"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--plaster)" }}
            stopOpacity="0"
          />
        </linearGradient>
        <VarenykDefs id="vd" />
      </defs>
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
