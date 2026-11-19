import { ContactHero } from '../components/contact/ContactHero';
import { ContactMainSection } from '../components/contact/ContactMainSection';
import { WhatsAppBanner } from '../components/contact/WhatsAppBanner';
import { ContactFaq } from '../components/contact/ContactFaq';
import { ContactFinalCta } from '../components/contact/ContactFinalCta';

interface ContactPageProps {
  onBackToWebsite: () => void;
}

export function ContactPage({ onBackToWebsite }: ContactPageProps) {
  return (
    <main>
      <ContactHero />
      <ContactMainSection onBackToWebsite={onBackToWebsite} />
      <WhatsAppBanner />
      <ContactFaq />
      <ContactFinalCta />
    </main>
  );
}
