export interface ExhibitSubmission {
  dish: string;
  feeling: string;
  memory: string;
  donorName: string;
}

export interface DonatedExhibit extends ExhibitSubmission {
  number: string;
  collectedOn: string;
}

export type SubmissionField = "dish" | "feeling" | "memory";

export interface FieldCopy {
  label: string;
  maxLength: number;
  hint?: string;
  error?: string;
}

export const donateForm: {
  heading: string;
  fields: Record<SubmissionField | "donorName", FieldCopy>;
  submit: string;
  reset: string;
  defaultDonor: string;
} = {
  heading: "The donation desk",
  fields: {
    dish: {
      label: "Dish",
      maxLength: 40,
      error: "This exhibit needs a name.",
    },
    feeling: {
      label: "Feeling",
      maxLength: 24,
      hint: "In catalog voice: HOMESICKNESS, JOY, SUNDAY...",
      error: "This exhibit needs a feeling.",
    },
    memory: {
      label: "Memory",
      maxLength: 140,
      hint: "One or two sentences. The placard does the rest.",
      error: "Every exhibit needs its memory.",
    },
    donorName: {
      label: "Donated by (optional)",
      maxLength: 40,
    },
  },
  submit: "Donate the exhibit",
  reset: "Reset the form",
  defaultDonor: "a visitor",
};

export const donateStatus = {
  donated: "Your exhibit is now on display.",
  postcardReady: "Your postcard is ready - downloading.",
};

export const giftShop = {
  button: (catalogNumber: string) => `Take CAT. ${catalogNumber} home`,
};

export const postcardCard = {
  collectedPrefix: "COLLECTED",
  lockupName: "STILL WARM",
  lockupSub: "THE MUSEUM OF COMFORT",
  url: "still-warm.boyko-nazar.workers.dev",
  fileName: (catalogNumber: string) => `still-warm-${catalogNumber}.png`,
};
