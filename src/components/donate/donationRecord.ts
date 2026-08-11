import type {
  DonatedExhibit,
  ExhibitSubmission,
} from "../../content/donate.ts";
import { donateForm } from "../../content/donate.ts";

const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export function formatCollectedDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, "0");
  return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function makeVisitorNumber(random: () => number): string {
  return `V-${String(1 + Math.floor(random() * 9999)).padStart(4, "0")}`;
}

// Trimmed on the way in, not while typing: the page collapses stray whitespace
// but the postcard canvas paints it, so padding a visitor never sees on screen
// would indent the dish name and open a gap after the catalog dash.
export function makeDonatedExhibit(
  submission: ExhibitSubmission,
  random: () => number,
  now: Date,
): DonatedExhibit {
  return {
    dish: submission.dish.trim(),
    feeling: submission.feeling.trim(),
    memory: submission.memory.trim(),
    donorName: submission.donorName.trim() || donateForm.defaultDonor,
    number: makeVisitorNumber(random),
    collectedOn: formatCollectedDate(now),
  };
}
