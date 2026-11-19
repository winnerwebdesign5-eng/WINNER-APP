import { AboutHero } from '../components/about/AboutHero';
import { FounderSection } from '../components/about/FounderSection';
import { StorySection } from '../components/about/StorySection';
import { MissionVisionSection } from '../components/about/MissionVisionSection';
import { ValuesSection } from '../components/about/ValuesSection';
import { ExpertiseSection } from '../components/about/ExpertiseSection';
import { ApproachSection } from '../components/about/ApproachSection';
import { CommitmentSection } from '../components/about/CommitmentSection';
import { AboutCtaSection } from '../components/about/AboutCtaSection';

interface AboutPageProps {
  onStartProject: (defaultService?: string) => void;
  onExploreServices: () => void;
}

export function AboutPage({
  onStartProject,
  onExploreServices,
}: AboutPageProps) {
  return (
    <main>
      <AboutHero />
      <FounderSection onStartProject={() => onStartProject()} />
      <StorySection />
      <MissionVisionSection />
      <ValuesSection />
      <ExpertiseSection onSelectCapability={(cap) => onStartProject(cap)} />
      <ApproachSection />
      <CommitmentSection />
      <AboutCtaSection
        onStartProject={() => onStartProject()}
        onExploreServices={onExploreServices}
      />
    </main>
  );
}
