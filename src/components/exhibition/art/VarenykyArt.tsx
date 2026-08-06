export function VarenykyArt() {
  return (
    <svg className="room-art" viewBox="0 0 320 240" aria-hidden="true">
      <defs>
        <radialGradient id="varenyky-glow" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M160 6 L100 196 H220 Z" fill="#e8a94e" opacity="0.05" />
      <ellipse cx="160" cy="176" rx="118" ry="50" fill="url(#varenyky-glow)" />
      <ellipse cx="160" cy="190" rx="100" ry="16" fill="#0f0c0a" />
      <path
        d="M64 188 A100 15 0 0 1 256 188"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <g fill="#0f0c0a">
        <path d="M74 184 A34 26 0 0 1 142 184 Q108 194 74 184 Z" />
        <path d="M126 180 A36 28 0 0 1 198 180 Q162 192 126 180 Z" />
        <path d="M182 184 A32 24 0 0 1 246 184 Q214 194 182 184 Z" />
      </g>
      <g fill="none" stroke="#e8a94e" strokeOpacity="0.45" strokeWidth="1.5">
        <path d="M74 184 A34 26 0 0 1 142 184" />
        <path d="M126 180 A36 28 0 0 1 198 180" />
        <path d="M182 184 A32 24 0 0 1 246 184" />
      </g>
      <g
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.5"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="0 12"
        transform="translate(0 -6)"
      >
        <path d="M74 184 A34 26 0 0 1 142 184" />
        <path d="M126 180 A36 28 0 0 1 198 180" />
        <path d="M182 184 A32 24 0 0 1 246 184" />
      </g>
    </svg>
  );
}
