import "./DisplayCase.css";

export function DisplayCase() {
  return (
    <figure className="display-case">
      <svg
        viewBox="0 0 260 320"
        role="img"
        aria-label="A dish in silhouette inside a lit museum display case"
      >
        <defs>
          <linearGradient id="case-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#241b13" />
            <stop offset="100%" stopColor="#191411" />
          </linearGradient>
          <radialGradient id="case-glow" cx="50%" cy="68%" r="60%">
            <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.5" />
            <stop offset="55%" stopColor="#e8a94e" stopOpacity="0.18" />
            <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="case-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#efe6d8" stopOpacity="0.12" />
            <stop offset="45%" stopColor="#efe6d8" stopOpacity="0.03" />
            <stop offset="100%" stopColor="#efe6d8" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect
          x="10"
          y="10"
          width="240"
          height="280"
          fill="url(#case-wall)"
          stroke="#9c8154"
          strokeWidth="1.5"
        />
        <path d="M130 12 L74 218 H186 Z" fill="#e8a94e" opacity="0.06" />
        <ellipse cx="130" cy="212" rx="100" ry="74" fill="url(#case-glow)" />

        <rect x="50" y="232" width="160" height="16" fill="#0f0c0a" />
        <ellipse cx="130" cy="232" rx="76" ry="13" fill="#0f0c0a" />
        <ellipse
          cx="130"
          cy="228"
          rx="70"
          ry="10"
          fill="#120e0b"
          stroke="#e8a94e"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        <g fill="#0f0c0a">
          <path d="M72 224 A26 26 0 0 1 124 224 Q98 232 72 224 Z" />
          <path d="M106 222 A30 30 0 0 1 166 222 Q136 231 106 222 Z" />
          <path d="M152 225 A22 22 0 0 1 196 225 Q174 232 152 225 Z" />
        </g>
        <g fill="none" stroke="#e8a94e" strokeOpacity="0.45" strokeWidth="1.5">
          <path d="M72 224 A26 26 0 0 1 124 224" />
          <path d="M106 222 A30 30 0 0 1 166 222" />
          <path d="M152 225 A22 22 0 0 1 196 225" />
        </g>

        <path
          d="M132 188c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
          fill="none"
          stroke="#efe6d8"
          strokeOpacity="0.3"
          strokeWidth="2"
          strokeLinecap="round"
        />

        <path d="M10 10 L120 10 L40 290 L10 290 Z" fill="url(#case-glass)" />

        <rect x="2" y="290" width="256" height="20" fill="#120e0b" />
        <line
          x1="2"
          y1="290"
          x2="258"
          y2="290"
          stroke="#9c8154"
          strokeWidth="1"
        />
      </svg>
      <figcaption className="display-case-label">
        CAT. 001 - HOMESICKNESS
      </figcaption>
    </figure>
  );
}
