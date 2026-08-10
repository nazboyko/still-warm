export interface VisitFact {
  label: string;
  value: string;
}

export const visitNote =
  "The museum has no address, no hours and no admission desk. It has a ramp.";

export const visitFacts: VisitFact[] = [
  { label: "Admission", value: "Free." },
  { label: "Hours", value: "Whenever you miss home." },
  { label: "Location", value: "Anywhere a recipe is remembered." },
];

export const accessFact = {
  label: "Access",
  value: "The museum's first exhibit is its ramp.",
  linkText: "See Exhibit 000.",
  href: "#exhibit-000",
};
