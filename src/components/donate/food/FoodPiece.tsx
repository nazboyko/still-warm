import type { AccentTone, FoodKind } from "../exhibitSculpture.ts";
import { Bowl } from "./Bowl.tsx";
import { Bun } from "./Bun.tsx";
import { Disc } from "./Disc.tsx";
import { Dumpling } from "./Dumpling.tsx";
import { Stack } from "./Stack.tsx";
import { Wedge } from "./Wedge.tsx";

export function FoodPiece({
  kind,
  accent,
}: {
  kind: FoodKind;
  accent: AccentTone;
}) {
  if (kind === "dumpling") return <Dumpling />;
  if (kind === "disc") return <Disc />;
  if (kind === "bun") return <Bun />;
  if (kind === "stack") return <Stack />;
  if (kind === "bowl") return <Bowl accent={accent} />;
  return <Wedge accent={accent} />;
}
