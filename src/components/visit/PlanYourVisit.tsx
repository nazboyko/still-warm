import { accessFact, visitFacts, visitNote } from "../../content/visit.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import "./PlanYourVisit.css";

/* Engraved ticket marks, and the only icons on the site: everywhere else the
   vocabulary is mono labels and brass rules. Stroke at the weight of those
   rules, no fill, and decorative - the label carries the meaning. */
const ticketMarks: Record<string, string[]> = {
  Admission: [
    "M3.5 9.2V7.5a1 1 0 0 1 1-1h15a1 1 0 0 1 1 1v1.7a2.8 2.8 0 0 0 0 5.6v1.7a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-1.7a2.8 2.8 0 0 0 0-5.6Z",
    "M14.5 7.5v9",
  ],
  Hours: ["M12 3.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17Z", "M12 7.5V12l3.2 2"],
  Location: [
    "M12 21c4.2-4.4 6.3-7.8 6.3-10.4a6.3 6.3 0 0 0-12.6 0C5.7 13.2 7.8 16.6 12 21Z",
    "M12 8.4a2.2 2.2 0 1 0 0 4.4 2.2 2.2 0 0 0 0-4.4Z",
  ],
  Access: [
    "M12 3.2 21 8H3l9-4.8Z",
    "M5.6 8v8M10 8v8M14 8v8M18.4 8v8",
    "M3.4 19.4h17.2",
  ],
};

function TicketMark({ label }: { label: string }) {
  const paths = ticketMarks[label];
  if (!paths) return null;
  return (
    <span className="visit-mark" aria-hidden="true">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </svg>
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
            {/* A small fixture on the rim, lit like the ones over the rooms. */}
            <span className="visit-fixture" aria-hidden="true">
              <svg
                viewBox="0 0 24 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinejoin="round"
              >
                <path d="M6 12.5 18 3.5v9Z" />
              </svg>
            </span>
            <p className="visit-admit">Admit one</p>
            <dl className="visit-facts">
              {visitFacts.map((fact) => (
                <div key={fact.label}>
                  <dt>
                    <TicketMark label={fact.label} />
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
                  <TicketMark label={accessFact.label} />
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
