/* Baked empanadas on a plate: plump pouches with a braided repulgue along the
   sealed seam, blistered crust, and one broken open on its beet filling. */
const SEAM = "M 2 -20 Q 22 -19 32 -5 Q 38 7 27 16";

/* Each mark is one fold of the repulgue, crossing the rope on the diagonal. */
const crimpMarks = [
  { x: 7, y: -20.5, r: 58 },
  { x: 14, y: -19.5, r: 68 },
  { x: 21, y: -16.5, r: 86 },
  { x: 27, y: -11.5, r: 102 },
  { x: 32, y: -4.5, r: 120 },
  { x: 35, y: 2.5, r: 140 },
  { x: 33, y: 9.5, r: 162 },
  { x: 28, y: 15, r: 182 },
];

const BODY =
  "M -38 12 Q -41 -5 -25 -14 Q -7 -23 12 -19 Q 30 -15 35 0 Q 39 10 29 14 Q 0 19 -30 15 Q -38 14 -38 12 Z";

function Empanada({ id, broken }: { id: string; broken?: boolean }) {
  return (
    <g>
      <path d={BODY} fill={`url(#${id}-crust)`} />
      <path
        d="M -34 13 Q 0 19 28 13"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g fill={`url(#${id}-scorch)`}>
        <ellipse
          cx="-15"
          cy="-8"
          rx="15"
          ry="7"
          transform="rotate(-12 -15 -8)"
        />
        <ellipse cx="9" cy="3" rx="12" ry="6" transform="rotate(9 9 3)" />
        <ellipse cx="-31" cy="4" rx="8" ry="4.4" />
        <ellipse
          cx="-8"
          cy="10"
          rx="11"
          ry="4.6"
          transform="rotate(-5 -8 10)"
        />
      </g>
      <path
        d="M -28 -6 Q -16 -15 -2 -14"
        fill="none"
        style={{ stroke: "var(--gold-light)" }}
        strokeOpacity="0.75"
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      {broken ? (
        <>
          {/* the torn crust edge, thick where the pastry broke */}
          <path
            d="M -31 -5 L -28 -12 L -22 -16 L -14 -18 L -6 -16 L -1 -11 L 1 -5 L -2 2 L -9 5 L -17 6 L -24 4 L -29 1 Z"
            style={{ fill: "var(--gold-light)" }}
          />
          {/* the hollow behind it */}
          <path
            d="M -27 -5 L -24 -11 L -19 -13.5 L -13 -14.5 L -7 -12.5 L -3.5 -9 L -2.5 -5 L -5 0 L -11 2.5 L -18 3 L -24 1.5 Z"
            style={{ fill: "var(--syrup)" }}
          />
          {/* filling, sitting down inside the shell */}
          <path
            d="M -25 -4.5 L -22 -9.5 L -17.5 -11.5 L -12.5 -12 L -7.5 -10 L -4.5 -7 L -4 -3.5 L -7 0.5 L -12 1.8 L -18 2 L -23 0.5 Z"
            style={{ fill: "var(--beet)" }}
          />
          <path
            d="M -24 -6 Q -14 -12 -5 -7"
            fill="none"
            style={{ stroke: "var(--syrup)" }}
            strokeOpacity="0.65"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <g style={{ fill: "var(--toast-deep)" }} fillOpacity="0.8">
            <ellipse
              cx="-18"
              cy="-5"
              rx="3.6"
              ry="2.4"
              transform="rotate(-16 -18 -5)"
            />
            <ellipse
              cx="-9"
              cy="-2"
              rx="2.8"
              ry="1.9"
              transform="rotate(14 -9 -2)"
            />
          </g>
          <path
            className="serve-glint"
            d="M -20 -2 Q -14 0 -9 -2"
            fill="none"
            style={{ stroke: "var(--tungsten)" }}
            strokeOpacity="0.4"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </>
      ) : null}

      {/* the repulgue: a rope of folded dough along the sealed seam */}
      <path
        d={SEAM}
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.4"
        strokeWidth="11"
        strokeLinecap="round"
      />
      <path
        d={SEAM}
        fill="none"
        stroke={`url(#${id}-braid)`}
        strokeWidth="9"
        strokeLinecap="round"
      />
      {crimpMarks.map((mark, index) => (
        <g
          key={index}
          transform={`translate(${mark.x} ${mark.y}) rotate(${mark.r})`}
        >
          <line
            x1="-4.6"
            y1="0"
            x2="4.6"
            y2="0"
            style={{ stroke: "var(--toast-deep)" }}
            strokeOpacity="0.55"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <line
            x1="-3.6"
            y1="-1.4"
            x2="3.6"
            y2="-1.4"
            style={{ stroke: "var(--gold-light)" }}
            strokeOpacity="0.45"
            strokeWidth="1"
            strokeLinecap="round"
          />
        </g>
      ))}
    </g>
  );
}

