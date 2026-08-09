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
  placeholder: string;
  hint?: string;
  error?: string;
}

export const donateForm: {
  heading: string;
  fields: Record<SubmissionField | "donorName", FieldCopy>;
  ideas: { label: string; options: string[] };
  submit: string;
  reset: string;
  defaultDonor: string;
} = {
  heading: "The donation desk",
  fields: {
    dish: {
      label: "What dish feels like home?",
      maxLength: 40,
      placeholder: "e.g. Varenyky, Ramen, Jollof rice...",
      error: "This exhibit needs a name.",
    },
    feeling: {
      label: "What feeling does it hold?",
      maxLength: 24,
      placeholder: "e.g. Homesickness, Sunday, Joy...",
      hint: "One word, in catalog voice.",
      error: "This exhibit needs a feeling.",
    },
    memory: {
      label: "What do you remember?",
      maxLength: 140,
      placeholder:
        "e.g. She stirred it with a wooden spoon and never once looked at a recipe.",
      hint: "One or two sentences. The placard does the rest.",
      error: "Every exhibit needs its memory.",
    },
    donorName: {
      label: "Who is donating it? (optional)",
      maxLength: 40,
      placeholder: "e.g. Marta, or leave it blank",
    },
  },
  ideas: {
    label: "Need ideas?",
    options: ["Varenyky", "Ramen", "Jollof rice", "Grilled cheese"],
  },
  submit: "Donate the exhibit",
  reset: "Reset the form",
  defaultDonor: "a visitor",
};

export const donatePreview = {
  waiting: {
    heading: "Live preview",
    note: "This is how your exhibit label will look.",
  },
  donated: {
    heading: "Your exhibit is on display",
    note: "Thank you. The museum keeps it exactly as you wrote it.",
  },
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
