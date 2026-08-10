import { Container } from "./Container.tsx";
import "./Footer.css";

export function Footer({ hasDonated }: { hasDonated?: boolean }) {
  return (
    <footer className="site-footer">
      <Container>
        <p className="site-footer-line">
          {hasDonated ? "Yours is still warm." : "The exhibits are still warm."}
        </p>
        <p className="site-footer-meta">
          Built by Nazar Boyko for the{" "}
          <a href="https://dev.to/challenges/frontend-2026-07-29">
            DEV Frontend Challenge
          </a>
          .
        </p>
        <p className="site-footer-meta">
          MIT licensed.{" "}
          <a href="https://github.com/nazboyko/still-warm">Source on GitHub</a>.
          Accessibility statement: <a href="#exhibit-000">Exhibit 000</a>.
        </p>
      </Container>
    </footer>
  );
}
