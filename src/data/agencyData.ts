export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  accentFrom: string;
  accentTo: string;
  deliverables: string[];
}

export interface AdvantageItem {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioProject {
  id: string;
  category: string;
  studyType: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  aspect: '16/9' | '4/3';
  featured?: boolean;
  overview: string;
  focusAreas: string[];
  accentColor: string;
}

export const HERO_MEDIA = {
  image: '/src/assets/images/hero_abstract_prism_1795000261051.jpg',
  alt: 'Architectural smoked obsidian glass sculpture refracting warm amber and violet light on dark slate',
};

export const ABOUT_MEDIA = {
  image: '/src/assets/images/about_creative_tech_1795000261409.jpg',
  alt: 'Precision optical glass lenses and matte anodized blocks arranged on dark slate representing creative engineering',
};

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Contact', href: '#contact' },
] as const;

export const TRUST_PILLARS = [
  'Web Design',
  'AI Automation',
  'Digital Experiences',
  'Business Growth',
] as const;

export const SERVICES: ServiceItem[] = [
  {
    id: 'website-design',
    number: '01',
    title: 'Website Design & Development',
    shortTitle: 'Website Design',
    description:
      'Beautiful, responsive, conversion-focused websites built to strengthen your online presence.',
    accentFrom: '#FF2E93',
    accentTo: '#FF9A1F',
    deliverables: ['Custom UI/UX Architecture', 'Responsive Frontend Engineering', 'Conversion & Speed Optimization'],
  },
  {
    id: 'ai-automation',
    number: '02',
    title: 'AI Automation & Workflows',
    shortTitle: 'AI Automation',
    description:
      'Intelligent automation that simplifies business processes, saves time and improves efficiency.',
    accentFrom: '#8B3DFF',
    accentTo: '#2F6BFF',
    deliverables: ['Workflow Orchestration', 'Lead Routing & Qualification', 'Custom AI Integrations'],
  },
  {
    id: 'ecommerce-development',
    number: '03',
    title: 'E-commerce Development',
    shortTitle: 'E-commerce',
    description:
      'Modern online stores designed to deliver seamless shopping experiences.',
    accentFrom: '#FF4B4B',
    accentTo: '#FFC933',
    deliverables: ['Storefront Design Systems', 'Streamlined Checkout Flows', 'Merchandising & Product UX'],
  },
  {
    id: 'brand-graphic-design',
    number: '04',
    title: 'Brand & Graphic Design',
    shortTitle: 'Brand Design',
    description:
      'Distinctive visual identities and creative assets that help brands stand out.',
    accentFrom: '#FF2E93',
    accentTo: '#8B3DFF',
    deliverables: ['Visual Identity Systems', 'Typography & Color Direction', 'Digital Campaign Assets'],
  },
  {
    id: 'web-applications',
    number: '05',
    title: 'Web Applications & Digital Solutions',
    shortTitle: 'Web Applications',
    description:
      'Functional digital experiences built around business needs.',
    accentFrom: '#2F6BFF',
    accentTo: '#18C8F0',
    deliverables: ['Client Portals & Dashboards', 'Scalable Component Libraries', 'API & System Integration'],
  },
  {
    id: 'email-lead-generation',
    number: '06',
    title: 'Email Marketing & Lead Generation',
    shortTitle: 'Lead Generation',
    description:
      'Digital communication strategies that help businesses engage audiences and generate enquiries.',
    accentFrom: '#18C8F0',
    accentTo: '#14E3A8',
    deliverables: ['Automated Nurture Sequences', 'High-Intent Landing Funnels', 'Editorial Newsletter Systems'],
  },
];

