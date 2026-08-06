export function EmpanadasArt({ lit }: { lit: boolean }) {
  return (
    <svg
      className="room-art"
      viewBox="0 0 320 240"
      aria-hidden="true"
      data-lit={lit}
    >
      <defs>
        <radialGradient id="empanadas-glow" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        className="art-cone"
        d="M160 6 L100 196 H220 Z"
        fill="#e8a94e"
        opacity="0.05"
      />
      <ellipse cx="160" cy="176" rx="118" ry="50" fill="url(#empanadas-glow)" />
      <ellipse
        className="art-glow-lit"
        cx="160"
        cy="176"
        rx="118"
        ry="50"
        fill="url(#empanadas-glow)"
      />
      <ellipse
        cx="160"
        cy="186"
        rx="110"
        ry="22"
        fill="#0f0c0a"
        stroke="#e8a94e"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <g fill="#120e0b">
        <path d="M76 182 A26 20 0 0 1 128 182 Q102 190 76 182 Z" />
        <path d="M190 182 A26 20 0 0 1 242 182 Q216 190 190 182 Z" />
      </g>
      <g fill="#0f0c0a">
        <path d="M104 176 A30 24 0 0 1 164 176 Q134 186 104 176 Z" />
        <path d="M156 176 A30 24 0 0 1 216 176 Q186 186 156 176 Z" />
        <path d="M130 168 A30 24 0 0 1 190 168 Q160 178 130 168 Z" />
      </g>
      <g fill="none" stroke="#e8a94e" strokeOpacity="0.45" strokeWidth="1.5">
        <path
          d="M130 168 A30 24 0 0 1 190 168"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="0 9"
        />
        <path d="M104 176 A30 24 0 0 1 164 176" strokeOpacity="0.3" />
        <path d="M156 176 A30 24 0 0 1 216 176" strokeOpacity="0.3" />
      </g>
    </svg>
  );
}
