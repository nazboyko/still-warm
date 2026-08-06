import { donateIntro } from "../../content/exhibits.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import "./DonateSection.css";
import { ReservedExhibit } from "./ReservedExhibit.tsx";

export function DonateSection() {
  return (
    <section id="donate" className="donate" aria-labelledby="donate-title">
      <Container>
        <SectionHeading
          id="donate-title"
          eyebrow="The last frame"
          title="Donate an Exhibit"
        />
        <p className="donate-intro">{donateIntro}</p>
        <ReservedExhibit />
      </Container>
    </section>
  );
}
