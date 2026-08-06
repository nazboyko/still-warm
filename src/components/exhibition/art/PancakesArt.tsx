export function PancakesArt() {
  return (
    <svg className="room-art" viewBox="0 0 320 240" aria-hidden="true">
      <defs>
        <radialGradient id="pancakes-glow" cx="50%" cy="66%" r="58%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.45" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M160 6 L100 196 H220 Z" fill="#e8a94e" opacity="0.06" />
      <ellipse cx="160" cy="172" rx="118" ry="52" fill="url(#pancakes-glow)" />
      <ellipse cx="160" cy="192" rx="94" ry="14" fill="#0f0c0a" />
      <path
        d="M70 190 A94 13 0 0 1 250 190"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <g fill="#0f0c0a">
        <ellipse cx="160" cy="178" rx="74" ry="13" />
        <ellipse cx="158" cy="164" rx="70" ry="13" />
        <ellipse cx="162" cy="150" rx="66" ry="12" />
        <ellipse cx="160" cy="137" rx="60" ry="11" />
      </g>
      <g fill="none" stroke="#e8a94e" strokeOpacity="0.4" strokeWidth="1.5">
        <path d="M100 135 A60 11 0 0 1 220 135" />
        <path d="M98 149 A66 12 0 0 1 226 149" strokeOpacity="0.2" />
      </g>
      <rect
        x="148"
        y="122"
        width="24"
        height="10"
        rx="1.5"
        fill="#0f0c0a"
        stroke="#e8a94e"
        strokeOpacity="0.5"
        strokeWidth="1.5"
        transform="rotate(-4 160 127)"
      />
      <path
        d="M160 112c-6-6-2-10 0-14 2-4 2.5-8-1-12"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
