import type { DonatedExhibit, ExhibitSubmission } from "../../content/donate.ts";
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
  return String(100 + Math.floor(random() * 900));
}

export function makeDonatedExhibit(
  submission: ExhibitSubmission,
  random: () => number,
  now: Date,
): DonatedExhibit {
  return {
    ...submission,
    donorName: submission.donorName.trim() || donateForm.defaultDonor,
    number: makeVisitorNumber(random),
    collectedOn: formatCollectedDate(now),
  };
}
