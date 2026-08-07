/* A cut sandwich: the near half shows its cross-section - crust rim, porous
   crumb, the melted layer between the slices - and the far half is lifted
   away at an angle, cheese still stretching and thinning between them. */
function Half() {
  return (
    <g>
      {/* grilled top face, receding back */}
      <path d="M -56 -22 L 56 -22 L 66 -35 L -46 -35 Z" fill="url(#gc-top)" />
      <g
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeOpacity="0.45"
        strokeWidth="2.4"
        strokeLinecap="round"
      >
        <path d="M -34 -27 L -12 -30" />
        <path d="M -2 -26 L 22 -30" />
        <path d="M 30 -27 L 48 -30" />
      </g>

      {/* the cut face */}
      <rect
        x="-56"
        y="-22"
        width="112"
        height="44"
        rx="7"
        fill="url(#gc-crumb)"
      />
      <g style={{ fill: "var(--toast)" }} fillOpacity="0.32">
        <ellipse cx="-34" cy="-13" rx="4.4" ry="2.8" />
        <ellipse cx="-14" cy="-16" rx="3" ry="2" />
        <ellipse cx="10" cy="-12" rx="3.8" ry="2.4" />
        <ellipse cx="34" cy="-15" rx="3.2" ry="2.2" />
        <ellipse cx="-28" cy="14" rx="4" ry="2.6" />
        <ellipse cx="-4" cy="12" rx="3.2" ry="2.2" />
        <ellipse cx="24" cy="15" rx="4.2" ry="2.6" />
        <ellipse cx="44" cy="11" rx="2.8" ry="2" />
      </g>
      <rect
        x="-56"
        y="-22"
        width="112"
        height="44"
        rx="7"
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeWidth="5"
      />

      {/* the melted layer, oozing past the crust */}
      <path
        d="M -60 -6 Q -30 -9 0 -6 Q 30 -3 60 -7 L 60 5 Q 30 9 0 6 Q -30 3 -60 7 Z"
        fill="url(#gc-cheese)"
      />
      <path
        d="M -52 -4 Q -26 -6 2 -3"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </g>
  );
}

export function GrilledCheeseArt({ lit }: { lit: boolean }) {
  return (
    <svg
      className="room-art"
      viewBox="0 0 320 240"
      aria-hidden="true"
      data-lit={lit}
    >
      <defs>
        <radialGradient id="grilled-glow" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.35" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="grilled-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="1" />
          <stop offset="70%" stopColor="#e8a94e" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="gc-top" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <linearGradient id="gc-crumb" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--plaster)" }} />
          <stop offset="100%" style={{ stopColor: "var(--gold-light)" }} />
        </linearGradient>
        <linearGradient id="gc-cheese" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
        </linearGradient>
        <radialGradient id="gc-dish-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        className="art-cone"
        d="M160 6 C144 80 122 150 100 196 H220 C198 150 176 80 160 6 Z"
        fill="url(#grilled-cone)"
        opacity="0.05"
      />
      <ellipse cx="160" cy="176" rx="118" ry="50" fill="url(#grilled-glow)" />
      <ellipse
        className="art-glow-lit"
        cx="160"
        cy="176"
        rx="118"
        ry="50"
        fill="url(#grilled-glow)"
      />

      <ellipse cx="160" cy="190" rx="96" ry="15" fill="#0f0c0a" />
      <path
        d="M68 188 A96 14 0 0 1 252 188"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <ellipse cx="140" cy="184" rx="72" ry="10" fill="url(#gc-dish-shadow)" />

      {/* the lifted half */}
      <g transform="translate(202 86) rotate(-13) scale(0.88)">
        <Half />
      </g>

      {/* the near half, resting */}
      <g transform="translate(120 160) rotate(-3)">
        <Half />
      </g>

      {/* cheese stretching, thick at the bread and thin in between */}
      <g fill="url(#gc-cheese)">
        <path d="M 147 158 C 145 142 152 128 155 116 C 157 108 160 104 163 99 L 168 101 C 165 106 162 111 160 118 C 157 130 152 143 153 158 Z" />
        <path d="M 159 159 C 157 144 165 130 169 118 C 171 110 175 104 178 98 L 183 100 C 180 106 176 112 174 120 C 170 132 165 145 165 159 Z" />
        <path d="M 170 157 C 169 145 176 134 180 124 C 183 116 187 109 190 103 L 194 105 C 191 111 187 118 185 125 C 181 136 176 146 176 157 Z" />
        <path d="M 206 118 q -2.6 7 1.6 10 q 4.4 -3 2 -10 z" />
      </g>

      <path
        d="M 250 62c-6-7-1-12 1-16 2-4 2.4-8-1-13"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* plate contact */}
      <ellipse
        cx="120"
        cy="184"
        rx="58"
        ry="3.4"
        fill="#0f0c0a"
        opacity="0.5"
      />
    </svg>
  );
}
