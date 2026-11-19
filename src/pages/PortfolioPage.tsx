import { useState } from 'react';
import { PortfolioHero } from '../components/portfolio/PortfolioHero';
import { ProjectShowcase } from '../components/portfolio/ProjectShowcase';
import { FullScreenPreview } from '../components/portfolio/FullScreenPreview';
import { PortfolioExpertise } from '../components/portfolio/PortfolioExpertise';
import { PortfolioCTA } from '../components/portfolio/PortfolioCTA';
import type { FeaturedWebsiteItem } from '../data/portfolioPageData';

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

  return (
    <main>
      <PortfolioHero />
      <ProjectShowcase onOpenFullScreen={setFullScreenProject} />
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
    </main>
  );
}
