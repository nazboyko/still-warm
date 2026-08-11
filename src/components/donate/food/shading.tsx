/* The shared light. Every piece sits on y=0, is lit from the upper left, and
   carries the same language: base gradient, top light, contact shadow, its own
   identifying texture, and one hot accent. */

export function Contact({ rx }: { rx: number }) {
  return (
    <>
      <ellipse
        cx="0"
        cy="1"
        rx={rx}
        ry={rx * 0.12}
        fill="#0f0c0a"
        opacity="0.6"
      />
      <ellipse
        cx="0"
        cy="1"
        rx={rx * 0.7}
        ry={rx * 0.055}
        fill="#000"
        opacity="0.7"
      />
    </>
  );
}

export function Spark({ x, y, r = 2.4 }: { x: number; y: number; r?: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={r}
      style={{ fill: "var(--plaster)" }}
      fillOpacity="0.85"
    />
  );
}
