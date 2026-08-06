import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import type { DonatedExhibit } from "../../content/donate.ts";
import { GiftShop } from "./GiftShop.tsx";

const donated: DonatedExhibit = {
  dish: "Rice pudding",
  feeling: "Quiet evenings",
  memory: "Stirred with a wooden spoon, never a recipe in sight.",
  donorName: "Marta",
  number: "846",
  collectedOn: "06 AUG 2026",
};

const clicks: string[] = [];

function stubDownloadCapture() {
  vi.stubGlobal("URL", {
    ...URL,
    createObjectURL: vi.fn(() => "blob:postcard"),
    revokeObjectURL: vi.fn(),
  });
  vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (
    this: HTMLAnchorElement,
  ) {
    clicks.push(this.download);
  });
}

afterEach(() => {
  clicks.length = 0;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

test("a working canvas downloads the png postcard", async () => {
  stubDownloadCapture();
  const fakeContext = {
    font: "",
    fillStyle: "",
    textAlign: "left",
    fillRect: vi.fn(),
    fillText: vi.fn(),
    measureText: vi.fn(() => ({ width: 100 })),
  };
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(
    fakeContext as unknown as CanvasRenderingContext2D,
  );
  vi.spyOn(HTMLCanvasElement.prototype, "toBlob").mockImplementation(function (
    callback: BlobCallback,
  ) {
    callback(new Blob(["png"], { type: "image/png" }));
  });

  render(<GiftShop donated={donated} />);
  fireEvent.click(
    screen.getByRole("button", { name: "Take a postcard from the gift shop" }),
  );
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent(
      "Your postcard is ready - downloading.",
    ),
  );
  expect(clicks).toEqual(["still-warm-postcard.png"]);
  expect(fakeContext.fillText).toHaveBeenCalled();
});

test("without canvas the postcard leaves as plain text", async () => {
  stubDownloadCapture();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  render(<GiftShop donated={donated} />);
  fireEvent.click(
    screen.getByRole("button", { name: "Take a postcard from the gift shop" }),
  );
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent(
      "Your postcard is ready - downloading.",
    ),
  );
  expect(clicks).toEqual(["still-warm-postcard.txt"]);
});
