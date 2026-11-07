import educationJson from "./education.json";
import leetcodeJson from "./leetcode.json";
import linkedinJson from "./linkedin.json";
import playstationJson from "./playstation.json";
import profileJson from "./profile.json";
import projectsJson from "./projects.json";
import researchJson from "./research.json";
import skillsJson from "./skills.json";
import travelJson from "./travel.json";
import tvaraJson from "./tvara.json";
import type {
  EducationFile,
  LeetCodeData,
  LinkedInData,
  PlayStationData,
  ProfileFile,
  ProjectsFile,
  ResearchFile,
  SkillsFile,
  TravelFile,
  TvaraFile,
} from "@/types/static";

/**
 * JSON content is authored by hand and checked by these casts. The shapes are
 * covered by unit tests; runtime API data is validated separately in clients.
 */
function load<T>(value: unknown): T {
  return value as T;
}

export const profile = load<ProfileFile>(profileJson);
export const research = load<ResearchFile>(researchJson);
export const tvara = load<TvaraFile>(tvaraJson);
export const education = load<EducationFile>(educationJson);
export const projects = load<ProjectsFile>(projectsJson);
export const skills = load<SkillsFile>(skillsJson);
export const leetcode = load<LeetCodeData>(leetcodeJson);
export const linkedin = load<LinkedInData>(linkedinJson);
export const playstation = load<PlayStationData>(playstationJson);
export const travel = load<TravelFile>(travelJson);

export const identity = profile.profile;
export const identifiers = profile.identifiers;
export const dimensions = profile.dimensions;
