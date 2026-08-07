import { useRef } from "react";
import { DonateSection } from "./components/donate/DonateSection.tsx";
import { EntranceOverlay } from "./components/entrance/EntranceOverlay.tsx";
import { Exhibition } from "./components/exhibition/Exhibition.tsx";
import { Hero } from "./components/hero/Hero.tsx";
import { Footer } from "./components/layout/Footer.tsx";
import { Header } from "./components/layout/Header.tsx";
import { PlanYourVisit } from "./components/visit/PlanYourVisit.tsx";
import type { ExhibitId } from "./content/exhibits.ts";
import { useEntrance } from "./hooks/useEntrance.ts";

function App() {
  const walkRef = useRef<((id: ExhibitId) => void) | null>(null);
  const entrance = useEntrance();
  return (
    <>
      {entrance === "dim" ? <EntranceOverlay /> : null}
      <Header />
      <main id="main">
        <Hero onGuideChoose={(id) => walkRef.current?.(id)} />
        <Exhibition
          registerWalk={(walk) => {
            walkRef.current = walk;
          }}
        />
        <DonateSection />
        <PlanYourVisit />
      </main>
      <Footer />
    </>
  );
}

export default App;
