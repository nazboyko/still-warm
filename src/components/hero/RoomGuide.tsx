import { useState } from "react";
import type { ExhibitId } from "../../content/exhibits.ts";
import { exhibits } from "../../content/exhibits.ts";
import { guideResponse, roomGuide } from "../../content/guide.ts";
import { Button } from "../ui/Button.tsx";
import "./RoomGuide.css";

export function RoomGuide({ onChoose }: { onChoose: (id: ExhibitId) => void }) {
  const [chosenRoom, setChosenRoom] = useState<string | null>(null);

  function choose(target: ExhibitId) {
    const room = exhibits.find((exhibit) => exhibit.id === target);
    setChosenRoom(room?.number ?? null);
    onChoose(target);
  }

  return (
    <div
      className="room-guide"
      role="group"
      aria-labelledby="room-guide-question"
    >
      <p id="room-guide-question" className="room-guide-question">
        {roomGuide.question}
      </p>
      <ul className="room-guide-answers">
        {roomGuide.answers.map((answer) => (
          <li key={answer.target}>
            <Button quiet onClick={() => choose(answer.target)}>
              {answer.label}
            </Button>
          </li>
        ))}
      </ul>
      {chosenRoom ? (
        <p className="room-guide-response">{guideResponse(chosenRoom)}</p>
      ) : null}
    </div>
  );
}
