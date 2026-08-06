import { DonateSection } from "./components/donate/DonateSection.tsx";
import { Exhibition } from "./components/exhibition/Exhibition.tsx";
import { Hero } from "./components/hero/Hero.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { Header } from "./components/layout/Header.tsx";
import { PlanYourVisit } from "./components/visit/PlanYourVisit.tsx";

function App() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Exhibition />
        <DonateSection />
        <PlanYourVisit />
      </main>
      <Footer />
    </>
  );
}

export default App;
