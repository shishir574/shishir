import { Boxes, GitBranch, LayoutTemplate, SquareTerminal } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { EmptyState } from "@/components/status/DataState";
import { TagList } from "@/components/ui/Panel";
import { projects } from "@/data";
import { formatMonthYear } from "@/lib/formatting/date";

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
      description="Academic and individual projects from the résumé, with the actual stack used. Repository links are not listed in the résumé, so none are linked here; live repository activity is shown in the GitHub file."
    >
      <div className="projects-layout">
        <div className="projects-empty">
          {projects.records.length > 0 ? (
            <ul className="project-list">
              {projects.records.map((project) => (
                <li key={project.id}>
                  <article className="project-card">
                    <div className="project-card__top">
                      <span className="project-card__category">{project.category}</span>
                      {project.startDate ? (
                        <span className="project-card__date">
                          {formatMonthYear(project.startDate)}
                        </span>
                      ) : null}
                      {project.featured ? (
                        <span className="project-card__featured">FEATURED</span>
                      ) : null}
                    </div>
                    <h3 className="project-card__title">{project.title}</h3>
                    <p className="project-card__description">{project.description}</p>
                    {project.technologies.length > 0 ? (
                      <TagList
                        items={project.technologies}
                        ariaLabel={`${project.title} technologies`}
                      />
                    ) : null}
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="NO VERIFIED PROJECT RECORDS" message={projects.note} />
          )}
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
