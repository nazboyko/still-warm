import { act, renderHook } from "@testing-library/react";
import { afterEach, expect, test, vi } from "vitest";
import { useEntrance } from "./useEntrance.ts";

afterEach(() => {
  sessionStorage.clear();
  document.documentElement.removeAttribute("data-entrance");
  vi.restoreAllMocks();
  vi.useRealTimers();
});

test("plays once, dims the document, and marks the session", () => {
  vi.useFakeTimers();
  const { result } = renderHook(() => useEntrance());
  expect(result.current).toBe("dim");
  expect(document.documentElement.hasAttribute("data-entrance")).toBe(true);
  act(() => {
    vi.advanceTimersByTime(1400);
  });
  expect(result.current).toBe("lit");
  expect(document.documentElement.hasAttribute("data-entrance")).toBe(false);
  expect(sessionStorage.getItem("still-warm-entrance")).toBe("done");
});

test("any key skips instantly", () => {
  const { result } = renderHook(() => useEntrance());
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
  });
  expect(result.current).toBe("lit");
  expect(document.documentElement.hasAttribute("data-entrance")).toBe(false);
});

test("a played session loads lit", () => {
  sessionStorage.setItem("still-warm-entrance", "done");
  const { result } = renderHook(() => useEntrance());
  expect(result.current).toBe("lit");
  expect(document.documentElement.hasAttribute("data-entrance")).toBe(false);
});

test("reduced motion loads lit with no choreography", () => {
  vi.spyOn(window, "matchMedia").mockReturnValue({
    matches: true,
  } as MediaQueryList);
  const { result } = renderHook(() => useEntrance());
  expect(result.current).toBe("lit");
  expect(document.documentElement.hasAttribute("data-entrance")).toBe(false);
});

test("blocked session storage never blocks the entrance", () => {
  vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
    throw new Error("blocked");
  });
  const { result } = renderHook(() => useEntrance());
  expect(result.current).toBe("dim");
  act(() => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
  });
  expect(result.current).toBe("lit");
});

test("unmount removes the listeners and the attribute", () => {
  const { result, unmount } = renderHook(() => useEntrance());
  expect(result.current).toBe("dim");
  unmount();
  expect(document.documentElement.hasAttribute("data-entrance")).toBe(false);
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "a" }));
});
