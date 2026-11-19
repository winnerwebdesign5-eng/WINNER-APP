import { ServicesHero } from '../components/services/ServicesHero';
import { ServicesOverview } from '../components/services/ServicesOverview';
import { ServiceShowcase } from '../components/services/ServiceShowcase';
import { ServicesWhyUs } from '../components/services/ServicesWhyUs';
import { ServicesProcess } from '../components/services/ServicesProcess';
import { ServicesConversion } from '../components/services/ServicesConversion';
import { ServicesFaq } from '../components/services/ServicesFaq';
import { ServicesFinalCta } from '../components/services/ServicesFinalCta';

interface ServicesPageProps {
  onStartProject: (defaultService?: string) => void;
}

export function ServicesPage({ onStartProject }: ServicesPageProps) {
  return (
    <main>
      <ServicesHero onStartProject={() => onStartProject()} />
      <ServicesOverview />
      <ServiceShowcase onSelectService={(service) => onStartProject(service)} />
      <ServicesWhyUs />
      <ServicesProcess />
      <ServicesConversion onStartProject={() => onStartProject()} />
      <ServicesFaq />
      <ServicesFinalCta onStartProject={() => onStartProject()} />
    </main>
  );
}
