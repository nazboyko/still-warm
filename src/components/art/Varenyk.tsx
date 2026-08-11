/* The calibrated varenyk: a flattened half-moon with the seam along the top
   arc, pinched flange lobes, and one butter gloss. Drawn around its own
   origin so callers place it with translate/rotate/scale. */

export const BODY =
  "M -34 8 Q -33 -6 -20 -14 Q -2 -21 14 -16 Q 30 -10 33 4 Q 34 9 28 11 Q 0 16 -26 12 Q -33 11 -34 8 Z";
const SEAM = "M -34 8 Q -33 -6 -20 -14 Q -2 -21 14 -16 Q 30 -10 33 4";

const flangeLobes = [
  { x: -29, y: -7, r: -52, s: 1 },
  { x: -20, y: -13, r: -34, s: 1.15 },
  { x: -9, y: -17, r: -18, s: 1 },
  { x: 3, y: -18.5, r: -2, s: 1.2 },
  { x: 15, y: -16, r: 16, s: 1 },
  { x: 25, y: -11, r: 34, s: 1.1 },
  { x: 31, y: -4, r: 54, s: 0.9 },
];

export function VarenykDefs({ id }: { id: string }) {
  return (
    <>
      <linearGradient id={`${id}-dough`} x1="0" y1="0" x2="0.25" y2="1">
        <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
        <stop offset="52%" style={{ stopColor: "var(--tungsten)" }} />
        <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
      </linearGradient>
      <linearGradient id={`${id}-flange`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
        <stop offset="100%" style={{ stopColor: "var(--tungsten)" }} />
      </linearGradient>
      <radialGradient id={`${id}-bake`} cx="50%" cy="50%" r="50%">
        <stop
          offset="0%"
          style={{ stopColor: "var(--toast)" }}
          stopOpacity="0.45"
        />
        <stop
          offset="60%"
          style={{ stopColor: "var(--toast)" }}
          stopOpacity="0.2"
        />
        <stop
          offset="100%"
          style={{ stopColor: "var(--toast)" }}
          stopOpacity="0"
        />
      </radialGradient>
    </>
  );
}

export function Varenyk({ id, glossD }: { id: string; glossD: string }) {
  return (
    <>
      <path d={BODY} fill={`url(#${id}-dough)`} />
      {/* what the water and the pan left on the dough */}
      <g fill={`url(#${id}-bake)`}>
        <ellipse cx="-14" cy="-2" rx="14" ry="6" />
        <ellipse cx="12" cy="2" rx="10" ry="4.6" />
      </g>
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
            fill={`url(#${id}-flange)`}
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
        d={glossD}
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.85"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  );
}
