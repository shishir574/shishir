import { Building2, Code2, FlaskConical } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { dimensions } from "@/data";

const ICONS = {
  builder: Code2,
  founder: Building2,
  researcher: FlaskConical,
} as const;

export function AboutSection() {
  return (
    <Section
      id="about"
      index="01"
      kicker="IDENTITY / THREE DIMENSIONS"
      title="One record, three operating modes."
      description="The archive is organised around how the work is made: systems built, a company run, and research tested."
    >
      <div className="dimension-grid">
        {dimensions.map((dimension) => {
          const Icon = ICONS[dimension.id as keyof typeof ICONS] ?? Code2;
          return (
            <article key={dimension.id} className="dimension-card">
              <div className="dimension-card__head">
                <span className="dimension-card__index">{dimension.index}</span>
                <Icon size={20} aria-hidden="true" />
              </div>
              <h3 className="dimension-card__title">{dimension.title}</h3>
              <p className="dimension-card__description">{dimension.description}</p>
              <a className="text-link dimension-card__link" href={`#${dimension.section}`}>
                OPEN RECORD
                <span aria-hidden="true">→</span>
              </a>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
