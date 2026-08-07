/* A stack of pancakes under the brightest spot in the museum: honey-gold
   discs with their own edges, butter melting on top, one syrup run down the
   side, and berry compote spilling over the far edge. */
const DISC =
  "M -62 0 Q -60 -9 -40 -12 Q -14 -15 10 -14 Q 40 -13 58 -8 Q 64 -5 62 1 Q 58 7 36 9 Q 6 11 -22 10 Q -50 8 -60 4 Q -63 2 -62 0 Z";

const stack = [
  { x: 160, y: 176, s: 1, r: -1 },
  { x: 158, y: 161, s: 0.98, r: 1.5 },
  { x: 162, y: 146, s: 1.01, r: -2 },
  { x: 159, y: 131, s: 0.96, r: 1 },
  { x: 161, y: 117, s: 0.93, r: -1.5 },
];

function Pancake() {
  return (
    <g>
      <path d={DISC} fill="url(#pan-cake)" />
      <g fill="url(#pan-scorch)">
        <ellipse cx="-26" cy="-6" rx="16" ry="5" />
        <ellipse cx="14" cy="-4" rx="13" ry="4.4" />
      </g>
      <path
        d="M -52 -6 Q -18 -13 30 -11"
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
        <linearGradient id="pan-syrup" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--toast-deep)" }} />
          <stop offset="100%" style={{ stopColor: "var(--syrup)" }} />
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
        <radialGradient id="pan-dish-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
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

      {/* the weight of the stack */}
      <ellipse cx="160" cy="187" rx="72" ry="7" fill="#0f0c0a" opacity="0.5" />
      <ellipse cx="160" cy="188" rx="56" ry="3" fill="#000" opacity="0.8" />

      {stack.map((disc, index) => (
        <g
          key={index}
          transform={`translate(${disc.x} ${disc.y}) rotate(${disc.r}) scale(${disc.s})`}
        >
          <Pancake />
        </g>
      ))}

      {/* the top face of the stack, catching the spot */}
      <ellipse cx="161" cy="108" rx="56" ry="11" fill="url(#pan-top)" />
      <g fill="url(#pan-scorch)">
        <ellipse cx="140" cy="107" rx="15" ry="5" />
        <ellipse cx="180" cy="110" rx="12" ry="4.2" />
      </g>

      {/* berry compote spilling over the near edge */}
      <g style={{ fill: "var(--beet)" }}>
        <ellipse cx="132" cy="104" rx="10" ry="7" />
        <ellipse cx="144" cy="106" rx="8" ry="5.6" />
        <ellipse cx="126" cy="112" rx="8.6" ry="6.4" />
        <ellipse cx="122" cy="124" rx="7.4" ry="6.4" />
        <ellipse cx="127" cy="136" rx="6" ry="5.2" />
      </g>
      <g
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.6"
        strokeWidth="1.5"
        strokeLinecap="round"
      >
        <path d="M 124 104 Q 132 110 140 105" />
        <path d="M 118 120 Q 123 126 129 121" />
        <path d="M 122 134 Q 127 139 132 134" />
      </g>
      <g
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.45"
        strokeWidth="1.8"
        strokeLinecap="round"
      >
        <path d="M 128 100 Q 132 98 136 100" />
        <path d="M 119 109 Q 123 107 127 109" />
        <path d="M 118 121 Q 121 119 124 121" />
      </g>

      {/* butter, going soft on the warm top */}
      <ellipse
        cx="172"
        cy="106"
        rx="21"
        ry="6.5"
        style={{ fill: "var(--gold-light)" }}
        fillOpacity="0.6"
      />
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

      {/* one syrup run, spilling over the rim and down the far side */}
      <g style={{ fill: "var(--syrup)" }}>
        <ellipse cx="188" cy="107" rx="24" ry="6" fillOpacity="0.5" />
        <path d="M 182 104 Q 198 102 208 110 Q 212 116 206 117 Q 192 115 182 110 Z" />
        <path d="M 200 118 Q 204 126 202 132 Q 197 133 196 127 Q 196 121 200 118 Z" />
        <path d="M 210 134 Q 213 143 211 149 Q 206 150 205 143 Q 206 137 210 134 Z" />
        <path d="M 198 152 Q 202 163 200 170 Q 195 171 194 162 Q 194 156 198 152 Z" />
        <ellipse cx="200" cy="184" rx="17" ry="4.4" fillOpacity="0.9" />
      </g>
      <g
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.5"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <path d="M 188 106 Q 198 106 205 111" />
        <path d="M 199 121 Q 201 126 200 130" />
        <path d="M 209 137 Q 211 142 210 146" />
        <path d="M 197 156 Q 200 162 199 167" />
        <path d="M 191 183 Q 200 186 209 183" />
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
