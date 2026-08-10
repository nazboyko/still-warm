import { useRef, useState } from "react";
import type { RefObject } from "react";
import type {
  ExhibitSubmission,
  FieldCopy,
  SubmissionField,
} from "../../content/donate.ts";
import { donateForm } from "../../content/donate.ts";
import { Button } from "../ui/Button.tsx";
import "./DonateForm.css";
import type { SubmissionError } from "./donateValidation.ts";
import { validateSubmission } from "./donateValidation.ts";

interface DonateFormProps {
  draft: ExhibitSubmission;
  onChange: (field: keyof ExhibitSubmission, value: string) => void;
  onDonate: () => void;
}

interface DeskFieldProps {
  field: keyof ExhibitSubmission;
  copy: FieldCopy;
  value: string;
  error?: string;
  onChange: (field: keyof ExhibitSubmission, value: string) => void;
  fieldRef?: RefObject<HTMLInputElement | HTMLTextAreaElement | null>;
  textarea?: boolean;
}

function DeskField({
  field,
  copy,
  value,
  error,
  onChange,
  fieldRef,
  textarea,
}: DeskFieldProps) {
  const id = `donate-${field}`;
  const describedBy =
    [copy.hint ? `${id}-hint` : null, error ? `${id}-error` : null]
      .filter(Boolean)
      .join(" ") || undefined;
  const shared = {
    id,
    value,
    maxLength: copy.maxLength,
    placeholder: copy.placeholder,
    "aria-describedby": describedBy,
    "aria-invalid": error ? true : undefined,
    onChange: (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => onChange(field, event.target.value),
  };
  return (
    <div className="desk-field">
      <label htmlFor={id}>{copy.label}</label>
      {copy.hint ? (
        <p id={`${id}-hint`} className="desk-hint">
          {copy.hint}
        </p>
      ) : null}
      {textarea ? (
        <textarea
          {...shared}
          rows={3}
          ref={fieldRef as RefObject<HTMLTextAreaElement>}
        />
      ) : (
        <input
          {...shared}
          type="text"
          autoComplete={field === "donorName" ? "name" : "off"}
          ref={fieldRef as RefObject<HTMLInputElement>}
        />
      )}
      {error ? (
        <p id={`${id}-error`} className="desk-error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function DonateForm({ draft, onChange, onDonate }: DonateFormProps) {
  const [errors, setErrors] = useState<SubmissionError[]>([]);
  const [attempt, setAttempt] = useState(0);
  const dishRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const feelingRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(
    null,
  );
  const memoryRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);
  const refs: Record<
    SubmissionField,
    RefObject<HTMLInputElement | HTMLTextAreaElement | null>
  > = { dish: dishRef, feeling: feelingRef, memory: memoryRef };

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const found = validateSubmission(draft);
    setErrors(found);
    if (found.length > 0) {
      // Remount the alert per attempt so a repeat submit is announced again.
      setAttempt((count) => count + 1);
      refs[found[0]!.field].current?.focus();
      return;
    }
    onDonate();
  }

  const errorFor = (field: SubmissionField) =>
    errors.find((error) => error.field === field)?.message;

  return (
    <form
      className="donate-form"
      aria-label={donateForm.heading}
      noValidate
      onSubmit={handleSubmit}
    >
      {errors.length > 0 ? (
        <p key={attempt} role="alert" className="desk-alert">
          {errors.map((error) => error.message).join(" ")}
        </p>
      ) : null}
      <DeskField
        field="dish"
        copy={donateForm.fields.dish}
        value={draft.dish}
        error={errorFor("dish")}
        onChange={onChange}
        fieldRef={dishRef}
      />
      {/* Four ways in for a visitor who cannot think of a dish. They fill the
          field and nothing else: no suggestions, no memory of what was picked. */}
      <div
        className="desk-ideas"
        role="group"
        aria-labelledby="desk-ideas-label"
      >
        <p id="desk-ideas-label" className="desk-ideas-label">
          {donateForm.ideas.label}
        </p>
        <ul>
          {donateForm.ideas.options.map((idea) => (
            <li key={idea}>
              <Button quiet onClick={() => onChange("dish", idea)}>
                {idea}
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <DeskField
        field="feeling"
        copy={donateForm.fields.feeling}
        value={draft.feeling}
        error={errorFor("feeling")}
        onChange={onChange}
        fieldRef={feelingRef}
      />
      <DeskField
        field="memory"
        copy={donateForm.fields.memory}
        value={draft.memory}
        error={errorFor("memory")}
        onChange={onChange}
        fieldRef={memoryRef}
        textarea
      />
      <DeskField
        field="donorName"
        copy={donateForm.fields.donorName}
        value={draft.donorName}
        onChange={onChange}
      />
      <Button type="submit">{donateForm.submit}</Button>
    </form>
  );
}
