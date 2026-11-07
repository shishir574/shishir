import { Building2, ShieldCheck } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TvaraArchitecture } from "@/components/diagrams/TvaraArchitecture";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { TagList } from "@/components/ui/Panel";
import { identifiers, tvara } from "@/data";

export function TvaraSection() {
  return (
    <Section
      id="tvara"
      index="02"
      kicker="FOUNDER FILE / OPERATING COMPANY"
      title="Tvara — AI systems for how businesses actually run."
      description={tvara.positioning}
    >
      <div className="tvara-layout">
        <div className="tvara-brief panel">
          <div className="panel__head">
            <span className="mono-label">COMPANY RECORD</span>
            <Building2 size={16} aria-hidden="true" />
          </div>
          <p className="tvara-brief__description">{tvara.description}</p>
          <dl className="meta-list">
            <div>
              <dt>COMPANY</dt>
              <dd>{tvara.name}</dd>
            </div>
            <div>
              <dt>GITHUB</dt>
              <dd>
                <ExternalLink href={`https://github.com/${identifiers.githubOrganisation}`}>
                  {identifiers.githubOrganisation}
                </ExternalLink>
              </dd>
            </div>
            <div>
              <dt>ROLE</dt>
              <dd>Co-founder &amp; CTO</dd>
            </div>
            <div>
              <dt>DISCLOSURE</dt>
              <dd>Public-safe record</dd>
            </div>
          </dl>
          <div className="tvara-brief__note">
            <ShieldCheck size={15} aria-hidden="true" />
            <p>{tvara.disclosureNote}</p>
          </div>
        </div>

        <div className="founders panel">
          <div className="panel__head">
            <span className="mono-label">FOUNDING TEAM</span>
            <span className="panel__count">{String(tvara.founders.length).padStart(2, "0")}</span>
          </div>
          <ul className="founder-list">
            {tvara.founders.map((founder) => (
              <li key={founder.id} className="founder">
                <span className="founder__index">{founder.id.slice(0, 2).toUpperCase()}</span>
                <div>
                  <p className="founder__name">{founder.name}</p>
                  <p className="founder__role">{founder.role}</p>
                  <p className="founder__focus">{founder.focus}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="capability-block">
        <div className="block-head">
          <p className="mono-label">CAPABILITY MAP</p>
          <p className="block-head__note">CAPABILITIES, NOT METRICS</p>
        </div>
        <div className="capability-grid">
          {tvara.capabilities.map((capability, index) => (
            <article key={capability.id} className="capability">
              <span className="capability__index">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="capability__title">{capability.label}</h3>
              <p className="capability__description">{capability.description}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="tvara-stack">
        <TvaraArchitecture />
        <div className="tvara-stack__side">
          <p className="mono-label">STACK SURFACE</p>
          <TagList
            items={[
              "Agentic AI",
              "RAG",
              "Fine-tuning",
              "Private VPC",
              "Self-hosted",
              "Cloud",
              "Enterprise integrations",
            ]}
            ariaLabel="Tvara technology surface"
          />
          <p className="tvara-stack__note">
            This diagram is a public-safe schematic. It deliberately omits internal
            implementation detail, customer configurations and commercial figures.
          </p>
        </div>
      </div>
    </Section>
  );
}
