import type {
  Capability,
  CompanyMilestone,
  CourseRecord,
  EducationRecord,
  Founder,
  LeetCodeData,
  LinkedInData,
  PlayStationData,
  Project,
  ResearchRecord,
  SkillCategory,
  TravelLocation,
  VerificationStatus,
} from "./content";

export interface ContactInfo {
  email: string;
  phone: string;
  city: string;
  country: string;
}

export interface ProfileIdentity {
  name: string;
  shortName: string;
  monogram: string;
  roles: string[];
  positioning: string;
  intro: string;
  currentFocus: string[];
  locationNote: string;
  contact: ContactInfo;
  externalLinks: { label: string; url: string }[];
}

export interface ArchiveIdentifiers {
  github: string;
  githubOrganisation: string;
  linkedin: string;
  leetcode: string;
  playstation: string;
  repository: string;
}

export interface IdentityDimension {
  id: string;
  index: string;
  title: string;
  description: string;
  section: string;
}

export interface ProfileFile {
  profile: ProfileIdentity;
  identifiers: ArchiveIdentifiers;
  dimensions: IdentityDimension[];
}

export interface ResearchFile {
  records: ResearchRecord[];
}

export interface TvaraFile {
  name: string;
  github: string;
  website?: string;
  positioning: string;
  description: string;
  founders: Founder[];
  capabilities: Capability[];
  milestones: CompanyMilestone[];
  metrics: { id: string; label: string; value: string; verification: VerificationStatus }[];
  disclosureNote: string;
}

export interface EducationFile {
  records: EducationRecord[];
  courses: CourseRecord[];
}

export interface ProjectsFile {
  records: Project[];
  note: string;
}

export interface SkillsFile {
  note: string;
  categories: SkillCategory[];
}

export interface TravelFile {
  locations: TravelLocation[];
  note: string;
}

export type {
  LeetCodeData,
  LinkedInData,
  PlayStationData,
  ResearchRecord,
  SkillCategory,
  TravelLocation,
  Project,
};
