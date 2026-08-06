import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Container } from "./Container.tsx";

test("renders its children", () => {
  render(
    <Container>
      <p>The exhibits are still warm.</p>
    </Container>,
  );
  expect(screen.getByText("The exhibits are still warm.")).toBeInTheDocument();
});
