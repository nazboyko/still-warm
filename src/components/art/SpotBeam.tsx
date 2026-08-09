const LIGHT = "#e8a94e";

interface SpotBeamProps {
  /** Prefix for this beam's own gradient and mask ids. */
  id: string;
  x: number;
  /** Where the beam leaves the lamp; the fixture hangs just above it. */
  top: number;
  bottom: number;
  /** Half-width of the beam where it lands. */
  spread: number;
  opacity: number;
  className?: string;
}

/* A spotlight is air, not a triangle. Three nested cones give the beam a bright
   core inside a hazy skirt, a mask fades its sides out instead of ending them on
   a line, and the vertical gradient dims the light with the distance it travels,
   so the beam dissolves before the floor rather than stopping there. Gradients
   and a mask only: a filter here would cost more than the light is worth. */
export function SpotBeam({
  id,
  x,
  top,
  bottom,
  spread,
  opacity,
  className,
}: SpotBeamProps) {
  const haze = spread * 1.8;
  const height = bottom - top;
  return (
    <>
      <defs>
        <linearGradient
          id={`${id}-fall`}
          x1="0"
          y1={top}
          x2="0"
          y2={bottom}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor={LIGHT} stopOpacity="1" />
          <stop offset="50%" stopColor={LIGHT} stopOpacity="0.5" />
          <stop offset="85%" stopColor={LIGHT} stopOpacity="0.14" />
          <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={`${id}-sides`}
          x1={x - haze}
          y1="0"
          x2={x + haze}
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#000000" />
          <stop offset="26%" stopColor="#666666" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="74%" stopColor="#666666" />
          <stop offset="100%" stopColor="#000000" />
        </linearGradient>
        <mask
          id={`${id}-soft`}
          maskUnits="userSpaceOnUse"
          x={x - haze}
          y={top}
          width={haze * 2}
          height={height}
        >
          <rect
            x={x - haze}
            y={top}
            width={haze * 2}
            height={height}
            fill={`url(#${id}-sides)`}
          />
        </mask>
        <radialGradient id={`${id}-pool`}>
          <stop offset="0%" stopColor={LIGHT} stopOpacity="0.85" />
          <stop offset="40%" stopColor={LIGHT} stopOpacity="0.3" />
          <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-lamp`}>
          <stop offset="0%" stopColor="#fff4dd" stopOpacity="1" />
          <stop offset="55%" stopColor={LIGHT} stopOpacity="0.85" />
          <stop offset="100%" stopColor={LIGHT} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* The lamp the light comes out of. Without it the beam reads as cropped
          by the top of the frame instead of lit from somewhere. It keeps its
          own brightness, so dimming the beam never dims the fixture. */}
      <g className="art-fixture">
        <path
          d={`M${x - 9} ${top - 15} L${x + 9} ${top - 15} L${x + 6} ${top - 2} L${x - 6} ${top - 2} Z`}
          fill="#20180f"
          stroke="#9c8154"
          strokeWidth="0.7"
          strokeOpacity="0.7"
        />
        <ellipse
          cx={x}
          cy={top - 2}
          rx="6.4"
          ry="2.6"
          fill={`url(#${id}-lamp)`}
        />
        <ellipse
          cx={x}
          cy={top + 2}
          rx="13"
          ry="7"
          fill={`url(#${id}-lamp)`}
          opacity="0.3"
        />
      </g>

      <g className={className} opacity={opacity}>
        {/* Faint wide skirt, brighter core: the light thins outward from the
            middle of the beam rather than filling one flat wedge. */}
        <g mask={`url(#${id}-soft)`}>
          <path
            className="art-haze"
            d={cone(x, top, bottom, haze)}
            fill={`url(#${id}-fall)`}
            opacity="0.3"
          />
          <path
            d={cone(x, top, bottom, spread)}
            fill={`url(#${id}-fall)`}
            opacity="0.55"
          />
          <path
            d={cone(x, top, bottom, spread * 0.55)}
            fill={`url(#${id}-fall)`}
          />
        </g>
        {/* Where the beam lands: warm at the centre, gone by the edge. */}
        <ellipse
          className="art-pool"
          cx={x}
          cy={bottom}
          rx={spread * 1.9}
          ry={spread * 0.34}
          fill={`url(#${id}-pool)`}
        />
      </g>
    </>
  );
}

function cone(x: number, top: number, bottom: number, spread: number): string {
  const source = spread * 0.14;
  return `M${x - source} ${top} L${x - spread} ${bottom} L${x + spread} ${bottom} L${x + source} ${top} Z`;
}
