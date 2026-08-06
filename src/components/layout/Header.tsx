import { Container } from "./Container.tsx";
import "./Header.css";

export function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Container>
        <div className="site-header-bar">
          <a className="lockup" href="/">
            <span className="lockup-name">Still Warm</span>
            <span className="lockup-sub">The Museum of Comfort</span>
          </a>
          <nav aria-label="Museum">
            <ul className="site-nav">
              <li>
                <a href="#exhibition">Exhibition</a>
              </li>
              <li>
                <a href="#visit">Plan Your Visit</a>
              </li>
              <li>
                <a href="#donate">Donate an Exhibit</a>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
