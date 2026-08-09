import { accessFact, visitFacts, visitNote } from "../../content/visit.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import "./PlanYourVisit.css";

/* Real tickets number their fields. Hidden from screen readers, which should
   hear the label and not the stationery. */
function FieldNumber({ index }: { index: number }) {
  return (
    <span className="visit-field-no" aria-hidden="true">
      {String(index + 1).padStart(2, "0")}
    </span>
  );
}

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
        <div className="visit-plate">
          {/* The same museum light the exhibits get, landing on the wall above
              the ticket. It stops at the ticket's edge: a gradient under a line
              of text leaves axe unable to decide the contrast behind it. */}
          <span className="visit-plate-light" aria-hidden="true" />
          <div className="visit-ticket">
            <p className="visit-admit">Admit one</p>
            <dl className="visit-facts">
              {visitFacts.map((fact, index) => (
                <div key={fact.label}>
                  <dt>
                    <FieldNumber index={index} />
                    {fact.label}
                  </dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </dl>
            {/* The stub: the part of a ticket you keep, and the way out to the ramp. */}
            <dl className="visit-facts visit-stub">
              <div>
                <dt>
                  <FieldNumber index={visitFacts.length} />
                  {accessFact.label}
                </dt>
                <dd>
                  {accessFact.value}{" "}
                  <a href={accessFact.href}>{accessFact.linkText}</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </Container>
    </section>
  );
}
