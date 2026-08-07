import type {
  ExhibitSubmission,
  SubmissionField,
} from "../../content/donate.ts";
import { donateForm } from "../../content/donate.ts";

export interface SubmissionError {
  field: SubmissionField;
  message: string;
}

const requiredFields: SubmissionField[] = ["dish", "feeling", "memory"];

export function validateSubmission(
  submission: ExhibitSubmission,
): SubmissionError[] {
  return requiredFields
    .filter((field) => submission[field].trim() === "")
    .map((field) => ({ field, message: donateForm.fields[field].error! }));
}
