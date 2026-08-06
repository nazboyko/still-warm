import { Exhibition } from "./components/exhibition/Exhibition.tsx";
import { Hero } from "./components/hero/Hero.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { Header } from "./components/layout/Header.tsx";

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Exhibition />
      </main>
      <Footer />
    </>
  );
}

export default App;
