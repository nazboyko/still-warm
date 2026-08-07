/* The sandwich caught mid-pull: the bottom slice on the plate under its melted
   layer, the top slice lifted away, cheese stretching in between. */
function Slice() {
  return (
    <>
      <path
        d="M -65 8 Q -65 -6 -58 -9 Q -30 -14 0 -14 Q 30 -14 58 -9 Q 65 -6 65 8 Q 65 12 59 12 L -59 12 Q -65 12 -65 8 Z"
        fill="url(#gc-bread)"
      />
      <path
        d="M -65 8 Q -65 -6 -58 -9 Q -30 -14 0 -14 Q 30 -14 58 -9 Q 65 -6 65 8 Q 65 12 59 12 L -59 12 Q -65 12 -65 8 Z"
        fill="none"
        style={{ stroke: "var(--toast-deep)" }}
        strokeWidth="3.4"
        strokeLinejoin="round"
      />
      <g style={{ fill: "var(--toast-deep)" }} fillOpacity="0.4">
        <ellipse cx="-34" cy="1" rx="7" ry="3" />
        <ellipse cx="-2" cy="4" rx="5.5" ry="2.4" />
        <ellipse cx="30" cy="0" rx="6" ry="2.8" />
      </g>
      <path
        d="M -52 -6 Q -20 -11 16 -10"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.7"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </>
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
        <linearGradient id="gc-bread" x1="0" y1="0" x2="0.1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="55%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast)" }} />
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
      <ellipse cx="160" cy="184" rx="76" ry="10" fill="url(#gc-dish-shadow)" />

      {/* bottom slice, resting */}
      <g transform="translate(158 174)">
        <Slice />
      </g>

      {/* the melted layer on top of it, with two drips over the crust */}
      <path
        d="M 96 163 Q 118 155 142 160 Q 162 164 184 157 Q 206 152 222 161 L 222 167 Q 160 173 96 167 Z"
        fill="url(#gc-cheese)"
      />
      <path
        d="M 96 167 Q 160 173 222 167"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.35"
        strokeWidth="1.6"
      />
      <path
        d="M 112 169 Q 109 179 113 184 Q 118 179 116 169 Z"
        style={{ fill: "var(--tungsten)" }}
      />
      <path
        d="M 204 166 Q 202 175 206 179 Q 210 174 208 166 Z"
        style={{ fill: "var(--tungsten)" }}
      />

      {/* the cheese pull */}
      <g
        fill="none"
        style={{ stroke: "var(--tungsten)" }}
        strokeLinecap="round"
      >
        <path d="M 126 163 C 122 150 130 140 127 129" strokeWidth="5" />
        <path d="M 152 162 C 147 147 156 138 153 126" strokeWidth="4.4" />
        <path d="M 178 161 C 173 146 182 136 179 124" strokeWidth="3.8" />
        <path d="M 202 163 C 198 151 206 142 203 131" strokeWidth="3" />
      </g>
      <g
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.55"
        strokeLinecap="round"
        strokeWidth="1.3"
      >
        <path d="M 128 160 C 124 149 131 141 129 132" />
        <path d="M 154 159 C 150 147 157 139 155 129" />
      </g>

      {/* top slice, lifted away */}
      <g transform="translate(166 112) rotate(-9)">
        <Slice />
      </g>

      <path
        d="M 220 96c-6-7-1-12 1-16 2-4 2.4-8-1-13"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.22"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* plate contact */}
      <ellipse
        cx="158"
        cy="187"
        rx="64"
        ry="3.4"
        fill="#0f0c0a"
        opacity="0.5"
      />
    </svg>
  );
}
