import type { ExhibitId } from "./exhibits.ts";

export interface GuideAnswer {
  label: string;
  target: ExhibitId;
}

export const roomGuide: { question: string; answers: GuideAnswer[] } = {
  question: "How does tonight feel?",
  answers: [
    { label: "Missing someone", target: "cat-001" },
    { label: "Cozy and slow", target: "cat-002" },
    { label: "Celebrating", target: "cat-003" },
    { label: "Quiet morning feeling", target: "cat-004" },
  ],
};

export function guideResponse(roomNumber: string): string {
  return `Then you belong in Room ${roomNumber}.`;
}
