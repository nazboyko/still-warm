import { Container } from "./Container.tsx";
import "./Footer.css";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <p className="site-footer-line">The exhibits are still warm.</p>
        <p className="site-footer-meta">
          MIT licensed.{" "}
          <a href="https://github.com/nazboyko/still-warm">Source</a>
        </p>
      </Container>
    </footer>
  );
}
