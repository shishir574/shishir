export type SectionId =
  | "home"
  | "about"
  | "tvara"
  | "research"
  | "projects"
  | "engineering"
  | "github"
  | "education"
  | "experience"
  | "leetcode"
  | "gaming"
  | "music"
  | "travel"
  | "contact";

export interface ArchiveSection {
  id: SectionId;
  index: string;
  label: string;
  description: string;
  dimension: "INDEX" | "BUILDER" | "FOUNDER" | "RESEARCHER" | "PERSONAL";
}

export const sections: ArchiveSection[] = [
  {
    id: "home",
    index: "00",
    label: "Index",
    description: "Identity, current signal and the archive directory.",
    dimension: "INDEX",
  },
  {
    id: "about",
    index: "01",
    label: "About",
    description: "The three dimensions: builder, founder and researcher.",
    dimension: "INDEX",
  },
  {
    id: "tvara",
    index: "02",
    label: "Tvara",
    description: "Company, product architecture and founder record.",
    dimension: "FOUNDER",
  },
  {
    id: "research",
    index: "03",
    label: "Research",
    description: "Publications, applied research and technical diagrams.",
    dimension: "RESEARCHER",
  },
  {
    id: "projects",
    index: "04",
    label: "Projects",
    description: "Selected builds, repositories and technical approaches.",
    dimension: "BUILDER",
  },
  {
    id: "engineering",
    index: "05",
    label: "Engineering",
    description: "Skill map and technology relationships.",
    dimension: "BUILDER",
  },
  {
    id: "github",
    index: "06",
    label: "GitHub",
    description: "Live public activity from shishir574 and TryTvara.",
    dimension: "BUILDER",
  },
  {
    id: "education",
    index: "07",
    label: "Education",
    description: "Academic record and coursework.",
    dimension: "INDEX",
  },
  {
    id: "experience",
    index: "08",
    label: "Experience",
    description: "Professional timeline and selected work.",
    dimension: "INDEX",
  },
  {
    id: "leetcode",
    index: "09",
    label: "LeetCode",
    description: "Problem-solving record and activity heatmap.",
    dimension: "PERSONAL",
  },
  {
    id: "gaming",
    index: "10",
    label: "PlayStation",
    description: "Trophy cabinet and game library.",
    dimension: "PERSONAL",
  },
  {
    id: "music",
    index: "11",
    label: "Music",
    description: "Spotify integration, gated behind explicit authorisation.",
    dimension: "PERSONAL",
  },
  {
    id: "travel",
    index: "12",
    label: "Travel",
    description: "Countries, cities and field notes.",
    dimension: "PERSONAL",
  },
  {
    id: "contact",
    index: "13",
    label: "Contact",
    description: "External profiles and public contact points.",
    dimension: "INDEX",
  },
];

export const sectionIds = sections.map((section) => section.id);

export function findSection(id: SectionId): ArchiveSection {
  const section = sections.find((entry) => entry.id === id);
  if (!section) throw new Error(`Unknown archive section: ${id}`);
  return section;
}
