/* A stack of pancakes under the brightest spot in the museum: uneven honey-gold
   discs carrying the pan's map, butter running down the slope, berry compote
   over the near edge, and a translucent syrup run on the far side. */
import { SpotBeam } from "../../art/SpotBeam.tsx";

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

/* Bubbles in the crumb, opened along the side of each disc. */
const poreSets = [
  [
    {
      d: "M -42 1 Q -35 -2 -30 2 Q -34 7 -40 5 Z",
      lip: "M -42 1 Q -35 -2 -30 2",
    },
    { d: "M -6 3 Q 2 0 6 4 Q 1 8 -5 7 Z", lip: "M -6 3 Q 2 0 6 4" },
    { d: "M 30 2 Q 38 -1 42 3 Q 37 7 31 6 Z", lip: "M 30 2 Q 38 -1 42 3" },
  ],
  [
    {
      d: "M -34 3 Q -27 -1 -22 3 Q -27 8 -33 6 Z",
      lip: "M -34 3 Q -27 -1 -22 3",
    },
    { d: "M 2 1 Q 11 -2 15 2 Q 10 7 3 6 Z", lip: "M 2 1 Q 11 -2 15 2" },
    { d: "M 38 4 Q 45 1 48 5 Q 43 9 38 8 Z", lip: "M 38 4 Q 45 1 48 5" },
  ],
  [
    {
      d: "M -48 2 Q -41 -1 -37 3 Q -42 8 -47 6 Z",
      lip: "M -48 2 Q -41 -1 -37 3",
    },
    { d: "M -14 4 Q -6 0 -1 4 Q -6 9 -13 8 Z", lip: "M -14 4 Q -6 0 -1 4" },
    { d: "M 20 2 Q 29 -2 34 2 Q 28 7 21 6 Z", lip: "M 20 2 Q 29 -2 34 2" },
  ],
];

