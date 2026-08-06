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
      </defs>
      <path
        className="art-cone"
        d="M160 6 L100 196 H220 Z"
        fill="#e8a94e"
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
      <g fill="#0f0c0a">
        <path d="M120 180 L216 180 L216 112 Z" />
        <path d="M86 186 L198 186 L198 120 Z" />
        <path d="M146 186 q4 12 8 0 Z" />
        <path d="M168 186 q4 14 8 0 Z" />
      </g>
      <g fill="none" stroke="#e8a94e" strokeOpacity="0.45" strokeWidth="1.5">
        <path d="M120 180 L216 112" strokeOpacity="0.25" />
        <path d="M86 186 L198 120" />
        <path d="M198 120 L198 186" strokeOpacity="0.3" />
        <path d="M146 186 q4 12 8 0" strokeOpacity="0.3" />
        <path d="M168 186 q4 14 8 0" strokeOpacity="0.3" />
      </g>
      <path
        d="M206 96c-6-6-2-10 0-14 2-4 2.5-8-1-12"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.25"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
