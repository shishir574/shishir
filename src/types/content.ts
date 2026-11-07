/**
 * Shared domain types for live API data and curated archive records.
 * Presentation components must consume these types, never raw API payloads.
 */

export interface ApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
  source: string;
}

export interface ExternalLink {
  label: string;
  url: string;
}

export type VerificationStatus = "verified" | "pending" | "placeholder";

export interface TimelineEntry {
  id: string;
  title: string;
  organization?: string;
  description: string;
  startDate: string;
  endDate?: string;
  links?: ExternalLink[];
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  technologies: string[];
  startDate?: string;
  endDate?: string;
  repository?: string;
  demo?: string;
  featured: boolean;
  images?: string[];
  diagrams?: string[];
}

export interface ResearchRecord {
  id: string;
  title: string;
  shortTitle: string;
  authors: string[];
  venue: string;
  publicationDate: string;
  abstract: string;
  summary: string;
  topics: string[];
  doi?: string;
  paperUrl?: string;
  pdfUrl?: string;
  sourceCodeUrl?: string;
  verification: VerificationStatus;
  recordNote: string;
}

export interface Founder {
  id: string;
  name: string;
  role: string;
  focus: string;
}

export interface Capability {
  id: string;
  label: string;
  description: string;
}

export interface CompanyMilestone {
  id: string;
  title: string;
  date: string;
  description: string;
  verification: VerificationStatus;
}

export interface EducationRecord {
  id: string;
  institution: string;
  degree: string;
  department: string;
  affiliation: string;
  startDate: string;
  endDate?: string;
  gpa?: string;
  verification: VerificationStatus;
  notes: string[];
}

export interface CourseRecord {
  id: string;
  name: string;
  category: string;
  academicYear: string;
  grade?: string;
  technologies: string[];
  relatedProjects: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  description: string;
  items: string[];
}

export interface TravelLocation {
  id: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  visitDate: string;
  duration?: string;
  purpose?: string;
  description: string;
  photos: string[];
  relatedOrganization?: string;
}

export interface LeetCodeActivity {
  date: string;
  count: number;
}

export interface LeetCodeData {
  username: string;
  profileUrl: string;
  lastUpdated: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  activity: LeetCodeActivity[];
}

export interface LinkedExperience {
  id: string;
  organization: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  location?: string;
  logo?: string;
  url?: string;
}

export interface LinkedInPost {
  id: string;
  url: string;
  summary?: string;
}

export interface LinkedInData {
  identifier: string;
  profileUrl: string;
  headline: string;
  about: string;
  lastUpdated: string;
  experience: LinkedExperience[];
  education: EducationRecord[];
  skills: string[];
  certifications: TimelineEntry[];
  publications: TimelineEntry[];
  awards: TimelineEntry[];
  projects: Project[];
  posts: LinkedInPost[];
  verificationNote: string;
}

export interface PlayStationTrophyCounts {
  platinum: number;
  gold: number;
  silver: number;
  bronze: number;
}

export interface PlayStationGame {
  id: string;
  title: string;
  coverImage?: string;
  platform: string;
  completionPercentage: number;
  playtimeHours?: number;
  lastPlayed?: string;
  trophies: PlayStationTrophyCounts;
  platinum: boolean;
  gameUrl?: string;
}

export interface PlayStationData {
  onlineId: string;
  profileUrl?: string;
  lastUpdated: string;
  profileImage?: string;
  trophyLevel: number;
  totalTrophies: number;
  platinumCount: number;
  goldCount: number;
  silverCount: number;
  bronzeCount: number;
  games: PlayStationGame[];
  verificationNote: string;
}
