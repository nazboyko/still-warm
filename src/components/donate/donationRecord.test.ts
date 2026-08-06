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
  test("stays in the 100-999 range at both extremes", () => {
    expect(makeVisitorNumber(() => 0)).toBe("100");
    expect(makeVisitorNumber(() => 0.9999)).toBe("999");
  });
});

describe("makeDonatedExhibit", () => {
  test("stamps number, date, and the default donor", () => {
    const donated = makeDonatedExhibit(
      { dish: "Rice pudding", feeling: "Quiet", memory: "A spoon.", donorName: "  " },
      () => 0.5,
      new Date(2026, 7, 6),
    );
    expect(donated.number).toBe("550");
    expect(donated.collectedOn).toBe("06 AUG 2026");
    expect(donated.donorName).toBe("a visitor");
  });

  test("keeps a given donor name", () => {
    const donated = makeDonatedExhibit(
      { dish: "Rice pudding", feeling: "Quiet", memory: "A spoon.", donorName: "Marta" },
      () => 0.5,
      new Date(2026, 7, 6),
    );
    expect(donated.donorName).toBe("Marta");
  });
});
