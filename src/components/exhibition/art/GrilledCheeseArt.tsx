/* A sandwich a second after it was pulled apart: both halves still tilted the
   same way, the near one larger in the spot, cheese stretched taut between
   their cut faces. Crust rim, porous crumb, scorch patches, one gathering drip. */
function Half() {
  return (
    <g>
      {/* grilled top face, receding back */}
      <path d="M -56 -20 L 56 -20 L 65 -33 L -47 -33 Z" fill="url(#gc-top)" />
      <g style={{ fill: "var(--toast-deep)" }}>
        <path
          d="M -32 -28 q 9 -4 17 -1 q 4 3 -3 5 q -11 2 -14 -4 z"
          fillOpacity="0.5"
        />
        <path
          d="M 2 -30 q 13 -3 21 1 q 3 3 -5 4 q -12 1 -16 -5 z"
          fillOpacity="0.38"
        />
        <path
          d="M 33 -27 q 8 -3 13 0 q 2 2 -4 3 q -8 1 -9 -3 z"
          fillOpacity="0.45"
        />
      </g>

      {/* the cut face, edges wavering like a hand-cut slice */}
      <path
        d="M -56 -16 Q -54 -20 -47 -20 Q -20 -22 8 -20 Q 34 -19 51 -20 Q 56 -19 56 -15 L 56 15 Q 56 20 50 20 Q 22 22 -6 20 Q -33 19 -50 20 Q -56 19 -56 15 Z"
        fill="url(#gc-crumb)"
      />
      <g style={{ fill: "var(--toast)" }} fillOpacity="0.3">
        <ellipse cx="-38" cy="-11" rx="4.6" ry="2.6" />
        <ellipse cx="-22" cy="-15" rx="2.4" ry="1.8" />
        <ellipse cx="-8" cy="-10" rx="3.6" ry="2.2" />
        <ellipse cx="12" cy="-14" rx="2.8" ry="1.6" />
        <ellipse cx="27" cy="-9" rx="4.2" ry="2.8" />
        <ellipse cx="42" cy="-13" rx="2.2" ry="1.5" />
        <ellipse cx="-44" cy="11" rx="3.4" ry="2.2" />
        <ellipse cx="-26" cy="15" rx="2.6" ry="1.7" />
        <ellipse cx="-6" cy="12" rx="4.4" ry="2.4" />
        <ellipse cx="16" cy="16" rx="2.2" ry="1.6" />
        <ellipse cx="34" cy="11" rx="3.8" ry="2.6" />
      </g>
      <path
        d="M -56 -16 Q -54 -20 -47 -20 Q -20 -22 8 -20 Q 34 -19 51 -20 Q 56 -19 56 -15 L 56 15 Q 56 20 50 20 Q 22 22 -6 20 Q -33 19 -50 20 Q -56 19 -56 15 Z"
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeWidth="4.6"
      />

      {/* the melted layer: a viscous mass, heavier in the middle */}
      <path
        d="M -57 -5 Q -30 -9 -2 -6 Q 28 -3 57 -7 L 57 0 Q 45 8 31 6 Q 17 13 3 8 Q -14 14 -29 7 Q -43 10 -57 4 Z"
        fill="url(#gc-cheese)"
      />
      <path
        d="M -42 -3 Q -16 -6 10 -3"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.65"
        strokeWidth="2"
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

      {/* the plate: rim, then a well the sandwich sits down into */}
      <ellipse cx="160" cy="191" rx="96" ry="15" fill="#0f0c0a" />
      <path
        d="M68 189 A96 14 0 0 1 252 189"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <ellipse cx="160" cy="190" rx="82" ry="10.5" fill="#151009" />
      <path
        d="M80 188 A82 10 0 0 1 240 188"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.14"
        strokeWidth="1.2"
      />
      <ellipse cx="152" cy="185" rx="76" ry="10" fill="url(#gc-dish-shadow)" />

      {/* the lifted half: smaller with distance, tipped by the pull */}
      <g transform="translate(184 96) rotate(-14) scale(0.82)">
        <Half />
      </g>

      {/* the weight of the near half pressing into the plate */}
      <ellipse
        cx="150"
        cy="189"
        rx="66"
        ry="5.5"
        fill="#0f0c0a"
        opacity="0.5"
      />
      <ellipse cx="150" cy="189.5" rx="50" ry="2.6" fill="#000" opacity="0.8" />

      {/* the near half: the hero, in the spot */}
      <g transform="translate(150 166) rotate(-4)">
        <Half />
      </g>

      {/* cheese stretched taut between the two cut faces */}
      <g fill="url(#gc-cheese)">
        <path d="M 121 166 C 122 152 128 140 133 128 C 138 116 148 108 154 103 L 158 105 C 152 110 143 118 138 129 C 133 141 128 152 127 166 Z" />
        <path d="M 142 169 C 140 155 143 142 148 130 C 152 118 159 109 161 102 L 166 103 C 163 110 157 119 153 131 C 148 143 146 155 148 169 Z" />
        <path d="M 165 167 C 167 153 170 139 170.5 125 C 171 114 170 108 170 102 L 174 102 C 174 108 175 114 174.5 125 C 174 139 171 153 169 167 Z" />
        <path d="M 186 164 C 189 152 193 141 191 130 C 189 119 183 110 179 104 L 183 102 C 187 109 194 118 196 130 C 198 142 193 152 190 164 Z" />
        <path d="M 204 158 C 203 164 206 168 205 173 L 208 173 C 209 168 206 164 207 158 Z" />
        <ellipse cx="206.5" cy="178" rx="2.8" ry="3.6" />
      </g>

      <path
        d="M 234 74c-6-7-1-12 1-16 2-4 2.4-8-1-13"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.2"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* plate contact and a few crumbs */}
      <ellipse
        cx="150"
        cy="187"
        rx="58"
        ry="3.4"
        fill="#0f0c0a"
        opacity="0.5"
      />
      <g style={{ fill: "var(--toast)" }} fillOpacity="0.75">
        <ellipse
          cx="92"
          cy="187"
          rx="2.4"
          ry="1.6"
          transform="rotate(-12 92 187)"
        />
        <ellipse cx="106" cy="192" rx="1.8" ry="1.3" />
        <ellipse
          cx="224"
          cy="186"
          rx="2.2"
          ry="1.5"
          transform="rotate(8 224 186)"
        />
        <ellipse cx="238" cy="190" rx="1.6" ry="1.2" />
      </g>
    </svg>
  );
}
