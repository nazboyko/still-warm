import { Varenyk, VarenykDefs } from "../art/Varenyk.tsx";

/* Three varenyky tipped and overlapping on the case plate. */
export function HeroVarenyky() {
  return (
    <g>
      <defs>
        <VarenykDefs id="hv" />
        <radialGradient id="hv-dish-shadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0f0c0a" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0f0c0a" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="130" cy="227" rx="68" ry="9" fill="url(#hv-dish-shadow)" />

      <g transform="translate(99 212) rotate(-16) scale(0.92)">
        <Varenyk id="hv" glossD="M -20 -8 Q -6 -14 8 -11" />
      </g>
      <path
        d="M 112 196 Q 106 208 110 222"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      <g transform="translate(138 208) rotate(3)">
        <Varenyk id="hv" glossD="M -18 -9 Q -2 -15 12 -11" />
      </g>
      <path
        d="M 152 204 Q 148 214 152 224"
        fill="none"
        style={{ stroke: "var(--syrup)" }}
        strokeOpacity="0.45"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <g transform="translate(172 218) rotate(12) scale(0.85)">
        <Varenyk id="hv" glossD="M -16 -9 Q 0 -14 12 -10" />
      </g>

      {/* plate contact - the tight shadows that make them sit */}
      <g fill="#0f0c0a" opacity="0.5">
        <ellipse cx="98" cy="227" rx="26" ry="2.6" />
        <ellipse cx="138" cy="228.5" rx="30" ry="2.8" />
        <ellipse cx="172" cy="229" rx="24" ry="2.4" />
      </g>
    </g>
  );
}