export const ADVANTAGES: AdvantageItem[] = [
  {
    number: '01',
    title: 'Strategy-driven creativity.',
    description:
      'Every visual decision begins with brand positioning, audience clarity, and measurable commercial purpose.',
  },
  {
    number: '02',
    title: 'User-focused experiences.',
    description:
      'Interfaces shaped around natural human attention, frictionless navigation, and effortless comprehension.',
  },
  {
    number: '03',
    title: 'Modern technology.',
    description:
      'Clean component architectures, intelligent automation, and fast, dependable web engineering built to scale.',
  },
  {
    number: '04',
    title: 'Responsive development.',
    description:
      'Fluid layouts engineered to feel deliberate and balanced across desktop monitors, tablets, and mobile screens.',
  },
  {
    number: '05',
    title: 'Business-focused solutions.',
    description:
      'Design and automation aligned directly with enquiries, customer trust, and operational efficiency.',
  },
  {
    number: '06',
    title: 'Attention to detail.',
    description:
      'Typographic rhythm, motion restraint, and surface polish refined down to the final pixel and interaction.',
  },
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'aura-noir-commerce',
    category: 'E-Commerce',
    studyType: 'Concept Exploration',
    title: 'Aura Noir Commerce',
    description:
      'An editorial dark-mode retail showcase designed around tactile product presentation and a distraction-free purchasing flow.',
    image: '/src/assets/images/work_lumina_commerce_1795000262540.jpg',
    imageAlt: 'Aura Noir Commerce minimalist dark-mode storefront displayed on a frameless studio monitor',
    aspect: '16/9',
    featured: true,
    overview:
      'This concept study explores how sculptural object brands can translate physical gallery calm into an online storefront. Generous negative space, structured product indexing, and quiet contrast guide shoppers smoothly from discovery to checkout.',
    focusAreas: [
      'Editorial Product Storytelling',
      'Minimalist Checkout Architecture',
      'Dark Surface Contrast & Imagery Framing',
    ],
    accentColor: '#FF9A1F',
  },
  {
    id: 'meridian-operations-suite',
    category: 'Web Application',
    studyType: 'Product Concept',
    title: 'Meridian Operations Suite',
    description:
      'A unified workspace concept pairing intelligent workflow automation with clear pipeline visibility for growing service teams.',
    image: '/src/assets/images/work_meridian_suite_1795000263124.jpg',
    imageAlt: 'Meridian Operations Suite dark-mode web application interface shown on a matte black laptop',
    aspect: '4/3',
    overview:
      'Designed as an architectural blueprint for modern client operations, Meridian replaces fragmented spreadsheets with calm data hierarchy, automated task triggers, and clear team accountability.',
    focusAreas: [
      'Dashboard Information Hierarchy',
      'Automated Workflow Triggers',
      'High-Clarity Dark Interface System',
    ],
    accentColor: '#2F6BFF',
  },
  {
    id: 'arc-forma-studio',
    category: 'Brand Identity & Web',
    studyType: 'Studio Concept',
    title: 'Arc Forma Architectural Identity',
    description:
      'A cohesive visual identity and digital portfolio system combining embossed tactile print collateral with responsive web typography.',
    image: '/src/assets/images/work_solstice_studio_1795000263046.jpg',
    imageAlt: 'Arc Forma Studio matte charcoal stationery and digital portfolio preview on dark concrete',
    aspect: '4/3',
    overview:
      'Created as an exploration in cross-medium brand consistency, Arc Forma pairs restrained monochrome typography across physical touchpoints with an image-forward digital showcase.',
    focusAreas: [
      'Identity & Typography Direction',
      'Print-to-Digital Cohesion',
      'Editorial Case Presentation',
    ],
    accentColor: '#FF2E93',
  },
];

export const FOOTER_SERVICES = [
  { label: 'Website Design', serviceId: 'website-design', targetTitle: 'Website Design & Development' },
  { label: 'AI Automation', serviceId: 'ai-automation', targetTitle: 'AI Automation & Workflows' },
  { label: 'E-commerce Development', serviceId: 'ecommerce-development', targetTitle: 'E-commerce Development' },
  { label: 'Creative Design', serviceId: 'brand-graphic-design', targetTitle: 'Brand & Graphic Design' },
  { label: 'Digital Solutions', serviceId: 'web-applications', targetTitle: 'Web Applications & Digital Solutions' },
] as const;

export const SOCIAL_LINKS = [
  { label: 'Instagram', href: '#contact' },
  { label: 'LinkedIn', href: '#contact' },
  { label: 'Dribbble', href: '#contact' },
  { label: 'Behance', href: '#contact' },
] as const;
