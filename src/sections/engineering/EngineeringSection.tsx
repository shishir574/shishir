import { Braces, Cpu, Gamepad2, Workflow } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { SkillMap } from "@/components/diagrams/SkillMap";
import { TagList } from "@/components/ui/Panel";
import { skills } from "@/data";

const ICONS = {
  "ai-ml": Cpu,
  engineering: Braces,
  "game-engineering": Gamepad2,
  product: Workflow,
} as const;

export function EngineeringSection() {
  return (
    <Section
      id="engineering"
      index="05"
      kicker="BUILDER FILE / SKILL MAP"
      title="Engineering."
      description="Skill areas across AI systems, engineering, game development and product."
    >
      <div className="engineering-layout">
        <div className="skill-map-wrap">
          <SkillMap />
        </div>
        <div className="skill-groups">
          {skills.categories.map((category, index) => {
            const Icon = ICONS[category.id as keyof typeof ICONS] ?? Braces;
            return (
              <article key={category.id} className="skill-group">
                <div className="skill-group__head">
                  <span className="skill-group__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon size={17} aria-hidden="true" />
                </div>
                <h3 className="skill-group__title">{category.label}</h3>
                <p className="skill-group__description">{category.description}</p>
                <TagList items={category.items} ariaLabel={`${category.label} areas`} />
              </article>
            );
          })}
        </div>
      </div>
    </Section>
  );
}
