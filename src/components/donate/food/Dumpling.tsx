import { BODY, Varenyk } from "../../art/Varenyk.tsx";
import { Contact, Core } from "./shading.tsx";

/* The museum's own varenyk, set on the plate. The crimped flange is the whole
   reason a dumpling reads as a dumpling; the second, worse one drawn here
   before had none, which is why this shape kept coming out a bread roll. */
const SET_ON_PLATE = "translate(0 -14.4) scale(1.15)";

export function Dumpling() {
  return (
    <g>
      <Contact rx={38} y={4} />
      <g transform={SET_ON_PLATE}>
        <Varenyk id="vd" glossD="M -20 -8 Q -6 -14 8 -11" />
        <Core d={BODY} />
      </g>
    </g>
  );
}
