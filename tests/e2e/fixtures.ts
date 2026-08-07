import { test as base } from "@playwright/test";

// Specs that are not about the entrance pre-mark the session so the page
// always loads lit; entrance.spec.ts imports plain @playwright/test instead.
export const test = base.extend({
  context: async ({ context }, run) => {
    await context.addInitScript(() => {
      try {
        sessionStorage.setItem("still-warm-entrance", "done");
      } catch {
        // Storage may be blocked; the affected spec will just see the entrance.
      }
    });
    await run(context);
  },
});

export { expect } from "@playwright/test";
