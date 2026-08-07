import { useEffect, useState } from "react";

/* Printing takes the whole catalog: every label opens for the print pass and
   the museum goes back to one lit room afterwards. */
export function usePrintExpanded(): boolean {
  const [printing, setPrinting] = useState(false);
  useEffect(() => {
    const open = () => setPrinting(true);
    const close = () => setPrinting(false);
    window.addEventListener("beforeprint", open);
    window.addEventListener("afterprint", close);
    return () => {
      window.removeEventListener("beforeprint", open);
      window.removeEventListener("afterprint", close);
    };
  }, []);
  return printing;
}
