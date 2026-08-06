import { accessFact, visitFacts } from "../../content/visit.ts";
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
        <dl className="visit-facts">
          {visitFacts.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
          <div>
            <dt>{accessFact.label}</dt>
            <dd>
              {accessFact.value} <a href={accessFact.href}>{accessFact.linkText}</a>
            </dd>
          </div>
        </dl>
      </Container>
    </section>
  );
}
