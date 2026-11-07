import { Boxes, GitBranch, LayoutTemplate, SquareTerminal } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { EmptyState } from "@/components/status/DataState";
import { projects } from "@/data";

const PROJECT_FIELDS = [
  { icon: SquareTerminal, label: "PROBLEM", text: "What the system had to solve, stated plainly." },
  { icon: GitBranch, label: "APPROACH", text: "Architecture, trade-offs and the engineering path." },
  { icon: Boxes, label: "STACK", text: "Languages, frameworks and infrastructure actually used." },
  { icon: LayoutTemplate, label: "RESULT", text: "Verified outcomes, repository and demo links." },
];

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      index="04"
      kicker="BUILDER FILE / SELECTED WORK"
      title="Projects with receipts."
      description="A project enters this archive with a technical account and a link to something inspectable. Repository activity is shown live nearby; this section is for the work that deserves a longer record."
    >
      <div className="projects-layout">
        <div className="projects-empty">
          <EmptyState
            title="NO VERIFIED PROJECT RECORDS"
            message={projects.note}
          />
        </div>
        <div className="project-schema">
          <p className="mono-label">RECORD SCHEMA</p>
          <ul>
            {PROJECT_FIELDS.map((field) => {
              const Icon = field.icon;
              return (
                <li key={field.label}>
                  <Icon size={16} aria-hidden="true" />
                  <div>
                    <p className="project-schema__label">{field.label}</p>
                    <p className="project-schema__text">{field.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
          <p className="project-schema__note">
            Untagged GitHub activity belongs in the live GitHub record. Forks are never
            presented as original work.
          </p>
        </div>
      </div>
    </Section>
  );
}
