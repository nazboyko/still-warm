import "./SectionHeading.css";

export function SectionHeading({
  eyebrow,
  title,
  id,
}: {
  eyebrow?: string;
  title: string;
  id?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="section-heading-eyebrow">{eyebrow}</p> : null}
      <h2 id={id}>{title}</h2>
    </div>
  );
}