export function EmpanadasArt({
  lit,
  steaming,
}: {
  lit: boolean;
  steaming: boolean;
}) {
  return (
    <svg
      className="room-art"
      viewBox="0 0 320 240"
      aria-hidden="true"
      data-lit={lit}
      data-steam={steaming ? "live" : "paused"}
    >
      <defs>
        <linearGradient id="emp-steam" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#efe6d8" stopOpacity="0" />
          <stop offset="45%" stopColor="#efe6d8" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#efe6d8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="empanadas-glow" cx="50%" cy="70%" r="55%">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#e8a94e" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="empanadas-cone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8a94e" stopOpacity="1" />
          <stop offset="70%" stopColor="#e8a94e" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#e8a94e" stopOpacity="0.05" />
        </linearGradient>
        <linearGradient id="emp-crust" x1="0" y1="0" x2="0.15" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="42%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="82%" style={{ stopColor: "var(--toast)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast-deep)" }} />
        </linearGradient>
        <linearGradient
          id="emp-braid"
          x1="0"
          y1="0"
          x2="0.4"
          y2="1"
          gradientUnits="objectBoundingBox"
        >
          <stop offset="0%" style={{ stopColor: "var(--gold-light)" }} />
          <stop offset="60%" style={{ stopColor: "var(--tungsten)" }} />
          <stop offset="100%" style={{ stopColor: "var(--toast-deep)" }} />
        </linearGradient>
        <radialGradient id="emp-scorch" cx="50%" cy="50%" r="50%">
          <stop
            offset="0%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0.7"
          />
          <stop
            offset="55%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0.34"
          />
          <stop
            offset="100%"
            style={{ stopColor: "var(--toast-deep)" }}
            stopOpacity="0"
          />
        </radialGradient>
        <radialGradient id="emp-dish-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <path
        className="art-cone"
        d="M160 6 C144 80 122 150 100 196 H220 C198 150 176 80 160 6 Z"
        fill="url(#empanadas-cone)"
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

      {/* the plate: rim, then the well the tray of pouches sits in */}
      <ellipse cx="160" cy="192" rx="102" ry="17" fill="#0f0c0a" />
      <path
        d="M58 190 A102 16 0 0 1 262 190"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.3"
        strokeWidth="1.5"
      />
      <ellipse cx="160" cy="191" rx="88" ry="12" fill="#151009" />
      <path
        d="M72 189 A88 11 0 0 1 248 189"
        fill="none"
        stroke="#e8a94e"
        strokeOpacity="0.14"
        strokeWidth="1.2"
      />
      <ellipse cx="160" cy="184" rx="82" ry="12" fill="url(#emp-dish-shadow)" />

      {/* the one at the back, half behind the others */}
      <ellipse cx="158" cy="176" rx="36" ry="3" fill="#000" opacity="0.6" />
      <g transform="translate(158 156) rotate(4) scale(0.84)">
        <Empanada id="emp" />
      </g>

      {/* front left, intact, its braid to the light */}
      <ellipse cx="114" cy="190" rx="40" ry="3.2" fill="#000" opacity="0.75" />
      <g transform="translate(114 172) scale(-0.98 0.98) rotate(-9)">
        <Empanada id="emp" />
      </g>

      {/* front right, broken open on its filling */}
      <ellipse cx="206" cy="191" rx="42" ry="3.2" fill="#000" opacity="0.75" />
      <g transform="translate(206 173) rotate(7) scale(1.04)">
        <Empanada id="emp" broken />
      </g>

      {/* pastry flakes where it broke */}
      <g style={{ fill: "var(--toast)" }} fillOpacity="0.8">
        <ellipse
          cx="168"
          cy="191"
          rx="2.6"
          ry="1.6"
          transform="rotate(-14 168 191)"
        />
        <ellipse cx="180" cy="195" rx="1.8" ry="1.2" />
        <ellipse
          cx="246"
          cy="189"
          rx="2.2"
          ry="1.4"
          transform="rotate(10 246 189)"
        />
      </g>
      <path
        className="steam-static"
        d="M160 140c-6-7-1-12 1-16 2-4 2.4-8-1-13"
        fill="none"
        stroke="#efe6d8"
        strokeOpacity="0.3"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <g fill="none" stroke="url(#emp-steam)" strokeLinecap="round">
        <path
          className="steam-wisp"
          d="M146 144c-6-7-1-12 1-16 2-4 2.4-8-1-13"
          strokeWidth="5"
        />
        <path
          className="steam-wisp"
          d="M162 140c-7-6-2-11 0-15 2.3-4.3 2.7-8.6-1.3-13"
          strokeWidth="6"
        />
        <path
          className="steam-wisp"
          d="M176 144c5-7 1-12-1-16-2-4-2.2-8 1-13"
          strokeWidth="5"
        />
      </g>
    </svg>
  );
}