const berries = [
  { x: 133, y: 103, r: 8 },
  { x: 147, y: 106, r: 5.6 },
  { x: 123, y: 112, r: 7 },
  { x: 119, y: 125, r: 6.6 },
  { x: 128, y: 137, r: 5 },
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
          <path
            d={pore.d}
            style={{ fill: "var(--toast-deep)" }}
            fillOpacity="0.38"
          />
          <path
            d={pore.lip}
            fill="none"
            style={{ stroke: "var(--plaster)" }}
            strokeOpacity="0.6"
            strokeWidth="1.2"
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

export function PancakesArt({
  lit,
  steaming,
}: {
  lit: boolean;
  steaming: boolean;
}) {
  return (
    <svg
      className="room-art"
      viewBox="0 0 320 240"
      aria-hidden="true"
      data-lit={lit}
      data-steam={steaming ? "live" : "paused"}
    >
      <defs>
        <linearGradient id="pan-steam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#efe6d8" stopOpacity="0" />
          <stop offset="45%" stopColor="#efe6d8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#efe6d8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pancakes-glow" cx="50%" cy="64%" r="60%">
          <stop offset="0%" stopColor="#f2d9a8" stopOpacity="0.62" />
          <stop offset="45%" stopColor="#e8a94e" stopOpacity="0.34" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pan-cake" x1="0" y1="0" x2="0.08" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="22%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="62%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="90%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <linearGradient id="pan-top" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="38%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="100%" style={{ stopColor: "var(--gold-light)" }} />
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

      <SpotBeam
        className="art-cone"
        id="pancakes-beam"
        x={160}
        top={20}
        bottom={196}
        spread={60}
        opacity={0.1}
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
      {berries.map((berry, index) => (
        <g key={index}>
          <ellipse
            cx={berry.x + 1}
            cy={berry.y + berry.r * 0.85}
            rx={berry.r * 0.95}
            ry={berry.r * 0.42}
            style={{ fill: "var(--syrup)" }}
            fillOpacity="0.55"
          />
          <circle
            cx={berry.x}
            cy={berry.y}
            r={berry.r}
            style={{ fill: "var(--beet)" }}
          />
          <path
            d={`M ${berry.x - berry.r * 0.62} ${berry.y + berry.r * 0.35} Q ${berry.x} ${berry.y + berry.r} ${berry.x + berry.r * 0.62} ${berry.y + berry.r * 0.35}`}
            fill="none"
            style={{ stroke: "var(--syrup)" }}
            strokeOpacity="0.6"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <ellipse
            cx={berry.x + berry.r * 0.1}
            cy={berry.y - berry.r * 0.78}
            rx={berry.r * 0.28}
            ry={berry.r * 0.18}
            style={{ fill: "var(--syrup)" }}
          />
          <circle
            cx={berry.x - berry.r * 0.36}
            cy={berry.y - berry.r * 0.4}
            r={berry.r * 0.2}
            style={{ fill: "var(--plaster)" }}
            fillOpacity="0.85"
          />
        </g>
      ))}
      <circle cx="137" cy="118" r="7" style={{ fill: "var(--syrup)" }} />
      <circle cx="137" cy="118" r="5.4" style={{ fill: "var(--beet)" }} />
      <path
        d="M 133 116 Q 137 114 141 117"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.55"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* butter: a thick pat going soft, its melt pooling around it */}
      <path
        d="M 152 106 Q 158 100 168 100 Q 180 98 190 102 Q 197 106 190 110 Q 178 114 166 113 Q 154 112 152 106 Z"
        style={{ fill: "var(--gold-light)" }}
        fillOpacity="0.7"
      />
      <g
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.55"
        strokeLinecap="round"
      >
        <path d="M 163 110 Q 160 116 156 120" strokeWidth="2.2" />
        <path d="M 184 109 Q 188 114 192 117" strokeWidth="1.8" />
      </g>
      {/* the pat itself: top face, then its thickness */}
      <ellipse
        cx="176"
        cy="107"
        rx="14"
        ry="4"
        style={{ fill: "var(--toast)" }}
        fillOpacity="0.5"
      />
      <path
        d="M 162 99 L 186 99 L 186 105 Q 174 109 162 105 Z"
        style={{ fill: "var(--gold-light)" }}
      />
      <path
        d="M 162 105 Q 174 109 186 105 L 186 107 Q 174 111 162 107 Z"
        style={{ fill: "var(--toast)" }}
        fillOpacity="0.55"
      />
      <path
        d="M 162 99 Q 168 93 176 93 Q 185 93 186 99 Q 174 104 162 99 Z"
        fill="url(#pan-butter)"
      />
      <path
        d="M 166 97 Q 174 94 182 97"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.95"
        strokeWidth="2.2"
        strokeLinecap="round"
      />

      {/* syrup: translucent, the pancake showing through, each drip lit */}
      <g style={{ fill: "var(--syrup)" }} fillOpacity="0.58">
        <ellipse cx="196" cy="108" rx="17" ry="4.6" />
        <path d="M 186 104 Q 200 102 209 110 Q 213 116 207 117 Q 195 115 186 110 Z" />
        <path d="M 200 118 Q 204 126 202 132 Q 197 133 196 127 Q 196 121 200 118 Z" />
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
        className="steam-static"
        d="M160 92c-6-7-1-12 1-16 2-4 2.4-8-1-13"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="none" stroke="url(#pan-steam)" strokeLinecap="round">
        <path
          className="steam-wisp"
          d="M146 96c-6-7-1-12 1-16 2-4 2.4-8-1-13"
          strokeWidth="5"
        />
        <path
          className="steam-wisp"
          d="M162 92c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
          strokeWidth="6"
        />
        <path
          className="steam-wisp"
          d="M176 96c5-7 1-12-1-16-2-4-2.2-8 1-13"
          strokeWidth="5"
        />
      </g>
    </svg>
  );
}
