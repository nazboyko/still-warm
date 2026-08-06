export function contrastRatio(hexA: string, hexB: string): number {
  const [la, lb] = [luminance(hexA), luminance(hexB)];
  const [lighter, darker] = la > lb ? [la, lb] : [lb, la];
  return (lighter + 0.05) / (darker + 0.05);
}

function luminance(hex: string): number {
  const value = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(value.slice(i, i + 2), 16) / 255;
    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error(`Not a 6-digit hex color: ${hex}`);
  }
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
