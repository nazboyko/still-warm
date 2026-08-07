export function ReservedSketch({ inked }: { inked: boolean }) {
  return (
    <svg viewBox="0 0 280 190" aria-hidden="true" data-inked={inked}>
      <defs>
        <radialGradient id="reserved-glow" cx="50%" cy="68%" r="60%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g className="sketch-dotted">
        <g
          fill="none"
          stroke="#efe6d8"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="1 6"
        >
          <ellipse cx="140" cy="142" rx="96" ry="15" />
          <path d="M76 138 A64 66 0 0 1 204 138" />
          <circle cx="140" cy="66" r="4" />
        </g>
        <g stroke="#efe6d8" strokeOpacity="0.25" strokeWidth="1">
          <line x1="140" y1="48" x2="140" y2="56" />
          <line x1="30" y1="142" x2="42" y2="142" />
          <line x1="238" y1="142" x2="250" y2="142" />
        </g>
      </g>
      <g className="sketch-inked">
        <ellipse
          className="inked-glow"
          cx="140"
          cy="128"
          rx="112"
          ry="50"
          fill="url(#reserved-glow)"
        />
        <g className="inked-body" fill="#0f0c0a">
          <path d="M76 138 A64 66 0 0 1 204 138 Z" />
          <ellipse cx="140" cy="142" rx="96" ry="15" />
          <circle cx="140" cy="64" r="5" />
        </g>
        <g
          className="inked-rim"
          fill="none"
          stroke="#e8a94e"
          strokeWidth="1.5"
          strokeLinecap="round"
        >
          <path d="M76 138 A64 66 0 0 1 204 138" strokeOpacity="0.5" />
          <path d="M44 142 A96 15 0 0 1 236 142" strokeOpacity="0.3" />
          <circle cx="140" cy="64" r="5" strokeOpacity="0.5" />
        </g>
      </g>
    </svg>
  );
}
