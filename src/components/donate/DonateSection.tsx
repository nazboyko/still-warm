import { useEffect, useRef, useState } from "react";
import type {
  DonatedExhibit,
  ExhibitSubmission,
} from "../../content/donate.ts";
import { donateForm, donateStatus } from "../../content/donate.ts";
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

export function DonateSection() {
  const [draft, setDraft] = useState(emptyDraft);
  const [donated, setDonated] = useState<DonatedExhibit | null>(null);
  const afterRef = useRef<HTMLDivElement>(null);

  function updateDraft(field: keyof ExhibitSubmission, value: string) {
    setDraft({ ...draft, [field]: value });
  }

  function donate() {
    setDonated(makeDonatedExhibit(draft, Math.random, new Date()));
  }

  function resetDesk() {
    setDraft(emptyDraft);
    setDonated(null);
  }

  // The form unmounts on donation; keep keyboard visitors oriented.
  useEffect(() => {
    if (donated) {
      afterRef.current?.querySelector("button")?.focus();
    }
  }, [donated]);

  return (
    <section id="donate" className="donate" aria-labelledby="donate-title">
      <Container>
        <SectionHeading
          id="donate-title"
          eyebrow="The last frame"
          title="Donate an Exhibit"
        />
        <p className="donate-intro">{donateIntro}</p>
        <div className="donate-grid">
          <ReservedExhibit draft={draft} donated={donated} />
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
            <p role="status" className="donate-status">
              {donated ? donateStatus.donated : ""}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
