import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Footer } from "./Footer.tsx";

test("closes with the museum line", () => {
  render(<Footer />);
  expect(screen.getByRole("contentinfo")).toHaveTextContent(
    "The exhibits are still warm.",
  );
});
