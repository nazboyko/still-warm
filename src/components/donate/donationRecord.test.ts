import { describe, expect, test } from "vitest";
import {
  formatCollectedDate,
  makeDonatedExhibit,
  makeVisitorNumber,
} from "./donationRecord.ts";

describe("formatCollectedDate", () => {
  test("renders the museum date format", () => {
    expect(formatCollectedDate(new Date(2026, 7, 6))).toBe("06 AUG 2026");
  });

  test("pads single-digit days", () => {
    expect(formatCollectedDate(new Date(2026, 0, 3))).toBe("03 JAN 2026");
  });
});

describe("makeVisitorNumber", () => {
  test("reads as a four-digit visitor catalog number", () => {
    expect(makeVisitorNumber(() => 0)).toBe("V-0001");
    expect(makeVisitorNumber(() => 0.9999)).toBe("V-9999");
    expect(makeVisitorNumber(() => 0.5)).toMatch(/^V-\d{4}$/);
  });
});

describe("makeDonatedExhibit", () => {
  test("stamps number, date, and the default donor", () => {
    const donated = makeDonatedExhibit(
      {
        dish: "Rice pudding",
        feeling: "Quiet",
        memory: "A spoon.",
        donorName: "  ",
      },
      () => 0.5,
      new Date(2026, 7, 6),
    );
    expect(donated.number).toBe("V-5000");
    expect(donated.collectedOn).toBe("06 AUG 2026");
    expect(donated.donorName).toBe("a visitor");
  });

  test("keeps a given donor name", () => {
    const donated = makeDonatedExhibit(
      {
        dish: "Rice pudding",
        feeling: "Quiet",
        memory: "A spoon.",
        donorName: "Marta",
      },
      () => 0.5,
      new Date(2026, 7, 6),
    );
    expect(donated.donorName).toBe("Marta");
  });

  test("trims every field, so the postcard cannot paint stray padding", () => {
    const donated = makeDonatedExhibit(
      {
        dish: "   Grilled cheese  ",
        feeling: "  Rain ",
        memory: "  Butter in the pan.  ",
        donorName: "  Marta  ",
      },
      () => 0.5,
      new Date(2026, 7, 6),
    );
    expect(donated.dish).toBe("Grilled cheese");
    expect(donated.feeling).toBe("Rain");
    expect(donated.memory).toBe("Butter in the pan.");
    expect(donated.donorName).toBe("Marta");
  });
});
