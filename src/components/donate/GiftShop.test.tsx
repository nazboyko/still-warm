import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import type { DonatedExhibit } from "../../content/donate.ts";
import { GiftShop } from "./GiftShop.tsx";

const donated: DonatedExhibit = {
  dish: "Rice pudding",
  feeling: "Quiet evenings",
  memory: "Stirred with a wooden spoon, never a recipe in sight.",
  donorName: "Marta",
  number: "V-0846",
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

class InstantImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  set src(_value: string) {
    queueMicrotask(() => this.onload?.());
  }
}

class BrokenImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  set src(_value: string) {
    queueMicrotask(() => this.onerror?.());
  }
}

/* Deliberately without roundRect: this fake is the old engine, so every run
   also proves the postcard still draws when the corner has to be squared. */
const makeContext = () => ({
  font: "",
  fillStyle: "",
  strokeStyle: "",
  lineWidth: 0,
  textAlign: "left",
  letterSpacing: "",
  fillRect: vi.fn(),
  drawImage: vi.fn(),
  fillText: vi.fn(),
  measureText: vi.fn(() => ({ width: 100 })),
  save: vi.fn(),
  restore: vi.fn(),
  clip: vi.fn(),
  beginPath: vi.fn(),
  rect: vi.fn(),
  fill: vi.fn(),
  stroke: vi.fn(),
  createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() })),
});

test("a working canvas downloads the png postcard with the exhibit", async () => {
  stubDownloadCapture();
  vi.stubGlobal("Image", InstantImage);
  const fakeContext = makeContext();
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
    screen.getByRole("button", { name: /Take CAT\. V-\d{4} home/ }),
  );
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent(
      "Your postcard is ready - downloading.",
    ),
  );
  expect(clicks).toEqual(["still-warm-V-0846.png"]);
  expect(fakeContext.fillText).toHaveBeenCalled();
  expect(fakeContext.drawImage).toHaveBeenCalledOnce();
  // The exhibit is framed and the room is lit, not just printed on.
  expect(fakeContext.stroke).toHaveBeenCalledOnce();
  expect(fakeContext.createRadialGradient).toHaveBeenCalledOnce();
});

test("a failed artwork load still ships the postcard, without it", async () => {
  stubDownloadCapture();
  vi.stubGlobal("Image", BrokenImage);
  const fakeContext = makeContext();
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
    screen.getByRole("button", { name: /Take CAT\. V-\d{4} home/ }),
  );
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent(
      "Your postcard is ready - downloading.",
    ),
  );
  expect(clicks).toEqual(["still-warm-V-0846.png"]);
  expect(fakeContext.drawImage).not.toHaveBeenCalled();
  expect(fakeContext.fillText).toHaveBeenCalled();
});

test("without canvas the postcard leaves as plain text", async () => {
  stubDownloadCapture();
  vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

  render(<GiftShop donated={donated} />);
  fireEvent.click(
    screen.getByRole("button", { name: /Take CAT\. V-\d{4} home/ }),
  );
  await waitFor(() =>
    expect(screen.getByRole("status")).toHaveTextContent(
      "Your postcard is ready - downloading.",
    ),
  );
  expect(clicks).toEqual(["still-warm-V-0846.txt"]);
});
