import { Building2, Globe } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { TvaraArchitecture } from "@/components/diagrams/TvaraArchitecture";
import { ExternalLink } from "@/components/ui/ExternalLink";
import { TagList } from "@/components/ui/Panel";
import { identifiers, tvara } from "@/data";
import { formatMonthYear } from "@/lib/formatting/date";

export function TvaraSection() {
  return (
    <Section
      id="tvara"
      index="02"
      kicker="FOUNDER FILE / OPERATING COMPANY"
      title="Tvara — AI Sales Brain."
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
              <dt>WEBSITE</dt>
              <dd>
                {tvara.website ? (
                  <ExternalLink href={tvara.website}>{tvara.website.replace(/^https?:\/\//, "")}</ExternalLink>
                ) : (
                  "—"
                )}
              </dd>
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
              <dt>STATUS</dt>
              <dd>{tvara.disclosureNote}</dd>
            </div>
          </dl>
          <div className="tvara-brief__note">
            <Globe size={15} aria-hidden="true" />
            <p>
              <ExternalLink href={tvara.website ?? "https://tvara.global"}>
                Visit tvara.global
              </ExternalLink>{" "}
              — Matching Engine, Intelligent Campaigns, Research and pricing.
            </p>
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
          <p className="mono-label">COMPANY MILESTONES</p>
          <p className="block-head__note">TVARA.GLOBAL</p>
        </div>
        {tvara.metrics.length > 0 ? (
          <div className="metric-strip" role="list" aria-label="Tvara at a glance">
            {tvara.metrics.map((metric) => (
              <div key={metric.id} className="metric" role="listitem">
                <p className="metric__value">{metric.value}</p>
                <p className="metric__label">{metric.label}</p>
              </div>
            ))}
          </div>
        ) : null}
        {tvara.milestones.length > 0 ? (
          <ul className="milestone-list">
            {tvara.milestones.map((milestone) => (
              <li key={milestone.id} className="milestone">
                <span className="milestone__date">{formatMonthYear(milestone.date)}</span>
                <div>
                  <p className="milestone__title">{milestone.title}</p>
                  <p className="milestone__description">{milestone.description}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="capability-block">
        <div className="block-head">
          <p className="mono-label">CAPABILITY MAP</p>
          <p className="block-head__note">FOUR SALES ENGINES, ONE BRAIN</p>
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
              "Matching Engine",
              "Intelligent Campaigns",
              "Email",
              "WhatsApp",
              "Calls",
              "CRM + Lead Sources",
            ]}
            ariaLabel="Tvara technology surface"
          />
          <p className="tvara-stack__note">
            CRMs store. Campaign tools send. Tvara decides — best offer, message angle,
            priority and channel, with a feedback loop from every reply.
          </p>
        </div>
      </div>
    </Section>
  );
}
