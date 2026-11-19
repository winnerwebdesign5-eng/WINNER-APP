export interface ConfigurableSocialLink {
  id: 'instagram' | 'facebook' | 'tiktok' | 'linkedin' | 'x';
  label: string;
  brandName: string;
  /**
   * Configure profile URLs here or via VITE_SOCIAL_* environment variables.
   * When null/empty, the platform renders as a non-clickable placeholder
   * rather than pointing to an invented profile.
   */
  url: string | null;
}

export interface ContactFaqItem {
  id: string;
  question: string;
  answer: string;
}

export const CONTACT_INFO = {
  brandName: 'Winner Designs',
  tagline: 'YOUR PARTNER FOR DIGITAL WINS.',
  email: 'winnerwebdesign5@gmail.com',
  mailtoHref: 'mailto:winnerwebdesign5@gmail.com',
  whatsappDisplay: '+234 916 965 5756',
  whatsappLocal: '09169655756',
  whatsappMessage:
    "Hello Winner Designs! I'm interested in your services and would love to discuss a project.",
  whatsappHref:
    "https://wa.me/2349169655756?text=Hello%20Winner%20Designs!%20I'm%20interested%20in%20your%20services%20and%20would%20love%20to%20discuss%20a%20project.",
  location: 'Nigeria',
  locationSummary: 'Serving businesses, entrepreneurs, and brands worldwide.',
  availabilityLabel: 'AVAILABLE FOR NEW PROJECTS',
  heroSupportingLocation: 'Based in Nigeria. Working with ambitious businesses worldwide.',
} as const;

export const CONFIGURABLE_SOCIALS: ConfigurableSocialLink[] = [
  {
    id: 'instagram',
    label: 'Instagram',
    brandName: 'Winner Designs',
    url: import.meta.env.VITE_SOCIAL_INSTAGRAM || null,
  },
  {
    id: 'facebook',
    label: 'Facebook',
    brandName: 'Winner Designs',
    url: import.meta.env.VITE_SOCIAL_FACEBOOK || null,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    brandName: 'Winner Designs',
    url: import.meta.env.VITE_SOCIAL_TIKTOK || null,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    brandName: 'Winner Designs',
    url: import.meta.env.VITE_SOCIAL_LINKEDIN || null,
  },
  {
    id: 'x',
    label: 'X',
    brandName: 'Winner Designs',
    url: import.meta.env.VITE_SOCIAL_X || null,
  },
];

export const CONTACT_SERVICE_OPTIONS = [
  'Website Design & Development',
  'WordPress Website Development',
  'E-commerce Website Development',
  'AI Automation & Workflow Solutions',
  'Business Process Automation',
  'Landing Page Design',
  'Brand Identity & Graphic Design',
  'Email Marketing',
  'Other / Not Sure Yet',
] as const;

export const CONTACT_BUDGET_OPTIONS = [
  'Under $100',
  '$100–$300',
  '$300–$500',
  '$500–$1,000',
  '$1,000–$3,000',
  'Above $3,000',
  'Not Sure Yet',
] as const;

export const CONTACT_FAQ_ITEMS: ContactFaqItem[] = [
  {
    id: 'c-faq-1',
    question: 'What services does Winner Designs offer?',
    answer:
      'We provide website design and development, WordPress websites, e-commerce solutions, AI automation, business workflow automation, landing pages, graphic design, branding, and email marketing.',
  },
  {
    id: 'c-faq-2',
    question: 'Do you work with international clients?',
    answer:
      'Yes. Winner Designs is based in Nigeria and works with businesses, entrepreneurs, and brands worldwide.',
  },
  {
    id: 'c-faq-3',
    question: 'How do I get started?',
    answer:
      "Simply complete our project enquiry form or contact us directly on WhatsApp. Tell us about your goals, and we'll discuss the best way to move forward.",
  },
  {
    id: 'c-faq-4',
    question: 'How much does a project cost?',
    answer:
      'Project costs depend on the service, complexity, features, and requirements. Share your estimated budget and project details so we can understand what you need.',
  },
  {
    id: 'c-faq-5',
    question: 'How long does it take to complete a project?',
    answer:
      "Timelines depend on the scope and complexity of each project. We'll discuss a realistic delivery schedule after understanding your requirements.",
  },
];
