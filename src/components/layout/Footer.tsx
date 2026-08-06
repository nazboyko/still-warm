import { Container } from "./Container.tsx";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <p className="site-footer-line">The exhibits are still warm.</p>
        <p className="site-footer-meta">
          Built by Nazar Boyko for the{" "}
          <a href="https://dev.to/challenges">DEV Frontend Challenge</a>.
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
