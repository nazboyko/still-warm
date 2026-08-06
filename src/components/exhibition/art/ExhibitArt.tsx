import type { ExhibitId } from "../../../content/exhibits.ts";
import { EmpanadasArt } from "./EmpanadasArt.tsx";
import { GrilledCheeseArt } from "./GrilledCheeseArt.tsx";
import { PancakesArt } from "./PancakesArt.tsx";
import { VarenykyArt } from "./VarenykyArt.tsx";

const artByExhibit = {
  "cat-001": VarenykyArt,
  "cat-002": GrilledCheeseArt,
  "cat-003": EmpanadasArt,
  "cat-004": PancakesArt,
} satisfies Record<ExhibitId, (props: { lit: boolean }) => React.JSX.Element>;

export function ExhibitArt({ id, lit }: { id: ExhibitId; lit: boolean }) {
  const Art = artByExhibit[id];
  return <Art lit={lit} />;
}
