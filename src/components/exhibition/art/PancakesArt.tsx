/* A stack of pancakes under the brightest spot in the museum: uneven honey-gold
   discs carrying the pan's map, butter running down the slope, berry compote
   over the near edge, and a translucent syrup run on the far side. */
const discShapes = [
  "M -62 0 Q -61 -7 -46 -11 Q -30 -14 -12 -14 Q 8 -15 26 -12 Q 46 -10 58 -6 Q 65 -3 62 2 Q 56 8 38 10 Q 14 12 -12 11 Q -38 10 -55 6 Q -64 4 -62 0 Z",
  "M -61 1 Q -63 -6 -44 -10 Q -26 -15 -6 -13 Q 14 -16 32 -11 Q 52 -9 60 -5 Q 66 -1 61 3 Q 52 9 30 10 Q 4 13 -20 10 Q -44 9 -56 5 Q -63 3 -61 1 Z",
  "M -63 -1 Q -59 -8 -42 -12 Q -22 -13 -4 -15 Q 16 -13 34 -13 Q 50 -9 59 -7 Q 64 -2 61 2 Q 54 7 34 11 Q 10 12 -16 10 Q -40 11 -57 5 Q -65 2 -63 -1 Z",
];

const stack = [
  { x: 160, y: 176, s: 1, r: -1, shape: 0 },
  { x: 158, y: 161, s: 0.98, r: 1.5, shape: 2 },
  { x: 162, y: 146, s: 1.01, r: -2, shape: 1 },
  { x: 159, y: 131, s: 0.96, r: 1, shape: 0 },
  { x: 161, y: 117, s: 0.93, r: -1.5, shape: 2 },
];

/* Bubbles in the crumb, showing along the side of each disc. */
const poreSets = [
  [
    { x: -38, y: 3, r: 2.6 },
    { x: -12, y: 6, r: 1.7 },
    { x: 16, y: 4, r: 2.2 },
    { x: 42, y: 6, r: 1.5 },
  ],
  [
    { x: -46, y: 5, r: 1.8 },
    { x: -20, y: 3, r: 2.8 },
    { x: 6, y: 6, r: 1.6 },
    { x: 34, y: 3, r: 2.3 },
  ],
  [
    { x: -30, y: 6, r: 2.1 },
    { x: -2, y: 3, r: 2.5 },
    { x: 26, y: 6, r: 1.6 },
    { x: 48, y: 4, r: 1.9 },
  ],
];

