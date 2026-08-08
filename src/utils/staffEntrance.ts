import { staffEntrance } from "../content/staffEntrance.ts";

let announced = false;

/* One quiet note for whoever opens the console. Prints once per load. */
export function openStaffEntrance(log: (...args: string[]) => void): void {
  if (announced) return;
  announced = true;
  log(
    `%c${staffEntrance.placard}\n\n%c${staffEntrance.greeting}\n\n%c${staffEntrance.facts
      .map((fact) => `  - ${fact}`)
      .join("\n")}\n\n%c  ${staffEntrance.repo}\n`,
    // Tuned to clear 4:1 on BOTH console themes, since our wall colours do not:
    // plaster sits at 1.24:1 on a white console. Hierarchy comes from weight.
    "color:#aa721d",
    "color:#aa721d;font-weight:bold",
    "color:#c85b63",
    // Empty style: the URL keeps the console's own link treatment.
    "",
  );
}
