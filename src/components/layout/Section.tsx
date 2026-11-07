import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { SectionId } from "@/app/routes";

export function Section({
  id,
  index,
  kicker,
  title,
  description,
  children,
  className = "",
}: {
  id: SectionId;
  index: string;
  kicker: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`.trim()} aria-labelledby={`${id}-title`}>
      <div className="section__inner">
        <header className="section-head">
          <span className="section-head__index" aria-hidden="true">
            {index}
          </span>
          <div className="section-head__body">
            <p className="eyebrow">{kicker}</p>
            <h2 className="section-head__title" id={`${id}-title`}>
              {title}
            </h2>
            <p className="section-head__description">{description}</p>
          </div>
          <span className="section-head__rule" aria-hidden="true" />
        </header>
        <Reveal className="section__content">{children}</Reveal>
      </div>
    </section>
  );
}
