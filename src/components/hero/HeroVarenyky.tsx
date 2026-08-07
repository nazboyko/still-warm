/* Three varenyky as flattened half-moons in a tipped, overlapping pile:
   plump belly, thin scalloped seam flange, contact shadows, one gloss each.
   Light: the cone's axis is x=130 - the plate pool is hottest there, the
   middle dumpling sits nearest and is lit hardest, bounce light turns the
   forms, and the tonal range runs from near-plaster down to ink. */

const BODY =
  "M -34 8 Q -33 -6 -20 -14 Q -2 -21 14 -16 Q 30 -10 33 4 Q 34 9 28 11 Q 0 16 -26 12 Q -33 11 -34 8 Z";
const SEAM = "M -34 8 Q -33 -6 -20 -14 Q -2 -21 14 -16 Q 30 -10 33 4";
const BOUNCE = "M -26 11.5 Q 0 15.5 26 10.5";

const flangeLobes = [
  { x: -29, y: -7, r: -52, s: 1 },
  { x: -20, y: -13, r: -34, s: 1.15 },
  { x: -9, y: -17, r: -18, s: 1 },
  { x: 3, y: -18.5, r: -2, s: 1.2 },
  { x: 15, y: -16, r: 16, s: 1 },
  { x: 25, y: -11, r: 34, s: 1.1 },
  { x: 31, y: -4, r: 54, s: 0.9 },
];

interface DumplingLight {
  gradient: string;
  glossD: string;
  glossVar: string;
  glossOpacity: number;
  glossWidth: number;
  bounceOpacity: number;
  shade?: number;
}

function Dumpling({
  gradient,
  glossD,
  glossVar,
  glossOpacity,
  glossWidth,
  bounceOpacity,
  shade,
}: DumplingLight) {
  return (
    <>
      <path d={BODY} fill={`url(#${gradient})`} />
      {shade ? <path d={BODY} fill="#191411" fillOpacity={shade} /> : null}
      <path
        d={SEAM}
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeOpacity="0.5"
        strokeWidth="1.4"
      />
      {flangeLobes.map((lobe, index) => (
        <g
          key={index}
          transform={`translate(${lobe.x * 0.94} ${lobe.y * 0.94}) rotate(${lobe.r}) scale(${lobe.s})`}
        >
          <ellipse
            cx="0"
            cy="0"
            rx="3.6"
            ry="2.3"
            fill="url(#hv-flange)"
            fillOpacity="0.95"
          />
          <line
            x1="4.4"
            y1="1.6"
            x2="4.4"
            y2="-2.4"
            style={{ stroke: "var(--toast-deep)" }}
            strokeOpacity="0.55"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path
        d={BOUNCE}
        fill="none"
        style={{ stroke: "var(--tungsten)" }}
        strokeOpacity={bounceOpacity}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d={glossD}
        fill="none"
        style={{ stroke: `var(${glossVar})` }}
        strokeOpacity={glossOpacity}
        strokeWidth={glossWidth}
        strokeLinecap="round"
      />
    </>
  );
}

export function HeroVarenyky() {
  return (
    <g>
      <defs>
        <linearGradient id="hv-dough" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="52%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <linearGradient id="hv-dough-hot" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="14%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="58%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <linearGradient id="hv-flange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="100%" style={{ stopColor: "var(--tungsten)" }} />
        </linearGradient>
        <radialGradient id="hv-pool" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--gold-light)" }}
            stopOpacity="0.55"
          />
          <stop
            offset="55%"
            style={{ stopColor: "var(--tungsten)" }}
            stopOpacity="0.28"
          />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="hv-dish-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the spot's pool on the plate, hottest at the cone axis */}
      <ellipse cx="130" cy="225" rx="68" ry="8.5" fill="url(#hv-pool)" />
      <ellipse cx="130" cy="227" rx="68" ry="9" fill="url(#hv-dish-shadow)" />

      {/* back left - outside the axis, cooler, gloss leaning toward the light */}
      <g transform="translate(99 212) rotate(-16) scale(0.92)">
        <Dumpling
          gradient="hv-dough"
          shade={0.1}
          glossD="M -8 -12 Q 6 -16 16 -11"
          glossVar="--gold-light"
          glossOpacity={0.7}
          glossWidth={1.8}
          bounceOpacity={0.3}
        />
      </g>
      <path
        d="M 112 196 Q 106 208 110 222"
        fill="none"
        stroke="#191411"
        strokeOpacity="0.5"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* middle - on the axis, lit hardest */}
      <g transform="translate(138 208) rotate(3)">
        <Dumpling
          gradient="hv-dough-hot"
          glossD="M -16 -10 Q -2 -16 13 -11"
          glossVar="--plaster"
          glossOpacity={0.95}
          glossWidth={2.6}
          bounceOpacity={0.45}
        />
      </g>
      <path
        d="M 152 204 Q 148 214 152 224"
        fill="none"
        stroke="#191411"
        strokeOpacity="0.5"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* front right - tipped off the axis, gloss on its axis side */}
      <g transform="translate(172 218) rotate(12) scale(0.85)">
        <Dumpling
          gradient="hv-dough"
          shade={0.13}
          glossD="M -18 -9 Q -6 -14 4 -12"
          glossVar="--gold-light"
          glossOpacity={0.65}
          glossWidth={1.8}
          bounceOpacity={0.28}
        />
      </g>

      {/* plate contact - the tight shadows that make them sit */}
      <g fill="#0f0c0a" opacity="0.68">
        <ellipse cx="98" cy="227" rx="26" ry="2.6" />
        <ellipse cx="138" cy="228.5" rx="30" ry="2.8" />
        <ellipse cx="172" cy="229" rx="24" ry="2.4" />
      </g>
    </g>
  );
}
