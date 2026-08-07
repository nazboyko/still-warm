/* Three varenyky as flattened half-moons in a tipped, overlapping pile:
   plump belly, thin scalloped seam flange, contact shadows, one gloss each. */
export function HeroVarenyky() {
  const body =
    "M -34 8 Q -33 -6 -20 -14 Q -2 -21 14 -16 Q 30 -10 33 4 Q 34 9 28 11 Q 0 16 -26 12 Q -33 11 -34 8 Z";
  const flangeLobes = [
    { x: -29, y: -7, r: -52, s: 1 },
    { x: -20, y: -13, r: -34, s: 1.15 },
    { x: -9, y: -17, r: -18, s: 1 },
    { x: 3, y: -18.5, r: -2, s: 1.2 },
    { x: 15, y: -16, r: 16, s: 1 },
    { x: 25, y: -11, r: 34, s: 1.1 },
    { x: 31, y: -4, r: 54, s: 0.9 },
  ];

  const dumpling = (glossD: string) => (
    <>
      <path d={body} fill="url(#hv-dough)" />
      <path
        d="M -34 8 Q -33 -6 -20 -14 Q -2 -21 14 -16 Q 30 -10 33 4"
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
        d={glossD}
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.85"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </>
  );

  return (
    <g>
      <defs>
        <linearGradient id="hv-dough" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="52%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <linearGradient id="hv-flange" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="100%" style={{ stopColor: "var(--tungsten)" }} />
        </linearGradient>
        <radialGradient id="hv-dish-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="130" cy="227" rx="68" ry="9" fill="url(#hv-dish-shadow)" />

      {/* back left, tipped away */}
      <g transform="translate(99 212) rotate(-16) scale(0.92)">
        {dumpling("M -20 -8 Q -6 -14 8 -11")}
      </g>
      {/* contact shadow of the middle on the left */}
      <path
        d="M 112 196 Q 106 208 110 222"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* middle, most upright */}
      <g transform="translate(138 208) rotate(3)">
        {dumpling("M -18 -9 Q -2 -15 12 -11")}
      </g>
      {/* contact shadow of the right on the middle */}
      <path
        d="M 152 204 Q 148 214 152 224"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* front right, tipped toward the light */}
      <g transform="translate(172 218) rotate(12) scale(0.85)">
        {dumpling("M -16 -9 Q 0 -14 12 -10")}
      </g>

      {/* plate contact - the tight shadows that make them sit */}
      <g fill="#0f0c0a" opacity="0.5">
        <ellipse cx="98" cy="227" rx="26" ry="2.6" />
        <ellipse cx="138" cy="228.5" rx="30" ry="2.8" />
        <ellipse cx="172" cy="229" rx="24" ry="2.4" />
      </g>
    </g>
  );
}