function Pancake({ shape }: { shape: number }) {
  return (
    <g>
      <path d={discShapes[shape]!} fill="url(#pan-cake)" />
      <g fill="url(#pan-scorch)">
        <ellipse cx="-30" cy="-6" rx="17" ry="5" />
        <ellipse cx="8" cy="-5" rx="13" ry="4.2" />
        <ellipse cx="40" cy="-4" rx="10" ry="3.4" />
      </g>
      {poreSets[shape]!.map((pore, index) => (
        <g key={index}>
          <ellipse
            cx={pore.x}
            cy={pore.y}
            rx={pore.r}
            ry={pore.r * 0.72}
            style={{ fill: "var(--toast-deep)" }}
            fillOpacity="0.32"
          />
          <path
            d={`M ${pore.x - pore.r * 0.7} ${pore.y - pore.r * 0.4} Q ${pore.x} ${pore.y - pore.r} ${pore.x + pore.r * 0.7} ${pore.y - pore.r * 0.4}`}
            fill="none"
            style={{ stroke: "var(--gold-light)" }}
            strokeOpacity="0.5"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path
        d="M -52 -6 Q -30 -12 -6 -12 Q 14 -12 30 -10"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M -58 4 Q -14 11 56 5"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </g>
  );
}

export function PancakesArt({ lit }: { lit: boolean }) {
  return (
    <svg
      className="room-art"
      viewBox="0 0 320 240"
      aria-hidden="true"
      data-lit={lit}
    >
      <defs>
        <radialGradient id="pancakes-glow" cx="50%" cy="64%" r="58%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.55" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pancakes-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="1" />
          <stop offset="70%" stopColor="#e8a94e" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pan-cake" x1="0" y1="0" x2="0.08" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="30%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="70%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <linearGradient id="pan-top" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="45%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="100%" style={{ stopColor: "var(--tungsten)" }} />
        </linearGradient>
        <linearGradient id="pan-butter" x1="0" y1="0" x2="0.2" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="100%" style={{ stopColor: "var(--gold-light)" }} />
        </linearGradient>
        <radialGradient id="pan-scorch" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0.5"
          />
          <stop
            offset="60%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0.22"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0"
          />
        </radialGradient>
        <radialGradient id="pan-toast-map" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--toast)" }}
            stopOpacity="0.78"
          />
          <stop
            offset="55%"
            style={{ stopColor: "var(--toast)" }}
            stopOpacity="0.4"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--toast)" }}
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      <path
        className="art-cone"
        d="M160 6 C144 80 122 150 100 196 H220 C198 150 176 80 160 6 Z"
        fill="url(#pancakes-cone)"
        opacity="0.07"
      />
      <ellipse cx="160" cy="170" rx="120" ry="56" fill="url(#pancakes-glow)" />
      <ellipse
        className="art-glow-lit"
        cx="160"
        cy="170"
        rx="120"
        ry="56"
        fill="url(#pancakes-glow)"
      />

      {/* the plate */}
      <ellipse cx="160" cy="192" rx="98" ry="16" fill="#0f0c0a" />
      <path
        d="M62 190 A98 15 0 0 1 258 190"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.32"
        strokeWidth="1.5"
      />
      <ellipse cx="160" cy="191" rx="84" ry="11" fill="#151009" />
      <path
        d="M76 189 A84 10 0 0 1 244 189"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.15"
        strokeWidth="1.2"
      />

      {/* the stack throws its own shadow across the plate, away from the spot */}
      <ellipse
        cx="124"
        cy="188"
        rx="54"
        ry="7"
        fill="#0f0c0a"
        opacity="0.38"
        transform="rotate(-4 124 188)"
      />
      <ellipse
        cx="160"
        cy="187"
        rx="70"
        ry="6.5"
        fill="#0f0c0a"
        opacity="0.5"
      />
      <ellipse cx="160" cy="188" rx="56" ry="3" fill="#000" opacity="0.8" />

      {stack.map((disc, index) => (
        <g
          key={index}
          transform={`translate(${disc.x} ${disc.y}) rotate(${disc.r}) scale(${disc.s})`}
        >
          <Pancake shape={disc.shape} />
        </g>
      ))}

      {/* the top face, and the map the pan left on it */}
      <ellipse cx="161" cy="108" rx="56" ry="11" fill="url(#pan-top)" />
      <g fill="url(#pan-toast-map)">
        <ellipse cx="118" cy="108" rx="13" ry="4.6" />
        <ellipse cx="138" cy="104" rx="9" ry="3.2" />
        <ellipse cx="150" cy="112" rx="7" ry="2.6" />
        <ellipse cx="170" cy="105" rx="8" ry="2.8" />
        <ellipse cx="186" cy="111" rx="12" ry="4" />
        <ellipse cx="202" cy="107" rx="11" ry="4.2" />
        <ellipse cx="160" cy="113" rx="6" ry="2.2" />
        <ellipse cx="176" cy="113" rx="5" ry="2" />
        <ellipse cx="128" cy="113" rx="8" ry="2.6" />
        <ellipse cx="210" cy="111" rx="7" ry="2.4" />
        <ellipse cx="146" cy="100" rx="6" ry="2" />
      </g>

      {/* berry compote spilling over the near edge, one of them cut */}
      <g style={{ fill: "var(--beet)" }}>
        <ellipse cx="133" cy="103" rx="11" ry="7.4" />
        <ellipse cx="146" cy="106" rx="7" ry="5" />
        <ellipse cx="124" cy="111" rx="8.6" ry="6.6" />
        <ellipse cx="120" cy="124" rx="7.8" ry="6.8" />
        <ellipse cx="128" cy="137" rx="5.4" ry="4.8" />
      </g>
      <ellipse
        cx="137"
        cy="118"
        rx="7.4"
        ry="6.2"
        style={{ fill: "var(--syrup)" }}
      />
      <ellipse
        cx="137"
        cy="118"
        rx="5.6"
        ry="4.6"
        style={{ fill: "var(--beet)" }}
      />
      <path
        d="M 133 116 Q 137 114 141 117"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.5"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <g
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M 125 103 Q 133 109 141 104" />
        <path d="M 116 120 Q 121 126 127 121" />
        <path d="M 123 135 Q 128 140 133 135" />
      </g>
      <g
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.45"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M 129 99 Q 133 97 137 99" />
        <path d="M 117 108 Q 121 106 125 108" />
        <path d="M 116 121 Q 119 119 122 121" />
      </g>

      {/* butter, running off in rivulets */}
      <ellipse
        cx="172"
        cy="106"
        rx="21"
        ry="6.5"
        style={{ fill: "var(--gold-light)" }}
        fillOpacity="0.6"
      />
      <g
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.5"
        strokeLinecap="round"
      >
        <path d="M 167 106 Q 165 112 161 117" strokeWidth="2" />
        <path d="M 179 107 Q 183 112 187 115" strokeWidth="1.6" />
      </g>
      <path
        d="M 160 100 Q 172 96 184 100 L 184 105 Q 172 110 160 105 Z"
        style={{ fill: "var(--gold-light)" }}
      />
      <path
        d="M 160 100 Q 172 95 184 100 Q 172 105 160 100 Z"
        fill="url(#pan-butter)"
      />
      <path
        d="M 164 100 Q 172 97 180 100"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.9"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* syrup: translucent, the pancake showing through, each drip lit */}
      <g style={{ fill: "var(--syrup)" }} fillOpacity="0.58">
        <ellipse cx="196" cy="108" rx="17" ry="4.6" />
        <path d="M 186 104 Q 200 102 209 110 Q 213 116 207 117 Q 195 115 186 110 Z" />
        <path d="M 200 118 Q 204 126 202 132 Q 197 133 196 127 Q 196 121 200 118 Z" />
        <path d="M 210 134 Q 213 143 211 149 Q 206 150 205 143 Q 206 137 210 134 Z" />
        <path d="M 198 152 Q 202 163 200 170 Q 195 171 194 162 Q 194 156 198 152 Z" />
        <ellipse cx="200" cy="184" rx="17" ry="4.4" />
      </g>
      <g
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.75"
        strokeWidth="1.3"
        strokeLinecap="round"
      >
        <path d="M 190 106 Q 199 106 205 110" />
        <path d="M 198.5 121 Q 200 126 199 130" />
        <path d="M 208.5 137 Q 210 142 209 146" />
        <path d="M 196.5 156 Q 199 162 198 167" />
        <path d="M 191 182 Q 199 185 207 182" />
      </g>

      <path
        d="M 150 88c-6-7-1-12 1-16 2-4 2.4-8-1-13"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.24"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
