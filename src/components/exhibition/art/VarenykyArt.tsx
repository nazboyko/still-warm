import { Varenyk, VarenykDefs } from "../../art/Varenyk.tsx";

/* Fried onions caught on the dough, a few caramelized darker. */
const onions = [
  { x: 143, y: 174, r: -38, s: 1.4, tone: "syrup" },
  { x: 166, y: 165, r: 10, s: 1.55, tone: "toast-deep" },
  { x: 189, y: 169, r: 168, s: 1.45, tone: "syrup" },
  { x: 209, y: 176, r: 28, s: 1.3, tone: "toast-deep" },
  { x: 174, y: 181, r: -14, s: 1.2, tone: "syrup" },
  { x: 128, y: 185, r: 192, s: 1.1, tone: "toast" },
];

export function VarenykyArt({ lit }: { lit: boolean }) {
  return (
    <svg
      className="room-art"
      viewBox="0 0 320 240"
      aria-hidden="true"
      data-lit={lit}
    >
      <defs>
        <VarenykDefs id="rv" />
        <radialGradient id="varenyky-glow" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="varenyky-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="1" />
          <stop offset="70%" stopColor="#e8a94e" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="rv-cream" x1="0" y1="0" x2="0.2" y2="1">
          <stop
            offset="0%"
            style={{ stopColor: "var(--plaster)" }}
            stopOpacity="1"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--plaster)" }}
            stopOpacity="0.68"
          />
        </linearGradient>
        <radialGradient id="rv-dish-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        className="art-cone"
        d="M160 6 C144 80 122 150 100 196 H220 C198 150 176 80 160 6 Z"
        fill="url(#varenyky-cone)"
        opacity="0.05"
      />
      <ellipse cx="160" cy="176" rx="118" ry="50" fill="url(#varenyky-glow)" />
      <ellipse
        className="art-glow-lit"
        cx="160"
        cy="176"
        rx="118"
        ry="50"
        fill="url(#varenyky-glow)"
      />

      <ellipse cx="160" cy="190" rx="100" ry="16" fill="#0f0c0a" />
      <path
        d="M64 188 A100 15 0 0 1 256 188"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <ellipse cx="184" cy="186" rx="76" ry="11" fill="url(#rv-dish-shadow)" />

      <g transform="translate(148 172) rotate(-16)">
        <Varenyk id="rv" glossD="M -20 -8 Q -6 -14 8 -11" />
      </g>
      <path
        d="M 163 156 Q 157 170 161 184"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <g transform="translate(186 168) rotate(3) scale(1.1)">
        <Varenyk id="rv" glossD="M -18 -9 Q -2 -15 12 -11" />
      </g>
      <path
        d="M 202 166 Q 197 178 201 190"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <g transform="translate(222 179) rotate(12) scale(0.9)">
        <Varenyk id="rv" glossD="M -16 -9 Q 0 -14 12 -10" />
      </g>

      {onions.map((onion, index) => (
        <g
          key={index}
          transform={`translate(${onion.x} ${onion.y}) rotate(${onion.r}) scale(${onion.s})`}
        >
          <path
            d="M -7 1.4 Q -4 -4.4 0 -4.6 Q 4 -4.4 7 1.4 Q 5.2 2.6 4 1.2 Q 1.6 -2.2 0 -2.4 Q -1.6 -2.2 -4 1.2 Q -5.2 2.6 -7 1.4 Z"
            style={{ fill: `var(--${onion.tone})` }}
          />
          <path
            d="M -2 -2.6 Q 0 -3.4 2 -2.6"
            fill="none"
            style={{ stroke: "var(--gold-light)" }}
            strokeOpacity="0.5"
            strokeWidth="0.9"
            strokeLinecap="round"
          />
        </g>
      ))}

      {/* smetana beside the pile */}
      <ellipse cx="96" cy="190" rx="21" ry="5" fill="#0f0c0a" opacity="0.45" />
      <path
        d="M 77 186 Q 74 176 84 172 Q 89 163 96 169 Q 109 171 113 180 Q 116 187 102 190 Q 84 191 77 186 Z"
        fill="url(#rv-cream)"
      />
      <path
        d="M 83 179 Q 90 173 98 175"
        fill="none"
        style={{ stroke: "var(--plaster)" }}
        strokeOpacity="0.9"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M 84 188 Q 96 190 108 186"
        fill="none"
        style={{ stroke: "var(--tungsten)" }}
        strokeOpacity="0.25"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* plate contact */}
      <g fill="#0f0c0a" opacity="0.5">
        <ellipse cx="148" cy="189" rx="30" ry="2.8" />
        <ellipse cx="186" cy="187" rx="33" ry="3" />
        <ellipse cx="222" cy="194" rx="27" ry="2.6" />
      </g>
    </svg>
  );
}
