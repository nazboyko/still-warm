/* The shared light. Every piece sits on y=0, is lit from the upper left, and is
   built in the same order: base gradient, top light, core shadow, contact
   shadow, its own identifying texture, one hot accent. */

/* Wide enough, and thrown far enough right, to land on whatever stands behind
   the piece: three of a thing have to read as three, not as one lumpy mass. */
export function Contact({ rx, y = 1 }: { rx: number; y?: number }) {
  return (
    <ellipse
      cx={rx * 0.18}
      cy={y + 1}
      rx={rx * 1.04}
      ry={rx * 0.19}
      fill="url(#vd-contact)"
    />
  );
}

/* The turn away from the key light, painted back over the piece's own outline.
   Without it a food shape is a flat swatch, however good the silhouette is. */
export function Core({ d }: { d: string }) {
  return <path d={d} fill="url(#vd-core)" />;
}
