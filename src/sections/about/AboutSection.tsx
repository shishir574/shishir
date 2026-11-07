import { Building2, Code2, FlaskConical } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { dimensions } from "@/data";
import { StatusDot } from "@/components/ui/StatusDot";

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
      description="The archive is organised around how the work is made: systems built, a company run, and research tested. Personal interests sit alongside them as part of the same record, not as decoration."
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

      <div className="protocol">
        <div className="protocol__head">
          <p className="mono-label">ARCHIVE PROTOCOL</p>
          <StatusDot tone="live" label="STATIC-FIRST" />
        </div>
        <div className="protocol__grid">
          <div>
            <h3 className="protocol__title">CURATED CONTENT</h3>
            <p>
              Identity, research, company and personal records live in typed local data.
              Nothing is invented to fill a layout.
            </p>
          </div>
          <div>
            <h3 className="protocol__title">LIVE PUBLIC DATA</h3>
            <p>
              GitHub is fetched directly by the browser. Every integration has a loading,
              empty, stale and unavailable state.
            </p>
          </div>
          <div>
            <h3 className="protocol__title">NO HIDDEN LAYER</h3>
            <p>
              No backend, database, proxy or scheduled collector. The production artefact is
              HTML, CSS, JavaScript and assets.
            </p>
          </div>
        </div>
      </div>
    </Section>
  );
}
