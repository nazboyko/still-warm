import { useEffect, useRef, useState } from "react";
import type {
  DonatedExhibit,
  ExhibitSubmission,
} from "../../content/donate.ts";
import {
  donateForm,
  donatePreview,
  donateStatus,
} from "../../content/donate.ts";
import { donateIntro } from "../../content/exhibits.ts";
import { Container } from "../layout/Container.tsx";
import { SectionHeading } from "../layout/SectionHeading.tsx";
import { Button } from "../ui/Button.tsx";
import { DonateForm } from "./DonateForm.tsx";
import "./DonateSection.css";
import { GiftShop } from "./GiftShop.tsx";
import { makeDonatedExhibit } from "./donationRecord.ts";
import { ReservedExhibit } from "./ReservedExhibit.tsx";

const emptyDraft: ExhibitSubmission = {
  dish: "",
  feeling: "",
  memory: "",
  donorName: "",
};

export function DonateSection({
  onDonatedChange,
}: {
  onDonatedChange?: (donated: boolean) => void;
}) {
  const [draft, setDraft] = useState(emptyDraft);
  const [donated, setDonated] = useState<DonatedExhibit | null>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  function updateDraft(field: keyof ExhibitSubmission, value: string) {
    setDraft({ ...draft, [field]: value });
  }

  function donate() {
    setDonated(makeDonatedExhibit(draft, Math.random, new Date()));
    onDonatedChange?.(true);
  }

  function resetDesk() {
    setDraft(emptyDraft);
    setDonated(null);
    onDonatedChange?.(false);
  }

  // Both swaps unmount the focused control; keep keyboard visitors oriented.
  // After reset, landing on the Dish label doubles as the confirmation.
  const wasDonated = useRef(false);
  useEffect(() => {
    if (donated) {
      wasDonated.current = true;
      afterRef.current?.querySelector("button")?.focus();
    } else if (wasDonated.current) {
      wasDonated.current = false;
      document.getElementById("donate-dish")?.focus();
    }
  }, [donated]);

  return (
    <section
      id="donate"
      className="donate"
      data-donated={donated ? "true" : undefined}
      aria-labelledby="donate-title"
    >
      <Container>
        <SectionHeading
          id="donate-title"
          eyebrow="The last frame"
          title="Donate an Exhibit"
        />
        <p className="donate-intro">{donateIntro}</p>
        <div className="donate-panel">
          <div className="donate-grid">
            {/* The register comes first, in the DOM and on the page: you write
                the label, then you watch it appear. */}
            <div className="donate-desk">
              {donated ? (
                <div ref={afterRef} className="donate-after">
                  <GiftShop donated={donated} />
                  <Button onClick={resetDesk}>{donateForm.reset}</Button>
                </div>
              ) : (
                <DonateForm
                  draft={draft}
                  onChange={updateDraft}
                  onDonate={donate}
                />
              )}
              {/* Always mounted, so the live region is there to announce into. */}
              <p role="status" className="donate-status">
                {donated ? donateStatus.donated : ""}
              </p>
            </div>
            {/* The exhibit never moves. What the visitor watched while typing
                and what they are given at the end are the same frame in the
                same place; only what is inside it changes. The heading above
                it keeps its box for the same reason. */}
            <div className="donate-preview">
              <div className="donate-preview-head">
                <h3 className="preview-heading">
                  {donated
                    ? donatePreview.donated.heading
                    : donatePreview.waiting.heading}
                </h3>
                <p className="preview-note">
                  {donated
                    ? donatePreview.donated.note
                    : donatePreview.waiting.note}
                </p>
              </div>
              <ReservedExhibit draft={draft} donated={donated} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
