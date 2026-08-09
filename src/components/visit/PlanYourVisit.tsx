import { accessFact, visitFacts, visitNote } from "../../content/visit.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import "./PlanYourVisit.css";

export function PlanYourVisit() {
  return (
    <section id="visit" className="visit" aria-labelledby="visit-title">
      <Container>
        <SectionHeading
          id="visit-title"
          eyebrow="Practical matters"
          title="Plan Your Visit"
        />
        <p className="visit-note">{visitNote}</p>
        <div className="visit-ticket">
          <p className="visit-admit">Admit one</p>
          <dl className="visit-facts">
            {visitFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          {/* The stub: the part of a ticket you keep, and the way out to the ramp. */}
          <dl className="visit-facts visit-stub">
            <div>
              <dt>{accessFact.label}</dt>
              <dd>
                {accessFact.value}{" "}
                <a href={accessFact.href}>{accessFact.linkText}</a>
              </dd>
            </div>
          </dl>
        </div>
      </Container>
    </section>
  );
}
