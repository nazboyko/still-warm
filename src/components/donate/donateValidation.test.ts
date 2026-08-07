import { describe, expect, test } from "vitest";
import type { ExhibitSubmission } from "../../content/donate.ts";
import { validateSubmission } from "./donateValidation.ts";

const complete: ExhibitSubmission = {
  dish: "Rice pudding",
  feeling: "Quiet evenings",
  memory: "Stirred with a wooden spoon, never a recipe in sight.",
  donorName: "",
};

describe("validateSubmission", () => {
  test("a complete submission passes", () => {
    expect(validateSubmission(complete)).toEqual([]);
  });

  test("the donor name is never required", () => {
    expect(validateSubmission({ ...complete, donorName: "" })).toEqual([]);
  });

  test("whitespace does not count as an answer", () => {
    const errors = validateSubmission({ ...complete, dish: "   " });
    expect(errors).toEqual([
      { field: "dish", message: "This exhibit needs a name." },
    ]);
  });

  test("errors arrive in form order, in placard voice", () => {
    const errors = validateSubmission({
      dish: "",
      feeling: "",
      memory: "",
      donorName: "Marta",
    });
    expect(errors.map((error) => error.field)).toEqual([
      "dish",
      "feeling",
      "memory",
    ]);
    expect(errors.map((error) => error.message)).toEqual([
      "This exhibit needs a name.",
      "This exhibit needs a feeling.",
      "Every exhibit needs its memory.",
    ]);
  });
});
