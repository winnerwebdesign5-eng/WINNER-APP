import { useState } from 'react';
import { PortfolioHero } from '../components/portfolio/PortfolioHero';
import { ProjectShowcase } from '../components/portfolio/ProjectShowcase';
import { AdminProjectsSection } from '../components/portfolio/AdminProjectsSection';
import { FullScreenPreview } from '../components/portfolio/FullScreenPreview';
import { ProjectCaseStudyModal } from '../components/portfolio/ProjectCaseStudyModal';
import { PortfolioExpertise } from '../components/portfolio/PortfolioExpertise';
import { PortfolioCTA } from '../components/portfolio/PortfolioCTA';
import type { FeaturedWebsiteItem } from '../data/portfolioPageData';
import type { AdminPortfolioProject } from '../types/portfolioProject';

interface PortfolioPageProps {
  onStartProject: (defaultService?: string) => void;
  onNavigateToServices: (sectionHash?: string) => void;
}

export function PortfolioPage({
  onStartProject,
  onNavigateToServices,
}: PortfolioPageProps) {
  const [fullScreenProject, setFullScreenProject] =
    useState<FeaturedWebsiteItem | null>(null);
  const [selectedCaseStudy, setSelectedCaseStudy] =
    useState<AdminPortfolioProject | null>(null);

  return (
    <main>
      <PortfolioHero />
      <ProjectShowcase onOpenFullScreen={setFullScreenProject} />
      <AdminProjectsSection onSelectProject={setSelectedCaseStudy} />
      <PortfolioExpertise
        onNavigateToService={(anchor) =>
          onNavigateToServices(anchor ? `#${anchor}` : undefined)
        }
      />
      <PortfolioCTA
        onStartProject={() => onStartProject()}
        onExploreServices={() => onNavigateToServices()}
      />

      <FullScreenPreview
        project={fullScreenProject}
        onClose={() => setFullScreenProject(null)}
      />

      <ProjectCaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onStartSimilar={(category) => onStartProject(category)}
      />
    </main>
  );
}
