import "./SectionHeading.css";

export function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow ? <p className="section-heading-eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
    </div>
  );
}
