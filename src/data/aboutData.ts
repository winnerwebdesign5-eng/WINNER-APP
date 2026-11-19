export interface CoreValueItem {
  number: string;
  title: string;
  description: string;
  accentFrom: string;
  accentTo: string;
}

export interface ExpertiseCategory {
  id: string;
  number: string;
  title: string;
  items: string[];
  accentFrom: string;
  accentTo: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const FOUNDER_PORTRAIT = {
  src: '/assets/aistudio/Neon_Winner_Designs_Portrait_a9787ef8.png',
  alt: 'Creative founder portrait for Winner Designs',
  floatingTitle: 'WINNER DESIGNS',
  floatingSubtitle: 'CREATIVE THINKING. DIGITAL IMPACT.',
};

export const STORY_PARAGRAPHS = [
  'Winner Designs was built around a simple belief: digital experiences should empower businesses, not complicate them.',
  'We see every brand as an opportunity to create something better. Through thoughtful website design, creative visual communication and intelligent digital solutions, we aim to help businesses establish credibility and connect with their audiences.',
  'Our focus is on combining aesthetics with functionality, making sure that every digital solution serves a meaningful purpose.',
];

export const MISSION_VISION = {
  mission: {
    label: 'Our Mission',
    text: 'To empower businesses with creative, functional and modern digital solutions that strengthen their online presence, improve customer experiences and support sustainable growth.',
    accentFrom: '#FF2E93',
    accentTo: '#FF9A1F',
  },
  vision: {
    label: 'Our Vision',
    text: 'To become a trusted creative digital partner known for transforming ideas into meaningful digital experiences through innovation, thoughtful design and technology.',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
  },
};

export const CORE_VALUES: CoreValueItem[] = [
  {
    number: '01',
    title: 'Purposeful Creativity',
    description:
      'We believe beautiful design should always serve a purpose and communicate a clear message.',
    accentFrom: '#FF2E93',
    accentTo: '#FF4B4B',
  },
  {
    number: '02',
    title: 'Functional Excellence',
    description:
      'We prioritize usability, responsiveness and functionality in every digital experience.',
    accentFrom: '#FF9A1F',
    accentTo: '#FFC933',
  },
  {
    number: '03',
    title: 'Continuous Innovation',
    description:
      'We embrace modern tools and technologies to discover smarter ways to solve problems.',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
  },
  {
    number: '04',
    title: 'Client-Focused Thinking',
    description:
      "We value understanding business goals and creating solutions that align with our clients' needs.",
    accentFrom: '#18C8F0',
    accentTo: '#14E3A8',
  },
];

export const EXPERTISE_CATEGORIES: ExpertiseCategory[] = [
  {
    id: 'website-design',
    number: '01',
    title: 'Website Design & Development',
    accentFrom: '#FF2E93',
    accentTo: '#FF9A1F',
    items: [
      'WordPress development',
      'Responsive website design',
      'Business websites',
      'Landing pages',
      'E-commerce websites',
      'Website redesign',
    ],
  },
  {
    id: 'ai-automation',
    number: '02',
    title: 'AI Automation & Workflow Solutions',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
    items: [
      'Business workflow automation',
      'AI-powered customer support',
      'Lead capture and management',
      'Appointment and booking workflows',
      'Business process optimization',
    ],
  },
  {
    id: 'creative-design',
    number: '03',
    title: 'Creative Design',
    accentFrom: '#FF4B4B',
    accentTo: '#FFC933',
    items: [
      'Brand visuals',
      'Graphic design',
      'Social media graphics',
      'Marketing materials',
      'Digital visual communication',
    ],
  },
  {
    id: 'digital-growth',
    number: '04',
    title: 'Digital Growth Solutions',
    accentFrom: '#18C8F0',
    accentTo: '#14E3A8',
    items: [
      'Email marketing',
      'Lead generation',
      'Conversion-focused website experiences',
      'Digital customer engagement',
    ],
  },
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover',
    description:
      'We learn about your business, audience, challenges and goals.',
  },
  {
    number: '02',
    title: 'Strategize',
    description:
      'We identify the right direction and develop a clear project plan.',
  },
  {
    number: '03',
    title: 'Create',
    description:
      'We design and develop solutions that combine creativity and functionality.',
  },
  {
    number: '04',
    title: 'Refine',
    description:
      'We review, test and improve the experience to ensure quality and consistency.',
  },
];
