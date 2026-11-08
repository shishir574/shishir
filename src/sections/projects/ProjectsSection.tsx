import { Section } from "@/components/layout/Section";
import { EmptyState } from "@/components/status/DataState";
import { TagList } from "@/components/ui/Panel";
import { projects } from "@/data";
import { formatMonthYear } from "@/lib/formatting/date";

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      index="04"
      kicker="BUILDER FILE / SELECTED WORK"
      title="Projects."
      description="Selected builds and technical work, newest first."
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
            <EmptyState title="NO PROJECT RECORDS" message="No project records yet." />
          )}
        </div>
      </div>
    </Section>
  );
}
