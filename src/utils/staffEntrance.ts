import { staffEntrance } from "../content/staffEntrance.ts";

let announced = false;

/* One quiet note for whoever opens the console. Prints once per load. */
export function openStaffEntrance(log: (...args: string[]) => void): void {
  if (announced) return;
  announced = true;
  log(
    `%c${staffEntrance.placard}\n\n%c${staffEntrance.greeting}\n\n%c${staffEntrance.facts
      .map((fact) => `  - ${fact}`)
      .join("\n")}\n\n  ${staffEntrance.repo}\n`,
    "color:#9c8154",
    "color:#efe6d8;font-weight:bold",
    "color:#efe6d8",
  );
}
