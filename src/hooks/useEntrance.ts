import { useLayoutEffect, useState } from "react";

const FLAG = "still-warm-entrance";

type EntranceState = "dim" | "lit";

function alreadyPlayed(): boolean {
  try {
    return sessionStorage.getItem(FLAG) === "done";
  } catch {
    return false;
  }
}

function markPlayed() {
  try {
    sessionStorage.setItem(FLAG, "done");
  } catch {
    // Blocked storage only means the lights come on again next visit.
  }
}

export function useEntrance(): EntranceState {
  const [state, setState] = useState<EntranceState>(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    alreadyPlayed()
      ? "lit"
      : "dim",
  );

  useLayoutEffect(() => {
    if (state !== "dim") return;
    document.documentElement.setAttribute("data-entrance", "");
    const finish = () => {
      markPlayed();
      setState("lit");
    };
    const timer = window.setTimeout(finish, 1400);
    const skips = ["keydown", "wheel", "touchmove", "pointerdown"] as const;
    for (const type of skips) {
      window.addEventListener(type, finish, { passive: true });
    }
    return () => {
      window.clearTimeout(timer);
      for (const type of skips) {
        window.removeEventListener(type, finish);
      }
      document.documentElement.removeAttribute("data-entrance");
    };
  }, [state]);

  return state;
}
