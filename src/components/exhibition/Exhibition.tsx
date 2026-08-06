import { exhibits } from "../../content/exhibits.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import "./Exhibition.css";
import { Room } from "./Room.tsx";

export function Exhibition() {
  return (
    <section
      id="exhibition"
      className="exhibition"
      aria-labelledby="exhibition-title"
    >
      <Container>
        <SectionHeading
          id="exhibition-title"
          eyebrow="On view"
          title="Current Exhibition"
        />
      </Container>
      {exhibits.map((exhibit, index) => (
        <Room key={exhibit.id} exhibit={exhibit} flip={index % 2 === 1} />
      ))}
    </section>
  );
}
