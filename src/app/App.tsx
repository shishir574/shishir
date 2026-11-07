import { useState } from "react";
import { sectionIds } from "@/app/routes";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useAccentMode } from "@/hooks/useAccentMode";
import { useScrollProgress } from "@/hooks/useScrollProgress";
import { SiteRail } from "@/components/navigation/SiteRail";
import { MobileHeader, MobileNav } from "@/components/navigation/MobileNav";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { HomeSection } from "@/sections/home/HomeSection";
import { AboutSection } from "@/sections/about/AboutSection";
import { TvaraSection } from "@/sections/tvara/TvaraSection";
import { ResearchSection } from "@/sections/research/ResearchSection";
import { ProjectsSection } from "@/sections/projects/ProjectsSection";
import { EngineeringSection } from "@/sections/engineering/EngineeringSection";
import { GitHubSection } from "@/sections/github/GitHubSection";
import { EducationSection } from "@/sections/education/EducationSection";
import { ExperienceSection } from "@/sections/experience/ExperienceSection";
import { LeetCodeSection } from "@/sections/leetcode/LeetCodeSection";
import { PlayStationSection } from "@/sections/gaming/PlayStationSection";
import { MusicSection } from "@/sections/music/MusicSection";
import { TravelSection } from "@/sections/travel/TravelSection";
import { ContactSection } from "@/sections/contact/ContactSection";

export default function App() {
  const active = useActiveSection(sectionIds);
  const progress = useScrollProgress();
  const accent = useAccentMode();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="archive">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ScrollProgress progress={progress} />
      <SiteRail active={active} />
      <MobileHeader active={active} open={menuOpen} onOpen={() => { setMenuOpen(true); }} />
      <MobileNav
        open={menuOpen}
        active={active}
        onClose={() => {
          setMenuOpen(false);
        }}
      />

      <main id="main" className="main" tabIndex={-1}>
        <HomeSection />
        <AboutSection />
        <TvaraSection />
        <ResearchSection />
        <ProjectsSection />
        <EngineeringSection />
        <GitHubSection />
        <EducationSection />
        <ExperienceSection />
        <LeetCodeSection />
        <PlayStationSection />
        <MusicSection />
        <TravelSection />
        <ContactSection />
      </main>

      <SiteFooter accent={accent.mode} onAccentChange={accent.setMode} />
    </div>
  );
}
